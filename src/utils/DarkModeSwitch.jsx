import React from "react";

import { useDarkMode } from "../context/DarkModeContext";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  const handleChange = () => {
    setDarkMode((darkMode) => !darkMode);
  };
  return (
    <div className="flex items-center justify-between w-72 mt-1 z-[20000]">
      <label className=" flex items-center text-xs relative">
        <input
          type="checkbox"
          className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
          checked={darkMode}
          onChange={handleChange}
        />
        <span className="w-8 h-5 flex items-center flex-shrink-0 m-2 p-[2px] bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-1"></span>
        Dark Mode
      </label>
    </div>
  );
};

export default DarkModeSwitch;
