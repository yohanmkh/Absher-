import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
       <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-[scale_0.2s_ease-out]">
          <div className="bg-slate-950 p-6 flex flex-col items-center text-center border-b border-slate-800">
             <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
             </div>
             <h2 className="text-xl font-bold text-white mb-2">Report Submitted</h2>
             <p className="text-slate-400 text-sm">
                Full dossier, video log (ID: 892A), and AI risk assessment have been securely transmitted to Operations Command (COM).
             </p>
          </div>
          <div className="p-4 bg-slate-900 flex justify-center">
             <button 
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-8 py-2 rounded-lg transition-colors"
             >
                Close
             </button>
          </div>
       </div>
    </div>
  );
};
