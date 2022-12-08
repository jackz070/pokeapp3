import React from "react";

import Nav from "./Nav";
import LoginUserHeaderArea from "./LoginUserHeaderArea";

import { RemoveScroll } from "react-remove-scroll";

// TODO All link clicks in this menu should close it
// TODO Nav should have backgrounds that are not straight on left side
const MobileMenu = () => {
  return (
    <RemoveScroll>
      <div className="h-full w-full fixed overscroll-none overflow-hidden z-[55]">
        <div className="bg-darkPrimary h-screen w-screen flex flex-col justify-center items-center overscroll-none overflow-hidden">
          <div className="mb-12">
            <Nav />
          </div>
          <LoginUserHeaderArea className="mt-12" />
        </div>
      </div>
    </RemoveScroll>
  );
};

export default MobileMenu;
