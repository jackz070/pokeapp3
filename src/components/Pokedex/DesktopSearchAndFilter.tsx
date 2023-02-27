import React from "react";
import { AiOutlineFilter } from "react-icons/ai";

import FilterByType from "./FilterByType";

interface DesktopSearchAndFilterTypes {
  showFilterMenu: boolean;
  setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  filterByType: string[];
  setFilterByType: React.Dispatch<React.SetStateAction<string[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPokemonListToBeDisplayed: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        url: string;
      }[]
    >
  >;
  headerOnTop: boolean;
  noFiltering: boolean;
}

const DesktopSearchAndFilter = ({
  showFilterMenu,
  setShowFilterMenu,
  filterByType,
  setFilterByType,
  searchTerm,
  setSearchTerm,
  setPokemonListToBeDisplayed,
  headerOnTop,
  noFiltering
}: DesktopSearchAndFilterTypes) => {
  const bar = React.useRef<HTMLInputElement>(null);
  const filterMenuButton = React.useRef<HTMLButtonElement>(null);

  const filterMenu = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (
        !filterMenuButton?.current?.contains(e.target as Node) &&
        !filterMenu?.current?.contains(e.target as Node)
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

  return (
    <div
      className={`transition-all flex items-center z-[7000] mb-12 ${
        headerOnTop ? "fixed top-[25px] " : null
      }`}>
      <input
        ref={bar}
        type="text"
        placeholder="Search for Pokemon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="leading-loose px-8 py-1 dark:bg-white bg-gray-200 rounded-xl text-darkPrimary placeholder-gray-500 "
      />
      {!noFiltering && (
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu((prev) => !prev)}
            className={`p-1 ml-4  rounded-full z-[9000] absolute right-1 -top-4 ${
              showFilterMenu ? "" : null
            }`}
            ref={filterMenuButton}>
            <AiOutlineFilter className={`fill-gray-500 w-6 h-6 `} />
            {filterByType.length !== 0 && (
              <div className="w-2 h-2 bg-red-500 absolute bottom-1 right-1 rounded-full"></div>
            )}
          </button>
        </div>
      )}
      {showFilterMenu && (
        <div
          className={`grid grid-cols-3 absolute h-60 w-80 top-32 right-72 ${
            headerOnTop ? "top-[3rem] left-40" : "top-32 right-72"
          } z-30 rounded-md uppercase dark:bg-white bg-trueWhite`}
          ref={filterMenu}>
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

export default DesktopSearchAndFilter;
