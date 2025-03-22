import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//import "../styles/Login.css";

function Logout() {
  const navigate = useNavigate();

  //Función para cerrar sesión:
  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("Error al cerrar sesión: " + error.message);
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Logout;
