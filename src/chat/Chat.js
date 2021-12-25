import React,{useState,useEffect} from 'react'
import "./Chat.css";
import { Avatar,IconButton  } from '@mui/material';
import Divider from '@mui/material/Divider';
import db from '../firebase';
import { AttachFile, InsertEmoticonOutlined, MicOutlined, MoreVert, SearchRounded } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import {  collection,onSnapshot ,doc, getDoc, orderBy } from "firebase/firestore";
function Chat() {
    const[seed,setSeed]=useState("");
    const[input,setInput]=useState("");
    const { roomId } = useParams();
    // console.log(roomId)
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
    }, [])
    const sendMessage=(e)=>{
        e.preventDefault();
        // whenever a message is sent the string automatically becomes empty
        setInput("");
    }
    //roomview to get data from
    const d=doc(db,"rooms",roomId)

  getDoc(d)
  .then((doc)=>{
     setRoomName(doc.data().name)
  })
//   timestamp
const td=doc(collection(db,"rooms","messages","message"),roomId)

getDoc(td)
.then((doc)=>{
    onSnapshot(td,(snapshot)=>( 
        setMessages(doc.data())))
})
console.log(messages)
    return (
        <div className="Chat">
            <div className="Chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}/>
           
            <div className="Chat__headerinfo">
             <h3>{roomName}</h3>
             <p>Last seen ...</p>
            </div>
            <div className="Chat__headerright">
            <IconButton>
               <SearchRounded style={{color:"#B1B3B5"}}/>
               </IconButton>
               
               <IconButton> <MoreVert style={{color:"#B1B3B5"}}/> </IconButton>
            </div>
            </div>
            <Divider/>
            <div className="Chat__body">
                <p className={`Chat__Messages  ${ true && "Chat__Reciver"}`}>
                <span className='Chat__Name'>Hulk</span>
                Hello 
                <span className='Chat__Time'>3:59pm</span>
                </p>
            </div>
            <div className="Chat__footer">
            <IconButton> <InsertEmoticonOutlined style={{color:"#B1B3B5"}}/></IconButton>
                <IconButton> <AttachFile style={{color:"#B1B3B5"}}/> </IconButton>
                <form type="submit" onClick={sendMessage}>
                    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}
                    placeholder='Send a message'/>
                    <button>Send Messages</button>
                </form>
                <IconButton><MicOutlined style={{color:"#B1B3B5",padding:"10px",}}/></IconButton>
            </div>
        </div>
    )
}

export default Chat
