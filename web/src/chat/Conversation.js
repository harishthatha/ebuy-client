import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TranslationContext } from "../contexts/TranslationContext";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useSSR } from "react-i18next";
import SendIcon from "@material-ui/icons/Send";
import queryString from "query-string";

let socket;

export default ({ location: { search } }) => {
  const { t } = useContext(TranslationContext);
  const [username, setUsername] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState("");
  const END_POINT = "http://localhost:3000";

  useEffect(() => {
    const { username: nameOfTheUser, room } = queryString.parse(search);
    socket = io(END_POINT);
    setUsername(nameOfTheUser);
    socket.emit("join", { username: nameOfTheUser, room }, (error) => {
      alert("user already exists");
    });
    console.log("socket ", socket);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [search, END_POINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      console.log("got new message ", message);
    });
  }, [messages]);

  // useEffect(() => {
  //   socket.on("chat", (data) => {
  //     setShowTyping("");
  //     setMessages([...messages, data]);
  //   });
  //   socket.on("typing", (data) => {
  //     setShowTyping(data);
  //   });
  // }, [socket]);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      name: username,
      message: chatMessage,
    });
    setChatMessage("");
    setShowTyping("");
  };

  console.log("messages ", messages);

  const messageTypingShow = () => socket.emit("typing", username);

  return (
    <>
      <h1>{t("chat.title")}</h1>
      <div
        style={{
          border: "2px solid skyblue",
          borderRadius: "8px",
          padding: "16px",
          width: "60%",
          height: "100%",
        }}
      >
        <div
          style={{
            maxHeight: "500px",
            overflow: "auto",
          }}
        >
          {messages.map(({ username, message }, index) => {
            return (
              <div
                key={index}
                style={{ backgroundColor: "white", padding: "8px" }}
              >
                <strong> {username}</strong> : {message}
              </div>
            );
          })}
          <div>
            <em>{showTyping}</em>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="filled-multiline-static"
            label="Message "
            multiline
            rows={1}
            defaultValue=""
            onKeyPress={messageTypingShow}
            onChange={(event) => setChatMessage(event.target.value)}
            value={chatMessage}
            variant="filled"
            style={{ width: "100%" }}
          />
          <div style={{ cursor: "pointer" }} onClick={sendMessage}>
            <SendIcon />
          </div>
        </div>
      </div>
    </>
  );
};
