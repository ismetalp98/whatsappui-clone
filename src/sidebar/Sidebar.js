// sidebar for chat icons and working
import React,{useState,useEffect} from 'react'
import "./sidebar.css"
import db from '../firebase';
import { Avatar, IconButton } from '@mui/material';
import { ChatBubble, DonutLargeRounded, ExitToAppOutlined, SearchRounded } from '@mui/icons-material';
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
    const[seed,setSeed]=useState("");
    useEffect(() => {
    setSeed(Math.floor(Math.random()*1))
    }, [])

    // serach filter
    const [search, setSearch] = useState([]);
    const [input,setInput] = useState("");
    const [sidebarBool, setsidebarBool] = useState(true);
    // filters the search according to the alphabert whether CAPS OR SMALL
    const matcher = (s, values) => {
        const re = RegExp(`.*${s.toLowerCase().split("").join(".*")}.*`);
        return values.filter((v) => v.data.name.toLowerCase().match(re));
      };
    //   sets the search if the room nmae lenght is >0
      useEffect(() => {
        if (rooms.length > 0) {
          setSearch(matcher(input, rooms));
        }
        if (input === "") {
          setsidebarBool(true);
        }
      }, [input]);
    //   value of input changes
      const handleChange = (e) => {
        setsidebarBool(false);
        setInput(e.target.value);
      };

    //   photo
    const photoURL =
    localStorage.getItem("photoURL") !== ""
      ? localStorage.getItem("photoURL")
      : null;
      console.log(photoURL)
      const displayName = localStorage.getItem("displayName");
    return (
        <div className="Sidebar">
           <div className="Sidebar__header">    
           <Avatar style={{marginLeft:"15px"}}src={photoURL}/>
           <b className="TEXT">{displayName}</b>
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
                   <input placeholder="Search or Start New Chat" type="text" value={input} onChange={handleChange}/></div>
                
               </div>
               <Divider/>
               {/* checks the condition  whetjher the room nmae present or not */}
               {sidebarBool ? (
            <div className="Sidebar__chats">
              <Sidebarchat addNewChat="true" />
              {rooms.map((room) => (
                <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
              ))}
            </div>
          ) : (
            <div className="Sidebar__chats">
              <Sidebarchat addNewChat="true" />
              {search.map((room) => (
                <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
              ))}
            </div>
          )}

        </div>
    )
}

export default Sidebar;
