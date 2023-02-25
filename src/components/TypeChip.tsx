import React from "react";
import typeColorClassChartBGlightMode from "../utils/typeColorClassChartBG-lightMode";

const TypeChip = ({ type }: { type: string }) => {
  type = type[0]?.toUpperCase() + type.substring(1);

  return (
    <div
      // href={`/type/${type.toLowerCase()}`}
      key={type[0]?.toUpperCase() + type.substring(1)}
      className={`${
        typeColorClassChartBGlightMode[type.toLowerCase()]
      } text-white  ml-1 mr-1 mx-2 w-14 h-5 rounded-xl flex justify-center items-center text-xs`}>
      {type[0]?.toUpperCase() + type.substring(1)}
    </div>
  );
};

export default TypeChip;
