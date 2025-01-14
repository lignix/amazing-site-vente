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
        const response = await axios.get(
          "http://localhost:8080/api/users/admin",
          {
            headers: { login: login },
          }
        );
        setIsAdmin(response.data); // Supposons que le backend renvoie un booléen
      } catch (err) {
        console.error(
          "Erreur lors de la vérification de l'administrateur",
          err
        );
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
        {
          headers: {
            login: login, // Envoi du login dans les headers
          },
        }
      );
      setSuccess("Objet ajouté avec succès !");
      setDescription("");
      setPrice("");
      fetchObjects(); // Recharger les objets après l'ajout
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la création de l'objet: " + err
      );
    }
  };

  const fetchObjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/objects");
      setObjects(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des objets", err);
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  const filteredObjects = objects.filter((obj) =>
    obj.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full h-[90vh] bg-gray-700 shadow-lg rounded-lg p-12">
        <PageTitle>Bienvenue à l'accueil</PageTitle>

        {/* Affichage conditionnel du texte de bienvenue */}
        {login && (
          <p className="text-xl text-blue-300 mb-4">
            Bienvenue,{" "}
            <span
              className={`font-semibold ${
                isAdmin ? "text-orange-600" : "text-blue-600"
              }`}
            >
              {login}
            </span>
            !
          </p>
        )}

        <div className="flex space-x-8">
          {/* Partie gauche : Affichage des objets mis en vente */}
          <div className="flex-grow bg-gray-600 p-4 rounded-lg shadow-md">
            <PartTitle title="Objets en vente" />
            <FormInput
              placeholder="Rechercher un objet..."
              type={"text"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
              <ul className="pt-4">
                {filteredObjects.map((obj) => (
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
                ))}
              </ul>
            </div>
          </div>

          {/* Partie droite : Affichage conditionnel du formulaire */}
          {!login ? (
            <div className="w-1/3">
              {/* Message pour demander à l'utilisateur de se connecter */}
              <h2 className="text-red-500 font-bold text-xl mb-2">
                Vous devez être connecté pour ajouter un objet à vendre.
              </h2>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition mt-8"
              >
                Se connecter
              </button>
            </div>
          ) : (
            <div className="w-1/3">
              <PartTitle title="Ajouter un objet à vendre" />

              <form onSubmit={handleCreateObject} className="space-y-4">
                <Input
                  id="description"
                  label="Description de l'objet"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Entrez une description de l'objet"
                />
                <Input
                  id="price"
                  label="Prix de l'objet"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="Entrez le prix de l'objet"
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition"
                >
                  Ajouter l'objet
                </button>
              </form>

              {error && <p className="mt-4 text-red-600">{error}</p>}
              {success && <p className="mt-4 text-green-600">{success}</p>}
              <button
                onClick={() => navigate("/mes-objets")}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition mt-4"
              >
                Voir mes objets
              </button>
              {isAdmin && (
                <button
                  onClick={() => navigate("/admin")}
                  className="w-full bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-yellow-700 transition mt-4"
                >
                  Page Admin
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bouton pour se déconnecter */}
        {login && (
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition mt-8"
          >
            Se déconnecter
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
