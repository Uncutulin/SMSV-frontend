'use client';

import StatCard from '@/components/dashboard/StatCard';
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import { useState, useEffect } from 'react';

export default function CarteraVigente() {
  const [filtro, setFiltro] = useState<'TODOS' | 'CAS' | 'ASSA' | 'ART'>('TODOS');
  
  // Estados para el filtro de fecha
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('10');
  const [filterApplied, setFilterApplied] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState('CANAL');

  // useEffect para aplicar el filtro automáticamente
  useEffect(() => {
    setFilterApplied(true);
  }, [selectedYear, selectedMonth]);

  // Función para obtener el nombre del mes
  const getMonthName = (month: string) => {
    const months = {
      '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
      '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
      '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
    };
    return months[month as keyof typeof months] || month;
  };

  // Datos del top 20 con números realistas basados en la imagen
  const tablaData = {
    CANAL: [
      { nombre: 'CANAL DIRECTO', qPol: 15420, r12: 2850000000 },
      { nombre: 'AGROSINERGIS S.A', qPol: 12850, r12: 2450000000 },
      { nombre: 'ARAMBEL MARIA GRACIELA', qPol: 11200, r12: 1980000000 },
      { nombre: 'ARCE JULIO DANIEL', qPol: 9850, r12: 1750000000 },
      { nombre: 'ARENA ALBERTO SEBASTIAN', qPol: 8750, r12: 1520000000 },
      { nombre: 'CARARA', qPol: 7200, r12: 1280000000 },
      { nombre: 'AYAS VIVIANA ANDREA', qPol: 6800, r12: 1150000000 },
      { nombre: 'FILIAL NEUQUEN', qPol: 6200, r12: 980000000 },
      { nombre: 'BACCIT MARIANO', qPol: 5800, r12: 850000000 },
      { nombre: 'BALMACEDA PAOLA', qPol: 5200, r12: 720000000 },
      { nombre: 'BALVERDI, RICARDO LEOPOLDO JESUS', qPol: 4800, r12: 650000000 },
      { nombre: 'JAACKS', qPol: 4200, r12: 580000000 },
      { nombre: 'FILIAL EL PALOMAR', qPol: 3800, r12: 520000000 },
      { nombre: 'BELLOCCHIO, CESAR ROMAN', qPol: 3400, r12: 480000000 },
      { nombre: 'BENEDETTI ANDREA', qPol: 3000, r12: 420000000 },
      { nombre: 'BERGALLO, JORGE IGNACIO', qPol: 2800, r12: 380000000 },
      { nombre: 'BERRIOS ALVAREZ, JUAN CARLOS', qPol: 2500, r12: 350000000 },
      { nombre: 'BLANCO RODRIGO LUIS', qPol: 2200, r12: 320000000 },
      { nombre: 'BOCCHIA MAXIMILIANO', qPol: 2000, r12: 290000000 },
      { nombre: 'FILIAL LOMAS DE ZAMORA', qPol: 1800, r12: 260000000 }
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

  // Datos de ejemplo por compañía
  const statsPorCompania = {
    TODOS: [
      {
        title: 'Asegurados Activos',
        value: '3.500',
        icon: 'fa-solid fa-users',
        color: 'green' as const,
      },
      {
        title: 'Prima Anual emitida',
        value: '$ 218.844.404',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
      },
      {
        title: 'Cantidad de Cápitas',
        value: '270',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
      },
    ],
    CAS: [
      {
        title: 'Asegurados Activos',
        value: '1.500',
        icon: 'fa-solid fa-users',
        color: 'green' as const,
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 80.000.000',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
      },
      {
        title: 'Cancelaciones',
        value: '90',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
      },
    ],
    ASSA: [
      {
        title: 'Asegurados Activos',
        value: '1.200',
        icon: 'fa-solid fa-users',
        color: 'green' as const,
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 70.000.000',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
      },
      {
        title: 'Cancelaciones',
        value: '110',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
      },
    ],
    ART: [
      {
        title: 'Asegurados Activos',
        value: '800',
        icon: 'fa-solid fa-users',
        color: 'green' as const,
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 68.844.404',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
      },
      {
        title: 'Cancelaciones',
        value: '70',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
      },
    ],
  };

  // Datos del ranking de PAS (GRUPO) por compañía
  const rankingPASData = {
    TODOS: {
      chart: { type: 'bar', height: 400 },
      xAxis: {
        categories: ['PAS GRUPO 1', 'PAS GRUPO 2', 'PAS GRUPO 3', 'PAS GRUPO 4', 'PAS GRUPO 5'],
        title: { text: 'Grupos PAS' },
      },
      yAxis: {
        min: 0,
        title: { text: 'Cantidad de Pólizas' },
        labels: { overflow: 'justify' },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            align: 'right',
            inside: false,
            style: { fontWeight: 'bold' },
          },
          borderRadius: 4,
          pointPadding: 0.2,
        },
      },
      series: [
        {
          name: 'CAS',
          data: [1200, 950, 800, 600, 400],
          color: '#004376',
        },
        {
          name: 'ASSA',
          data: [1000, 750, 650, 500, 350],
          color: '#007cc5',
        },
        {
          name: 'ART',
          data: [800, 600, 500, 400, 250],
          color: '#74671f',
        },
      ],
      credits: { enabled: false },
      legend: { enabled: true },
    },
    CAS: {
      chart: { type: 'bar', height: 400 },
      xAxis: {
        categories: ['PAS GRUPO 1', 'PAS GRUPO 2', 'PAS GRUPO 3', 'PAS GRUPO 4', 'PAS GRUPO 5'],
        title: { text: 'Grupos PAS' },
      },
      yAxis: {
        min: 0,
        title: { text: 'Cantidad de Pólizas' },
        labels: { overflow: 'justify' },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            align: 'right',
            inside: false,
            style: { fontWeight: 'bold' },
          },
          borderRadius: 4,
          pointPadding: 0.2,
        },
      },
      series: [
        {
          name: 'CAS',
          data: [1200, 950, 800, 600, 400],
          color: '#004376',
        },
      ],
      credits: { enabled: false },
      legend: { enabled: true },
    },
    ASSA: {
      chart: { type: 'bar', height: 400 },
      xAxis: {
        categories: ['PAS GRUPO 1', 'PAS GRUPO 2', 'PAS GRUPO 3', 'PAS GRUPO 4', 'PAS GRUPO 5'],
        title: { text: 'Grupos PAS' },
      },
      yAxis: {
        min: 0,
        title: { text: 'Cantidad de Pólizas' },
        labels: { overflow: 'justify' },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            align: 'right',
            inside: false,
            style: { fontWeight: 'bold' },
          },
          borderRadius: 4,
          pointPadding: 0.2,
        },
      },
      series: [
        {
          name: 'ASSA',
          data: [1000, 750, 650, 500, 350],
          color: '#007cc5',
        },
      ],
      credits: { enabled: false },
      legend: { enabled: true },
    },
    ART: {
      chart: { type: 'bar', height: 400 },
      xAxis: {
        categories: ['PAS GRUPO 1', 'PAS GRUPO 2', 'PAS GRUPO 3', 'PAS GRUPO 4', 'PAS GRUPO 5'],
        title: { text: 'Grupos PAS' },
      },
      yAxis: {
        min: 0,
        title: { text: 'Cantidad de Pólizas' },
        labels: { overflow: 'justify' },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            align: 'right',
            inside: false,
            style: { fontWeight: 'bold' },
          },
          borderRadius: 4,
          pointPadding: 0.2,
        },
      },
      series: [
        {
          name: 'ART',
          data: [800, 600, 500, 400, 250],
          color: '#74671f',
        },
      ],
      credits: { enabled: false },
      legend: { enabled: true },
    },
  };

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsPorCompania[filtro].map((stat, i) => (
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
                {tablaData[tipoFiltro as keyof typeof tablaData].map((item, index) => (
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
