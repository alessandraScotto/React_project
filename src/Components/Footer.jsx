import { Link } from "react-router-dom";
import { ReactComponent as Twitter } from "../assets/Icons/Twitter.svg";
import { ReactComponent as Linkedin } from "../assets/Icons/Linkedin.svg";
import { ReactComponent as Insta } from "../assets/Icons/Insta.svg";
import { useTranslation } from "react-i18next";

export default function Footer() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  return (
    <footer className="flex justify-around border-t-2 border-t-[#8358e6] bg-slate-200  py-1 text-indigo-950 opacity-90 dark:border-t-white dark:bg-indigo-950 dark:text-white">
      <div className="flex flex-col py-3  pl-3">
        <Twitter />
        <Insta className="my-4 text-violet-300 " />
        <Linkedin className="bg-gradient-to-r from-violet-500 to-violet-900" />
      </div>
      <div className="flex items-center justify-center">
        <img
          className="hidden dark:block"
          src="../src/assets/logo.png"
          width="80px"
          alt="Logo"
        />
        <img
          className="block dark:hidden"
          src="../src/assets/logowhite.png"
          width="80px"
          alt="Logo"
        />
      </div>
      <div className="flex flex-col py-3  pl-3">
        <Link to="/">Home</Link>
        <Link className="my-3" to="/about">
          {t("common.aboutUs")}
        </Link>
        <Link to="/">{t("common.contactUs")}</Link>
      </div>
    </footer>
  );
}
