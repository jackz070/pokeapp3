import { useQuery } from "@tanstack/react-query";
import Api from "./api";

const usePokemon = (pokemonNumber: number) => {
  const result = useQuery(["pokemon", pokemonNumber], () => Api.pokemon(pokemonNumber));
  return { ...result };
};

const usePokemonList = (limit: number) => {
  const result = useQuery(["pokemonList"], () => Api.pokemonList(limit));

  const pokemonList: { name: string; url: string } = result?.data?.results;
  return { ...result, pokemonList };
};

const usePokemonSpecies = (pokemonNumber: number) => {
  const result = useQuery(["pokemonSpecies", pokemonNumber], () =>
    Api.pokemonSpecies(pokemonNumber)
  );
  return { ...result };
};

const useType = (typeName: string) => {
  const result = useQuery(["type", typeName], () => Api.type(typeName));
  return { ...result };
};

export { usePokemon, usePokemonList, usePokemonSpecies, useType };
