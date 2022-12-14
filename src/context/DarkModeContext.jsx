import React from "react";

const DarkModeContext = React.createContext();
DarkModeContext.displayName = "DarkModeContext";

// TODO now that changes are visible make it work: persist chosen theme, check system preferences
const DarkModeContextProvider = (props) => {
  const [darkMode, setDarkMode] = React.useState(localStorage.theme === "dark");

  const value = [darkMode, setDarkMode];
  return <DarkModeContext.Provider value={value} {...props} />;
};

function useDarkMode() {
  const context = React.useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error(`useDarkMode must be used within a DarkModeContext`);
  }
  return context;
}

export { DarkModeContextProvider, useDarkMode };
