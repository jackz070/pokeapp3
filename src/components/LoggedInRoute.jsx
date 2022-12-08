import { Outlet, Navigate, Route } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
const LoggedInRoute = ({ element }) => {
  const Component = withAuthenticationRequired(element, {
    onRedirecting: () => <div className="page-layout">Loading...</div>,
  });

  return <Component />;
};

export default LoggedInRoute;
