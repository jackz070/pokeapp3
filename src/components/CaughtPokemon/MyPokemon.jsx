import React from "react";
import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import PokedexSinglePokemon from "../Pokedex/PokedexSinglePokemon";
import { Link } from "react-router-dom";

import typeColorClassChart from "../../utils/typeColorClassChart";

import FilterIcon from "../../assets/FilterIcon.png";
// TODO reference to profile for stats
// TODO wire up searching and filtering so that it works here (probably is straight copy from pokedex from before the refactor) - copy the setPokemonListToBeDisplayed stuff and connect that list with caught pokemon here
const MyPokemon = () => {
  const { caughtPokemon } = useCaughtPokemon();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterByType, setFilterByType] = React.useState([]);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [headerOnTop, setHeaderOnTop] = React.useState(false);

  const bar = React.useRef();

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

  const closeFilterMenu = () => {
    setShowFilterMenu(false);
  };
  const filterMenuButton = React.useRef();

  const pokedex = React.useRef();

  const filterMenu = React.useRef();

  const handleScroll = () => {
    const position = window.scrollY;
    position <= 79 ? setHeaderOnTop(false) : setHeaderOnTop(true);
  };

  React.useLayoutEffect(() => {
    if (searchTerm.length === 0 && filterByType.length === 0) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (headerOnTop && (searchTerm.length > 0 || filterByType.length > 0)) {
      window.scroll({ top: 80, left: 0, behavior: "smooth" });
    }
  }, [searchTerm, filterByType]);

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

  const handleFilterClick = (option) => {
    if (filterByType.includes(option)) {
      setFilterByType((prev) => prev.filter((type) => type !== option));
    } else if (!filterByType.includes(option)) {
      setFilterByType((prev) => [...prev, option]);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center ">
      {caughtPokemon.length === 0 && (
        <div className="h-screen max-w-[15rem] flex flex-col justify-center items-center">
          <h2 className="uppercase text-xl font-bold">No Pokemon Caught</h2>
          <p className="text-sm pt-1 text-center max-w-[12rem]">
            Save Pokemon as caught by using "Add to caught" in
            <Link to="/" className="text-sm underline text-purple-200">
              Pokedex
            </Link>
            or individual Pokemon's page
          </p>
        </div>
      )}
      <div className="pt-28 bg-[#191921] flex flex-col items-center justify-center ">
        {caughtPokemon.length !== 0 && (
          <div
            className={`transition-all flex items-center z-50 mb-12 justify-center ${
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
                    <div
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
                      } cursor-pointer px-2 py mx-2 my-1 flex items-center justify-center rounded-md hover:bg-gray-200 transition-all`}
                    >
                      {option[0].toUpperCase() + option.substring(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-[200px] items-start justify-center mt-4 min-w-[65%] min-h-screen ${
            headerOnTop ? "mt-24" : null
          }`}
          ref={pokedex}
        >
          {caughtPokemon?.map((pokemonNumber) => (
            <PokedexSinglePokemon
              pokemon={{ name: pokemonNumber }}
              filterByType={filterByType}
              searchTerm={searchTerm}
              key={pokemonNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyPokemon;
