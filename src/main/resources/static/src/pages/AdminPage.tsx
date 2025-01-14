import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ObjectForSale {
  id: number;
  description: string;
  price: number;
  sold: boolean;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState<number>(0);
  const [totalSold, setTotalSold] = useState<number>(0);

  useEffect(() => {
    const fetchSoldObjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/objects");
        console.log("Réponse de l'API", response.data);
        const soldItems = response.data.filter(
          (obj: ObjectForSale) => obj.sold
        );

        // Calcul du chiffre d'affaires (10% du prix de chaque objet vendu)
        const totalRevenue = soldItems.reduce(
          (acc: number, obj: ObjectForSale) => acc + obj.price * 0.1,
          0
        );
        setRevenue(totalRevenue);
        setTotalSold(soldItems.length); // Nombre d'objets vendus
      } catch (err) {
        console.error("Erreur lors de la récupération des objets vendus", err);
      }
    };

    fetchSoldObjects();
  }, []);

  return (
    <div className="flex min-h-screen h-full bg-gray-800 py-10">
      <div className="flex flex-col justify-between w-full overflow-y-auto bg-gray-700 shadow-lg rounded-lg py-8 px-12 scroll-y">
        <div>
          <h1 className="text-3xl text-orange-600 font-bold">Page Admin : </h1>
          <div className="mt-8 text-white">
            <h2 className="text-2xl font-semibold">Statistiques des ventes</h2>
            <p className="mt-4">Nombre d'objets vendus : {totalSold}</p>
            <p className="mt-2">
              Chiffre d'affaire généré : {revenue.toFixed(2)} €
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition mt-8"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
