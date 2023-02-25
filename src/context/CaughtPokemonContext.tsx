import React from "react";

type CaughtPokemonContextType = {
  caughtPokemon: string[];
  setCaughtPokemon: React.Dispatch<React.SetStateAction<string[]>> | null;
};

type CaughtPokemonContextValueType = CaughtPokemonContextType & {
  saveCaughtPokemon: (pokemonName: string) => void;
  removeCaughtPokemon: (pokemonName: string) => void;
};

const CaughtPokemonContext = React.createContext<CaughtPokemonContextType | undefined>(undefined);
CaughtPokemonContext.displayName = "CaughtPokemonContext";

function CaughtPokemonProvider(props: { [key: string]: unknown }) {
  const [caughtPokemon, setCaughtPokemon] = React.useState<string[]>([]);

  const saveCaughtPokemon = async (pokemonName: string) => {
    if (!caughtPokemon.includes(pokemonName)) {
      await setCaughtPokemon((prev) => [...prev, pokemonName]);
    }
  };

  const removeCaughtPokemon = (pokemonName: string) =>
    setCaughtPokemon((prev) => prev.filter((pokemon) => pokemon !== pokemonName));

  React.useEffect(() => {
    setCaughtPokemon(JSON.parse(localStorage.getItem("caughtPokemon") || ""));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
  }, [caughtPokemon]);

  const value: CaughtPokemonContextValueType = {
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
