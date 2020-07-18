import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const TranslationContext = createContext({});

const TranslationProvider = ({ children }) => {
  const [selectedLocale, setSelectedLocale] = useState("en");

  const { t, i18n } = useTranslation("common");
  const changeLanguage = (lang) => {
    setSelectedLocale(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <TranslationContext.Provider value={{ t, selectedLocale, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
