import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = () => {
  const { user, loginWithRedirect } = useAuth0();
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={loginWithRedirect()} />;
  }
};

export default PrivateRoute;
