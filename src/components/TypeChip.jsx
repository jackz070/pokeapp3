import { useDarkMode } from "../context/DarkModeContext";
import typeColorClassChart from "../utils/typeColorClassChart";
import typeColorClassChartCodes from "../utils/typeColorClassChart-codes";
import typeColorClassChartBGlightMode from "../utils/typeColorClassChartBG-lightMode";

const TypeChip = ({ type }) => {
  type = type[0]?.toUpperCase() + type.substring(1);

  const [darkMode] = useDarkMode();
  console.log(typeColorClassChartBGlightMode[type]);
  const conditionalStyles = () => {
    return darkMode
      ? `${typeColorClassChart[type]} border-solid border-2`
      : `${typeColorClassChartBGlightMode[type.toLowerCase()]} text-white`;
  };

  return (
    <div
      // href={`/type/${type.toLowerCase()}`}
      label={type[0]?.toUpperCase() + type.substring(1)}
      className={`${conditionalStyles()}  ml-1 mr-1 mx-2 w-14 h-5 rounded-xl flex justify-center items-center text-xs`}
    >
      {type[0]?.toUpperCase() + type.substring(1)}
    </div>
  );
};

export default TypeChip;
