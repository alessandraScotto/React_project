import { useParams } from "react-router-dom";
import CarouselGenre from "../Components/CardGen";
import { useEffect, useState } from "react";

export default function Genre() {
  const [genreData, setGenreData] = useState();

  const { id } = useParams();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/genres?key=${
        import.meta.env.VITE_API_KEY
      }&dates=${import.meta.env.VITE_API_DATE}`,
    )
      .then((r) => r.json())
      .then((r) => setGenreData(r.results));
  }, []);

  return (
    <>
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
      <CarouselGenre genreId={id} />;
    </>
  );
}
