import React from "react";

const DarkModeContext = React.createContext();
DarkModeContext.displayName = "DarkModeContext";

// TODO now that changes are visible make it work: persist chosen theme, check system preferences
const DarkModeContextProvider = (props) => {
  function setDarkTheme() {
    localStorage.theme = "dark";
    document.body.classList.add("dark");
  }

  function setLightTheme() {
    localStorage.theme = "light";
    document.body.classList.remove("dark");
  }

  const value = [setDarkTheme, setLightTheme];
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
