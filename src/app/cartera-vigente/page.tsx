'use client';

import { useState } from 'react';
import { useCarteraVigente } from '@/hooks/useCarteraVigente';
import StatCard from '@/components/dashboard/StatCard';

export default function CarteraVigente() {
  // 1. Estados para manejar los Filtros
  const [filters, setFilters] = useState({
    compania: 'TODOS',
    anio: '2025',
    mes: '10',
    tipo_filtro: 'CANAL'
  });

  // 2. Custom Hook para obtener datos (Contiene la lógica de fetch y estados)
  const { listadoData, totalesData, loading, error } = useCarteraVigente(filters);

  console.log(totalesData);

  // 3. Helpers para la Interfaz
  const getMonthName = (month: string) => {
    const months: Record<string, string> = {
      '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
      '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
      '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
    };
    return months[month] || month;
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Mapeo de indicadores (vienen formateados como string desde el Backend)
  const statsCards = [
    {
      title: 'Cantidad de Pólizas',
      value: totalesData?.total_polizas || '-',
      icon: 'fa-solid fa-file-contract',
      color: 'green' as const,
    },
    {
      title: 'Prima Anual emitida',
      value: totalesData?.total_anual || '-',
      icon: 'fa-regular fa-id-badge',
      color: 'blue' as const,
    },
    {
      title: 'Prima Mensual emitida',
      value: totalesData?.total_mensual || '-',
      icon: 'fa-solid fa-calendar-day',
      color: 'purple' as const,
    },
    {
      title: 'Cantidad de Cápitas',
      value: totalesData?.total_capitas || '-',
      icon: 'fa-solid fa-user',
      color: 'red' as const,
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold text-gray-900">Cartera Vigente</h1>
        <p className="text-gray-600 mt-2">{getMonthName(filters.mes)} {filters.anio}</p>
      </div>

      {/* --- BLOQUE DE FILTROS --- */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros de Búsqueda</h3>
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Compañía */}
          <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-md font-medium text-blue-800 mb-3">Compañía</h4>
            <select
              value={filters.compania}
              onChange={(e) => handleFilterChange('compania', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="TODOS">TODOS</option>
              <option value="CAS">CAS</option>
              <option value="ASSA">ASSA</option>
              <option value="ART">ART</option>
            </select>
          </div>

          {/* Tipo de Filtro */}
          <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="text-md font-medium text-purple-800 mb-3">Agrupar por</h4>
            <select
              value={filters.tipo_filtro}
              onChange={(e) => handleFilterChange('tipo_filtro', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            >
              <option value="CANAL">CANAL</option>
              <option value="RAMO">RAMO</option>
              <option value="CIA">CIA</option>
              <option value="PRODUCTORES">PRODUCTORES</option>
              <option value="EJECUTIVO">EJECUTIVO</option>
            </select>
          </div>

          {/* Período */}
          <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-md font-medium text-green-800 mb-3">Período</h4>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={filters.anio}
                onChange={(e) => handleFilterChange('anio', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <select
                value={filters.mes}
                onChange={(e) => handleFilterChange('mes', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="01">Enero</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- CARDS DE ESTADÍSTICAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* --- TABLA DE DATOS --- */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalle por {filters.tipo_filtro}</h2>

        {loading ? (
          <div className="text-center py-12 text-gray-500 animate-pulse">Cargando información...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 font-medium">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-white" style={{ backgroundColor: '#003871' }}>
                  <th className="px-4 py-3 text-center font-bold border-r-2 border-black">#</th>
                  <th className="px-4 py-3 text-left font-bold border-r-2 border-black">GRUPO</th>
                  <th className="px-4 py-3 text-center font-bold border-r-2 border-black">Q POL</th>
                  <th className="px-4 py-3 text-center font-bold">R12</th>
                </tr>
              </thead>
              <tbody>
                {listadoData?.map((item: any, index: number) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-[#3382af85] ${index < 3
                      ? 'bg-yellow-50 font-semibold'
                      : index % 2 === 0
                        ? 'bg-white'
                        : 'bg-gray-50'
                      }`}
                  >
                    <td className={`px-4 py-2 text-center font-bold border-r-2 border-black ${index < 3 ? 'text-yellow-600' : 'text-gray-900'
                      }`}>
                      {index + 1}
                    </td>
                    <td className={`px-4 py-2 font-medium border-r-2 border-black ${index < 3 ? 'text-yellow-800' : 'text-gray-900'
                      }`}>
                      {item.nombre_grupo}
                    </td>
                    <td className={`px-4 py-2 text-center border-r-2 border-black ${index < 3 ? 'text-yellow-800 font-semibold' : 'text-gray-900'
                      }`}>
                      {item.q_pol}
                    </td>
                    <td className={`px-4 py-2 text-center ${index < 3 ? 'text-yellow-800 font-semibold' : 'text-gray-900'
                      }`}>
                      {item.r12}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div >
  );
}