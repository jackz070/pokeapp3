import React from "react";

const CaughtPokemonContext = React.createContext();
CaughtPokemonContext.displayName = "CaughtPokemonContext";

function CaughtPokemonProvider(props) {
  const [caughtPokemon, setCaughtPokemon] = React.useState([]);

  const saveCaughtPokemon = async (pokemonNumber) => {
    if (!caughtPokemon.includes(pokemonNumber)) {
      await setCaughtPokemon((prev) => [...prev, pokemonNumber]);
    }
  };

  const removeCaughtPokemon = (pokemonNumber) =>
    setCaughtPokemon((prev) =>
      prev.filter((pokemon) => pokemon !== pokemonNumber)
    );

  React.useEffect(() => {
    localStorage.getItem("caughtPokemon")
      ? setCaughtPokemon(JSON.parse(localStorage.getItem("caughtPokemon")))
      : null;
  }, []);

  React.useEffect(() => {
    localStorage.setItem("caughtPokemon", JSON.stringify(caughtPokemon));
  }, [caughtPokemon]);

  const value = { caughtPokemon, saveCaughtPokemon, removeCaughtPokemon };

  return <CaughtPokemonContext.Provider value={value} {...props} />;
}

function useCaughtPokemon() {
  const context = React.useContext(CaughtPokemonContext);
  if (context === undefined) {
    throw new Error(
      `useCaughtPokemon must be used within a CaughtPokemonContext`
    );
  }
  return context;
}

export { CaughtPokemonProvider, useCaughtPokemon };
