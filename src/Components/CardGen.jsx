"use client";

import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function CardGen({ genreId }) {
  const [gamesData, setGamesData] = useState();

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=${
        import.meta.env.VITE_API_KEY
      }&genres=${genreId}&page_size=${import.meta.env.VITE_API_SIZE}`,
    )
      .then((r) => r.json())
      .then((r) => {
        setGamesData(r.results);
      });
  }, [genreId]);

  return (
    <section>
      <div className="flex flex-wrap justify-center pt-10">
        {gamesData &&
          gamesData.map((game) =>
            game.genres.map((genere) =>
              genere.id == parseInt(genreId) ? (
                <Card
                  className="mx-3 my-3 min-h-min w-1/4"
                  key={game.id}
                  imgAlt={game.name}
                  imgSrc={game.background_image}
                >
                  <Link className="font-main" to={`/details/${game.id}`}>
                    {game.name}
                  </Link>
                  <div className="flex">
                    <p className="mr-1">Genres: </p>
                    {game.genres.map((genre) => (
                      <Link
                        to={`/genere/${genre.id}`}
                        className="mr-1 "
                        key={genre.name}
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-wrap">
                    <p className="mr-1">Platforms: </p>
                    {game.platforms.map((plat) => (
                      <p className="mr-1" key={plat.platform.name}>
                        {plat.platform.name}
                      </p>
                    ))}
                  </div>
                </Card>
              ) : null,
            ),
          )}
      </div>
    </section>
  );
}

CardGen.propTypes = {
  genreId: PropTypes.string.isRequired,
};
