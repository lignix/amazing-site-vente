import React from "react";

const AdminPage: React.FC = () => {
  return (
    <div className="flex min-h-screen h-full bg-gray-800 py-10">
      <div className="flex flex-col justify-between w-full overflow-y-auto bg-gray-700 shadow-lg rounded-lg py-8 px-12 scroll-y">
        <div>
          <h1 className="text-3xl text-orange-600 font-bold">Admin Page</h1>
          <p className="text-xl text-white mt-4">
            Bienvenue sur la page admin !
          </p>
        </div>

        {/* Ajoutez ici le contenu spécifique pour les administrateurs */}
      </div>
    </div>
  );
};

export default AdminPage;
