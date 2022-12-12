import React from "react";
import ContentLoader from "react-content-loader";
// TODO light mode placeholder && use this to update shapesin current one because they are too small
const PokedexSinglePokemonSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={130}
    height={140}
    viewBox="0 0 130 140"
    backgroundColor="#22222c"
    foregroundColor="#2a2a37"
    {...props}
    className="pt-4"
  >
    <rect x="20" y="20" rx="0" ry="0" width="90" height="84" />
    <rect x="55" y="107" rx="0" ry="0" width="20" height="11" />
    <rect x="20" y="122" rx="0" ry="0" width="90" height="16" />
  </ContentLoader>
);

export default PokedexSinglePokemonSkeleton;
