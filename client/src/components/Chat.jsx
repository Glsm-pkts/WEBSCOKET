import React, { useEffect, useState } from "react";

const Chat = ({ socket, userName, room }) => {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on("messageReturn", (data) => {
            // Aynı mesajın tekrar eklenmesini önlemek için kontrol
            setMessageList((prev) =>
                prev.some((msg) => msg.date === data.date && msg.message === data.message)
                    ? prev
                    : [...prev, data]
            );
        });

        // Temizlik fonksiyonu
        return () => socket.off("messageReturn");
    }, [socket]);

    const sendMessage = async () => {
        const messageContent = {
            userName: userName,
            message: message,
            room: room,
            date: new Date().toISOString(),
        };

        // Öncelikle mesajı listeye ekle (geçici olarak gösterilir)
        setMessageList((prev) => [...prev, messageContent]);

        // Sokete mesajı gönder
        await socket.emit("message", messageContent);

        // Input'u temizle
        setMessage("");
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center" 
             style={{ backgroundImage: `url(${require('../assests/images.jpeg')})` }}>
            <div className="w-1/3 h-[600px] bg-transparent backdrop-blur-md relative rounded-md shadow-lg border border-gray-300 flex flex-col justify-between">
                {/* Üst Bar */}
                <div className="w-full h-16 bg-gray-800 flex items-center px-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="ml-4 text-white font-medium text-lg">Chat Room</div>
                </div>
    
                {/* Mesaj Alanı */}
                <div className="w-full flex-1 overflow-y-auto p-4 space-y-4">
                    {messageList &&
                        messageList.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${
                                    msg.userName === userName ? "justify-end" : "justify-start"
                                }`}
                            >
                                <div
                                    className={`w-2/3 p-3 ${
                                        msg.userName === userName ? "bg-green-500" : "bg-blue-500"
                                    } text-white rounded-xl shadow-md ${
                                        msg.userName === userName
                                            ? "rounded-bl-none"
                                            : "rounded-br-none"
                                    }`}
                                >
                                    {/* Mesaj içeriği */}
                                    <div className="text-sm">{msg.message}</div>
                                    <div className="w-full flex justify-end text-xs mt-1 opacity-80">
                                        {msg.userName}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
    
                {/* Mesaj Gönderme Alanı */}
                <div className="w-full h-16 bg-gray-300 flex items-center px-4 text-black">
  <input
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    type="text"
    placeholder="Mesaj yaz..."
    className="flex-1 sm:px-6 h-10 px-3 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
  />
  <button
    onClick={sendMessage}
    className="ml-2 h-10 px-4 sm:px-6 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all"
  >
    SEND
  </button>
</div>

            </div>
        </div>
    );
    
};

export default Chat;
