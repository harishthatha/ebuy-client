import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export default function MessageInput({
  chatMessage,
  sendMessage,
  setChatMessage,
  messageTypingShow,
}) {
  return (
    <form
      onSubmit={sendMessage}
      noValidate
      autoComplete="off"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <TextField
        id="messageInput"
        label="Message "
        color="primary"
        onKeyPress={messageTypingShow}
        onChange={(event) => setChatMessage(event.target.value)}
        value={chatMessage}
        variant="filled"
        fullWidth="100%"
      />

      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </form>
  );
}
