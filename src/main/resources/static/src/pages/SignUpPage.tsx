import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import PageTitle from "../components/PageTitle";
import SignInFooter from "../components/SignInFooter";

const SignupPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post("http://localhost:8080/api/users/register", { login, password, city });
      navigate("/login");
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 shadow-2xl rounded-2xl p-10">
        <PageTitle className="text-center mb-8">Inscription</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            label="Login"
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value.trim())}
            required
            placeholder="Choisissez un pseudo"
          />
          <FormInput
            label="Mot de passe"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            required
            placeholder="••••••••"
          />
          <FormInput
            label="Ville"
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value.trim())}
            required
            placeholder="Ex: Paris"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 mt-4"
          >
            Créer mon compte
          </button>
        </form>
        
        {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
        
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <SignInFooter
            link="/login"
            text="Déjà un compte ?"
            linkText="Se connecter"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;