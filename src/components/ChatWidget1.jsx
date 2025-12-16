import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { closeChat } from "../redux/features/chatSlice";
import { getUsersByOrder, getPaymentForChat } from "../services/userServices";
export default function ChatWidget1() {
  const url = import.meta.env.VITE_BASE_URL;
  const socket_url = import.meta.env.VITE_SOCKET_URL;
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.chat.isOpen);
  const currentUser = useSelector((state) => state.user.user);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await getUsersByOrder();
        setUserData(res.data.users);
        console.log(userData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const res = await getPaymentForChat();
        const data = res.data.order;
        setUserId(data.user._id);
        setTrainerId(data.trainer._id);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    if (currentUser.role == "user") {
      fetchPaymentData();
    }
    fetchUserData();
  }, []);
  useEffect(() => {
    if (!userId || !trainerId) return;
    fetch(`${url}/chat/${userId}/${trainerId}`)
      .then((res) => res.json())
      .then((data) => setChat(data));
  }, [userId, trainerId]);

  useEffect(() => {
    const socket = io(socket_url, { transports: ["websocket"] });
    socket.emit("register", { userId });
    socket.on("receive_message", (data) => {
      if (
        (data.sender === userId && data.receiver === trainerId) ||
        (data.sender === trainerId && data.receiver === userId)
      ) {
        setChat((prev) => [...prev, data]);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, trainerId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      sender: userId,
      receiver: trainerId,
      message,
      timestamp: new Date(),
    };
    const socket = io("socket_url", { transports: ["websocket"] });
    socket.emit("send_message", msgData);

    setChat((prev) => [...prev, msgData]);
    setMessage("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-80 h-[420px] bg-white shadow-xl rounded-xl flex flex-col border z-50">
      <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold flex justify-between">
        <span>Chat with Trainer</span>
        <button onClick={() => dispatch(closeChat())}>✖</button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              msg.sender === userId ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm max-w-[75%] ${
                msg.sender === userId
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.message}
            </div>
            <span className="text-[10px] text-gray-500 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex border-t">
        <input
          type="text"
          className="flex-1 p-2 outline-none text-sm"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-blue-600 px-4 text-white">
          Send
        </button>
      </div>
    </div>
  );
}
