import React, { useState, useEffect } from 'react'
import "./sidebarchat.css"
import { Link } from "react-router-dom";
import { Avatar } from '@mui/material';
import db from '../firebase';
import { collection, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
function Sidebarchat(props) {
  // calling from anaother page and rendering props
  const { addNewChat, name, id } = props;
  const [messages, setMessages] = useState('');

  // add room
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName && roomName.length >= 20) {
      return alert("enter a shorter name for the room");
    }
    if (roomName) {
      addDoc(collection(db, "rooms"), {
        name: roomName,

      });
    }
  };
  // get by id about last message wfrom firebase
  useEffect(() => {
    if (id) {
      const messagesColRef = collection(db, "rooms", id, "messages");
      const messagesQuery = query(messagesColRef, orderBy("timestamp", "desc"));
      onSnapshot(messagesQuery, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({
          data: doc.data(),

        }))))
    }
  }, [id])

  return addNewChat !== "true" ? (
    <Link to={`/rooms/${id}`} style={{ textDecoration: "none" }}>
      <div className="Sidebarchat">
        <Avatar style={{ padding: "0 15px 0 13px" }} src={'https://avatars.dicebear.com/api/bottts/1.svg'} />
        <div className="SidebarChat_info">
          <h2 >{name}</h2>
          {/* this will show the last sent or recieved message */}
          <p >{messages[0]?.data.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    null
  )
}
export default Sidebarchat
