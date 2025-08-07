import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'green' | 'blue' | 'red' | 'yellow' | 'purple';
  detail?: string;
  onVerClick?: () => void;
}

const colorClasses = {
  green: 'border-green-500 text-green-600',
  blue: 'border-blue-500 text-blue-600',
  red: 'border-red-500 text-red-600',
  yellow: 'border-yellow-500 text-yellow-600',
  purple: 'border-purple-500 text-purple-600',
};

const iconBg = {
  green: 'bg-green-50 text-green-500',
  blue: 'bg-blue-50 text-blue-500',
  red: 'bg-red-50 text-red-500',
  yellow: 'bg-yellow-50 text-yellow-500',
  purple: 'bg-purple-50 text-purple-500',
};

export default function StatCard({ title, value, icon, color, detail, onVerClick }: StatCardProps) {
  return (
    <div className={`rounded-lg shadow-md p-6 border-t-4 bg-white text-gray-900 ${colorClasses[color]}`}> 
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start">
          <span className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</span>
          <span className="text-sm text-gray-700 mt-2 font-medium">{title}</span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`rounded-full w-12 h-12 flex items-center justify-center ${iconBg[color]}`}> 
            <i className={`${icon} text-4xl`}></i>
          </div>
          {onVerClick && (
            <button
              onClick={onVerClick}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                color === 'green' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                color === 'blue' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                color === 'red' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                color === 'yellow' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              Ver
            </button>
          )}
        </div>
      </div>
      {detail && (
        <>
          <hr className={`my-4 w-full border-t-2 ${colorClasses[color]} shadow-sm`} />
          <div className="w-full text-center">
            <span className="text-sm text-gray-700 font-semibold">{detail}</span>
          </div>
        </>
      )}
    </div>
  );
} 