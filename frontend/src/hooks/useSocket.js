import React from "react";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const useSocket = () => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    //  create socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    // connection event
    socketRef.current.on("connect", () => {
      setConnected(true);
      console.log("connected to server:", socketRef.current.id);
    });

    // disconnection event
    socketRef.current.on("disconnect", () => {
      setConnected(false);
      console.log("disconnected to server:");
    });

    socketRef.current.on("connected", (data) => {
      console.log("server message:", data.message);
    });

    // cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return {
    socket: socketRef.current,
    connected,
  };
};
export default useSocket;
