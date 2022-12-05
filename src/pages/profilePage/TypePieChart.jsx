import React from "react";

import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import { usePokemon } from "../../utils/api-client";
import { QueryClient } from "@tanstack/react-query";
import { PieChart } from "react-minimal-pie-chart";
import { capitalize } from "../../utils/text-formatting";
import typeColorClassChartCodes from "../../utils/typeColorClassChart-codes";

const TypePieChart = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [types, setTypes] = React.useState([]);

  const { caughtPokemon } = useCaughtPokemon();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const createTally = (items = []) => {
    const tally = {};

    items.forEach((key) => {
      tally[key] = tally[key] ? tally[key] + 1 : 1;
    });

    return tally;
  };
  // TODO Separate fetching and display to two components?
  const formattedData = [];
  React.useEffect(() => {
    if (loading) {
      const fillAllTypes = async () => {
        const allTypes = [];
        await Promise.all(
          caughtPokemon?.map(async (pokemonNumber) => {
            const data = await queryClient.fetchQuery({
              queryKey: ["pokemon", pokemonNumber],
              queryFn: () =>
                fetch(
                  `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`
                ).then((res) => {
                  return res.json();
                }),
            });

            data?.types?.map((type) =>
              allTypes.push(capitalize(type.type.name))
            );

            setTypes((prev) => [...prev, ...allTypes]);
          })
        );
      };
      fillAllTypes();

      const talliedTypes = createTally(types);

      for (let type in talliedTypes) {
        formattedData.push({
          title: type,
          value: talliedTypes[type],
          color: typeColorClassChartCodes[type],
        });
      }
      setData(formattedData);
      setLoading(false);
    }
  }, [types]);
  // const getAllTypes = () => {
  //   const allTypes = [];
  //   caughtPokemon.map((pokemonNumber) => {
  //     thisPokemon?.types?.map((type) =>
  //       allTypes.push(capitalize(type.type.name))
  //     );
  //   });
  //   const talliedTypes = createTally(allTypes);

  //   for (let type in talliedTypes) {
  //     formattedData.push({
  //       title: type,
  //       value: talliedTypes[type],
  //       color: typeColorClassChartCodes[type],
  //     });
  //   }
  //   setLoading(false);
  //   return formattedData;
  // };
  // console.log(formattedData);
  // getAllTypes();

  return (
    <div>
      {!data.length > 0 ? (
        "Loading..."
      ) : (
        <PieChart
          className="w-72 h-72"
          data={data}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={(index) => ({
            fontSize: "4px",
          })}
          labelPosition={80}
        />
      )}
    </div>
  );
};

export default TypePieChart;
