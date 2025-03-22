import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//import "../styles/Login.css";

function Login() {
  const [error, setError] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  //Función para iniciar sesión con google:
  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/pokemonList");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <button onClick={handleGoogleLogin}>Iniciar sesión con google</button>
      {error && <p> error</p>}
    </div>
  );
}

export default Login;
