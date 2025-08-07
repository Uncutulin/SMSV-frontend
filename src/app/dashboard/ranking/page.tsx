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

export default function Ranking() {
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

  // Gráfico 1: Ranking por Prima Emitida (barras horizontales)
  const chart1Data = {
    chart: { type: 'bar', height: 320 },
    xAxis: {
      categories: [
        'Productores', 'Venta Directa', 'Bancaseguros', 'Canal Digital', 'Otros'
      ],
      title: { text: null },
    },
    yAxis: {
      min: 0,
      title: { text: null },
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
        data: [3202, 2100, 1800, 727, 721], // Ejemplo: Productores, Venta Directa, Bancaseguros, Canal Digital, Otros
        color: '#567caa',
      },
      {
        name: 'ASSA',
        data: [2200, 1800, 1500, 600, 500],
        color: '#4ebeb0',
      },
      {
        name: 'ART',
        data: [1800, 1200, 1000, 400, 350],
        color: '#fa9426',
      },
    ],
    credits: { enabled: false },
    legend: { enabled: true },
  };

  // Gráfico 2: Ranking por cantidad de pólizas vigentes (barras horizontales, con variación)
  const chart2Data = {
    chart: { type: 'bar', height: 320 },
    xAxis: {
      categories: filtro === 'ART' ? ['Vida'] : ['Autos', 'Vida', 'Hogar', 'Accidentes Personales', 'Comercio', 'Salud'],
      title: { text: null },
    },
    yAxis: {
      min: 0,
      title: { text: null },
      labels: { overflow: 'justify' },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          formatter: function(this: { y: number; point: { index: number } }) {
            const variaciones = ['+5.9%', '-3.1%', '+2.5%', '-2.8%', '+3.5%', '-10.0%'];
            const colores = ['#27ae60', '#e74c3c', '#27ae60', '#e74c3c', '#27ae60', '#e74c3c'];
            return `<span style='font-weight:bold;'>${this.y}</span> <span style='color:${colores[this.point.index]};font-size:11px;'>${variaciones[this.point.index]}</span>`;
          },
        },
        borderRadius: 4,
        pointPadding: 0.2,
      },
    },
    series: filtro === 'ART'
      ? [
          { name: 'ART', data: [300], color: '#fa9426' }
        ]
      : [
          { name: 'CAS', data: [800, 727, 632, 600, 500, 180], color: '#567caa' },
          { name: 'ASSA', data: [600, 500, 400, 350, 300, 120], color: '#4ebeb0' },
          { name: 'ART', data: [400, 300, 250, 200, 150, 60], color: '#fa9426' },
        ],
    credits: { enabled: false },
    legend: { enabled: true },
  };

  // Gráfico 3: Variación Porcentual y Nominal de Producción por Período (columnas agrupadas, doble eje)
  const chart3Data = {
    chart: { type: 'column', height: 320 },
    xAxis: {
      categories: ['Periodo 1', 'Periodo 2', 'Periodo 3', 'Periodo 4'],
    },
    yAxis: [
      {
        min: 0,
        title: { text: 'Variación Nominal' },
        labels: { format: '{value} U' },
      },
      {
        title: { text: 'Variación Porcentual' },
        opposite: true,
        labels: { format: '{value}%' },
        max: 10,
      },
    ],
    series: [
      {
        name: 'CAS',
        type: 'column',
        yAxis: 0,
        data: [50, 60, 100, 30],
        color: '#567caa',
        dataLabels: {
          enabled: true,
          align: 'center',
          style: { fontWeight: 'bold' },
          format: '{y} U',
        },
      },
      {
        name: 'ASSA',
        type: 'column',
        yAxis: 0,
        data: [40, 50, 80, 20],
        color: '#4ebeb0',
        dataLabels: {
          enabled: true,
          align: 'center',
          style: { fontWeight: 'bold' },
          format: '{y} U',
        },
      },
      {
        name: 'ART',
        type: 'column',
        yAxis: 0,
        data: [30, 40, 60, 10],
        color: '#fa9426',
        dataLabels: {
          enabled: true,
          align: 'center',
          style: { fontWeight: 'bold' },
          format: '{y} U',
        },
      },
    ],
    credits: { enabled: false },
    legend: { enabled: true },
  };

  // Gráfico 5: Participación de mercado de cada compañía sobre el total (pie)
  const chart5Data = {
    chart: { type: 'pie', height: 320 },
    series: [
      {
        name: 'Participación',
        data: [
          { name: 'CAS', y: 41.9, color: '#567caa' },
          { name: 'ASSA', y: 27.9, color: '#4ebeb0' },
          { name: 'ART', y: 14.2, color: '#fa9426' },
          { name: 'Otras', y: 16.0, color: '#9b59b6' },
        ],
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
  const chart5DataFiltrado = {
    ...chart5Data,
    series: filtrarSeries(chart5Data.series, filtro),
  };

  return (
    <div className="space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Ranking de Compañías / Productores</h1>
        <p className="text-gray-600 mt-2">Análisis comparativo de rendimiento por compañía y productor</p>
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
          title="Ranking por Prima emitida"
          data={chart1DataFiltrado}
        />
        <HighchartsChart
          id="chart2"
          type="bar"
          title="Ranking por cantidad de pólizas vigentes"
          data={chart2DataFiltrado}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HighchartsChart
          id="chart3"
          type="column"
          title="Variación Porcentual y Nominal de Producción por Período"
          data={chart3DataFiltrado}
        />
        {filtro === 'TODOS' && (
          <HighchartsChart
            id="chart5"
            type="pie"
            title="Participación de cada compañía sobre el total"
            data={chart5DataFiltrado}
          />
        )}
      </div>
    </div>
  );
} 