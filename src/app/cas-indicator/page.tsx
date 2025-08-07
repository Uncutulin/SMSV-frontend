'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import HighchartsChart from '@/components/dashboard/HighchartsChart';

export default function CASIndicatorPage() {
  const router = useRouter();
  const [showCarteraSMSV, setShowCarteraSMSV] = useState(false);

  const [showGraficos, setShowGraficos] = useState(false);

  // Estados para el filtro
  const [selectedYear1, setSelectedYear1] = useState('2023');
  const [selectedYear2, setSelectedYear2] = useState('2023');
  const [selectedMonth1, setSelectedMonth1] = useState('06');
  const [selectedMonth2, setSelectedMonth2] = useState('07');
  const [filterApplied, setFilterApplied] = useState(false);



  // Función para generar datos dinámicos basados en los filtros
  const generateDynamicData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    return {
      R12: {
        [month1 + year1]: Math.round(1250000 * (1 + baseMultiplier)),
        [month2 + year2]: Math.round(1320000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(70000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((5.6 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      Q_POL: {
        [month1 + year1]: Math.round(850 * (1 + baseMultiplier)),
        [month2 + year2]: Math.round(920 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(70 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((8.2 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      }
    };
  };

     // Función para generar datos dinámicos de la tabla Cartera SMSV
   const generateCarteraSMSVData = (year1: string, month1: string, year2: string, month2: string) => {
     const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
     const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
     
     return {
       vidaColectivo: {
         qPol: {
           [month1 + year1]: Math.round(1250 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(1320 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(70 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((5.6 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         },
         qAsegurados: {
           [month1 + year1]: Math.round(8500 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(8920 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(420 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((4.9 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         },
         r12: {
           [month1 + year1]: Math.round(2150000 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(2280000 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(130000 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((6.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         }
       },
       sepelioColectivo: {
         qPol: {
           [month1 + year1]: Math.round(890 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(950 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(60 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((6.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         },
         qAsegurados: {
           [month1 + year1]: Math.round(6200 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(6650 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(450 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((7.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         },
         r12: {
           [month1 + year1]: Math.round(1850000 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(1980000 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(130000 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((7.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         }
       },
       vidaIndAhorro: {
         qPol: {
           [month1 + year1]: Math.round(650 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(720 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(70 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((10.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         },
         qAsegurados: {
           [month1 + year1]: Math.round(4800 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(5200 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(400 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((8.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         },
         r12: {
           [month1 + year1]: Math.round(1450000 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(1620000 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(170000 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((11.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         }
       },
       saldoDeudor: {
         qPol: {
           [month1 + year1]: Math.round(420 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(480 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(60 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((14.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         },
         qAsegurados: {
           [month1 + year1]: Math.round(3200 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(3600 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(400 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((12.5 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         },
         r12: {
           [month1 + year1]: Math.round(980000 * (1 + baseMultiplier)),
           [month2 + year2]: Math.round(1120000 * (1 + comparisonMultiplier)),
           crecimiento: Math.round(140000 * (1 + comparisonMultiplier - baseMultiplier)),
           porcentaje: Math.round((14.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
         }
       }
     };
   };

  // Datos dinámicos basados en el filtro
  const casData = useMemo(() => {
    if (filterApplied) {
      return generateDynamicData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return {
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
      };
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos de la tabla Cartera SMSV basados en el filtro
  const carteraSMSVData = useMemo(() => {
    if (filterApplied) {
      return generateCarteraSMSVData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
             return {
         vidaColectivo: {
           qPol: {
             junio23: 1250,
             julio23: 1320,
             crecimiento: 70,
             porcentaje: 5.6
           },
           qAsegurados: {
             junio23: 8500,
             julio23: 8920,
             crecimiento: 420,
             porcentaje: 4.9
           },
           r12: {
             junio23: 2150000,
             julio23: 2280000,
             crecimiento: 130000,
             porcentaje: 6.0
           }
         },
         sepelioColectivo: {
           qPol: {
             junio23: 890,
             julio23: 950,
             crecimiento: 60,
             porcentaje: 6.7
           },
           qAsegurados: {
             junio23: 6200,
             julio23: 6650,
             crecimiento: 450,
             porcentaje: 7.3
           },
           r12: {
             junio23: 1850000,
             julio23: 1980000,
             crecimiento: 130000,
             porcentaje: 7.0
           }
         },
         vidaIndAhorro: {
           qPol: {
             junio23: 650,
             julio23: 720,
             crecimiento: 70,
             porcentaje: 10.8
           },
           qAsegurados: {
             junio23: 4800,
             julio23: 5200,
             crecimiento: 400,
             porcentaje: 8.3
           },
           r12: {
             junio23: 1450000,
             julio23: 1620000,
             crecimiento: 170000,
             porcentaje: 11.7
           }
         },
         saldoDeudor: {
           qPol: {
             junio23: 420,
             julio23: 480,
             crecimiento: 60,
             porcentaje: 14.3
           },
           qAsegurados: {
             junio23: 3200,
             julio23: 3600,
             crecimiento: 400,
             porcentaje: 12.5
           },
           r12: {
             junio23: 980000,
             julio23: 1120000,
             crecimiento: 140000,
             porcentaje: 14.3
           }
         }
       };
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Función para obtener el nombre abreviado del mes (3 letras)
  const getMonthAbbreviation = (month: string) => {
    const months = {
      '01': 'Ene', '02': 'Feb', '03': 'Mar', '04': 'Abr',
      '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Ago',
      '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dic'
    };
    return months[month as keyof typeof months] || month;
  };

  // Obtener etiquetas de períodos
  const getPeriodLabels = () => {
    if (filterApplied) {
      return {
        period1: `${getMonthAbbreviation(selectedMonth1)} ${selectedYear1.slice(-2)}`,
        period2: `${getMonthAbbreviation(selectedMonth2)} ${selectedYear2.slice(-2)}`
      };
    } else {
      return {
        period1: 'Jun 23',
        period2: 'Jul 23'
      };
    }
  };

  const periodLabels = getPeriodLabels();
  const period1Key = filterApplied ? selectedMonth1 + selectedYear1 : 'junio23';
  const period2Key = filterApplied ? selectedMonth2 + selectedYear2 : 'julio23';

  // Aplicar filtro automáticamente cuando cambian las selecciones
  useEffect(() => {
    if (selectedYear1 !== '2023' || selectedMonth1 !== '06' || selectedYear2 !== '2023' || selectedMonth2 !== '07') {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }, [selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  const handleBackClick = () => {
    router.back();
  };

  const handleCarteraSMSVClick = () => {
    setShowCarteraSMSV(true);
  };

  const handleGraficosClick = () => {
    setShowGraficos(true);
    setShowCarteraSMSV(false);
  };

  const handleBackToCAS = () => {
    setShowCarteraSMSV(false);
    setShowGraficos(false);
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

          {/* Bloque de filtro */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro de Comparación</h3>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* Primera comparación */}
              <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-md font-medium text-blue-800 mb-3">Primera Fecha</h4>
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

              {/* Separador visual */}
              <div className="flex items-center justify-center">
                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                  <span className="text-sm font-bold text-gray-500">VS</span>
                </div>
              </div>

              {/* Segunda comparación */}
              <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="text-md font-medium text-green-800 mb-3">Segunda Fecha</h4>
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
            </div>
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
                    <th className="px-4 py-2 text-center">{periodLabels.period1}</th>
                    <th className="px-4 py-2 text-center">{periodLabels.period2}</th>
                      <th className="px-4 py-2 text-center">Crec.</th>
                      <th className="px-4 py-2 text-center">%</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">R12</td>
                    <td className="px-4 py-2 text-center">$ {casData.R12[period1Key].toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">$ {casData.R12[period2Key].toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">$ {casData.R12.crecimiento.toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center text-green-600">+{casData.R12.porcentaje}%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-2 font-medium">Q PÓL</td>
                    <td className="px-4 py-2 text-center">{casData.Q_POL[period1Key]}</td>
                    <td className="px-4 py-2 text-center">{casData.Q_POL[period2Key]}</td>
                    <td className="px-4 py-2 text-center">+{casData.Q_POL.crecimiento}</td>
                    <td className="px-4 py-2 text-center text-green-600">+{casData.Q_POL.porcentaje}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Buttons Section - Moved above charts */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
               <button 
                 onClick={handleGraficosClick}
                 className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
               >
                 Gráficos
               </button>
              <button 
                onClick={handleCarteraSMSVClick}
                className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              >
                Cartera SMSV Cía. Argentina de Seguros
              </button>
            </div>

            {/* Content Area - Charts or Tables */}
            <div className="mt-6">
              {/* Show Charts by default */}
                {!showCarteraSMSV && !showGraficos && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico R12 */}
                  <HighchartsChart
                    id="r12-chart"
                    type="column"
                    title={`R12 - Prima (${periodLabels.period1} vs ${periodLabels.period2})`}
                    data={{
                      xAxis: {
                        categories: [periodLabels.period1, periodLabels.period2]
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
                        data: [casData.R12[period1Key], casData.R12[period2Key]],
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
                    title={`Q PÓL - Pólizas (${periodLabels.period1} vs ${periodLabels.period2})`}
                    data={{
                      xAxis: {
                        categories: [periodLabels.period1, periodLabels.period2]
                      },
                      yAxis: {
                        title: {
                          text: 'Cantidad de Pólizas'
                        }
                      },
                      series: [{
                        name: 'Q PÓL',
                        data: [casData.Q_POL[period1Key], casData.Q_POL[period2Key]],
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

                               {/* Gráficos Section - Shows when Gráficos button is clicked */}
                {showGraficos && !showCarteraSMSV && (
                 <div>
                   {/* Header with Gráficos title */}
                   <div className="mb-6 flex justify-between items-center">
                     <h2 className="text-2xl font-bold text-indigo-800">Gráficos CAS</h2>
                     <button
                       onClick={handleBackToCAS}
                       className="px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 bg-indigo-600 text-white hover:bg-indigo-700"
                     >
                       <i className="fa-solid fa-times"></i>
                       Cerrar
                     </button>
                   </div>

                   {/* Charts Grid */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                     {/* Gráfico R12 */}
                     <HighchartsChart
                       id="r12-chart-graficos"
                       type="column"
                       title={`R12 - Prima (${periodLabels.period1} vs ${periodLabels.period2})`}
                       data={{
                         xAxis: {
                           categories: [periodLabels.period1, periodLabels.period2]
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
                           data: [casData.R12[period1Key], casData.R12[period2Key]],
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
                       id="qpol-chart-graficos"
                       type="column"
                       title={`Q PÓL - Pólizas (${periodLabels.period1} vs ${periodLabels.period2})`}
                       data={{
                         xAxis: {
                           categories: [periodLabels.period1, periodLabels.period2]
                         },
                         yAxis: {
                           title: {
                             text: 'Cantidad de Pólizas'
                           }
                         },
                         series: [{
                           name: 'Q PÓL',
                           data: [casData.Q_POL[period1Key], casData.Q_POL[period2Key]],
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

                   {/* Close button */}
                   <div className="mt-6 flex justify-center">
                     <button
                       onClick={handleBackToCAS}
                       className="px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                     >
                       <i className="fa-solid fa-times mr-2"></i>
                       Cerrar
                     </button>
                   </div>
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
                     <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-blue-800 text-white">
                            <th className="px-2 py-1 text-left text-xs">RAMO</th>
                            <th className="px-2 py-1 text-center text-xs" colSpan={4}>Q POL</th>
                            <th className="px-2 py-1 text-center text-xs" colSpan={4}>Q ASEGURADOS</th>
                            <th className="px-2 py-1 text-center text-xs" colSpan={4}>R12</th>
                        </tr>
                        <tr className="bg-blue-600 text-white">
                             <th className="px-2 py-1 text-left text-xs"></th>
                             <th className="px-2 py-1 text-center text-xs">{periodLabels.period1}</th>
                             <th className="px-2 py-1 text-center text-xs">{periodLabels.period2}</th>
                             <th className="px-2 py-1 text-center text-xs">Crec.</th>
                             <th className="px-2 py-1 text-center text-xs">%</th>
                             <th className="px-2 py-1 text-center text-xs">{periodLabels.period1}</th>
                             <th className="px-2 py-1 text-center text-xs">{periodLabels.period2}</th>
                             <th className="px-2 py-1 text-center text-xs">Crec.</th>
                             <th className="px-2 py-1 text-center text-xs">%</th>
                             <th className="px-2 py-1 text-center text-xs">{periodLabels.period1}</th>
                             <th className="px-2 py-1 text-center text-xs">{periodLabels.period2}</th>
                             <th className="px-2 py-1 text-center text-xs">Crec.</th>
                             <th className="px-2 py-1 text-center text-xs">%</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-b border-gray-200">
                             <td className="px-2 py-1 font-medium text-xs">VIDA COLECTIVO</td>
                             <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.vidaColectivo.qPol[period1Key].toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.vidaColectivo.qPol[period2Key].toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center bg-blue-100 text-xs">+{carteraSMSVData.vidaColectivo.qPol.crecimiento.toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.vidaColectivo.qPol.porcentaje}%</td>
                             <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.vidaColectivo.qAsegurados[period1Key].toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.vidaColectivo.qAsegurados[period2Key].toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center bg-blue-100 text-xs">+{carteraSMSVData.vidaColectivo.qAsegurados.crecimiento.toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.vidaColectivo.qAsegurados.porcentaje}%</td>
                             <td className="px-2 py-1 text-center text-xs">$ {carteraSMSVData.vidaColectivo.r12[period1Key].toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center text-xs">$ {carteraSMSVData.vidaColectivo.r12[period2Key].toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center bg-blue-100 text-xs">$ {carteraSMSVData.vidaColectivo.r12.crecimiento.toLocaleString('es-AR')}</td>
                             <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.vidaColectivo.r12.porcentaje}%</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="px-2 py-1 font-medium text-xs">SEPELIO COLECTIVO</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.sepelioColectivo.qPol[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.sepelioColectivo.qPol[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">+{carteraSMSVData.sepelioColectivo.qPol.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.sepelioColectivo.qPol.porcentaje}%</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.sepelioColectivo.qAsegurados[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.sepelioColectivo.qAsegurados[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">+{carteraSMSVData.sepelioColectivo.qAsegurados.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.sepelioColectivo.qAsegurados.porcentaje}%</td>
                            <td className="px-2 py-1 text-center text-xs">$ {carteraSMSVData.sepelioColectivo.r12[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">$ {carteraSMSVData.sepelioColectivo.r12[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">$ {carteraSMSVData.sepelioColectivo.r12.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.sepelioColectivo.r12.porcentaje}%</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="px-2 py-1 font-medium text-xs">VIDA IND. C/ AHORRO</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.vidaIndAhorro.qPol[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.vidaIndAhorro.qPol[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">+{carteraSMSVData.vidaIndAhorro.qPol.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.vidaIndAhorro.qPol.porcentaje}%</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.vidaIndAhorro.qAsegurados[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.vidaIndAhorro.qAsegurados[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">+{carteraSMSVData.vidaIndAhorro.qAsegurados.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.vidaIndAhorro.qAsegurados.porcentaje}%</td>
                            <td className="px-2 py-1 text-center text-xs">$ {carteraSMSVData.vidaIndAhorro.r12[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">$ {carteraSMSVData.vidaIndAhorro.r12[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">$ {carteraSMSVData.vidaIndAhorro.r12.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.vidaIndAhorro.r12.porcentaje}%</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="px-2 py-1 font-medium text-xs">SALDO DEUDOR</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.saldoDeudor.qPol[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.saldoDeudor.qPol[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">+{carteraSMSVData.saldoDeudor.qPol.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.saldoDeudor.qPol.porcentaje}%</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.saldoDeudor.qAsegurados[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">{carteraSMSVData.saldoDeudor.qAsegurados[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">+{carteraSMSVData.saldoDeudor.qAsegurados.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.saldoDeudor.qAsegurados.porcentaje}%</td>
                            <td className="px-2 py-1 text-center text-xs">$ {carteraSMSVData.saldoDeudor.r12[period1Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">$ {carteraSMSVData.saldoDeudor.r12[period2Key].toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center bg-blue-100 text-xs">$ {carteraSMSVData.saldoDeudor.r12.crecimiento.toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-green-600 text-xs">+{carteraSMSVData.saldoDeudor.r12.porcentaje}%</td>
                        </tr>
                        <tr className="bg-blue-800 text-white font-bold">
                            <td className="px-2 py-1 text-xs">TOTAL</td>
                            <td className="px-2 py-1 text-center text-xs">{(carteraSMSVData.vidaColectivo.qPol[period1Key] + carteraSMSVData.sepelioColectivo.qPol[period1Key] + carteraSMSVData.vidaIndAhorro.qPol[period1Key] + carteraSMSVData.saldoDeudor.qPol[period1Key]).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">{(carteraSMSVData.vidaColectivo.qPol[period2Key] + carteraSMSVData.sepelioColectivo.qPol[period2Key] + carteraSMSVData.vidaIndAhorro.qPol[period2Key] + carteraSMSVData.saldoDeudor.qPol[period2Key]).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">+{(carteraSMSVData.vidaColectivo.qPol.crecimiento + carteraSMSVData.sepelioColectivo.qPol.crecimiento + carteraSMSVData.vidaIndAhorro.qPol.crecimiento + carteraSMSVData.saldoDeudor.qPol.crecimiento).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">+{Math.round(((carteraSMSVData.vidaColectivo.qPol.porcentaje + carteraSMSVData.sepelioColectivo.qPol.porcentaje + carteraSMSVData.vidaIndAhorro.qPol.porcentaje + carteraSMSVData.saldoDeudor.qPol.porcentaje) / 4) * 10) / 10}%</td>
                            <td className="px-2 py-1 text-center text-xs">{(carteraSMSVData.vidaColectivo.qAsegurados[period1Key] + carteraSMSVData.sepelioColectivo.qAsegurados[period1Key] + carteraSMSVData.vidaIndAhorro.qAsegurados[period1Key] + carteraSMSVData.saldoDeudor.qAsegurados[period1Key]).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">{(carteraSMSVData.vidaColectivo.qAsegurados[period2Key] + carteraSMSVData.sepelioColectivo.qAsegurados[period2Key] + carteraSMSVData.vidaIndAhorro.qAsegurados[period2Key] + carteraSMSVData.saldoDeudor.qAsegurados[period2Key]).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">+{(carteraSMSVData.vidaColectivo.qAsegurados.crecimiento + carteraSMSVData.sepelioColectivo.qAsegurados.crecimiento + carteraSMSVData.vidaIndAhorro.qAsegurados.crecimiento + carteraSMSVData.saldoDeudor.qAsegurados.crecimiento).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">+{Math.round(((carteraSMSVData.vidaColectivo.qAsegurados.porcentaje + carteraSMSVData.sepelioColectivo.qAsegurados.porcentaje + carteraSMSVData.vidaIndAhorro.qAsegurados.porcentaje + carteraSMSVData.saldoDeudor.qAsegurados.porcentaje) / 4) * 10) / 10}%</td>
                            <td className="px-2 py-1 text-center text-xs">$ {(carteraSMSVData.vidaColectivo.r12[period1Key] + carteraSMSVData.sepelioColectivo.r12[period1Key] + carteraSMSVData.vidaIndAhorro.r12[period1Key] + carteraSMSVData.saldoDeudor.r12[period1Key]).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">$ {(carteraSMSVData.vidaColectivo.r12[period2Key] + carteraSMSVData.sepelioColectivo.r12[period2Key] + carteraSMSVData.vidaIndAhorro.r12[period2Key] + carteraSMSVData.saldoDeudor.r12[period2Key]).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">$ {(carteraSMSVData.vidaColectivo.r12.crecimiento + carteraSMSVData.sepelioColectivo.r12.crecimiento + carteraSMSVData.vidaIndAhorro.r12.crecimiento + carteraSMSVData.saldoDeudor.r12.crecimiento).toLocaleString('es-AR')}</td>
                            <td className="px-2 py-1 text-center text-xs">+{Math.round(((carteraSMSVData.vidaColectivo.r12.porcentaje + carteraSMSVData.sepelioColectivo.r12.porcentaje + carteraSMSVData.vidaIndAhorro.r12.porcentaje + carteraSMSVData.saldoDeudor.r12.porcentaje) / 4) * 10) / 10}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


            </div>

          
        </div>
      </div>
    </DashboardLayout>
  );
} 