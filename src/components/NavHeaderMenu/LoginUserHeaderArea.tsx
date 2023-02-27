import React from "react";

import LoginButton from "../Buttons/LoginButton";
import { LogoutButton } from "../Buttons/LogoutButton";

import { Link } from "react-router-dom";

import { SignupButton } from "../Buttons/SignupButton";

import { useAuth0 } from "@auth0/auth0-react";
import { useMobileMenu } from "../../context/MobileMenuContext";
import { useCustomUserProfile } from "../../context/CustomUserProfileContext";

const LoginUserHeaderArea = () => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const { user } = useAuth0();
  const [mobileMenu] = useMobileMenu();

  const { customImg } = useCustomUserProfile();
  const [customUserImg] = customImg;

  return (
    <div>
      {user ? (
        <div className="relative w-fit">
          <button
            className=" flex items-center  dark:bg-white  dark:text-darkPrimary bg-trueWhite rounded-md px-2 py-1 dark:hover:brightness-95 dark:active:brightness-90 z-[3000]"
            onClick={() => setShowProfileMenu((prev) => !prev)}>
            <div className=" ml-2 text-md">{user.given_name}</div>
            <img
              src={customUserImg?.img ? customUserImg?.img : user?.picture}
              className={`rounded-full h-8 w-8 mx-2 ${
                customUserImg?.bg?.length > 0 ? customUserImg.bg : null
              }`}
            />
            <div className="text-xs">▼</div>
          </button>
          {(showProfileMenu || mobileMenu) && (
            <div className="mt-2 rounded-md h-fit w-fit dark:bg-white bg-trueWhite absolute text-black right-0">
              <ul className="py-2 px-4 flex flex-col items-center gap-2">
                <li className="pointer">
                  <Link
                    to="/profile#settings"
                    className="dark:hover:bg-gray-200 hover:bg-gray-100 px-2 py-1 rounded-md">
                    Settings
                  </Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <SignupButton />
          <LoginButton displayText={"Login"} type={"primary"} />
        </div>
      )}
    </div>
  );
};

export default LoginUserHeaderArea;
