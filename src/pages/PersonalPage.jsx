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
        socketRef.current = null;
      }
    };
  }, []);

  const handleJoin = () => {
    const safeRoom = roomId.trim();

    if (!safeRoom) {
      return;
    }

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

      socketRef.current.on("connect_error", () => {
        setConnected(false);
      });

      socketRef.current.on("chat:system", (payload) => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-system-${Math.random()}`,
            type: "system",
            message: payload?.message || "System message",
            at: payload?.at,
          },
        ]);
      });

      socketRef.current.on("chat:message", (payload) => {
        setMessages((prev) => [
          ...prev,
          {
            ...payload,
            id: payload?.id || `${Date.now()}-${Math.random()}`,
            type: "chat",
          },
        ]);
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

    if (!safeRoom || !safeMessage || !socketRef.current || !connected) {
      return;
    }

    socketRef.current.emit("chat:message", {
      roomId: safeRoom,
      message: safeMessage,
      name: name.trim() || "Anonymous",
      role,
    });

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (connected && message.trim()) {
        handleSend(event);
      }
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-300/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="relative overflow-hidden rounded-[32px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-pink-100 dark:border-gray-800 shadow-2xl transition-colors duration-300">
          {/* Inner Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-6 md:p-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-500 dark:text-pink-400 font-semibold">
                  Personal Page
                </p>

                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-3">
                  Wanna Confess Something?
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400">
                    Say it here, safely.
                  </span>
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl leading-relaxed">
                  A private, real-time space to share what is on your mind.
                  Create a room, invite your therapist, and chat instantly.
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 text-sm font-semibold border border-pink-100 dark:border-pink-900">
                  Live • 1:1
                </div>

                <div className="px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 text-sm font-semibold border border-indigo-100 dark:border-indigo-900">
                  End-to-end comfort
                </div>

                <div className="px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 text-sm font-semibold border border-purple-100 dark:border-purple-900">
                  No judgement zone
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Settings Panel */}
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80 p-5 shadow-sm backdrop-blur-sm transition-colors duration-300">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                    Set your space
                  </h2>

                  <div className="space-y-3">
                    {/* Name */}
                    <input
                      type="text"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent transition-colors"
                      placeholder="Your name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      maxLength={50}
                    />

                    {/* Role */}
                    <select
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent transition-colors"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                    >
                      <option value="customer">Customer</option>
                      <option value="therapist">Therapist</option>
                    </select>

                    {/* Room */}
                    <input
                      type="text"
                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-600 focus:border-transparent transition-colors"
                      placeholder="Room code"
                      value={roomId}
                      onChange={(event) => setRoomId(event.target.value)}
                      maxLength={100}
                    />
                  </div>

                  {/* Join Button */}
                  <div className="flex flex-wrap items-center gap-3 mt-5">
                    <button
                      type="button"
                      onClick={handleJoin}
                      disabled={!roomId.trim()}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {connected ? "Re-Join Room" : "Join Room"}
                    </button>

                    <span
                      className={`text-sm font-semibold flex items-center gap-2 ${
                        connected
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          connected
                            ? "bg-green-500 animate-pulse"
                            : "bg-gray-400 dark:bg-gray-600"
                        }`}
                      />
                      {connected ? "Connected" : "Not connected"}
                    </span>
                  </div>
                </div>

                {/* Tip */}
                <div className="rounded-2xl border border-pink-100 dark:border-pink-900/50 bg-gradient-to-r from-pink-50 to-indigo-50 dark:from-pink-950/30 dark:to-indigo-950/30 p-5 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Tip
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                    Use a unique room code and share it only with your
                    therapist to keep the space private.
                  </p>
                </div>
              </div>

              {/* Chat Panel */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-800/90 p-5 md:p-6 shadow-inner backdrop-blur-sm transition-colors duration-300">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        Confession Chat
                      </h2>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Messages are delivered instantly.
                      </p>
                    </div>

                    <span className="max-w-[150px] truncate text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      {roomId.trim() || "room"}
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 h-[360px] overflow-y-auto shadow-inner transition-colors duration-300">
                    {messages.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="text-4xl mb-3 opacity-50">
                          💬
                        </div>

                        <p className="text-gray-400 dark:text-gray-500">
                          No messages yet.
                        </p>

                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                          Join a room and start the conversation.
                        </p>
                      </div>
                    )}

                    {messages.map((item) => (
                      <div key={item.id} className="mb-4 last:mb-0">
                        {item.type === "system" ? (
                          <div className="flex justify-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                              {item.message}
                            </p>
                          </div>
                        ) : (
                          <div className="rounded-2xl bg-gradient-to-r from-pink-50 to-indigo-50 dark:from-pink-950/30 dark:to-indigo-950/30 border border-pink-100 dark:border-pink-900/50 p-3 transition-colors duration-300">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              <span className="font-semibold text-gray-700 dark:text-gray-200">
                                {item.name || "Anonymous"}
                              </span>

                              <span className="mx-1">•</span>

                              <span className="capitalize">
                                {item.role || "customer"}
                              </span>
                            </p>

                            <p className="text-gray-800 dark:text-gray-100 mt-1 break-words">
                              {item.message}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form
                    onSubmit={handleSend}
                    className="mt-5 flex flex-col md:flex-row gap-3"
                  >
                    <input
                      type="text"
                      className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 focus:border-transparent transition-colors"
                      placeholder={
                        connected
                          ? "Type your message..."
                          : "Join a room to start chatting..."
                      }
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={!connected}
                      maxLength={1000}
                    />

                    <button
                      type="submit"
                      disabled={!connected || !message.trim()}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Send
                    </button>
                  </form>

                  {!connected && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
                      Join a room before sending a message.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Privacy Notice */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Choose a private room code and avoid sharing sensitive
                information outside your trusted session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;