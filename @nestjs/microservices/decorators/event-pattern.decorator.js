"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPattern = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const constants_1 = require("../constants");
const pattern_handler_enum_1 = require("../enums/pattern-handler.enum");
/**
 * Subscribes to incoming events which fulfils chosen pattern.
 */
const EventPattern = (metadata, transportOrExtras, maybeExtras) => {
    let transport;
    let extras;
    if (shared_utils_1.isNumber(transportOrExtras) && shared_utils_1.isNil(maybeExtras)) {
        transport = transportOrExtras;
    }
    else if (shared_utils_1.isObject(transportOrExtras) && shared_utils_1.isNil(maybeExtras)) {
        extras = transportOrExtras;
    }
    else {
        transport = transportOrExtras;
        extras = maybeExtras;
    }
    return (target, key, descriptor) => {
        Reflect.defineMetadata(constants_1.PATTERN_METADATA, metadata, descriptor.value);
        Reflect.defineMetadata(constants_1.PATTERN_HANDLER_METADATA, pattern_handler_enum_1.PatternHandler.EVENT, descriptor.value);
        Reflect.defineMetadata(constants_1.TRANSPORT_METADATA, transport, descriptor.value);
        Reflect.defineMetadata(constants_1.PATTERN_EXTRAS_METADATA, extras, descriptor.value);
        return descriptor;
    };
};
exports.EventPattern = EventPattern;
