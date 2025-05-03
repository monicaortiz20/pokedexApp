import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/pokemonCard.css";

function PokemonCard({ name, sprite, details }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div onClick={handleCardClick} className="pokeCard">
        {sprite && <img src={sprite} alt={name} />}
        <h3>{name}</h3>
      </div>

      {showDetails && (
        <div className="pokeDetailsCard">
          <button onClick={handleCloseDetails} className="btnCard">
            Close
          </button>
          <Slider {...sliderSettings}>
            {/* Primera tarjeta: Base Experience y Abilities */}
            <div className="carouselCard">
              <h2>{details.name}</h2>
              <p>
                <strong>Base Experience:</strong> {details.base_experience}
              </p>
              <p>
                <strong>Abilities:</strong>{" "}
                {details.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </p>
            </div>

            {/* Segunda tarjeta: Types */}
            <div className="carouselCard">
              <h2>{details.name}</h2>
              <p>
                <strong>Types:</strong>{" "}
                {details.types.map((type) => type.type.name).join(", ")}
              </p>
            </div>

            {/* Tercera tarjeta: Moves */}
            <div className="carouselCard">
              <h2>{details.name}</h2>
              <p>
                <strong>Moves:</strong>{" "}
                {details.moves
                  .slice(0, 5)
                  .map((move) => move.move.name)
                  .join(", ")}{" "}
                (showing first 5)
              </p>
            </div>
          </Slider>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
