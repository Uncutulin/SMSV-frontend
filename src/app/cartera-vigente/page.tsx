'use client';

import StatCard from '@/components/dashboard/StatCard';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);
export default function CarteraVigente() {
  const [filtro, setFiltro] = useState<'TODOS' | 'CAS' | 'ASSA' | 'ART'>('TODOS');

  // Estados para el filtro de fecha
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('10');
  const [tipoFiltro, setTipoFiltro] = useState('CANAL');

  // Estados para datos de API
  const [apiData, setApiData] = useState<Array<{ grupo: string, q_pol: number, r12: string }>>([]);
  const [statsData, setStatsData] = useState<{ cantidad_polizas: number, prima_mensual: string, prima_anual: number, capitas: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el nombre del mes
  const getMonthName = (month: string) => {
    const months = {
      '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
      '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
      '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
    };
    return months[month as keyof typeof months] || month;
  };

  // Efecto para cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setStatsData(null);
      setError(null);
      try {
        const queryParams = new URLSearchParams({
          anio: selectedYear,
          mes: selectedMonth,
          compania: filtro,
          tipo_filtro: tipoFiltro
        });

        // Fetch tabla
        const responseTabla = await fetch(`${API_URL}/api/cartera-vigente?${queryParams.toString()}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!responseTabla.ok) throw new Error('Error al cargar tabla');
        const resultTabla = await responseTabla.json();

        if (resultTabla.status === 'success') {
          setApiData(resultTabla.data);
        } else {
          setError('Error en respuesta de tabla');
        }

        // Fetch indicadores
        const responseStats = await fetch(`${API_URL}/api/cartera-vigente/indicadores?${queryParams.toString()}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!responseStats.ok) throw new Error('Error al cargar indicadores');
        const resultStats = await responseStats.json();

        if (resultStats.status === 'success') {
          setStatsData(resultStats.resumen);
        }

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos. Por favor intente nuevamente.');
        setApiData([]);
        setStatsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth, filtro, tipoFiltro]);

  // Función para generar estadísticas dinámicas
  const getDynamicStats = () => {
    const stats = [
      {
        title: 'Cantidad de Pólizas',
        value: statsData?.cantidad_polizas ? statsData.cantidad_polizas.toLocaleString('es-AR') : '-',
        icon: 'fa-solid fa-file-contract',
        color: 'green' as const,
      },
      {
        title: 'Prima Anual emitida',
        value: statsData?.prima_anual ? `$ ${statsData.prima_anual.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
      },
      {
        title: 'Prima Mensual emitida',
        value: statsData?.prima_mensual ? `$ ${parseFloat(statsData.prima_mensual).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-',
        icon: 'fa-solid fa-calendar-day',
        color: 'purple' as const,
      },
      {
        title: 'Cantidad de Cápitas',
        value: statsData?.capitas ? parseFloat(statsData.capitas).toLocaleString('es-AR') : '-',
        icon: 'fa-solid fa-user',
        color: 'red' as const,
      },
    ];

    return stats;
  };

  // Datos de ejemplo por compañía
  const statsCards = getDynamicStats();

  return (
    <div className="space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Cartera Vigente</h1>
        <p className="text-gray-600 mt-2">{getMonthName(selectedMonth)} {selectedYear}</p>
      </div>

      {/* Bloque de filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro</h3>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filtro de compañía */}
          <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-md font-medium text-blue-800 mb-3">Compañía</h4>
            <label className="block text-sm font-medium text-gray-700 mb-2"> &nbsp; </label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value as 'TODOS' | 'CAS' | 'ASSA' | 'ART')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="TODOS">TODOS</option>
              <option value="CAS">CAS</option>
              <option value="ASSA">ASSA</option>
              <option value="ART">ART</option>
            </select>
          </div>

          {/* Filtro de tipo */}
          <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="text-md font-medium text-purple-800 mb-3">Tipo de Filtro</h4>
            <label className="block text-sm font-medium text-gray-700 mb-2"> &nbsp; </label>
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="CANAL">CANAL</option>
              <option value="RAMO">RAMO</option>
              <option value="CIA">CIA</option>
              <option value="PRODUCTORES">PRODUCTORES</option>
              <option value="EJECUTIVO">EJECUTIVO</option>
            </select>
          </div>

          {/* Filtro de fecha */}
          <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-md font-medium text-green-800 mb-3">Período</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="2025">2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i: number) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Tabla Top 20 */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top 20 - {tipoFiltro}</h2>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Cargando datos...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
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
                  {apiData.map((item, index: number) => (
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
                        {item.grupo}
                      </td>
                      <td className={`px-4 py-2 text-center border-r-2 border-black ${index < 3 ? 'text-yellow-800 font-semibold' : 'text-gray-900'
                        }`}>
                        {item.q_pol.toLocaleString('es-AR')}
                      </td>
                      <td className={`px-4 py-2 text-center ${index < 3 ? 'text-yellow-800 font-semibold' : 'text-gray-900'
                        }`}>
                        ${parseFloat(item.r12).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                  {/* Fila de Total */}
                  {apiData.length > 0 && (
                    <tr className="bg-blue-100 font-bold border-t-2 border-blue-500">
                      <td className="px-4 py-3 text-center font-bold border-r-2 border-black text-blue-800">
                        TOTAL
                      </td>
                      <td className="px-4 py-3 font-bold border-r-2 border-black text-blue-800">
                        TOTAL
                      </td>
                      <td className="px-4 py-3 text-center font-bold border-r-2 border-black text-blue-800">
                        {apiData.reduce((sum, item) => sum + item.q_pol, 0).toLocaleString('es-AR')}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-blue-800">
                        ${apiData.reduce((sum, item) => sum + parseFloat(item.r12), 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
