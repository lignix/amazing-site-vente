import React, { useEffect, useState } from "react";
import api from "../services/api";

type Object = {
  id: number;
  description: string;
  price: number;
  isSold: boolean;
};

const ObjectList: React.FC = () => {
  const [objects, setObjects] = useState<Object[]>([]);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await api.get("/objects"); // Appelle l'endpoint `/api/objects`
        setObjects(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des objets :", error);
      }
    };

    fetchObjects();
  }, []);

  return (
    <div>
      {objects.map((obj) => (
        <div key={obj.id}>
          <h2>{obj.description}</h2>
          <p>Prix : {obj.price}€</p>
          <p>{obj.isSold ? "Vendu" : "Disponible"}</p>
        </div>
      ))}
    </div>
  );
};

export default ObjectList;
