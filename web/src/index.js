require("@babel/plugin-transform-runtime");
// require("webpack-hot-middleware/client?reload=true");
require("./theme/main.css");
import React from "react";
import ReactDOM from "react-dom";
import App from "./easy-buy/App";
import TranslationProvider from "./contexts/TranslationContext";
import AuthProvider from "./contexts/AuthContext";
import { I18nextProvider } from "react-i18next";
import "./translations/i18next";
import i18next from "i18next";

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <TranslationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TranslationProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("react-container")
);
