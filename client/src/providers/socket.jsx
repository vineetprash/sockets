import React, { useMemo, useState } from "react";
import { io } from "socket.io-client";
const URL = "localhost:8001";
const SocketContext = React.createContext(null);

export function useSocket() {
  return React.useContext(SocketContext);
}
function SocketProvider(props) {
  const socket = useMemo(() => io(URL), []);
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  return (
    <SocketContext.Provider value={{ socket, username, setUsername }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
