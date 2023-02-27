import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

const LoggedInRoute = ({ element }: { element: ComponentType<object> }) => {
  const Component = withAuthenticationRequired(element, {
    onRedirecting: () => <div className="page-layout">Loading...</div>
  });

  return <Component />;
};

export default LoggedInRoute;
