import React from "react";

const Button = ({ displayText, type }) => {
  return (
    <button className="bg-white text-[#191921] px-8 py-2   tracking-wider outline-none rounded-sm hover:brightness-105 active:scale-[.98] active:shadow-sm">
      {displayText}
    </button>
  );
};

export default Button;
