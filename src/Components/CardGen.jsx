import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../assets/Icons/Arrow.svg";
import { format } from "date-fns";

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
      <div className="container grid w-full grid-cols-1 justify-items-center gap-4 text-white">
        {gamesData &&
          gamesData.map((game) =>
            game.genres.map((genere) =>
              genere.id == parseInt(genreId) ? (
                <div
                  className="flex h-60 w-3/4 justify-between border-2 border-[#7851d1] "
                  key={game.id}
                >
                  <div className="grid w-3/5 bg-[#ffffffbe] text-black dark:bg-[#1d1a46a5] dark:text-white">
                    <div className="col-span-1 row-span-2 flex justify-center self-center">
                      <h3 className="font-main text-jusitfy text-l  bg-gradient-to-r from-violet-500 to-black bg-clip-text pt-1 font-semibold text-transparent dark:text-white md:text-left md:text-3xl">
                        {game.name}
                      </h3>
                    </div>
                    <div className="row-span-1 p-2">
                      <span className="mr-1 font-semibold">Genres:</span>
                      {game.genres.map((genre) => (
                        <Link
                          className="mr-2"
                          to={`/genere/${genre.id}`}
                          key={genre.name}
                        >
                          {genre.name}
                        </Link>
                      ))}
                    </div>
                    <div className="row-span-1 p-2">
                      <span className="mr-1 font-semibold">Released:</span>
                      {format(new Date(game.released), "dd/MM/yyyy")}
                    </div>
                    <div className="row-span-1 flex flex-wrap p-2">
                      <span className="mr-1 font-semibold">Platforms:</span>
                      {game.platforms.map((plat) => (
                        <p className="mr-2" key={plat.platform.name}>
                          {plat.platform.name}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="relative h-full w-2/5 bg-cover bg-center opacity-80 transition-opacity hover:opacity-100">
                    <div
                      style={{
                        backgroundImage: `url(${game.background_image})`,
                      }}
                      className="absolute inset-0 h-full w-full bg-cover bg-center opacity-80"
                    ></div>
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 hover:bg-black hover:opacity-80 hover:transition hover:duration-300 hover:ease-in-out">
                      <Link
                        to={`/details/${game.id}`}
                        className="flex opacity-100"
                      >
                        See more Details
                        <Arrow />
                      </Link>
                    </div>
                  </div>
                </div>
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

{
  /* <Card
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
</Card> */
}

{
  /* <h3 className="font-main row-span-3  bg-amber-400 text-2xl">
{game.name}
</h3>
<div className="col-span-2 flex flex-col items-center justify-center bg-red-300">
<p>Platforms: </p>
{game.platforms.map((plat) => (
  <p key={plat.platform.name}>{plat.platform.name}</p>
))}
</div>
<div className="col-span-2 row-span-2 flex flex-col items-center bg-slate-500">
<p>Genres: </p>
{game.genres.map((genre) => (
  <Link to={`/genere/${genre.id}`} key={genre.name}>
    {genre.name}
  </Link>
))}
</div>
<div className="col-span-1 row-start-1 row-end-5">
<img
  className="h-full w-full opacity-75"
  src={game.background_image}
  alt={game.name}
/>
</div> */
}
