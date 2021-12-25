// wholae app is deployed here
import './App.css';
import Chat from './chat/Chat';

import Sidebar from './sidebar/Sidebar';
import { BrowserRouter , Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="chat">

   
    <div className="chat__body">
      <BrowserRouter>
            <Sidebar />
               <Routes>
              <Route  path="/rooms/:roomId" element={<Chat />}/>
              <Route  path="/" element={<Chat />} />
            </Routes>
</BrowserRouter>
</div>
    </div>


  );
}

export default App;
