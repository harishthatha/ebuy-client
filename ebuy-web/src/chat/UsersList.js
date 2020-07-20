import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TranslationContext } from "../contexts/TranslationContext";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import queryString from "query-string";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import googleImage from "../images/google.jpg";
import brooklynImage from "../images/brooklyn.jpg";
import OfflineIcon from "@material-ui/icons/FiberManualRecord";
import ProfileImage from "./ProfileImage";

export default ({ location: { search } = {} }) => {
  const { t } = useContext(TranslationContext);
  return (
    <>
      <h1 style={{ marginLeft: 12 }}>Users</h1>
      <div style={{ overflow: "scroll", height: "730px" }}>
        <List component="nav" aria-label="secondary mailbox folders">
          {[
            "Harish",
            "mahesh",
            "Tesla",
            "Elon Musk",
            "Omniwyse",
            "Harish",
            "mahesh",
            "Tesla",
            "Elon Musk",
            "Omniwyse",
            "Harish",
            "mahesh",
            "Tesla",
            "Elon Musk",
            "Omniwyse",
            "Harish",
            "mahesh",
            "Tesla",
            "Elon Musk",
            "Omniwyse",
          ].map((username, index) => {
            return (
              <>
                {index === 0 && <Divider />}
                <ListItem key={username} button>
                  <ProfileImage
                    image={brooklynImage}
                    username={username}
                    isOnline={username === "Harish"}
                  />

                  {index === 0 ? (
                    <ListItemText
                      id={username}
                      primary={
                        <Typography type="body2" style={{ color: "black" }}>
                          <strong> {username}</strong>
                        </Typography>
                      }
                    />
                  ) : (
                    <ListItemText id={username} primary={username} />
                  )}
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </div>
    </>
  );
};
