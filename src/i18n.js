import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const env =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173"
    : "https://final-project-pi-five.vercel.app/";

i18next
  .use(LanguageDetector)
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    backend: {
      loadPath: `${env}/locales/{{lng}}.json`,
    },
  });

export default i18next;