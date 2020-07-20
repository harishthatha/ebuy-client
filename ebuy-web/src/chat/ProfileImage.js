import React from "react";
import { ListItemAvatar, Avatar } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import OfflineIcon from "@material-ui/icons/FiberManualRecord";

export default ({
  isOnline,
  username,
  image,
  iconStyle = {},
  avatarStyle = {},
}) => {
  return (
    <>
      <ListItemAvatar style={{ position: "relative", ...avatarStyle }}>
        <Avatar alt={username} src={image} />
      </ListItemAvatar>

      {isOnline ? (
        <CheckCircleIcon
          style={{
            color: "#00FA9A",
            position: "absolute",
            left: 36,
            top: 33,
            height: 17,
            width: 17,
            ...iconStyle,
          }}
        />
      ) : (
        <OfflineIcon
          style={{
            color: "grey",
            position: "absolute",
            left: 36,
            top: 33,
            height: 17,
            width: 17,
            ...iconStyle,
          }}
        />
      )}
    </>
  );
};
