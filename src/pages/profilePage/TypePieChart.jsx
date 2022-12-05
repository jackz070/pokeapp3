import React from "react";

import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import { usePokemon } from "../../utils/api-client";
import { QueryClient } from "@tanstack/react-query";
import { PieChart } from "react-minimal-pie-chart";
import { capitalize } from "../../utils/text-formatting";
import typeColorClassChartCodes from "../../utils/typeColorClassChart-codes";

const TypePieChart = () => {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
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

  const fillAllTypes = async () => {
    setLoading(true);
    const formattedData = [];
    await Promise.all(
      caughtPokemon?.map(async (pokemonNumber) => {
        const data = await queryClient.fetchQuery({
          queryKey: ["pokemon", pokemonNumber],
          queryFn: () =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
              .then((res) => {
                return res.json();
              })
              .then((data) =>
                data?.types?.map((type) =>
                  setTypes((prev) => [...prev, capitalize(type.type.name)])
                )
              ),
        });
      })
    );
    const talliedTypes = await createTally(types);

    for (let type in talliedTypes) {
      await formattedData.push({
        title: type,
        value: talliedTypes[type],
        color: typeColorClassChartCodes[type],
      });
    }
    await setData(formattedData);
  };

  React.useEffect(() => {
    fillAllTypes();
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fillAllTypes();
    setLoading(false);
  }, [data]);

  return (
    <div>
      <PieChart
        className="w-72 h-72"
        data={data}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={(index) => ({
          fontSize: "4px",
        })}
        labelPosition={80}
      />
    </div>
  );
};

export default TypePieChart;
