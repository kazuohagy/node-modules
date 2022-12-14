"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerKafka = void 0;
const logger_service_1 = require("@nestjs/common/services/logger.service");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const constants_1 = require("../constants");
const ctx_host_1 = require("../ctx-host");
const enums_1 = require("../enums");
const helpers_1 = require("../helpers");
const kafka_request_serializer_1 = require("../serializers/kafka-request.serializer");
const server_1 = require("./server");
let kafkaPackage = {};
class ServerKafka extends server_1.Server {
    constructor(options) {
        super();
        this.options = options;
        this.transportId = enums_1.Transport.KAFKA;
        this.logger = new logger_service_1.Logger(ServerKafka.name);
        this.client = null;
        this.consumer = null;
        this.producer = null;
        this.parser = null;
        const clientOptions = this.getOptionsProp(this.options, 'client') || {};
        const consumerOptions = this.getOptionsProp(this.options, 'consumer') || {};
        const postfixId = this.getOptionsProp(this.options, 'postfixId') || '-server';
        this.brokers = clientOptions.brokers || [constants_1.KAFKA_DEFAULT_BROKER];
        // append a unique id to the clientId and groupId
        // so they don't collide with a microservices client
        this.clientId =
            (clientOptions.clientId || constants_1.KAFKA_DEFAULT_CLIENT) + postfixId;
        this.groupId = (consumerOptions.groupId || constants_1.KAFKA_DEFAULT_GROUP) + postfixId;
        kafkaPackage = this.loadPackage('kafkajs', ServerKafka.name, () => require('kafkajs'));
        this.parser = new helpers_1.KafkaParser((options && options.parser) || undefined);
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }
    async listen(callback) {
        try {
            this.client = this.createClient();
            await this.start(callback);
        }
        catch (err) {
            callback(err);
        }
    }
    async close() {
        this.consumer && (await this.consumer.disconnect());
        this.producer && (await this.producer.disconnect());
        this.consumer = null;
        this.producer = null;
        this.client = null;
    }
    async start(callback) {
        const consumerOptions = Object.assign(this.options.consumer || {}, {
            groupId: this.groupId,
        });
        this.consumer = this.client.consumer(consumerOptions);
        this.producer = this.client.producer(this.options.producer);
        await this.consumer.connect();
        await this.producer.connect();
        await this.bindEvents(this.consumer);
        callback();
    }
    createClient() {
        return new kafkaPackage.Kafka(Object.assign({ logCreator: helpers_1.KafkaLogger.bind(null, this.logger) }, this.options.client, { clientId: this.clientId, brokers: this.brokers }));
    }
    async bindEvents(consumer) {
        const registeredPatterns = [...this.messageHandlers.keys()];
        const consumerSubscribeOptions = this.options.subscribe || {};
        const subscribeToPattern = async (pattern) => consumer.subscribe(Object.assign({ topic: pattern }, consumerSubscribeOptions));
        await Promise.all(registeredPatterns.map(subscribeToPattern));
        const consumerRunOptions = Object.assign(this.options.run || {}, {
            eachMessage: this.getMessageHandler(),
        });
        await consumer.run(consumerRunOptions);
    }
    getMessageHandler() {
        return async (payload) => this.handleMessage(payload);
    }
    getPublisher(replyTopic, replyPartition, correlationId) {
        return (data) => this.sendMessage(data, replyTopic, replyPartition, correlationId);
    }
    async handleMessage(payload) {
        const channel = payload.topic;
        const rawMessage = this.parser.parse(Object.assign(payload.message, {
            topic: payload.topic,
            partition: payload.partition,
        }));
        const headers = rawMessage.headers;
        const correlationId = headers[enums_1.KafkaHeaders.CORRELATION_ID];
        const replyTopic = headers[enums_1.KafkaHeaders.REPLY_TOPIC];
        const replyPartition = headers[enums_1.KafkaHeaders.REPLY_PARTITION];
        const packet = await this.deserializer.deserialize(rawMessage, { channel });
        const kafkaContext = new ctx_host_1.KafkaContext([
            rawMessage,
            payload.partition,
            payload.topic,
        ]);
        // if the correlation id or reply topic is not set
        // then this is an event (events could still have correlation id)
        if (!correlationId || !replyTopic) {
            return this.handleEvent(packet.pattern, packet, kafkaContext);
        }
        const publish = this.getPublisher(replyTopic, replyPartition, correlationId);
        const handler = this.getHandlerByPattern(packet.pattern);
        if (!handler) {
            return publish({
                id: correlationId,
                err: constants_1.NO_MESSAGE_HANDLER,
            });
        }
        const response$ = this.transformToObservable(await handler(packet.data, kafkaContext));
        response$ && this.send(response$, publish);
    }
    async sendMessage(message, replyTopic, replyPartition, correlationId) {
        const outgoingMessage = await this.serializer.serialize(message.response);
        this.assignReplyPartition(replyPartition, outgoingMessage);
        this.assignCorrelationIdHeader(correlationId, outgoingMessage);
        this.assignErrorHeader(message, outgoingMessage);
        this.assignIsDisposedHeader(message, outgoingMessage);
        const replyMessage = Object.assign({
            topic: replyTopic,
            messages: [outgoingMessage],
        }, this.options.send || {});
        return this.producer.send(replyMessage);
    }
    assignIsDisposedHeader(outgoingResponse, outgoingMessage) {
        if (!outgoingResponse.isDisposed) {
            return;
        }
        outgoingMessage.headers[enums_1.KafkaHeaders.NEST_IS_DISPOSED] = Buffer.alloc(1);
    }
    assignErrorHeader(outgoingResponse, outgoingMessage) {
        if (!outgoingResponse.err) {
            return;
        }
        outgoingMessage.headers[enums_1.KafkaHeaders.NEST_ERR] = Buffer.from(outgoingResponse.err);
    }
    assignCorrelationIdHeader(correlationId, outgoingMessage) {
        outgoingMessage.headers[enums_1.KafkaHeaders.CORRELATION_ID] =
            Buffer.from(correlationId);
    }
    assignReplyPartition(replyPartition, outgoingMessage) {
        if (shared_utils_1.isNil(replyPartition)) {
            return;
        }
        outgoingMessage.partition = parseFloat(replyPartition);
    }
    initializeSerializer(options) {
        this.serializer =
            (options && options.serializer) || new kafka_request_serializer_1.KafkaRequestSerializer();
    }
}
exports.ServerKafka = ServerKafka;
