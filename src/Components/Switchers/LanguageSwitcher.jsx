import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../Costants";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const change = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="flex  text-black dark:text-white">
      {LANGUAGES.map((el) => (
        <span
          className={
            "me-2 uppercase " +
            (el.code === i18n.resolvedLanguage
              ? "font-bold tracking-widest"
              : "")
          }
          onClick={() => change(el.code)}
          key={el.code}
        >
          {el.code}
        </span>
      ))}
    </div>
  );
}
