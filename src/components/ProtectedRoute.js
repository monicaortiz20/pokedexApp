import React from "react";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
//import "../styles/Login.css";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Cargando...</p>; //muestra el mensaje mientras se verifica el estado del usuario
  }

  //si NO hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
