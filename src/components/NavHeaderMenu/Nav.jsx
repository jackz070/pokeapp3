import React from "react";

import { Link } from "react-router-dom";

import pokeball from "../../assets/nav_pokeball.png";
import valor from "../../assets/nav_valor.png";
import trainer from "../../assets/nav_pokemon-trainer.png";

import { useAuth0 } from "@auth0/auth0-react";
import { useMobileMenu } from "../../context/MobileMenuContext";

const Nav = ({ sideNavIsOpen, setSideNavIsOpen }) => {
  const { isAuthenticated } = useAuth0();
  const [mobileMenu] = useMobileMenu();
  return (
    <nav
      className={`${
        !mobileMenu &&
        "w-auto max-w-[80px] hover:max-w-[254px] top-[30vh] fixed overflow-hidden h-fit  mt-24"
      } flex flex-col gap-4 transition-all p-4 pr-0 pl-0 z-[5000]`}
      // onMouseEnter={() => setSideNavIsOpen(true)}
      // onMouseLeave={() => setSideNavIsOpen(false)}
    >
      <Link
        to="/"
        className={`whitespace-nowrap flex items-center hover:bg-gray-800 ${
          mobileMenu
            ? "hover:rounded-md active:rounded-md"
            : "hover:rounded-r-md"
        } p-2 pr-4 active:brightness-110`}
      >
        <img src={valor} className="h-12 w-12" />
        <div className="ml-6 font-bold">Pokedex</div>
      </Link>
      <Link
        to="/my-pokemon"
        className={`whitespace-nowrap flex items-center hover:bg-gray-800 ${
          mobileMenu
            ? "hover:rounded-md active:rounded-md"
            : "hover:rounded-r-md"
        } p-2 pr-4 active:brightness-110`}
      >
        <img src={pokeball} className="h-12 w-12" />
        <div className="ml-6 font-bold">My Pokemon</div>
      </Link>
      {isAuthenticated && (
        <Link
          to="/profile"
          className={`whitespace-nowrap flex items-center hover:bg-gray-800 ${
            mobileMenu
              ? "hover:rounded-md active:rounded-md"
              : "hover:rounded-r-md"
          } p-2 pr-4 active:brightness-110`}
        >
          <img src={trainer} className="h-12 w-12" />
          <div className="ml-6 font-bold">Profile</div>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
