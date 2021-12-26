import React,{useState,useEffect} from 'react'
import "./Chat.css";
import { Avatar,IconButton  } from '@mui/material';
import Divider from '@mui/material/Divider';
import db from '../firebase';
import { AttachFile, InsertEmoticonOutlined, MicOutlined, MoreVert, SearchRounded } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import {  collection,onSnapshot ,doc, getDoc, orderBy, query ,serverTimestamp,addDoc,} from "firebase/firestore";
import { Picker } from "emoji-mart";
function Chat() {
    const[seed,setSeed]=useState("");
    const[input,setInput]=useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);;
    useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
    }, [])
    //roomview to get data from
    const d=doc(db,"rooms",roomId)
  getDoc(d)
  .then((doc)=>{
     setRoomName(doc.data().name)
  })
//   timestamp
const messagesColRef = collection(db, "rooms", roomId, "messages");
const messagesQuery = query(messagesColRef, orderBy("timestamp"));


useEffect(() => 

onSnapshot(messagesQuery, (snapshot) => {
    setMessages(snapshot.docs.map(doc => ({
    data:doc.data(),
    id:doc.id
})))
 }),
    [roomId]
)
const displayName = localStorage.getItem("displayName");
const [issendChecked, setIssendChecked] = useState(false);
function SendMessage(e){
    e.preventDefault();
    if (input.length > 0) {
        const ds=collection(db,"rooms", roomId,"messages");
        addDoc(ds, {
            message: input,
            name: displayName,
            timestamp: serverTimestamp(),
            
          });
        setIssendChecked(!issendChecked);
        setInput("");
      }

}
// emoji 
const [emoji, setEmoji] = useState(false);
function addEmoji(e){ 
    let emoji = e.native;
    setInput(input + emoji);
}
  const checkEmojiClose = () => {
    if (emoji) {
      setEmoji(false);
    }
  };
    return (
        <div className="Chat">
            <div className="Chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}/>
           
            <div className="Chat__headerinfo">
             <h3>{roomName}</h3>
        
            </div>
            <div className="Chat__headerright">
            <IconButton>
               <SearchRounded style={{color:"#B1B3B5"}}/>
               </IconButton>
               
               <IconButton> <MoreVert style={{color:"#B1B3B5"}}/> </IconButton>
            </div>
            </div>
            <Divider/>
            <div className="Chat__body" onClick={checkEmojiClose}>
       
            {messages.map((message)=>(
                <p className={`Chat__Messages  ${message.data.name === displayName && "Chat__Reciver"}`}>
                <span className='Chat__Name'>{message.data.name}</span>
              {message.data.message}
                <span className='Chat__Time'>{new Date(message.data.timestamp?.toDate()).toUTCString().slice(5,12)}</span>
                </p>
             ))}
            </div>
            <div className="Chat__footer">
            <IconButton>
              {/* <InsertEmoticonIcon /> */}
              <InsertEmoticonOutlined 
              
                style={{color:"#B1B3B5"}}
                onClick={() => setEmoji(!emoji)}
              />
              {emoji ? <Picker className="emoji-mart-dark" onSelect={addEmoji} /> : null}
            </IconButton>
                <IconButton> <AttachFile style={{color:"#B1B3B5"}}/> </IconButton>
                <form>
                    <input type="text" value={input}  onClick={checkEmojiClose}onChange={(e)=>setInput(e.target.value)}
                    placeholder='Send a message'/>
                    <button type="submit" onClick={SendMessage}>Send Messages</button>
                </form>
                <IconButton><MicOutlined style={{color:"#B1B3B5",padding:"10px",}}/></IconButton>
            </div>
        </div>
    )
}

export default Chat
