import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import Header from "./components/NavHeaderMenu/Header";
import Nav from "./components/NavHeaderMenu/Nav";
import { Outlet } from "react-router-dom";

import { useMobileMenu } from "./context/MobileMenuContext";


function App() {
  const [sideNavIsOpen, setSideNavIsOpen] = React.useState(false);

  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div role="alert">
        There was an error:
        <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }

  const [mobileMenu] = useMobileMenu();



  return (
    <div className={`relative `}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        {!mobileMenu && (
          <Nav
            sideNavIsOpen={sideNavIsOpen}
            setSideNavIsOpen={setSideNavIsOpen}
          />
        )}

        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default App;
