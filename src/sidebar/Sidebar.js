// sidebar for chat icons and working
import React, { useState, useEffect } from 'react'
import "./sidebar.css"
import db from '../firebase';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import Sidebarchat from './Sidebarchat';

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  
  useEffect(() =>
    onSnapshot(collection(db, "rooms"), (snapshot) =>
      setRooms(snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      })))
    ), [])

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

  const displayName = localStorage.getItem("user");
  return (
    <div className="Sidebar">
      <div className="Sidebar__header">
        <Avatar style={{ marginLeft: "15px" }} />
        <b className="TEXT">{displayName}</b>
        <div className="Sidebar__headerRight">
          <IconButton>
            <Tooltip title="Add Room">
              <AddCircleOutline onClick={createChat} style={{ color: "#B1B3B5" }} />
            </Tooltip>
          </IconButton>
        </div>
      </div>
      <Divider />
      <div className="Sidebar__chats">
        <Sidebarchat addNewChat="true" />
        {rooms.map((room) => (
          <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar;
