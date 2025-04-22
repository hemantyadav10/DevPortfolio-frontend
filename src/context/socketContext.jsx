import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./authContext";

const SocketContext = createContext({ socket: null });

export const useSocket = () => useContext(SocketContext);

const getSocket = () => {
  const token = localStorage.getItem("token");

  return io('http://localhost:5000', {
    withCredentials: true,
    auth: { token },
  });
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = getSocket();
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else {
      setSocket(null);
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;