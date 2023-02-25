import React from "react";


type DarkModeContextType = [
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
];
const DarkModeContext = React.createContext<DarkModeContextType | undefined>(undefined);
DarkModeContext.displayName = "DarkModeContext";

const DarkModeContextProvider = (props: { [key: string]: unknown }) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(localStorage.theme === "dark");

  const value = [darkMode, setDarkMode];
  return <DarkModeContext.Provider value={value as DarkModeContextType} {...props} />;
};

function useDarkMode() {
  const context = React.useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(`useDarkMode must be used within a DarkModeContext`);
  }
  return context;
}

export { DarkModeContextProvider, useDarkMode };
