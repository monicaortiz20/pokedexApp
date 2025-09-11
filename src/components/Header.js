import React from "react";
import "../styles/header.css";
import { FaUserLarge } from "react-icons/fa6";
import { TbPokeball } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import pokeballHeader from "../images/pokeball-header.png";

function Header() {
  return (
    <div>
      <header>
        <div className="px-3 py-2 bg-dark text-white">
          <div className="d-flex align-items-center justify-content-between">
            <a href="/pokedex" className="text-decoration-none col-3">
              <img src={pokeballHeader} className="w-50" id="pokeballHeader" />
            </a>
            <div>
              <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small list">
                <li>
                  <a href="#" className="nav-link text-secondary pt-2 p-0">
                    <FaHeart />
                  </a>
                </li>
                <li>
                  <a href="/profile" className="nav-link text-white">
                    <FaUserLarge />
                    <TbPokeball className="tbpokeball" />
                    {/* <TbPokeballOff /> Para eliminar pokemon del listado del cinturón */}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
