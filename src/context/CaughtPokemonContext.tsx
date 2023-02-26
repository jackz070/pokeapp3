import React from "react";

type CaughtPokemonContextType = {
  caughtPokemon: string[];
  setCaughtPokemon: React.Dispatch<React.SetStateAction<string[]>>;
  saveCaughtPokemon: (pokemonName: string) => void;
  removeCaughtPokemon: (pokemonName: string) => void;
};

const CaughtPokemonContext = React.createContext<CaughtPokemonContextType | undefined>(undefined);
CaughtPokemonContext.displayName = "CaughtPokemonContext";

function CaughtPokemonProvider(props: { [key: string]: unknown }) {
  const [caughtPokemon, setCaughtPokemon] = React.useState<string[]>([]);

  const saveCaughtPokemon = (pokemonName: string) => {
    if (!caughtPokemon.includes(pokemonName)) {
      setCaughtPokemon((prev) => [...prev, pokemonName]);
    }
  };

  const removeCaughtPokemon = (pokemonName: string) =>
    setCaughtPokemon((prev) => prev.filter((pokemon) => pokemon !== pokemonName));

  React.useEffect(() => {
    localStorage.getItem("caughtPokemon")
      ? setCaughtPokemon(JSON.parse(localStorage.getItem("caughtPokemon") || ""))
      : localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
  }, [caughtPokemon]);

  const value: CaughtPokemonContextType = {
    caughtPokemon,
    saveCaughtPokemon,
    removeCaughtPokemon,
    setCaughtPokemon
  };

  return <CaughtPokemonContext.Provider value={value} {...props} />;
}

function useCaughtPokemon() {
  const context = React.useContext(CaughtPokemonContext);
  if (context === undefined) {
    throw new Error(`useCaughtPokemon must be used within a CaughtPokemonContext`);
  }
  return context;
}

export { CaughtPokemonProvider, useCaughtPokemon };
