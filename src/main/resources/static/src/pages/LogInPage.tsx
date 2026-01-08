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
  const { setLogin: setUserLogin } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
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
      setError("Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 shadow-2xl rounded-2xl p-10 backdrop-blur-sm">
        <PageTitle className="text-center mb-8">Connexion</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="login"
            label="Identifiant"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value.trim())}
            required
            placeholder="Votre login"
          />
          <Input
            id="password"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            required
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-4"
          >
            Se connecter
          </button>
        </form>
        
        {error && (
          <p className="mt-6 text-center text-sm text-red-400 bg-red-400/10 py-2 rounded-lg border border-red-400/20">
            {error}
          </p>
        )}
        
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <SignInFooter
            link="/signup"
            text="Pas encore inscrit ?"
            linkText="Créer un compte"
          />
        </div>
      </div>
      
      <p className="mt-8 text-zinc-500 text-sm">
        Juste envie de jeter un œil ?{" "}
        <a href="/home" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors">
          Aller à l'accueil
        </a>
      </p>
    </div>
  );
};

export default LoginPage;