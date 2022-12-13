// wholae app is deployed here
import './App.css';
import Chat from './presentations/chat/Chat';
import React, { useEffect } from 'react';
import Sidebar from './presentations/sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { registerUser } from './repository/userRepo';

function App() {
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user && user === null) {
      const name = prompt("Please enter your name");
      sessionStorage.setItem("user", name);
      registerUser(name);
    }
  }, []);

  return (
    <div className="chat">
      <div className="chat__body">
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
