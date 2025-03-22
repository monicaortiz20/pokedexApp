import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { IoMdStar } from "react-icons/io";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    //revisa los cambios en la autenticación de usuario
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    //Limpia la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  //si no hay usuario logado, muestra este mensaje
  if (!user) {
    return <p>No estás logado. Por favor inicia sesión.</p>;
  }
  return (
    <div>
      <h1>Perfil</h1>
      <img src={user.photo} alt="Foto de perfil" />
      <p>nombre: {user.name}</p>
      <p>Ciudad: Johto</p>
      <p>
        Estrenador: <IoMdStar /> <IoMdStar /> <IoMdStar />
      </p>
    </div>
  );
}

export default Profile;
