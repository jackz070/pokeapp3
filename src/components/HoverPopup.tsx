import React from "react";

const HoverPopup = ({
  displayText,
  popupContent
}: {
  displayText: string;
  popupContent: string;
}) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [isScrollable, setIsScrollable] = React.useState(false);

  // Check if the popupContent is scrollable to display indicator if it is
  const popup = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (popup.current && popup?.current?.scrollHeight > popup?.current?.clientHeight) {
      setIsScrollable(true);
    }
  }, [showPopup]);

  return (
    <div
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => {
        setShowPopup(false);
      }}
      className=" ml-2 relative underline decoration-dashed cursor-pointer text-xs">
      {displayText}
      {showPopup && (
        <div
          className="my-2 bg-slate-200 px-6 py-2 rounded-md drop-shadow-md text-darkPrimary absolute top-4 -left-1/2 w-56 text-sm z-50 max-h-32 overflow-y-scroll"
          ref={popup}>
          {popupContent}
          {isScrollable && <div className="absolute text-xs top-[50%] right-2">▼</div>}
        </div>
      )}
    </div>
  );
};

export default HoverPopup;
