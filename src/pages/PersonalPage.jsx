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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.25),_rgba(99,102,241,0.15),_transparent_60%)] from-pink-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[32px] bg-white/90 backdrop-blur border border-pink-100 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 font-semibold">
                  Personal Page
                </p>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
                  Wanna Confess Something?
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                    Say it here, safely.
                  </span>
                </h1>
                <p className="text-gray-600 mt-4 max-w-2xl">
                  A private, real-time space to share what is on your mind. Create a room, invite your therapist, and chat instantly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-semibold border border-pink-100">
                  Live • 1:1
                </div>
                <div className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold border border-indigo-100">
                  End-to-end comfort
                </div>
                <div className="px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold border border-purple-100">
                  No judgement zone
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-800 mb-3">Set your space</h2>
                  <div className="space-y-3">
                    <input
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      placeholder="Your name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <select
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                    >
                      <option value="customer">Customer</option>
                      <option value="therapist">Therapist</option>
                    </select>
                    <input
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
                      placeholder="Room code"
                      value={roomId}
                      onChange={(event) => setRoomId(event.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-5">
                    <button
                      type="button"
                      onClick={handleJoin}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg"
                    >
                      {connected ? "Re-Join Room" : "Join Room"}
                    </button>
                    <span className={`text-sm font-semibold ${connected ? "text-green-600" : "text-gray-500"}`}>
                      {connected ? "Connected" : "Not connected"}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-pink-50 to-indigo-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-600">Tip</h3>
                  <p className="text-gray-700 mt-2">
                    Use a unique room code and share it only with your therapist to keep the space private.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-gray-100 bg-white/90 p-6 shadow-inner">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Confession Chat</h2>
                      <p className="text-sm text-gray-500">Messages are delivered instantly.</p>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-gray-400">
                      {roomId || "room"}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 p-4 h-[360px] overflow-y-auto shadow-inner">
                    {messages.length === 0 && (
                      <p className="text-gray-400 text-center mt-20">No messages yet.</p>
                    )}
                    {messages.map((item) => (
                      <div key={item.id} className="mb-4">
                        {item.type === "system" ? (
                          <p className="text-xs text-gray-400">{item.message}</p>
                        ) : (
                          <div className="rounded-2xl bg-gradient-to-r from-pink-50 to-indigo-50 border border-pink-100 p-3">
                            <p className="text-xs text-gray-500">
                              <span className="font-semibold text-gray-700">{item.name}</span> · {item.role}
                            </p>
                            <p className="text-gray-800 mt-1">{item.message}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSend} className="mt-5 flex flex-col md:flex-row gap-4">
                    <input
                      className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
