import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Input from "../components/FormInput";
import PageTitle from "../components/PageTitle";
import PartTitle from "../components/PartTitle";
import FormInput from "../components/FormInput";

interface ObjectForSale {
  id: number;
  description: string;
  price: number;
  sold: boolean;
}

const HomePage: React.FC = () => {
  const { login, setLogin } = useUser();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [objects, setObjects] = useState<ObjectForSale[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const login = localStorage.getItem("login");
      if (!login) return;
      try {
        const response = await axios.get("http://localhost:8080/api/users/admin", {
          headers: { login: login },
        });
        setIsAdmin(response.data);
      } catch (err) {
        console.error("Erreur lors de la vérification admin", err);
      }
    };

    fetchAdminStatus();
    fetchObjects();
  }, []);

  const handleLogout = () => {
    setLogin(null);
    localStorage.removeItem("login");
    navigate("/login");
  };

  const handleCreateObject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!description || !price) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const login = localStorage.getItem("login");
    if (!login) {
      setError("Utilisateur non connecté.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/objects/create",
        { description, price },
        { headers: { login: login } }
      );
      setSuccess("Objet ajouté avec succès !");
      setDescription("");
      setPrice("");
      fetchObjects();
    } catch (err) {
      setError("Erreur lors de la création.");
    }
  };

  const fetchObjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/objects");
      setObjects(response.data);
    } catch (err) {
      console.error("Erreur récupération objets", err);
    }
  };

  const filteredObjects = objects.filter(
    (obj) =>
      obj.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !obj.sold
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-8">
          <div>
            <PageTitle>Amazing marketplace</PageTitle>
            {login && (
              <p className="text-zinc-400 mt-2">
                Ravi de vous revoir,{" "}
                <span className={`font-medium ${isAdmin ? "text-orange-500" : "text-blue-400"}`}>
                  {login}
                </span>
              </p>
            )}
          </div>
          {login && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-red-400 transition-colors"
            >
              Déconnexion
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content: List of Objects */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <PartTitle title="Articles disponibles" />
              <div className="w-full md:w-72">
                <FormInput
                  placeholder="Rechercher un trésor..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
              {filteredObjects.length > 0 ? (
                filteredObjects.map((obj) => (
                  <div
                    key={obj.id}
                    className="group p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-zinc-100 font-medium group-hover:text-blue-400 transition-colors">
                        {obj.description}
                      </h3>
                      <span className="text-blue-400 font-mono font-semibold">
                        {obj.price}€
                      </span>
                    </div>
                    <button className="w-full py-2 text-sm bg-zinc-800 text-zinc-300 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                      Voir les détails
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800 rounded-2xl">
                  <p className="text-zinc-500">Aucun objet ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Form or Login Prompt */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl shadow-xl">
              {!login ? (
                <div className="text-center">
                  <h2 className="text-xl font-bold text-zinc-100 mb-4">Prêt à vendre ?</h2>
                  <p className="text-zinc-400 text-sm mb-6">Connectez-vous pour ajouter vos articles et gérer vos ventes.</p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                  >
                    Se connecter
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <PartTitle title="Mettre en vente" />
                  <form onSubmit={handleCreateObject} className="space-y-4">
                    <Input
                      id="description"
                      label="Description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Ex: Clavier mécanique"
                    />
                    <Input
                      id="price"
                      label="Prix (€)"
                      type="number"
                      value={price}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setPrice(value >= 0 ? value : "");
                      }}
                      required
                      placeholder="0.00"
                    />

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                    >
                      Publier l'annonce
                    </button>
                  </form>

                  {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                  {success && <p className="text-sm text-emerald-400 text-center">{success}</p>}
                  
                  <div className="pt-6 border-t border-zinc-800 space-y-3">
                    <button
                      onClick={() => navigate("/mes-objets")}
                      className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2.5 rounded-xl transition-all"
                    >
                      Mes objets
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => navigate("/admin")}
                        className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 py-2.5 rounded-xl transition-all border border-orange-500/20"
                      >
                        Administration
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;