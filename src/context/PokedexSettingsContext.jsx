import React from "react";

const PokedexSettingsContext = React.createContext();
PokedexSettingsContext.displayName = "PokedexSettingsContext";

const PokedexSettingsProvider = (props) => {
  const [limit, setLimit] = React.useState(905);

  const value = [limit, setLimit];

  return <PokedexSettingsContext.Provider value={value} {...props} />;
};

function usePokedexSettings() {
  const context = React.useContext(PokedexSettingsContext);
  if (context === undefined) {
    throw new Error(
      `usePokedexSettings must be used within a PokedexSettingsContext`
    );
  }
  return context;
}

export { usePokedexSettings, PokedexSettingsProvider };
