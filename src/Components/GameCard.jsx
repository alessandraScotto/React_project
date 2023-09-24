import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "../assets/Icons/Arrow.svg";

export default function GameCard({ game }) {
  return (
    <div
      className=" flex h-72 w-3/4 justify-between rounded-md border-2 border-[#7851d1] "
      key={game.id}
    >
      <div className="hidden w-3/5 rounded-l-md bg-[#ffffff] bg-opacity-90 text-black  dark:bg-[rgba(31,41,55,0.82)] dark:text-white md:grid">
        <div className="col-span-1 row-span-2 flex justify-center self-center">
          <h3 className="font-main text-l bg-gradient-to-r from-violet-500  to-black bg-clip-text p-1 pt-2 text-center font-semibold text-transparent dark:text-white md:text-left md:text-3xl">
            {game.name}
          </h3>
        </div>
        <div className="row-span-1  p-2 text-xl">
          <span className="mr-1 font-semibold">Genres:</span>
          {game.genres.map((genre) => (
            <Link
              className="mr-2 transition-[0.5] hover:font-bold"
              to={`/genere/${genre.id}`}
              key={genre.name}
            >
              {genre.name}
            </Link>
          ))}
        </div>
        <div className="row-span-1 p-2  text-xl">
          <span className="mr-1 font-semibold">Released:</span>
          {format(new Date(game.released), "dd/MM/yyyy")}
        </div>
        <div className="row-span-1 flex flex-wrap p-2  text-xl">
          <span className="mr-1 font-semibold">Platforms:</span>
          {game.platforms.map((plat) => (
            <p className="mr-2" key={plat.platform.name}>
              {plat.platform.name}
            </p>
          ))}
        </div>
      </div>

      <div className="relative h-full w-full rounded-r-md bg-cover bg-center opacity-80 transition-opacity hover:opacity-100 md:w-2/5">
        <div
          style={{
            backgroundImage: `url(${game.background_image})`,
          }}
          className="absolute inset-0 h-full w-full rounded-r-md bg-cover bg-center opacity-80"
        ></div>
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-r-md bg-black opacity-60 transition-[0.5] hover:bg-black hover:opacity-80 hover:transition hover:duration-300 md:opacity-0">
          <p className="md:hidden">{game.name}</p>
          <Link
            to={`/details/${game.id}`}
            className="flex font-medium opacity-100"
          >
            See more Details
            <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
