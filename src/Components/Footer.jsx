import { Link } from "react-router-dom";
import { ReactComponent as Twitter } from "../assets/Icons/Twitter.svg";
import { ReactComponent as Linkedin } from "../assets/Icons/Linkedin.svg";
import { ReactComponent as Insta } from "../assets/Icons/Insta.svg";

export default function Footer() {
  return (
    <footer className="flex justify-around border-t-2 border-t-white  bg-[#171415e6]  text-white opacity-100">
      <div className="flex flex-col py-3  pl-3">
        <Twitter />
        <Insta className="my-4 text-violet-300 " />
        <Linkedin className="bg-gradient-to-r from-violet-500 to-violet-900" />
      </div>
      <div className="flex items-center justify-center">
        <img src="../src/assets/logo.png" width="80px" alt="" />
      </div>
      <div className="flex flex-col py-3  pl-3">
        <Link to="/">Home</Link>
        <Link className="my-3" to="/about">
          About us
        </Link>
        <Link to="/">Contact us</Link>
      </div>
    </footer>
  );
}
