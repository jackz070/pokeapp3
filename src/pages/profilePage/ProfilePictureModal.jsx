import React, { Fragment } from "react";

import { useCustomUserProfile } from "../../context/CustomUserProfileContext";
import { useMobileMenu } from "../../context/MobileMenuContext";

import BlurredBackground from "./BlurredBackground";

import Button from "../../components/Buttons/Button";

const ProfilePictureModal = ({ setShowProfilePictureSelectModal }) => {
  const { customImg, availableImgs, availableBgColors } =
    useCustomUserProfile();
  const [customUserImg, setCustomUserImg] = customImg;

  const [prevUserImg, setPrevUserImg] = React.useState(customUserImg.img);
  const [prevUserBg, setPrevUserBg] = React.useState(customUserImg.bg);

  console.log(customUserImg, prevUserImg);
  const [mobileMenu] = useMobileMenu();

  const handleSetCustomUserImgClick = (availableImg) => {
    if (customUserImg.img === availableImg) {
      setCustomUserImg((prev) => {
        return { img: "", bg: prev.bg };
      });
    } else {
      setCustomUserImg((prev) => {
        return { bg: prev.bg, img: availableImg };
      });
    }
  };

  const handleSetCustomUserBgClick = (availableBgColor) => {
    if (customUserImg.bg === availableBgColor) {
      setCustomUserImg((prev) => {
        return { img: prev.img, bg: "" };
      });
    } else {
      setCustomUserImg((prev) => {
        return { img: prev.img, bg: availableBgColor };
      });
    }
  };

  const discardChanges = () => {
    setCustomUserImg((prev) => {
      return { bg: prevUserBg, img: prevUserImg };
    });
    setShowProfilePictureSelectModal(false);
  };
  const confirmChanges = () => {
    setShowProfilePictureSelectModal(false);
  };

  React.useEffect(() => {
    if (customUserImg.img) {
      setPrevUserImg(customUserImg.img);
    }
    if (customUserImg.bg) {
      setPrevUserBg(customUserImg.bg);
    }
  }, []);

  return (
    <BlurredBackground>
      <div className="absolute  bg-white text-darkPrimary rounded-md p-6 flex flex-col justify-center max-w-[90%] z-[9000]">
        <h6 className="pb-4 text-gray-600 text-xs mx-auto">
          Choose profile picture
        </h6>
        <div className="flex flex-wrap mb-6">
          {availableImgs.map((availableImg) => (
            <button
              key={availableImg}
              onClick={() => {
                handleSetCustomUserImgClick(availableImg);
              }}
              className={`${
                customUserImg === availableImg
                  ? "border-2 border-red-500"
                  : null
              } mx-2`}
            >
              <img
                src={availableImg}
                className={`h-8 w-8 rounded-full ${
                  customUserImg.img === availableImg
                    ? "border-2 border-darkPrimary"
                    : null
                }`}
              />
            </button>
          ))}
        </div>

        <h6 className="py-4 text-gray-600 text-xs mx-auto">
          Choose background color
        </h6>
        <div className="flex flex-wrap mb-6">
          {availableBgColors.map((availableBgColor) => (
            <button
              key={availableBgColor}
              onClick={() => {
                handleSetCustomUserBgClick(availableBgColor);
              }}
              className={`${availableBgColor}  h-8 w-8 rounded-full  mx-2 ${
                customUserImg.bg === availableBgColor
                  ? "border-2 border-darkPrimary"
                  : null
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            displayText="DISCARD"
            type="negative"
            onClick={discardChanges}
          />

          <Button displayText="SAVE" type="positive" onClick={confirmChanges} />
        </div>
      </div>
    </BlurredBackground>
  );
};

export default ProfilePictureModal;
