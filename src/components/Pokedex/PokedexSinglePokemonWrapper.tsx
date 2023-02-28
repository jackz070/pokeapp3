import React from "react";
import PokedexSinglePokemon from "./PokedexSinglePokemon";
import PokedexSinglePokemonSkeletonDark from "../Loaders/PokedexSinglePokemonSkeletonDark";
import PokedexSinglePokemonSkeletonLight from "../Loaders/PokedexSinglePokemonSkeletonLight";
import { useDarkMode } from "../../context/DarkModeContext";

import { useInView } from "react-intersection-observer";

const PokedexSinglePokemonWrapper = ({ pokemon }: { pokemon: { name: string; url: string } }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });

  const darkMode = useDarkMode();
  const darkModeFlag = darkMode[0];

  return (
    <div ref={ref}>
      {!inView && darkModeFlag && <PokedexSinglePokemonSkeletonDark />}
      {!inView && !darkModeFlag && <PokedexSinglePokemonSkeletonLight />}
      {inView && <PokedexSinglePokemon pokemon={pokemon} darkModeFlag={darkModeFlag} />}
    </div>
  );
};

export default PokedexSinglePokemonWrapper;
