export default function StoresList({ stores, searchParams, setSearchParams }) {
  const handleChange = (id) => {
    const allParams = Object.fromEntries([...searchParams]);

    setSearchParams({
      ...allParams,
      stores: id,
    });
  };

  return (
    <>
      <p className="font-main mb-4 text-xl font-semibold text-[rgb(120,81,209)]">
        Stores
      </p>
      <div className="">
        {stores.results.map((el) => (
          <p
            onClick={() => handleChange(el.id)}
            key={el.id}
            className={
              "font-main cursor-pointer text-white transition-[0.5] hover:font-bold" +
              (searchParams.get("stores") == el.id
                ? "border-accent font-main border-b-2 font-bold tracking-widest text-[rgb(120,81,209)]"
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
