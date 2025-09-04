'use client';

import { useState, useEffect, useMemo } from 'react';
import HighchartsChart from '@/components/dashboard/HighchartsChart';

export default function EvolucionPorTipoOperacion() {
  // Estados para el filtro
  const [selectedYear1, setSelectedYear1] = useState('2024');
  const [selectedYear2, setSelectedYear2] = useState('2025');
  const [selectedMonth1, setSelectedMonth1] = useState('01');
  const [selectedMonth2, setSelectedMonth2] = useState('01');
  const [tipoVista, setTipoVista] = useState('ASSA');
  const [filterApplied, setFilterApplied] = useState(false);

  // useEffect para aplicar el filtro automáticamente
  useEffect(() => {
    setFilterApplied(true);
  }, [selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Función para obtener el nombre del mes
  const getMonthName = (month: string) => {
    const months = {
      '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
      '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
      '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
    };
    return months[month as keyof typeof months] || month;
  };

  // Datos para el gráfico de barras
  const chartData = useMemo(() => {
    // Datos de ejemplo basados en el tipo de operación seleccionado
    const baseData = {
      ASSA: {
        '01': 1200000, '02': 1250000, '03': 1300000, '04': 1280000,
        '05': 1350000, '06': 1400000, '07': 1450000, '08': 1420000,
        '09': 1480000, '10': 1520000, '11': 1550000, '12': 1580000
      },
      CAS: {
        '01': 980000, '02': 1020000, '03': 1050000, '04': 1030000,
        '05': 1080000, '06': 1120000, '07': 1150000, '08': 1130000,
        '09': 1180000, '10': 1220000, '11': 1250000, '12': 1280000
      },
      ART: {
        '01': 750000, '02': 780000, '03': 800000, '04': 790000,
        '05': 820000, '06': 850000, '07': 880000, '08': 870000,
        '09': 900000, '10': 930000, '11': 950000, '12': 980000
      }
    };

    const selectedData = baseData[tipoVista as keyof typeof baseData];
    const value1 = selectedData[selectedMonth1 as keyof typeof selectedData] || 0;
    const value2 = selectedData[selectedMonth2 as keyof typeof selectedData] || 0;

    return {
      chart: { type: 'column', height: 400 },
      title: {
        text: `Evolución R12 - ${tipoVista}`
      },
      xAxis: {
        categories: [`${getMonthName(selectedMonth1)} ${selectedYear1}`, `${getMonthName(selectedMonth2)} ${selectedYear2}`],
        title: { text: 'Períodos' }
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
          name: `${tipoVista}`,
          data: [value1, value2],
          color: '#007DC5'
        }
      ],
      credits: { enabled: false }
    };
  }, [tipoVista, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos para el gráfico de líneas Q POL
  const lineChartData = useMemo(() => {
    // Datos de ejemplo para Q POL por tipo de operación
    const qPolData = {
      NN: {
        '01': 450, '02': 480, '03': 520, '04': 510, '05': 550, '06': 580,
        '07': 620, '08': 610, '09': 650, '10': 680, '11': 700, '12': 720
      },
      Anul: {
        '01': 120, '02': 115, '03': 110, '04': 105, '05': 100, '06': 95,
        '07': 90, '08': 85, '09': 80, '10': 75, '11': 70, '12': 65
      },
      Renov: {
        '01': 320, '02': 330, '03': 340, '04': 335, '05': 350, '06': 365,
        '07': 380, '08': 375, '09': 390, '10': 405, '11': 420, '12': 435
      },
      Endos: {
        '01': 180, '02': 185, '03': 190, '04': 188, '05': 195, '06': 200,
        '07': 205, '08': 203, '09': 210, '10': 215, '11': 220, '12': 225
      }
    };

    const categories = [`${getMonthName(selectedMonth1)} ${selectedYear1}`, `${getMonthName(selectedMonth2)} ${selectedYear2}`];
    
    return {
      chart: { type: 'line', height: 400 },
      title: {
        text: `Evolución Q POL - ${getMonthName(selectedMonth1)} ${selectedYear1} vs ${getMonthName(selectedMonth2)} ${selectedYear2}`
      },
      xAxis: {
        categories: categories,
        title: { text: 'Período' }
      },
      yAxis: {
        title: { text: 'Q POL' },
        min: 0
      },
      tooltip: {
        pointFormatter: function (this: { y: number }) {
          return '<b>' + this.y + '</b>';
        }
      },
      series: [
        {
          name: 'NN',
          data: [qPolData.NN[selectedMonth1 as keyof typeof qPolData.NN], qPolData.NN[selectedMonth2 as keyof typeof qPolData.NN]],
          color: '#28a745', // Verde
          marker: { symbol: 'circle' }
        },
        {
          name: 'Anul',
          data: [qPolData.Anul[selectedMonth1 as keyof typeof qPolData.Anul], qPolData.Anul[selectedMonth2 as keyof typeof qPolData.Anul]],
          color: '#dc3545', // Rojo
          marker: { symbol: 'diamond' }
        },
        {
          name: 'Renov',
          data: [qPolData.Renov[selectedMonth1 as keyof typeof qPolData.Renov], qPolData.Renov[selectedMonth2 as keyof typeof qPolData.Renov]],
          color: '#007DC5', // Azul
          marker: { symbol: 'square' }
        },
        {
          name: 'Endos',
          data: [qPolData.Endos[selectedMonth1 as keyof typeof qPolData.Endos], qPolData.Endos[selectedMonth2 as keyof typeof qPolData.Endos]],
          color: '#6c757d', // Gris
          marker: { symbol: 'triangle' }
        }
      ],
      credits: { enabled: false }
    };
  }, [selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  return (
    <div className="space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Evolución de Cartera</h1>
        <p className="text-gray-600 mt-2">Visualice la Evolución de Cartera de la Compañía</p>
      </div>

      {/* Filtro de Evolución de Cartera */}
      <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro de Evolución de Cartera</h3>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Fecha Inicio */}
            <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-md font-medium text-blue-800 mb-3">Fecha Inicio</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                  <select 
                    value={selectedYear1}
                    onChange={(e) => setSelectedYear1(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                  <select 
                    value={selectedMonth1}
                    onChange={(e) => setSelectedMonth1(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* Fecha Fin */}
            <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-md font-medium text-green-800 mb-3">Fecha Fin</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                  <select 
                    value={selectedYear2}
                    onChange={(e) => setSelectedYear2(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                  <select 
                    value={selectedMonth2}
                    onChange={(e) => setSelectedMonth2(e.target.value)}
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

          {/* Tipo de Vista */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vista</label>
            <select 
              value={tipoVista}
              onChange={(e) => setTipoVista(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ASSA">ASSA</option>
              <option value="CAS">CAS</option>
              <option value="ART">ART</option>
            </select>
        </div>

          {/* Botón Aplicar Filtros */}
          <div className="flex justify-end">
              <button
              onClick={() => setFilterApplied(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md flex items-center gap-2"
              >
              <i className="fa-solid fa-check text-white"></i>
              Aplicar Filtros
              </button>
            </div>
        </div>

      {/* Gráficos */}
      {filterApplied && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de barras R12 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Evolución R12 por Tipo de Operación</h2>
            <HighchartsChart
              id="evolucion-r12"
              type="column"
              data={chartData}
            />
          </div>

          {/* Gráfico de líneas Q POL */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Evolución Q POL por Tipo de Operación</h2>
            <HighchartsChart
              id="evolucion-qpol"
              type="line"
              data={lineChartData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
