'use client';

import { useState, useMemo } from 'react';
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import { useEvolucionTipoOperacion } from '@/hooks/useEvolucionTipoOperacion';

export default function EvolucionPorTipoOperacion() {
  // Estados para el filtro
  const [selectedYear1, setSelectedYear1] = useState('2023');
  const [selectedYear2, setSelectedYear2] = useState('2024');
  const [selectedYear3, setSelectedYear3] = useState('2025');
  const [selectedMonth1, setSelectedMonth1] = useState('08');
  const [selectedMonth2, setSelectedMonth2] = useState('08');
  const [selectedMonth3, setSelectedMonth3] = useState('08');
  const [tipoVista, setTipoVista] = useState('TOTAL');
  const [filtroCanal, setFiltroCanal] = useState('TODOS');
  const [filtroCia, setFiltroCia] = useState('TODOS');
  const [filtroRamo, setFiltroRamo] = useState('TODOS');
  const [filterApplied, setFilterApplied] = useState(true);

  // Hook para obtener datos
  const {
    data,
    labels,
    loading,
    canales,
    companias,
    ramos,
    loadingFilters
  } = useEvolucionTipoOperacion({
    anio1: selectedYear1, mes1: selectedMonth1,
    anio2: selectedYear2, mes2: selectedMonth2,
    anio3: selectedYear3, mes3: selectedMonth3,
    tipoVista,
    filtroCanal,
    filtroCia,
    filtroRamo
  });

  // Helper para parsear valores de moneda que vienen como strings del backend
  const parseCurrency = (value: string | number): number => {
    if (typeof value === 'number') return value;
    if (!value) return 0;
    // Eliminar '$', espacios y puntos de mil, reemplazar coma decimal por punto
    const clean = value.replace(/[$\s.]/g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  };

  // Datos para el gráfico de barras R12 (usando los datos de la API)
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return {};

    // Categorias: Tipos de Operación (entidad)
    const categories = data.map(d => d.entidad);

    // Series: Una por periodo
    return {
      chart: { type: 'column', height: 360 },
      title: {
        text: `Evolución R12 por Tipo de Operación - ${tipoVista}`
      },
      xAxis: {
        categories: categories,
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
          if (this.y >= 1000000) return '<b>' + (this.y / 1000000).toFixed(2) + ' Millones</b>';
          if (this.y >= 1000) return '<b>' + (this.y / 1000).toFixed(2) + ' mil</b>';
          return '<b>' + this.y + '</b>';
        }
      },
      series: [
        {
          name: `Periodo ${labels.p1 || '1'}`,
          data: data.map(d => parseCurrency(d.r_1)),
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#004376'],
              [1, '#002244']
            ]
          }
        },
        {
          name: `Periodo ${labels.p2 || '2'}`,
          data: data.map(d => parseCurrency(d.r_2)),
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#007DC5'],
              [1, '#004376']
            ]
          }
        },
        {
          name: `Periodo ${labels.p3 || '3'}`,
          data: data.map(d => parseCurrency(d.r_3)),
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#00AEEF'],
              [1, '#007DC5']
            ]
          }
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
  }, [data, labels, tipoVista]);

  // Datos para el gráfico de líneas Q POL
  const lineChartData = useMemo(() => {
    if (!data || data.length === 0) return {};

    // Series: Una por Tipo de Operación
    // Eje X: Los 3 periodos
    const categories = [labels.p1 || 'Periodo 1', labels.p2 || 'Periodo 2', labels.p3 || 'Periodo 3'];

    // Mapeamos cada entidad (tipo operacion) a una serie
    const series = data.map((d, index) => {
      // Colores cíclicos o definidos
      const colors = ['#28a745', '#dc3545', '#007DC5', '#ff8c00', '#6c757d', '#6f42c1', '#e83e8c', '#20c997'];
      const color = colors[index % colors.length];
      const marker = ['circle', 'diamond', 'square', 'triangle', 'triangle-down'][index % 5];

      return {
        name: d.entidad,
        data: [d.q_1, d.q_2, d.q_3],
        color: color,
        marker: { symbol: marker } // workaround for specific symbols if possible, or let Highcharts decide
      };
    });

    return {
      chart: { type: 'line', height: 400 },
      title: {
        text: `Evolución Q POL - Comparativa Periodos`
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
      series: series,
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
  }, [data, labels]);

  return (
    <div className="space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Evolución por Tipo de Operación</h1>
        <p className="text-gray-600 mt-2">Visualice la Evolución por Tipo de Operación</p>
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
                  {['2022', '2023', '2024', '2025', '2026'].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                <select
                  value={selectedMonth1}
                  onChange={(e) => setSelectedMonth1(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[...Array(12)].map((_, i) => {
                    const m = (i + 1).toString().padStart(2, '0');
                    return <option key={m} value={m}>{m}</option>;
                  })}
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
                  {['2022', '2023', '2024', '2025', '2026'].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                <select
                  value={selectedMonth2}
                  onChange={(e) => setSelectedMonth2(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[...Array(12)].map((_, i) => {
                    const m = (i + 1).toString().padStart(2, '0');
                    return <option key={m} value={m}>{m}</option>;
                  })}
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
                  {['2022', '2023', '2024', '2025', '2026'].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                <select
                  value={selectedMonth3}
                  onChange={(e) => setSelectedMonth3(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {[...Array(12)].map((_, i) => {
                    const m = (i + 1).toString().padStart(2, '0');
                    return <option key={m} value={m}>{m}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros - Tipo de Vista, Canal, CIA y Ramo */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vista</label>
              <select
                value={tipoVista}
                onChange={(e) => setTipoVista(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="TOTAL">TODOS</option>
                <option value="ASSA">ASSA</option>
                <option value="CAS">CAS</option>
                <option value="ART">ART</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Canal</label>
              <select
                value={filtroCanal}
                onChange={(e) => setFiltroCanal(e.target.value)}
                disabled={loadingFilters}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="TODOS">TODOS</option>
                {canales.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CÍA</label>
              <select
                value={filtroCia}
                onChange={(e) => setFiltroCia(e.target.value)}
                disabled={loadingFilters}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="TODOS">TODOS</option>
                {companias.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ramo</label>
              <select
                value={filtroRamo}
                onChange={(e) => setFiltroRamo(e.target.value)}
                disabled={loadingFilters}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="TODOS">TODOS</option>
                {ramos.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Botón Aplicar Filtros (Hidden as auto-apply is working via useEffect in hook) */}
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
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Cargando datos...</span>
        </div>
      ) : (
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
