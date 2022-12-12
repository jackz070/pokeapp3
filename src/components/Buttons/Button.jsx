import React from "react";

const Button = ({ displayText, type, onClick }) => {
  const typeColor = (type) => {
    if (type === "positive") {
      return "bg-green-500";
    } else if (type === "negative") {
      return "bg-red-500";
    } else null;
  };
  return (
    <button
      className={`${typeColor(
        type
      )} text-white px-4 py-2 text-sm tracking-wider outline-none rounded-sm hover:brightness-105 active:scale-[.98] active:shadow-sm`}
      onClick={onClick}
    >
      {displayText}
    </button>
  );
};

export default Button;
