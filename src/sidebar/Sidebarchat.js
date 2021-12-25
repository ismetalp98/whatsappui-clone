import React,{useState,useEffect} from 'react'
import "./sidebarchat.css"

import { Link } from "react-router-dom";
import { Avatar } from '@mui/material';

import db from '../firebase';
import {  collection, addDoc  } from "firebase/firestore"; 
import { AddCircleOutline } from '@mui/icons-material';
function Sidebarchat (props) {
  // calling from anaother page and rendering props
  const { addNewChat, name, id } = props;
  
  //generating random avatar
    const[seed,setSeed]=useState("");
    useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
    }, [])
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
    // DONE

    return addNewChat!=="true"?(
      <Link to ={`/rooms/${id}`} >
        <div className="Sidebarchat">
         <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}/>
         <div className="SidebarChat_info">
             <h2 >{name}</h2>
             <p >Last Message</p>
         </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="Sidebarchat">
    
       Addnew     <AddCircleOutline style={{size:"10px"}}/>
        </div>
    )
}
export default Sidebarchat
