import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LogoutButton } from "../../components/Buttons/LogoutButton";
import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import PokedexSinglePokemon from "../../components/Pokedex/PokedexSinglePokemon";
import SimplePokemonInfo from "../../components/PokemonPageInfoComponents/Evolutions/SimplePokemonInfo";
import { Link } from "react-router-dom";

import TypePieChart from "./TypePieChart";

const Profile = () => {
  const { user } = useAuth0();
  const { caughtPokemon } = useCaughtPokemon();
  // TODO Stats about caught pokemon, maybe a type graph, number, fav type, user since, ===> backend that stores user id (email?), caught pokemon, date of first signin
  //TODO How do I access the above information? Context of mypokemon?

  return (
    <div className="pt-24 flex flex-col items-center">
      <img src={user?.picture} className="rounded-full h-20 w-20" />
      <div className="text-2xl font-bold pt-2">{user?.given_name}</div>
      <div className="text-xs text-gray-500">Joined today</div>
      <div className="flex flex-col items-center pt-6">
        {caughtPokemon.length === 0 && <div>No Pokemon caught yet.</div>}
        {caughtPokemon.length > 0 && (
          <div>
            So far you've marked {caughtPokemon.length} Pokemon as caught:
          </div>
        )}
        <div className={`flex items-center justify-center mt-2 min-w-[65%] `}>
          {caughtPokemon?.slice(0, 4).map((pokemonNumber) => (
            <SimplePokemonInfo pokemonNumber={pokemonNumber} name={false} />
          ))}
          {caughtPokemon.length > 4 && (
            <Link to="/my-pokemon" className="text-sm hover:underline">
              and {caughtPokemon?.length - 4} more
            </Link>
          )}
        </div>
        <div>Type distribution:</div>
        <TypePieChart />
      </div>

      <div className="pt-8">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
