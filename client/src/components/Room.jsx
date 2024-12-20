import React from 'react';

const Room = ({ userName, room, setUserName, setRoom, setChat, socket }) => {
  const sendRoom = () => {
    socket.emit("room", room);
    setChat(true);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${require('../assests/logo.jpeg')})`,
      }}
    >
      <div className="w-1/3 h-[500px] bg-transparent shadow-lg rounded-xl flex flex-col items-center space-y-6 p-6 border border-white ">
        <h1 className="font-bold text-3xl text-white text-center">
          WELCOME TO CHAT
        </h1>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="h-12 w-full max-w-xs rounded-xl p-4 outline-none border border-white bg-transparent text-white placeholder-white"
          type="text"
          placeholder="Username"
        />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="h-12 w-full max-w-xs rounded-xl p-4 outline-none border border-white bg-transparent text-white placeholder-white"
          type="text"
          placeholder="Room"
        />
        <div
          onClick={sendRoom}
          className="cursor-pointer h-12 w-full max-w-xs flex items-center justify-center text-lg rounded-xl bg-white/20 text-white hover:bg-white/30"
        >
          CHAT
        </div>
      </div>
    </div>
  );
};

export default Room;
