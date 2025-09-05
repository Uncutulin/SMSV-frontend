'use client';

import { useState, useEffect, useMemo } from 'react';
import HighchartsChart from '@/components/dashboard/HighchartsChart';

export default function EvolucionPorTipoOperacion() {
  // Estados para el filtro
  const [selectedYear1, setSelectedYear1] = useState('2023');
  const [selectedYear2, setSelectedYear2] = useState('2024');
  const [selectedYear3, setSelectedYear3] = useState('2025');
  const [selectedMonth1, setSelectedMonth1] = useState('08');
  const [selectedMonth2, setSelectedMonth2] = useState('08');
  const [selectedMonth3, setSelectedMonth3] = useState('08');
  const [tipoVista, setTipoVista] = useState('TODOS');
  const [tipoFiltro, setTipoFiltro] = useState('TODOS');
  const [filterApplied, setFilterApplied] = useState(false);

  // useEffect para aplicar el filtro automáticamente
  useEffect(() => {
    setFilterApplied(true);
  }, [selectedYear1, selectedMonth1, selectedYear2, selectedMonth2, selectedYear3, selectedMonth3]);

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
    // Datos de ejemplo por tipo de operación y período con mayor variación
    const r12Data = {
      ASSA: {
        'Nuevos Negocios': {
          [selectedMonth1]: 1200000, [selectedMonth2]: 1450000, [selectedMonth3]: 1600000
        },
        'Anulaciones': {
          [selectedMonth1]: 180000, [selectedMonth2]: 120000, [selectedMonth3]: 90000
        },
        'Renovaciones': {
          [selectedMonth1]: 800000, [selectedMonth2]: 950000, [selectedMonth3]: 1100000
        },
        'Refacturación': {
          [selectedMonth1]: 200000, [selectedMonth2]: 280000, [selectedMonth3]: 350000
        }
      },
      CAS: {
        'Nuevos Negocios': {
          [selectedMonth1]: 980000, [selectedMonth2]: 1200000, [selectedMonth3]: 1400000
        },
        'Anulaciones': {
          [selectedMonth1]: 150000, [selectedMonth2]: 100000, [selectedMonth3]: 75000
        },
        'Renovaciones': {
          [selectedMonth1]: 650000, [selectedMonth2]: 780000, [selectedMonth3]: 920000
        },
        'Refacturación': {
          [selectedMonth1]: 180000, [selectedMonth2]: 240000, [selectedMonth3]: 300000
        }
      },
      ART: {
        'Nuevos Negocios': {
          [selectedMonth1]: 750000, [selectedMonth2]: 950000, [selectedMonth3]: 1150000
        },
        'Anulaciones': {
          [selectedMonth1]: 120000, [selectedMonth2]: 80000, [selectedMonth3]: 60000
        },
        'Renovaciones': {
          [selectedMonth1]: 500000, [selectedMonth2]: 620000, [selectedMonth3]: 750000
        },
        'Refacturación': {
          [selectedMonth1]: 140000, [selectedMonth2]: 190000, [selectedMonth3]: 250000
        }
      }
    };

    let selectedData;
    if (tipoVista === 'TODOS') {
      // Agregar datos de todos los tipos de vista
      selectedData = {
        'Nuevos Negocios': {
          [selectedMonth1]: r12Data.ASSA['Nuevos Negocios'][selectedMonth1 as keyof typeof r12Data.ASSA['Nuevos Negocios']] + 
                           r12Data.CAS['Nuevos Negocios'][selectedMonth1 as keyof typeof r12Data.CAS['Nuevos Negocios']] + 
                           r12Data.ART['Nuevos Negocios'][selectedMonth1 as keyof typeof r12Data.ART['Nuevos Negocios']],
          [selectedMonth2]: r12Data.ASSA['Nuevos Negocios'][selectedMonth2 as keyof typeof r12Data.ASSA['Nuevos Negocios']] + 
                           r12Data.CAS['Nuevos Negocios'][selectedMonth2 as keyof typeof r12Data.CAS['Nuevos Negocios']] + 
                           r12Data.ART['Nuevos Negocios'][selectedMonth2 as keyof typeof r12Data.ART['Nuevos Negocios']],
          [selectedMonth3]: r12Data.ASSA['Nuevos Negocios'][selectedMonth3 as keyof typeof r12Data.ASSA['Nuevos Negocios']] + 
                           r12Data.CAS['Nuevos Negocios'][selectedMonth3 as keyof typeof r12Data.CAS['Nuevos Negocios']] + 
                           r12Data.ART['Nuevos Negocios'][selectedMonth3 as keyof typeof r12Data.ART['Nuevos Negocios']]
        },
        'Anulaciones': {
          [selectedMonth1]: r12Data.ASSA['Anulaciones'][selectedMonth1 as keyof typeof r12Data.ASSA['Anulaciones']] + 
                           r12Data.CAS['Anulaciones'][selectedMonth1 as keyof typeof r12Data.CAS['Anulaciones']] + 
                           r12Data.ART['Anulaciones'][selectedMonth1 as keyof typeof r12Data.ART['Anulaciones']],
          [selectedMonth2]: r12Data.ASSA['Anulaciones'][selectedMonth2 as keyof typeof r12Data.ASSA['Anulaciones']] + 
                           r12Data.CAS['Anulaciones'][selectedMonth2 as keyof typeof r12Data.CAS['Anulaciones']] + 
                           r12Data.ART['Anulaciones'][selectedMonth2 as keyof typeof r12Data.ART['Anulaciones']],
          [selectedMonth3]: r12Data.ASSA['Anulaciones'][selectedMonth3 as keyof typeof r12Data.ASSA['Anulaciones']] + 
                           r12Data.CAS['Anulaciones'][selectedMonth3 as keyof typeof r12Data.CAS['Anulaciones']] + 
                           r12Data.ART['Anulaciones'][selectedMonth3 as keyof typeof r12Data.ART['Anulaciones']]
        },
        'Renovaciones': {
          [selectedMonth1]: r12Data.ASSA['Renovaciones'][selectedMonth1 as keyof typeof r12Data.ASSA['Renovaciones']] + 
                           r12Data.CAS['Renovaciones'][selectedMonth1 as keyof typeof r12Data.CAS['Renovaciones']] + 
                           r12Data.ART['Renovaciones'][selectedMonth1 as keyof typeof r12Data.ART['Renovaciones']],
          [selectedMonth2]: r12Data.ASSA['Renovaciones'][selectedMonth2 as keyof typeof r12Data.ASSA['Renovaciones']] + 
                           r12Data.CAS['Renovaciones'][selectedMonth2 as keyof typeof r12Data.CAS['Renovaciones']] + 
                           r12Data.ART['Renovaciones'][selectedMonth2 as keyof typeof r12Data.ART['Renovaciones']],
          [selectedMonth3]: r12Data.ASSA['Renovaciones'][selectedMonth3 as keyof typeof r12Data.ASSA['Renovaciones']] + 
                           r12Data.CAS['Renovaciones'][selectedMonth3 as keyof typeof r12Data.CAS['Renovaciones']] + 
                           r12Data.ART['Renovaciones'][selectedMonth3 as keyof typeof r12Data.ART['Renovaciones']]
        },
        'Refacturación': {
          [selectedMonth1]: r12Data.ASSA['Refacturación'][selectedMonth1 as keyof typeof r12Data.ASSA['Refacturación']] + 
                           r12Data.CAS['Refacturación'][selectedMonth1 as keyof typeof r12Data.CAS['Refacturación']] + 
                           r12Data.ART['Refacturación'][selectedMonth1 as keyof typeof r12Data.ART['Refacturación']],
          [selectedMonth2]: r12Data.ASSA['Refacturación'][selectedMonth2 as keyof typeof r12Data.ASSA['Refacturación']] + 
                           r12Data.CAS['Refacturación'][selectedMonth2 as keyof typeof r12Data.CAS['Refacturación']] + 
                           r12Data.ART['Refacturación'][selectedMonth2 as keyof typeof r12Data.ART['Refacturación']],
          [selectedMonth3]: r12Data.ASSA['Refacturación'][selectedMonth3 as keyof typeof r12Data.ASSA['Refacturación']] + 
                           r12Data.CAS['Refacturación'][selectedMonth3 as keyof typeof r12Data.CAS['Refacturación']] + 
                           r12Data.ART['Refacturación'][selectedMonth3 as keyof typeof r12Data.ART['Refacturación']]
        }
      };
    } else {
      selectedData = r12Data[tipoVista as keyof typeof r12Data];
    }
    
    const period1Label = `${getMonthName(selectedMonth1)} ${selectedYear1}`;
    const period2Label = `${getMonthName(selectedMonth2)} ${selectedYear2}`;
    const period3Label = `${getMonthName(selectedMonth3)} ${selectedYear3}`;

    return {
      chart: { type: 'column', height: 360 },
      title: {
        text: `Evolución R12 por Tipo de Operación - ${tipoVista}`
      },
      xAxis: {
        categories: ['Nuevos Negocios', 'Anulaciones', 'Renovaciones', 'Refacturación'],
        title: { text: 'Tipo de Operación' },
        labels: {
          rotation: -45,
          style: {
            fontSize: '11px'
          }
        }
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
          name: period1Label,
          data: [
            selectedData['Nuevos Negocios'][selectedMonth1 as keyof typeof selectedData['Nuevos Negocios']] || 0,
            selectedData['Anulaciones'][selectedMonth1 as keyof typeof selectedData['Anulaciones']] || 0,
            selectedData['Renovaciones'][selectedMonth1 as keyof typeof selectedData['Renovaciones']] || 0,
            selectedData['Refacturación'][selectedMonth1 as keyof typeof selectedData['Refacturación']] || 0
          ],
          color: '#007DC5'
        },
        {
          name: period2Label,
          data: [
            selectedData['Nuevos Negocios'][selectedMonth2 as keyof typeof selectedData['Nuevos Negocios']] || 0,
            selectedData['Anulaciones'][selectedMonth2 as keyof typeof selectedData['Anulaciones']] || 0,
            selectedData['Renovaciones'][selectedMonth2 as keyof typeof selectedData['Renovaciones']] || 0,
            selectedData['Refacturación'][selectedMonth2 as keyof typeof selectedData['Refacturación']] || 0
          ],
          color: '#28a745'
        },
        {
          name: period3Label,
          data: [
            selectedData['Nuevos Negocios'][selectedMonth3 as keyof typeof selectedData['Nuevos Negocios']] || 0,
            selectedData['Anulaciones'][selectedMonth3 as keyof typeof selectedData['Anulaciones']] || 0,
            selectedData['Renovaciones'][selectedMonth3 as keyof typeof selectedData['Renovaciones']] || 0,
            selectedData['Refacturación'][selectedMonth3 as keyof typeof selectedData['Refacturación']] || 0
          ],
          color: '#dc3545'
        }
      ],
      credits: { enabled: false },
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemStyle: {
          fontSize: '12px'
        }
      }
    };
  }, [tipoVista, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2, selectedYear3, selectedMonth3]);

  // Datos para el gráfico de líneas Q POL
  const lineChartData = useMemo(() => {
    // Datos de ejemplo para Q POL por tipo de operación
    const qPolData = {
      'Nuevos Negocios': {
        '01': 450, '02': 480, '03': 520, '04': 510, '05': 550, '06': 580,
        '07': 620, '08': 610, '09': 650, '10': 680, '11': 700, '12': 720
      },
      'Anulaciones': {
        '01': 120, '02': 115, '03': 110, '04': 105, '05': 100, '06': 95,
        '07': 90, '08': 85, '09': 80, '10': 75, '11': 70, '12': 65
      },
      'Renovaciones': {
        '01': 320, '02': 330, '03': 340, '04': 335, '05': 350, '06': 365,
        '07': 380, '08': 375, '09': 390, '10': 405, '11': 420, '12': 435
      },
      'Refacturación': {
        '01': 180, '02': 185, '03': 190, '04': 188, '05': 195, '06': 200,
        '07': 205, '08': 203, '09': 210, '10': 215, '11': 220, '12': 225
      }
    };

    const categories = [`${getMonthName(selectedMonth1)} ${selectedYear1}`, `${getMonthName(selectedMonth2)} ${selectedYear2}`, `${getMonthName(selectedMonth3)} ${selectedYear3}`];
    
    return {
      chart: { type: 'line', height: 400 },
      title: {
        text: `Evolución Q POL - ${getMonthName(selectedMonth1)} ${selectedYear1} vs ${getMonthName(selectedMonth2)} ${selectedYear2} vs ${getMonthName(selectedMonth3)} ${selectedYear3}`
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
          name: 'Nuevos Negocios',
          data: [qPolData['Nuevos Negocios'][selectedMonth1 as keyof typeof qPolData['Nuevos Negocios']], qPolData['Nuevos Negocios'][selectedMonth2 as keyof typeof qPolData['Nuevos Negocios']], qPolData['Nuevos Negocios'][selectedMonth3 as keyof typeof qPolData['Nuevos Negocios']]],
          color: '#28a745', // Verde
          marker: { symbol: 'circle' }
        },
        {
          name: 'Anulaciones',
          data: [qPolData['Anulaciones'][selectedMonth1 as keyof typeof qPolData['Anulaciones']], qPolData['Anulaciones'][selectedMonth2 as keyof typeof qPolData['Anulaciones']], qPolData['Anulaciones'][selectedMonth3 as keyof typeof qPolData['Anulaciones']]],
          color: '#dc3545', // Rojo
          marker: { symbol: 'diamond' }
        },
        {
          name: 'Renovaciones',
          data: [qPolData['Renovaciones'][selectedMonth1 as keyof typeof qPolData['Renovaciones']], qPolData['Renovaciones'][selectedMonth2 as keyof typeof qPolData['Renovaciones']], qPolData['Renovaciones'][selectedMonth3 as keyof typeof qPolData['Renovaciones']]],
          color: '#007DC5', // Azul
          marker: { symbol: 'square' }
        },
        {
          name: 'Refacturación',
          data: [qPolData['Refacturación'][selectedMonth1 as keyof typeof qPolData['Refacturación']], qPolData['Refacturación'][selectedMonth2 as keyof typeof qPolData['Refacturación']], qPolData['Refacturación'][selectedMonth3 as keyof typeof qPolData['Refacturación']]],
          color: '#6c757d', // Gris
          marker: { symbol: 'triangle' }
        }
      ],
      credits: { enabled: false },
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemStyle: {
          fontSize: '12px'
        }
      }
    };
  }, [selectedYear1, selectedMonth1, selectedMonth2, selectedMonth3]);

  return (
    <div className="space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Evolución por Tipo de Operación</h1>
        <p className="text-gray-600 mt-2">Visualice la Evolución por Tipo de Operacióna</p>
      </div>

      {/* Filtro de Evolución de Cartera */}
      <div className="bg-white rounded-lg shadow-md p-6 text-xs">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro</h3>
          
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Período 1 */}
            <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-md font-medium text-blue-800 mb-3">Período 1</h4>
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
                    <option value="2026">2026</option>
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

            {/* Período 2 */}
            <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-md font-medium text-green-800 mb-3">Período 2</h4>
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
                    <option value="2026">2026</option>
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

            {/* Período 3 */}
            <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="text-md font-medium text-purple-800 mb-3">Período 3</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                  <select 
                    value={selectedYear3}
                    onChange={(e) => setSelectedYear3(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    value={selectedMonth3}
                    onChange={(e) => setSelectedMonth3(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

          {/* Tipo de Vista y Tipo de Filtro */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vista</label>
                <select 
                  value={tipoVista}
                  onChange={(e) => setTipoVista(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="TODOS">TODOS</option>
                  <option value="ASSA">ASSA</option>
                  <option value="CAS">CAS</option>
                  <option value="ART">ART</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Filtro</label>
                <select 
                  value={tipoFiltro}
                  onChange={(e) => setTipoFiltro(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="TODOS">TODOS</option>
                  <option value="CANAL">CANAL</option>
                  <option value="RAMO">RAMO</option>
                  <option value="CIA">CIA</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botón Aplicar Filtros */}
          <div className="flex justify-end hidden">
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
            <HighchartsChart
              id="evolucion-r12"
              type="column"
              title=""
              data={chartData}
            />
          </div>

          {/* Gráfico de líneas Q POL */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <HighchartsChart
              id="evolucion-qpol"
              type="line"
              title=""
              data={lineChartData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
