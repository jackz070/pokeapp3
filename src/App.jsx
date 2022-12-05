import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import Header from "./components/Header";
import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

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

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <Nav
          sideNavIsOpen={sideNavIsOpen}
          setSideNavIsOpen={setSideNavIsOpen}
        />

        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default App;
