import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Cargando datos...", 
  fullPage = false 
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
        {/* Inner Ring (Pulsing) */}
        <div className="absolute inset-2 rounded-full border-4 border-blue-50 bg-blue-50 animate-pulse flex items-center justify-center">
            <i className="fa-solid fa-chart-line text-blue-400"></i>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-700 animate-pulse">{message}</span>
        <span className="text-sm text-gray-500 mt-1">Por favor, espere un momento...</span>
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[300px]">
      {content}
    </div>
  );
};

export default LoadingSpinner;
