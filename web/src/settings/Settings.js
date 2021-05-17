import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TranslationContext } from "../contexts/TranslationContext";

export default () => {
  const { t } = useContext(TranslationContext);
  return (
    <>
      <h1>{t("settings.title")}</h1>
    </>
  );
};
