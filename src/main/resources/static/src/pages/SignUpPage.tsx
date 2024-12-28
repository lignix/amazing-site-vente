import React, { useState } from "react";
import axios from "axios";
import FormInput from "../components/FormInput";

const SignupPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(login, password, city);

    // Réinitialisation de l'erreur précédente
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          login,
          password,
          city,
        }
      );

      // succès
      console.log("Utilisateur enregistré : ", response.data);
      // TODO : redirect page de connexion / connecter automatiquement
      // erreur
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || "Erreur inconnue");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
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
        <FormInput
          label="Ville"
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value.trim())}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignupPage;
