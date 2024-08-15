import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SocketProvider from "./providers/socket";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/room/:roomid",
    element: <ChatRoom />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketProvider>
    <RouterProvider router={router} />
  </SocketProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
