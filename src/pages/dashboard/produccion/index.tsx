'use client';

import StatCard from '@/components/dashboard/StatCard';
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import { useState } from 'react';

// Definir tipo para las series de Highcharts
interface SerieHighcharts {
  name: string;
  data: unknown;
  color?: string;
  [key: string]: unknown;
}

export default function Produccion() {
  const [filtro, setFiltro] = useState<'TODOS' | 'CAS' | 'ASSA' | 'ART'>('TODOS');

  // Datos de ejemplo por compañía
  const statsPorCompania = {
    TODOS: [
      {
        title: 'Asegurados Activos',
        value: '3.500',
        icon: 'fa-solid fa-users',
        color: 'green' as const,
        trend: 'up' as const,
        trendValue: '+12% vs mes anterior',
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 218.844.404',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
        trend: 'up' as const,
        trendValue: '+8% vs mes anterior',
      },
      {
        title: 'Cancelaciones',
        value: '270',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
        trend: 'down' as const,
        trendValue: '-5% vs mes anterior',
      },
    ],
    CAS: [
      {
        title: 'Asegurados Activos',
        value: '1.500',
        icon: 'fa-solid fa-users',
        color: 'green' as const,
        trend: 'up' as const,
        trendValue: '+10% vs mes anterior',
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 80.000.000',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
        trend: 'up' as const,
        trendValue: '+7% vs mes anterior',
      },
      {
        title: 'Cancelaciones',
        value: '90',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
        trend: 'down' as const,
        trendValue: '-2% vs mes anterior',
      },
    ],
    ASSA: [
      {
        title: 'Asegurados Activos',
        value: '1.200',
        icon: 'fa-solid fa-users',
        color: 'green' as const,
        trend: 'up' as const,
        trendValue: '+8% vs mes anterior',
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 70.000.000',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
        trend: 'up' as const,
        trendValue: '+6% vs mes anterior',
      },
      {
        title: 'Cancelaciones',
        value: '110',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
        trend: 'down' as const,
        trendValue: '-3% vs mes anterior',
      },
    ],
    ART: [
      {
        title: 'Asegurados Activos',
        value: '800',
        icon: 'fa-solid fa-users',
        color: 'green' as const,
        trend: 'up' as const,
        trendValue: '+5% vs mes anterior',
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 68.844.404',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
        trend: 'up' as const,
        trendValue: '+4% vs mes anterior',
      },
      {
        title: 'Cancelaciones',
        value: '70',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
        trend: 'down' as const,
        trendValue: '-1% vs mes anterior',
      },
    ],
  };

  // Gráfico 1: Producción Total por Compañía Estratégica (barras horizontales)
  const chart1Data = {
    chart: { type: 'bar', height: 320 },
    xAxis: {
      categories: ['2023', '2024', '2025'],
      title: { text: null },
    },
    yAxis: {
      min: 0,
      title: { text: 'Unidades Producidas (Total)' },
      labels: { overflow: 'justify' },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          align: 'right',
          inside: false,
          style: { fontWeight: 'bold' },
          format: '{y} mil',
        },
        borderRadius: 4,
        pointPadding: 0.2,
      },
    },
    series: [
      {
        name: 'CAS',
        data: [180, 210, 195],
        color: '#004376',
      },
      {
        name: 'ASSA',
        data: [140, 160, 175],
        color: '#007cc5',
      },
      {
        name: 'ART',
        data: [90, 120, 110],
        color: '#74671f',
      },
    ],
    credits: { enabled: false },
    legend: { enabled: true },
  };

  // Gráfico 2: Evolución Temporal de Producción (línea)
  const chart2Data = {
    chart: { type: 'line', height: 320 },
    xAxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      title: { text: 'Mes' },
    },
    yAxis: {
      title: { text: 'Producción (unidades)' },
    },
    series: [
      { name: 'CAS', data: [1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300], color: '#004376' },
      { name: 'ASSA', data: [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100], color: '#007cc5' },
      { name: 'ART', data: [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900], color: '#74671f' },
    ],
    credits: { enabled: false },
    legend: { enabled: true },
  };

  // Gráfico 3: Comparación de Producción: Estratégicas vs. No Estratégicas (column)
  const chart3Data = {
    chart: { type: 'column', height: 320 },
    xAxis: {
      categories: ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 4', 'Trimestre 5'],
      title: { text: 'Periodo' },
    },
    yAxis: {
      min: 0,
      title: { text: 'Producción (Unidades)' },
      max: 8000000,
      labels: {
        formatter: function(this: { value: number }) {
          if (this.value >= 1000000) return (this.value / 1000000) + ' M';
          if (this.value >= 1000) return (this.value / 1000) + ' mil';
          return this.value;
        }
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          inside: false,
          style: { fontWeight: 'bold' },
          formatter: function(this: { y: number }) {
            if (this.y >= 1000000) return (this.y / 1000000) + ' M';
            if (this.y >= 1000) return (this.y / 1000) + ' mil';
            return this.y;
          }
        },
        grouping: true,
        shadow: false,
      },
    },
    series: [
      {
        name: 'CAS',
        data: [520000, 5800000, 610000, 550000, 6300000],
        color: '#004376',
      },
      {
        name: 'ASSA',
        data: [350000, 320000, 3800000, 400000, 370000],
        color: '#007cc5',
      },
      {
        name: 'ART',
        data: [250000, 220000, 1800000, 200000, 170000],
        color: '#74671f',
      },
    ],
    credits: { enabled: false },
    legend: { enabled: true },
  };

  // Función para filtrar series por compañía
  const filtrarSeries = (series: SerieHighcharts[], filtro: string) => {
    if (filtro === 'TODOS') return series;
    return series.filter(s => s.name && s.name.toUpperCase().includes(filtro));
  };

  // Filtrar series de los gráficos que correspondan
  const chart1DataFiltrado = {
    ...chart1Data,
    series: filtrarSeries(chart1Data.series, filtro),
  };
  const chart2DataFiltrado = {
    ...chart2Data,
    series: filtrarSeries(chart2Data.series, filtro),
  };
  const chart3DataFiltrado = {
    ...chart3Data,
    series: filtrarSeries(chart3Data.series, filtro),
  };

  return (
    <div className="space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Producción de Compañías Estratégicas</h1>
        <p className="text-gray-600 mt-2">Análisis especializado de las compañías estratégicas del sistema</p>
      </div>
      {/* Tabs de filtro */}
      <div className="flex justify-center gap-4 mb-6">
        {['TODOS', 'CAS', 'ASSA', 'ART'].map((opcion) => (
          <button
            key={opcion}
            className={`px-4 py-2 rounded font-semibold border transition-colors duration-200 ${filtro === opcion ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
            onClick={() => setFiltro(opcion as 'TODOS' | 'CAS' | 'ASSA' | 'ART')}
          >
            {opcion}
          </button>
        ))}
      </div>
      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsPorCompania[filtro].map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HighchartsChart
          id="chart1"
          type="bar"
          title="Producción Total por Compañía Estratégica"
          data={chart1DataFiltrado}
        />
        <HighchartsChart
          id="chart2"
          type="line"
          title="Evolución Temporal de Compañías Estratégicas"
          data={chart2DataFiltrado}
        />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <HighchartsChart
          id="chart3"
          type="column"
          title="Comparación de Producción: Estratégicas vs. No Estratégicas"
          data={chart3DataFiltrado}
        />
      </div>
    </div>
  );
} 