'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar a la izquierda, ocupa toda la altura */}
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen ml-0 lg:ml-64">
        {/* Header arriba de todo, a la derecha del sidebar */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        {/* Contenido principal */}
        <main className="flex-1 pb-6 px-4 w-full h-full">
          {children}
        </main>
      </div>
      {/* Botón flotante para volver arriba */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-[#003366] text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-[#002244] transition-colors"
        aria-label="Volver arriba"
      >
        <i className="fa-solid fa-arrow-up text-2xl"></i>
      </button>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
} 