import React from "react";

import {
  capitalize,
  replaceHyphenWithSpaceAndCapitalize,
} from "../../../utils/text-formatting";

const EvolutionDetailsAndTriggers = ({ evolutionDetails }) => {
  const evolutionDetailsInfo = (evolutionDetails) => {
    console.log(evolutionDetails.min_level);
    if (evolutionDetails?.min_level) {
      console.log("min lvl");
      return `Min. Level ${evolutionDetails?.min_level}`;
    }

    if (evolutionDetails?.min_happiness) {
      return `Min. Happiness ${evolutionDetails?.min_happiness}`;
    }

    if (evolutionDetails?.item) {
      let formattedItem = evolutionDetails?.item.name.replace("-", " ");

      if (/\s/.test(formattedItem)) {
        formattedItem = formattedItem
          .split(" ")
          .map((word) => capitalize(word))
          .join(" ");
      }

      return `Item: ${formattedItem}`;
    }
    if (evolutionDetails?.held_item) {
      return `Held item: ${replaceHyphenWithSpaceAndCapitalize(
        evolutionDetails?.held_item.name
      )}`;
    }
  };

  const evolutionTriggersInfo = (evolutionDetails) => {
    if (evolutionDetails?.trigger?.name) {
      if (evolutionDetails?.trigger?.name === "use-item"){return "Trigger: Use Item" }
        return `Trigger: ${capitalize(evolutionDetails.trigger.name)}`;
    }
  };

  return (
    <div className="flex flex-col items-center ml-4">
      <div className="text-xs">{evolutionDetailsInfo(evolutionDetails)}</div>
      <div className="text-xs">{evolutionTriggersInfo(evolutionDetails)}</div>
      <div>➡️</div>
    </div>
  );
};

export default EvolutionDetailsAndTriggers;