import React from "react";
import { AiOutlineFilter } from "react-icons/ai";
import typeColorClassChart from "../../utils/typeColorClassChart";
import { QueryClient } from "@tanstack/react-query";

const MobileSearchAndFilter = ({
  showFilterMenu,
  setShowFilterMenu,
  filterByType,
  setFilterByType,
  showMobileSearch,

  searchTerm,
  setSearchTerm,
  setPokemonListToBeDisplayed,
}) => {
  const filterMenuButton = React.useRef();
  const filterMenu = React.useRef();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
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
    "fairy",
  ];

  React.useEffect(() => {
    const handleClick = (e) => {
      if (
        !filterMenuButton.current.contains(e.target) &&
        !filterMenu?.current?.contains(e.target)
      ) {
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

  // Mobile search closes on click outside
  const mobileSearch = React.useRef();
  // const mobileSearchButton = React.useRef();

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
    <div
      className={`transition-all flex items-center justify-center z-[2000] mb-6 dark:bg-darkPrimary bg-white w px-1 py-4 w-full rounded-md fixed`}
      ref={mobileSearch}
    >
      <input
        type="text"
        placeholder="Search for Pokemon"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="leading-loose px-8 py-1 dark:bg-white bg-gray-200 rounded-xl text-darkPrimary placeholder-gray-500"
      />
      <div className="relative">
        <button
          onClick={() => setShowFilterMenu((prev) => !prev)}
          className={`p-1 ml-4 rounded-full absolute -top-4 right-4 w-6 h-6 `}
        >
          <span ref={filterMenuButton}>
            <AiOutlineFilter className="fill-gray-500 w-6 h-6 " />
          </span>
          {filterByType.length !== 0 && (
            <div className="w-2 h-2 bg-red-500 absolute -right-1 bottom-0 rounded-full"></div>
          )}
        </button>
        {/* TODO finish the mobile search bar rework AND desktop version too */}
      </div>
      {showFilterMenu && (
        <div
          className={`grid grid-cols-3 absolute h-60 px-4 pb-2 top-16  ${
            showMobileSearch && ""
          } z-30 rounded-md uppercase bg-white  w-screen`}
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
              } cursor-pointer px-2 my-1 mx-auto rounded-md hover:bg-gray-200 disabled:text-slate-400 transition-all w-24`}
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
  );
};

export default MobileSearchAndFilter;
