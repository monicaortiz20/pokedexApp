import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import "../styles/Login.css";

function Login() {
  const [error, setError] = useState("");
  const googleProvider = GoogleAuthProvider();

  //Función para iniciar sesión con google:
  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Inicio con Google correcto.");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <button onClick={handleGoogleLogin}>Iniciar sesión con google</button>
      {/* {error && <p></p>} */}
    </div>
  );
}

export default Login;
