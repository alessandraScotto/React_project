import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import GenresList from "../Components/GenresList";
import GameCard from "../Components/GameCard";
import StoresList from "../Components/StoresList";
// import { Helmet } from "react-helmet-async";
import Button from "../Components/Button";
import { motion } from "framer-motion";

export default function SearchPage() {
  const { genres, stores } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const qs = [...searchParams].map((el) => `&${el[0]}=${el[1]}`).join("");
    fetch(
      `${import.meta.env.VITE_API_URL}/games?&key=${
        import.meta.env.VITE_API_KEY
      }&page_size=${page_size}&search_precise=true&ordering=-rating${qs}`,
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setGames(r);
      });
  }, [searchParams]);

  const [games, setGames] = useState(null);
  const [searched, setSearched] = useState("");

  const page_size = 12;

  const handlePage = (order) => {
    const allParams = Object.fromEntries([...searchParams]);

    if (order === "next") {
      setSearchParams({
        ...allParams,
        page: allParams.page ? +allParams.page + 1 : 2,
      });
    } else {
      setSearchParams({
        ...allParams,
        page: allParams.page == 1 || !allParams.page ? 1 : +allParams.page - 1,
      });
    }
  };

  const handleSearched = () => {
    setSearchParams({ search: searched });
  };

  return (
    <>
      <motion.div
        className="flex min-h-screen px-6 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex w-1/5 flex-col">
          <div className="">
            <input
              className="peer block w-full appearance-none rounded-md border-0  bg-slate-200  p-2.5 text-gray-900  focus:outline-none focus:ring-0  dark:bg-[rgb(29,38,49)] dark:text-white"
              type="search"
              value={searched}
              onChange={(e) => setSearched(e.target.value)}
              placeholder="Search your game"
            />
            <div className="mt-3 text-right">
              <Button type="button" onClick={handleSearched} label="Search" />
            </div>
          </div>
          <GenresList
            genres={genres}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          <StoresList
            stores={stores}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className="w-4/5">
          {games && (
            <>
              <div className="container grid w-full grid-cols-1 justify-items-center gap-4  text-white">
                {games.results.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>

              <div className="mb-12 mt-24 flex w-full items-center justify-center">
                <Button
                  type="button"
                  label="Prev page"
                  onClick={() => handlePage("prev")}
                />

                <span className="mx-4">{searchParams.get("page")}</span>

                <Button
                  type="button"
                  label="Next page"
                  onClick={() => handlePage("next")}
                />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}

export const getGenres = async () => {
  return await fetch(
    `${import.meta.env.VITE_API_URL}/genres?key=${
      import.meta.env.VITE_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => r.results);
};

export const getStores = async () => {
  return await fetch(
    `${import.meta.env.VITE_API_URL}/stores?key=${
      import.meta.env.VITE_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => r.results);
};

export const loadAll = async () => {
  const genres = await getGenres();
  const stores = await getStores();

  return { genres, stores };
};
