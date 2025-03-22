import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PokemonList from "./pages/PokemonList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* ruta protegida */}
        <Route
          path="/pokemonList"
          element={
            <ProtectedRoute>
              <PokemonList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
