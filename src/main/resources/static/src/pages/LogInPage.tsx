// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Input from "../components/FormInput";
import PageTitle from "../components/PageTitle";
import SignInFooter from "../components/SignInFooter";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser(); // On accède à la fonction pour définir l'objet `user`

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

      // Vérifier si la réponse est réussie
      if (!response.ok) {
        const errorData = await response.text(); // Récupérer l'erreur sous forme de texte
        setError(errorData);
      } else {
        // Consommer la réponse JSON
        const userData = await response.json(); // Lire le corps de la réponse en tant qu'objet JSON
        console.log(userData); // Afficher l'objet utilisateur dans la console

        // Mettre à jour le contexte et stocker les données utilisateur dans le localStorage
        setUser({
          login: login,
          isAdmin: userData.admin,
        });

        // Rediriger l'utilisateur vers la page d'accueil
        navigate("/home");
      }
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer: " + error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-700 shadow-md rounded-lg p-8">
        <PageTitle className="text-center">Connexion</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="login"
            label="Login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value.trim())}
            required
          />
          <Input
            id="password"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
        <SignInFooter
          link="/signup"
          text="Pas encore inscrit ?"
          linkText="Créer un compte"
        />
      </div>
      <div className="w-full text-center mt-6">
        <p className="text-white">
          Envie de visiter ?{" "}
          <a href="/home" className="text-blue-400 hover:underline">
            Aller à l'accueil
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
