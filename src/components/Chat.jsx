import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import connectSocket from "../utils/socket";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constant";
import { addMessage, addMessages } from "../utils/messageSlice";
import { extractTimeFromDate } from "../utils/helper";

const Chat = () => {
  const dispatch = useDispatch();
  const { targetUserId } = useParams();

  const recentMessages = useSelector((store) => store.messages);
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);

  const [msg, setMsg] = useState("");
  const socketId = useRef(null);
  const fromUserId = user._id;
  const chatEndRef = useRef(null);

  const fetchChats = async () => {
    try {
      const res = await axios.get(BACKEND_BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      dispatch(addMessages(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [targetUserId]);

  useEffect(() => {
    if (!socketId.current) {
      socketId.current = connectSocket.connect();
    }

    // Join chat room
    socketId.current.emit("joinChat", {
      targetUserId,
      fromUserId,
      fromUserName: user.firstName,
    });

    // Remove old listener first (prevents duplicates)
    socketId.current.off("messageResponse");

    // Add listener
    socketId.current.on("messageResponse", (data) => {
      dispatch(addMessage(data));
    });

    return () => {
      // Leave room instead of killing entire socket connection
      socketId.current.emit("leaveChat", { targetUserId, fromUserId });
    };
  }, [targetUserId]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [recentMessages]);

  const handleSendMessage = () => {
    if (msg.trim()) {
      socketId.current.emit("message", {
        text: msg,
        fromUserId: user._id,
        fromUserName: user.firstName,
        targetUserId,
        toUserName: "Aakash",
        id: `${socketId.current.id}${Math.random()}`,
        socketID: socketId.current.id,
      });
    }
    setMsg("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && msg.trim()) {
      handleSendMessage();
    }
  };

  const targetUser = connections.find(
    (user) => user._id?.toString() === targetUserId
  );

  return (
    <div className="flex flex-col h-full p-4">
      <div className="navbar bg-base-200 shadow-sm px-4">
        <div className="flex-1">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                src={
                  targetUser.photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <a className="btn btn-ghost text-xl">
            {targetUser.firstName + " " + targetUser.lastName}
          </a>
        </div>
      </div>
      {/* Messages scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {recentMessages?.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No chat history yet
          </div>
        ) : (
          recentMessages.map(({ senderId, text, createdAt, _id }) => (
            <div
              key={_id}
              className={`chat ${
                senderId._id?.toString() === user._id?.toString()
                  ? "chat-end"
                  : "chat-start"
              }`}
            >
              <div className="chat-header">
                {senderId.firstName}
                <time className="text-xs opacity-50 ml-2">
                  {extractTimeFromDate(createdAt)}
                </time>
              </div>
              <div className="chat-bubble">{text}</div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input fixed at bottom of chat */}
      <div className="p-4 border-t flex gap-4">
        <input
          type="text"
          value={msg}
          placeholder="Type a message..."
          onChange={(e) => setMsg(e.target.value)}
          className="input input-bordered flex-1 text-lg"
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
