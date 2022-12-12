import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0ProviderWithHistory } from "./auth0-provider-with-history";

import App from "./App";

import PokemonPage from "./pages/PokemonPage";
import PokemonOfTheDay from "./pages/PokemonOfTheDay";
import CallbackPage from "./pages/CallbackPage";
import MyPokemon from "./components/CaughtPokemon/MyPokemon";
import Pokedex from "./components/Pokedex/Pokedex";
import Profile from "./pages/profilePage/Profile";
import LoggedInRoute from "./components/LoggedInRoute";

import { CaughtPokemonProvider } from "./context/CaughtPokemonContext";
import { PokedexSettingsProvider } from "./context/PokedexSettingsContext";
import { MobileMenuContextProvider } from "./context/MobileMenuContext";
import { CustomUserProfileContextProvider } from "./context/CustomUserProfileContext";
import { DarkModeContextProvider } from "./context/DarkModeContext";

import history from "./utils/history";

import "./index.css";

const queryClient = new QueryClient();

document.fonts.ready.then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter history={history}>
        <CaughtPokemonProvider>
          <PokedexSettingsProvider>
            <MobileMenuContextProvider>
              <CustomUserProfileContextProvider>
                <DarkModeContextProvider>
                  <Auth0ProviderWithHistory>
                    <Routes>
                      <Route element={<App />}>
                        <Route index element={<Pokedex />} />
                        <Route
                          path="/pokemon/:pokemonNumber"
                          element={<PokemonPage />}
                        />
                        <Route path="/my-pokemon" element={<MyPokemon />} />
                        <Route path="/potd" element={<PokemonOfTheDay />} />
                        <Route path="/callback" element={<CallbackPage />} />
                        <Route
                          path="/profile"
                          element={<LoggedInRoute element={Profile} />}
                        />
                        {/* <Route element={<LoggedInRoute />}>
                    <Route path="/profile" element={<Profile />} />
                  </Route> */}
                      </Route>
                    </Routes>
                  </Auth0ProviderWithHistory>
                </DarkModeContextProvider>
              </CustomUserProfileContextProvider>
            </MobileMenuContextProvider>
          </PokedexSettingsProvider>
        </CaughtPokemonProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
});
