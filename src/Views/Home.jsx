import Cards from "../Components/Cards";

export default function Home() {
  return (
    <>
      <div className="0	flex h-screen w-full items-center justify-center">
        <div className="mt-16 flex h-screen w-3/4 items-center justify-center border-l-2">
          <h1 className="font-main bg-gradient-to-r from-violet-500 to-white bg-clip-text text-center text-3xl text-transparent">
            ReHack: Your Gateway to Gaming Adventures
          </h1>
        </div>
      </div>
      <Cards />
    </>
  );
}
