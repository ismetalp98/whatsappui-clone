// wholae app is deployed here
import './App.css';
import Chat from './chat/Chat';
import React,{useState} from 'react';
import Login from "./login/Login";
import Sidebar from './sidebar/Sidebar';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { useStateValue } from "./login/StateProvider";
import UseWindowDimensions from "./UseWindowDimensions";
function App() {
  const [{ user }, SetUser] = useStateValue();
  //it checks for the login state if logged in it will not redirect back
  const uid =
  localStorage.getItem("uid") !== undefined
    ? localStorage.getItem("uid")
    : null;

 

  return (
    <div className="chat">
   {!user && !uid ? (
      <Login />
    ) : (
   
    <div className="chat__body">
      <BrowserRouter>
            <Sidebar />
               <Routes>
              <Route  path="/rooms/:roomId" element={<Chat />}/>
              <Route  path="/rooms" element={<Chat />} />
            </Routes>
</BrowserRouter>
</div>
     )}
    </div>


  );
}

export default App;
