import React from "react";

const AdminPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full h-[90vh] bg-gray-700 shadow-lg rounded-lg p-12">
        <h1 className="text-3xl text-orange-600 font-bold">Admin Page</h1>
        <p className="text-xl text-white mt-4">Bienvenue sur la page admin !</p>
        {/* Ajoutez ici le contenu spécifique pour les administrateurs */}
      </div>
    </div>
  );
};

export default AdminPage;
