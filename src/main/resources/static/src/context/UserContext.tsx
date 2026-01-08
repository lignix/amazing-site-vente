/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface UserContextType {
  login: string | null;
  isAdmin: boolean;
  setLogin: (login: string | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Vérifier le login dans le localStorage au démarrage
  const storedLogin = localStorage.getItem("login");
  const [login, setLogin] = useState<string | null>(storedLogin);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Mettre à jour localStorage lorsque le login change
  useEffect(() => {
    if (login) {
      localStorage.setItem("login", login); // Sauvegarder le login dans localStorage
    } else {
      localStorage.removeItem("login"); // Supprimer le login du localStorage si l'utilisateur se déconnecte
    }
  }, [login]);

  // Vérifier si l'utilisateur est administrateur
  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (login) {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/users/admin",
            {
              headers: { login },
            }
          );
          setIsAdmin(response.data);
        } catch (err) {
          console.error(
            "Erreur lors de la vérification de l'administrateur",
            err
          );
        }
      }
    };

    fetchAdminStatus();
  }, [login]);

  return (
    <UserContext.Provider value={{ login, isAdmin, setLogin, setIsAdmin }}>
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

// Hook pour accéder à l'état isAdmin
export const useAdmin = (): boolean => {
  const { isAdmin } = useUser();
  console.log("isAdmin", isAdmin);
  return isAdmin;
};
