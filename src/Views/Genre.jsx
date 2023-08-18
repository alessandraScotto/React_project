"use client";

import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Genre() {
  const [genreData, setGenreData] = useState();
  const [gamesData, setGamesData] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/genres?key=${
        import.meta.env.VITE_API_KEY
      }&page_size=${import.meta.env.VITE_API_SIZE}&dates=${
        import.meta.env.VITE_API_DATE
      }&platforms=18,1,7`,
    )
      .then((r) => r.json())
      .then((r) => setGenreData(r.results));
  }, []);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/games?key=${
        import.meta.env.VITE_API_KEY
      }&page_size=${import.meta.env.VITE_API_SIZE}&dates=${
        import.meta.env.VITE_API_DATE
      }&platforms=18,1,7`,
    )
      .then((r) => r.json())
      .then((r) => setGamesData(r.results));
  }, []);

  return (
    <section>
      {genreData &&
        genreData.map((genere) =>
          genere.id == parseInt(id) ? (
            <h1
              className="font-main w-full bg-gradient-to-r from-violet-500 to-white bg-clip-text pb-3 pt-20 text-center text-3xl text-transparent"
              key={genere.name}
            >
              Discover {genere.name} Category
            </h1>
          ) : null,
        )}
      <div className="flex flex-wrap justify-center pt-10">
        {gamesData &&
          gamesData.map((game) =>
            game.genres.map((genere) =>
              genere.id == parseInt(id) ? (
                <Card
                  className="mx-3 my-3 min-h-min w-1/4"
                  key={game.id}
                  imgAlt={game.name}
                  imgSrc={game.background_image}
                >
                  <h3>{game.name}</h3>
                </Card>
              ) : null,
            ),
          )}
      </div>
    </section>
  );
}
