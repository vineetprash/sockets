import { useCallback, useState } from "react";
import { useSocket } from "./providers/socket";
import { useNavigate } from "react-router-dom";

function App() {
  const { username, setUsername } = useSocket();
  const [roomcode, setRoomcode] = useState();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const handleJoin = useCallback(() => {
    socket.emit("join", { username: username, roomcode: roomcode });
    sessionStorage.setItem("username", username);
    navigate(`/room/${roomcode}`);
  });
  return (
    <div className="bg-purple-300 h-screen m-0  flex flex-col justify-center items-center p-4 gap-2">
      <input
        type="text"
        placeholder="Your username: "
        className="bg-white text-black border hover:bg-slate-200 p-4 rounded shadow-md"
        onInput={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room Code: "
        className="bg-white text-black border hover:bg-slate-200 p-4 rounded shadow-md"
        onInput={(e) => {
          setRoomcode(e.target.value);
        }}
      />
      <button
        onClick={handleJoin}
        className="bg-white text-black border hover:bg-slate-200 p-4 rounded shadow-md"
      >
        Join room
      </button>
    </div>
  );
}

export default App;
