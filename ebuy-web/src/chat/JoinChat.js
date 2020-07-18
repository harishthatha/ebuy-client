import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TranslationContext } from "../contexts/TranslationContext";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

export default () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <div
        style={{
          border: "2px solid skyblue",
          borderRadius: "8px",
          paddingTop: "80px",
          paddingBottom: "80px",
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <TextField
          id="filled-multiline-static"
          label="Username"
          rows={1}
          defaultValue=""
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          variant="filled"
          style={{ paddingBottom: "8px" }}
        />
        <TextField
          id="filled-multiline-static"
          label="Room"
          defaultValue=""
          onChange={(event) => setRoom(event.target.value)}
          value={room}
          variant="filled"
          style={{ paddingBottom: "8px" }}
        />
        <Link
          onClick={(event) =>
            !username || !room ? event.preventDefault() : null
          }
          to={`/conversation?username=${username}&room=${room}`}
        >
          <Button variant="contained" color="primary">
            Sign in
          </Button>
        </Link>
        <div></div>
      </div>
    </>
  );
};
