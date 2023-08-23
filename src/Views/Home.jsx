import { motion } from "framer-motion";
import CarouselHome from "../Components/CarouselHome";
// import { supabase } from "../Supabase/Client";

export default function Home() {
  // const register = async () => {
  //   const fakeData = {
  //     email: Math.random() + "bla@bla.com",
  //     password: "1234567",
  //     confirm_password: "1234567",
  //     options: {
  //       data: {
  //         username: "Pippo",
  //         first_name: "Pi",
  //         last_name: "Poo",
  //       },
  //     },
  //   };
  //   const { data, error } = await supabase.auth.signUp(fakeData);
  //   console.log(data, error);
  // };
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
          {/* <button className="bg-red-500" onClick={register}>
            Register now
          </button> */}
        </div>
      </div>
      <CarouselHome />
    </>
  );
}
