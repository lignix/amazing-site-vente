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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Bienvenue à l'accueil
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          Bienvenue,{" "}
          <span className="font-semibold text-blue-600">{login}</span>!
        </p>
        <p className="text-lg text-gray-600 mb-6">
          On va ajouter les autres fonctionnalités plus tard, t'inquiète !
        </p>

        {login && (
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition"
          >
            Se déconnecter
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
