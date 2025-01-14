/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  login: string | null;
  isAdmin: boolean; // Ajout du champ isAdmin
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Vérifier l'utilisateur dans le localStorage au démarrage
  const storedLogin = localStorage.getItem("login");
  const storedIsAdmin = localStorage.getItem("isAdmin") === "true"; // Vérifier le statut admin
  const [user, setUser] = useState<User | null>({
    login: storedLogin,
    isAdmin: storedIsAdmin,
  });

  // Mettre à jour localStorage lorsque l'utilisateur change
  useEffect(() => {
    if (user?.login) {
      localStorage.setItem("login", user.login);
      localStorage.setItem("isAdmin", user.isAdmin.toString()); // Sauvegarder isAdmin
    } else {
      localStorage.removeItem("login");
      localStorage.removeItem("isAdmin"); // Supprimer isAdmin du localStorage si déconnexion
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pour accéder au contexte
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
