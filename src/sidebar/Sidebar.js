// sidebar for chat icons and working
import React,{useState,useEffect} from 'react'
import "./sidebar.css"
import db from '../firebase';

import { Avatar, Button, IconButton } from '@mui/material';
import { ChatBubble, DonutLargeRounded, ExitToAppOutlined, MoreVert, SearchRounded } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { collection,onSnapshot } from "firebase/firestore";
import Sidebarchat from './Sidebarchat';
import { getAuth, signOut } from "firebase/auth";

function Sidebar() {
    const[rooms,setRooms]= useState([]);
    useEffect(() => 
      onSnapshot(collection(db,"rooms"),(snapshot) => 
            setRooms(snapshot.docs.map((doc) => ({
                data:doc.data(),
                id: doc.id,
           
            }))))
      
    ,[]
    )

function logout () {
    const auth = getAuth();
    signOut(auth).then(() => {
        localStorage.removeItem("uid");
        window.location.reload();
    }).catch((error) => {
     alert(error.message)
    });
}
    // console.log(rooms)
    const[seed,setSeed]=useState("");
    useEffect(() => {
    setSeed(Math.floor(Math.random()*1))
    }, [])
    return (
        <div className="Sidebar">
           <div className="Sidebar__header">    
           <Avatar src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}/>
           <b className="TEXT">BETA</b>
           <div className="Sidebar__headerRight">
               <IconButton>
               <DonutLargeRounded style={{color:"#B1B3B5"}}/>
               </IconButton>
               <IconButton> <ChatBubble style={{color:"#B1B3B5"}}/> </IconButton>
               <IconButton onClick={logout}><ExitToAppOutlined   style={{color:"#B1B3B5"}}/> </IconButton>
           </div>
        </div>
        <Divider/>
               <div className="Sidebar__search">
                   <div className="Sidebar__searchContainer">   <SearchRounded />
                   <input placeholder="Search or Start New Chat" type="text"/></div>
                
               </div>
               <Divider/>
               <div className="Sidebar__chats">
                   {/* calling add new chat/room */}
                   <Sidebarchat addNewChat='true'/>
                   {/* <Sidebarchat/> */}
                   {rooms.map((room) => (
                <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
              ))}
               </div>

        </div>
    )
}

export default Sidebar
