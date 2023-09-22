import { useLoaderData } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import GameChat from "../Components/GameChat/GameChat";
import { supabase } from "../Supabase/Client";

export default function GameDetails() {
  const game = useLoaderData();
  const profile = useAuthStore((state) => state.profile);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  // /* console.log("profile.favorites", profile.favorites); */

  const isFavorite = () => {
    return profile.favorites.find((el) => +el.game_id === game.id);
  };

  const toggleFavorite = async () => {
    const data = await supabase.auth.getSession();
    if (isFavorite()) {
      // togli dai favoriti
      const { data, error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", isFavorite().id);
      console.log(data, error);
    } else {
      const { data, error } = await supabase
        .from("favorites")
        .insert({ user_id: profile.id, game_id: game.id, game_name: game.name })
        .select();
      console.log(data, error);
      // setta fra i favoriti
    }

    setLoggedIn(data.data.session);
  };

  return (
    <div
      className="min-h-screen px-12 py-24"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,1)), url("${game.background_image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex text-white">
        <div className="w-1/2">
          <p className="font-main  pb-4 text-3xl font-bold  md:text-5xl ">
            {game.name}
          </p>

          {profile && (
            <div className="my-12 flex justify-center rounded-md shadow-[0px_0px_32px_0px_#fff5f5]">
              <span className="font-main mr-2">
                {isFavorite()
                  ? "Rimuovi dai preferiti"
                  : "Aggiungi ai preferiti"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorite() ? "red" : "white"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={isFavorite() ? "red" : "white"}
                className="h-6 w-6 "
                onClick={toggleFavorite}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
        </div>

        <div className="w-1/2">{profile && <GameChat game={game.id} />}</div>
      </div>
    </div>
  );
}

export const getGameDetails = async ({ params }) => {
  return await fetch(
    `${import.meta.env.VITE_API_URL}/games/${params.id}?key=${
      import.meta.env.VITE_API_KEY
    }`,
  )
    .then((r) => r.json())
    .then((r) => {
      return r;
    });
};
