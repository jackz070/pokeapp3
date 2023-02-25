import React from "react";
import ContentLoader from "react-content-loader";
import { IContentLoaderProps } from "react-content-loader";

const PokedexSinglePokemonSkeletonLight = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={140}
    height={150}
    viewBox="0 0 140 150"
    backgroundColor="#ededed"
    foregroundColor="#ffffff"
    {...props}>
    <rect x="59" y="113" rx="0" ry="0" width="22" height="12" />
    <rect x="5" y="130" rx="0" ry="0" width="130" height="20" />
    <rect x="5" y="10" rx="0" ry="0" width="130" height="100" />
  </ContentLoader>
);

export default PokedexSinglePokemonSkeletonLight;
