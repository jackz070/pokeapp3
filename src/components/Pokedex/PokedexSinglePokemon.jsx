import React from "react";
import { usePokemon } from "../../utils/api-client";
import TypeChip from "../TypeChip";
import LoadingSpinner from "../Loaders/LoadingSpinner";
import { Link } from "react-router-dom";
import typeColorClassChartBg from "../../utils/typeColorClassChart-bg";
import { useInView } from "react-intersection-observer";
import PokedexSinglePokemonSkeleton from "../Loaders/PokedexSinglePokemonSkeleton";

import { capitalize } from "../../utils/text-formatting";

import AddRemoveMyPokemonButton from "../CaughtPokemon/AddRemoveMyPokemonButton";
import { useMobileMenu } from "../../context/MobileMenuContext";

const PokedexSinglePokemon = ({ pokemon, filterByType, searchTerm }) => {
  const [isToBeDisplayed, setIsToBeDisplayed] = React.useState(true);
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
  // React.useEffect(() => {
  //   setIsToBeDisplayed(true);
  //   if (
  //     (filterByType?.length > 0 &&
  //       !types?.some((type) => filterByType.includes(type))) ||
  //     (searchTerm?.length > 0 && !thisPokemon.name.includes(searchTerm))
  //   ) {
  //     setIsToBeDisplayed(false);
  //   }
  // }, [filterByType, searchTerm]);
  // if (!isToBeDisplayed) {
  //   return null;
  // }

  if (isLoading) {
    return <PokedexSinglePokemonSkeleton />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (isSuccess) {
    return (
      <div
        className="relative p-4 hover:scale-105 transition-all w-[175px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* {isLoading && <LoadingSpinner size={"small"} />} */}
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
            } via-[rgba(0,0,0,0)] absolute -top-5 -left-5  h-[200px] w-[200px]  ${
              hovered ? "opacity-20" : "opacity-10"
            }`}
          />
          <div
            className={`bg-gradient-radial  ${
              typeColorClassChartBg[thisPokemon?.types[1]?.type.name]
            }
               via-[rgba(0,0,0,0)] absolute top-10 right-0 h-[190px] w-[190px] ${
                 hovered ? "opacity-30" : "opacity-10"
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
            <div className="text-gray-400 text-sm leading-none">{`#${thisPokemon?.id} `}</div>
            <div className="leading-snug text-white font-bold pb-1 text-xl">
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
