"use client";

import HighchartsChart from '@/components/dashboard/HighchartsChart';
import StatCard from '@/components/dashboard/StatCard';

export default function Campanias() {
  // Indicadores principales
  const stats = [
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
      title: 'Cancelaciones del Mes',
      value: '270',
      icon: 'fa-solid fa-ban',
      color: 'red' as const,
      trend: 'down' as const,
      trendValue: '-5% vs mes anterior',
    },
  ];

  // Datos de ejemplo para segmentación de clientes
  const chartData = {
    chart: { type: 'pie', height: 320 },
    title: { text: '' },
    series: [
      {
        name: 'Clientes',
        colorByPoint: true,
        data: [
          { name: 'Jóvenes (18-30)', y: 35, color: '#4ebeb0' },
          { name: 'Adultos (31-50)', y: 40, color: '#567caa' },
          { name: 'Mayores (51+)', y: 20, color: '#fa9426' },
          { name: 'Empresas', y: 5, color: '#e74c3c' },
        ],
      },
    ],
    credits: { enabled: false },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: '110%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
  };

  // Datos de ejemplo para oportunidades de venta cruzada
  const chartCrossSell = {
    chart: { type: 'bar', height: 320 },
    xAxis: {
      categories: ['Auto', 'Vida', 'Hogar', 'Salud', 'Comercio'],
      title: { text: 'Ramo/Producto' },
    },
    yAxis: {
      min: 0,
      title: { text: 'Oportunidades de Venta Cruzada' },
      allowDecimals: false,
    },
    legend: { reversed: true },
    plotOptions: {
      series: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: 'Clientes con 2 productos',
        data: [40, 30, 20, 25, 15],
        color: '#4ebeb0',
      },
      {
        name: 'Clientes con 3 o más productos',
        data: [15, 10, 8, 12, 5],
        color: '#fa9426',
      },
      {
        name: 'Clientes con 1 producto (potencial)',
        data: [60, 70, 80, 75, 85],
        color: '#567caa',
      },
    ],
    credits: { enabled: false },
  };

  // Datos de ejemplo para identificación de segmentos con alto potencial
  const chartHighPotential = {
    chart: { type: 'column', height: 320 },
    xAxis: {
      categories: ['Jóvenes', 'Adultos', 'Mayores', 'Empresas', 'Familias'],
      title: { text: 'Segmento' },
    },
    yAxis: {
      min: 0,
      title: { text: 'Potencial de Venta (Índice)' },
      allowDecimals: false,
    },
    series: [
      {
        name: 'Potencial',
        data: [85, 92, 60, 75, 88],
        color: '#4ebeb0',
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="space-y-6 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Campañas Comerciales y Oportunidades de Venta</h1>
        <p className="text-gray-600 mt-2">Análisis de campañas, oportunidades comerciales y segmentación de clientes</p>
      </div>
      {/* Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
      {/* Gráficos principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="w-full">
          <HighchartsChart
            id="segmentacion-clientes"
            type="pie"
            title="Segmentación de clientes para marketing dirigido"
            data={chartData}
          />
        </div>
        <div className="w-full">
          <HighchartsChart
            id="cross-sell"
            type="bar"
            title="Oportunidades de venta cruzada entre ramos/productos"
            data={chartCrossSell}
          />
        </div>
      </div>
      {/* Gráficos inferiores en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full mt-8">
        <div className="w-full">
          <HighchartsChart
            id="high-potential"
            type="column"
            title="Identificación de segmentos con alto potencial"
            data={chartHighPotential}
          />
        </div>
        {/*
        <div className="w-full">
          <HighchartsChart
            id="campaign-results"
            type="line"
            title="Seguimiento de resultados de campañas"
            data={chartCampaignResults}
          />
        </div>
        */}
      </div>  
    </div>
  );
} 