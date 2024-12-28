import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import du hook useUser

const PrivateRoute: React.FC = () => {
  const { login } = useUser();

  // Si l'utilisateur n'est pas connecté, redirige vers la page de login
  if (!login) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
