import { motion } from "framer-motion";
import CarouselHome from "../Components/CarouselHome";
import Counters from "../Components/Counters";
import { useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { games, genres, stores } = useLoaderData();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="mt-16 flex h-screen w-3/4 items-center justify-center border-l-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="font-main bg-gradient-to-r from-violet-500 to-white bg-clip-text text-center text-3xl text-transparent"
          >
            {t("home.title")}
          </motion.h1>
        </div>
      </div>
      <div className="mb-20 mt-24 w-full">
        <Counters genres={genres} games={games} stores={stores} />
      </div>

      <CarouselHome data={genres} />
    </>
  );
}

export const getGames = async () => {
  return await fetch(
    `${import.meta.env.VITE_API_URL}/games?key=${import.meta.env.VITE_API_KEY}`,
  )
    .then((r) => r.json())
    .then((r) => r);
};

export const getGenres = async () => {
  return await fetch(
    `${import.meta.env.VITE_API_URL}/genres?key=${
      import.meta.env.VITE_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => {
      r.results.sort((a, b) => a.name.localeCompare(b.name));
      return r;
    });
};

export const getStores = async () => {
  return await fetch(
    `${import.meta.env.VITE_API_URL}/stores?key=${
      import.meta.env.VITE_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => r);
};

export const loadAll = async () => {
  const games = await getGames();
  const genres = await getGenres();
  const stores = await getStores();

  return { games, genres, stores };
};
