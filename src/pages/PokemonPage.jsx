import React from "react";
import { usePokemon, usePokemonSpecies } from "../utils/api-client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import AddRemoveMyPokemonButton from "../components/CaughtPokemon/AddRemoveMyPokemonButton";

import TypeChip from "../components/TypeChip";
import typeColorClassChartBg from "../utils/typeColorClassChart-bg";
import TabsComponent from "../components/TabsComponent/TabsComponent";

import About from "../components/PokemonPageInfoComponents/About/About";
import Stats from "../components/PokemonPageInfoComponents/Stats";
import Evolutions from "../components/PokemonPageInfoComponents/Evolutions/Evolutions";

import { capitalize } from "../utils/text-formatting";

import { usePokedexSettings } from "../context/PokedexSettingsContext";

import FullScreenLoading from "../components/Loaders/FullScreenLoading";
import { useMobileMenu } from "../context/MobileMenuContext";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const PokemonPage = ({ id }) => {
  let { pokemonNumber } = useParams();
  if (!pokemonNumber) {
    pokemonNumber = id;
  }
  const [mobileMenu] = useMobileMenu();
  const [limit] = usePokedexSettings();

  const { isError, isSuccess, data: thisPokemon } = usePokemon(pokemonNumber);

  const { isLoading, data: thisPokemonDetails } =
    usePokemonSpecies(pokemonNumber);

  const prevPokemonNumber = parseInt(pokemonNumber) - 1;
  const nextPokemonNumber = parseInt(pokemonNumber) + 1;

  const imageSelect = (thisPokemon) => {
    const imgSrc =
      thisPokemon?.sprites.other.dream_world.front_default ||
      thisPokemon?.sprites.other.home.front_default ||
      thisPokemon?.sprites.front_default ||
      null;

    return (
      <div className="w-80 h-64 block">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={thisPokemon?.name}
            loading="lazy"
            className="relative px-12 z-[34] w-80 h-64"
          />
        ) : (
          <div className="w-80 h-64 text-sm flex items-center justify-center">
            No Image
          </div>
        )}
      </div>
    );
  };

  // Prevent this page from loading scrolled down (remembered from pokedex page)
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center pt-32 z-40  max-w-[800px] mx-auto w-full">
      <div>
        {isLoading ? (
          <FullScreenLoading />
        ) : isError ? (
          "Pokemon not found."
        ) : isSuccess ? (
          <div className="flex sm:flex-row flex-col items-center z-[33] mb-6 relative">
            <div className=" ">
              <div
                className={`bg-gradient-radial ${
                  typeColorClassChartBg[thisPokemon?.types[0]?.type.name]
                } via-[rgba(0,0,0,0)] absolute -top-24 sm:-top-64 right-0 sm:-right-56 h-[375px] sm:h-[700px] w-[375px] sm:w-[700px]   z-[31] dark:opacity-30 opacity-50`}
              />
              <div
                className={`bg-gradient-radial  from-[#d8fdc3]
                 via-[rgba(0,0,0,0)] absolute -top-12 sm:-top-44 right-0 sm:-right-16 h-[322px] sm:h-[600px] w-[322px] sm:w-[600px] z-[31] dark:opacity-10  opacity-30`}
              />
              <div
                className={`bg-gradient-radial  ${
                  typeColorClassChartBg[thisPokemon?.types[1]?.type.name]
                }
                 via-[rgba(0,0,0,0)] absolute -top-6 sm:-top-20 right-0 sm:-right-24 h-[341px] sm:h-[600px] w-[341px] sm:w-[600px] z-[31] dark:opacity-30 opacity-60 `}
              />
              <div
                className={`bg-gradient-radial  from-[#c3c6fd]
                 via-[rgba(0,0,0,0)] absolute -top-12 sm:-top-40 -right-6 sm:-right-72 h-[271px] sm:h-[500px] w-[271px] sm:w-[500px] z-[31] opacity-10 `}
              />
              <div>
                {imageSelect(thisPokemon)}

                <div className="flex items-center justify-center gap-10">
                  {prevPokemonNumber > 0 ? (
                    <Link
                      to={`/pokemon/${prevPokemonNumber}`}
                      className="text-xs relative z-[33] text-gray-400"
                    >
                      <AiOutlineDoubleLeft />
                    </Link>
                  ) : null}

                  {nextPokemonNumber <= limit ? (
                    <Link
                      to={`/pokemon/${nextPokemonNumber}`}
                      className="text-xs relative z-[33] text-gray-400"
                    >
                      <AiOutlineDoubleRight />
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center relative">
              <h2 className=" text-4xl font-bold pb-2 relative z-[33]">
                {capitalize(thisPokemon?.name)}
              </h2>
              <div className="flex items-center z-[33]">
                {thisPokemon?.types?.map((type) => {
                  return (
                    <TypeChip
                      type={type.type.name}
                      key={thisPokemon.name + type.type.name}
                    />
                  );
                })}
              </div>
              <div
                className={` mt-4 absolute ${
                  mobileMenu ? "top-14" : "left-6 top-14"
                } z-[33] flex `}
              >
                <AddRemoveMyPokemonButton
                  pokemonNumber={parseInt(pokemonNumber)}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <TabsComponent
          className="relative z-[55]"
          tabs={[
            {
              label: "About",
              content: (
                <About
                  thisPokemon={thisPokemon}
                  thisPokemonDetails={thisPokemonDetails}
                  className="relative z-[55]"
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                />
              ),
            },
            {
              label: "Stats",
              content: (
                <Stats thisPokemon={thisPokemon} className="relative z-[55]" />
              ),
            },
            {
              label: "Evolutions",
              content: (
                <Evolutions
                  thisPokemonDetails={thisPokemonDetails}
                  className="relative z-[55]"
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PokemonPage;
