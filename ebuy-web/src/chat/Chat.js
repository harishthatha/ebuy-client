import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TranslationContext } from "../contexts/TranslationContext";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Conversation from "./Conversation";
import UserList from "./UsersList";

export default () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const { t } = useContext(TranslationContext);

  useEffect(() => {}, []);

  return (
    <>
      <div
        style={{
          borderRadius: "8px",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <div style={{ flexBasis: "30%" }}>
          <UserList />
        </div>
        <div style={{ width: "100%" }}>
          <Conversation />
        </div>
      </div>
    </>
  );
};
