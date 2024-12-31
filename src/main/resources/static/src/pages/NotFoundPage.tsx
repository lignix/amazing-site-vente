import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Erreur 404</h1>
        <p className="text-xl text-gray-700 mb-6">Page non trouvée</p>
        <button
          onClick={handleGoHome}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
