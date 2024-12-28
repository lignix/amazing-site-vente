import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const HomePage: React.FC = () => {
  const { login, setLogin } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Effacer le login du contexte
    setLogin(null);
    // Supprimer le login du localStorage
    localStorage.removeItem("login");
    // Rediriger l'utilisateur vers la page de login
    navigate("/login");
  };

  return (
    <div>
      <h1>Accueil</h1>
      <p>Bienvenue, {login}!</p>
      <p>On va ajouter les autres fonctionnalités plus tard tkt</p>

      {login && <button onClick={handleLogout}>Se déconnecter</button>}
    </div>
  );
};

export default HomePage;
