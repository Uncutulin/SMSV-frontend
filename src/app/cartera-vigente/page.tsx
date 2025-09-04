'use client';

import StatCard from '@/components/dashboard/StatCard';
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import { useState } from 'react';

export default function CarteraVigente() {
  const [filtro, setFiltro] = useState<'TODOS' | 'CAS' | 'ASSA' | 'ART'>('TODOS');

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
        title: 'Primas Emitidas Totales',
        value: '$ 218.844.404',
        icon: 'fa-regular fa-id-badge',
        color: 'blue' as const,
      },
      {
        title: 'Cancelaciones',
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
        <p className="text-gray-600 mt-2">Análisis de la cartera vigente por compañía</p>
      </div>
      
      {/* Tabs de filtro */}
      <div className="flex justify-center gap-4 mb-6">
        {['TODOS', 'CAS', 'ASSA', 'ART'].map((opcion) => (
          <button
            key={opcion}
            className={`px-4 py-2 rounded font-semibold border transition-colors duration-200 ${
              filtro === opcion 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
            }`}
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
      
      {/* Ranking de PAS (GRUPO) */}
      <div className="mt-8">
        <HighchartsChart
          id="ranking-pas"
          type="bar"
          title="Ranking de PAS (GRUPO)"
          data={rankingPASData[filtro]}
        />
      </div>
    </div>
  );
}
