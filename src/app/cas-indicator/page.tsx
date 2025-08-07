'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import HighchartsChart from '@/components/dashboard/HighchartsChart';

export default function CASIndicatorPage() {
  const router = useRouter();
  const [showCarteraSMSV, setShowCarteraSMSV] = useState(false);
  const [showEscolta, setShowEscolta] = useState(false);
  const [showSepelioEjercito, setShowSepelioEjercito] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const handleCarteraSMSVClick = () => {
    setShowCarteraSMSV(true);
    setShowEscolta(false);
    setShowSepelioEjercito(false);
  };

  const handleEscoltaClick = () => {
    setShowEscolta(true);
    setShowCarteraSMSV(false);
    setShowSepelioEjercito(false);
  };

  const handleSepelioEjercitoClick = () => {
    setShowSepelioEjercito(true);
    setShowCarteraSMSV(false);
    setShowEscolta(false);
  };

  const handleBackToCAS = () => {
    setShowCarteraSMSV(false);
    setShowEscolta(false);
    setShowSepelioEjercito(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Indicador CAS</h1>
            <button
              onClick={handleBackClick}
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Volver
            </button>
          </div>

                                 {/* CAS Indicator - Centered */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2">
                <h3 className="text-lg font-bold">CAS</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Indicadores</th>
                      <th className="px-4 py-2 text-center">Junio 23</th>
                      <th className="px-4 py-2 text-center">Julio 23</th>
                      <th className="px-4 py-2 text-center">Crec.</th>
                      <th className="px-4 py-2 text-center">%</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">R12</td>
                      <td className="px-4 py-2 text-center">$ 1.250.000</td>
                      <td className="px-4 py-2 text-center">$ 1.320.000</td>
                      <td className="px-4 py-2 text-center">$ 70.000</td>
                      <td className="px-4 py-2 text-center text-green-600">+5.6%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">Q PÓL</td>
                      <td className="px-4 py-2 text-center">850</td>
                      <td className="px-4 py-2 text-center">920</td>
                      <td className="px-4 py-2 text-center">+70</td>
                      <td className="px-4 py-2 text-center text-green-600">+8.2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Buttons Section - Moved above charts */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button 
                onClick={handleCarteraSMSVClick}
                className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              >
                Cartera SMSV Cía. Argentina de Seguros
              </button>
              <button 
                onClick={handleEscoltaClick}
                className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-purple-600 text-white hover:bg-purple-700 shadow-md"
              >
                ESCOLTA - GESTIÓN COMERCIAL VENTAS NUEVAS
              </button>
              <button 
                onClick={handleSepelioEjercitoClick}
                className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-green-600 text-white hover:bg-green-700 shadow-md"
              >
                SEPELIO EJÉCRITO - GESTIÓN COMERCIAL VENTAS NUEVAS
              </button>
            </div>

            {/* Content Area - Charts or Tables */}
            <div className="mt-6">
              {/* Show Charts by default */}
              {!showCarteraSMSV && !showEscolta && !showSepelioEjercito && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico R12 */}
                  <HighchartsChart
                    id="r12-chart"
                    type="column"
                    title="R12 - Prima (Junio vs Julio 2023)"
                    data={{
                      xAxis: {
                        categories: ['Junio 23', 'Julio 23']
                      },
                      yAxis: {
                        title: {
                          text: 'Prima ($)'
                        },
                        labels: {
                          formatter: function(this: { value: number }) {
                            return '$' + (this.value / 1000000).toFixed(1) + 'M';
                          }
                        }
                      },
                      series: [{
                        name: 'R12',
                        data: [1250000, 1320000],
                        color: '#3B82F6'
                      }],
                      tooltip: {
                        formatter: function(this: { x: string; series: { name: string }; y: number }) {
                          return '<b>' + this.x + '</b><br/>' +
                                 '<b>' + this.series.name + ':</b> $' + 
                                 this.y.toLocaleString('es-AR');
                        }
                      },
                      plotOptions: {
                        column: {
                          borderRadius: 4,
                          dataLabels: {
                            enabled: true,
                            formatter: function(this: { y: number }) {
                              return '$' + (this.y / 1000000).toFixed(1) + 'M';
                            }
                          }
                        }
                      }
                    }}
                  />

                  {/* Gráfico Q PÓL */}
                  <HighchartsChart
                    id="qpol-chart"
                    type="column"
                    title="Q PÓL - Pólizas (Junio vs Julio 2023)"
                    data={{
                      xAxis: {
                        categories: ['Junio 23', 'Julio 23']
                      },
                      yAxis: {
                        title: {
                          text: 'Cantidad de Pólizas'
                        }
                      },
                      series: [{
                        name: 'Q PÓL',
                        data: [850, 920],
                        color: '#10B981'
                      }],
                      tooltip: {
                        formatter: function(this: { x: string; series: { name: string }; y: number }) {
                          return '<b>' + this.x + '</b><br/>' +
                                 '<b>' + this.series.name + ':</b> ' + 
                                 this.y.toLocaleString('es-AR');
                        }
                      },
                      plotOptions: {
                        column: {
                          borderRadius: 4,
                          dataLabels: {
                            enabled: true,
                            formatter: function(this: { y: number }) {
                              return this.y.toLocaleString('es-AR');
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              )}

              {/* Cartera SMSV Table - Replaces charts */}
              {showCarteraSMSV && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                  <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Cartera SMSV Cía. Argentina de Seguros</h3>
                    <button
                      onClick={handleBackToCAS}
                      className="px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <i className="fa-solid fa-times"></i>
                      Cerrar
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-blue-800 text-white">
                          <th className="px-4 py-2 text-left">RAMO</th>
                          <th className="px-4 py-2 text-center" colSpan={3}>Q POL</th>
                          <th className="px-4 py-2 text-center" colSpan={3}>Q ASEGURADOS</th>
                          <th className="px-4 py-2 text-center" colSpan={3}>R12</th>
                        </tr>
                        <tr className="bg-blue-600 text-white">
                          <th className="px-4 py-2 text-left"></th>
                          <th className="px-4 py-2 text-center">202306</th>
                          <th className="px-4 py-2 text-center">202307</th>
                          <th className="px-4 py-2 text-center">Crecimiento</th>
                          <th className="px-4 py-2 text-center">202306</th>
                          <th className="px-4 py-2 text-center">202307</th>
                          <th className="px-4 py-2 text-center">Crecimiento</th>
                          <th className="px-4 py-2 text-center">202306</th>
                          <th className="px-4 py-2 text-center">202307</th>
                          <th className="px-4 py-2 text-center">Crecimiento</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-medium">VIDA COLECTIVO</td>
                          <td className="px-4 py-2 text-center">1,250</td>
                          <td className="px-4 py-2 text-center">1,320</td>
                          <td className="px-4 py-2 text-center bg-blue-100">+70</td>
                          <td className="px-4 py-2 text-center">8,500</td>
                          <td className="px-4 py-2 text-center">8,920</td>
                          <td className="px-4 py-2 text-center bg-blue-100">+420</td>
                          <td className="px-4 py-2 text-center">$ 2.150.000</td>
                          <td className="px-4 py-2 text-center">$ 2.280.000</td>
                          <td className="px-4 py-2 text-center bg-blue-100">$ 130.000</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-medium">SEPELIO COLECTIVO</td>
                          <td className="px-4 py-2 text-center">890</td>
                          <td className="px-4 py-2 text-center">950</td>
                          <td className="px-4 py-2 text-center bg-blue-100">+60</td>
                          <td className="px-4 py-2 text-center">6,200</td>
                          <td className="px-4 py-2 text-center">6,650</td>
                          <td className="px-4 py-2 text-center bg-blue-100">+450</td>
                          <td className="px-4 py-2 text-center">$ 1.850.000</td>
                          <td className="px-4 py-2 text-center">$ 1.980.000</td>
                          <td className="px-4 py-2 text-center bg-blue-100">$ 130.000</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-medium">VIDA IND. C/ AHORRO</td>
                          <td className="px-4 py-2 text-center">650</td>
                          <td className="px-4 py-2 text-center">720</td>
                          <td className="px-4 py-2 text-center bg-blue-100">+70</td>
                          <td className="px-4 py-2 text-center">4,800</td>
                          <td className="px-4 py-2 text-center">5,200</td>
                          <td className="px-4 py-2 text-center bg-blue-100">+400</td>
                          <td className="px-4 py-2 text-center">$ 1.450.000</td>
                          <td className="px-4 py-2 text-center">$ 1.620.000</td>
                          <td className="px-4 py-2 text-center bg-blue-100">$ 170.000</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="px-4 py-2 font-medium">SALDO DEUDOR</td>
                          <td className="px-4 py-2 text-center">420</td>
                          <td className="px-4 py-2 text-center">480</td>
                          <td className="px-4 py-2 text-center bg-blue-100">+60</td>
                          <td className="px-4 py-2 text-center">3,200</td>
                          <td className="px-4 py-2 text-center">3,600</td>
                          <td className="px-4 py-2 text-center bg-blue-100">+400</td>
                          <td className="px-4 py-2 text-center">$ 980.000</td>
                          <td className="px-4 py-2 text-center">$ 1.120.000</td>
                          <td className="px-4 py-2 text-center bg-blue-100">$ 140.000</td>
                        </tr>
                        <tr className="bg-blue-800 text-white font-bold">
                          <td className="px-4 py-2">TOTAL</td>
                          <td className="px-4 py-2 text-center">3,210</td>
                          <td className="px-4 py-2 text-center">3,470</td>
                          <td className="px-4 py-2 text-center">+260</td>
                          <td className="px-4 py-2 text-center">22,700</td>
                          <td className="px-4 py-2 text-center">24,370</td>
                          <td className="px-4 py-2 text-center">+1,670</td>
                          <td className="px-4 py-2 text-center">$ 6.430.000</td>
                          <td className="px-4 py-2 text-center">$ 7.000.000</td>
                          <td className="px-4 py-2 text-center">$ 570.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ESCOLTA Tables - Replaces charts */}
              {showEscolta && (
                <div>
                  {/* Header with ESCOLTA logo and title */}
                  <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 rounded-lg p-3">
                        <div className="text-blue-600 font-bold text-lg">ESCOLTA</div>
                      </div>
                      <h2 className="text-2xl font-bold text-blue-800">GESTIÓN COMERCIAL VENTAS NUEVAS</h2>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">JULIO 2023</div>
                  </div>

                  {/* Two tables side by side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Table: Data by Emission Date */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                      <div className="bg-blue-800 text-white px-4 py-2">
                        <h3 className="text-lg font-bold">Datos por Fecha de Emisión</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-blue-800 text-white">
                            <tr>
                              <th className="px-4 py-2 text-left">Fecha emisión</th>
                              <th className="px-4 py-2 text-center">Q certificados</th>
                              <th className="px-4 py-2 text-center">Prima emitida</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">2021</td>
                              <td className="px-4 py-2 text-center">2,450</td>
                              <td className="px-4 py-2 text-center">$ 3.250.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">2022</td>
                              <td className="px-4 py-2 text-center">3,120</td>
                              <td className="px-4 py-2 text-center">$ 4.180.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">ENERO 2023</td>
                              <td className="px-4 py-2 text-center">280</td>
                              <td className="px-4 py-2 text-center">$ 420.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">FEBRERO 2023</td>
                              <td className="px-4 py-2 text-center">320</td>
                              <td className="px-4 py-2 text-center">$ 480.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">MARZO 2023</td>
                              <td className="px-4 py-2 text-center">350</td>
                              <td className="px-4 py-2 text-center">$ 525.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">ABRIL 2023</td>
                              <td className="px-4 py-2 text-center">380</td>
                              <td className="px-4 py-2 text-center">$ 570.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">MAYO 2023</td>
                              <td className="px-4 py-2 text-center">420</td>
                              <td className="px-4 py-2 text-center">$ 630.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">JUNIO 2023</td>
                              <td className="px-4 py-2 text-center">450</td>
                              <td className="px-4 py-2 text-center">$ 675.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">JULIO 2023</td>
                              <td className="px-4 py-2 text-center">480</td>
                              <td className="px-4 py-2 text-center">$ 720.000</td>
                            </tr>
                            <tr className="bg-blue-800 text-white font-bold">
                              <td className="px-4 py-2">Total general</td>
                              <td className="px-4 py-2 text-center">8,180</td>
                              <td className="px-4 py-2 text-center">$ 11.350.000</td>
                            </tr>
                            <tr className="bg-blue-100 text-gray-900">
                              <td className="px-4 py-2 font-medium">Prima anualizada</td>
                              <td className="px-4 py-2 text-center"></td>
                              <td className="px-4 py-2 text-center">$ 136.200.000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Right Table: Data by Channel */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                      <div className="bg-blue-800 text-white px-4 py-2">
                        <h3 className="text-lg font-bold">Datos por Canal</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-blue-800 text-white">
                            <tr>
                              <th className="px-4 py-2 text-left">CANAL</th>
                              <th className="px-4 py-2 text-center">Q certificados</th>
                              <th className="px-4 py-2 text-center">Prima emitida</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">CANAL FILIALES</td>
                              <td className="px-4 py-2 text-center">3,850</td>
                              <td className="px-4 py-2 text-center">$ 5.390.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">CANAL PAS</td>
                              <td className="px-4 py-2 text-center">2,120</td>
                              <td className="px-4 py-2 text-center">$ 2.968.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">CALL CENTER</td>
                              <td className="px-4 py-2 text-center">1,560</td>
                              <td className="px-4 py-2 text-center">$ 2.184.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">ALI - LEG</td>
                              <td className="px-4 py-2 text-center">650</td>
                              <td className="px-4 py-2 text-center">$ 808.000</td>
                            </tr>
                            <tr className="bg-blue-800 text-white font-bold">
                              <td className="px-4 py-2">Total general</td>
                              <td className="px-4 py-2 text-center">8,180</td>
                              <td className="px-4 py-2 text-center">$ 11.350.000</td>
                            </tr>
                            <tr className="bg-blue-100 text-gray-900">
                              <td className="px-4 py-2 font-medium">Prima anualizada</td>
                              <td className="px-4 py-2 text-center"></td>
                              <td className="px-4 py-2 text-center">$ 136.200.000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Close button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleBackToCAS}
                      className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                    >
                      <i className="fa-solid fa-times mr-2"></i>
                      Cerrar
                    </button>
                  </div>
                </div>
              )}

              {/* SEPELIO EJÉRCITO Tables - Replaces charts */}
              {showSepelioEjercito && (
                <div>
                  {/* Header with SEPELIO EJÉRCITO logo and title */}
                  <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 rounded-lg p-3">
                        <div className="text-green-600 font-bold text-lg">SEPELIO EJÉRCITO</div>
                      </div>
                      <h2 className="text-2xl font-bold text-blue-800">GESTIÓN COMERCIAL VENTAS NUEVAS</h2>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">JULIO 2023</div>
                  </div>

                  {/* Two tables side by side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Table: Data by Emission Date */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                      <div className="bg-blue-800 text-white px-4 py-2">
                        <h3 className="text-lg font-bold">Datos por Fecha de Emisión</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-blue-800 text-white">
                            <tr>
                              <th className="px-4 py-2 text-left">Fecha emisión</th>
                              <th className="px-4 py-2 text-center">Q certificados</th>
                              <th className="px-4 py-2 text-center">Prima emitida</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">2019</td>
                              <td className="px-4 py-2 text-center">1,850</td>
                              <td className="px-4 py-2 text-center">$ 2.775.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">2020</td>
                              <td className="px-4 py-2 text-center">2,100</td>
                              <td className="px-4 py-2 text-center">$ 3.150.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">2021</td>
                              <td className="px-4 py-2 text-center">2,450</td>
                              <td className="px-4 py-2 text-center">$ 3.675.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">2022</td>
                              <td className="px-4 py-2 text-center">2,800</td>
                              <td className="px-4 py-2 text-center">$ 4.200.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">ENERO 2023</td>
                              <td className="px-4 py-2 text-center">320</td>
                              <td className="px-4 py-2 text-center">$ 480.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">FEBRERO 2023</td>
                              <td className="px-4 py-2 text-center">350</td>
                              <td className="px-4 py-2 text-center">$ 525.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">MARZO 2023</td>
                              <td className="px-4 py-2 text-center">380</td>
                              <td className="px-4 py-2 text-center">$ 570.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">ABRIL 2023</td>
                              <td className="px-4 py-2 text-center">420</td>
                              <td className="px-4 py-2 text-center">$ 630.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">MAYO 2023</td>
                              <td className="px-4 py-2 text-center">450</td>
                              <td className="px-4 py-2 text-center">$ 675.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">JUNIO</td>
                              <td className="px-4 py-2 text-center">480</td>
                              <td className="px-4 py-2 text-center">$ 720.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">JULIO 2023</td>
                              <td className="px-4 py-2 text-center">520</td>
                              <td className="px-4 py-2 text-center">$ 780.000</td>
                            </tr>
                            <tr className="bg-blue-800 text-white font-bold">
                              <td className="px-4 py-2">Total general</td>
                              <td className="px-4 py-2 text-center">9,920</td>
                              <td className="px-4 py-2 text-center">$ 14.880.000</td>
                            </tr>
                            <tr className="bg-blue-100 text-gray-900">
                              <td className="px-4 py-2 font-medium">Prima anualizada</td>
                              <td className="px-4 py-2 text-center"></td>
                              <td className="px-4 py-2 text-center">$ 178.560.000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Right Table: Data by Channel */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                      <div className="bg-blue-800 text-white px-4 py-2">
                        <h3 className="text-lg font-bold">Datos por Canal</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-blue-800 text-white">
                            <tr>
                              <th className="px-4 py-2 text-left">CANAL</th>
                              <th className="px-4 py-2 text-center">Q certificados</th>
                              <th className="px-4 py-2 text-center">Prima emitida</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">ALIADO + LEGADO</td>
                              <td className="px-4 py-2 text-center">2,480</td>
                              <td className="px-4 py-2 text-center">$ 3.720.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">CALL CENTER + CC</td>
                              <td className="px-4 py-2 text-center">1,860</td>
                              <td className="px-4 py-2 text-center">$ 2.790.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">CANAL DIRECTO</td>
                              <td className="px-4 py-2 text-center">1,240</td>
                              <td className="px-4 py-2 text-center">$ 1.860.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">CANAL FILIALES</td>
                              <td className="px-4 py-2 text-center">2,480</td>
                              <td className="px-4 py-2 text-center">$ 3.720.000</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-2 font-medium">CANAL PAS</td>
                              <td className="px-4 py-2 text-center">1,860</td>
                              <td className="px-4 py-2 text-center">$ 2.790.000</td>
                            </tr>
                            <tr className="bg-blue-800 text-white font-bold">
                              <td className="px-4 py-2">Total general</td>
                              <td className="px-4 py-2 text-center">9,920</td>
                              <td className="px-4 py-2 text-center">$ 14.880.000</td>
                            </tr>
                            <tr className="bg-blue-100 text-gray-900">
                              <td className="px-4 py-2 font-medium">Prima anualizada</td>
                              <td className="px-4 py-2 text-center"></td>
                              <td className="px-4 py-2 text-center">$ 178.560.000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Close button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleBackToCAS}
                      className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-green-600 text-white hover:bg-green-700 shadow-md"
                    >
                      <i className="fa-solid fa-times mr-2"></i>
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>

          
        </div>
      </div>
    </DashboardLayout>
  );
} 