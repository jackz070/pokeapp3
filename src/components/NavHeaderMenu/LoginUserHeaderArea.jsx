import React from "react";

import LoginButton from "../Buttons/LoginButton";
import { LogoutButton } from "../Buttons/LogoutButton";

import { SignupButton } from "../Buttons/SignupButton";

import { useAuth0 } from "@auth0/auth0-react";
import { useMobileMenu } from "../../context/MobileMenuContext";

const LoginUserHeaderArea = () => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const { user } = useAuth0();
  const [mobileMenu] = useMobileMenu();

  return (
    <div>
      {user ? (
        <div className="relative w-fit">
          <button
            className=" flex items-center  bg-white  text-darkPrimary  rounded-md px-2 py-1 hover:brightness-95 active:brightness-90"
            onClick={() => setShowProfileMenu((prev) => !prev)}
          >
            <div className=" ml-2 text-md">{user.given_name}</div>
            <img src={user.picture} className="rounded-full h-8 w-8 mx-2" />
            <div className="text-xs">▼</div>
          </button>
          {showProfileMenu ||
            (mobileMenu && (
              <div className="mt-2 rounded-md h-fit w-fit bg-white absolute text-black">
                <ul className="py-2 px-4 flex flex-col items-center gap-2">
                  <li className="pointer">Settings</li>
                  <li>
                    <LogoutButton />
                  </li>
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <SignupButton displayText={"Signup"} className="text-2xl" />
          <LoginButton
            displayText={"Login"}
            type={"primary"}
            className="text-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default LoginUserHeaderArea;
