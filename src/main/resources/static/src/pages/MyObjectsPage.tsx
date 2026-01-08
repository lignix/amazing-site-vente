import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import PageTitle from "../components/PageTitle";
import PartTitle from "../components/PartTitle";

const MyObjectsPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [objects, setObjects] = useState<any[]>([]);

  useEffect(() => {
    if (!login) { navigate("/login"); return; }
    const fetchMyObjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/objects/my", {
          headers: { login: login },
        });
        setObjects(response.data);
      } catch (err) { console.error(err); }
    };
    fetchMyObjects();
  }, [login, navigate]);

  const setObjectSold = async (id: number) => {
    try {
      await axios.patch(`http://localhost:8080/api/objects/${id}`, { sold: true });
      setObjects(prev => prev.map(obj => obj.id === id ? { ...obj, sold: true } : obj));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <PageTitle>Mes Objets</PageTitle>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors"
          >
            ← Retour à l'accueil
          </button>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8">
          <PartTitle title="Inventaire de vos ventes" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {objects.length > 0 ? (
              objects.map((obj) => (
                <div key={obj.id} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center group transition-all hover:border-zinc-700">
                  <div>
                    <h3 className="text-zinc-100 font-medium mb-1">{obj.description}</h3>
                    <p className="text-blue-400 font-mono text-sm">{obj.price} €</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider font-bold ${
                      obj.sold ? "bg-zinc-800 text-zinc-500" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    }`}>
                      {obj.sold ? "Vendu" : "En vente"}
                    </span>
                    {!obj.sold && (
                      <button
                        onClick={() => setObjectSold(obj.id)}
                        className="text-xs bg-zinc-100 text-zinc-950 px-3 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white transition-all font-semibold"
                      >
                        Vendre
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-zinc-500 italic">Vous n'avez pas encore d'objets en vente.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyObjectsPage;