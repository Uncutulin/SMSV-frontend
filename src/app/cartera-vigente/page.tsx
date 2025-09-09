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
        { nombre: 'SMSV SEGUROS', qPol: 28500, r12: 4850000000 },
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
    ],
    PRODUCTORES: [
      { nombre: 'AYAS VIVIANA ANDREA', qPol: 1250, r12: 185000000 },
      { nombre: 'CANAL DIRECTO', qPol: 1180, r12: 175000000 },
      { nombre: 'SOSA JOSE', qPol: 1120, r12: 165000000 },
      { nombre: 'TRUCCO, GUILLERMO', qPol: 1080, r12: 155000000 },
      { nombre: 'FILIAL LIBERTADOR', qPol: 1050, r12: 145000000 },
      { nombre: 'JUAREZ MATORRAS GUSTAVO', qPol: 1020, r12: 135000000 },
      { nombre: 'BORSELLA JORGE LUIS', qPol: 980, r12: 125000000 },
      { nombre: 'GALLARDO HECTOR', qPol: 950, r12: 115000000 },
      { nombre: 'FILIAL MENDOZA', qPol: 920, r12: 105000000 },
      { nombre: 'TOSOLINI PAMELA', qPol: 890, r12: 95000000 },
      { nombre: 'BLANCO RODRIGO LUIS', qPol: 860, r12: 85000000 },
      { nombre: 'FERNANDEZ BRAVO OSCAR ANDRES', qPol: 830, r12: 75000000 },
      { nombre: 'FIALA DARIO', qPol: 800, r12: 65000000 },
      { nombre: 'FILIAL MAR DEL PLATA', qPol: 770, r12: 55000000 },
      { nombre: 'CASTIELLA, LUIS RICARDO GUSTAVO', qPol: 740, r12: 45000000 },
      { nombre: 'FILIAL BAHIA BLANCA / PUNTA ALTA', qPol: 710, r12: 35000000 },
      { nombre: 'SZOCKI', qPol: 680, r12: 25000000 },
      { nombre: 'MONTAÑEZ MARCELO', qPol: 650, r12: 15000000 },
      { nombre: 'COMAS SANTIAGO', qPol: 620, r12: 12000000 },
      { nombre: 'ANDREA SIMIAN', qPol: 590, r12: 10000000 },
      { nombre: 'PALAZZO JOSE IGNACIO', qPol: 560, r12: 8000000 },
      { nombre: 'FILIAL OLIVOS', qPol: 530, r12: 6000000 },
      { nombre: 'RODRIGUEZ JOSE', qPol: 500, r12: 4000000 },
      { nombre: 'FILIAL LA PLATA', qPol: 470, r12: 3000000 },
      { nombre: 'CAROSSINO TOJO MANUEL', qPol: 440, r12: 2000000 },
      { nombre: 'FILIAL CORDOBA', qPol: 410, r12: 1500000 },
      { nombre: 'REYES', qPol: 380, r12: 1000000 },
      { nombre: 'FILIAL CAMPO DE MAYO', qPol: 350, r12: 800000 },
      { nombre: 'FILIAL PALERMO', qPol: 320, r12: 600000 },
      { nombre: 'VAN ZANDWEGHE PABLO', qPol: 290, r12: 400000 },
      { nombre: 'FILIAL MONTSERRAT', qPol: 260, r12: 300000 },
      { nombre: 'JAACKS', qPol: 230, r12: 200000 },
      { nombre: 'FILIAL MORON', qPol: 200, r12: 150000 },
      { nombre: 'FILIAL CONDOR', qPol: 170, r12: 100000 },
      { nombre: 'RODRIGUEZ MATIAS', qPol: 140, r12: 80000 },
      { nombre: 'MONZO', qPol: 110, r12: 60000 },
      { nombre: 'FILIAL EL PALOMAR', qPol: 80, r12: 40000 },
      { nombre: 'NEVA CLAUDIA', qPol: 50, r12: 20000 },
      { nombre: 'FILIAL LOMAS DE ZAMORA', qPol: 30, r12: 10000 },
      { nombre: 'SALVATORE RUBEN', qPol: 20, r12: 5000 },
      { nombre: 'FILIAL ROSARIO', qPol: 15, r12: 3000 },
      { nombre: 'FILIAL CENTINELA / GUARDACOSTAS', qPol: 10, r12: 2000 },
      { nombre: 'DI PAOLA', qPol: 8, r12: 1500 },
      { nombre: 'CERAR', qPol: 5, r12: 1000 },
      { nombre: 'GALARZA RODOLFO GABRIEL', qPol: 3, r12: 500 },
      { nombre: 'BORDIGONI ADRIANA / OTAMENDI JORGE', qPol: 1, r12: 100 }
    ]
  };

    // Datos específicos para ASSA y CIA
    const assaCiaData = [
      { nombre: 'SMG', qPol: 28500, r12: 4850000000 },
      { nombre: 'LMA', qPol: 25200, r12: 4200000000 },
      { nombre: 'SMG LIFE', qPol: 22800, r12: 3850000000 },
      { nombre: 'SANCOR', qPol: 19800, r12: 3200000000 },
      { nombre: 'ALLIANZ', qPol: 17500, r12: 2850000000 },
      { nombre: 'INTEGRITY', qPol: 15200, r12: 2450000000 },
      { nombre: 'FED PAT', qPol: 12800, r12: 1980000000 },
      { nombre: 'ATM', qPol: 11200, r12: 1750000000 },
      { nombre: 'SAN CRISTOBAL', qPol: 9800, r12: 1520000000 },
      { nombre: 'LIBRA', qPol: 8500, r12: 1280000000 },
      { nombre: 'PRUDENCIA', qPol: 7200, r12: 1150000000 },
      { nombre: 'COSENA', qPol: 6800, r12: 980000000 },
      { nombre: 'VICTORIA', qPol: 6200, r12: 850000000 },
      { nombre: 'AFIANZADORA', qPol: 5800, r12: 720000000 },
      { nombre: 'LA HOLANDO', qPol: 5200, r12: 650000000 },
      { nombre: 'RIVADAVIA', qPol: 4800, r12: 580000000 },
      { nombre: 'CHUBB', qPol: 4200, r12: 520000000 },
      { nombre: 'CAUCIONES', qPol: 3800, r12: 480000000 },
      { nombre: 'NOBLE', qPol: 3400, r12: 420000000 },
      { nombre: 'RUS', qPol: 3000, r12: 380000000 },
      { nombre: 'HDI', qPol: 2800, r12: 360000000 },
      { nombre: 'TRIUNFO', qPol: 2600, r12: 340000000 },
      { nombre: 'ZURICH', qPol: 2400, r12: 320000000 },
      { nombre: 'BOSTON', qPol: 2200, r12: 300000000 },
      { nombre: 'TPC', qPol: 2000, r12: 280000000 }
    ];

    // Datos específicos para CAS y CIA (solo SMSV SEGUROS)
    const casCiaData = [
      { nombre: 'SMSV SEGUROS', qPol: 28500, r12: 4850000000 }
    ];

    // Datos específicos para ART y CIA
    const artCiaData = [
      { nombre: 'ASOCIART ART', qPol: 28500, r12: 4850000000 },
      { nombre: 'PREVENCION ART', qPol: 25200, r12: 4200000000 },
      { nombre: 'PROVINCIA ART', qPol: 22800, r12: 3850000000 },
      { nombre: 'FED PAT', qPol: 19800, r12: 3200000000 },
      { nombre: 'SMG ART', qPol: 17500, r12: 2850000000 },
      { nombre: 'ANDINA ART', qPol: 15200, r12: 2450000000 },
      { nombre: 'EXPERTA ART', qPol: 12800, r12: 1980000000 },
      { nombre: 'LA HOLANDO ART', qPol: 11200, r12: 1750000000 },
      { nombre: 'GALENO ART', qPol: 9800, r12: 1520000000 },
      { nombre: 'OMINT ART', qPol: 8500, r12: 1280000000 },
      { nombre: 'VICTORIA ART', qPol: 7200, r12: 1150000000 }
    ];

    // Datos para TODOS + CIA (combinación de ASSA + ART)
    const todosCiaData = [
      { nombre: 'SMSV SEGUROS', qPol: 28500, r12: 4850000000 },
      { nombre: 'SMG', qPol: 25200, r12: 4200000000 },
      { nombre: 'LMA', qPol: 22800, r12: 3850000000 },
      { nombre: 'SMG LIFE', qPol: 19800, r12: 3200000000 },
      { nombre: 'SANCOR', qPol: 17500, r12: 2850000000 },
      { nombre: 'ALLIANZ', qPol: 15200, r12: 2450000000 },
      { nombre: 'INTEGRITY', qPol: 12800, r12: 1980000000 },
      { nombre: 'FED PAT', qPol: 11200, r12: 1750000000 },
      { nombre: 'ATM', qPol: 9800, r12: 1520000000 },
      { nombre: 'SAN CRISTOBAL', qPol: 8500, r12: 1280000000 },
      { nombre: 'LIBRA', qPol: 7200, r12: 1150000000 },
      { nombre: 'PRUDENCIA', qPol: 6800, r12: 980000000 },
      { nombre: 'COSENA', qPol: 6200, r12: 850000000 },
      { nombre: 'VICTORIA', qPol: 5800, r12: 720000000 },
      { nombre: 'AFIANZADORA', qPol: 5200, r12: 650000000 },
      { nombre: 'LA HOLANDO', qPol: 4800, r12: 580000000 },
      { nombre: 'RIVADAVIA', qPol: 4200, r12: 520000000 },
      { nombre: 'CHUBB', qPol: 3800, r12: 480000000 },
      { nombre: 'CAUCIONES', qPol: 3400, r12: 420000000 },
      { nombre: 'NOBLE', qPol: 3000, r12: 380000000 },
      { nombre: 'RUS', qPol: 2800, r12: 360000000 },
      { nombre: 'HDI', qPol: 2600, r12: 340000000 },
      { nombre: 'TRIUNFO', qPol: 2400, r12: 320000000 },
      { nombre: 'ZURICH', qPol: 2200, r12: 300000000 },
      { nombre: 'BOSTON', qPol: 2000, r12: 280000000 },
      { nombre: 'TPC', qPol: 1800, r12: 260000000 },
      { nombre: 'ASOCIART ART', qPol: 1600, r12: 240000000 },
      { nombre: 'PREVENCION ART', qPol: 1400, r12: 220000000 },
      { nombre: 'PROVINCIA ART', qPol: 1200, r12: 200000000 },
      { nombre: 'SMG ART', qPol: 1000, r12: 180000000 },
      { nombre: 'ANDINA ART', qPol: 800, r12: 160000000 },
      { nombre: 'EXPERTA ART', qPol: 600, r12: 140000000 },
      { nombre: 'LA HOLANDO ART', qPol: 400, r12: 120000000 },
      { nombre: 'GALENO ART', qPol: 200, r12: 100000000 },
      { nombre: 'OMINT ART', qPol: 150, r12: 80000000 },
      { nombre: 'VICTORIA ART', qPol: 100, r12: 60000000 }
    ];

    // Aplicar variaciones dinámicas
    const dynamicData: Record<string, Array<{nombre: string, qPol: number, r12: number}>> = {};
    Object.keys(baseData).forEach(key => {
      // Si es CIA y el filtro es ASSA, usar datos específicos de ASSA
      if (key === 'CIA' && filtro === 'ASSA') {
        dynamicData[key] = assaCiaData.map(item => ({
          ...item,
          qPol: getDateVariation(item.qPol, selectedYear, selectedMonth),
          r12: getDateVariation(item.r12, selectedYear, selectedMonth)
        }));
      }
      // Si es CIA y el filtro es CAS, usar solo SMSV SEGUROS
      else if (key === 'CIA' && filtro === 'CAS') {
        dynamicData[key] = casCiaData.map(item => ({
          ...item,
          qPol: getDateVariation(item.qPol, selectedYear, selectedMonth),
          r12: getDateVariation(item.r12, selectedYear, selectedMonth)
        }));
      }
      // Si es CIA y el filtro es ART, usar datos específicos de ART
      else if (key === 'CIA' && filtro === 'ART') {
        dynamicData[key] = artCiaData.map(item => ({
          ...item,
          qPol: getDateVariation(item.qPol, selectedYear, selectedMonth),
          r12: getDateVariation(item.r12, selectedYear, selectedMonth)
        }));
      }
      // Si es CIA y el filtro es TODOS, usar datos combinados (ASSA + ART)
      else if (key === 'CIA' && filtro === 'TODOS') {
        dynamicData[key] = todosCiaData.map(item => ({
          ...item,
          qPol: getDateVariation(item.qPol, selectedYear, selectedMonth),
          r12: getDateVariation(item.r12, selectedYear, selectedMonth)
        }));
      } else {
        dynamicData[key] = baseData[key as keyof typeof baseData].map(item => ({
          ...item,
          qPol: getDateVariation(item.qPol, selectedYear, selectedMonth),
          r12: getDateVariation(item.r12, selectedYear, selectedMonth)
        }));
      }
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
          value: aseguradosVariado.toLocaleString('es-AR'),
          icon: 'fa-solid fa-file-contract',
          color: 'green' as const,
        },
        {
          title: 'Prima Anual emitida',
          value: `$ ${primaAnualVariada.toLocaleString('es-AR')}`,
          icon: 'fa-regular fa-id-badge',
          color: 'blue' as const,
        },
        {
          title: 'Prima Mensual emitida',
          value: `$ ${primaMensual.toLocaleString('es-AR')}`,
          icon: 'fa-solid fa-calendar-day',
          color: 'purple' as const,
        },
        {
          title: compania === 'TODOS' ? 'Cantidad de Cápitas' : 'Cantidad de Cápitas',
          value: capitasVariadas.toLocaleString('es-AR'),
          icon: 'fa-solid fa-user',
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
              <option value="PRODUCTORES">PRODUCTORES</option>
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
                  <th className="px-4 py-3 text-center font-bold">R12</th>
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
                      {item.qPol.toLocaleString('es-AR')}
                    </td>
                    <td className={`px-4 py-2 text-center ${
                      index < 3 ? 'text-yellow-800 font-semibold' : 'text-gray-900'
                    }`}>
                      ${item.r12.toLocaleString('es-AR')}
                    </td>
                  </tr>
                ))}
                {/* Fila de Total */}
                <tr className="bg-blue-100 font-bold border-t-2 border-blue-500">
                  <td className="px-4 py-3 text-center font-bold border-r-2 border-black text-blue-800">
                    TOTAL
                  </td>
                  <td className="px-4 py-3 font-bold border-r-2 border-black text-blue-800">
                    TOTAL
                  </td>
                  <td className="px-4 py-3 text-center font-bold border-r-2 border-black text-blue-800">
                    {tablaData[tipoFiltro as keyof typeof tablaData].reduce((sum, item) => sum + item.qPol, 0).toLocaleString('es-AR')}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-blue-800">
                    ${tablaData[tipoFiltro as keyof typeof tablaData].reduce((sum, item) => sum + item.r12, 0).toLocaleString('es-AR')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
