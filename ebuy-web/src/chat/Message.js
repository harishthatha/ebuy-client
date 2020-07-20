import React, { useContext, useState, useEffect } from "react";
import UserList from "./UsersList";

export default ({ message: { text }, isFromYou }) => {
  console.log("isfrom you ", isFromYou);
  return (
    <>
      <div
        style={{
          borderRadius: false ? "30px 8px 8px 0px" : "8px 30px 0px 8px",
          padding: "16px",
          backgroundColor: "white",
          marginRight: "20px",
          backgroundColor: true ? "#E8E8E8" : "#778899",
          color: "black",
          width: "45%",
          marginLeft: false ? "auto" : "20px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <strong>{text}</strong>
      </div>
    </>
  );
};
