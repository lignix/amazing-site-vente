import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Définir l'interface pour l'utilisateur
interface UserContextType {
  login: string | null;
  setLogin: (login: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Vérifier le login dans le localStorage au démarrage
  const storedLogin = localStorage.getItem("login");
  const [login, setLogin] = useState<string | null>(storedLogin);

  // Mettre à jour localStorage lorsque le login change
  useEffect(() => {
    if (login) {
      localStorage.setItem("login", login); // Sauvegarder le login dans localStorage
    } else {
      localStorage.removeItem("login"); // Supprimer le login du localStorage si l'utilisateur se déconnecte
    }
  }, [login]);

  return (
    <UserContext.Provider value={{ login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
