import React, { useState } from 'react'
import "./Chat.css";
import { Avatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useParams } from "react-router-dom";
import { getMessages, sendMessage } from '../../services/chatServices';
import { useEffect } from 'react';
import { useRef } from 'react';

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const user = sessionStorage.getItem("user");

  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    getMessages(user, roomId, setMessages);
  }, [roomId]);

  function SendMessage(e) {
    e.preventDefault();
    if (input.length > 0) {
      sendMessage(user, roomId, input);
      setInput("");
    }
  }

  console.log('test');
  return (
    <div className="Chat">
      <div className="Chat__header">
        <Avatar />
        <div className="Chat__headerinfo">
          <h3>{roomId}</h3>
        </div>
      </div>
      <Divider />
      <div className="Chat__body">
        {messages.map((message) => (
          <p className={`Chat__Messages  ${message.data.name === user && "Chat__Reciver"}`}>
            <span className='Chat__Name'>{message.data.name}</span>
            <br></br>
            {message.data.message}
            <span className='Chat__Time'>{new Date(message.data.timestamp?.toDate()).toUTCString().slice(5, 12)}</span>
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="Chat__footer">
        <form>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder='Send a message' />
          <button type="submit" onClick={SendMessage}>Send Messages</button>
        </form>
      </div>
    </div>
  )
}

export default Chat
