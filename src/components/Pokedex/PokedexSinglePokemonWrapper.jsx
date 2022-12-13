import React from "react";
import PokedexSinglePokemon from "./PokedexSinglePokemon";
import PokedexSinglePokemonSkeletonDark from "../Loaders/PokedexSinglePokemonSkeletonDark";

import { useInView } from "react-intersection-observer";

const PokedexSinglePokemonWrapper = ({ pokemon, filterByType, searchTerm }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div ref={ref}>
      {!inView && <PokedexSinglePokemonSkeletonDark />}
      {inView && (
        <PokedexSinglePokemon
          pokemon={pokemon}
          filterByType={filterByType}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
};

export default PokedexSinglePokemonWrapper;
