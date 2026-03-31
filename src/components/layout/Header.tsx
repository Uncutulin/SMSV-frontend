import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/services/authService';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: 'Usuario',
    email: '',
    role: 'Administrador',
    avatar: null as string | null
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        const role = user.roles && user.roles.length > 0 ? user.roles[0].name : '';
        setUserInfo({
          name: `${user.name} ${user.apellido || ''}`,
          email: user.email,
          role: role,
          avatar: user.profile_photo_url || user.avatar_url || user.photo_url || null
        });
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);
  // Eliminar lógica relacionada a theme, toggleTheme y el switch de modo oscuro

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Limpiar storage local por si acaso
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    navigate('/login');
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
          <img src="/logo.svg" alt="SMSV Logo" width="32" height="32" className="h-8 w-8 mr-3" />
          <h1 className="text-lg font-semibold text-gray-900">SMSV</h1>
        </div>

        {/* Espaciador para centrar en desktop */}
        <div className="hidden lg:block flex-1"></div>

        {/* Botón de modo oscuro/claro como switch */}
        {/* Eliminar el switch de modo oscuro */}

        {/* Menú de usuario */}
        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          {/*<button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
            <i className="fa-solid fa-bell h-5 w-5"></i>
          </button>*/}

          {/* Perfil de usuario */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <div className="h-9 w-9 rounded-full border-2 border-white shadow-sm overflow-hidden bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {userInfo.avatar ? (
                  <img
                    className="h-full w-full object-cover"
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.classList.remove('bg-transparent');
                    }}
                  />
                ) : (
                  <span>
                    {userInfo.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-800 leading-tight">{userInfo.name}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{userInfo.role}</p>
              </div>
              <i className="fa-solid fa-chevron-down text-gray-400 text-xs"></i>
            </button>

            {/* Menú desplegable */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                  <p className="text-xs text-gray-500">{userInfo.email}</p>
                </div>

                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <i className="fa-solid fa-user mr-3"></i>
                  Perfil
                </button>

                {/*
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <i className="fa-solid fa-cog mr-3"></i>
                  Configuración
                </button>
                */}

                <div className="border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-red-50 flex items-center"
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