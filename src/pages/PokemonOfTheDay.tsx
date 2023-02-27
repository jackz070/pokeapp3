import React from "react";
import seedrandom from "seedrandom";
import { RandomReveal } from "react-random-reveal";

import PokemonPage from "./PokemonPage";

// TODO BUG Pokemon of the Day is supposed to change every day, which is why the seed for random pokemon number generator is date // apprently the random number doesn't change with the day change, it was 218 for two days in the row

const PokemonOfTheDay = () => {
  const [isWaiting, setIsWaiting] = React.useState(true);

  const ofTheDay = () => {
    const today = new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
    const rng = seedrandom(today);
    const result = Math.floor(rng() * 904);
    if (result >= 1 && result <= 905) {
      return result;
    } else {
      throw new Error("wrong number");
    }
  };

  const todaysNumber = Math.floor(ofTheDay()).toString();

  React.useEffect(() => {
    setTimeout(() => {
      setIsWaiting(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-32">
      <div className="flex flex-col items-center justify-center">
        <span>Today&apos;s lucky number is...</span>
        <div className="text-2xl font-bold mt-2">
          {/* TODO RandomReveal here displays random character instead of value of todaysNumber */}
          <RandomReveal
            isPlaying
            duration={2}
            characters={todaysNumber}
            characterSet={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          />
        </div>
      </div>
      {!isWaiting && <PokemonPage id={todaysNumber} />}
    </div>
  );
};

export default PokemonOfTheDay;
