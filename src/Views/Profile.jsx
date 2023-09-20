import { motion } from "framer-motion";
import ProfileAdmin from "../Components/ProfileAdmin";
import ProfileUser from "../Components/ProfileUser";
import useAuthStore from "../Store/authStore";

export default function Profile() {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  return (
    <motion.div
      className=" min-h-screen px-5 pt-14 md:px-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className=" font-main text-3xl text-white">
        Benvenuto nel tuo profilo
      </h1>
      {isAdmin ? <ProfileAdmin /> : <ProfileUser />}
    </motion.div>
  );
}
