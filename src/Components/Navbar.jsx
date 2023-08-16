import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <>
      <Link to="/">Home</Link>
      <ThemeSwitcher />
    </>
  );
}
