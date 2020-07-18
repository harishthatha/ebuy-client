import common_fr from "./locales/fr/fr.json";
import common_en from "./locales/en-us/en-us.json";
import i18next from "i18next";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // language to use
  resources: {
    en: {
      common: common_en, // 'common' is our custom namespace
    },
    fr: {
      common: common_fr,
    },
  },
});
