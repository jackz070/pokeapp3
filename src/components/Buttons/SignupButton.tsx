import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      screen_hint: "signup",
      appState: {
        returnTo: "/profile"
      }
    });
  };

  return (
    <button
      className="dark:text-white text-darkPrimary px-8 py-2 tracking-wider outline-none rounded-sm hover:brightness-105 active:scale-[.98] active:shadow-sm"
      onClick={handleSignUp}>
      Sign Up
    </button>
  );
};
