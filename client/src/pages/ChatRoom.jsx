import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../providers/socket";
import ChatBlock from "../components/ChatBlock";

function ChatRoom() {
  const roomId = useParams();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { username } = useSocket();

  const sendMessage = useCallback(
    async function (content, roomId) {
      socket.emit("send-message", { message: content, username });
      // setMessages((prev) => [...prev, content]);
    },
    [socket, username]
  );
  // console.log("Received message: ");

  useEffect(() => {
    socket.on("new-message", ({ message }) => {
      console.log("Received message: ", message);
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("joined-room", ({ roomcode }) => {
      console.log("Successfully joined room with id: ", roomcode);
    });
  }, [socket]);

  return (
    <div className="px-2 bg-purple-100 w-full min-h-screen">
      <div className="flex flex-col gap-2  py-3">
        {messages.map((item, index) => (
          <ChatBlock
            content={item}
            sender={null}
            variant={"sent"}
            key={index}
          />
        ))}
      </div>
      <div className="fixed flex bottom-0 left-0 w-screen h-fit py-4 px-2 bg-purple-300 justify-between">
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onInput={(e) => setInput(e.target.value)}
          className="bg-white text-black border hover:bg-slate-200 p-2 py-1 rounded shadow-md"
        />
        <button
          className="bg-white text-black border hover:bg-slate-200 p-2 rounded shadow-md"
          onClick={() => {
            sendMessage(input);
            setInput("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
