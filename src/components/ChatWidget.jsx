import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { closeChat } from "../redux/features/chatSlice";
import { getChatUsersUnderTrainer } from "../services/userServices";
import { getTrainerForChat } from "../services/trainerServices";
const socket_url = import.meta.env.VITE_SOCKET_URL;
const socket = io(socket_url, { transports: ["websocket"] });
export default function ChatWidget() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.chat.isOpen);
  const currentUser = useSelector((state) => state.user.user);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users (trainer) or payment info (user)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await getChatUsersUnderTrainer();
        console.log(res.data);
        setUsersList(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const res = await getTrainerForChat();
        const data = res.data;
        setUserId(currentUser._id);
        setTrainerId(data.trainer.loginId);
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError("Failed to load payment data");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.role === "user") {
      fetchPaymentData();
    } else if (currentUser?.role === "trainer") {
      fetchUserData();
    }
  }, [currentUser]);

  // When trainer selects a user
  useEffect(() => {
    if (selectedUser) {
      // When a user is selected, update userId and trainerId and reset chat
      setUserId(selectedUser._id);
      setTrainerId(currentUser._id);
      setChat([]); // Clear the chat history for the new selection

      // Fetch chat history
      fetchChatHistory(selectedUser.loginId, currentUser._id);
    }
  }, [selectedUser, currentUser]);
  useEffect(() => {
    if (currentUser.role == "user") {
      fetchChatHistory(currentUser._id, trainerId);
    }
  }, [trainerId]);

  // Fetch chat history based on selected user and trainer
  const fetchChatHistory = async (userId, trainerId) => {
    if (!userId || !trainerId) return;

    try {
      const response = await fetch(
        `${socket_url}/api/v1/chat/${userId}/${trainerId}`
      );
      const data = await response.json();
      setChat(data.messages || []); // Update the chat history
    } catch (err) {
      console.error("Failed to fetch chat history", err);
    }
  };

  // Socket setup
  useEffect(() => {
    if (!userId || !trainerId) return;

    // const socket = io("http://localhost:3000", { transports: ["websocket"] });
    // socket.emit("register", { userId });
    socket.on("receive_message", (data) => {
      console.log("Received message:", data);
      if (
        (data.sender === userId && data.receiver === trainerId) ||
        (data.sender === trainerId && data.receiver === userId)
      ) {
        setChat((prev) => [...prev, data]);
      }
    });

    return () => socket.disconnect();
  }, [userId, trainerId]);

  // Send message to socket server
  useEffect(() => {
    if (!currentUser?._id) return;
    socket.emit("register", { userId: currentUser._id });
  }, [currentUser]);

  useEffect(() => {
    const handleReceive = (data) => {
      if (
        selectedUser &&
        ((data.sender === currentUser._id &&
          data.receiver === selectedUser.loginId) ||
          (data.sender === selectedUser.loginId &&
            data.receiver === currentUser._id))
      ) {
        setChat((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [selectedUser]);

  const sendMessage = () => {
    if (!message.trim()) return;
    let msgData = {};
    if (currentUser.role == "user") {
      msgData = {
        sender: currentUser._id,
        receiver: trainerId,
        message,
        timestamp: new Date(),
      };
    } else {
      msgData = {
        sender: trainerId,
        receiver: selectedUser.loginId,
        message,
        timestamp: new Date(),
      };
    }
    const socket = io(socket_url, { transports: ["websocket"] });
    socket.emit("send_message", msgData); // Send message to server

    setChat((prev) => [...prev, msgData]); // Update local chat immediately
    setMessage(""); // Clear the message input
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-6 w-96 h-[500px] bg-white shadow-xl rounded-xl flex flex-col border border-gray-200 z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center rounded-t-xl">
        <span>
          Chat{" "}
          {currentUser?.role === "trainer" && selectedUser
            ? `with ${selectedUser.fullname}`
            : ""}
        </span>
        <button
          onClick={() => dispatch(closeChat())}
          className="text-white font-bold text-xl leading-none"
        >
          ✖
        </button>
      </div>

      {/* Body: sidebar + messages */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (trainer only) */}
        {currentUser?.role === "trainer" && (
          <div className="w-44 bg-gray-50 border-r border-gray-200 flex flex-col overflow-y-auto">
            {usersList.length === 0 ? (
              <div className="p-2 text-gray-500 text-sm">No users found</div>
            ) : (
              usersList.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-blue-100 ${
                    selectedUser?._id === user._id ? "bg-blue-200" : ""
                  }`}
                  onClick={() => setSelectedUser(user)} // Select a user to chat with
                >
                  <span
                    role="img"
                    aria-label="user"
                    className="text-purple-700 text-lg"
                  >
                    👤
                  </span>
                  <span className="truncate">{user.fullname}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Messages area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-3 overflow-y-auto bg-white space-y-3">
            {chat.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">
                No messages yet
              </div>
            ) : (
              chat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === currentUser._id ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`relative max-w-[75%] px-4 py-2 text-sm ${
                      msg.sender === currentUser._id
                        ? "bg-green-200 text-black ml-auto rounded-2xl rounded-br-none pl-5"
                        : "bg-gray-100 text-black rounded-2xl rounded-bl-none pr-5"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer: message input */}
      <div className="flex border-t p-2 bg-white">
        <input
          type="text"
          className="flex-1 p-2 outline-none text-sm border border-gray-300 rounded-l-md"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r-md font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
