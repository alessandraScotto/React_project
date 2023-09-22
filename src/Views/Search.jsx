/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import GenresList from "../Components/GenresList";
import GameCard from "../Components/GameCard";

export default function Search() {
  const genres = useLoaderData();

  const { genre } = useParams();
  const { num = 1 } = useParams();

  const [games, setGames] = useState(null);
  const [searched, setSearched] = useState("");

  const [loading, setLoading] = useState(true);

  const page_size = 12;

  useEffect(() => {
    setLoading(true);
    setGames(null);
    setSearched("");
    fetch(
      `${import.meta.env.VITE_API_URL}/games?&key=${
        import.meta.env.VITE_API_KEY
      }&genres=${genre}&page=${num}&page_size=${page_size}&ordering=-rating`,
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setGames(r);
        setLoading(false);
      });
  }, [genre, num]);

  const triggerSearch = () => {
    setLoading(true);
    setGames(null);
    fetch(
      `${import.meta.env.VITE_API_URL}/games?&key=${
        import.meta.env.VITE_API_KEY
      }&page_size=30&search=${searched}&search_precise=true&ordering=-rating`,
    )
      .then((r) => r.json())
      .then((r) => {
        setGames(r);
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen px-6">
      <div className="flex w-1/5 flex-col">
        <div className="mb-12">
          <input
            type="text"
            className="border-accent border-b-2 bg-transparent text-slate-700 dark:text-white"
            placeholder="Search by name..."
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
          />
          <button onClick={triggerSearch} className="bg-transparent">
            Search
          </button>
        </div>

        <GenresList genres={genres} genre={genre} />
      </div>
      <div className="w-4/5">
        {games && (
          <>
            <div className="flex flex-wrap">
              {games.results.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <div className="mb-12 w-full">
              {!searched && (
                <div className="flex justify-center">
                  <div className="w-48 text-center">
                    {num > 1 && (
                      <Link
                        to={`/search/${genre}/${+num - 1}`}
                        className="text-slate-800 dark:text-white"
                      >
                        prev
                      </Link>
                    )}
                  </div>
                  <div className="w-48 text-center">{num}</div>
                  <div className="w-48 text-center">
                    <Link
                      to={`/search/${genre}/${+num + 1}`}
                      className="text-slate-800 dark:text-white"
                    >
                      next
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {loading && (
          <div className="flex h-full items-center justify-center">loader</div>
        )}
      </div>
    </div>
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
