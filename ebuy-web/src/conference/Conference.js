import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TranslationContext } from "../contexts/TranslationContext";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useSSR } from "react-i18next";
import SendIcon from "@material-ui/icons/Send";
import queryString from "query-string";

export default ({ location: { search } }) => {
  const { t } = useContext(TranslationContext);

  return (
    <>
      <h1>Conference</h1>
    </>
  );
};
