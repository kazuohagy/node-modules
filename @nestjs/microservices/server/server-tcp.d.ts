/// <reference types="node" />
import { Socket } from 'net';
import { Transport } from '../enums';
import { TcpSocket } from '../helpers';
import { CustomTransportStrategy } from '../interfaces';
import { TcpOptions } from '../interfaces/microservice-configuration.interface';
import { Server } from './server';
export declare class ServerTCP extends Server implements CustomTransportStrategy {
    private readonly options;
    readonly transportId = Transport.TCP;
    private readonly port;
    private readonly host;
    private readonly socketClass;
    private server;
    private isExplicitlyTerminated;
    private retryAttemptsCount;
    constructor(options: TcpOptions['options']);
    listen(callback: (err?: unknown, ...optionalParams: unknown[]) => void): void;
    close(): void;
    bindHandler(socket: Socket): void;
    handleMessage(socket: TcpSocket, rawMessage: unknown): Promise<any>;
    handleClose(): undefined | number | NodeJS.Timer;
    private init;
    private getSocketInstance;
}
