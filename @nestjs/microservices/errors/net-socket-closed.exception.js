"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetSocketClosedException = void 0;
class NetSocketClosedException extends Error {
    constructor() {
        super(`The net socket is closed.`);
    }
}
exports.NetSocketClosedException = NetSocketClosedException;
