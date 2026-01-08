import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import StatCard from "../components/StatCard";
import PartTitle from "../components/PartTitle";

interface User {
  login: string;
  city: string;
}

interface ObjectForSale {
  id: number;
  description: string;
  price: number;
  sold: boolean;
  user: User;
  buyerName?: string;
  saleDate?: string;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState<number>(0);
  const [totalSold, setTotalSold] = useState<number>(0);
  const [soldObjects, setSoldObjects] = useState<ObjectForSale[]>([]);

  useEffect(() => {
    const fetchSoldObjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/objects");
        const soldItems = response.data.filter((obj: ObjectForSale) => obj.sold);
        const totalRevenue = soldItems.reduce((acc: number, obj: ObjectForSale) => acc + obj.price * 0.1, 0);

        setRevenue(totalRevenue);
        setTotalSold(soldItems.length);
        setSoldObjects(soldItems);
      } catch (err) {
        console.error("Erreur lors de la récupération des statistiques admin", err);
      }
    };
    fetchSoldObjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header Section */}
        <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Panel Administration</span>
            </div>
            <PageTitle>Statistiques Globales</PageTitle>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors"
          >
            ← Retour au site
          </button>
        </div>

        {/* Cartes de statistiques (utilisant le composant StatCard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <StatCard
            title="Objets vendus"
            value={totalSold}
            label="Volume total"
            variant="blue"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            }
          />
          <StatCard
            title="Chiffre d'affaires"
            value={revenue.toFixed(2)}
            unit="€"
            label="Commission collectée (10%)"
            variant="orange"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Tableau des Rapports d'activité */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/80">
            <PartTitle title="Historique des ventes" />
            <p className="text-zinc-500 text-sm mt-1">Détail des transactions incluant vendeurs et acheteurs.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/50 text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Vendeur</th>
                  <th className="px-6 py-4">Acheteur</th>
                  <th className="px-6 py-4">Prix</th>
                  <th className="px-6 py-4 text-orange-500">Com.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {soldObjects.length > 0 ? (
                  soldObjects.map((obj) => (
                    <tr key={obj.id} className="hover:bg-zinc-800/30 transition-colors group text-sm">
                      <td className="px-6 py-4 text-zinc-500 font-mono">
                        {obj.saleDate ? new Date(obj.saleDate).toLocaleDateString() : "--/--/--"}
                      </td>
                      <td className="px-6 py-4 font-medium text-zinc-200">
                        {obj.description}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-blue-400/80 bg-blue-400/5 px-2 py-1 rounded text-xs">
                          {obj.user.login}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {obj.buyerName ? (
                          <span className="text-emerald-400/80 bg-emerald-400/5 px-2 py-1 rounded text-xs">
                            {obj.buyerName}
                          </span>
                        ) : (
                          <span className="text-zinc-600 italic text-xs">Inconnu</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-zinc-300">
                        {obj.price.toFixed(2)}€
                      </td>
                      <td className="px-6 py-4 font-mono text-orange-500 font-bold">
                        {(obj.price * 0.1).toFixed(2)}€
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 italic">
                      Aucune donnée de vente disponible.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPage;