import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { useMobileMenu } from "../../context/MobileMenuContext";
import LoginUserHeaderArea from "./LoginUserHeaderArea";
import MobileMenu from "./MobileMenu";

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import { useBasePath } from "../../utils/useBasePath";

import DarkModeSwitch from "../../utils/DarkModeSwitch";
import { useDarkMode } from "../../context/DarkModeContext";

const Header = () => {
  const [displayMobileMenu, setDisplayMobileMenu] = React.useState(false);
  const [mobileMenu] = useMobileMenu();
  const basePath = useBasePath();
  const [darkMode] = useDarkMode();

  return (
    <Fragment>
      <ToastContainer theme={darkMode ? "dark" : "light"} className="mt-14" />
      <header
        className={`w-full h-20 dark:bg-darkPrimary bg-white justify-between fixed flex items-center px-4 ${
          basePath === "/pokemon" && !mobileMenu ? "z-[30] " : "z-[6000]"
        }`}
      >
        <Link to="/" className="">
          <div className="uppercase tracking-widest font-bold text-2xl relative  dark:text-white text-darkPrimary">
            PokeApp 3.0
          </div>
        </Link>
        {!mobileMenu && (
          <div className="flex items-center gap-4">
            <DarkModeSwitch />
            <LoginUserHeaderArea />
          </div>
        )}
        {mobileMenu && <DarkModeSwitch small={true} />}

        {displayMobileMenu
          ? mobileMenu && (
              <button
                onClick={() => setDisplayMobileMenu((prev) => !prev)}
                className=""
              >
                <AiOutlineClose className="w-6 h-6 dark:fill-white" />
              </button>
            )
          : mobileMenu && (
              <button
                onClick={() => setDisplayMobileMenu((prev) => !prev)}
                className=""
              >
                <AiOutlineMenu className="w-6 h-6 dark:fill-white" />
              </button>
            )}
      </header>
      {displayMobileMenu && (
        <MobileMenu setDisplayMobileMenu={setDisplayMobileMenu} />
      )}
    </Fragment>
  );
};

export default Header;
