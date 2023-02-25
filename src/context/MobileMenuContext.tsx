import React from "react";

type MobileMenuContextType = [
  mobileMenu: boolean,
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
];

const MobileMenuContext = React.createContext<MobileMenuContextType | undefined>(undefined);
MobileMenuContext.displayName = "MobileMenuContext";

const MobileMenuContextProvider = (props: { [key: string]: unknown }) => {
  const [mobileMenu, setMobileMenu] = React.useState(window.innerWidth <= 720);

  const handleWindowSizeChange = () => {
    setMobileMenu(window.innerWidth <= 720);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const value = [mobileMenu, setMobileMenu];

  return <MobileMenuContext.Provider value={value as MobileMenuContextType} {...props} />;
};

function useMobileMenu() {
  const context = React.useContext(MobileMenuContext);
  if (context === undefined) {
    throw new Error(`useMobileMenu must be used within a MobileMenuContext`);
  }
  return context;
}

export { MobileMenuContextProvider, useMobileMenu };
