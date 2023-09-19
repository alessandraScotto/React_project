// import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

export default function Counters({ games, genres, stores }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="grid grid-cols-4 text-white">
      <div className="text-center">
        <p className="text-2xl">{t("api.games")}</p>
        <CountUp end={games.count} className="text-4xl md:text-5xl" />
      </div>
      <div className="text-center">
        <p className="text-2xl">{t("api.genres")}</p>
        <CountUp end={genres.count} className="text-4xl md:text-5xl" />
      </div>
      <div className="text-center">
        <p className="text-2xl">{t("api.stores")}</p>
        <CountUp end={stores.count} className="text-4xl md:text-5xl" />
      </div>
      <div className="text-center">
        <p className="text-2xl">{t("api.gamers")}</p>
        <CountUp end={342} className="text-4xl md:text-5xl" />
      </div>
    </div>
  );
}
