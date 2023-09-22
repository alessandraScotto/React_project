import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardGen from "../Components/CardGen";

export default function Genre() {
  const [genreData, setGenreData] = useState();

  const { id } = useParams();
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/genres?key=${
        import.meta.env.VITE_API_KEY
      }`,
    )
      .then((r) => r.json())
      .then((r) => setGenreData(r.results));
  }, []);

  return (
    <section className="pt-4">
      {genreData &&
        genreData.map((genere) =>
          genere.id == parseInt(id) ? (
            <h1
              className="font-main w-full bg-gradient-to-r from-violet-500 to-white bg-clip-text pb-5 pt-20 text-center text-3xl text-transparent"
              key={genere.name}
            >
              Discover {genere.name} Category
            </h1>
          ) : null,
        )}
      <CardGen genreId={id} />;
    </section>
  );
}
