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

const PokemonPage = ({ id }) => {
  let { pokemonNumber } = useParams();
  if (!pokemonNumber) {
    pokemonNumber = id;
  }

  const [limit] = usePokedexSettings();
  // TODO loading is related to thisPokemon, WHICH I ALREADY HAVE, not thisPokemonDetails, reimplement this
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
  console.log(thisPokemon, thisPokemonDetails);

  return (
    <div className="flex flex-col items-center pt-32 z-40">
      <div>
        {isLoading ? (
          <FullScreenLoading />
        ) : isError ? (
          "Pokemon not found."
        ) : isSuccess ? (
          <div className="flex items-center z-[33] ">
            <div className="relative">
              <div
                className={`bg-gradient-radial ${
                  typeColorClassChartBg[thisPokemon?.types[0]?.type.name]
                } via-[rgba(0,0,0,0)] absolute -top-64 -right-56 h-[700px] w-[700px] z-[31] opacity-30`}
              />
              <div
                className={`bg-gradient-radial  from-[#d8fdc3]
                 via-[rgba(0,0,0,0)] absolute -top-44 -right-16 h-[600px] w-[600px] z-[31] opacity-10`}
              />
              <div
                className={`bg-gradient-radial  ${
                  typeColorClassChartBg[thisPokemon?.types[1]?.type.name]
                }
                 via-[rgba(0,0,0,0)] absolute -top-20 -right-24 h-[600px] w-[600px] z-[31] opacity-30`}
              />
              <div
                className={`bg-gradient-radial  from-[#c3c6fd]
                 via-[rgba(0,0,0,0)] absolute -top-40 -right-72 h-[500px] w-[500px] z-[31] opacity-10`}
              />
              {imageSelect(thisPokemon)}

              <div className="flex items-center justify-center gap-10">
                {prevPokemonNumber > 0 ? (
                  <Link
                    to={`/pokemon/${prevPokemonNumber}`}
                    className="text-xs relative z-[33]"
                  >
                    Go to previous
                  </Link>
                ) : null}

                {nextPokemonNumber <= limit ? (
                  <Link
                    to={`/pokemon/${nextPokemonNumber}`}
                    className="text-xs relative z-[33]"
                  >
                    Go to next
                  </Link>
                ) : null}
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
              <div className=" mt-4 absolute left-0 top-16 z-[33] flex ">
                <AddRemoveMyPokemonButton
                  pokemonNumber={parseInt(pokemonNumber)}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <TabsComponent
        className="relative z-[55]"
        tab1={
          <About
            thisPokemon={thisPokemon}
            thisPokemonDetails={thisPokemonDetails}
            className="relative z-[55]"
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        }
        tab2={<Stats thisPokemon={thisPokemon} className="relative z-[55]" />}
        tab3={
          <Evolutions
            thisPokemonDetails={thisPokemonDetails}
            className="relative z-[55]"
          />
        }
      />
    </div>
  );
};

export default PokemonPage;
