import React from "react";

import PokedexSinglePokemonWrapper from "./PokedexSinglePokemonWrapper";
import FullScreenLoading from "../Loaders/FullScreenLoading";

import { usePokemonList } from "../../utils/api-client";
import { usePokedexSettings } from "../../context/PokedexSettingsContext";
import { useMobileMenu } from "../../context/MobileMenuContext";
import { AiOutlineSearch } from "react-icons/ai";
import MobileSearchAndFilter from "./MobileSearchAndFilter";
import DesktopSearchAndFilter from "./DesktopSearchAndFilter";

// TODO missing "no pokemon found" screen when no pokemon are found

// TODO sticky search bar fails when scrolling quickly

const Pokedex = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterByType, setFilterByType] = React.useState<string[]>([]);
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const [headerOnTop, setHeaderOnTop] = React.useState(false);
  const [pokemonListToBeDisplayed, setPokemonListToBeDisplayed] = React.useState<
    { name: string; url: string }[]
  >([]);
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  const [limit, setLimit] = usePokedexSettings();
  const { pokemonList, isLoading, isError, isSuccess } = usePokemonList(limit);

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
      pokemonList?.filter((pokemonListItem) => pokemonListItem?.name.includes(searchTerm))
        .length === 0
    ) {
      setNotFound(true);
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center pt-20 dark:bg-darkPrimary bg-white max-w-[1280px] mx-auto relative">
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
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPokemonListToBeDisplayed={setPokemonListToBeDisplayed}
          headerOnTop={headerOnTop}
          noFiltering={false}
        />
      )}
      {mobileMenu && showMobileSearch && (
        <MobileSearchAndFilter
          showFilterMenu={showFilterMenu}
          setShowFilterMenu={setShowFilterMenu}
          filterByType={filterByType}
          setFilterByType={setFilterByType}
          showMobileSearch={showMobileSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPokemonListToBeDisplayed={setPokemonListToBeDisplayed}
          noFiltering={false}
        />
      )}
      {notFound && <div className="mt-32">No Pokemon found</div>}
      {isLoading && <FullScreenLoading />}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-[200px] items-start justify-center mt-4 min-w-[65%] min-h-screen ${
          headerOnTop ? "mt-24" : null
        }`}>
        {isError && "Error"}
        {isSuccess &&
          filterByType.length > 0 &&
          pokemonListToBeDisplayed
            .filter((pokemonListItem) => pokemonListItem?.name.includes(searchTerm))
            .map((pokemon) => {
              return <PokedexSinglePokemonWrapper key={pokemon.name} pokemon={pokemon} />;
            })}
        {/* TODO search doesnt work on iOS mobile browsers ;( */}
        {isSuccess &&
          filterByType.length === 0 &&
          pokemonList
            .filter((pokemonListItem) => pokemonListItem?.name.includes(searchTerm))

            .map((pokemon) => {
              return <PokedexSinglePokemonWrapper key={pokemon.name} pokemon={pokemon} />;
            })}
      </div>
    </div>
  );
};

export default Pokedex;
