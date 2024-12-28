import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import du hook useUser
import FormInput from "../components/FormInput";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setLogin: setUserLogin } = useUser(); // Utilisation du setLogin du contexte

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
      } else {
        // Mettre à jour le contexte utilisateur avec le login
        setUserLogin(login);
        localStorage.setItem("login", login); // Enregistrer dans localStorage
        navigate("/home");
      }
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer: " + error);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Login"
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value.trim())}
          required
        />
        <FormInput
          label="Mot de passe"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          required
        />
        <button type="submit">Se connecter</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
