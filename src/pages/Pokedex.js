import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import Search from "../components/Search";
import "../styles/pokedex.css";
import pokeballIcon from "../images/imgpokedex.svg";

function Pokedex() {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seeResult, setSeeResult] = useState(false);

  // Animaciones para los divs hijos (vertical)
  const divsAnimationTop = useSpring({
    from: { height: "43%" },
    to: { height: seeResult ? "10%" : "43%" },
    config: { tension: 280, friction: 60 },
  });

  const divsAnimationBottom = useSpring({
    from: { height: "57%" },
    to: { height: seeResult ? "25%" : "57%" },
    config: { tension: 280, friction: 60 },
  });

  // Animaciones para el resultado de búsqueda (PokemonCard)
  const searchResultAnimation = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(100%) scale(0.8)",
    },
    to: {
      opacity: seeResult ? 1 : 0,
      transform: seeResult
        ? "translate(-50%, -50%) scale(1)"
        : "translate(-50%, -50%) scale(0.8)",
    },
    config: { tension: 280, friction: 60 },
  });

  // Animación para el buscador
  const searchAnimation = useSpring({
    from: {
      bottom: "46%",
      right: "0%",
      transform: "scale(1)",
    },
    to: {
      bottom: seeResult ? "0%" : "46%",
      right: seeResult ? "0%" : "0%",
      transform: seeResult ? "scale(0.5)" : "scale(1)",
    },
    config: { tension: 280, friction: 60 },
  });

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
        setSeeResult(true);
      } catch (err) {
        setError(err.message);
        setPokemon(null);
        setSeeResult(false);
      } finally {
        setLoading(false);
      }
    } else {
      setSeeResult(false);
    }
  }

  return (
    <div className="mainContentPokedex">
      <Header />
      <div className="bgSearched">
        <div className="pokedexContainer">
          <animated.div style={{ ...divsAnimationTop }} className="cardTop">
            {!seeResult && ( // Oculta el icono cuando seeResult es true
              <div className="iconPokemonDiv">
                <img src={pokeballIcon} alt="Pokeball Icon" />
              </div>
            )}
          </animated.div>
          <animated.div
            style={{ ...divsAnimationBottom }}
            className="cardBottom"
          ></animated.div>
        </div>
        <animated.div
          style={{
            ...searchResultAnimation,
          }}
          className="pokemonCardContainer"
        >
          {pokemon && (
            <PokemonCard
              name={pokemon.name}
              sprite={pokemon.sprites?.other.home.front_default}
              details={pokemon}
            />
          )}
        </animated.div>
        <animated.div
          style={{ ...searchAnimation }}
          className={`containerSearchAnimation${
            seeResult ? " search-active" : ""
          }`}
        >
          <Search
            handleSearch={handleSearch}
            handleSearchSubmit={handleSearchSubmit}
            soloIcono={seeResult} // Pasa la prop para mostrar solo el icono
          />
        </animated.div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Pokedex;
