import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../assets/Icons/Arrow.svg";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import Button from "./Button";
import GameCard from "./GameCard";

export default function CardGen({ genreId }) {
  const [gamesData, setGamesData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const page_size = 5;

  useEffect(() => {
    const qs = [...searchParams].map((el) => `&${el[0]}=${el[1]}`).join("");

    fetch(
      `${import.meta.env.VITE_API_URL}/games?key=${
        import.meta.env.VITE_API_KEY
      }&genres=${genreId}&page_size=${page_size}&search_precise=true&ordering=-rating${qs}`,
    )
      .then((r) => r.json())
      .then((r) => {
        setGamesData(r.results);
      });
  }, [searchParams]);

  const handlePage = (order) => {
    console.log(order);
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

  return (
    <section>
      <div className="container grid w-full grid-cols-1 justify-items-center gap-4  text-white">
        {gamesData &&
          gamesData.map((game) =>
            game.genres.map((genere) =>
              genere.id == parseInt(genreId) ? (
                <GameCard game={game} key={game.id} />
              ) : null,
            ),
          )}
      </div>
      <div className="mb-12 mt-24 flex w-full items-center justify-center">
        {searchParams.get("page") > 1 && (
          <Button
            type="button"
            label="Prev page"
            onClick={() => handlePage("prev")}
          />
        )}

        <span className="mx-4 text-white">{searchParams.get("page")}</span>

        {gamesData && gamesData.length === page_size && (
          <Button
            type="button"
            label="Next page"
            onClick={() => handlePage("next")}
          />
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
