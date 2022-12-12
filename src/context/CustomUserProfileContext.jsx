import React from "react";

const CustomUserProfileContext = React.createContext();
CustomUserProfileContext.displayName = "CustomUserProfileContext";

const CustomUserProfileContextProvider = (props) => {
  const [customUserImg, setCustomUserImg] = React.useState({ img: "", bg: "" });

  const availableProfilePictures = [
    "/Images/userImg_Eevee.png",
    "/Images/userImg_Pikachu.png",
    "/Images/userImg_Bulbasaur.png",
    "/Images/userImg_Charmander.png",
    "/Images/userImg_Squirtle.png",
    "/Images/userImg_Psyduck.png",
    "/Images/userImg_Snorlax.png",
    "/Images/userImg_Meowth.png",
  ];

  const availableProfilePictureBackgrounds = [
    "bg-[#9B5DE5]",
    "bg-[#C65CCD]",
    "bg-[#F15BB5]",
    "bg-[#F8A07B]",
    "bg-[#FEE440]",
    "bg-[#BFDA6F]",
    "bg-[#7FD09D]",
    "bg-[#00BBF9]",
  ];

  const value = {
    customImg: [customUserImg, setCustomUserImg],
    availableImgs: availableProfilePictures, availableBgColors: availableProfilePictureBackgrounds
  };

  return <CustomUserProfileContext.Provider value={value} {...props} />;
};

function useCustomUserProfile() {
  const context = React.useContext(CustomUserProfileContext);
  if (context === undefined) {
    throw new Error(
      `useCustomUserProfile must be used within a CustomUserProfileContextProvider`
    );
  }
  return context;
}

export { CustomUserProfileContextProvider, useCustomUserProfile };
