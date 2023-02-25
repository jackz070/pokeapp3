import React from "react";
import PokedexSinglePokemon from "./PokedexSinglePokemon";
import PokedexSinglePokemonSkeletonDark from "../Loaders/PokedexSinglePokemonSkeletonDark";

import { useInView } from "react-intersection-observer";

const PokedexSinglePokemonWrapper = ({ pokemon }: { pokemon: { name: string; url: string } }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0
  });

  return (
    <div ref={ref}>
      {!inView && <PokedexSinglePokemonSkeletonDark />}
      {inView && <PokedexSinglePokemon pokemon={pokemon} />}
    </div>
  );
};

export default PokedexSinglePokemonWrapper;
