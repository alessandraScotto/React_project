import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MyDropdown from "./MyDropdown";
import ThemeSwitcher from "./Switchers/ThemeSwitcher";
import { ReactComponent as Bars } from "../assets/icons/Bars.svg";
import { ReactComponent as User } from "../assets/icons/User.svg";

import useAuthStore from "../Store/authStore";
import { supabase } from "../Supabase/Client";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./Switchers/LanguageSwitcher";
import getProfileImage from "../Utilities/getProfileImage";

export default function Navigation() {
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();
  const commonLinkStyles =
    "mx-1 bg-gradient-to-r font-main from-violet-500 to-black bg-clip-text pt-1 dark:main-font  text-transparent  dark:text-white";
  const [open, setOpen] = useState(false);
  const lightLogo = "../src/assets/logo.png";
  const darkLogo = "../src/assets/logowhite.png";

  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
  const profile = useAuthStore((state) => state.profile);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setLoggedOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="fixed z-30 flex w-full  border-b-2 border-b-[#8358e6] bg-slate-200 py-1 text-indigo-950 opacity-90 dark:border-b-white dark:bg-indigo-950 dark:text-white">
        <div className="flex w-2/3 text-white md:w-1/3">
          <Link className="px-2 pt-1" to="/">
            <img
              className="hidden dark:block"
              src={lightLogo}
              width="80px"
              alt="LogoLight"
            />
            <img
              className="block dark:hidden"
              src={darkLogo}
              width="80px"
              alt="LogoDark"
            />
          </Link>
          <div className="hidden text-black dark:text-white md:ml-3 md:inline">
            <MyDropdown />
          </div>
        </div>

        <div className="flex w-1/2 items-center justify-end text-white md:w-2/3">
          <LanguageSwitcher />

          <ThemeSwitcher />

          {profile ? (
            <>
              <Link to="/profile" className="flex">
                <img
                  className="ml-2 h-8 w-8 rounded-full border border-cyan-600 object-fill"
                  src={getProfileImage(profile.avatar_url)}
                />

                <span className={commonLinkStyles}>{profile.username}</span>
              </Link>
              <button className={commonLinkStyles} onClick={logOut}>
                {t("common.logout")}
              </button>
            </>
          ) : (
            <Link to="/login" className={commonLinkStyles}>
              <User className="mx-2 pb-1  text-black dark:text-white" />
            </Link>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="px-2 text-black dark:text-white md:hidden"
          >
            <Bars />
          </button>
        </div>
      </nav>
      <nav
        className={
          "fixed right-0 z-20 h-screen w-full overflow-y-auto  bg-slate-200 bg-opacity-80 p-4 pt-20 backdrop-blur-sm  transition-transform dark:bg-indigo-950 dark:bg-opacity-80 " +
          (open ? "" : "translate-x-full")
        }
      >
        <div className="flex flex-col text-3xl">
          <Link to="/" className="font-main ">
            Home
          </Link>
          <div className="font-main py-10">
            <MyDropdown />
          </div>
          <Link to="/" className="font-main pb-10">
            {t("common.aboutUs")}
          </Link>
          <Link to="/" className="font-main">
            {t("common.contactUs")}
          </Link>
        </div>
      </nav>
    </>
  );
}
