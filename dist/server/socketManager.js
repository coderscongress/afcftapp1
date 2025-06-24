"use strict";
// server/socketManager.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketManager = void 0;
const openaiHelper_1 = require("./openaiHelper");
const activeRooms = {};
const socketManager = (io) => {
    io.on('connection', (socket) => {
        console.log(`🔌 Socket connected: ${socket.id}`);
        socket.on('join-room', (roomId, role) => {
            socket.join(roomId);
            if (!activeRooms[roomId]) {
                activeRooms[roomId] = {};
            }
            activeRooms[roomId][socket.id] = role;
            console.log(`👥 ${role} joined room ${roomId}`);
        });
        socket.on('chat-message', (roomId, message) => {
            io.to(roomId).emit('chat-message', message);
        });
        socket.on('ask-chatgpt', async (roomId, latestMessage) => {
            io.to(roomId).emit('chatgpt-response-start');
            try {
                const answer = await (0, openaiHelper_1.askChatGPT)(latestMessage);
                const chatGPTMessage = {
                    sender: 'ChatGPT',
                    text: answer,
                    timestamp: new Date().toISOString(),
                };
                io.to(roomId).emit('chatgpt-response-end', chatGPTMessage);
            }
            catch (err) {
                console.error('ChatGPT API Error:', err);
                io.to(roomId).emit('chatgpt-response-end', {
                    sender: 'ChatGPT',
                    text: '⚠️ Sorry, I had trouble responding. Please try again later.',
                    timestamp: new Date().toISOString(),
                });
            }
        });
        socket.on('disconnect', () => {
            console.log(`🔌 Socket disconnected: ${socket.id}`);
            for (const roomId in activeRooms) {
                delete activeRooms[roomId][socket.id];
                if (Object.keys(activeRooms[roomId]).length === 0) {
                    delete activeRooms[roomId];
                }
            }
        });
    });
};
exports.socketManager = socketManager;
