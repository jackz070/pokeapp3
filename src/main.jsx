import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";

import AppProviders from "./AppProviders";

import App from "./App";
import PokemonPage from "./pages/PokemonPage";
import PokemonOfTheDay from "./pages/PokemonOfTheDay";
import CallbackPage from "./pages/CallbackPage";
import MyPokemon from "./components/CaughtPokemon/MyPokemon";
import Pokedex from "./components/Pokedex/Pokedex";
import Profile from "./pages/profilePage/Profile";
import LoggedInRoute from "./components/LoggedInRoute";

import "./index.css";

document.fonts.ready.then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProviders>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Pokedex />} />
          <Route path="/pokemon/:pokemonNumber" element={<PokemonPage />} />
          <Route path="/my-pokemon" element={<MyPokemon />} />
          <Route path="/potd" element={<PokemonOfTheDay />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route
            path="/profile"
            element={<LoggedInRoute element={Profile} />}
          />
        </Route>
      </Routes>
    </AppProviders>
  );
});
