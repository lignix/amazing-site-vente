import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel}></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-zinc-100 mb-4">{title}</h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 text-sm font-bold bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg shadow-red-500/20"
          >
            Confirmer la suppression
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;