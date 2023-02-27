import React from "react";

import { Link } from "react-router-dom";

import pokeball from "../../assets/nav_pokeball.png";
import valor from "../../assets/nav_valor.png";
import trainer from "../../assets/nav_pokemon-trainer.png";
import star from "../../assets/nav_star.png";

import { useAuth0 } from "@auth0/auth0-react";
import { useMobileMenu } from "../../context/MobileMenuContext";

const Nav = () => {
  const { isAuthenticated } = useAuth0();
  const [mobileMenu] = useMobileMenu();
  return (
    <nav
      className={`${
        !mobileMenu &&
        "w-auto max-w-[80px] hover:max-w-[254px] top-[22vh] fixed overflow-hidden h-fit  mt-16 "
      } flex flex-col gap-4 transition-all p-4 pr-0 pl-0 z-[5000]`}
    >
      <Link
        to="/"
        className={`whitespace-nowrap flex items-center dark:hover:bg-gray-800 hover:bg-trueWhite dark:hover:text-white hover:text-darkPrimary ${
          mobileMenu
            ? "hover:rounded-md active:rounded-md"
            : "hover:rounded-r-md"
        } p-2 pr-4 active:brightness-110`}
      >
        <img src={valor} className="h-12 w-12" />
        <h6 className="ml-6 font-bold">Pokedex</h6>
      </Link>
      <Link
        to="/potd"
        className={`whitespace-nowrap flex items-center dark:hover:bg-gray-800 hover:bg-trueWhite dark:hover:text-white hover:text-darkPrimary ${
          mobileMenu
            ? "hover:rounded-md active:rounded-md"
            : "hover:rounded-r-md"
        } p-2 pr-4 active:brightness-110`}
      >
        <img src={star} className="h-12 w-12" />
        <h6 className="ml-6 font-bold">Poke of the Day</h6>
      </Link>
      <Link
        to="/my-pokemon"
        className={`whitespace-nowrap flex items-center dark:hover:bg-gray-800 hover:bg-trueWhite dark:hover:text-white hover:text-darkPrimary ${
          mobileMenu
            ? "hover:rounded-md active:rounded-md"
            : "hover:rounded-r-md"
        } p-2 pr-4 active:brightness-110`}
      >
        <img src={pokeball} className="h-12 w-12" />
        <h6 className="ml-6 font-bold">My Pokemon</h6>
      </Link>
      {isAuthenticated && (
        <Link
          to="/profile"
          className={`whitespace-nowrap flex items-center dark:hover:bg-gray-800 hover:bg-trueWhite dark:hover:text-white hover:text-darkPrimary ${
            mobileMenu
              ? "hover:rounded-md active:rounded-md"
              : "hover:rounded-r-md"
          } p-2 pr-4 active:brightness-110`}
        >
          <img src={trainer} className="h-12 w-12" />
          <h6 className="ml-6 font-bold">Profile</h6>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
