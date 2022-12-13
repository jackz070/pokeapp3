import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Loaders/LoadingSpinner";
import SimplePokemonInfo from "./SimplePokemonInfo";
import EvolutionDetailsAndTriggers from "./EvolutionDetailsAndTriggers";
import { useMobileMenu } from "../../../context/MobileMenuContext";

const Evolutions = ({ thisPokemonDetails }) => {
  const url = thisPokemonDetails?.evolution_chain.url;
  const [mobileMenu] = useMobileMenu();
  const {
    data: thisPokemonEvolutionChain,
    isSuccess,
    isLoading,
  } = useQuery(["pokemonEvolutionChain", url], () => {
    return fetch(url).then((res) => res.json());
  });

  // TODO add other evolution requirements if showing all generations

  return (
    <div className="flex flex-col sm:flex-row">
      {isLoading && <LoadingSpinner />}
      {isSuccess &&
        thisPokemonEvolutionChain?.chain?.evolves_to.length === 0 && (
          <div className="flex flex-col items-center mt-6 ">
            <div>This Pokemon has no evolutions.</div>
          </div>
        )}

      {isSuccess && thisPokemonEvolutionChain?.chain?.evolves_to.length > 0 && (
        <div className="">
          <SimplePokemonInfo
            pokemonNumber={thisPokemonEvolutionChain?.chain?.species?.name}
          />
        </div>
      )}

      {isSuccess && thisPokemonEvolutionChain?.chain?.evolves_to[0] && (
        <div className="flex flex-col items-center  ">
          <div>
            {thisPokemonEvolutionChain?.chain?.evolves_to.map(
              (evolution, index) => (
                <div
                  className={`flex ${
                    mobileMenu && "flex-col"
                  } items-center justify-between`}
                >
                  <EvolutionDetailsAndTriggers
                    evolutionDetails={
                      thisPokemonEvolutionChain?.chain?.evolves_to[index]
                        ?.evolution_details[0]
                    }
                  />
                  <SimplePokemonInfo
                    pokemonNumber={evolution.species.name}
                    className="mx-2"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
      {isSuccess &&
        thisPokemonEvolutionChain?.chain?.evolves_to[0]?.evolves_to[0] && (
          <div className="flex flex-col items-center  ">
            <div>
              {thisPokemonEvolutionChain?.chain?.evolves_to[0]?.evolves_to.map(
                (evolution, index) => (
                  <div
                    className={`flex ${
                      mobileMenu && "flex-col"
                    } items-center justify-between`}
                  >
                    <EvolutionDetailsAndTriggers
                      className=""
                      evolutionDetails={
                        thisPokemonEvolutionChain?.chain?.evolves_to[0]
                          ?.evolves_to[index]?.evolution_details[0]
                      }
                    />
                    <SimplePokemonInfo
                      pokemonNumber={evolution.species.name}
                      className="mx-2"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Evolutions;
