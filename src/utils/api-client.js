import { useQuery } from "@tanstack/react-query";
import Api from "../utils/api";

const usePokemon = (pokemonNumber) => {
  const result = useQuery(["pokemon", pokemonNumber], () =>
    Api.pokemon(pokemonNumber)
  );
  return { ...result };
};

const usePokemonList = (limit) => {
  const result = useQuery(["pokemonList"], () => Api.pokemonList(limit));
  return { ...result, pokemonList: result?.data?.results };
};

const usePokemonSpecies = (pokemonNumber) => {
  const result = useQuery(["pokemonSpecies", pokemonNumber], () =>
    Api.pokemonSpecies(pokemonNumber)
  );
  return { ...result };
};

const useType = (typeName) => {
  const result = useQuery(["type", typeName], () => Api.type(typeName));
  return { ...result };
};

export { usePokemon, usePokemonList, usePokemonSpecies, useType };
