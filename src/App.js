// wholae app is deployed here
import './App.css';
import Chat from './chat/Chat';
import React, { useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      const name = prompt("Please enter your name");
      localStorage.setItem("user", name);
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
