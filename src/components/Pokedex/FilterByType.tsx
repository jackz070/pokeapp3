import React, { Fragment } from "react";
import typeColorClassChart from "../../utils/typeColorClassChart";
import { QueryClient } from "@tanstack/react-query";
import { type IType } from "../../types/pokemonType";

interface FilterByTypeTypes {
  setPokemonListToBeDisplayed: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        url: string;
      }[]
    >
  >;
  filterByType: string[];
  setFilterByType: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterByType = ({
  setPokemonListToBeDisplayed,
  filterByType,
  setFilterByType
}: FilterByTypeTypes) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  });

  const filterByTypeOptions = [
    "normal",
    "fire",
    "water",
    "grass",
    "flying",
    "fighting",
    "poison",
    "electric",
    "ground",
    "rock",
    "psychic",
    "ice",
    "bug",
    "ghost",
    "steel",
    "dragon",
    "dark",
    "fairy"
  ];

  const handleFilterClick = async (typeName: string) => {
    if (filterByType.includes(typeName)) {
      setFilterByType((prev) => prev.filter((type) => type !== typeName));
      removeFilteredByType();
    } else if (!filterByType.includes(typeName)) {
      setFilterByType((prev) => [...prev, typeName]);
      addFilteredByType(typeName);
    }
  };

  const addFilteredByType = async (type: string) => {
    try {
      const data: IType = await queryClient.fetchQuery({
        queryKey: ["type", type],
        queryFn: () => fetch(`https://pokeapi.co/api/v2/type/${type}`).then((res) => res.json())
      });

      const tempPokemonList: { name: string; url: string }[] = [];

      data.pokemon.map((pokemon) => tempPokemonList.push(pokemon.pokemon));
      setPokemonListToBeDisplayed((prev) => [...prev, ...tempPokemonList]);
    } catch (error) {
      console.log(error);
    }
  };

  //only one case when one filter option at a time is allowed
  const removeFilteredByType = () => {
    if (filterByType.length === 1) {
      setPokemonListToBeDisplayed([]);
    }
  };

  return (
    <Fragment>
      {filterByTypeOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleFilterClick(option)}
          className={`${
            filterByType.includes(option)
              ? `${
                  typeColorClassChart[
                    (option[0].toUpperCase() +
                      option.substring(1)) as keyof typeof typeColorClassChart
                  ]
                } font-bold`
              : "text-[#191921]"
          } cursor-pointer px-2 py mx-2 my-1 flex items-center justify-center rounded-md dark:hover:bg-gray-200 hover:bg-white disabled:text-slate-400 transition-all`}
          disabled={filterByType.length > 0 && !filterByType.includes(option)}>
          {option[0].toUpperCase() + option.substring(1)}
        </button>
      ))}
    </Fragment>
  );
};

export default FilterByType;
