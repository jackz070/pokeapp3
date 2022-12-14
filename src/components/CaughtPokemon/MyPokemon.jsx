import React from "react";
import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import { Link } from "react-router-dom";

import MobileSearchAndFilter from "../Pokedex/MobileSearchAndFilter";
import DesktopSearchAndFilter from "../Pokedex/DesktopSearchAndFilter";
import { useMobileMenu } from "../../context/MobileMenuContext";
import { AiOutlineSearch } from "react-icons/ai";
import FullScreenLoading from "../Loaders/FullScreenLoading";
import PokedexSinglePokemonWrapper from "../Pokedex/PokedexSinglePokemonWrapper";

// TODO reference to profile for stats
// TODO wire up searching and filtering so that it works here (probably is straight copy from pokedex from before the refactor) - copy the setPokemonListToBeDisplayed stuff and connect that list with caught pokemon here TODO X2 because also needs to work with mobile view
const MyPokemon = () => {
  const { caughtPokemon } = useCaughtPokemon();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterByType, setFilterByType] = React.useState([]);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [headerOnTop, setHeaderOnTop] = React.useState(false);
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);
  const [pokemonListToBeDisplayed, setPokemonListToBeDisplayed] =
    React.useState([]);
  const [notFound, setNotFound] = React.useState(false);

  const [mobileMenu] = useMobileMenu();

  // State for sticking the search bar on top when scrolling
  const handleScroll = () => {
    const position = window.scrollY;
    position <= 45 ? setHeaderOnTop(false) : setHeaderOnTop(true);
  };

  // Logic for sticking the search bar on top when scrolling, useLayoutEffect instead of useEffect because it's realted to scrolling events
  React.useLayoutEffect(() => {
    if (!mobileMenu) {
      if (searchTerm.length === 0 && filterByType.length === 0) {
        window.addEventListener("scroll", handleScroll, { passive: true });
      }

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  React.useEffect(() => {
    setNotFound(false);
    if (
      caughtPokemon?.filter((pokemonListItem) =>
        pokemonListItem?.includes(searchTerm)
      ).length === 0
    ) {
      setNotFound(true);
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center pt-20 dark:bg-darkPrimary bg-white max-w-[1280px] mx-auto relative">
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
      {mobileMenu && (
        <button
          onClick={() => setShowMobileSearch((prev) => !prev)}
          className="text-xs fixed top-7 right-14 z-[6000]"
          // ref={mobileSearchButton}
        >
          <AiOutlineSearch className="w-6 h-6 dark:fill-white" />
        </button>
      )}
      {!mobileMenu && (
        <DesktopSearchAndFilter
          showFilterMenu={showFilterMenu}
          setShowFilterMenu={setShowFilterMenu}
          filterByType={filterByType}
          setFilterByType={setFilterByType}
          showMobileSearch={showMobileSearch}
          setShowMobileSearch={setShowMobileSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPokemonListToBeDisplayed={setPokemonListToBeDisplayed}
          headerOnTop={headerOnTop}
          setHeaderOnTop={setHeaderOnTop}
          noFiltering={true}
        />
      )}
      {mobileMenu && showMobileSearch && (
        <MobileSearchAndFilter
          showFilterMenu={showFilterMenu}
          setShowFilterMenu={setShowFilterMenu}
          filterByType={filterByType}
          setFilterByType={setFilterByType}
          showMobileSearch={showMobileSearch}
          setShowMobileSearch={setShowMobileSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPokemonListToBeDisplayed={setPokemonListToBeDisplayed}
          noFiltering={true}
        />
      )}
      {notFound && <div className="mt-32">No Pokemon found</div>}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-[200px] items-start justify-center mt-4 min-w-[65%] min-h-screen ${
          headerOnTop ? "mt-24" : null
        }`}
      >
        {/* TODO search doesnt work on iOS mobile browsers ;( */}

        {caughtPokemon
          ?.filter((pokemonListItem) => pokemonListItem?.includes(searchTerm))
          .map((pokemon) => {
            return (
              <PokedexSinglePokemonWrapper
                key={pokemon}
                pokemon={{ name: pokemon }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MyPokemon;
