import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1>Erreur</h1>
      <p>Page non trouvée</p>
      <button onClick={handleGoHome}>Retour à l'accueil</button>
    </div>
  );
};

export default NotFoundPage;
