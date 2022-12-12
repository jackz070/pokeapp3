import React from "react";
import { RemoveScroll } from "react-remove-scroll";

const BlurredBackground = ({ children }) => {
  return (
    <RemoveScroll>
      <div className="bg-[rgba(0,0,0,0.5)] h-screen w-screen fixed top-0 left-0 z-[7000] flex items-center justify-center backdrop-blur-[3px]">
        {children}
      </div>
    </RemoveScroll>
  );
};

export default BlurredBackground;
