
import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Room from './components/Room';
import io from "socket.io-client"

const socket = io.connect("http://localhost:5001")

const App =() =>{
  const [userName, setUserName ] = useState("")
  const [room, setRoom ] = useState("")
  const [chat, setChat] = useState(false)
  return (
    <div className="App">
      {
      !chat ? (<Room userName={userName} room={room}  setUserName={setUserName} setRoom={setRoom} setChat={setChat} socket={socket}/>) : (<Chat socket={socket} userName={userName} room={room} />)
      
      }
     
   
    </div>
  );
}

export default App;
