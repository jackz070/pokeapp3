import React from "react";

import SimplePokemonInfo from "../../components/PokemonPageInfoComponents/Evolutions/SimplePokemonInfo";
import { Link } from "react-router-dom";

import TypePieChart from "./TypePieChart";

const ProfileStats = ({ caughtPokemon }) => {
  return (
    <div className="flex flex-col items-center pt-6">
      {caughtPokemon.length === 0 && (
        <div className="h-screen max-w-[15rem] flex flex-col items-center">
          <h2 className="uppercase text-xl font-bold">No Pokemon Caught</h2>
          <p className="text-sm text-center max-w-[12rem]">
            Save Pokemon as caught by using "Add to caught" in
            <Link to="/" className="text-sm underline text-purple-200 mx-1">
              Pokedex
            </Link>
            or individual Pokemon's page
          </p>
        </div>
      )}
      {caughtPokemon.length > 0 && (
        <h5 className="mb-2 text-sm mx-auto">
          So far you've marked {caughtPokemon.length} Pokemon as caught:
        </h5>
      )}
      <div className={`flex items-center justify-center mt-2 min-w-[65%] mb-6`}>
        {caughtPokemon?.slice(0, 4).map((pokemonNumber) => (
          <SimplePokemonInfo
            key={pokemonNumber}
            pokemonNumber={pokemonNumber}
            name={false}
          />
        ))}
        {caughtPokemon.length > 4 && (
          <Link to="/my-pokemon" className="text-sm hover:underline">
            and {caughtPokemon?.length - 4} more
          </Link>
        )}
      </div>
      {caughtPokemon.length > 0 && (
        <div>
          <h5 className="pb-4 text-sm mx-auto">Type distribution:</h5>
          <TypePieChart />
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
