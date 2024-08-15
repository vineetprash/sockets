import React from "react";
import "../index.css";

function ChatBlock({ sender, content, variant }) {
  if (variant === "sent") {
    return (
      <div className="bg-white w-fit min-h-12 text-black border p-4 rounded shadow-md block float-right">
        <div>{sender}</div>
        <div>{content}</div>
      </div>
    );
  }

  if (variant === "rec") {
    return (
      <div className="bg-white min-h-12 text-black border p-4 rounded shadow-md block float-left">
        <div>{sender}</div>
        <div>{content}</div>
      </div>
    );
  }
}

export default ChatBlock;
