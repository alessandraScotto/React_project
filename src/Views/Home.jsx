import Cards from "../Components/Cards";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="0	flex h-screen w-full items-center justify-center">
        <div className="mt-16 flex h-screen w-3/4 items-center justify-center border-l-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="font-main bg-gradient-to-r from-violet-500 to-white bg-clip-text text-center text-3xl text-transparent"
          >
            ReHack: Your Gateway to Gaming Adventures
          </motion.h1>
        </div>
      </div>
      <Cards />
    </>
  );
}
