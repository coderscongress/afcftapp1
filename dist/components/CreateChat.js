"use strict";
//When Room is Auto-Generated
//If you'd like to auto-generate a unique room ID, you can do this in a parent component like CreateChat.tsx and redirect the user to /chat/<roomId>:
//Then add a route like:
Object.defineProperty(exports, "__esModule", { value: true });
//<Route path="/chat/new" element={<CreateChat />} />
//Now visiting /chat/new will create a unique room and redirect to it.
// src/components/chat/CreateChat.tsx
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const uuid_1 = require("uuid");
const CreateChat = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const newRoomId = (0, uuid_1.v4)();
        navigate(`/chat/${newRoomId}`);
    }, [navigate]);
    return null;
};
exports.default = CreateChat;
