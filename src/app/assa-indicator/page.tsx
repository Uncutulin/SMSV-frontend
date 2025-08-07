'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import HighchartsChart from '@/components/dashboard/HighchartsChart';

export default function ASSAIndicatorPage() {
  const router = useRouter();
  const [showCarteraVigente, setShowCarteraVigente] = useState(false);
  const [showEvolucionPrima, setShowEvolucionPrima] = useState(false);
  const [showRankingBroker, setShowRankingBroker] = useState(false);
  const [showComparativoProduccion, setShowComparativoProduccion] = useState(false);
  const [showArtJulio, setShowArtJulio] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const handleCarteraVigenteClick = () => {
    setShowCarteraVigente(true);
    setShowEvolucionPrima(false);
    setShowRankingBroker(false);
    setShowComparativoProduccion(false);
    setShowArtJulio(false);
  };

  const handleEvolucionPrimaClick = () => {
    setShowCarteraVigente(false);
    setShowEvolucionPrima(true);
    setShowRankingBroker(false);
    setShowComparativoProduccion(false);
    setShowArtJulio(false);
  };

  const handleRankingBrokerClick = () => {
    setShowCarteraVigente(false);
    setShowEvolucionPrima(false);
    setShowRankingBroker(true);
    setShowComparativoProduccion(false);
    setShowArtJulio(false);
  };

  const handleComparativoProduccionClick = () => {
    setShowCarteraVigente(false);
    setShowEvolucionPrima(false);
    setShowRankingBroker(false);
    setShowComparativoProduccion(true);
    setShowArtJulio(false);
  };

  const handleArtJulioClick = () => {
    setShowCarteraVigente(false);
    setShowEvolucionPrima(false);
    setShowRankingBroker(false);
    setShowComparativoProduccion(false);
    setShowArtJulio(true);
  };

  const handleBackToASSA = () => {
    setShowCarteraVigente(false);
    setShowEvolucionPrima(false);
    setShowRankingBroker(false);
    setShowComparativoProduccion(false);
    setShowArtJulio(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Indicador ASSA</h1>
            <button
              onClick={handleBackClick}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Volver
            </button>
          </div>

          {/* ASSA Indicator - Centered */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h2 className="text-xl font-semibold">Indicador ASSA</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicadores</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Junio 23</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Julio 23</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Crec.</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">R12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">$980.000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">$1.050.000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">$70.000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">7.1%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q PÓL</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">650</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">720</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">70</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">10.8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons Section - Moved above charts */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleCarteraVigenteClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              CARTERA VIGENTE JULIO 2023
            </button>
            <button
              onClick={handleEvolucionPrimaClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Evolucion Prima BROKER Jul 23 - Jul 22
            </button>
            <button
              onClick={handleRankingBrokerClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Ranking Broker P&C
            </button>
            <button
              onClick={handleComparativoProduccionClick}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Comparativo Produccion Compañias JULIO 23 vs Junio 23
            </button>
            <button
              onClick={handleArtJulioClick}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ART JULIO 2023
            </button>
          </div>

          {/* Content Area - Charts or Tables */}
          <div className="mt-6">
            {/* Show Charts by default */}
            {!showCarteraVigente && !showEvolucionPrima && !showRankingBroker && !showComparativoProduccion && !showArtJulio && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico R12 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">R12 - Prima</h3>
                  <HighchartsChart
                    id="r12-chart"
                    type="column"
                    title="R12 - Prima"
                    data={{
                      xAxis: { categories: ['Junio 23', 'Julio 23'] },
                      yAxis: {
                        title: { text: 'Prima ($)' },
                        labels: {
                          formatter: function(this: { value: number }) {
                            return '$' + (this.value / 1000).toFixed(0) + 'k';
                          }
                        }
                      },
                      series: [{
                        name: 'R12',
                        data: [980000, 1050000],
                        color: '#3B82F6'
                      }],
                      tooltip: {
                        formatter: function(this: { x: string; series: { name: string }; y: number }) {
                          return '<b>' + this.x + '</b><br/>' +
                                 this.series.name + ': $' + this.y.toLocaleString();
                        }
                      },
                      plotOptions: {
                        column: {
                          dataLabels: {
                            enabled: true,
                            formatter: function(this: { y: number }) {
                              return '$' + (this.y / 1000).toFixed(0) + 'k';
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>

                {/* Gráfico Q PÓL */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Q PÓL - Pólizas</h3>
                  <HighchartsChart
                    id="qpol-chart"
                    type="column"
                    title="Q PÓL - Pólizas"
                    data={{
                      xAxis: { categories: ['Junio 23', 'Julio 23'] },
                      yAxis: {
                        title: { text: 'Pólizas' },
                        labels: {
                          formatter: function(this: { value: number }) {
                            return this.value.toLocaleString();
                          }
                        }
                      },
                      series: [{
                        name: 'Q PÓL',
                        data: [650, 720],
                        color: '#10B981'
                      }],
                      tooltip: {
                        formatter: function(this: { x: string; series: { name: string }; y: number }) {
                          return '<b>' + this.x + '</b><br/>' +
                                 this.series.name + ': ' + this.y.toLocaleString();
                        }
                      },
                      plotOptions: {
                        column: {
                          dataLabels: {
                            enabled: true,
                            formatter: function(this: { y: number }) {
                              return this.y.toLocaleString();
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* CARTERA VIGENTE JULIO 2023 Table */}
            {showCarteraVigente && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold">CARTERA VIGENTE JULIO 2023</h3>
                  <button
                    onClick={handleBackToASSA}
                    className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    <i className="fa-solid fa-times mr-1"></i>
                    Cerrar
                  </button>
                </div>
                
                {/* Header with date */}
                <div className="bg-blue-800 text-white px-6 py-2 text-center">
                  <h4 className="text-lg font-semibold">202307</h4>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left side - Property and Final tables */}
                    <div className="space-y-6">
                      {/* Property Table */}
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-blue-600 text-white px-4 py-2">
                          <h5 className="font-semibold">Property</h5>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-blue-600 text-white">
                              <tr>
                                <th className="px-4 py-2 text-left">Sección</th>
                                <th className="px-4 py-2 text-center">Prima Anual</th>
                                <th className="px-4 py-2 text-center">Cantidad</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Caución</td>
                                <td className="px-4 py-2 text-center">$450.000</td>
                                <td className="px-4 py-2 text-center">85</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Incendio</td>
                                <td className="px-4 py-2 text-center">$320.000</td>
                                <td className="px-4 py-2 text-center">120</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Integral de Comercio</td>
                                <td className="px-4 py-2 text-center">$280.000</td>
                                <td className="px-4 py-2 text-center">95</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Integral de Consorcio</td>
                                <td className="px-4 py-2 text-center">$180.000</td>
                                <td className="px-4 py-2 text-center">45</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Robo y Rs. Vs</td>
                                <td className="px-4 py-2 text-center">$150.000</td>
                                <td className="px-4 py-2 text-center">60</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Final Table */}
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-blue-600 text-white px-4 py-2">
                          <h5 className="font-semibold">Final</h5>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-blue-600 text-white">
                              <tr>
                                <th className="px-4 py-2 text-left">Sección</th>
                                <th className="px-4 py-2 text-center">Prima Anual</th>
                                <th className="px-4 py-2 text-center">Cantidad</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">ART</td>
                                <td className="px-4 py-2 text-center">$420.000</td>
                                <td className="px-4 py-2 text-center">180</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Automotores + Motos</td>
                                <td className="px-4 py-2 text-center">$380.000</td>
                                <td className="px-4 py-2 text-center">220</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Combinado Familiar</td>
                                <td className="px-4 py-2 text-center">$290.000</td>
                                <td className="px-4 py-2 text-center">145</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Property</td>
                                <td className="px-4 py-2 text-center">$1.380.000</td>
                                <td className="px-4 py-2 text-center">405</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Salud</td>
                                <td className="px-4 py-2 text-center">$240.000</td>
                                <td className="px-4 py-2 text-center">160</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Otros</td>
                                <td className="px-4 py-2 text-center">$520.000</td>
                                <td className="px-4 py-2 text-center">280</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Otros table */}
                    <div>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-blue-600 text-white px-4 py-2">
                          <h5 className="font-semibold">Otros</h5>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-blue-600 text-white">
                              <tr>
                                <th className="px-4 py-2 text-left">Sección</th>
                                <th className="px-4 py-2 text-center">Prima Anual</th>
                                <th className="px-4 py-2 text-center">Cantidad</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Accidentes Personales</td>
                                <td className="px-4 py-2 text-center">$180.000</td>
                                <td className="px-4 py-2 text-center">120</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Aeronavegación</td>
                                <td className="px-4 py-2 text-center">$45.000</td>
                                <td className="px-4 py-2 text-center">15</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Bolso protegido</td>
                                <td className="px-4 py-2 text-center">$85.000</td>
                                <td className="px-4 py-2 text-center">65</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Embarcaciones</td>
                                <td className="px-4 py-2 text-center">$35.000</td>
                                <td className="px-4 py-2 text-center">12</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Responsabilidad Civil</td>
                                <td className="px-4 py-2 text-center">$75.000</td>
                                <td className="px-4 py-2 text-center">28</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Seguro Técnico</td>
                                <td className="px-4 py-2 text-center">$55.000</td>
                                <td className="px-4 py-2 text-center">18</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Sepelio</td>
                                <td className="px-4 py-2 text-center">$45.000</td>
                                <td className="px-4 py-2 text-center">22</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Transportes</td>
                                <td className="px-4 py-2 text-center">$25.000</td>
                                <td className="px-4 py-2 text-center">8</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Vida Grupo</td>
                                <td className="px-4 py-2 text-center">$0</td>
                                <td className="px-4 py-2 text-center">0</td>
                              </tr>
                              <tr className="border-b border-gray-200">
                                <td className="px-4 py-2 font-medium">Vida Individual</td>
                                <td className="px-4 py-2 text-center">$0</td>
                                <td className="px-4 py-2 text-center">0</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary rows */}
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-center bg-blue-100 text-blue-900 px-4 py-2 rounded">
                      <span className="font-semibold">Total sin ART:</span>
                      <div className="flex gap-8">
                        <span>Prima Anual: $2.230.000</span>
                        <span>Cantidad: 1.390</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-blue-100 text-blue-900 px-4 py-2 rounded">
                      <span className="font-semibold">Total con ART:</span>
                      <div className="flex gap-8">
                        <span>Prima Anual: $2.650.000</span>
                        <span>Cantidad: 1.570</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-blue-800 text-white px-4 py-2 rounded">
                      <span className="font-semibold">Megapro:</span>
                      <span>$180.000</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-800 text-white px-4 py-2 rounded">
                      <span className="font-semibold">Total con MGP:</span>
                      <span>$2.830.000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EVOLUCION PRIMA BROKER Table */}
            {showEvolucionPrima && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Evolucion Prima BROKER Jul 23 - Jul 22</h3>
                  <button
                    onClick={handleBackToASSA}
                    className="bg-white text-green-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    <i className="fa-solid fa-times mr-1"></i>
                    Cerrar
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-800 text-white">
                      <tr>
                        <th className="px-4 py-2 text-left">Sección</th>
                        <th className="px-4 py-2 text-center">jul-22</th>
                        <th className="px-4 py-2 text-center">jul-23</th>
                        <th className="px-4 py-2 text-center" colSpan={2}>Crecimiento</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Automotores + Motos</td>
                        <td className="px-4 py-2 text-center">$380.000</td>
                        <td className="px-4 py-2 text-center">$420.000</td>
                        <td className="px-4 py-2 text-center">$40.000</td>
                        <td className="px-4 py-2 text-center">10.5%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Combinado Familiar</td>
                        <td className="px-4 py-2 text-center">$290.000</td>
                        <td className="px-4 py-2 text-center">$320.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">10.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Salud</td>
                        <td className="px-4 py-2 text-center">$240.000</td>
                        <td className="px-4 py-2 text-center">$260.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">8.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Responsabilidad Civil</td>
                        <td className="px-4 py-2 text-center">$75.000</td>
                        <td className="px-4 py-2 text-center">$85.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">13.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Caución</td>
                        <td className="px-4 py-2 text-center">$450.000</td>
                        <td className="px-4 py-2 text-center">$480.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">6.7%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Integral de Consorcio</td>
                        <td className="px-4 py-2 text-center">$180.000</td>
                        <td className="px-4 py-2 text-center">$200.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">11.1%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Integral de Comercio</td>
                        <td className="px-4 py-2 text-center">$280.000</td>
                        <td className="px-4 py-2 text-center">$310.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">10.7%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Bolso protegido</td>
                        <td className="px-4 py-2 text-center">$85.000</td>
                        <td className="px-4 py-2 text-center">$95.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">11.8%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Accidentes Personales</td>
                        <td className="px-4 py-2 text-center">$180.000</td>
                        <td className="px-4 py-2 text-center">$200.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">11.1%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Incendio</td>
                        <td className="px-4 py-2 text-center">$320.000</td>
                        <td className="px-4 py-2 text-center">$350.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">9.4%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Seguro Técnico</td>
                        <td className="px-4 py-2 text-center">$55.000</td>
                        <td className="px-4 py-2 text-center">$60.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">9.1%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Sepelio</td>
                        <td className="px-4 py-2 text-center">$45.000</td>
                        <td className="px-4 py-2 text-center">$50.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">11.1%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Robo y Rs. Vs</td>
                        <td className="px-4 py-2 text-center">$150.000</td>
                        <td className="px-4 py-2 text-center">$165.000</td>
                        <td className="px-4 py-2 text-center">$15.000</td>
                        <td className="px-4 py-2 text-center">10.0%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Transportes</td>
                        <td className="px-4 py-2 text-center">$25.000</td>
                        <td className="px-4 py-2 text-center">$28.000</td>
                        <td className="px-4 py-2 text-center">$3.000</td>
                        <td className="px-4 py-2 text-center">12.0%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Vida Grupo</td>
                        <td className="px-4 py-2 text-center">$0</td>
                        <td className="px-4 py-2 text-center">$0</td>
                        <td className="px-4 py-2 text-center">$0</td>
                        <td className="px-4 py-2 text-center">0.0%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Embarcaciones</td>
                        <td className="px-4 py-2 text-center">$35.000</td>
                        <td className="px-4 py-2 text-center">$38.000</td>
                        <td className="px-4 py-2 text-center">$3.000</td>
                        <td className="px-4 py-2 text-center">8.6%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Aeronavegación</td>
                        <td className="px-4 py-2 text-center">$45.000</td>
                        <td className="px-4 py-2 text-center">$48.000</td>
                        <td className="px-4 py-2 text-center">$3.000</td>
                        <td className="px-4 py-2 text-center">6.7%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">Vida Individual</td>
                        <td className="px-4 py-2 text-center">$0</td>
                        <td className="px-4 py-2 text-center">$0</td>
                        <td className="px-4 py-2 text-center">$0</td>
                        <td className="px-4 py-2 text-center">0.0%</td>
                      </tr>
                      
                      {/* ASSA Subtotal */}
                      <tr className="bg-blue-800 text-white font-bold">
                        <td className="px-4 py-2">ASSA</td>
                        <td className="px-4 py-2 text-center">$2.230.000</td>
                        <td className="px-4 py-2 text-center">$2.450.000</td>
                        <td className="px-4 py-2 text-center">$220.000</td>
                        <td className="px-4 py-2 text-center">9.9%</td>
                      </tr>
                      
                      {/* ART Section */}
                      <tr className="bg-blue-800 text-white font-bold">
                        <td className="px-4 py-2">ART</td>
                        <td className="px-4 py-2 text-center"></td>
                        <td className="px-4 py-2 text-center"></td>
                        <td className="px-4 py-2 text-center"></td>
                        <td className="px-4 py-2 text-center"></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">ART</td>
                        <td className="px-4 py-2 text-center">$420.000</td>
                        <td className="px-4 py-2 text-center">$450.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">7.1%</td>
                      </tr>
                      
                      {/* TOTAL ASSA */}
                      <tr className="bg-blue-800 text-white font-bold">
                        <td className="px-4 py-2">TOTAL ASSA</td>
                        <td className="px-4 py-2 text-center">$2.650.000</td>
                        <td className="px-4 py-2 text-center">$2.900.000</td>
                        <td className="px-4 py-2 text-center">$250.000</td>
                        <td className="px-4 py-2 text-center">9.4%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* RANKING BROKER P&C Table */}
            {showRankingBroker && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="bg-purple-600 text-white px-6 py-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Ranking Broker P&C</h3>
                  <button
                    onClick={handleBackToASSA}
                    className="bg-white text-purple-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    <i className="fa-solid fa-times mr-1"></i>
                    Cerrar
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-800 text-white">
                      <tr>
                        <th className="px-4 py-2 text-left">CÍA</th>
                        <th className="px-4 py-2 text-center" colSpan={4}>Q POL</th>
                        <th className="px-4 py-2 text-center" colSpan={4}>R12</th>
                      </tr>
                      <tr className="bg-purple-700 text-white">
                        <th className="px-4 py-2 text-left"></th>
                        <th className="px-4 py-2 text-center">jun-23</th>
                        <th className="px-4 py-2 text-center">jul-23</th>
                        <th className="px-4 py-2 text-center">Dif</th>
                        <th className="px-4 py-2 text-center">%</th>
                        <th className="px-4 py-2 text-center">jun-23</th>
                        <th className="px-4 py-2 text-center">jul-23</th>
                        <th className="px-4 py-2 text-center">Dif</th>
                        <th className="px-4 py-2 text-center">%</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">SMG</td>
                        <td className="px-4 py-2 text-center">$450.000</td>
                        <td className="px-4 py-2 text-center">$480.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">6.7%</td>
                        <td className="px-4 py-2 text-center">$520.000</td>
                        <td className="px-4 py-2 text-center">$550.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">5.8%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">LMA</td>
                        <td className="px-4 py-2 text-center">$380.000</td>
                        <td className="px-4 py-2 text-center">$410.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">7.9%</td>
                        <td className="px-4 py-2 text-center">$420.000</td>
                        <td className="px-4 py-2 text-center">$450.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">7.1%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">SANCOR</td>
                        <td className="px-4 py-2 text-center">$320.000</td>
                        <td className="px-4 py-2 text-center">$340.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">6.3%</td>
                        <td className="px-4 py-2 text-center">$380.000</td>
                        <td className="px-4 py-2 text-center">$400.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">5.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">INTEGRITY</td>
                        <td className="px-4 py-2 text-center">$280.000</td>
                        <td className="px-4 py-2 text-center">$300.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">7.1%</td>
                        <td className="px-4 py-2 text-center">$320.000</td>
                        <td className="px-4 py-2 text-center">$340.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">6.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">SMG LIFE</td>
                        <td className="px-4 py-2 text-center">$150.000</td>
                        <td className="px-4 py-2 text-center">$160.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">6.7%</td>
                        <td className="px-4 py-2 text-center">$180.000</td>
                        <td className="px-4 py-2 text-center">$190.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">5.6%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">ALLIANZ</td>
                        <td className="px-4 py-2 text-center">$420.000</td>
                        <td className="px-4 py-2 text-center">$450.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">7.1%</td>
                        <td className="px-4 py-2 text-center">$480.000</td>
                        <td className="px-4 py-2 text-center">$510.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">6.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">FED PAT</td>
                        <td className="px-4 py-2 text-center">$200.000</td>
                        <td className="px-4 py-2 text-center">$220.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">10.0%</td>
                        <td className="px-4 py-2 text-center">$240.000</td>
                        <td className="px-4 py-2 text-center">$260.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">8.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">BOSTON</td>
                        <td className="px-4 py-2 text-center">$180.000</td>
                        <td className="px-4 py-2 text-center">$190.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">5.6%</td>
                        <td className="px-4 py-2 text-center">$220.000</td>
                        <td className="px-4 py-2 text-center">$230.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">4.5%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">CHUBB</td>
                        <td className="px-4 py-2 text-center">$350.000</td>
                        <td className="px-4 py-2 text-center">$380.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">8.6%</td>
                        <td className="px-4 py-2 text-center">$400.000</td>
                        <td className="px-4 py-2 text-center">$430.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">7.5%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">ATM</td>
                        <td className="px-4 py-2 text-center">$120.000</td>
                        <td className="px-4 py-2 text-center">$130.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">8.3%</td>
                        <td className="px-4 py-2 text-center">$140.000</td>
                        <td className="px-4 py-2 text-center">$150.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">7.1%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">PRUDENCIA</td>
                        <td className="px-4 py-2 text-center">$90.000</td>
                        <td className="px-4 py-2 text-center">$95.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">5.6%</td>
                        <td className="px-4 py-2 text-center">$110.000</td>
                        <td className="px-4 py-2 text-center">$115.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">4.5%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">COSENA</td>
                        <td className="px-4 py-2 text-center">$160.000</td>
                        <td className="px-4 py-2 text-center">$170.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">6.3%</td>
                        <td className="px-4 py-2 text-center">$190.000</td>
                        <td className="px-4 py-2 text-center">$200.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">5.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">LIBRA</td>
                        <td className="px-4 py-2 text-center">$140.000</td>
                        <td className="px-4 py-2 text-center">$150.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">7.1%</td>
                        <td className="px-4 py-2 text-center">$170.000</td>
                        <td className="px-4 py-2 text-center">$180.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">5.9%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">NOBLE</td>
                        <td className="px-4 py-2 text-center">$110.000</td>
                        <td className="px-4 py-2 text-center">$120.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">9.1%</td>
                        <td className="px-4 py-2 text-center">$130.000</td>
                        <td className="px-4 py-2 text-center">$140.000</td>
                        <td className="px-4 py-2 text-center">$10.000</td>
                        <td className="px-4 py-2 text-center">7.7%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">LA HOLANDO</td>
                        <td className="px-4 py-2 text-center">$95.000</td>
                        <td className="px-4 py-2 text-center">$100.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">5.3%</td>
                        <td className="px-4 py-2 text-center">$115.000</td>
                        <td className="px-4 py-2 text-center">$120.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">4.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">VICTORIA</td>
                        <td className="px-4 py-2 text-center">$85.000</td>
                        <td className="px-4 py-2 text-center">$90.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">5.9%</td>
                        <td className="px-4 py-2 text-center">$105.000</td>
                        <td className="px-4 py-2 text-center">$110.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">4.8%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">RUS</td>
                        <td className="px-4 py-2 text-center">$75.000</td>
                        <td className="px-4 py-2 text-center">$80.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">6.7%</td>
                        <td className="px-4 py-2 text-center">$95.000</td>
                        <td className="px-4 py-2 text-center">$100.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">5.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">AFIANZADORA</td>
                        <td className="px-4 py-2 text-center">$65.000</td>
                        <td className="px-4 py-2 text-center">$70.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">7.7%</td>
                        <td className="px-4 py-2 text-center">$85.000</td>
                        <td className="px-4 py-2 text-center">$90.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">5.9%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">CAUCIONES</td>
                        <td className="px-4 py-2 text-center">$55.000</td>
                        <td className="px-4 py-2 text-center">$60.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">9.1%</td>
                        <td className="px-4 py-2 text-center">$75.000</td>
                        <td className="px-4 py-2 text-center">$80.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">6.7%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">RIVADAVIA</td>
                        <td className="px-4 py-2 text-center">$45.000</td>
                        <td className="px-4 py-2 text-center">$50.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">11.1%</td>
                        <td className="px-4 py-2 text-center">$65.000</td>
                        <td className="px-4 py-2 text-center">$70.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">7.7%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">HDI</td>
                        <td className="px-4 py-2 text-center">$40.000</td>
                        <td className="px-4 py-2 text-center">$45.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">12.5%</td>
                        <td className="px-4 py-2 text-center">$55.000</td>
                        <td className="px-4 py-2 text-center">$60.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">9.1%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">TPC</td>
                        <td className="px-4 py-2 text-center">$35.000</td>
                        <td className="px-4 py-2 text-center">$40.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">14.3%</td>
                        <td className="px-4 py-2 text-center">$45.000</td>
                        <td className="px-4 py-2 text-center">$50.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">11.1%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">ZURICH</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">$35.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">16.7%</td>
                        <td className="px-4 py-2 text-center">$40.000</td>
                        <td className="px-4 py-2 text-center">$45.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">12.5%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">NACION</td>
                        <td className="px-4 py-2 text-center">$25.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">20.0%</td>
                        <td className="px-4 py-2 text-center">$35.000</td>
                        <td className="px-4 py-2 text-center">$40.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">14.3%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">CALEDONIA</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">$25.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">25.0%</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">$35.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">16.7%</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">HANSEATICA</td>
                        <td className="px-4 py-2 text-center">$15.000</td>
                        <td className="px-4 py-2 text-center">$20.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">33.3%</td>
                        <td className="px-4 py-2 text-center">$25.000</td>
                        <td className="px-4 py-2 text-center">$30.000</td>
                        <td className="px-4 py-2 text-center">$5.000</td>
                        <td className="px-4 py-2 text-center">20.0%</td>
                      </tr>
                      
                      {/* TOTAL Row */}
                      <tr className="bg-purple-800 text-white font-bold">
                        <td className="px-4 py-2">TOTAL</td>
                        <td className="px-4 py-2 text-center">$3.850.000</td>
                        <td className="px-4 py-2 text-center">$4.150.000</td>
                        <td className="px-4 py-2 text-center">$300.000</td>
                        <td className="px-4 py-2 text-center">7.8%</td>
                        <td className="px-4 py-2 text-center">$4.450.000</td>
                        <td className="px-4 py-2 text-center">$4.750.000</td>
                        <td className="px-4 py-2 text-center">$300.000</td>
                        <td className="px-4 py-2 text-center">6.7%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* COMPARATIVO PRODUCCION COMPAÑIAS Table */}
            {showComparativoProduccion && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="bg-orange-600 text-white px-4 py-3 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Comparativo Produccion Compañias JULIO 23 vs Junio 23</h3>
                  <button
                    onClick={handleBackToASSA}
                    className="bg-white text-orange-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    <i className="fa-solid fa-times mr-1"></i>
                    Cerrar
                  </button>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* SMG Table */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-orange-600 text-white px-3 py-2">
                        <h4 className="font-semibold text-sm">SMG</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-orange-700 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left">Sección</th>
                              <th className="px-2 py-1 text-center" colSpan={2}>Cantidad</th>
                              <th className="px-2 py-1 text-center" colSpan={2}>Prima</th>
                            </tr>
                            <tr className="bg-orange-600 text-white">
                              <th className="px-2 py-1 text-left"></th>
                              <th className="px-2 py-1 text-center">JUNIO 23</th>
                              <th className="px-2 py-1 text-center">JULIO 23</th>
                              <th className="px-2 py-1 text-center">JUNIO 23</th>
                              <th className="px-2 py-1 text-center">JULIO 23</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">AUTOMOTORES</td>
                              <td className="px-2 py-1 text-center">180</td>
                              <td className="px-2 py-1 text-center">195</td>
                              <td className="px-2 py-1 text-center">$320k</td>
                              <td className="px-2 py-1 text-center">$350k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">COMB. FLIAR.</td>
                              <td className="px-2 py-1 text-center">145</td>
                              <td className="px-2 py-1 text-center">160</td>
                              <td className="px-2 py-1 text-center">$280k</td>
                              <td className="px-2 py-1 text-center">$310k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CAUCIÓN</td>
                              <td className="px-2 py-1 text-center">85</td>
                              <td className="px-2 py-1 text-center">95</td>
                              <td className="px-2 py-1 text-center">$450k</td>
                              <td className="px-2 py-1 text-center">$480k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">PRAXIS</td>
                              <td className="px-2 py-1 text-center">65</td>
                              <td className="px-2 py-1 text-center">70</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                              <td className="px-2 py-1 text-center">$190k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">ROBO</td>
                              <td className="px-2 py-1 text-center">120</td>
                              <td className="px-2 py-1 text-center">135</td>
                              <td className="px-2 py-1 text-center">$150k</td>
                              <td className="px-2 py-1 text-center">$165k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INT. COMERCIO</td>
                              <td className="px-2 py-1 text-center">95</td>
                              <td className="px-2 py-1 text-center">105</td>
                              <td className="px-2 py-1 text-center">$280k</td>
                              <td className="px-2 py-1 text-center">$310k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">SEGURO TÉCNICO</td>
                              <td className="px-2 py-1 text-center">55</td>
                              <td className="px-2 py-1 text-center">60</td>
                              <td className="px-2 py-1 text-center">$55k</td>
                              <td className="px-2 py-1 text-center">$60k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">RC</td>
                              <td className="px-2 py-1 text-center">75</td>
                              <td className="px-2 py-1 text-center">85</td>
                              <td className="px-2 py-1 text-center">$75k</td>
                              <td className="px-2 py-1 text-center">$85k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">AP</td>
                              <td className="px-2 py-1 text-center">160</td>
                              <td className="px-2 py-1 text-center">180</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                              <td className="px-2 py-1 text-center">$200k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INCENDIO</td>
                              <td className="px-2 py-1 text-center">120</td>
                              <td className="px-2 py-1 text-center">130</td>
                              <td className="px-2 py-1 text-center">$320k</td>
                              <td className="px-2 py-1 text-center">$350k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INT. CONSORCIO</td>
                              <td className="px-2 py-1 text-center">45</td>
                              <td className="px-2 py-1 text-center">50</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                              <td className="px-2 py-1 text-center">$200k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CASCOS</td>
                              <td className="px-2 py-1 text-center">35</td>
                              <td className="px-2 py-1 text-center">40</td>
                              <td className="px-2 py-1 text-center">$35k</td>
                              <td className="px-2 py-1 text-center">$40k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">TRANSPORTES</td>
                              <td className="px-2 py-1 text-center">25</td>
                              <td className="px-2 py-1 text-center">28</td>
                              <td className="px-2 py-1 text-center">$25k</td>
                              <td className="px-2 py-1 text-center">$28k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">MOTOS</td>
                              <td className="px-2 py-1 text-center">220</td>
                              <td className="px-2 py-1 text-center">240</td>
                              <td className="px-2 py-1 text-center">$380k</td>
                              <td className="px-2 py-1 text-center">$420k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CRISTALES</td>
                              <td className="px-2 py-1 text-center">15</td>
                              <td className="px-2 py-1 text-center">18</td>
                              <td className="px-2 py-1 text-center">$15k</td>
                              <td className="px-2 py-1 text-center">$18k</td>
                            </tr>
                            
                            {/* SMG Total Row */}
                            <tr className="bg-orange-100 text-orange-900 font-bold">
                              <td className="px-2 py-1">Total</td>
                              <td className="px-2 py-1 text-center">1.320</td>
                              <td className="px-2 py-1 text-center">1.456</td>
                              <td className="px-2 py-1 text-center">$2.700k</td>
                              <td className="px-2 py-1 text-center">$2.922k</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* La Mercantil Andina Table */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-orange-600 text-white px-3 py-2">
                        <h4 className="font-semibold text-sm">La Mercantil Andina</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-orange-700 text-white">
                            <tr>
                              <th className="px-2 py-1 text-left">Sección</th>
                              <th className="px-2 py-1 text-center" colSpan={2}>Cantidad</th>
                              <th className="px-2 py-1 text-center" colSpan={2}>Prima</th>
                            </tr>
                            <tr className="bg-orange-600 text-white">
                              <th className="px-2 py-1 text-left"></th>
                              <th className="px-2 py-1 text-center">JUNIO 23</th>
                              <th className="px-2 py-1 text-center">JULIO 23</th>
                              <th className="px-2 py-1 text-center">JUNIO 23</th>
                              <th className="px-2 py-1 text-center">JULIO 23</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">AUTOMOTORES</td>
                              <td className="px-2 py-1 text-center">160</td>
                              <td className="px-2 py-1 text-center">175</td>
                              <td className="px-2 py-1 text-center">$280k</td>
                              <td className="px-2 py-1 text-center">$310k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">COMB. FLIAR.</td>
                              <td className="px-2 py-1 text-center">125</td>
                              <td className="px-2 py-1 text-center">140</td>
                              <td className="px-2 py-1 text-center">$240k</td>
                              <td className="px-2 py-1 text-center">$270k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">AP</td>
                              <td className="px-2 py-1 text-center">140</td>
                              <td className="px-2 py-1 text-center">160</td>
                              <td className="px-2 py-1 text-center">$160k</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">RC</td>
                              <td className="px-2 py-1 text-center">65</td>
                              <td className="px-2 py-1 text-center">75</td>
                              <td className="px-2 py-1 text-center">$65k</td>
                              <td className="px-2 py-1 text-center">$75k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INT. CONSORCIO</td>
                              <td className="px-2 py-1 text-center">40</td>
                              <td className="px-2 py-1 text-center">45</td>
                              <td className="px-2 py-1 text-center">$160k</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">SEGURO TÉCNICO</td>
                              <td className="px-2 py-1 text-center">50</td>
                              <td className="px-2 py-1 text-center">55</td>
                              <td className="px-2 py-1 text-center">$50k</td>
                              <td className="px-2 py-1 text-center">$55k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INT. COMERCIO</td>
                              <td className="px-2 py-1 text-center">85</td>
                              <td className="px-2 py-1 text-center">95</td>
                              <td className="px-2 py-1 text-center">$240k</td>
                              <td className="px-2 py-1 text-center">$270k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INCENDIO</td>
                              <td className="px-2 py-1 text-center">110</td>
                              <td className="px-2 py-1 text-center">120</td>
                              <td className="px-2 py-1 text-center">$280k</td>
                              <td className="px-2 py-1 text-center">$310k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">TRANSPORTES</td>
                              <td className="px-2 py-1 text-center">20</td>
                              <td className="px-2 py-1 text-center">23</td>
                              <td className="px-2 py-1 text-center">$20k</td>
                              <td className="px-2 py-1 text-center">$23k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">MOTOS</td>
                              <td className="px-2 py-1 text-center">200</td>
                              <td className="px-2 py-1 text-center">220</td>
                              <td className="px-2 py-1 text-center">$340k</td>
                              <td className="px-2 py-1 text-center">$380k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">VIDA</td>
                              <td className="px-2 py-1 text-center">30</td>
                              <td className="px-2 py-1 text-center">35</td>
                              <td className="px-2 py-1 text-center">$30k</td>
                              <td className="px-2 py-1 text-center">$35k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CAUCIÓN</td>
                              <td className="px-2 py-1 text-center">75</td>
                              <td className="px-2 py-1 text-center">85</td>
                              <td className="px-2 py-1 text-center">$400k</td>
                              <td className="px-2 py-1 text-center">$430k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CASCOS</td>
                              <td className="px-2 py-1 text-center">30</td>
                              <td className="px-2 py-1 text-center">35</td>
                              <td className="px-2 py-1 text-center">$30k</td>
                              <td className="px-2 py-1 text-center">$35k</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">ROBO y RS. VS.</td>
                              <td className="px-2 py-1 text-center">100</td>
                              <td className="px-2 py-1 text-center">115</td>
                              <td className="px-2 py-1 text-center">$120k</td>
                              <td className="px-2 py-1 text-center">$135k</td>
                            </tr>
                            
                            {/* La Mercantil Andina Total Row */}
                            <tr className="bg-orange-100 text-orange-900 font-bold">
                              <td className="px-2 py-1">Total</td>
                              <td className="px-2 py-1 text-center">1.130</td>
                              <td className="px-2 py-1 text-center">1.258</td>
                              <td className="px-2 py-1 text-center">$2.215k</td>
                              <td className="px-2 py-1 text-center">$2.433k</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ART JULIO 2023 Table */}
            {showArtJulio && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold">ART JULIO 2023</h3>
                  <button
                    onClick={handleBackToASSA}
                    className="bg-white text-red-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    <i className="fa-solid fa-times mr-1"></i>
                    Cerrar
                  </button>
                </div>
                
                <div className="space-y-6 p-6">
                  {/* Primera tabla: ART JULIO 23 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-4 py-3 text-center">
                      <h4 className="text-lg font-semibold">ART JULIO 23</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700 text-white">
                          <tr>
                            <th className="px-4 py-2 text-left">COMPAÑÍA</th>
                            <th className="px-4 py-2 text-center">CONTRATOS</th>
                            <th className="px-4 py-2 text-center">CÁPITAS</th>
                            <th className="px-4 py-2 text-center">PRIMA ANUAL</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">PREVENCION ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">ASOCIART ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">SMG ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">PROVINCIA ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">FED PAT</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">EXPERTA ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">OMINT ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">LA HOLANDO ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2 font-medium">GALENO ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="bg-gray-800 text-white font-bold">
                            <td className="px-4 py-2">TOTAL</td>
                            <td className="px-4 py-2 text-center">$ XXXX</td>
                            <td className="px-4 py-2 text-center">$ XXXX</td>
                            <td className="px-4 py-2 text-center">$ XXXX</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Segunda tabla: COMPARATIVO JUNIO 23 vs JULIO 23 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-4 py-3 text-center">
                      <h4 className="text-lg font-semibold">COMPARATIVO JUNIO 23 vs JULIO 23</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700 text-white">
                          <tr>
                            <th className="px-4 py-2 text-left">PERÍODO</th>
                            <th className="px-4 py-2 text-left">COMPAÑÍA</th>
                            <th className="px-4 py-2 text-center" colSpan={2}>JUNIO 23</th>
                            <th className="px-4 py-2 text-center" colSpan={2}>JULIO 23</th>
                          </tr>
                          <tr className="bg-gray-600 text-white">
                            <th className="px-4 py-2 text-left"></th>
                            <th className="px-4 py-2 text-left"></th>
                            <th className="px-4 py-2 text-center">PRIMA ANUAL</th>
                            <th className="px-4 py-2 text-center">CONTRATOS</th>
                            <th className="px-4 py-2 text-center">PRIMA ANUAL</th>
                            <th className="px-4 py-2 text-center">CONTRATOS</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">PREVENCION ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">ASOCIART ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">SMG ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">PROVINCIA ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">FED PAT</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">EXPERTA ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">OMINT ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">LA HOLANDO ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2 font-medium">GALENO ART</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                            <td className="px-4 py-2 text-center">XXXX</td>
                          </tr>
                          <tr className="bg-gray-800 text-white font-bold">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2">TOTAL</td>
                            <td className="px-4 py-2 text-center">$ XXXX</td>
                            <td className="px-4 py-2 text-center">$ XXXX</td>
                            <td className="px-4 py-2 text-center">$ XXXX</td>
                            <td className="px-4 py-2 text-center">$ XXXX</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 