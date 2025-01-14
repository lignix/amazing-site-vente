import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useUser(); // Assurez-vous que `useUser` renvoie l'information sur `isAdmin`

  // Rediriger vers la page de login si non connecté ou non admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
