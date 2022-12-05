import React from "react";

import PokeballLarge from "../../assets/PokeballLarge.png";

const FullScreenLoading = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-screen w-screen">
      <img src={PokeballLarge} className="w-24 h-24 animate-ping" />
    </div>
  );
};

export default FullScreenLoading;
