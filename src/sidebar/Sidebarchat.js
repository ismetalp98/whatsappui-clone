import React,{useState,useEffect} from 'react'
import "./sidebarchat.css"

import { Link } from "react-router-dom";
import { Avatar } from '@mui/material';
import { useParams } from "react-router-dom";
import db from '../firebase';
import {  collection,onSnapshot ,doc, getDoc,getDocs, orderBy, query ,serverTimestamp,setDoc,addDoc,startAfter} from "firebase/firestore";
import { AddCircleOutline } from '@mui/icons-material';
function Sidebarchat (props) {
  // calling from anaother page and rendering props
  const { addNewChat, name, id } = props;
  const [messages, setMessages] = useState('');
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
  //last message
  // const q=collection(db,"rooms", id,"messages")
  useEffect(() => {
    
    if(id){
      const messagesColRef = collection(db, "rooms", id, "messages");
      const messagesQuery = query(messagesColRef, orderBy("timestamp","desc"));
      onSnapshot(messagesQuery,(snapshot) => 
      setMessages(snapshot.docs.map((doc) => ({
       data:doc.data(),
  
   }))))
    }
  
  }, [id])
  // if(id){
 
  //   onSnapshot(collection(db,"rooms", id,"messages"),(snapshot) => 
  //          setMessages(snapshot.docs.map((doc) => ({
  //           data:doc.data().message,
       
  //       }))))
  // }

// console.log(messages)
    return addNewChat!=="true"?(
      <Link to ={`/rooms/${id}`}  style={{textDecoration:"none"}}>
        <div className="Sidebarchat">
         <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}/>
         <div className="SidebarChat_info">
             <h2 >{name}</h2>
             <p >{messages[0]?.data.message}</p>
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
