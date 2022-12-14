import React from "react";
import { usePokemon } from "../../utils/api-client";
import TypeChip from "../TypeChip";
import { Link } from "react-router-dom";
import typeColorClassChartBg from "../../utils/typeColorClassChart-bg";
import PokedexSinglePokemonSkeletonDark from "../Loaders/PokedexSinglePokemonSkeletonDark";

import { capitalize } from "../../utils/text-formatting";

import AddRemoveMyPokemonButton from "../CaughtPokemon/AddRemoveMyPokemonButton";
import { useMobileMenu } from "../../context/MobileMenuContext";

const PokedexSinglePokemon = ({ pokemon }) => {
  const [hovered, setHovered] = React.useState(false);

  const {
    isLoading,
    isError,
    isSuccess,
    data: thisPokemon,
  } = usePokemon(pokemon.name);

  const [mobileMenu] = useMobileMenu();

  const types = [];
  getTypes(thisPokemon);

  function getTypes(thisPokemon) {
    thisPokemon?.types?.map((type) => types.push(type.type.name));
  }

  if (isLoading) {
    return <PokedexSinglePokemonSkeletonDark />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  if (isSuccess && thisPokemon.is_default === false) {
    return null;
  }

  if (isSuccess) {
    return (
      <div
        className="relative p-4 hover:scale-105 transition-all w-[175px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!mobileMenu && (
          <div className="absolute top-[86px] right-8 z-10">
            <AddRemoveMyPokemonButton
              pokemonNumber={thisPokemon?.id}
              pokemonName={thisPokemon.name}
            />
          </div>
        )}
        <div>
          <div
            className={`bg-gradient-radial ${
              typeColorClassChartBg[thisPokemon?.types[0]?.type.name]
            } via-[rgba(0,0,0,0)] absolute -top-3 -left-4  h-[200px] w-[200px] ${
              hovered
                ? "dark:opacity-20 opacity-60"
                : "dark:opacity-10 opacity-50"
            }`}
          />
          <div
            className={`bg-gradient-radial  ${
              typeColorClassChartBg[thisPokemon?.types[1]?.type.name]
            }
               via-[rgba(0,0,0,0)] absolute -top-2 right-0 h-[190px] w-[190px] ${
                 hovered
                   ? "dark:opacity-30 opacity-50"
                   : "dark:opacity-10 opacity-40"
               }`}
          />
        </div>
        <Link to={`/pokemon/${thisPokemon?.id}`} className="w-[175px] my-2 ">
          <div className="flex flex-col items-center relative h-40 w-40">
            {thisPokemon?.sprites?.front_default ? (
              <>
                <img
                  src={thisPokemon?.sprites?.front_default}
                  alt={thisPokemon?.name}
                  loading="lazy"
                  width="96px"
                  height="96px"
                />
              </>
            ) : (
              <div className="w-20 h-20 flex items-center justify-center text-xs">
                No Image
              </div>
            )}
            <div className="text-gray-400  text-xs leading-none">{`#${thisPokemon?.id} `}</div>
            <div className="leading-snug font-bold pb-1 text-xl dark:text-white">
              {capitalize(thisPokemon?.name.split("-")[0])}
            </div>
            <div className="flex justify-center items-center w-fit">
              {thisPokemon?.types?.map((type) => {
                return (
                  <TypeChip
                    type={type.type.name}
                    key={thisPokemon?.name + type.type.name}
                  />
                );
              })}
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default PokedexSinglePokemon;
