"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// src/components/ChatRoom.tsx
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const socket_io_client_1 = require("socket.io-client");
require("./ChatRoom.css");
const ChatRoom = () => {
    const { roomId } = (0, react_router_dom_1.useParams)();
    const [socket, setSocket] = (0, react_1.useState)(null);
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [input, setInput] = (0, react_1.useState)('');
    const [username, setUsername] = (0, react_1.useState)('');
    const [isChatGPTThinking, setChatGPTThinking] = (0, react_1.useState)(false);
    const inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const newSocket = (0, socket_io_client_1.io)('https://afcftapp.firebaseapp.com', {
            transports: ['websocket'],
        });
        setSocket(newSocket);
        newSocket.emit('join_room', { roomId });
        newSocket.on('receive_message', (message) => {
            setMessages((prev) => [...prev, message]);
        });
        // ✅ Proper cleanup
        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);
    const sendMessage = () => {
        if (!input || !username || !socket)
            return;
        const message = {
            sender: username,
            text: input,
            timestamp: new Date().toISOString(),
        };
        socket.emit('send_message', { roomId, message });
        setInput('');
    };
    const askChatGPT = async () => {
        if (!socket || messages.length === 0)
            return;
        const lastMessage = messages[messages.length - 1];
        setChatGPTThinking(true);
        const response = await fetch('/api/openai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: lastMessage.text }),
        });
        const data = await response.json();
        const gptResponse = {
            sender: 'ChatGPT',
            text: data.response || '🤖 Sorry, I couldn’t find an answer.',
            timestamp: new Date().toISOString(),
            isGPT: true,
        };
        socket.emit('send_message', { roomId, message: gptResponse });
        setChatGPTThinking(false);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "chat-room", children: !username ? ((0, jsx_runtime_1.jsxs)("div", { className: "join-box", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Join Chat Room" }), (0, jsx_runtime_1.jsx)("input", { placeholder: "Enter your name (Host or Guest1\u20133)", onChange: (e) => setUsername(e.target.value.trim()) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => inputRef.current?.focus(), children: "Enter" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("h3", { children: ["Room: ", roomId] }), (0, jsx_runtime_1.jsx)("div", { className: "chat-box", children: messages.map((msg, i) => ((0, jsx_runtime_1.jsxs)("div", { className: `chat-message ${msg.isGPT ? 'gpt' : ''}`, children: [(0, jsx_runtime_1.jsxs)("strong", { children: [msg.sender, ":"] }), " ", msg.text] }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "chat-controls", children: [(0, jsx_runtime_1.jsx)("input", { ref: inputRef, placeholder: "Type a message", value: input, onChange: (e) => setInput(e.target.value), disabled: isChatGPTThinking }), (0, jsx_runtime_1.jsx)("button", { onClick: sendMessage, disabled: isChatGPTThinking, children: "Send" }), (0, jsx_runtime_1.jsx)("button", { onClick: askChatGPT, disabled: isChatGPTThinking, children: "Ask ChatGPT" })] }), username.toLowerCase() === 'host' && ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: '20px' }, children: [(0, jsx_runtime_1.jsx)("h4", { children: "\uD83D\uDCE9 Invite Guests via WhatsApp" }), [1, 2, 3].map((n) => {
                            const guestName = `Guest${n}`;
                            const chatURL = `https://afcftapp.firebaseapp.com/chat/${roomId}`;
                            const message = encodeURIComponent(`👋 Hi ${guestName}, you've been invited to collaborate on AfCFTApp!\n\nClick here to join the chat:\n${chatURL}\n\nLet’s brainstorm together.`);
                            const waURL = `https://wa.me/?text=${message}`;
                            return ((0, jsx_runtime_1.jsx)("div", { style: { marginBottom: '10px' }, children: (0, jsx_runtime_1.jsxs)("a", { href: waURL, target: "_blank", rel: "noopener noreferrer", style: {
                                        backgroundColor: '#25D366',
                                        color: 'white',
                                        padding: '8px 14px',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                    }, children: ["Invite ", guestName, " via WhatsApp"] }) }, n));
                        })] }))] })) }));
    ;
};
exports.default = ChatRoom;
