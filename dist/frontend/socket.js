"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// frontend/socket.ts
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)('http://localhost:5000', {
    transports: ['websocket'],
    autoConnect: false,
});
exports.default = socket;
