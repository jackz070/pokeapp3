import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { useMobileMenu } from "../../context/MobileMenuContext";
import LoginUserHeaderArea from "./LoginUserHeaderArea";
import MobileMenu from "./MobileMenu";

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [displayMobileMenu, setDisplayMobileMenu] = React.useState(false);
  const [mobileMenu] = useMobileMenu();
  return (
    <Fragment>
      <ToastContainer theme={"dark"} className="pt-14 " />
      <header className="w-full h-20 bg-[#191921] justify-between fixed z-[1000] flex items-center px-4">
        <Link to="/" className="">
          <div className="uppercase tracking-widest font-bold text-2xl relative ">
            PokeApp 3.0
          </div>
        </Link>
        {!mobileMenu && <LoginUserHeaderArea />}
        {displayMobileMenu
          ? mobileMenu && (
              <button
                onClick={() => setDisplayMobileMenu((prev) => !prev)}
                className=""
              >
                <AiOutlineClose className="w-6 h-6" />
              </button>
            )
          : mobileMenu && (
              <button
                onClick={() => setDisplayMobileMenu((prev) => !prev)}
                className=""
              >
                <AiOutlineMenu className="w-6 h-6" />
              </button>
            )}
      </header>
      {displayMobileMenu && <MobileMenu />}
    </Fragment>
  );
};

export default Header;
