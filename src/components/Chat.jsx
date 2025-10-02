import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

export default function Chat() {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const photoUrl = user?.photoUrl;

  const fetchMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);

    const chatMesssages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg.senderId.firstName,
        photoUrl: msg.senderId.photoUrl,

        text: msg.text,
      };
    });
    // console.log(chatMesssages);
    setMessages(chatMesssages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!user) return;

    const newSocket = createSocketConnection();
    setSocket(newSocket);

    // Join chat room
    newSocket.emit("joinChat", { userId, targetUserId });

    // Load previous messages
    newSocket.on("previousMessages", (msgs) => {
      setMessages(msgs);
    });

    // Listen for new messages
    newSocket.on("messageReceived", ({ firstName, text, photoUrl }) => {
      setMessages((prev) => [...prev, { firstName, text, photoUrl }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, targetUserId, user]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName: user.firstName,
      photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-full md:w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div className="flex-1 overflow-y-scroll p-5">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (msg.firstName === user.firstName ? "chat-end" : "chat-start")
            }>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt={msg.firstName} src={msg.photoUrl} />
              </div>
            </div>
            <div className="chat-header">
              {msg.firstName || "User"}
              <time className="text-xs opacity-50 ml-2">
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString()
                  : ""}
              </time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-black rounded p-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
}
