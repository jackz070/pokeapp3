import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import React from "react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    console.log(window.location.origin);
    try {
      logout({
        returnTo: window.location.origin,
      });
    } catch (error) {
      toast(`Error: ${error}`);
    }
  };

  return (
    <button
      className="px-6 py-1  text-red-500 tracking-wider outline-none rounded-md  text-xs hover:brightness-110 active:scale-[.98] active:shadow-sm border-2 border-red-500 font-bold"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};
