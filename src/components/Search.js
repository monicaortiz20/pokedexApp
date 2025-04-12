import React from "react";

function Search({ handleSearch, handleSearchSubmit }) {
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search Pokémon by name"
        onChange={handleSearch} // handleSearch debe ser una función
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
