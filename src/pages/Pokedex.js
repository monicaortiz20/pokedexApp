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
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seeResult, setSeeResult] = useState(false);

  function EvolutionImageCard({ name, circleType, idx }) {
    const [sprite, setSprite] = React.useState(null);

    React.useEffect(() => {
      async function fetchSprite() {
        try {
          const resp = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
          );
          const data = await resp.json();
          setSprite(
            data.sprites?.other.home.front_default ||
              data.sprites?.front_default
          );
        } catch {
          setSprite(null);
        }
      }
      fetchSprite();
    }, [name]);

    // Tamaño de imagen según tipo y posición
    let imgSize = 80;
    if (circleType === "next") imgSize = 150 + idx * 20;

    return (
      <div className="evolution-img-wrapper">
        <div
          className="evolution-circle-bg"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "1px solid darkred",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        ></div>
        {sprite ? (
          <img
            src={sprite}
            alt={name}
            style={{
              width: imgSize,
              height: imgSize,
              objectFit: "cover",
              position: "relative",
              zIndex: 2,
            }}
          />
        ) : (
          <span>No image</span>
        )}
      </div>
    );
  }

  // Animaciones para los divs hijos (vertical)
  const divsAnimationTop = useSpring({
    from: { height: "43%" },
    to: { height: seeResult ? "10%" : "43%" },
    config: { tension: 280, friction: 60 },
  });

  const divsAnimationBottom = useSpring({
    from: { height: "57%" },
    to: { height: seeResult ? "20%" : "57%" },
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

  function getEvolutions(chain, list = []) {
    if (!chain) return list;
    list.push(chain.species.name);
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evo) => getEvolutions(evo, list));
    }
    return list;
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchPokemon.trim() !== "") {
      try {
        setLoading(true);
        setEvolutions([]);
        setError(null);
        const resp = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`
        );
        if (!resp.ok) {
          throw new Error("Pokémon not found");
        }

        const data = await resp.json();
        setPokemon(data);

        //Obtenemos especie:
        const speciesResp = await fetch(data.species.url);
        if (!speciesResp.ok) {
          throw new Error("Species not found");
        }
        const speciesData = await speciesResp.json();

        //Obtenermos evoluciones si las hubiera:
        const evolutionResp = await fetch(speciesData.evolution_chain.url);
        if (!evolutionResp.ok) {
          throw new Error("Evolutions not found");
        }
        const evolutionData = await evolutionResp.json();

        //lista de evoluciones en orden
        const evolutionList = getEvolutions(evolutionData.chain);
        //Buscamos la posición del Pokemon actual:
        const currentIndex = evolutionList.findIndex(
          (name) => name.toLowerCase() === data.name.toLowerCase()
        );

        //Evolución previa y posterior (todas)
        const prevEvolutions =
          currentIndex > 0 ? evolutionList.slice(0, currentIndex) : [];
        const nextEvolutions =
          currentIndex < evolutionList.length - 1
            ? evolutionList.slice(currentIndex + 1)
            : [];
        console.log(nextEvolutions, " nextEvolution");
        console.log("Pokémon previos:", prevEvolutions);

        setEvolutions({
          prevEvolutions,
          current: data.name,
          nextEvolutions,
        });
        setSeeResult(true);
      } catch (err) {
        setError(err.message);
        setPokemon(null);
        setEvolutions([]);
        setSeeResult(false);
      } finally {
        setLoading(false);
      }
    } else {
      setSeeResult(false);
      setEvolutions([]);
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
            <>
              <PokemonCard
                name={pokemon.name}
                sprite={pokemon.sprites?.other.home.front_default}
                details={pokemon}
              />
              <article className="evolutionsContainer">
                <div className="evolution-images">
                  {/* Previas */}
                  {evolutions.prevEvolutions?.length > 0 && (
                    <div className="evolution-row">
                      {evolutions.prevEvolutions.map((name, idx) => (
                        <div
                          className="evolution-circle prev-evolution"
                          key={name}
                        >
                          <EvolutionImageCard
                            name={name}
                            circleType="prev"
                            idx={idx}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Posteriores */}
                  {evolutions.nextEvolutions?.length > 0 && (
                    <div className="evolution-row">
                      {evolutions.nextEvolutions.map((name, idx) => (
                        <div
                          className={`evolution-circle next-evolution next-evolution-${idx}`}
                          key={name}
                        >
                          <EvolutionImageCard
                            name={name}
                            circleType="next"
                            idx={idx}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </>
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
