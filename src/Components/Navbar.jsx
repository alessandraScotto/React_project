import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <nav className="fixed flex w-full justify-between border-b-2 bg-slate-200 py-1 text-indigo-950 dark:bg-indigo-950 dark:text-white">
      <Link className="px-2 pt-1" to="/">
        <img src="../src/assets/logo.png" width="80px" alt="" />
      </Link>
      <div className="flex w-full justify-evenly ">
        <Link className="mr-1" to="/">
          Home
        </Link>
        <Link className="mr-1" to="/">
          Home
        </Link>
        <Link to="/">Home</Link>
      </div>
      <div className="p-1 pr-2">
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
