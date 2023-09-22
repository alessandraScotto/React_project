"use client";

import { Carousel } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function CarouselHome({ data }) {
  const { t } = useTranslation();
  return (
    <main className="relative w-full pb-12">
      <span
        id="spanLine"
        className="absolute left-[50px] top-[-120px] h-10  w-36 rounded-bl-lg border-b-2 border-l-2 pl-1 uppercase md:left-[159px] md:top-auto"
      >
        {" "}
      </span>
      <span
        id="spanLineTwo"
        className="absolute left-[192px] top-[-82px] h-20 w-3 rounded-tr-lg border-r-2 border-t-2 md:left-[300px] md:top-[38px]"
      ></span>

      <div className="mt-[150px] flex-col justify-between md:mt-0 md:flex  md:flex-row">
        <div className="flex items-center justify-center pb-4 md:w-1/2">
          <h3 id="arrow" className="py-5 text-center text-3xl text-white">
            {t("home.categoriesTitile")}
          </h3>
        </div>
        <Carousel
          slideInterval={3000}
          indicators={null}
          className="mr-3 h-80 w-full md:w-1/2"
        >
          {data &&
            data.results.map((el) => (
              <Link key={el.id} to={`/genere/${el.id}`} className="relative">
                <h3 className="font-main absolute inset-0 flex items-center justify-center text-center text-2xl font-bold uppercase tracking-tight text-white">
                  <p className="z-10 text-white">{el.name}</p>
                </h3>
                <img
                  key={el.id}
                  alt="Image genre"
                  src={el.image_background}
                  className="min-h-cover w-full opacity-40 transition-opacity hover:opacity-80"
                />
              </Link>
            ))}
        </Carousel>
      </div>
    </main>
  );
}
