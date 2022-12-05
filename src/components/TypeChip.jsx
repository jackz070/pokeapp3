import typeColorClassChart from "../utils/typeColorClassChart";


const TypeChip = ({ type }) => {
  type = type[0]?.toUpperCase() + type.substring(1);
  return (
    <div
      // href={`/type/${type.toLowerCase()}`}
      label={type[0]?.toUpperCase() + type.substring(1)}
      className={`${typeColorClassChart[type]} text-white border-yellow-600 border-solid border-2 ml-1 mr-1 mx-2 w-14 h-5 rounded-xl flex justify-center items-center text-xs`}
    >
      {type[0]?.toUpperCase() + type.substring(1)}
    </div>
  );
};

export default TypeChip;
