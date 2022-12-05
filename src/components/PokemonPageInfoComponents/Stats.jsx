import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import typeColorClassChartCodes from "../../utils/typeColorClassChart-codes";

import "./Stats.css";
//TODO stat chart color -> type
const Stats = ({ thisPokemon }) => {
  return (
    <div>
      {thisPokemon?.stats.map((stat) => (
        <div className="flex items-center justify-between" key={stat.stat.name}>
          <h5>
            {stat.stat.name === "special-attack"
              ? "Sp. Atk"
              : stat.stat.name === "special-defense"
              ? "Sp. Def"
              : stat.stat.name === "hp"
              ? "HP"
              : stat.stat.name[0].toUpperCase() + stat.stat.name?.substring(1)}
          </h5>

          <div className="flex items-center">
            <span className="font-bold ml-4">{stat.base_stat}</span>
            <ProgressBar
              completed={stat.base_stat}
              maxCompleted={255}
              customLabel={null}
              animateOnRender={true}
              labelClassName="progress_bar-className"
              height="8px"
              width="10rem"
              className="ml-4"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
