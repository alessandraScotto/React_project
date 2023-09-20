"use client";

import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function MyDropdown() {
  const [data, setData] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/genres?key=${
        import.meta.env.VITE_API_KEY
      }&page_size=${import.meta.env.VITE_API_SIZE}`,
    )
      .then((r) => r.json())
      .then((r) => {
        r.results.sort((a, b) => a.name.localeCompare(b.name));
        setData(r.results);
      });
  }, []);

  return (
    <Dropdown
      className=" max-h-80 overflow-y-auto scrollbar-none"
      color="#6b00b2"
      size="base"
      label={t("api.categories")}
    >
      {data &&
        data.map((gen) => (
          <Dropdown.Item
            className="text-xl dark:bg-[#843fb35b] md:text-base"
            key={gen.id}
            as="Link"
            href={`/genere/${gen.id}`}
          >
            {gen.name}
          </Dropdown.Item>
        ))}
    </Dropdown>
  );
}

// .sort((a, b) => a.name.localeCompare(b.name))
