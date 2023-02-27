import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useCaughtPokemon } from "../../context/CaughtPokemonContext";
import TabsComponent from "../../components/TabsComponent/TabsComponent";

import { useLocation } from "react-router-dom";

import ProfileStats from "./ProfileStats";
import { ProfileSettings } from "./ProfileSettings";
import { useCustomUserProfile } from "../../context/CustomUserProfileContext";
import { useMobileMenu } from "../../context/MobileMenuContext";
import ProfilePictureModal from "./ProfilePictureModal";

const Profile = () => {
  const [showProfilePictureSelectModal, setShowProfilePictureSelectModal] = React.useState(false);

  const { user } = useAuth0();
  const { caughtPokemon } = useCaughtPokemon();
  const { customImg } = useCustomUserProfile();
  const [customUserImg, setCustomUserImg] = customImg;

  const [mobileMenu] = useMobileMenu();

  const { hash } = useLocation();

  // TODO Stats about caught pokemon, maybe a type graph, number, fav type, user since, ===> backend that stores user id (email?), caught pokemon, date of first signin

  React.useEffect(() => {
    if (customUserImg?.img?.length === 0 && user?.picture) {
      console.log(user.picture);
      const newCustomUserImg = { img: user.picture, bg: customUserImg.bg };
      setCustomUserImg(newCustomUserImg);
    }
  }, []);

  return (
    <div className="pt-24 flex flex-col items-center relative dark:bg-darkPrimary bg-white dark:text-white">
      {showProfilePictureSelectModal && (
        <ProfilePictureModal setShowProfilePictureSelectModal={setShowProfilePictureSelectModal} />
      )}
      <div className="relative rounded-full overflow-hidden h-28 w-28 border-2 border-white">
        <img
          src={customUserImg?.img ? customUserImg?.img : user?.picture}
          className={`peer h-full w-full ${
            customUserImg?.bg?.length > 0 ? customUserImg.bg : null
          }`}
        />
        <button
          onClick={() => {
            setShowProfilePictureSelectModal((prev) => !prev);
            // setCustomUserImg((prev) => {
            //   return { ...prev, img: "/Images/userImg_Eevee.png" };
            // });
          }}
          className={`absolute bg-white text-darkPrimary ${
            mobileMenu ? "opacity-100" : "opacity-0"
          } peer-hover:opacity-100 hover:opacity-100 w-full h-[30%] bottom-0 left-0 pb-2  text-[8px]`}>
          Change Profile Picture
        </button>
      </div>
      <div className="text-2xl font-bold pt-2">{user?.given_name}</div>
      <div className="text-xs text-gray-500">Joined today</div>

      {user && (
        <TabsComponent
          tabs={[
            {
              label: "Stats",
              content: <ProfileStats caughtPokemon={caughtPokemon} />
            },
            {
              label: "Settings",
              content: <ProfileSettings user={user} />
            }
          ]}
          defaultIdx={hash === "#settings" ? 1 : 0}
        />
      )}
    </div>
  );
};

export default Profile;
