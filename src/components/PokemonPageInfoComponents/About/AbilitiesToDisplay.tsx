import React from "react";
import { Pokemon } from "../../../types/pokemon";

import Ability from "./Ability";

const AbilitiesToDisplay = ({ thisPokemon }: { thisPokemon: Pokemon }) => {
  return (
    <div className="w-fit flex flex-col items-between px-2 py-1">
      {thisPokemon?.abilities?.map((ability, index) => (
        <div className="flex items-center justify-between" key={index}>
          <div className="text-xs">{ability.is_hidden ? "Hidden Ability: " : "Ability: "}</div>
          <Ability ability={ability} />
        </div>
      ))}
    </div>
  );
};

export default AbilitiesToDisplay;
