import React, { useContext, useState, useEffect } from "react";
import Message from "./Message";
import { TextField } from "@material-ui/core";
import ProfileImage from "./ProfileImage";
import brooklynImage from "../images/brooklyn.jpg";

export default ({ messages, showTyping }) => {
  return (
    <>
      <div style={{ overflow: "scroll", height: "685px" }}>
        {messages.map(({ username, message, isFromYou = true }, index) => {
          return (
            <div
              style={{
                position: "relative",
                display: "flex",
                marginTop: "20px",
              }}
            >
              <ProfileImage
                isOnline={true}
                username="harish"
                image={brooklynImage}
                iconStyle={{ left: 40, top: 23 }}
                avatarStyle={{ left: 16 }}
              />
              <Message
                key={index}
                isFromYou={isFromYou}
                message={{ text: message }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
