import React from "react";

import Nav from "./Nav";
import LoginUserHeaderArea from "./LoginUserHeaderArea";

import { RemoveScroll } from "react-remove-scroll";
import DarkModeSwitch from "../../utils/DarkModeSwitch";

const MobileMenu = ({ setDisplayMobileMenu }) => {
  const handleClickOutsideElements = (e) => {
    if (e.target.tagName !== "DIV" && e.target.tagName !== "svg") {
      setDisplayMobileMenu(false);
    }
  };

  React.useEffect((props) => {
    window.addEventListener("click", handleClickOutsideElements);
    return () => {
      window.removeEventListener("click", handleClickOutsideElements);
    };
  }, []);

  return (
    <RemoveScroll>
      <div className="h-full w-full fixed overscroll-none overflow-hidden z-[55]">
        <div className="dark:bg-darkPrimary bg-white dark:text-white text-darkPrimary h-screen w-screen flex flex-col justify-center items-center overscroll-none overflow-hidden">
          <div className="mb-12 ">
            <Nav />
            <DarkModeSwitch />
          </div>
          <LoginUserHeaderArea className="mt-12" />
        </div>
      </div>
    </RemoveScroll>
  );
};

export default MobileMenu;
