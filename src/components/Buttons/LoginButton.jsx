import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({ displayText, type }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="dark:bg-white bg-darkPrimary dark:text-[#191921] text-white px-8 py-2   tracking-wider outline-none rounded-sm hover:brightness-105 active:scale-[.98] active:shadow-sm"
    >
      {displayText}
    </button>
  );
};

export default LoginButton;
