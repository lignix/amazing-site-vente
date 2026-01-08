import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import PageTitle from "../components/PageTitle";
import PartTitle from "../components/PartTitle";
import ConfirmModal from "../components/ConfirmModal";
import BuyerModal from "../components/BuyerModal";

const MyObjectsPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [objects, setObjects] = useState<any[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBuyerModalOpen, setIsBuyerModalOpen] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState<number | null>(null);

  useEffect(() => {
    if (!login) { navigate("/login"); return; }
    fetchMyObjects();
  }, [login, navigate]);

  const fetchMyObjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/objects/my", {
        headers: { login: login },
      });
      setObjects(response.data);
    } catch (err) { console.error(err); }
  };

  const openBuyerModal = (id: number) => {
    setSelectedObjectId(id);
    setIsBuyerModalOpen(true);
  };

  const handleConfirmSale = async (buyerName: string) => {
    if (selectedObjectId) {
      try {
        await axios.patch(`http://localhost:8080/api/objects/${selectedObjectId}/sell`,
          {},
          {
            headers: {
              login: login,
              "buyerLogin": buyerName
            }
          });

        setObjects(prev => prev.map(obj =>
          obj.id === selectedObjectId ? { ...obj, sold: true } : obj
        ));
        setIsBuyerModalOpen(false);
      } catch (err) {
        console.error("Erreur lors de la vente", err);
      }
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedObjectId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedObjectId) {
      try {
        await axios.delete(`http://localhost:8080/api/objects/${selectedObjectId}`);
        setObjects(prev => prev.filter(obj => obj.id !== selectedObjectId));
        setIsDeleteModalOpen(false);
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
          <PageTitle>Mes Objets</PageTitle>
          <button onClick={() => navigate("/")} className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors">
            ← Retour à l'accueil
          </button>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8">
          <PartTitle title="Inventaire de vos ventes" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {objects.map((obj) => (
              <div key={obj.id} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center group transition-all hover:border-zinc-700">
                <div>
                  <h3 className="text-zinc-100 font-medium mb-1">{obj.description}</h3>
                  <p className="text-blue-400 font-mono text-sm">{obj.price} €</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold ${obj.sold ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-800 text-zinc-500"
                    }`}>
                    {obj.sold ? "Vendu" : "En vente"}
                  </span>

                  <div className="flex gap-2">
                    {!obj.sold ? (
                      <>
                        <button
                          onClick={() => openBuyerModal(obj.id)}
                          className="text-xs bg-zinc-100 text-zinc-950 px-3 py-1.5 rounded-lg hover:bg-emerald-500 hover:text-white transition-all font-semibold"
                        >
                          Vendre
                        </button>
                        <button
                          onClick={() => openDeleteModal(obj.id)}
                          className="text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all font-semibold"
                        >
                          Supprimer
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-zinc-600 italic">Transaction verrouillée</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BuyerModal
        isOpen={isBuyerModalOpen}
        onConfirm={handleConfirmSale}
        onCancel={() => setIsBuyerModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Supprimer l'annonce ?"
        message="Cette action est irréversible."
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default MyObjectsPage;