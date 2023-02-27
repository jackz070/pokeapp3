import React from "react";

type PokedexSettingContextType = [
  limit: number,
  setLimit: React.Dispatch<React.SetStateAction<number>>
];

const PokedexSettingsContext = React.createContext<PokedexSettingContextType | undefined>(
  undefined
);
PokedexSettingsContext.displayName = "PokedexSettingsContext";

const PokedexSettingsProvider = (props: { [key: string]: unknown }) => {
  const [limit, setLimit] = React.useState(905);

  const value = [limit, setLimit];

  return <PokedexSettingsContext.Provider value={value as PokedexSettingContextType} {...props} />;
};

function usePokedexSettings() {
  const context = React.useContext(PokedexSettingsContext);
  if (context === undefined) {
    throw new Error(`usePokedexSettings must be used within a PokedexSettingsContext`);
  }
  return context;
}

export { usePokedexSettings, PokedexSettingsProvider };
