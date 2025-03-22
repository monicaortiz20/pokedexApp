import React, { useState } from "react";

function PokemonCard({ name, sprite, details }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div>
      <div onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <h3>{name}</h3>
        {sprite && <img src={sprite} alt={name} />}
      </div>

      {showDetails && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "opacity 0.5s ease-in-out",
            zIndex: 1000,
          }}
        >
          <button
            onClick={handleCloseDetails}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <h2>{details.name}</h2>
          <img src={details.sprites.front_default} alt={details.name} />
          <p>
            <strong>Base Experience:</strong> {details.base_experience}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {details.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
          <p>
            <strong>Types:</strong>{" "}
            {details.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>
            <strong>Moves:</strong>{" "}
            {details.moves
              .slice(0, 5)
              .map((move) => move.move.name)
              .join(", ")}{" "}
            (showing first 5)
          </p>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
