'use client';

import StatCard from '@/components/dashboard/StatCard';
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import { useState } from 'react';

export default function Dashboard() {
  const [filtro, setFiltro] = useState<'TODOS' | 'CAS' | 'ASSA' | 'ART'>('TODOS');

  const handleVerClick = (compania: string) => {
    // Navegar a la página correspondiente o mostrar modal
    console.log(`Ver detalles de ${compania}`);
    // Por ahora solo mostraremos un alert, pero aquí se puede implementar
    // navegación a una página específica o abrir un modal
    alert(`Ver detalles de ${compania}`);
  };

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
        onVerClick: () => handleVerClick('CAS'),
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 80.000.000',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
        trend: 'up' as const,
        trendValue: '+7% vs mes anterior',
        onVerClick: () => handleVerClick('CAS'),
      },
      {
        title: 'Cancelaciones',
        value: '90',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
        trend: 'down' as const,
        trendValue: '-2% vs mes anterior',
        onVerClick: () => handleVerClick('CAS'),
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
        onVerClick: () => handleVerClick('ASSA'),
      },
      {
        title: 'Primas Emitidas Totales',
        value: '$ 70.000.000',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
        trend: 'up' as const,
        trendValue: '+6% vs mes anterior',
        onVerClick: () => handleVerClick('ASSA'),
      },
      {
        title: 'Cancelaciones',
        value: '110',
        icon: 'fa-solid fa-ban',
        color: 'red' as const,
        trend: 'down' as const,
        trendValue: '-3% vs mes anterior',
        onVerClick: () => handleVerClick('ASSA'),
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

  // Gráfico 1: Cantidad de Pólizas Activas por Período (línea)
  const chart1Data = {
    chart: { type: 'line', height: 320 },
    xAxis: {
      categories: [
        "Ene '23", "Feb '23", "Mar '23", "Abr '23", "May '23", "Jun '23", "Jul '23", "Ago '23", "Sep '23", "Oct '23", "Nov '23", "Dic '23"
      ],
      title: { text: 'Período' },
    },
    yAxis: {
      title: { text: 'Cantidad de Pólizas Activas' },
      min: 0,
      max: 2000,
    },
    series: filtro === 'ART'
      ? [
          { name: 'Estructura Única', data: [900, 920, 940, 950, 960, 970, 980, 990, 1000, 1010, 1020, 1030], color: '#fa9426' }
        ]
      : [
          { name: 'Estructura A - Ramo Vida', data: [1500, 1520, 1510, 1540, 1540, 1540, 1590, 1590, 1620, 1620, 1620, 1610], color: '#007cc5' },
          { name: 'Estructura B - Ramo Auto', data: [1050, 1065, 1100, 1125, 1150, 1160, 1200, 1200, 1220, 1250, 1250, 1260], color: '#004376' },
          { name: 'Estructura A - Ramo Hogar', data: [800, 810, 805, 820, 840, 860, 870, 880, 890, 900, 910, 910], color: '#74671f' },
        ],
    credits: { enabled: false },
  };

  // Gráfico 2: Dinámica de Pólizas por Período (columnas apiladas)
  const chart2Data = {
    chart: { type: 'column', height: 320 },
    xAxis: {
      categories: [
        "Ene '23", "Feb '23", "Mar '23", "Abr '23", "May '23", "Jun '23", "Jul '23", "Ago '23", "Sep '23", "Oct '23", "Nov '23", "Dic '23"
      ],
      title: { text: 'Período' },
    },
    yAxis: {
      min: 0,
      title: { text: 'Cantidad de Pólizas' },
    },
    legend: { reversed: false },
    plotOptions: {
      column: { stacking: 'normal', dataLabels: { enabled: true } }
    },
    series: [
      { name: 'Altas', data: [150, 160, 170, 170, 155, 180, 190, 200, 220, 230, 230, 200], color: '#007cc5' },
      { name: 'Renovaciones', data: [320, 320, 310, 340, 340, 350, 350, 350, 380, 400, 400, 380], color: '#004376' },
      { name: 'Bajas y Cancelaciones', data: [50, 55, 50, 45, 70, 65, 75, 80, 90, 96, 100, 70], color: '#74671f' },
    ],
    credits: { enabled: false },
  };

  // Gráfico 3: Principales Motivos de Cancelación de Pólizas (pie)
  const chart3Data = {
    chart: { type: 'pie', height: 320 },
    series: [
      {
        name: 'Motivos',
        data: [
          { name: 'Precio Elevado', y: 34.6, color: '#004376' },
          { name: 'Mala Atención al Cliente', y: 22.8, color: '#007cc5' },
          { name: 'Cambio a Competencia (Mejor Oferta)', y: 20.2, color: '#74671f' },
          { name: 'No Necesita Más la Cobertura', y: 13.8, color: '#e74c3c' },
          { name: 'Falta de Coberturas Específicas', y: 9.6, color: '#9b59b6' },
        ],
      },
    ],
    credits: { enabled: false },
    legend: { enabled: true },
  };

  // Gráfico 4: Prima Emitida por Ramo y Canal de Venta (columnas agrupadas)
  const chart4Data = {
    chart: { type: 'column', height: 320 },
    xAxis: {
      categories: ['Autos', 'Vida', 'Hogar', 'Accidentes Personales (AP)', 'Consorcio'],
      title: { text: 'Ramo del Producto' },
    },
    yAxis: {
      min: 0,
      title: { text: 'Prima Emitida (mil)' },
    },
    legend: { reversed: false },
    plotOptions: {
      column: { grouping: true, shadow: false, borderWidth: 0 }
    },
    series: [
      { name: 'Productores', data: [1300, 900, 700, 400, 300], color: '#007cc5' },
      { name: 'Venta Directa', data: [1100, 1000, 600, 350, 200], color: '#004376' },
      { name: 'Bancaseguros', data: [700, 1200, 400, 200, 100], color: '#74671f' },
      { name: 'Canal Digital', data: [400, 300, 250, 100, 80], color: '#e74c3c' },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="space-y-6">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Evolución de la Cartera de Clientes</h1>
        <p className="text-gray-600 mt-2">Análisis detallado del comportamiento de la cartera de seguros</p>
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
          type="line"
          title="Cantidad de Pólizas Activas por Período"
          data={chart1Data}
        />
        <HighchartsChart
          id="chart2"
          type="column"
          title="Dinámica de Pólizas por Período"
          data={chart2Data}
        />
        {filtro !== 'ART' && (
          <HighchartsChart
            id="chart3"
            type="pie"
            title="Principales Motivos de Cancelación de Pólizas"
            data={chart3Data}
          />
        )}
        {filtro !== 'ART' && (
          <HighchartsChart
            id="chart4"
            type="column"
            title="Prima Emitida por Ramo y Canal de Venta"
            data={chart4Data}
          />
        )}
      </div>
      
    </div>
  );
} 