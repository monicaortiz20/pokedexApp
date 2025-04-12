import React, { useState } from "react";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import Search from "../components/Search";
import "../styles/pokedex.css";

function Pokedex() {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSearch(e) {
    const request = e.target.value;
    setSearchPokemon(request);
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchPokemon.trim() !== "") {
      try {
        setLoading(true);
        setError(null);
        const resp = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`
        );
        if (!resp.ok) {
          throw new Error("Pokémon not found");
        }
        const data = await resp.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="mainContentPokedex">
      <Header />
      <div className="bgSearched">
        <Search
          handleSearch={handleSearch}
          handleSearchSubmit={handleSearchSubmit}
        />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {pokemon && (
          <PokemonCard
            name={pokemon.name}
            sprite={pokemon.sprites?.other.home.front_default}
            details={pokemon} // Pasamos todos los detalles del Pokémon
          />
        )}
      </div>
    </div>
  );
}

export default Pokedex;
