export default function GenresList({ genres, searchParams, setSearchParams }) {
  const handleChange = (slug) => {
    const allParams = Object.fromEntries([...searchParams]);

    setSearchParams({
      ...allParams,
      genres: slug,
    });
  };
  return (
    <>
      <p className="font-main mb-4 text-xl font-semibold text-[rgb(120,81,209)]">
        Genres
      </p>
      <div className="">
        {genres.results.map((el) => (
          <p
            onClick={() => handleChange(el.slug)}
            key={el.id}
            className={
              "font-main cursor-pointer  text-white transition-[0.5] hover:font-medium hover:text-[rgb(120,81,209)] " +
              (searchParams.get("genres") === el.slug
                ? "border-accent font-main border-b-2 font-medium tracking-widest "
                : "")
            }
          >
            {el.name}
          </p>
        ))}
      </div>
    </>
  );
}
