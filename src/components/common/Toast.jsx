import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-900',
    error: 'border-rose-200 bg-rose-50/90 text-rose-900',
    info: 'border-sky-200 bg-sky-50/90 text-sky-900'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div 
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-clay-card backdrop-blur-md transition-all duration-300 ${borderColors[type] || borderColors.info}`}
        style={{
          boxShadow: '8px 12px 24px -4px rgba(148, 163, 184, 0.35), -4px -4px 14px 0px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(255, 255, 255, 0.8)'
        }}
      >
        {icons[type] || icons.info}
        <span className="text-sm font-bold">{message}</span>
        <button 
          onClick={onClose}
          className="p-1 -mr-1 rounded-full hover:bg-black/5 active:scale-90 transition-transform text-claySlate-600 hover:text-claySlate-900"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
