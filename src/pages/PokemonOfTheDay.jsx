import React from "react";
import seedrandom from "seedrandom";

import { usePokemon } from "../utils/api-client";

import PokemonPage from "./PokemonPage";

// Pokemon of the Day is supposed to change every day, which is why the seed for random pokemon number generator is date

const today = () => {
  let date = new Date();
  date = date.toISOString().slice(0, 10);
  return date.split("-").reverse().join("/");
};
const test = seedrandom(today);
const ofTheDay = Math.floor(test() * 386);

const PokemonOfTheDay = () => {
  return (
    <div className="flex flex-col items-center pt-32">
      <div>Today's lucky is...{ofTheDay}</div>
      <PokemonPage id={ofTheDay} />
    </div>
  );
};

export default PokemonOfTheDay;
