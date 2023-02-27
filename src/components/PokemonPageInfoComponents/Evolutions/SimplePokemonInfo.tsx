import React from "react";
import { usePokemon } from "../../../utils/api-client";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../Loaders/LoadingSpinner";

import { Pokemon } from "../../../types/pokemon";

const SimplePokemonInfo = ({
  pokemonNumber,
  name = true
}: {
  pokemonNumber: string;
  name?: boolean;
}) => {
  const { isLoading, isError, isSuccess, data: thisPokemon } = usePokemon(pokemonNumber);

  const imageSelect = (thisPokemon: Pokemon) => {
    const imgSrc =
      thisPokemon?.sprites.other.dream_world.front_default ||
      thisPokemon?.sprites.other.home.front_default ||
      thisPokemon?.sprites.front_default ||
      null;

    return (
      <div className="w-20 h-20 block">
        {imgSrc ? (
          <img src={imgSrc} alt={thisPokemon?.name} className="relative px-2 z-[35] w-20 h-20" />
        ) : (
          <div className="w-20 h-20 text-xs flex items-center justify-center">No Image</div>
        )}
      </div>
    );
  };

  return (
    <Link to={`/pokemon/${thisPokemon?.id}`} className="flex flex-col items-center ">
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          "Pokemon not found."
        ) : isSuccess ? (
          <div className="flex flex-col items-center">
            {imageSelect(thisPokemon)}
            {name && (
              <h2 className=" text-lg font-bold pb-2">
                {thisPokemon?.name[0].toUpperCase() + thisPokemon?.name?.substring(1)}
              </h2>
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default SimplePokemonInfo;
