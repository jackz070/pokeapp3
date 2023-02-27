import React from "react";
import Nav from "./Nav";
import { RemoveScroll } from "react-remove-scroll";

const MobileMenu = ({
  setDisplayMobileMenu
}: {
  setDisplayMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClickOutsideElements = (e: MouseEvent | TouchEvent) => {
    const element = e?.target as Element;
    if (element.tagName !== "DIV" && element.tagName !== "svg") {
      setDisplayMobileMenu(false);
    }
  };

  React.useEffect(() => {
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
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
};

export default MobileMenu;
