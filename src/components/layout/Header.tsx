'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();
  // Eliminar lógica relacionada a theme, toggleTheme y el switch de modo oscuro

  const handleLogout = () => {
    // Limpiar datos de sesión
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie = 'smsv-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Botón de menú móvil */}
        <div className="lg:hidden">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <i className="fa-solid fa-bars h-6 w-6"></i>
          </button>
        </div>

        {/* Título de la página (solo móvil) */}
        <div className="lg:hidden flex items-center">
          <Image src="/logo.svg" alt="SMSV Logo" width={32} height={32} className="h-8 w-8 mr-3" />
          <h1 className="text-lg font-semibold text-gray-900">SMSV</h1>
        </div>

        {/* Espaciador para centrar en desktop */}
        <div className="hidden lg:block flex-1"></div>

        {/* Botón de modo oscuro/claro como switch */}
        {/* Eliminar el switch de modo oscuro */}

        {/* Menú de usuario */}
        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
            <i className="fa-solid fa-bell h-5 w-5"></i>
          </button>

          {/* Perfil de usuario */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Image
                className="h-8 w-8 rounded-full border-2 border-gray-200"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Usuario"
                width={32}
                height={32}
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700">Usuario</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <i className="fa-solid fa-chevron-down text-gray-400"></i>
            </button>

            {/* Menú desplegable */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Usuario</p>
                  <p className="text-xs text-gray-500">usuario@smsv.com</p>
                </div>
                
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <i className="fa-solid fa-user mr-3"></i>
                  Perfil
                </button>
                
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <i className="fa-solid fa-cog mr-3"></i>
                  Configuración
                </button>
                
                <div className="border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <i className="fa-solid fa-sign-out-alt mr-3"></i>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 