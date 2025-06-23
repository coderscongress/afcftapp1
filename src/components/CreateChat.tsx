//When Room is Auto-Generated
//If you'd like to auto-generate a unique room ID, you can do this in a parent component like CreateChat.tsx and redirect the user to /chat/<roomId>:
//Then add a route like:

//<Route path="/chat/new" element={<CreateChat />} />
//Now visiting /chat/new will create a unique room and redirect to it.



// src/components/chat/CreateChat.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreateChat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const newRoomId = uuidv4();
    navigate(`/chat/${newRoomId}`);
  }, [navigate]);

  return null;
};

export default CreateChat;
