import { useState } from "react";
import Favorites from "./Admin/Favorites";
import Profiles from "./Admin/Profiles";
import { useEffect } from "react";
import { supabase } from "../supabase/client";

export default function ProfileAdmin() {
  const [data, setData] = useState(null);

  const getData = async () => {
    let { data, error } = await supabase.from("favorites").select();
    // console.log(data, error);

    const favs = [...new Set(data.map((el) => el.game_name))].map((el) => {
      return {
        id: el,
        label: el,
        value: data.filter((x) => x.game_name === el).length,
      };
    });
    // console.log(favs);
    setData(favs);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-24 min-h-screen px-5 md:px-24">
      <div>
        <h1 className="mb-12 text-2xl">
          Questa è la lista dei giochi favoriti
        </h1>
        <div className="h-[500px] w-full">
          {data && <Favorites data={data} />}
        </div>
        <h1 className="mb-12 text-2xl">
          Questa è la lista degli utenti registrati
        </h1>
        <Profiles />
      </div>
    </div>
  );
}
