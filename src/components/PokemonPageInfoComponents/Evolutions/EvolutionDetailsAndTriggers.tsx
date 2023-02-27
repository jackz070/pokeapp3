import React from "react";
import { type IEvolutionDetail } from "../../../types/evolutionChain";

import { capitalize, replaceHyphenWithSpaceAndCapitalize } from "../../../utils/text-formatting";

const EvolutionDetailsAndTriggers = ({
  evolutionDetails
}: {
  evolutionDetails: IEvolutionDetail;
}) => {
  const evolutionDetailsInfo = (evolutionDetails: IEvolutionDetail) => {
    if (evolutionDetails?.min_level) {
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
          .map((word: string) => capitalize(word))
          .join(" ");
      }

      return `Item: ${formattedItem}`;
    }
    if (evolutionDetails?.held_item) {
      return `Held item: ${replaceHyphenWithSpaceAndCapitalize(evolutionDetails?.held_item.name)}`;
    }
  };

  const evolutionTriggersInfo = (evolutionDetails: IEvolutionDetail) => {
    if (evolutionDetails?.trigger?.name) {
      if (evolutionDetails?.trigger?.name === "use-item") {
        return "Trigger: Use Item";
      }
      return `Trigger: ${capitalize(evolutionDetails.trigger.name)}`;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xs">{evolutionDetailsInfo(evolutionDetails)}</div>
      <div className="text-xs">{evolutionTriggersInfo(evolutionDetails)}</div>
      <div>➡️</div>
    </div>
  );
};

export default EvolutionDetailsAndTriggers;
