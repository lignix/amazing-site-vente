import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-black text-zinc-800">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-zinc-100">Page introuvable</h2>
          <p className="text-zinc-400">Le trésor que vous cherchez n'existe pas ou a été déplacé.</p>
        </div>
        <button
          onClick={() => navigate("/home")}
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;