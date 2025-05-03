import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { TbPokeball } from "react-icons/tb";
import background from "../images/bg-nologo.png";
import googleIcon from "../images/icons-chrome.svg";
import "../styles/login.css";

function Login() {
  const [error, setError] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  //Función para iniciar sesión con google:
  async function handleGoogleLogin(e) {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/pokedex");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-container">
      <img src={background} className="background-img" alt="" />
      <div className="content">
        <img src={background} className="background-img bradius-30" alt="" />
        <div className="pokeballContainer">
          <div className="pontBox">
            <div className="pont"></div>
            <div className="pont"></div>
          </div>
          <div className="pokeballCard">
            <div className="hline"></div>
            <TbPokeball className="pokeballLogin" />
            <div className="vline"></div>
            <div className="point"></div>
          </div>
          <div className="triangle"></div>
          <div className="triangle"></div>
        </div>

        <h2>Login</h2>
        <form className="formLogin">
          <button className="login-google-button" onClick={handleGoogleLogin}>
            <img
              src={googleIcon}
              alt="Google Chrome Icon"
              className="google-icon"
            />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
