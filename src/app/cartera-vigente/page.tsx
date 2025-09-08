'use client';

import StatCard from '@/components/dashboard/StatCard';
import { useState } from 'react';

export default function CarteraVigente() {
  const [filtro, setFiltro] = useState<'TODOS' | 'CAS' | 'ASSA' | 'ART'>('TODOS');
  
  // Estados para el filtro de fecha
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('10');
  const [tipoFiltro, setTipoFiltro] = useState('CANAL');


  // Función para obtener el nombre del mes
  const getMonthName = (month: string) => {
    const months = {
      '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
      '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
      '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
    };
    return months[month as keyof typeof months] || month;
  };

  // Función para generar variación basada en fecha
  const getDateVariation = (baseValue: number, year: string, month: string) => {
    const yearFactor = parseInt(year) - 2024; // Factor de crecimiento anual
    
    // Variación anual (crecimiento del 5-8% por año)
    const annualGrowth = 1 + (yearFactor * 0.06);
    
    // Variación estacional (algunos meses tienen más actividad)
    const seasonalFactors = {
      '01': 0.95, '02': 0.98, '03': 1.05, '04': 1.02,
      '05': 1.08, '06': 1.12, '07': 1.15, '08': 1.10,
      '09': 1.18, '10': 1.20, '11': 1.15, '12': 1.25
    };
    const seasonalFactor = seasonalFactors[month as keyof typeof seasonalFactors] || 1.0;
    
    // Variación aleatoria pequeña (±3%)
    const randomFactor = 0.97 + (Math.random() * 0.06);
    
    return Math.round(baseValue * annualGrowth * seasonalFactor * randomFactor);
  };

  // Función para generar datos dinámicos de tabla
  const getDynamicTableData = () => {
    const baseData = {
      CANAL: [
        { nombre: 'CANAL DIRECTO', qPol: 15420, r12: 2850000000 },
        { nombre: 'CANAL FILIALES', qPol: 12850, r12: 2450000000 },
        { nombre: 'CANAL PAS', qPol: 11200, r12: 1980000000 }
      ],
      RAMO: [
        { nombre: 'AUTOMOTORES', qPol: 18500, r12: 3200000000 },
        { nombre: 'VIDA', qPol: 15200, r12: 2850000000 },
        { nombre: 'SALUD', qPol: 12800, r12: 2450000000 },
        { nombre: 'ACCIDENTES PERSONALES', qPol: 11200, r12: 1980000000 },
        { nombre: 'INCENDIO', qPol: 9800, r12: 1750000000 },
        { nombre: 'RESPONSABILIDAD CIVIL', qPol: 8500, r12: 1520000000 },
        { nombre: 'ROBO', qPol: 7200, r12: 1280000000 },
        { nombre: 'TRANSPORTE', qPol: 6800, r12: 1150000000 },
        { nombre: 'GARANTÍA', qPol: 6200, r12: 980000000 },
        { nombre: 'CRÉDITO', qPol: 5800, r12: 850000000 },
        { nombre: 'TECNOLÓGICO', qPol: 5200, r12: 720000000 },
        { nombre: 'PROFESIONAL', qPol: 4800, r12: 650000000 },
        { nombre: 'DIRECTORES Y FUNCIONARIOS', qPol: 4200, r12: 580000000 },
        { nombre: 'CYBER', qPol: 3800, r12: 520000000 },
        { nombre: 'CATASTRÓFICO', qPol: 3400, r12: 480000000 },
        { nombre: 'MARÍTIMO', qPol: 3000, r12: 420000000 },
        { nombre: 'AERONÁUTICO', qPol: 2800, r12: 380000000 },
        { nombre: 'NUCLEAR', qPol: 2500, r12: 350000000 },
        { nombre: 'ENERGÍA', qPol: 2200, r12: 320000000 },
        { nombre: 'VARIOS', qPol: 2000, r12: 290000000 }
      ],
      CIA: [
        { nombre: 'ASSA COMPAÑÍA DE SEGUROS', qPol: 28500, r12: 4850000000 },
        { nombre: 'CAS COMPAÑÍA DE SEGUROS', qPol: 25200, r12: 4200000000 },
        { nombre: 'ART COMPAÑÍA DE SEGUROS', qPol: 22800, r12: 3850000000 },
        { nombre: 'SURA SEGUROS', qPol: 19800, r12: 3200000000 },
        { nombre: 'BOLÍVAR SEGUROS', qPol: 17500, r12: 2850000000 },
        { nombre: 'LIBERTY SEGUROS', qPol: 15200, r12: 2450000000 },
        { nombre: 'MAPFRE SEGUROS', qPol: 12800, r12: 1980000000 },
        { nombre: 'AXA COLPATRIA', qPol: 11200, r12: 1750000000 },
        { nombre: 'ZURICH SEGUROS', qPol: 9800, r12: 1520000000 },
        { nombre: 'ALLIANZ SEGUROS', qPol: 8500, r12: 1280000000 },
        { nombre: 'HDI SEGUROS', qPol: 7200, r12: 1150000000 },
        { nombre: 'CHUBB SEGUROS', qPol: 6800, r12: 980000000 },
        { nombre: 'GENERALI SEGUROS', qPol: 6200, r12: 850000000 },
        { nombre: 'HDI SEGUROS', qPol: 5800, r12: 720000000 },
        { nombre: 'EQUIDAD SEGUROS', qPol: 5200, r12: 650000000 },
        { nombre: 'POSITIVA SEGUROS', qPol: 4800, r12: 580000000 },
        { nombre: 'ALIANZA SEGUROS', qPol: 4200, r12: 520000000 },
        { nombre: 'SEGUROS DEL ESTADO', qPol: 3800, r12: 480000000 },
        { nombre: 'FASECOLDA', qPol: 3400, r12: 420000000 },
        { nombre: 'OTRAS COMPAÑÍAS', qPol: 3000, r12: 380000000 }
      ]
    };

    // Aplicar variaciones dinámicas
    const dynamicData: Record<string, Array<{nombre: string, qPol: number, r12: number}>> = {};
    Object.keys(baseData).forEach(key => {
      dynamicData[key] = baseData[key as keyof typeof baseData].map(item => ({
        ...item,
        qPol: getDateVariation(item.qPol, selectedYear, selectedMonth),
        r12: getDateVariation(item.r12, selectedYear, selectedMonth)
      }));
    });

    return dynamicData;
  };

  // Obtener datos dinámicos basados en la fecha seleccionada
  const tablaData = getDynamicTableData();

  // Función para generar estadísticas dinámicas por compañía
  const getDynamicStats = () => {
    const baseStats = {
      TODOS: {
        asegurados: 3500,
        primaAnual: 218844404,
        capitas: 270
      },
      CAS: {
        asegurados: 1500,
        primaAnual: 80000000,
        capitas: 90
      },
      ASSA: {
        asegurados: 1200,
        primaAnual: 70000000,
        capitas: 110
      },
      ART: {
        asegurados: 800,
        primaAnual: 68844404,
        capitas: 70
      }
    };

    const dynamicStats: Record<string, Array<{title: string, value: string, icon: string, color: 'green' | 'blue' | 'red' | 'purple'}>> = {};
    Object.keys(baseStats).forEach(compania => {
      const base = baseStats[compania as keyof typeof baseStats];
      const aseguradosVariado = getDateVariation(base.asegurados, selectedYear, selectedMonth);
      const primaAnualVariada = getDateVariation(base.primaAnual, selectedYear, selectedMonth);
      const capitasVariadas = getDateVariation(base.capitas, selectedYear, selectedMonth);
      const primaMensual = Math.round(primaAnualVariada / 12);

      dynamicStats[compania] = [
        {
          title: 'Cantidad de Pólizas',
          value: aseguradosVariado.toLocaleString(),
          icon: 'fa-solid fa-users',
          color: 'green' as const,
        },
        {
          title: 'Prima Anual emitida',
          value: `$ ${primaAnualVariada.toLocaleString()}`,
          icon: 'fa-regular fa-id-badge',
          color: 'blue' as const,
        },
        {
          title: 'Prima Mensual emitida',
          value: `$ ${primaMensual.toLocaleString()}`,
          icon: 'fa-solid fa-calendar-day',
          color: 'purple' as const,
        },
        {
          title: compania === 'TODOS' ? 'Cantidad de Cápitas' : 'Cancelaciones',
          value: capitasVariadas.toLocaleString(),
          icon: 'fa-solid fa-ban',
          color: 'red' as const,
        },
      ];
    });

    return dynamicStats;
  };

  // Datos de ejemplo por compañía
  const statsPorCompania = getDynamicStats();


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
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
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
        {statsPorCompania[filtro].map((stat, i: number) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      
      {/* Tabla Top 20 */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top 20 - {tipoFiltro}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-white" style={{backgroundColor: '#003871'}}>
                  <th className="px-4 py-3 text-center font-bold border-r-2 border-black">#</th>
                  <th className="px-4 py-3 text-left font-bold border-r-2 border-black">GRUPO</th>
                  <th className="px-4 py-3 text-center font-bold border-r-2 border-black">Q POL</th>
                  <th className="px-4 py-3 text-center font-bold">R12 (Pesos)</th>
                </tr>
              </thead>
              <tbody>
                {tablaData[tipoFiltro as keyof typeof tablaData].map((item, index: number) => (
                  <tr 
                    key={index}
                    className={`border-b hover:bg-[#3382af85] ${
                      index < 3 
                        ? 'bg-yellow-50 font-semibold' 
                        : index % 2 === 0 
                          ? 'bg-white' 
                          : 'bg-gray-50'
                    }`}
                  >
                    <td className={`px-4 py-2 text-center font-bold border-r-2 border-black ${
                      index < 3 ? 'text-yellow-600' : 'text-gray-900'
                    }`}>
                      {index + 1}
                    </td>
                    <td className={`px-4 py-2 font-medium border-r-2 border-black ${
                      index < 3 ? 'text-yellow-800' : 'text-gray-900'
                    }`}>
                      {item.nombre}
                    </td>
                    <td className={`px-4 py-2 text-center border-r-2 border-black ${
                      index < 3 ? 'text-yellow-800 font-semibold' : 'text-gray-900'
                    }`}>
                      {item.qPol.toLocaleString()}
                    </td>
                    <td className={`px-4 py-2 text-center ${
                      index < 3 ? 'text-yellow-800 font-semibold' : 'text-gray-900'
                    }`}>
                      ${item.r12.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
