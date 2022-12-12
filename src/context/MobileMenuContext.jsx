import React from "react";

const MobileMenuContext = React.createContext();
MobileMenuContext.displayName = "MobileMenuContext";

const MobileMenuContextProvider = (props) => {
  const [mobileMenu, setMobileMenu] = React.useState(window.innerWidth <= 720);

  const handleWindowSizeChange = () => {
    setMobileMenu(window.innerWidth <= 720);
  };

  React.useEffect((props) => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const value = [mobileMenu, setMobileMenu];

  return <MobileMenuContext.Provider value={value} {...props} />;
};

function useMobileMenu() {
  const context = React.useContext(MobileMenuContext);
  if (context === undefined) {
    throw new Error(`useMobileMenu must be used within a MobileMenuContext`);
  }
  return context;
}

export { MobileMenuContextProvider, useMobileMenu };
