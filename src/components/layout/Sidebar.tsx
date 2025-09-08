'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface SubMenuItem {
  name: string;
  href: string;
  active: boolean;
}

interface MenuItem {
  name: string;
  href?: string;
  icon: string;
  active: boolean;
  submenu?: SubMenuItem[];
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      name: 'Cartera Vigente',
      href: '/cartera-vigente',
      icon: 'fa-solid fa-wallet',
      active: pathname === '/cartera-vigente'
    },
    {
      name: 'Evolución de la Cartera',
      href: '/evolucion-de-la-cartera',
      icon: 'fa-solid fa-house',
      active: pathname === '/evolucion-de-la-cartera'
    },
    {
      name: 'Evolución por Tipo de Operación',
      href: '/evolucion-por-tipo-operacion',
      icon: 'fa-solid fa-chart-line',
      active: pathname === '/evolucion-por-tipo-operacion'
    },
    /*
    {
      name: 'Ranking de Compañías / Productores',
      href: '/dashboard/ranking',
      icon: 'fa-solid fa-chart-simple',
      active: pathname === '/dashboard/ranking'
    },
    {
      name: 'Producción de Compañías Estratégicas',
      href: '/dashboard/produccion',
      icon: 'fa-solid fa-building',
      active: pathname === '/dashboard/produccion'
    },
    {
      name: 'Campañas Comerciales y Oportunidades de Venta',
      href: '/dashboard/campanias',
      icon: 'fa-solid fa-bullhorn',
      active: pathname === '/dashboard/campanias'
    },*/
    {
      name: 'Presupuesto Comercial',
      href: '/dashboard/presupuesto-comercial',
      icon: 'fa-solid fa-coins',
      active: pathname === '/dashboard/presupuesto-comercial'
    },
    {
      name: 'Campañas de Marketing',
      href: '/dashboard/campanas-mkt',
      icon: 'fa-solid fa-ad',
      active: pathname === '/dashboard/campanas-mkt'
    },
    {
      name: 'Administración',
      icon: 'fa-solid fa-cog',
      active: pathname.startsWith('/admin'),
      submenu: [
        {
          name: 'IPC',
          href: '/admin/ipc',
          active: pathname === '/admin/ipc'
        },
        {
          name: 'Usuarios',
          href: '/admin/usuarios',
          active: pathname === '/admin/usuarios'
        },
        {
          name: 'Roles',
          href: '/admin/roles',
          active: pathname === '/admin/roles'
        }
      ]
    }
  ];

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.submenu) {
      const isExpanded = expandedMenus.includes(item.name);
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleSubmenu(item.name)}
            className={`group w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              item.active
                ? 'bg-white/10 text-white font-bold'
                : 'text-gray-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <i className={`${item.icon} mr-3 flex-shrink-0 h-5 w-5`}></i>
              {item.name}
            </div>
            <i className={`fa-solid fa-chevron-down transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}></i>
          </button>
          
          {isExpanded && (
            <div className="ml-6 mt-2 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    subItem.active
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-circle text-xs mr-3 flex-shrink-0"></i>
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href!}
        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
          item.active
            ? 'bg-white/10 text-white font-bold'
            : 'text-gray-200 hover:bg-white/5 hover:text-white'
        }`}
      >
        <i className={`${item.icon} mr-3 flex-shrink-0 h-5 w-5`}></i>
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Sidebar para desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="fixed top-0 left-0 h-screen w-64 z-20 flex flex-col">
          <div className="flex flex-col h-0 flex-1 bg-[#036] h-screen">
            {/* Logo y título */}
            <div className="flex items-center justify-center h-16 flex-shrink-0 px-6 border-b border-black/40 shadow-md shadow-black/30">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-center w-full">
                  <Image src="/logo.png" alt="Logo SMSV" width={140} height={140} />
                </div>
              </div>
            </div>
            
            {/* Navegación */}
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-4 py-6 space-y-2">
                <div className="space-y-1">
                  {menuItems.map(renderMenuItem)}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar móvil */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}> 
        <div className="fixed inset-0 bg-black bg-opacity-60" onClick={() => setSidebarOpen(false)}></div>
        <div className="absolute left-0 top-0 h-full max-w-xs w-full bg-[#036] shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <i className="fa-solid fa-times text-white"></i>
            </button>
          </div>
          
          <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-black/40 shadow-md shadow-black/30">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-center w-full">
                <Image src="/logo.png" alt="Logo SMSV" width={128} height={128} />
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-2">
              <div className="space-y-1">
                {menuItems.map(renderMenuItem)}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
} 