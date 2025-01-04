import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import FormInput from "../components/FormInput"; // Assure-toi que ce composant existe et est stylisé si nécessaire
import PageTitle from "../components/PageTitle";
import SignInFooter from "../components/SignInFooter";

const SignupPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Récupérer la fonction navigate

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
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || "Erreur inconnue");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-700 shadow-md rounded-lg p-8">
        <PageTitle className="text-center">Inscription</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            S'inscrire
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
        <SignInFooter
          link="/login"
          text="Déjà un compte ?"
          linkText="Se connecter"
        />
      </div>
    </div>
  );
};

export default SignupPage;
