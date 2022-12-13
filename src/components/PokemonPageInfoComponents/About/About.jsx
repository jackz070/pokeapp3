import React from "react";
import AbilitiesToDisplay from "./AbilitiesToDisplay";

const About = ({ thisPokemon, thisPokemonDetails }) => {
  const flavorTextToDisplay = (thisPokemonDetails) => {
    if (thisPokemonDetails?.flavor_text_entries[1]?.language.name === "en") {
      return thisPokemonDetails?.flavor_text_entries[1]?.flavor_text;
    } else if (
      thisPokemonDetails?.flavor_text_entries[2]?.language.name === "en"
    ) {
      return thisPokemonDetails?.flavor_text_entries[2]?.flavor_text;
    } else if (
      thisPokemonDetails?.flavor_text_entries[0]?.language.name === "en"
    ) {
      return thisPokemonDetails?.flavor_text_entries[0]?.flavor_text;
    } else if (
      thisPokemonDetails?.flavor_text_entries[7]?.language.name === "en"
    ) {
      return thisPokemonDetails?.flavor_text_entries[7]?.flavor_text;
    } else if (
      thisPokemonDetails?.flavor_text_entries[17]?.language.name === "en"
    ) {
      return thisPokemonDetails?.flavor_text_entries[17]?.flavor_text;
    } else {
      return thisPokemonDetails?.flavor_text_entries[3]?.flavor_text;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="max-w-sm my-4">{flavorTextToDisplay(thisPokemonDetails)}</p>
      <div>
        <AbilitiesToDisplay thisPokemon={thisPokemon} />
      </div>
      <div className="grid grid-cols-2 my-2 bg-slate-200 px-6 py-1 rounded-md drop-shadow-md">
        <div
          className="px-6 flex items-center flex-col border-darkPrimary border-r-[1px] text-darkPrimary
  "
        >
          <div className="font-bold text-md ">
            {!thisPokemon?.height ? "???" : thisPokemon?.height / 10} m
          </div>
          <div className="text-xs">Height</div>
        </div>
        <div className="px-6 flex items-center flex-col text-darkPrimary">
          <div className="font-bold text-md">
            {!thisPokemon?.weight ? "???" : thisPokemon?.weight / 10} kg
          </div>
          <div className="text-xs">Weight</div>
        </div>
      </div>
    </div>
  );
};

export default About;
