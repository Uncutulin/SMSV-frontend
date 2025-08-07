"use client";
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EvolucionCartera() {
  const router = useRouter();
  const [showAssaTable, setShowAssaTable] = useState(false);
  const [showFilialesTable, setShowFilialesTable] = useState(false);
  const [showPasTable, setShowPasTable] = useState(false);
  const [showCallCenterTable, setShowCallCenterTable] = useState(false);
  const [showFilialesPasTable, setShowFilialesPasTable] = useState(false);
  const [rankingFilter, setRankingFilter] = useState<'con-art' | 'sin-art'>('con-art');

  const handleVerClick = (compania: string) => {
    console.log(`Ver detalles de ${compania}`);
    if (compania === 'CAS') {
      router.push('/cas-indicator');
    } else if (compania === 'ASSA') {
      router.push('/assa-indicator');
    } else {
      alert(`Ver detalles de ${compania}`);
    }
  };

  // Datos de los indicadores
  const indicadoresData = {
    CAS: {
      R12: {
        junio23: 1250000,
        julio23: 1320000,
        crecimiento: 70000,
        porcentaje: 5.6
      },
      Q_POL: {
        junio23: 850,
        julio23: 920,
        crecimiento: 70,
        porcentaje: 8.2
      }
    },
    ASSA: {
      R12: {
        junio23: 980000,
        julio23: 1050000,
        crecimiento: 70000,
        porcentaje: 7.1
      },
      Q_POL: {
        junio23: 650,
        julio23: 720,
        crecimiento: 70,
        porcentaje: 10.8
      }
    },
    ART: {
      R12: {
        junio23: 750000,
        julio23: 820000,
        crecimiento: 70000,
        porcentaje: 9.3
      },
      Q_POL: {
        junio23: 480,
        julio23: 550,
        crecimiento: 70,
        porcentaje: 14.6
      }
    }
  };

  // Calcular total de prima
  const totalPrima = 
    indicadoresData.CAS.R12.julio23 + 
    indicadoresData.ASSA.R12.julio23 + 
    indicadoresData.ART.R12.julio23;

  // Gráfico comparativo de R12 por compañía
  const r12ChartData = {
    chart: { type: 'column', height: 320 },
    xAxis: {
      categories: ['CAS', 'ASSA', 'ART'],
      title: { text: 'Compañía' },
    },
    yAxis: {
      title: { text: 'R12 (Millones $)' },
      min: 0,
      labels: {
        formatter: function (this: { value: number }) {
          if (this.value >= 1000000) return (this.value / 1000000) + ' M';
          if (this.value >= 1000) return (this.value / 1000) + ' mil';
          return this.value;
        }
      }
    },
    tooltip: {
      pointFormatter: function (this: { y: number }) {
        if (this.y >= 1000000) return '<b>' + (this.y / 1000000) + ' Millones</b>';
        if (this.y >= 1000) return '<b>' + (this.y / 1000) + ' mil</b>';
        return '<b>' + this.y + '</b>';
      }
    },
    series: [
      { 
        name: 'Julio 23', 
        data: [
          indicadoresData.CAS.R12.julio23,
          indicadoresData.ASSA.R12.julio23,
          indicadoresData.ART.R12.julio23
        ], 
        color: '#567caa' 
      },
      { 
        name: 'Junio 23', 
        data: [
          indicadoresData.CAS.R12.junio23,
          indicadoresData.ASSA.R12.junio23,
          indicadoresData.ART.R12.junio23
        ], 
        color: '#4ebeb0' 
      },
    ],
    credits: { enabled: false },
  };

  // Gráfico de torta de Q PÓL por compañía
  const qPolPieData = {
    chart: { type: 'pie', height: 320 },
    series: [
      {
        name: 'Q PÓL Julio 23',
        data: [
          { name: 'CAS', y: indicadoresData.CAS.Q_POL.julio23, color: '#567caa' },
          { name: 'ASSA', y: indicadoresData.ASSA.Q_POL.julio23, color: '#4ebeb0' },
          { name: 'ART', y: indicadoresData.ART.Q_POL.julio23, color: '#fa9426' },
        ],
      },
    ],
    credits: { enabled: false },
    legend: { enabled: true },
  };

  // Gráfico de evolución de R12 (Junio vs Julio)
  const r12EvolutionData = {
    chart: { type: 'line', height: 320 },
    xAxis: {
      categories: ['Junio 23', 'Julio 23'],
      title: { text: 'Período' },
    },
    yAxis: {
      title: { text: 'R12 (Millones $)' },
      min: 0,
      labels: {
        formatter: function (this: { value: number }) {
          if (this.value >= 1000000) return (this.value / 1000000) + ' M';
          if (this.value >= 1000) return (this.value / 1000) + ' mil';
          return this.value;
        }
      }
    },
    tooltip: {
      pointFormatter: function (this: { y: number }) {
        if (this.y >= 1000000) return '<b>' + (this.y / 1000000) + ' Millones</b>';
        if (this.y >= 1000) return '<b>' + (this.y / 1000) + ' mil</b>';
        return '<b>' + this.y + '</b>';
      }
    },
    series: [
      { 
        name: 'CAS', 
        data: [indicadoresData.CAS.R12.junio23, indicadoresData.CAS.R12.julio23], 
        color: '#567caa' 
      },
      { 
        name: 'ASSA', 
        data: [indicadoresData.ASSA.R12.junio23, indicadoresData.ASSA.R12.julio23], 
        color: '#4ebeb0' 
      },
      { 
        name: 'ART', 
        data: [indicadoresData.ART.R12.junio23, indicadoresData.ART.R12.julio23], 
        color: '#fa9426' 
      },
    ],
    credits: { enabled: false },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">EVOLUCIÓN DE CARTERA ASSA + CAS</h1>
          <p className="text-gray-600 mt-2">Indicadores R12 y Q PÓL - Junio vs Julio 2023</p>
        </div>

        {/* Indicadores por compañía */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* CAS */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 flex justify-between items-center">
              <h3 className="text-lg font-bold">CAS</h3>
              <button
                onClick={() => handleVerClick('CAS')}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 bg-white text-blue-700 hover:bg-blue-50 flex items-center gap-2 border border-blue-300"
              >
                <i className="fa-solid fa-eye"></i>
                Ver
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-2 py-2 text-left font-semibold text-blue-800 text-xs">Indicadores</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">Junio 23</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">Julio 23</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">Crec.</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <td className="px-2 py-2 font-semibold text-blue-800 text-xs">R12</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.CAS.R12.junio23.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.CAS.R12.julio23.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.CAS.R12.crecimiento.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.CAS.R12.porcentaje}%</td>
                  </tr>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <td className="px-2 py-2 font-semibold text-blue-800 text-xs">Q PÓL</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.CAS.Q_POL.junio23}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.CAS.Q_POL.julio23}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">+{indicadoresData.CAS.Q_POL.crecimiento}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.CAS.Q_POL.porcentaje}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ASSA */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 flex justify-between items-center">
              <h3 className="text-lg font-bold">ASSA</h3>
              <button
                onClick={() => handleVerClick('ASSA')}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 bg-white text-blue-700 hover:bg-blue-50 flex items-center gap-2 border border-blue-300"
              >
                <i className="fa-solid fa-eye"></i>
                Ver
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-2 py-2 text-left font-semibold text-blue-800 text-xs">Indicadores</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">Junio 23</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">Julio 23</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">Crec.</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <td className="px-2 py-2 font-semibold text-blue-800 text-xs">R12</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ASSA.R12.junio23.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ASSA.R12.julio23.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ASSA.R12.crecimiento.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.ASSA.R12.porcentaje}%</td>
                  </tr>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <td className="px-2 py-2 font-semibold text-blue-800 text-xs">Q PÓL</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.ASSA.Q_POL.junio23}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.ASSA.Q_POL.julio23}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">+{indicadoresData.ASSA.Q_POL.crecimiento}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.ASSA.Q_POL.porcentaje}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ART */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2">
              <h3 className="text-lg font-bold">ART</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="px-2 py-2 text-left font-semibold text-amber-800 text-xs">Indicadores</th>
                    <th className="px-2 py-2 text-center font-semibold text-amber-800 text-xs">Junio 23</th>
                    <th className="px-2 py-2 text-center font-semibold text-amber-800 text-xs">Julio 23</th>
                    <th className="px-2 py-2 text-center font-semibold text-amber-800 text-xs">Crec.</th>
                    <th className="px-2 py-2 text-center font-semibold text-amber-800 text-xs">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-amber-100 border-b border-amber-200">
                    <td className="px-2 py-2 font-semibold text-amber-800 text-xs">R12</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ART.R12.junio23.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ART.R12.julio23.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ART.R12.crecimiento.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.ART.R12.porcentaje}%</td>
                  </tr>
                  <tr className="bg-amber-100 border-b border-amber-200">
                    <td className="px-2 py-2 font-semibold text-amber-800 text-xs">Q PÓL</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.ART.Q_POL.junio23}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.ART.Q_POL.julio23}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">+{indicadoresData.ART.Q_POL.crecimiento}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.ART.Q_POL.porcentaje}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Total Prima centrado abajo */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm">
            <div className="bg-red-600 text-white px-3 py-2 font-semibold text-center text-sm">
              TOTAL PRIMA
            </div>
            <div className="p-4 text-center">
              <div className="text-lg font-bold text-gray-900">
                $ {totalPrima.toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <button 
            onClick={() => {
              setShowAssaTable(false);
              setShowFilialesTable(false);
              setShowPasTable(false);
              setShowCallCenterTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            GRÁFICOS
          </button>
          <button 
            onClick={() => {
              setShowAssaTable(!showAssaTable);
              setShowFilialesTable(false);
              setShowPasTable(false);
              setShowCallCenterTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            ASSA POR RIESGO
          </button>
          <button 
            onClick={() => {
              setShowFilialesTable(!showFilialesTable);
              setShowAssaTable(false);
              setShowPasTable(false);
              setShowCallCenterTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            CANAL FILIALES POR FILIAL
          </button>
          <button 
            onClick={() => {
              setShowPasTable(!showPasTable);
              setShowAssaTable(false);
              setShowFilialesTable(false);
              setShowCallCenterTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            CANAL PAS POR RIESGO
          </button>
          <button 
            onClick={() => {
              setShowCallCenterTable(!showCallCenterTable);
              setShowAssaTable(false);
              setShowFilialesTable(false);
              setShowPasTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            CALL CENTER + CASA CENTRAL
          </button>
          <button 
            onClick={() => {
              setShowFilialesPasTable(!showFilialesPasTable);
              setShowAssaTable(false);
              setShowFilialesTable(false);
              setShowPasTable(false);
              setShowCallCenterTable(false);
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            FILIALES + PAS
          </button>
        </div>

        <hr className="my-8 border-gray-300" />

        {showAssaTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
              EVOLUCIÓN ASSA POR RIESGO
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">RIESGO</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>JUNIO 23</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>JULIO 23</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>CRECIMIENTO</th>
                  </tr>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-2 text-left font-semibold text-blue-800">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                  </tr>
                </thead>
                                 <tbody>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">AP</td>
                     <td className="px-4 py-2 text-center text-red-600">1,245</td>
                     <td className="px-4 py-2 text-center">$ 498,000</td>
                     <td className="px-4 py-2 text-center text-red-600">1,380</td>
                     <td className="px-4 py-2 text-center">$ 552,000</td>
                     <td className="px-4 py-2 text-center">+135</td>
                     <td className="px-4 py-2 text-center">+$ 54,000</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">AUTOMOTORES</td>
                     <td className="px-4 py-2 text-center text-red-600">2,156</td>
                     <td className="px-4 py-2 text-center">$ 862,400</td>
                     <td className="px-4 py-2 text-center text-red-600">2,340</td>
                     <td className="px-4 py-2 text-center">$ 936,000</td>
                     <td className="px-4 py-2 text-center">+184</td>
                     <td className="px-4 py-2 text-center">+$ 73,600</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">RC</td>
                     <td className="px-4 py-2 text-center text-red-600">890</td>
                     <td className="px-4 py-2 text-center">$ 356,000</td>
                     <td className="px-4 py-2 text-center text-red-600">945</td>
                     <td className="px-4 py-2 text-center">$ 378,000</td>
                     <td className="px-4 py-2 text-center">+55</td>
                     <td className="px-4 py-2 text-center">+$ 22,000</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">ROBO</td>
                     <td className="px-4 py-2 text-center text-red-600">567</td>
                     <td className="px-4 py-2 text-center">$ 226,800</td>
                     <td className="px-4 py-2 text-center text-red-600">612</td>
                     <td className="px-4 py-2 text-center">$ 244,800</td>
                     <td className="px-4 py-2 text-center">+45</td>
                     <td className="px-4 py-2 text-center">+$ 18,000</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">SALUD</td>
                     <td className="px-4 py-2 text-center text-red-600">1,789</td>
                     <td className="px-4 py-2 text-center">$ 715,600</td>
                     <td className="px-4 py-2 text-center text-red-600">1,890</td>
                     <td className="px-4 py-2 text-center">$ 756,000</td>
                     <td className="px-4 py-2 text-center">+101</td>
                     <td className="px-4 py-2 text-center">+$ 40,400</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">COMBINADO FAMILIAR</td>
                     <td className="px-4 py-2 text-center text-red-600">2,345</td>
                     <td className="px-4 py-2 text-center">$ 938,000</td>
                     <td className="px-4 py-2 text-center text-red-600">2,520</td>
                     <td className="px-4 py-2 text-center">$ 1,008,000</td>
                     <td className="px-4 py-2 text-center">+175</td>
                     <td className="px-4 py-2 text-center">+$ 70,000</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">VIDA OBLIGATORIO</td>
                     <td className="px-4 py-2 text-center text-red-600">3,456</td>
                     <td className="px-4 py-2 text-center">$ 1,382,400</td>
                     <td className="px-4 py-2 text-center text-red-600">3,680</td>
                     <td className="px-4 py-2 text-center">$ 1,472,000</td>
                     <td className="px-4 py-2 text-center">+224</td>
                     <td className="px-4 py-2 text-center">+$ 89,600</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">VIDA INDIVIDUAL</td>
                     <td className="px-4 py-2 text-center text-red-600">1,234</td>
                     <td className="px-4 py-2 text-center">$ 493,600</td>
                     <td className="px-4 py-2 text-center text-red-600">1,320</td>
                     <td className="px-4 py-2 text-center">$ 528,000</td>
                     <td className="px-4 py-2 text-center">+86</td>
                     <td className="px-4 py-2 text-center">+$ 34,400</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">INCENDIO</td>
                     <td className="px-4 py-2 text-center text-red-600">678</td>
                     <td className="px-4 py-2 text-center">$ 271,200</td>
                     <td className="px-4 py-2 text-center text-red-600">720</td>
                     <td className="px-4 py-2 text-center">$ 288,000</td>
                     <td className="px-4 py-2 text-center">+42</td>
                     <td className="px-4 py-2 text-center">+$ 16,800</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">INT. COMERCIO</td>
                     <td className="px-4 py-2 text-center text-red-600">445</td>
                     <td className="px-4 py-2 text-center">$ 178,000</td>
                     <td className="px-4 py-2 text-center text-red-600">480</td>
                     <td className="px-4 py-2 text-center">$ 192,000</td>
                     <td className="px-4 py-2 text-center">+35</td>
                     <td className="px-4 py-2 text-center">+$ 14,000</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">PRAXIS</td>
                     <td className="px-4 py-2 text-center text-red-600">789</td>
                     <td className="px-4 py-2 text-center">$ 315,600</td>
                     <td className="px-4 py-2 text-center text-red-600">840</td>
                     <td className="px-4 py-2 text-center">$ 336,000</td>
                     <td className="px-4 py-2 text-center">+51</td>
                     <td className="px-4 py-2 text-center">+$ 20,400</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">INT. CONSORCIO</td>
                     <td className="px-4 py-2 text-center text-red-600">234</td>
                     <td className="px-4 py-2 text-center">$ 93,600</td>
                     <td className="px-4 py-2 text-center text-red-600">255</td>
                     <td className="px-4 py-2 text-center">$ 102,000</td>
                     <td className="px-4 py-2 text-center">+21</td>
                     <td className="px-4 py-2 text-center">+$ 8,400</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">SEGURO TÉCNICO</td>
                     <td className="px-4 py-2 text-center text-red-600">123</td>
                     <td className="px-4 py-2 text-center">$ 49,200</td>
                     <td className="px-4 py-2 text-center text-red-600">135</td>
                     <td className="px-4 py-2 text-center">$ 54,000</td>
                     <td className="px-4 py-2 text-center">+12</td>
                     <td className="px-4 py-2 text-center">+$ 4,800</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">SEPELIO INDIVIDUAL</td>
                     <td className="px-4 py-2 text-center text-red-600">456</td>
                     <td className="px-4 py-2 text-center">$ 182,400</td>
                     <td className="px-4 py-2 text-center text-red-600">480</td>
                     <td className="px-4 py-2 text-center">$ 192,000</td>
                     <td className="px-4 py-2 text-center">+24</td>
                     <td className="px-4 py-2 text-center">+$ 9,600</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">AERONAVEGACIÓN</td>
                     <td className="px-4 py-2 text-center text-red-600">67</td>
                     <td className="px-4 py-2 text-center">$ 26,800</td>
                     <td className="px-4 py-2 text-center text-red-600">72</td>
                     <td className="px-4 py-2 text-center">$ 28,800</td>
                     <td className="px-4 py-2 text-center">+5</td>
                     <td className="px-4 py-2 text-center">+$ 2,000</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">CASCOS</td>
                     <td className="px-4 py-2 text-center text-red-600">89</td>
                     <td className="px-4 py-2 text-center">$ 35,600</td>
                     <td className="px-4 py-2 text-center text-red-600">96</td>
                     <td className="px-4 py-2 text-center">$ 38,400</td>
                     <td className="px-4 py-2 text-center">+7</td>
                     <td className="px-4 py-2 text-center">+$ 2,800</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">VIDA COLECTIVO</td>
                     <td className="px-4 py-2 text-center text-red-600">567</td>
                     <td className="px-4 py-2 text-center">$ 226,800</td>
                     <td className="px-4 py-2 text-center text-red-600">600</td>
                     <td className="px-4 py-2 text-center">$ 240,000</td>
                     <td className="px-4 py-2 text-center">+33</td>
                     <td className="px-4 py-2 text-center">+$ 13,200</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">TRANSPORTES</td>
                     <td className="px-4 py-2 text-center text-red-600">234</td>
                     <td className="px-4 py-2 text-center">$ 93,600</td>
                     <td className="px-4 py-2 text-center text-red-600">252</td>
                     <td className="px-4 py-2 text-center">$ 100,800</td>
                     <td className="px-4 py-2 text-center">+18</td>
                     <td className="px-4 py-2 text-center">+$ 7,200</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">CAUCIÓN</td>
                     <td className="px-4 py-2 text-center text-red-600">123</td>
                     <td className="px-4 py-2 text-center">$ 49,200</td>
                     <td className="px-4 py-2 text-center text-red-600">132</td>
                     <td className="px-4 py-2 text-center">$ 52,800</td>
                     <td className="px-4 py-2 text-center">+9</td>
                     <td className="px-4 py-2 text-center">+$ 3,600</td>
                   </tr>
                   <tr className="bg-gray-50 border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">RS. VS.</td>
                     <td className="px-4 py-2 text-center text-red-600">345</td>
                     <td className="px-4 py-2 text-center">$ 138,000</td>
                     <td className="px-4 py-2 text-center text-red-600">372</td>
                     <td className="px-4 py-2 text-center">$ 148,800</td>
                     <td className="px-4 py-2 text-center">+27</td>
                     <td className="px-4 py-2 text-center">+$ 10,800</td>
                   </tr>
                   <tr className="bg-white border-b">
                     <td className="px-4 py-2 font-medium text-gray-900">MOTOS</td>
                     <td className="px-4 py-2 text-center text-red-600">678</td>
                     <td className="px-4 py-2 text-center">$ 271,200</td>
                     <td className="px-4 py-2 text-center text-red-600">720</td>
                     <td className="px-4 py-2 text-center">$ 288,000</td>
                     <td className="px-4 py-2 text-center">+42</td>
                     <td className="px-4 py-2 text-center">+$ 16,800</td>
                   </tr>
                   <tr className="bg-blue-100 font-bold">
                     <td className="px-4 py-3 text-gray-900">Total general</td>
                     <td className="px-4 py-3 text-center text-gray-900">16,987</td>
                     <td className="px-4 py-3 text-center text-gray-900">$ 6,794,800</td>
                     <td className="px-4 py-3 text-center text-gray-900">18,240</td>
                     <td className="px-4 py-3 text-center text-gray-900">$ 7,296,000</td>
                     <td className="px-4 py-3 text-center text-gray-900">+1,253</td>
                     <td className="px-4 py-3 text-center text-gray-900">+$ 501,200</td>
                   </tr>
                 </tbody>
              </table>
            </div>
          </div>
        ) : showFilialesTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 text-white px-4 py-3 font-semibold">
              CANAL FILIALES POR FILIAL
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">FILIAL</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>JUNIO 23</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>JULIO 23</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>CRECIMIENTO</th>
                  </tr>
                  <tr className="bg-green-100">
                    <th className="px-4 py-2 text-left font-semibold text-green-800">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL BAHIA BLANCA / PUNTA ALTA</td>
                    <td className="px-4 py-2 text-center text-red-600">1,245</td>
                    <td className="px-4 py-2 text-center">$ 498,000</td>
                    <td className="px-4 py-2 text-center text-red-600">1,380</td>
                    <td className="px-4 py-2 text-center">$ 552,000</td>
                    <td className="px-4 py-2 text-center">+135</td>
                    <td className="px-4 py-2 text-center">+$ 54,000</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL CORDOBA</td>
                    <td className="px-4 py-2 text-center text-red-600">2,156</td>
                    <td className="px-4 py-2 text-center">$ 862,400</td>
                    <td className="px-4 py-2 text-center text-red-600">2,340</td>
                    <td className="px-4 py-2 text-center">$ 936,000</td>
                    <td className="px-4 py-2 text-center">+184</td>
                    <td className="px-4 py-2 text-center">+$ 73,600</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL EL PALOMAR</td>
                    <td className="px-4 py-2 text-center text-red-600">890</td>
                    <td className="px-4 py-2 text-center">$ 356,000</td>
                    <td className="px-4 py-2 text-center text-red-600">945</td>
                    <td className="px-4 py-2 text-center">$ 378,000</td>
                    <td className="px-4 py-2 text-center">+55</td>
                    <td className="px-4 py-2 text-center">+$ 22,000</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL CAMPO DE MAYO</td>
                    <td className="px-4 py-2 text-center text-red-600">567</td>
                    <td className="px-4 py-2 text-center">$ 226,800</td>
                    <td className="px-4 py-2 text-center text-red-600">612</td>
                    <td className="px-4 py-2 text-center">$ 244,800</td>
                    <td className="px-4 py-2 text-center">+45</td>
                    <td className="px-4 py-2 text-center">+$ 18,000</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL LIBERTADOR</td>
                    <td className="px-4 py-2 text-center text-red-600">1,789</td>
                    <td className="px-4 py-2 text-center">$ 715,600</td>
                    <td className="px-4 py-2 text-center text-red-600">1,890</td>
                    <td className="px-4 py-2 text-center">$ 756,000</td>
                    <td className="px-4 py-2 text-center">+101</td>
                    <td className="px-4 py-2 text-center">+$ 40,400</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL MORON</td>
                    <td className="px-4 py-2 text-center text-red-600">2,345</td>
                    <td className="px-4 py-2 text-center">$ 938,000</td>
                    <td className="px-4 py-2 text-center text-red-600">2,520</td>
                    <td className="px-4 py-2 text-center">$ 1,008,000</td>
                    <td className="px-4 py-2 text-center">+175</td>
                    <td className="px-4 py-2 text-center">+$ 70,000</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL PALERMO</td>
                    <td className="px-4 py-2 text-center text-red-600">3,456</td>
                    <td className="px-4 py-2 text-center">$ 1,382,400</td>
                    <td className="px-4 py-2 text-center text-red-600">3,680</td>
                    <td className="px-4 py-2 text-center">$ 1,472,000</td>
                    <td className="px-4 py-2 text-center">+224</td>
                    <td className="px-4 py-2 text-center">+$ 89,600</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL ROSARIO</td>
                    <td className="px-4 py-2 text-center text-red-600">1,234</td>
                    <td className="px-4 py-2 text-center">$ 493,600</td>
                    <td className="px-4 py-2 text-center text-red-600">1,320</td>
                    <td className="px-4 py-2 text-center">$ 528,000</td>
                    <td className="px-4 py-2 text-center">+86</td>
                    <td className="px-4 py-2 text-center">+$ 34,400</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL MONTSERRAT</td>
                    <td className="px-4 py-2 text-center text-red-600">678</td>
                    <td className="px-4 py-2 text-center">$ 271,200</td>
                    <td className="px-4 py-2 text-center text-red-600">720</td>
                    <td className="px-4 py-2 text-center">$ 288,000</td>
                    <td className="px-4 py-2 text-center">+42</td>
                    <td className="px-4 py-2 text-center">+$ 16,800</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL PARANA</td>
                    <td className="px-4 py-2 text-center text-red-600">445</td>
                    <td className="px-4 py-2 text-center">$ 178,000</td>
                    <td className="px-4 py-2 text-center text-red-600">480</td>
                    <td className="px-4 py-2 text-center">$ 192,000</td>
                    <td className="px-4 py-2 text-center">+35</td>
                    <td className="px-4 py-2 text-center">+$ 14,000</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL LIBERTAD</td>
                    <td className="px-4 py-2 text-center text-red-600">789</td>
                    <td className="px-4 py-2 text-center">$ 315,600</td>
                    <td className="px-4 py-2 text-center text-red-600">840</td>
                    <td className="px-4 py-2 text-center">$ 336,000</td>
                    <td className="px-4 py-2 text-center">+51</td>
                    <td className="px-4 py-2 text-center">+$ 20,400</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL CORRIENTES</td>
                    <td className="px-4 py-2 text-center text-red-600">234</td>
                    <td className="px-4 py-2 text-center">$ 93,600</td>
                    <td className="px-4 py-2 text-center text-red-600">255</td>
                    <td className="px-4 py-2 text-center">$ 102,000</td>
                    <td className="px-4 py-2 text-center">+21</td>
                    <td className="px-4 py-2 text-center">+$ 8,400</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL LA PLATA</td>
                    <td className="px-4 py-2 text-center text-red-600">123</td>
                    <td className="px-4 py-2 text-center">$ 49,200</td>
                    <td className="px-4 py-2 text-center text-red-600">135</td>
                    <td className="px-4 py-2 text-center">$ 54,000</td>
                    <td className="px-4 py-2 text-center">+12</td>
                    <td className="px-4 py-2 text-center">+$ 4,800</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL CENTINELA / GUARDACOSTAS</td>
                    <td className="px-4 py-2 text-center text-red-600">456</td>
                    <td className="px-4 py-2 text-center">$ 182,400</td>
                    <td className="px-4 py-2 text-center text-red-600">480</td>
                    <td className="px-4 py-2 text-center">$ 192,000</td>
                    <td className="px-4 py-2 text-center">+24</td>
                    <td className="px-4 py-2 text-center">+$ 9,600</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL CONDOR</td>
                    <td className="px-4 py-2 text-center text-red-600">67</td>
                    <td className="px-4 py-2 text-center">$ 26,800</td>
                    <td className="px-4 py-2 text-center text-red-600">72</td>
                    <td className="px-4 py-2 text-center">$ 28,800</td>
                    <td className="px-4 py-2 text-center">+5</td>
                    <td className="px-4 py-2 text-center">+$ 2,000</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL OLIVOS</td>
                    <td className="px-4 py-2 text-center text-red-600">89</td>
                    <td className="px-4 py-2 text-center">$ 35,600</td>
                    <td className="px-4 py-2 text-center text-red-600">96</td>
                    <td className="px-4 py-2 text-center">$ 38,400</td>
                    <td className="px-4 py-2 text-center">+7</td>
                    <td className="px-4 py-2 text-center">+$ 2,800</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL NEUQUEN</td>
                    <td className="px-4 py-2 text-center text-red-600">567</td>
                    <td className="px-4 py-2 text-center">$ 226,800</td>
                    <td className="px-4 py-2 text-center text-red-600">600</td>
                    <td className="px-4 py-2 text-center">$ 240,000</td>
                    <td className="px-4 py-2 text-center">+33</td>
                    <td className="px-4 py-2 text-center">+$ 13,200</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL SALTA</td>
                    <td className="px-4 py-2 text-center text-red-600">234</td>
                    <td className="px-4 py-2 text-center">$ 93,600</td>
                    <td className="px-4 py-2 text-center text-red-600">252</td>
                    <td className="px-4 py-2 text-center">$ 100,800</td>
                    <td className="px-4 py-2 text-center">+18</td>
                    <td className="px-4 py-2 text-center">+$ 7,200</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL MENDOZA</td>
                    <td className="px-4 py-2 text-center text-red-600">123</td>
                    <td className="px-4 py-2 text-center">$ 49,200</td>
                    <td className="px-4 py-2 text-center text-red-600">132</td>
                    <td className="px-4 py-2 text-center">$ 52,800</td>
                    <td className="px-4 py-2 text-center">+9</td>
                    <td className="px-4 py-2 text-center">+$ 3,600</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL LOMAS DE ZAMORA</td>
                    <td className="px-4 py-2 text-center text-red-600">345</td>
                    <td className="px-4 py-2 text-center">$ 138,000</td>
                    <td className="px-4 py-2 text-center text-red-600">372</td>
                    <td className="px-4 py-2 text-center">$ 148,800</td>
                    <td className="px-4 py-2 text-center">+27</td>
                    <td className="px-4 py-2 text-center">+$ 10,800</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">FILIAL MAR DEL PLATA</td>
                    <td className="px-4 py-2 text-center text-red-600">678</td>
                    <td className="px-4 py-2 text-center">$ 271,200</td>
                    <td className="px-4 py-2 text-center text-red-600">720</td>
                    <td className="px-4 py-2 text-center">$ 288,000</td>
                    <td className="px-4 py-2 text-center">+42</td>
                    <td className="px-4 py-2 text-center">+$ 16,800</td>
                  </tr>
                  <tr className="bg-green-100 font-bold">
                    <td className="px-4 py-3 text-gray-900">TOTAL CANAL FILIALES</td>
                    <td className="px-4 py-3 text-center text-gray-900">16,987</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 6,794,800</td>
                    <td className="px-4 py-3 text-center text-gray-900">18,240</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 7,296,000</td>
                    <td className="px-4 py-3 text-center text-gray-900">+1,253</td>
                    <td className="px-4 py-3 text-center text-gray-900">+$ 501,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : showPasTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-purple-600 text-white px-4 py-3 font-semibold">
              CANAL PAS POR RIESGO
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">RIESGO</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>JUNIO 23</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>JULIO 23</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>CRECIMIENTO</th>
                  </tr>
                  <tr className="bg-purple-100">
                    <th className="px-4 py-2 text-left font-semibold text-purple-800">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">AUTOMOTORES</td>
                    <td className="px-4 py-2 text-center text-red-600">1,245</td>
                    <td className="px-4 py-2 text-center">$ 498,000</td>
                    <td className="px-4 py-2 text-center text-red-600">1,380</td>
                    <td className="px-4 py-2 text-center">$ 552,000</td>
                    <td className="px-4 py-2 text-center">+135</td>
                    <td className="px-4 py-2 text-center">+$ 54,000</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">HOGAR</td>
                    <td className="px-4 py-2 text-center text-red-600">2,156</td>
                    <td className="px-4 py-2 text-center">$ 862,400</td>
                    <td className="px-4 py-2 text-center text-red-600">2,340</td>
                    <td className="px-4 py-2 text-center">$ 936,000</td>
                    <td className="px-4 py-2 text-center">+184</td>
                    <td className="px-4 py-2 text-center">+$ 73,600</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">COMERCIO</td>
                    <td className="px-4 py-2 text-center text-red-600">890</td>
                    <td className="px-4 py-2 text-center">$ 356,000</td>
                    <td className="px-4 py-2 text-center text-red-600">945</td>
                    <td className="px-4 py-2 text-center">$ 378,000</td>
                    <td className="px-4 py-2 text-center">+55</td>
                    <td className="px-4 py-2 text-center">+$ 22,000</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">RESPONSABILIDAD CIVIL</td>
                    <td className="px-4 py-2 text-center text-red-600">567</td>
                    <td className="px-4 py-2 text-center">$ 226,800</td>
                    <td className="px-4 py-2 text-center text-red-600">612</td>
                    <td className="px-4 py-2 text-center">$ 244,800</td>
                    <td className="px-4 py-2 text-center">+45</td>
                    <td className="px-4 py-2 text-center">+$ 18,000</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">VIDA</td>
                    <td className="px-4 py-2 text-center text-red-600">1,789</td>
                    <td className="px-4 py-2 text-center">$ 715,600</td>
                    <td className="px-4 py-2 text-center text-red-600">1,890</td>
                    <td className="px-4 py-2 text-center">$ 756,000</td>
                    <td className="px-4 py-2 text-center">+101</td>
                    <td className="px-4 py-2 text-center">+$ 40,400</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">ACCIDENTES PERSONALES</td>
                    <td className="px-4 py-2 text-center text-red-600">2,345</td>
                    <td className="px-4 py-2 text-center">$ 938,000</td>
                    <td className="px-4 py-2 text-center text-red-600">2,520</td>
                    <td className="px-4 py-2 text-center">$ 1,008,000</td>
                    <td className="px-4 py-2 text-center">+175</td>
                    <td className="px-4 py-2 text-center">+$ 70,000</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">TRANSPORTE</td>
                    <td className="px-4 py-2 text-center text-red-600">3,456</td>
                    <td className="px-4 py-2 text-center">$ 1,382,400</td>
                    <td className="px-4 py-2 text-center text-red-600">3,680</td>
                    <td className="px-4 py-2 text-center">$ 1,472,000</td>
                    <td className="px-4 py-2 text-center">+224</td>
                    <td className="px-4 py-2 text-center">+$ 89,600</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">AGRICOLA</td>
                    <td className="px-4 py-2 text-center text-red-600">1,234</td>
                    <td className="px-4 py-2 text-center">$ 493,600</td>
                    <td className="px-4 py-2 text-center text-red-600">1,320</td>
                    <td className="px-4 py-2 text-center">$ 528,000</td>
                    <td className="px-4 py-2 text-center">+86</td>
                    <td className="px-4 py-2 text-center">+$ 34,400</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">INDUSTRIAL</td>
                    <td className="px-4 py-2 text-center text-red-600">678</td>
                    <td className="px-4 py-2 text-center">$ 271,200</td>
                    <td className="px-4 py-2 text-center text-red-600">720</td>
                    <td className="px-4 py-2 text-center">$ 288,000</td>
                    <td className="px-4 py-2 text-center">+42</td>
                    <td className="px-4 py-2 text-center">+$ 16,800</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">SALUD</td>
                    <td className="px-4 py-2 text-center text-red-600">445</td>
                    <td className="px-4 py-2 text-center">$ 178,000</td>
                    <td className="px-4 py-2 text-center text-red-600">480</td>
                    <td className="px-4 py-2 text-center">$ 192,000</td>
                    <td className="px-4 py-2 text-center">+35</td>
                    <td className="px-4 py-2 text-center">+$ 14,000</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">TECNICO</td>
                    <td className="px-4 py-2 text-center text-red-600">789</td>
                    <td className="px-4 py-2 text-center">$ 315,600</td>
                    <td className="px-4 py-2 text-center text-red-600">840</td>
                    <td className="px-4 py-2 text-center">$ 336,000</td>
                    <td className="px-4 py-2 text-center">+51</td>
                    <td className="px-4 py-2 text-center">+$ 20,400</td>
                  </tr>
                  <tr className="bg-purple-100 font-bold">
                    <td className="px-4 py-3 text-gray-900">TOTAL CANAL PAS</td>
                    <td className="px-4 py-3 text-center text-gray-900">16,987</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 6,794,800</td>
                    <td className="px-4 py-3 text-center text-gray-900">18,240</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 7,296,000</td>
                    <td className="px-4 py-3 text-center text-gray-900">+1,253</td>
                    <td className="px-4 py-3 text-center text-gray-900">+$ 501,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : showCallCenterTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-orange-600 text-white px-4 py-3 font-semibold">
              Evolución de Ventas Brutas por Ramo
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">RAMO</th>
                    <th className="px-4 py-3 text-center font-bold">feb-23</th>
                    <th className="px-4 py-3 text-center font-bold">mar-23</th>
                    <th className="px-4 py-3 text-center font-bold">abr-23</th>
                    <th className="px-4 py-3 text-center font-bold">may-23</th>
                    <th className="px-4 py-3 text-center font-bold">jun-23</th>
                    <th className="px-4 py-3 text-center font-bold">jul-23</th>
                    <th className="px-4 py-3 text-center font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Auto</td>
                    <td className="px-4 py-2 text-center">$ 45,200</td>
                    <td className="px-4 py-2 text-center">$ 48,500</td>
                    <td className="px-4 py-2 text-center">$ 52,100</td>
                    <td className="px-4 py-2 text-center">$ 55,800</td>
                    <td className="px-4 py-2 text-center">$ 59,200</td>
                    <td className="px-4 py-2 text-center">$ 62,500</td>
                    <td className="px-4 py-2 text-center">$ 323,300</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Hogar</td>
                    <td className="px-4 py-2 text-center">$ 32,800</td>
                    <td className="px-4 py-2 text-center">$ 35,200</td>
                    <td className="px-4 py-2 text-center">$ 37,900</td>
                    <td className="px-4 py-2 text-center">$ 40,500</td>
                    <td className="px-4 py-2 text-center">$ 43,100</td>
                    <td className="px-4 py-2 text-center">$ 45,800</td>
                    <td className="px-4 py-2 text-center">$ 235,300</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Salud</td>
                    <td className="px-4 py-2 text-center">$ 28,500</td>
                    <td className="px-4 py-2 text-center">$ 30,200</td>
                    <td className="px-4 py-2 text-center">$ 32,100</td>
                    <td className="px-4 py-2 text-center">$ 34,000</td>
                    <td className="px-4 py-2 text-center">$ 36,200</td>
                    <td className="px-4 py-2 text-center">$ 38,500</td>
                    <td className="px-4 py-2 text-center">$ 199,500</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Vida</td>
                    <td className="px-4 py-2 text-center">$ 25,100</td>
                    <td className="px-4 py-2 text-center">$ 26,800</td>
                    <td className="px-4 py-2 text-center">$ 28,500</td>
                    <td className="px-4 py-2 text-center">$ 30,200</td>
                    <td className="px-4 py-2 text-center">$ 32,000</td>
                    <td className="px-4 py-2 text-center">$ 33,800</td>
                    <td className="px-4 py-2 text-center">$ 176,400</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Bolso</td>
                    <td className="px-4 py-2 text-center">$ 18,200</td>
                    <td className="px-4 py-2 text-center">$ 19,500</td>
                    <td className="px-4 py-2 text-center">$ 20,800</td>
                    <td className="px-4 py-2 text-center">$ 22,100</td>
                    <td className="px-4 py-2 text-center">$ 23,500</td>
                    <td className="px-4 py-2 text-center">$ 24,800</td>
                    <td className="px-4 py-2 text-center">$ 128,900</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Sepelio</td>
                    <td className="px-4 py-2 text-center">$ 15,800</td>
                    <td className="px-4 py-2 text-center">$ 16,500</td>
                    <td className="px-4 py-2 text-center">$ 17,200</td>
                    <td className="px-4 py-2 text-center">$ 18,000</td>
                    <td className="px-4 py-2 text-center">$ 18,800</td>
                    <td className="px-4 py-2 text-center">$ 19,600</td>
                    <td className="px-4 py-2 text-center">$ 105,900</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Otros</td>
                    <td className="px-4 py-2 text-center">$ 12,400</td>
                    <td className="px-4 py-2 text-center">$ 13,200</td>
                    <td className="px-4 py-2 text-center">$ 14,000</td>
                    <td className="px-4 py-2 text-center">$ 14,800</td>
                    <td className="px-4 py-2 text-center">$ 15,600</td>
                    <td className="px-4 py-2 text-center">$ 16,400</td>
                    <td className="px-4 py-2 text-center">$ 86,400</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td className="px-4 py-3 text-gray-900">Total general</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 177,000</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 189,900</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 202,600</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 215,400</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 228,400</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 241,400</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 1,254,700</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
                                    {/* Gráfico de barras de Highcharts */}
                        <div className="mt-8">
                          <HighchartsChart
                            id="call-center-chart"
                            type="column"
                            title="Evolución de Ventas por Mes - Call Center + Casa Central"
                            data={{
                              chart: { type: 'column', height: 400 },
                              xAxis: {
                                categories: ['feb-23', 'mar-23', 'abr-23', 'may-23', 'jun-23', 'jul-23'],
                                title: { text: 'Meses' },
                              },
                              yAxis: {
                                title: { text: 'Ventas ($)' },
                                min: 0,
                                labels: {
                                  formatter: function (this: { value: number }) {
                                    if (this.value >= 1000000) return (this.value / 1000000) + ' M';
                                    if (this.value >= 1000) return (this.value / 1000) + ' K';
                                    return this.value;
                                  }
                                }
                              },
                              tooltip: {
                                pointFormatter: function (this: { y: number }) {
                                  return '<b>' + this.y.toLocaleString() + '</b>';
                                }
                              },
                              series: [
                                { 
                                  name: 'Auto', 
                                  data: [45200, 48500, 52100, 55800, 59200, 62500], 
                                  color: '#FF6B35' 
                                },
                                { 
                                  name: 'Hogar', 
                                  data: [32800, 35200, 37900, 40500, 43100, 45800], 
                                  color: '#F7931E' 
                                },
                                { 
                                  name: 'Salud', 
                                  data: [28500, 30200, 32100, 34000, 36200, 38500], 
                                  color: '#FFD23F' 
                                },
                                { 
                                  name: 'Vida', 
                                  data: [25100, 26800, 28500, 30200, 32000, 33800], 
                                  color: '#6BCF7F' 
                                },
                                { 
                                  name: 'Bolso', 
                                  data: [18200, 19500, 20800, 22100, 23500, 24800], 
                                  color: '#4ECDC4' 
                                },
                                { 
                                  name: 'Sepelio', 
                                  data: [15800, 16500, 17200, 18000, 18800, 19600], 
                                  color: '#45B7D1' 
                                },
                                { 
                                  name: 'Otros', 
                                  data: [12400, 13200, 14000, 14800, 15600, 16400], 
                                  color: '#96CEB4' 
                                }
                              ],
                              plotOptions: {
                                column: {
                                  stacking: 'normal',
                                  dataLabels: {
                                    enabled: true,
                                    formatter: function (this: { y: number }) {
                                      if (this.y >= 1000) return (this.y / 1000) + 'K';
                                      return this.y;
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </div>
          </div>
        ) : showFilialesPasTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-teal-600 text-white px-4 py-3 font-semibold flex justify-between items-center">
              <span>Ranking Productores {rankingFilter === 'con-art' ? 'con ART' : 'sin ART'}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setRankingFilter('con-art')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    rankingFilter === 'con-art'
                      ? 'bg-white text-teal-600'
                      : 'bg-teal-500 text-white hover:bg-teal-400'
                  }`}
                >
                  Con ART
                </button>
                <button
                  onClick={() => setRankingFilter('sin-art')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    rankingFilter === 'sin-art'
                      ? 'bg-white text-teal-600'
                      : 'bg-teal-500 text-white hover:bg-teal-400'
                  }`}
                >
                  Sin ART
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">CANAL</th>
                    <th className="px-4 py-3 text-center font-bold">N°</th>
                    <th className="px-4 py-3 text-left font-bold">PAS</th>
                    <th className="px-4 py-3 text-center font-bold">Q PÓLIZAS</th>
                    <th className="px-4 py-3 text-center font-bold">R12</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingFilter === 'con-art' ? (
                    <>
                      {/* CANAL PAS + FILIALES Section for con-art */}
                      {Array.from({ length: 20 }, (_, i) => (
                        <tr key={`pas-filiales-con-art-${i}`} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 text-gray-900"></td>
                          <td className="px-4 py-3 text-gray-900 font-medium">{i + 1}</td>
                          <td className="px-4 py-3 text-gray-900">
                            {[
                              'FILIAL BAHIA BLANCA / PUNTA ALTA',
                              'JAACKS',
                              'SAS CONSULTORES SRL PABLO PENELA',
                              'REYES',
                              'PAMPA',
                              'GRUPO GCDC',
                              'FILIAL EL PALOMAR',
                              'FILIAL MAR DEL PLATA',
                              'FIALA DARIO',
                              'FILIAL MONTSERRAT',
                              'FILIAL LIBERTADOR',
                              'FILIAL PALERMO',
                              'GONZALEZ SANTOIANNI - DIRECTO',
                              'SOSA MONTEPAGANO MARTIN ROBERTO',
                              'MONZO',
                              'GRILLO & ORTIZ',
                              'SOSA JOSE',
                              'ALEA BROKER DE SEGUROS SA',
                              'CERAR',
                              'ARENA ALBERTO SEBASTIAN'
                            ][i]}
                          </td>
                          <td className="px-4 py-3 text-gray-900">1,089</td>
                          <td className="px-4 py-3 text-gray-900">$2,483,600</td>
                        </tr>
                      ))}
                      
                      {/* Totals */}
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>TOTAL 20 MEJORES</td>
                        <td className="px-4 py-3 font-semibold">2,178</td>
                        <td className="px-4 py-3 font-semibold">$4,967,200</td>
                      </tr>
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>RESTO</td>
                        <td className="px-4 py-3 font-semibold">743</td>
                        <td className="px-4 py-3 font-semibold">$1,694,800</td>
                      </tr>
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>TOTAL CANAL PAS + FILIALES</td>
                        <td className="px-4 py-3 font-semibold">2,921</td>
                        <td className="px-4 py-3 font-semibold">$6,662,000</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {/* CANAL PAS + FILIALES Section for sin-art */}
                      {Array.from({ length: 20 }, (_, i) => {
                        const sinArtData = [
                          { qPolizas: 856, r12: 1950000 },
                          { qPolizas: 743, r12: 1680000 },
                          { qPolizas: 692, r12: 1540000 },
                          { qPolizas: 634, r12: 1420000 },
                          { qPolizas: 587, r12: 1310000 },
                          { qPolizas: 534, r12: 1190000 },
                          { qPolizas: 489, r12: 1080000 },
                          { qPolizas: 445, r12: 980000 },
                          { qPolizas: 412, r12: 890000 },
                          { qPolizas: 378, r12: 820000 },
                          { qPolizas: 345, r12: 750000 },
                          { qPolizas: 312, r12: 680000 },
                          { qPolizas: 289, r12: 620000 },
                          { qPolizas: 267, r12: 570000 },
                          { qPolizas: 245, r12: 520000 },
                          { qPolizas: 223, r12: 470000 },
                          { qPolizas: 201, r12: 420000 },
                          { qPolizas: 178, r12: 370000 },
                          { qPolizas: 156, r12: 320000 },
                          { qPolizas: 134, r12: 270000 }
                        ];
                        
                        return (
                          <tr key={`pas-filiales-sin-art-${i}`} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-4 py-3 text-gray-900"></td>
                            <td className="px-4 py-3 text-gray-900 font-medium">{i + 1}</td>
                            <td className="px-4 py-3 text-gray-900">
                              {[
                                'FILIAL BAHIA BLANCA / PUNTA ALTA',
                                'JAACKS',
                                'SAS CONSULTORES SRL PABLO PENELA',
                                'REYES',
                                'PAMPA',
                                'GRUPO GCDC',
                                'FILIAL EL PALOMAR',
                                'FILIAL MAR DEL PLATA',
                                'FIALA DARIO',
                                'FILIAL MONTSERRAT',
                                'FILIAL LIBERTADOR',
                                'FILIAL PALERMO',
                                'GONZALEZ SANTOIANNI - DIRECTO',
                                'SOSA MONTEPAGANO MARTIN ROBERTO',
                                'MONZO',
                                'GRILLO & ORTIZ',
                                'SOSA JOSE',
                                'ALEA BROKER DE SEGUROS SA',
                                'CERAR',
                                'ARENA ALBERTO SEBASTIAN'
                              ][i]}
                            </td>
                            <td className="px-4 py-3 text-gray-900">{sinArtData[i].qPolizas.toLocaleString()}</td>
                            <td className="px-4 py-3 text-gray-900">${sinArtData[i].r12.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                      
                      {/* Totals */}
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>TOTAL 20 MEJORES</td>
                        <td className="px-4 py-3 font-semibold">7,234</td>
                        <td className="px-4 py-3 font-semibold">$16,420,000</td>
                      </tr>
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>RESTO</td>
                        <td className="px-4 py-3 font-semibold">1,856</td>
                        <td className="px-4 py-3 font-semibold">$4,180,000</td>
                      </tr>
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>TOTAL CANAL PAS + FILIALES</td>
                        <td className="px-4 py-3 font-semibold">9,090</td>
                        <td className="px-4 py-3 font-semibold">$20,600,000</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            {/* Gráficos comparativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HighchartsChart
                id="comparativo-r12"
                type="column"
                title="Comparativa R12 - Junio vs Julio 2023"
                data={r12ChartData}
              />
              <HighchartsChart
                id="torta-q-pol"
                type="pie"
                title="Distribución Q PÓL Julio 2023"
                data={qPolPieData}
              />
            </div>
            
            {/* Gráfico de evolución R12 */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <HighchartsChart
                id="evolucion-r12"
                type="line"
                title="Evolución R12 - Junio vs Julio 2023"
                data={r12EvolutionData}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
} 