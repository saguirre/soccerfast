import { NextPage } from "next";

import { DotsDivider, PositionsTable } from "@components/*";

const teams = [
  {
    name: "C.A. Cerro",
    position: 1,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: "/escudo-cerro.png",
  },
  {
    name: "Monterrey F.C.",
    position: 2,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: "/escudo-monterrey.png",
  },
  {
    name: "Beach City",
    position: 3,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: "/escudo-beach-city.png",
  },
  {
    name: "Racing Club Miami",
    position: 4,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: "/escudo-racing.png",
  },
  {
    name: "Rio de la Plata F.C.",
    position: 5,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: "/escudo-rio-de-la-plata.png",
  },
  {
    name: "Furiosos F.C.",
    position: 6,
    matchesPlayed: 0,
    matchesWon: 0,
    matchesTied: 0,
    matchesLost: 0,
    goalsAhead: 0,
    goalsDown: 0,
    points: 0,
    logo: "/escudo-furiosos.png",
  },
];

const Tournament: NextPage = () => {
  return (
    <div className="bg-white h-full w-screen p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="lg:text-center">
          <h2 className="text-base text-sky-600 font-semibold tracking-wide uppercase">Torneo SoccerFast</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"></p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Aquí se puede ver toda la información relacionada al torneo SoccerFast.
          </p>
        </div>
        <DotsDivider />
        <PositionsTable teams={teams} />
        <p className="my-4 max-w-2xl text-sm text-gray-500 lg:mx-auto">La tabla se actualiza todos los miércoles.</p>
      </div>
    </div>
  );
};

export default Tournament;
