import React from "react";

import PokedexSinglePokemonWrapper from "./PokedexSinglePokemonWrapper";
import FullScreenLoading from "../Loaders/FullScreenLoading";

import typeColorClassChart from "../../utils/typeColorClassChart";

import { ToastContainer } from "react-toastify";

import FilterIcon from "../../assets/FilterIcon.png";

import { QueryClient } from "@tanstack/react-query";
import { usePokemonList } from "../../utils/api-client";
import { usePokedexSettings } from "../../context/PokedexSettingsContext";

const Pokedex = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterByType, setFilterByType] = React.useState([]);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [headerOnTop, setHeaderOnTop] = React.useState(false);
  const [pokemonListToBeDisplayed, setPokemonListToBeDisplayed] =
    React.useState([]);

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
    "fairy",
  ];
  const [limit, setLimit] = usePokedexSettings();

  const { pokemonList, isLoading, isError, isSuccess } = usePokemonList(limit);

  const bar = React.useRef();
  const filterMenuButton = React.useRef();
  const pokedex = React.useRef();
  const filterMenu = React.useRef();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  // State for sticking the search bar on top when scrolling
  const handleScroll = () => {
    const position = window.scrollY;
    position <= 79 ? setHeaderOnTop(false) : setHeaderOnTop(true);
  };

  // Logic for sticking the search bar on top when scrolling, useLayoutEffect instead of useEffect because it's realted to scrolling events
  React.useLayoutEffect(() => {
    if (searchTerm.length === 0 && filterByType.length === 0) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter menu closes on click outside
  React.useEffect(() => {
    const handleClick = (e) => {
      if (
        !filterMenuButton.current.contains(e.target) &&
        !filterMenu?.current?.contains(e.target)
      ) {
        console.log(e.target, filterMenuButton);
        setShowFilterMenu(false);
      }
    };

    if (showFilterMenu) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showFilterMenu]);

  const handleFilterClick = async (typeName) => {
    if (filterByType.includes(typeName)) {
      setFilterByType((prev) => prev.filter((type) => type !== typeName));
      removeFilteredByType(typeName);
    } else if (!filterByType.includes(typeName)) {
      setFilterByType((prev) => [...prev, typeName]);
      addFilteredByType(typeName);
    }
  };

  // As of now filtering by type allows display of one type only. In that case it disables other buttons. What stopped me from implementing full-blown filter by type with search capability is the state of affairs atm: two data storages are getting messy, sorting filtered results by pokemon number is a challenge because it needs, well, the pokemon number which gets fetched only in the single pokemon component which I'm not even fetching unless it comes into view.
  const addFilteredByType = async (type) => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ["type", type],
        queryFn: () =>
          fetch(`https://pokeapi.co/api/v2/type/${type}`).then((res) =>
            res.json()
          ),
      });
      const tempPokemonList = [];
      data.pokemon.map((pokemon) => tempPokemonList.push(pokemon.pokemon));
      setPokemonListToBeDisplayed((prev) => [...prev, ...tempPokemonList]);
    } catch (error) {
      console.log(error);
    }
  };

  //only one case when one filter option at a time is allowed
  const removeFilteredByType = (typeName) => {
    if (filterByType.length === 1) {
      setPokemonListToBeDisplayed([]);
    }
  };

  return (
    <div className="flex flex-col items-center pt-28 bg-[#191921]">
      <div
        className={`transition-all flex items-center z-50 mb-12 ${
          headerOnTop ? "fixed top-[25px] " : null
        }`}
      >
        <input
          ref={bar}
          type="text"
          placeholder="Search for Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="leading-loose px-8 py-1 bg-whitetext-gray-700 rounded-xl text-[#191921]"
        />
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu((prev) => !prev)}
            className={`p-1 ml-4 border-[#191921] border-2 rounded-full hover:border-gray-600 ${
              showFilterMenu ? "border-[white] hover:border-[white]" : null
            }`}
          >
            <img src={FilterIcon} ref={filterMenuButton} />
            {filterByType.length !== 0 && (
              <div className="w-3 h-3 bg-red-500 absolute right-1 bottom-1 rounded-full"></div>
            )}
          </button>

          {showFilterMenu && (
            <div
              className={`grid grid-cols-3 absolute h-60 w-80 top-12 left-5 z-30 rounded-md uppercase bg-white`}
              ref={filterMenu}
            >
              {filterByTypeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilterClick(option)}
                  className={`${
                    filterByType.includes(option)
                      ? `${
                          typeColorClassChart[
                            option[0].toUpperCase() + option.substring(1)
                          ]
                        } font-bold`
                      : "text-[#191921]"
                  } cursor-pointer px-2 py mx-2 my-1 flex items-center justify-center rounded-md hover:bg-gray-200 disabled:text-slate-400 transition-all`}
                  disabled={
                    filterByType.length > 0 && !filterByType.includes(option)
                  }
                >
                  {option[0].toUpperCase() + option.substring(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-[200px] items-start justify-center mt-4 min-w-[65%] min-h-screen ${
          headerOnTop ? "mt-24" : null
        }`}
        ref={pokedex}
      >
        {isLoading && <FullScreenLoading />}
        {isError && "Error"}

        {isSuccess &&
          filterByType.length > 0 &&
          pokemonListToBeDisplayed
            .filter((pokemonListItem) =>
              pokemonListItem?.name.includes(searchTerm)
            )
            .map((pokemon) => {
              return (
                <PokedexSinglePokemonWrapper
                  key={pokemon.name}
                  pokemon={pokemon}
                  filterByType={filterByType}
                  searchTerm={searchTerm}
                />
              );
            })}
        {isSuccess &&
          filterByType.length === 0 &&
          pokemonList
            .filter((pokemonListItem) =>
              pokemonListItem?.name.includes(searchTerm)
            )
            .map((pokemon) => {
              return (
                <PokedexSinglePokemonWrapper
                  key={pokemon.name}
                  pokemon={pokemon}
                  filterByType={filterByType}
                  searchTerm={searchTerm}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Pokedex;
