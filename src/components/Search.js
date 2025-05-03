import React from "react";
import "../styles/search.css";
import searchBall from "../images/searchIcon.png";

function Search({ handleSearch, handleSearchSubmit }) {
  return (
    <form className="searchForm" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search Pokemon by name"
        onChange={handleSearch}
      />
      <button type="submit">
        <img src={searchBall} />
      </button>
    </form>
  );
}

export default Search;
