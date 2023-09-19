import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import MyDropdown from "./MyDropdown";

export default function Navbar() {
  const commonLinkStyles =
    "mr-1 bg-gradient-to-r from-violet-500 to-black bg-clip-text pt-1 font-semibold text-transparent dark:font-normal dark:text-white";
  const lightLogo = "../src/assets/logo.png";
  const darkLogo = "../src/assets/logowhite.png";
  return (
    <nav className="fixed z-10 flex w-full justify-between border-b-2 border-b-[#8358e6] bg-slate-200 py-1 text-indigo-950 opacity-90 dark:border-b-white dark:bg-indigo-950 dark:text-white">
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
      <div className="flex w-full justify-evenly ">
        <Link className={commonLinkStyles} to="/">
          Home
        </Link>
        <Link className={commonLinkStyles} to="/login">
          Login
        </Link>
        <MyDropdown />
      </div>
      <div className="p-1 pr-2">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
