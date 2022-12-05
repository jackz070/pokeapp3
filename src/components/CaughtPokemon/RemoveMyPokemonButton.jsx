import React from "react";
import { useCaughtPokemon } from "../../context/CaughtPokemonContext";

const RemoveMyPokemonButton = (pokemonNumber) => {
  const { removeCaughtPokemon } = useCaughtPokemon();
  return (
    <button
      onClick={() => {
        removeCaughtPokemon(pokemonNumber);
      }}
      className="p-2 m-1 rounded-full text-[#191921] bg-white w-6 h-6 flex items-center justify-center hover:bg-gray-100"
    >
      -
    </button>
  );
};

export default RemoveMyPokemonButton;
