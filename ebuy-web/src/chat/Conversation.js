import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TranslationContext } from "../contexts/TranslationContext";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import { Button, Divider } from "@material-ui/core";
import { useSSR } from "react-i18next";
import SendIcon from "@material-ui/icons/Send";
import queryString from "query-string";
import Message from "./Message";
import MessageInput from "./MessageInput";
import MessagesList from "./MessagesList";
import ProfileImage from "./ProfileImage";
import brooklynImage from "../images/brooklyn.jpg";

export default ({ location: { search } = {} }) => {
  const { t } = useContext(TranslationContext);
  const [username, setUsername] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState("");
  const [socketId, setSocketId] = useState("");
  const END_POINT = "http://localhost:3000";
  const socketRef = useRef();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const { username: nameOfTheUser, room } = queryString.parse(search) || {};
    socketRef.current = io.connect(END_POINT);
    setUsername(nameOfTheUser);

    socketRef.current.emit(
      "join",
      {
        username: nameOfTheUser,
        room,
      },
      (error) => {}
    );

    socketRef.current.on("yourId", (id) => {
      console.log("yourId event ", id);
      setSocketId(id);
    });

    socketRef.current.on("message", (message) => {
      const { username: sentUser } = message;
      console.log("sentUser username ", sentUser, username);
      setNewMessage({ ...message, isFromYou: username === sentUser });
    });

    socketRef.current.on("typing", (typingMessage) => {
      setShowTyping(typingMessage);
    });

    return () => {
      socketRef.current.emit("disconnect");
      socketRef.current.off();
    };
  }, []);

  useEffect(() => {
    if (newMessage) setMessages([...messages, newMessage]);
  }, [newMessage]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (chatMessage) {
      socketRef.current.emit("sendMessage", {
        username,
        message: chatMessage,
        socketId,
      });
      setChatMessage("");
      setShowTyping("");
    }
  };

  const messageTypingShow = () => {
    const { room } = queryString.parse(search);
    console.log("typing messages ", username, room);
    socketRef.current.emit("typing", { username, room });
  };

  return (
    <>
      <div
        style={{
          borderLeft: "1px solid #000080",
          height: "100%",
          position: "relative",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "16px" }}
        >
          <ProfileImage
            isOnline={true}
            username="harish"
            image={brooklynImage}
            iconStyle={{ left: 40, top: 42 }}
          />
          <h1>Harish</h1>
        </div>
        <Divider />
        <MessagesList messages={messages} showTyping={showTyping} />
        <MessageInput
          chatMessage={chatMessage}
          sendMessage={sendMessage}
          setChatMessage={setChatMessage}
          messageTypingShow={messageTypingShow}
        />
      </div>
    </>
  );
};
