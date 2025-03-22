import React, { useState, useEffect } from "react";
import Logout from "../components/Logout";
import Header from "../components/Header";

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPokemonList();
  }, []);

  async function getPokemonList() {
    try {
      setLoading(true);
      const resp = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const data = await resp.json();
      setPokemon(data.results);
      console.log(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <h1>Listado de pokemonList</h1>;
      <Logout />
    </div>
  );
}

export default PokemonList;
