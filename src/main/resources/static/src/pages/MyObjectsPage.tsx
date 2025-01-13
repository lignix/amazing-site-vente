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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full h-[90vh] bg-gray-700 shadow-lg rounded-lg p-12">
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
                      className="mb-2 p-2 bg-blue-200 rounded shadow"
                    >
                      <p>
                        <strong>Description:</strong> {obj.description}
                      </p>
                      <p>
                        <strong>Prix:</strong> {obj.price} €
                      </p>
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
