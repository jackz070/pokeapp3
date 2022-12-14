import React from "react";
import { AiOutlineFilter } from "react-icons/ai";

import { QueryClient } from "@tanstack/react-query";
import FilterByType from "./FilterByType";

const MobileSearchAndFilter = ({
  showFilterMenu,
  setShowFilterMenu,
  filterByType,
  setFilterByType,
  showMobileSearch,

  searchTerm,
  setSearchTerm,
  setPokemonListToBeDisplayed,
  noFiltering,
}) => {
  const filterMenuButton = React.useRef();
  const filterMenu = React.useRef();

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

  // Mobile search closes on click outside
  const mobileSearch = React.useRef();
  // const mobileSearchButton = React.useRef();

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
      {!noFiltering && (
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
        </div>
      )}
      {showFilterMenu && (
        <div
          className={`grid grid-cols-3 absolute h-60 px-4 pb-2 top-16  ${
            showMobileSearch && ""
          } z-30 rounded-md uppercase bg-white  w-screen`}
          ref={filterMenu}
        >
          <FilterByType
            setPokemonListToBeDisplayed={setPokemonListToBeDisplayed}
            filterByType={filterByType}
            setFilterByType={setFilterByType}
          />
        </div>
      )}
    </div>
  );
};

export default MobileSearchAndFilter;
