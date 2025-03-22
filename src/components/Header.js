import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import { TbPokeball } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";

//import "../styles/header.css";

function Header() {
  return (
    <div>
      <header>
        <div class="px-3 py-2 bg-dark text-white">
          <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a
                href="/"
                class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
              >
                <svg
                  class="bi me-2"
                  width="40"
                  height="32"
                  role="img"
                  aria-label="Bootstrap"
                >
                  {/* <use xlink:href="#bootstrap"></use> */}
                </svg>
              </a>

              <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                  <a href="#" class="nav-link text-secondary">
                    <FaHeart />
                    Favorites
                  </a>
                </li>
                <li>
                  <a href="/profile" class="nav-link text-white">
                    Profile
                    <FaUserLarge />
                    <TbPokeball />
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
