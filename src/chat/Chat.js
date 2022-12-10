import React, { useState, useEffect } from 'react'
import "./Chat.css";
import { Avatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import db from '../firebase';
import { useParams } from "react-router-dom";
import { collection, onSnapshot, doc, getDoc, orderBy, query, serverTimestamp, addDoc, } from "firebase/firestore";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);;

  //roomview to get data from
  const d = doc(db, "rooms", roomId)
  getDoc(d)
    .then((doc) => {
      setRoomName(doc.data().name)
    })
  //   timestamp
  const messagesColRef = collection(db, "rooms", roomId, "messages");
  const messagesQuery = query(messagesColRef, orderBy("timestamp"));
  // console.log(messages)

  useEffect(() =>
    onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        data: doc.data(),
      })))
    }),
    [roomId]
  )

  const displayName = localStorage.getItem("displayName");
  const [issendChecked, setIssendChecked] = useState(false);

  function SendMessage(e) {
    e.preventDefault();
    if (input.length > 0) {
      const ds = collection(db, "rooms", roomId, "messages");
      addDoc(ds, {
        message: input,
        name: displayName,
        timestamp: serverTimestamp(),
        photoURL: localStorage.getItem("photoURL"),

      });
      setIssendChecked(!issendChecked);
      setInput("");
    }
  }

  return (
    <div className="Chat">
      <div className="Chat__header">
        <Avatar />
        <div className="Chat__headerinfo">
          <h3>{roomName}</h3>
        </div>
      </div>
      <Divider />
      <div className="Chat__body">
        {messages.map((message) => (
          <p className={`Chat__Messages  ${message.data.name === displayName && "Chat__Reciver"}`}>
            <span className='Chat__Name'>{message.data.name}</span>
            <br></br>
            {message.data.message}
            <span className='Chat__Time'>{new Date(message.data.timestamp?.toDate()).toUTCString().slice(5, 12)}</span>
          </p>
        ))}
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
