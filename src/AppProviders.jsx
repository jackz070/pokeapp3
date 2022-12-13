import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0ProviderWithHistory } from "./auth0-provider-with-history";
import { BrowserRouter } from "react-router-dom";
import { CaughtPokemonProvider } from "./context/CaughtPokemonContext";
import { PokedexSettingsProvider } from "./context/PokedexSettingsContext";
import { MobileMenuContextProvider } from "./context/MobileMenuContext";
import { CustomUserProfileContextProvider } from "./context/CustomUserProfileContext";

import history from "./utils/history";

const AppProviders = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter history={history}>
        <CaughtPokemonProvider>
          <PokedexSettingsProvider>
            <MobileMenuContextProvider>
              <CustomUserProfileContextProvider>
                <Auth0ProviderWithHistory>{children}</Auth0ProviderWithHistory>
              </CustomUserProfileContextProvider>
            </MobileMenuContextProvider>
          </PokedexSettingsProvider>
        </CaughtPokemonProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
