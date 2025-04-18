import React from "react";
import "../styles/search.css";
import searchBall from "../images/searchBall.png";

function Search({ handleSearch, handleSearchSubmit }) {
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search Pokémon by name"
        onChange={handleSearch}
      />
      <button type="submit">
        <img src={searchBall} />
      </button>
    </form>
  );
}

export default Search;
