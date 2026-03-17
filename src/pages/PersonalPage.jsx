import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { API_BASE } from "../config";

const socketBase =
  process.env.REACT_APP_SOCKET_URL?.trim() ||
  API_BASE ||
  "http://localhost:5000";

const PersonalPage = () => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");
  const [roomId, setRoomId] = useState("confess-room");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleJoin = () => {
    const safeRoom = roomId.trim();
    if (!safeRoom) return;

    if (!socketRef.current) {
      socketRef.current = io(socketBase, {
        transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
        setConnected(true);
      });

      socketRef.current.on("disconnect", () => {
        setConnected(false);
      });

      socketRef.current.on("chat:system", (payload) => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-sys`,
            type: "system",
            message: payload.message,
            at: payload.at,
          },
        ]);
      });

      socketRef.current.on("chat:message", (payload) => {
        setMessages((prev) => [...prev, { ...payload, type: "chat" }]);
      });
    }

    socketRef.current.emit("join-room", {
      roomId: safeRoom,
      name: name.trim() || "Anonymous",
      role,
    });
  };

  const handleSend = (event) => {
    event.preventDefault();
    const safeRoom = roomId.trim();
    const safeMessage = message.trim();
    if (!safeRoom || !safeMessage || !socketRef.current) return;

    socketRef.current.emit("chat:message", {
      roomId: safeRoom,
      message: safeMessage,
      name: name.trim() || "Anonymous",
      role,
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-pink-100">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Wanna Confess Something? Anything
          </h1>
          <p className="text-gray-600 mb-8">
            Private real-time chat between customer and therapist. Share what is on your mind.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <select
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="therapist">Therapist</option>
            </select>
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700"
              placeholder="Room code"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <button
              type="button"
              onClick={handleJoin}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg"
            >
              {connected ? "Re-Join Room" : "Join Room"}
            </button>
            <span className={`text-sm font-semibold ${connected ? "text-green-600" : "text-gray-500"}`}>
              {connected ? "Connected" : "Not connected"}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 h-[360px] overflow-y-auto shadow-inner">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center mt-20">No messages yet.</p>
            )}
            {messages.map((item) => (
              <div key={item.id} className="mb-3">
                {item.type === "system" ? (
                  <p className="text-xs text-gray-400">{item.message}</p>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">{item.name}</span> · {item.role}
                    </p>
                    <p className="text-gray-800">{item.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="mt-6 flex flex-col md:flex-row gap-4">
            <input
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-gray-700"
              placeholder="Type your message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gray-900 text-white font-semibold shadow-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
