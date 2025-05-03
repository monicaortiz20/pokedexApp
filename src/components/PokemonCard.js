import React from "react";
import "../styles/pokemonCard.css";
import bgCard from "../images/bg-nologo.png";

function PokemonCard({ name, sprite, details }) {
  return (
    <div className="pokeCardContainer">
      <div className="pokeCard">
        {sprite && <img src={sprite} alt={name} />}
        <div>
          <h3>{name}</h3>
          <p>{details.types.map((type) => type.type.name).join(", ")}</p>
        </div>
      </div>

      <div className="container">
        <input type="radio" name="slider" id="item-1" defaultChecked />
        <input type="radio" name="slider" id="item-2" />
        <input type="radio" name="slider" id="item-3" />
        <div className="cards">
          <label className="card" htmlFor="item-1" id="song-1">
            <p>
              <strong>Base Experience:</strong> {details.base_experience}
            </p>
          </label>
          <label className="card" htmlFor="item-2" id="song-2">
            <p>
              <strong>Abilities:</strong>{" "}
              {details.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
          </label>
          <label className="card" htmlFor="item-3" id="song-3">
            <p>
              <strong>Moves:</strong>{" "}
              {details.moves
                .slice(0, 5)
                .map((move) => move.move.name)
                .join(", ")}{" "}
              (showing first 5)
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
