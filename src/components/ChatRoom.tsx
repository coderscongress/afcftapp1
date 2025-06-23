
// src/components/chat/ChatRoom.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import './ChatRoom.css';

type ChatMessage = {
  sender: string;
  text: string;
  timestamp: string;
  isGPT?: boolean;
};

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [isChatGPTThinking, setChatGPTThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newSocket = io('https://afcftapp.firebaseapp.com', {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    newSocket.emit('join_room', { roomId });

    newSocket.on('receive_message', (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.disconnect();
  }, [roomId]);

  const sendMessage = () => {
    if (!input || !username || !socket) return;

    const message: ChatMessage = {
      sender: username,
      text: input,
      timestamp: new Date().toISOString(),
    };

    socket.emit('send_message', { roomId, message });
    setInput('');
  };

  const askChatGPT = async () => {
    if (!socket || messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];

    setIsChatGPTThinking(true);

    const response = await fetch('/api/openai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: lastMessage.text }),
    });

    const data = await response.json();

    const gptResponse: ChatMessage = {
      sender: 'ChatGPT',
      text: data.response || '🤖 Sorry, I couldn’t find an answer.',
      timestamp: new Date().toISOString(),
      isGPT: true,
    };

    socket.emit('send_message', { roomId, message: gptResponse });
    setIsChatGPTThinking(false);
  };

  return (
    <div className="chat-room">
      {!username ? (
        <div className="join-box">
          <h3>Join Chat Room</h3>
          <input
            placeholder="Enter your name (Host or Guest1–3)"
            onChange={(e) => setUsername(e.target.value.trim())}
          />
          <button onClick={() => inputRef.current?.focus()}>Enter</button>
        </div>
      ) : (
        <>
          <h3>Room: {roomId}</h3>
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.isGPT ? 'gpt' : ''}`}>
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-controls">
            <input
              ref={inputRef}
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isChatGPTThinking}
            />
            <button onClick={sendMessage} disabled={isChatGPTThinking}>Send</button>
            <button onClick={askChatGPT} disabled={isChatGPTThinking}>Ask ChatGPT</button>
          </div>
        </>
      )}
    </div>
	

{username.toLowerCase() === 'host' && (
  <div style={{ marginTop: '20px' }}>
    <h4>📩 Invite Guests via WhatsApp</h4>
    {[1, 2, 3].map((n) => {
      const guestName = `Guest${n}`;
      const chatURL = `https://afcftapp.firebaseapp.com/chat/${roomId}`;
      const message = encodeURIComponent(
        `👋 Hi ${guestName}, you've been invited to collaborate on AfCFTApp!\n\nClick here to join the chat:\n${chatURL}\n\nLet’s brainstorm together.`
      );
      const waURL = `https://wa.me/?text=${message}`;

      return (
        <div key={n} style={{ marginBottom: '10px' }}>
          <a
            href={waURL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '8px 14px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Invite {guestName} via WhatsApp
          </a>
        </div>
      );
    })}
  </div>
)}

	
  );
};

export default ChatRoom;
