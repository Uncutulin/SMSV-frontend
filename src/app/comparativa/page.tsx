"use client";
import StatCard from '@/components/dashboard/StatCard';
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Comparativa() {

  const handleVerClick = (compania: string) => {
    console.log(`Ver detalles de ${compania}`);
    alert(`Ver detalles de ${compania}`);
  };

  // Datos de los indicadores basados en la imagen
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

  // Indicadores superiores actualizados
  const stats = [
    {
      title: 'Total Prima (R12)',
      value: `$ ${totalPrima.toLocaleString('es-AR')}`,
      icon: 'fa-solid fa-dollar-sign',
      color: 'red' as const,
      detail: `CAS: $ ${indicadoresData.CAS.R12.julio23.toLocaleString('es-AR')} | ASSA: $ ${indicadoresData.ASSA.R12.julio23.toLocaleString('es-AR')} | ART: $ ${indicadoresData.ART.R12.julio23.toLocaleString('es-AR')}`,
    },
    {
      title: 'Total Pólizas (Q PÓL)',
      value: (indicadoresData.CAS.Q_POL.julio23 + indicadoresData.ASSA.Q_POL.julio23 + indicadoresData.ART.Q_POL.julio23).toLocaleString('es-AR'),
      icon: 'fa-solid fa-file-contract',
      color: 'blue' as const,
      detail: `CAS: ${indicadoresData.CAS.Q_POL.julio23} | ASSA: ${indicadoresData.ASSA.Q_POL.julio23} | ART: ${indicadoresData.ART.Q_POL.julio23}`,
    },
    {
      title: 'Crecimiento Promedio',
      value: '7.0%',
      icon: 'fa-solid fa-chart-line',
      color: 'green' as const,
      detail: `CAS: ${indicadoresData.CAS.R12.porcentaje}% | ASSA: ${indicadoresData.ASSA.R12.porcentaje}% | ART: ${indicadoresData.ART.R12.porcentaje}%`,
    },
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Comparativa</h1>
          <p className="text-gray-600 mt-2">Indicadores R12 y Q PÓL - Junio vs Julio 2023</p>
        </div>
        
        {/* Cards de estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        <hr className="my-8 border-gray-300" />

        {/* Indicadores por compañía - Estructura de tabla compacta */}
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
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-md">
            <div className="bg-red-600 text-white px-4 py-3 font-semibold text-center">
              TOTAL PRIMA
            </div>
            <div className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">
                $ {totalPrima.toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

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
      </div>
    </DashboardLayout>
  );
} 