import React from 'react';

interface IntroductionModalProps {
  onClose: () => void;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to the Workshop!</h2>
        <p className="mt-4 text-slate-600">
          Ready to elevate your English from "correct" to "sophisticated"? This interactive workshop will help you master the four core sentence structures through hands-on practice.
        </p>
        <p className="mt-2 text-slate-600">
          Drag, drop, and build your way to clearer, more professional communication.
        </p>
        <button
          onClick={onClose}
          className="mt-8 px-8 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold text-lg"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default IntroductionModal;
