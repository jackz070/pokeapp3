import React from "react";

import iconLight from "../assets/icon-light.png";
import iconDark from "../assets/icon-dark.png";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeSwitch = ({ small = false }: { small?: boolean }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  const handleChange = () => {
    if (darkMode) {
      setDarkMode(false);
      localStorage.theme = "light";
      setTimeout(() => {
        document.body.classList.remove("dark");
      }, 170);
    } else {
      setDarkMode(true);
      localStorage.theme = "dark";
      setTimeout(() => {
        document.body.classList.add("dark");
      }, 170);
    }
  };

  return (
    <div className="flex items-center justify-between w-fit h-fit z-[20000]">
      <label className=" flex items-center text-xs relative overflow-hidden">
        <input
          type="checkbox"
          className="absolute left-1/2 -translate-x-1/2 w-fit h-fit peer appearance-none rounded-md"
          checked={darkMode}
          onChange={handleChange}
        />
        <img
          src={iconDark}
          className={`${
            small ? "h-6 w-6 left-2" : " h-10 w-10 left-2"
          } absolute  -translate-y-12 peer-checked:translate-y-0 transition-all duration-1000`}
        />

        <img
          src={iconLight}
          className={`${
            small ? "h-6 w-6 left-2 " : "h-8 w-8 left-4 "
          } absolute saturate-100  peer-checked:translate-y-12 transition-all duration-1000`}
        />

        <span
          className={`${
            small ? "w-10 h-8" : "w-16 h-12"
          } flex items-center flex-shrink-0  p-[2px] bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-blue-600 `}></span>
      </label>
    </div>
  );
};

export default DarkModeSwitch;
