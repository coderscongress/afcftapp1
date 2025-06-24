


// server/socketManager.ts

import { Server, Socket } from 'socket.io';
import { MessageData } from './types';
import { askChatGPT } from './openaiHelper';

const activeRooms: Record<string, { [socketId: string]: string }> = {};

export const socketManager = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    socket.on('join-room', (roomId: string, role: string) => {
      socket.join(roomId);
      if (!activeRooms[roomId]) {
        activeRooms[roomId] = {};
      }
      activeRooms[roomId][socket.id] = role;
      console.log(`👥 ${role} joined room ${roomId}`);
    });

    socket.on('chat-message', (roomId: string, message: MessageData) => {
      io.to(roomId).emit('chat-message', message);
    });

    socket.on('ask-chatgpt', async (roomId: string, latestMessage: string) => {
      io.to(roomId).emit('chatgpt-response-start');

      try {
        const answer = await askChatGPT(latestMessage);

        const chatGPTMessage: MessageData = {
          sender: 'ChatGPT',
          text: answer,
          timestamp: new Date().toISOString(),
        };

        io.to(roomId).emit('chatgpt-response-end', chatGPTMessage);
      } catch (err) {
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


