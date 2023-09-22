import { motion } from "framer-motion";
import ProfileAdmin from "../Components/ProfileAdmin";
import ProfileUser from "../Components/ProfileUser";
import useAuthStore from "../Store/authStore";

export default function Profile() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const profile = useAuthStore((state) => state.profile);

  return (
    <motion.div
      className=" min-h-screen px-5 pt-14 md:px-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className=" font-main bg-gradient-to-r from-violet-500 to-white bg-clip-text pb-5 text-center text-3xl text-transparent">
        Benvenuto nel tuo profilo {profile.username}
      </h1>
      {isAdmin ? <ProfileAdmin /> : <ProfileUser />}
    </motion.div>
  );
}
