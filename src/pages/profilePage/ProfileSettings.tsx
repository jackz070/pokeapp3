import React from "react";
import { LogoutButton } from "../../components/Buttons/LogoutButton";
import HoverPopup from "../../components/HoverPopup";
import { User } from "@auth0/auth0-react";

export const ProfileSettings = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col items-center mt-4 ">
      <div className="flex flex-col items-center ">
        <div className="flex items-center justify-between w-72">
          <div className="font-bold">Email</div> <div>{user.email}</div>
        </div>
        <div className="flex items-center justify-between w-72 px-4 py-2 dark:bg-gray-700 bg-trueWhite rounded-md mt-1">
          <button className="text-xs px-2 py-1 dark:bg-green-700 bg-green-400 dark:text-darkPrimary text-trueWhite rounded-md hover:brightness-110">
            Confirm email
          </button>
          <button className="text-xs px-2 py-1 dark:bg-yellow-600 bg-yellow-400 dark:text-darkPrimary text-trueWhite rounded-md hover:brightness-110">
            Update email
          </button>
        </div>
        <div className="flex items-center justify-between w-72 mt-1 ">
          <label className=" flex items-center text-xs relative">
            <input
              type="checkbox"
              className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
            />
            <span className="w-8 h-5 flex items-center flex-shrink-0 m-2 p-[2px] bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 group-hover:after:translate-x-1"></span>
            Let people find you through this address.
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between w-72 mt-2">
        <div className="font-bold">Language</div>
        <select className="text-black px-2 py-1 text-sm">
          <option>English</option>
          <option>German</option>
          <option>Spanish</option>
        </select>
      </div>
      <div className="flex items-center justify-center w-72 mt-8 ">
        <a>Need help? Contact us!</a>
      </div>
      <a href="/" className="flex items-center justify-center w-72 mt-4 ">
        Privacy policy
        <HoverPopup displayText={"?"} popupContent={"There is no privacy policy here"} />
      </a>
      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
};
