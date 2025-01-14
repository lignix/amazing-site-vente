import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import PageTitle from "../components/PageTitle";
import PartTitle from "../components/PartTitle";

interface ObjectForSale {
  id: number;
  description: string;
  price: number;
  sold: boolean;
}

const MyObjectsPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [objects, setObjects] = useState<ObjectForSale[]>([]);

  useEffect(() => {
    if (!login) {
      navigate("/login");
      return;
    }

    const fetchMyObjects = async () => {
      setObjects([]);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/objects/my",
          {
            headers: {
              login: login,
            },
          }
        );
        setObjects(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des objets", err);
      }
    };

    fetchMyObjects();
  }, [login, navigate]);

  // Fonction pour marquer un objet comme vendu
  const setObjectSold = async (id: number) => {
    try {
      await axios.patch(`http://localhost:8080/api/objects/${id}`, {
        sold: true,
      });
      // Mettre à jour l'état local pour marquer l'objet comme vendu
      setObjects((prevObjects) =>
        prevObjects.map((obj) =>
          obj.id === id ? { ...obj, sold: true } : obj
        )
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'objet", err);
    }
  };

  return (
    <div className="flex min-h-screen h-full bg-gray-800 py-8">
      <div className="flex flex-col justify-between w-full overflow-y-auto bg-gray-700 shadow-lg rounded-lg py-8 px-12 scroll-y">
        <PageTitle>Mes Objets</PageTitle>

        <div className="flex space-x-8">
          <div className="flex-grow bg-gray-600 p-4 rounded-lg shadow-md">
            <PartTitle title="Liste de mes objets" />

            <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
              <ul className="pt-4">
                {objects.length > 0 ? (
                  objects.map((obj) => (
                    <li
                      key={obj.id}
                      className="mb-2 p-2 bg-blue-200 rounded shadow flex justify-between items-center"
                    >
                      <div>
                        <p>
                          <strong>Description:</strong> {obj.description}
                        </p>
                        <p>
                          <strong>Prix:</strong> {obj.price} €
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p>
                          Status :{" "}
                          <strong>{obj.sold ? "Vendu" : "En vente"}</strong>
                        </p>
                        {!obj.sold && (
                          <button
                            onClick={() => setObjectSold(obj.id)}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                          >
                            Marquer comme vendu
                          </button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-blue-300">Aucun objet trouvé.</p>
                )}
              </ul>
            </div>
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

export default MyObjectsPage;
