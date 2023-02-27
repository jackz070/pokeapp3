import React from "react";

import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import { QueryClient } from "@tanstack/react-query";
import { PieChart } from "react-minimal-pie-chart";
import { capitalize } from "../../utils/text-formatting";
import typeColorClassChartCodes from "../../utils/typeColorClassChart-codes";
import { BaseDataEntry } from "react-minimal-pie-chart/types/commonTypes";

const TypePieChart = () => {
  const [data, setData] = React.useState<BaseDataEntry[]>();
  const [loading, setLoading] = React.useState(true);
  const [types, setTypes] = React.useState<string[]>([]);

  const { caughtPokemon } = useCaughtPokemon();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  });

  const createTally = (items: string[] = []) => {
    const tally: { [key: string]: number } = {};

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
                data?.types?.map((type: { slot: number; type: { name: string; url: string } }) => {
                  setTypes((prev) => [...prev, capitalize(type.type.name)]);
                })
              )
        });
      })
    );

    const talliedTypes = createTally(types);

    for (const type in talliedTypes) {
      formattedData.push({
        title: type,
        value: talliedTypes[type as keyof typeof talliedTypes],
        color: typeColorClassChartCodes[type as keyof typeof typeColorClassChartCodes]
      });
    }
    setData(formattedData);
  };

  React.useEffect(() => {
    if (!(caughtPokemon.length === 0)) {
      fillAllTypes();
    }
  }, []);

  React.useEffect(() => {
    if (data === undefined || data.length === 0) {
      fillAllTypes();
    }
  }, [data]);

  return (
    <div>
      {data && (
        <PieChart
          className="w-72 h-72"
          data={data}
          label={({ dataEntry }) => dataEntry.title}
          labelStyle={() => ({
            fontSize: "4px",
            fill: ""
          })}
          labelPosition={80}
        />
      )}
    </div>
  );
};

export default TypePieChart;
