"use client";

import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cards() {
  const [data, setData] = useState();
  const [sortedGenres, setSortedGenres] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/genres?key=9dab235700f447f481d7946246e3c151&page_size=21&dates=2023-01-01,2023-03-15&platforms=18,1,7`,
    )
      .then((r) => r.json())
      .then((r) => {
        r.results.sort((a, b) => a.name.localeCompare(b.name));
        setData(r);
        setSortedGenres(r.results);
      });
  }, []);

  return (
    <main className="relative flex w-full justify-between border-b-2">
      <span
        id="spanLine"
        className="absolute h-20 w-36  rounded-bl-lg border-b-2 border-l-2 pl-1 uppercase text-white"
      >
        {" "}
      </span>
      <span
        id="spanLineTwo"
        className="absolute h-32 w-2 rounded-tr-lg border-r-2 border-t-2 text-white"
      ></span>
      <div className="flex w-1/2 items-center justify-center">
        <h3 className=" text-center text-3xl text-white">
          Discover a Wide Range of Categories
        </h3>
      </div>
      <Carousel
        slideInterval={3000}
        indicators={null}
        className="mr-3 h-screen w-1/2"
      >
        {data &&
          data.results.map((el) => (
            <Link key={el.id} className="relative">
              <h3 className="font-main absolute inset-0 flex items-center justify-center text-center text-2xl font-bold uppercase tracking-tight text-white">
                <p className="z-10 text-white">{el.name}</p>
              </h3>
              <img
                key={el.id}
                alt="..."
                src={el.image_background}
                className="min-h-cover w-full opacity-40 transition-opacity hover:opacity-80"
              />
            </Link>
          ))}
      </Carousel>
    </main>
  );
}
