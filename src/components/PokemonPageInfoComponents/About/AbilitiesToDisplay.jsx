import React from "react";
import { replaceHyphenWithSpaceAndCapitalize } from "../../../utils/text-formatting";

import Ability from "./Ability";

const AbilitiesToDisplay = ({ thisPokemon }) => {
  return (
    <div className="w-fit flex flex-col items-between px-2 py-1">
      {thisPokemon?.abilities?.map((ability) => (
        <div className="flex items-center justify-between">
          <div className="text-xs">
            {ability.is_hidden ? "Hidden Ability: " : "Ability: "}
          </div>
          <Ability ability={ability} />
        </div>
      ))}
    </div>
  );
};

export default AbilitiesToDisplay;
