import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Input from "../components/FormInput";
import PageTitle from "../components/PageTitle";

const HomePage: React.FC = () => {
  const { login, setLogin } = useUser();
  const navigate = useNavigate();

  // États pour le formulaire d'ajout d'objet
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogout = () => {
    // Effacer le login du contexte
    setLogin(null);
    // Supprimer le login du localStorage
    localStorage.removeItem("login");
    // Rediriger l'utilisateur vers la page de login
    navigate("/login");
  };

  const handleCreateObject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Vérification des champs
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
      // Envoi de la requête pour créer un objet à vendre
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
      // Réinitialiser les champs du formulaire
      setDescription("");
      setPrice("");
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la création de l'objet: " + err
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full bg-gray-700 shadow-lg rounded-lg p-12">
        <PageTitle>Bienvenue à l'accueil</PageTitle>
        <p className="text-xl text-blue-300 mb-4">
          Bienvenue,{" "}
          <span className="font-semibold text-blue-600">{login}</span>!
        </p>

        {/* Conteneur flex pour organiser la page en deux colonnes */}
        <div className="flex space-x-8">
          {/* Partie gauche : Affichage des objets mis en vente (placeholder pour l'instant) */}
          <div className="flex-grow bg-gray-600 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">
              Objets à vendre
            </h2>
            <p className="text-blue-400">
              Cette section affichera les objets mis en vente plus tard.
            </p>
          </div>

          {/* Partie droite : Formulaire d'ajout d'objet */}
          <div className="w-1/3">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">
              Ajouter un objet à vendre
            </h2>

            <form onSubmit={handleCreateObject} className="space-y-4">
              {/* Description */}
              <Input
                id="description"
                label="Description de l'objet"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Entrez une description de l'objet"
              />
              {/* Prix */}
              <Input
                id="price"
                label="Prix de l'objet"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Entrez le prix de l'objet"
              />

              {/* Bouton pour soumettre */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Ajouter l'objet
              </button>
            </form>

            {/* Affichage des messages d'erreur ou de succès */}
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {success && <p className="mt-4 text-green-600">{success}</p>}
          </div>
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
