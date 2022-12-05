import React from "react";
import { useQuery } from "@tanstack/react-query";
import { replaceHyphenWithSpaceAndCapitalize } from "../../../utils/text-formatting";
import LoadingSpinner from "../../Loaders/LoadingSpinner";

const Ability = ({ ability }) => {
  const [showAbilityPopup, setShowAbilityPopup] = React.useState(false);
  const [isScrollable, setIsScrollable] = React.useState(false);

  const abilityEffectToDisplay = (abilityDetails) => {
    const effectEntries = abilityDetails?.effect_entries;
    if (effectEntries[0]?.language?.name === "en") {
      return effectEntries[0]?.effect;
    } else if (effectEntries[1]?.language?.name === "en") {
      return effectEntries[1]?.effect;
    }
  };

  const {
    data: abilityDetails,
    isSuccess,
    isLoading,
  } = useQuery(["abilityDetails", ability?.ability.url], () => {
    return fetch(ability?.ability.url).then((res) => res.json());
  });

  // Check if the ability popup is scrollable to display indicator if it is
  const abilityPopup = React.useRef();

  React.useLayoutEffect(() => {
    if (
      abilityPopup?.current?.scrollHeight > abilityPopup?.current?.clientHeight
    ) {
      setIsScrollable(true);
    }

    console.log(isScrollable);
  }, [showAbilityPopup]);

  return (
    <div
      onMouseEnter={() => setShowAbilityPopup(true)}
      onMouseLeave={() => {
        setShowAbilityPopup(false);
      }}
      className="ml-4 relative underline decoration-dashed cursor-pointer"
    >
      {replaceHyphenWithSpaceAndCapitalize(ability?.ability.name)}
      {showAbilityPopup && isLoading && <LoadingSpinner size={"small"} />}
      {showAbilityPopup && isSuccess && (
        <div
          className="my-2 bg-slate-200 px-6 py-2 rounded-md drop-shadow-md text-darkPrimary absolute top-4 -left-1/2 w-56 text-sm z-50 max-h-32 overflow-y-scroll"
          ref={abilityPopup}
        >
          {abilityEffectToDisplay(abilityDetails)}
          {isScrollable && (
            <div className="absolute text-xs top-[50%] right-2">▼</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ability;
