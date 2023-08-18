"use client";

import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";

export default function MyDropdown() {
  const [data, setData] = useState();
  const [, setSortedGenres] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/genres?key=${
        import.meta.env.VITE_API_KEY
      }&page_size=${import.meta.env.VITE_API_SIZE}&dates=${
        import.meta.env.VITE_API_DATE
      }&platforms=18,1,7`,
    )
      .then((r) => r.json())
      .then((r) => {
        r.results.sort((a, b) => a.name.localeCompare(b.name));
        setData(r.results);
        setSortedGenres(r.results);
      });
  }, []);

  return (
    <Dropdown
      className="max-h-80 overflow-y-auto pt-1 font-semibold scrollbar-none dark:font-normal"
      color="#6b00b2"
      size="base"
      label="Categories"
    >
      {data &&
        data.map((el) => (
          <Dropdown.Item
            className="main-font bg-[#1e1b4b] font-semibold  dark:font-normal"
            as="Link"
            href={`/genere/${el.id}`}
            key={el.id}
          >
            {el.name}
          </Dropdown.Item>
        ))}
    </Dropdown>
  );
}
