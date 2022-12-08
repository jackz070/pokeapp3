import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LogoutButton } from "../../components/Buttons/LogoutButton";
import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import PokedexSinglePokemon from "../../components/Pokedex/PokedexSinglePokemon";
import SimplePokemonInfo from "../../components/PokemonPageInfoComponents/Evolutions/SimplePokemonInfo";
import { Link, useResolvedPath } from "react-router-dom";
import TabsComponent from "../../components/TabsComponent/TabsComponent";

import ProfileStats from "./ProfileStats";
import { ProfileSettings } from "./ProfileSettings";

import TypePieChart from "./TypePieChart";

const Profile = () => {
  const { user } = useAuth0();
  const { caughtPokemon } = useCaughtPokemon();
  // TODO Stats about caught pokemon, maybe a type graph, number, fav type, user since, ===> backend that stores user id (email?), caught pokemon, date of first signin
  //TODO How do I access the above information? Context of mypokemon?
  // TODO Split into two tabs: profile summary and profile settings (those two in dropdown on header bar loading correct pages)
  //TODO change avatar to some preset pokemon images with selector in profile details page?

  // TODO profile page content goes over header bar
  return (
    <div className="pt-24 flex flex-col items-center">
      <img src={user?.picture} className="rounded-full h-20 w-20" />
      <div className="text-2xl font-bold pt-2">{user?.given_name}</div>
      <div className="text-xs text-gray-500">Joined today</div>

      <TabsComponent
        tabs={[
          {
            label: "Stats",
            content: <ProfileStats caughtPokemon={caughtPokemon} />,
          },
          {
            label: "Settings",
            content: <ProfileSettings user={user} />,
          },
        ]}
      />
    </div>
  );
};

export default Profile;
