import React, { useState } from "react";

interface BuyerModalProps {
  isOpen: boolean;
  onConfirm: (buyerName: string) => void;
  onCancel: () => void;
}

const BuyerModal: React.FC<BuyerModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const [buyerName, setBuyerName] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (buyerName.trim()) {
      onConfirm(buyerName);
      setBuyerName("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop flouté */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel}></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-zinc-100 mb-2">Finaliser la vente</h2>
        <p className="text-zinc-400 mb-6 text-sm">
          Veuillez entrer le nom de l'acheteur pour valider la transaction.
        </p>
        
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            Nom de l'acheteur
          </label>
          <input
            type="text"
            autoFocus
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="Ex: Jean Dupont"
          />
        </div>
        
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            disabled={!buyerName.trim()}
            className="px-6 py-2.5 text-sm font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            Confirmer la vente
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerModal;