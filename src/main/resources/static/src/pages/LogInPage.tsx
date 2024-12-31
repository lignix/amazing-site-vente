// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Input from "../components/FormInput";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setLogin: setUserLogin } = useUser();

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
        setUserLogin(login);
        localStorage.setItem("login", login);
        navigate("/home");
      }
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer: " + error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Connexion
        </h1>
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
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Pas encore inscrit ?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-800">
              Créer un compte
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
