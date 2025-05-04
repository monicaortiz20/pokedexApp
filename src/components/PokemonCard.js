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

      <div className="containerData">
        <input type="radio" name="slider" id="item-1" defaultChecked />
        <input type="radio" name="slider" id="item-2" />
        <input type="radio" name="slider" id="item-3" />
        <div className="cards">
          <label className="cardData" htmlFor="item-1" id="song-1">
            <p>
              <strong>Base Experience:</strong>
            </p>
            <span>{details.base_experience}</span>
          </label>
          <label className="cardData" htmlFor="item-2" id="song-2">
            <p>
              <strong>Abilities:</strong>{" "}
            </p>
            <span>
              {details.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </span>
          </label>
          <label className="cardData" htmlFor="item-3" id="song-3">
            <p>
              <strong>Moves:</strong>{" "}
            </p>
            <span>
              {details.moves
                .slice(0, 5)
                .map((move) => move.move.name)
                .join(", ")}{" "}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
