'use client';

import { useState, useMemo, useEffect } from 'react';
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
        [month1 + year1]: Math.round(980000 * (1 + baseMultiplier)),
        [month2 + year2]: Math.round(1050000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(70000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((7.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      Q_POL: {
        [month1 + year1]: Math.round(650 * (1 + baseMultiplier)),
        [month2 + year2]: Math.round(720 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(70 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((10.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      }
    };
  };

  // Función para generar datos dinámicos para Evolucion Prima BROKER
  const generateEvolucionPrimaData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    const period1Key = month1 + year1;
    const period2Key = month2 + year2;
    
    return [
      {
        seccion: 'Automotores + Motos',
        [period1Key]: Math.round(380000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(420000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(40000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((10.5 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Combinado Familiar',
        [period1Key]: Math.round(290000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(320000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((10.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Salud',
        [period1Key]: Math.round(240000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(260000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((8.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Responsabilidad Civil',
        [period1Key]: Math.round(75000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(85000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(10000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((13.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Caución',
        [period1Key]: Math.round(450000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(480000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((6.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Integral de Consorcio',
        [period1Key]: Math.round(180000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(200000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((11.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Integral de Comercio',
        [period1Key]: Math.round(280000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(310000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((10.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Bolso protegido',
        [period1Key]: Math.round(85000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(95000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(10000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((11.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Accidentes Personales',
        [period1Key]: Math.round(180000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(200000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((11.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Incendio',
        [period1Key]: Math.round(320000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(350000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((9.4 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Seguro Técnico',
        [period1Key]: Math.round(55000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(60000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(5000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((9.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Sepelio',
        [period1Key]: Math.round(45000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(50000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(5000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((11.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Robo y Rs. Vs',
        [period1Key]: Math.round(150000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(165000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(15000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((10.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Transportes',
        [period1Key]: Math.round(25000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(28000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(3000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((12.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Vida Grupo',
        [period1Key]: 0,
        [period2Key]: 0,
        crecimiento: 0,
        porcentaje: 0.0
      },
      {
        seccion: 'Embarcaciones',
        [period1Key]: Math.round(35000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(38000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(3000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((8.6 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Aeronavegación',
        [period1Key]: Math.round(45000 * (1 + baseMultiplier)),
        [period2Key]: Math.round(48000 * (1 + comparisonMultiplier)),
        crecimiento: Math.round(3000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentaje: Math.round((6.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        seccion: 'Vida Individual',
        [period1Key]: 0,
        [period2Key]: 0,
        crecimiento: 0,
        porcentaje: 0.0
      }
    ];
  };

  // Función para generar datos dinámicos para Ranking Broker P&C
  const generateRankingBrokerData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    const period1Key = month1 + year1;
    const period2Key = month2 + year2;
    
    return [
      {
        cia: 'SMG',
        qpol: {
          [period1Key]: Math.round(450000 * (1 + baseMultiplier)),
          [period2Key]: Math.round(480000 * (1 + comparisonMultiplier)),
          crecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          porcentaje: Math.round((6.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        },
        r12: {
          [period1Key]: Math.round(520000 * (1 + baseMultiplier)),
          [period2Key]: Math.round(550000 * (1 + comparisonMultiplier)),
          crecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          porcentaje: Math.round((5.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        }
      },
      {
        cia: 'LMA',
        qpol: {
          [period1Key]: Math.round(380000 * (1 + baseMultiplier)),
          [period2Key]: Math.round(410000 * (1 + comparisonMultiplier)),
          crecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          porcentaje: Math.round((7.9 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        },
        r12: {
          [period1Key]: Math.round(420000 * (1 + baseMultiplier)),
          [period2Key]: Math.round(450000 * (1 + comparisonMultiplier)),
          crecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          porcentaje: Math.round((7.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        }
      },
      {
        cia: 'SANCOR',
        qpol: {
          [period1Key]: Math.round(320000 * (1 + baseMultiplier)),
          [period2Key]: Math.round(340000 * (1 + comparisonMultiplier)),
          crecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
          porcentaje: Math.round((6.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        },
        r12: {
          [period1Key]: Math.round(380000 * (1 + baseMultiplier)),
          [period2Key]: Math.round(400000 * (1 + comparisonMultiplier)),
          crecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
          porcentaje: Math.round((5.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        }
      }
    ];
  };

  // Función para generar datos dinámicos para Comparativo Produccion Compañias
  const generateComparativoProduccionData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    const period1Key = month1 + year1;
    const period2Key = month2 + year2;
    
    return {
      smg: [
        {
          seccion: 'AUTOMOTORES',
          cantidad: {
            [period1Key]: Math.round(180 * (1 + baseMultiplier)),
            [period2Key]: Math.round(195 * (1 + comparisonMultiplier))
          },
          prima: {
            [period1Key]: Math.round(320000 * (1 + baseMultiplier)),
            [period2Key]: Math.round(350000 * (1 + comparisonMultiplier))
          },
          cantidadCrecimiento: Math.round(15 * (1 + comparisonMultiplier - baseMultiplier)),
          cantidadPorcentaje: Math.round((8.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
          primaCrecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          primaPorcentaje: Math.round((9.4 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        },
        {
          seccion: 'COMB. FLIAR.',
          cantidad: {
            [period1Key]: Math.round(145 * (1 + baseMultiplier)),
            [period2Key]: Math.round(160 * (1 + comparisonMultiplier))
          },
          prima: {
            [period1Key]: Math.round(280000 * (1 + baseMultiplier)),
            [period2Key]: Math.round(310000 * (1 + comparisonMultiplier))
          },
          cantidadCrecimiento: Math.round(15 * (1 + comparisonMultiplier - baseMultiplier)),
          cantidadPorcentaje: Math.round((10.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
          primaCrecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          primaPorcentaje: Math.round((10.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        },
        {
          seccion: 'CAUCIÓN',
          cantidad: {
            [period1Key]: Math.round(85 * (1 + baseMultiplier)),
            [period2Key]: Math.round(95 * (1 + comparisonMultiplier))
          },
          prima: {
            [period1Key]: Math.round(450000 * (1 + baseMultiplier)),
            [period2Key]: Math.round(480000 * (1 + comparisonMultiplier))
          },
          cantidadCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
          cantidadPorcentaje: Math.round((11.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
          primaCrecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          primaPorcentaje: Math.round((6.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        }
      ],
      lma: [
        {
          seccion: 'AUTOMOTORES',
          cantidad: {
            [period1Key]: Math.round(160 * (1 + baseMultiplier)),
            [period2Key]: Math.round(175 * (1 + comparisonMultiplier))
          },
          prima: {
            [period1Key]: Math.round(280000 * (1 + baseMultiplier)),
            [period2Key]: Math.round(310000 * (1 + comparisonMultiplier))
          },
          cantidadCrecimiento: Math.round(15 * (1 + comparisonMultiplier - baseMultiplier)),
          cantidadPorcentaje: Math.round((9.4 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
          primaCrecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          primaPorcentaje: Math.round((10.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        },
        {
          seccion: 'COMB. FLIAR.',
          cantidad: {
            [period1Key]: Math.round(125 * (1 + baseMultiplier)),
            [period2Key]: Math.round(140 * (1 + comparisonMultiplier))
          },
          prima: {
            [period1Key]: Math.round(240000 * (1 + baseMultiplier)),
            [period2Key]: Math.round(270000 * (1 + comparisonMultiplier))
          },
          cantidadCrecimiento: Math.round(15 * (1 + comparisonMultiplier - baseMultiplier)),
          cantidadPorcentaje: Math.round((12.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
          primaCrecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
          primaPorcentaje: Math.round((12.5 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        },
        {
          seccion: 'AP',
          cantidad: {
            [period1Key]: Math.round(140 * (1 + baseMultiplier)),
            [period2Key]: Math.round(160 * (1 + comparisonMultiplier))
          },
          prima: {
            [period1Key]: Math.round(160000 * (1 + baseMultiplier)),
            [period2Key]: Math.round(180000 * (1 + comparisonMultiplier))
          },
          cantidadCrecimiento: Math.round(20 * (1 + comparisonMultiplier - baseMultiplier)),
          cantidadPorcentaje: Math.round((14.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
          primaCrecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
          primaPorcentaje: Math.round((12.5 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        }
      ]
    };
  };



  // Función para generar datos dinámicos para la tabla comparativa de ART
  const generateArtComparativoData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    return [
      {
        compania: 'PREVENCION ART',
        primaAnual1: Math.round(420000 * (1 + baseMultiplier)),
        contratos1: Math.round(140 * (1 + baseMultiplier)),
        primaAnual2: Math.round(450000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(150 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((7.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((7.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        compania: 'ASOCIART ART',
        primaAnual1: Math.round(350000 * (1 + baseMultiplier)),
        contratos1: Math.round(110 * (1 + baseMultiplier)),
        primaAnual2: Math.round(380000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(120 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(30000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((8.6 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((9.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        compania: 'SMG ART',
        primaAnual1: Math.round(300000 * (1 + baseMultiplier)),
        contratos1: Math.round(85 * (1 + baseMultiplier)),
        primaAnual2: Math.round(320000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(95 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((6.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((11.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        compania: 'PROVINCIA ART',
        primaAnual1: Math.round(260000 * (1 + baseMultiplier)),
        contratos1: Math.round(75 * (1 + baseMultiplier)),
        primaAnual2: Math.round(280000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(85 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((7.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((13.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        compania: 'FED PAT',
        primaAnual1: Math.round(230000 * (1 + baseMultiplier)),
        contratos1: Math.round(65 * (1 + baseMultiplier)),
        primaAnual2: Math.round(250000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(75 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((8.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((15.4 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        compania: 'EXPERTA ART',
        primaAnual1: Math.round(200000 * (1 + baseMultiplier)),
        contratos1: Math.round(55 * (1 + baseMultiplier)),
        primaAnual2: Math.round(220000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(65 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((10.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((18.2 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        compania: 'OMINT ART',
        primaAnual1: Math.round(170000 * (1 + baseMultiplier)),
        contratos1: Math.round(45 * (1 + baseMultiplier)),
        primaAnual2: Math.round(190000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(55 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((11.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((22.2 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        compania: 'LA HOLANDO ART',
        primaAnual1: Math.round(140000 * (1 + baseMultiplier)),
        contratos1: Math.round(35 * (1 + baseMultiplier)),
        primaAnual2: Math.round(160000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(45 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((14.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((28.6 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        compania: 'GALENO ART',
        primaAnual1: Math.round(110000 * (1 + baseMultiplier)),
        contratos1: Math.round(25 * (1 + baseMultiplier)),
        primaAnual2: Math.round(130000 * (1 + comparisonMultiplier)),
        contratos2: Math.round(35 * (1 + comparisonMultiplier)),
        primaCrecimiento: Math.round(20000 * (1 + comparisonMultiplier - baseMultiplier)),
        primaPorcentaje: Math.round((18.2 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        contratosCrecimiento: Math.round(10 * (1 + comparisonMultiplier - baseMultiplier)),
        contratosPorcentaje: Math.round((40.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      }
    ];
  };

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

  // Datos dinámicos basados en el filtro
  const assaData = useMemo(() => {
    if (filterApplied) {
      return generateDynamicData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return {
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
      };
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos para Evolucion Prima BROKER
  const evolucionPrimaData = useMemo(() => {
    if (filterApplied) {
      return generateEvolucionPrimaData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generateEvolucionPrimaData('2022', '07', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos para Ranking Broker P&C
  const rankingBrokerData = useMemo(() => {
    if (filterApplied) {
      return generateRankingBrokerData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generateRankingBrokerData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos para Comparativo Produccion Compañias
  const comparativoProduccionData = useMemo(() => {
    if (filterApplied) {
      return generateComparativoProduccionData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generateComparativoProduccionData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);



  // Datos dinámicos para la tabla comparativa de ART
  const artComparativoData = useMemo(() => {
    if (filterApplied) {
      return generateArtComparativoData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generateArtComparativoData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

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
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{periodLabels.period1}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{periodLabels.period2}</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Crec.</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">R12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">$ {assaData.R12[period1Key].toLocaleString('es-AR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">$ {assaData.R12[period2Key].toLocaleString('es-AR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">$ {assaData.R12.crecimiento.toLocaleString('es-AR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">+{assaData.R12.porcentaje}%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q PÓL</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{assaData.Q_POL[period1Key]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{assaData.Q_POL[period2Key]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">+{assaData.Q_POL.crecimiento}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">+{assaData.Q_POL.porcentaje}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Buttons Section - Moved above charts */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleEvolucionPrimaClick}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Evolucion Prima BROKER
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
              Comparativo Produccion Compañias
            </button>
            <button
              onClick={handleArtJulioClick}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ART
            </button>
          </div>

          {/* Content Area - Charts or Tables */}
          <div className="mt-6">
            {/* Show Charts by default */}
            {!showEvolucionPrima && !showRankingBroker && !showComparativoProduccion && !showArtJulio && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico R12 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">R12 - Prima</h3>
                  <HighchartsChart
                    id="r12-chart"
                    type="column"
                    title={`R12 - Prima (${periodLabels.period1} vs ${periodLabels.period2})`}
                    data={{
                      xAxis: { categories: [periodLabels.period1, periodLabels.period2] },
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
                        data: [assaData.R12[period1Key], assaData.R12[period2Key]],
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
                    title={`Q PÓL - Pólizas (${periodLabels.period1} vs ${periodLabels.period2})`}
                    data={{
                      xAxis: { categories: [periodLabels.period1, periodLabels.period2] },
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
                        data: [assaData.Q_POL[period1Key], assaData.Q_POL[period2Key]],
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
                  <h3 className="text-xl font-semibold">Evolucion Prima BROKER {periodLabels.period1} - {periodLabels.period2}</h3>
                  <button
                    onClick={handleBackToASSA}
                    className="bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
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
                        <th className="px-4 py-2 text-center">{periodLabels.period1}</th>
                        <th className="px-4 py-2 text-center">{periodLabels.period2}</th>
                        <th className="px-4 py-2 text-center" colSpan={2}>Crecimiento</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                                            {evolucionPrimaData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-4 py-2 font-medium">{item.seccion}</td>
                          <td className="px-4 py-2 text-center">${(item[period1Key] || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">${(item[period2Key] || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">${(item.crecimiento || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">{item.porcentaje || 0}%</td>
                        </tr>
                      ))}
                      
                      {/* ASSA Subtotal */}
                      <tr className="bg-blue-800 text-white font-bold">
                        <td className="px-4 py-2">ASSA</td>
                        <td className="px-4 py-2 text-center">${evolucionPrimaData.reduce((sum, item) => sum + (item[period1Key] as number), 0).toLocaleString('es-AR')}</td>
                        <td className="px-4 py-2 text-center">${evolucionPrimaData.reduce((sum, item) => sum + (item[period2Key] as number), 0).toLocaleString('es-AR')}</td>
                        <td className="px-4 py-2 text-center">${evolucionPrimaData.reduce((sum, item) => sum + item.crecimiento, 0).toLocaleString('es-AR')}</td>
                        <td className="px-4 py-2 text-center">{Math.round((evolucionPrimaData.reduce((sum, item) => sum + item.crecimiento, 0) / evolucionPrimaData.reduce((sum, item) => sum + (item[period1Key] as number), 0)) * 100 * 10) / 10}%</td>
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
                        <td className="px-4 py-2 text-center">${(evolucionPrimaData.reduce((sum, item) => sum + (item[period1Key] as number), 0) + 420000).toLocaleString('es-AR')}</td>
                        <td className="px-4 py-2 text-center">${(evolucionPrimaData.reduce((sum, item) => sum + (item[period2Key] as number), 0) + 450000).toLocaleString('es-AR')}</td>
                        <td className="px-4 py-2 text-center">${(evolucionPrimaData.reduce((sum, item) => sum + item.crecimiento, 0) + 30000).toLocaleString('es-AR')}</td>
                        <td className="px-4 py-2 text-center">{Math.round(((evolucionPrimaData.reduce((sum, item) => sum + item.crecimiento, 0) + 30000) / (evolucionPrimaData.reduce((sum, item) => sum + (item[period1Key] as number), 0) + 420000)) * 100 * 10) / 10}%</td>
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
                        <th className="px-4 py-2 text-center">{periodLabels.period1}</th>
                        <th className="px-4 py-2 text-center">{periodLabels.period2}</th>
                        <th className="px-4 py-2 text-center">Dif</th>
                        <th className="px-4 py-2 text-center">%</th>
                        <th className="px-4 py-2 text-center">{periodLabels.period1}</th>
                        <th className="px-4 py-2 text-center">{periodLabels.period2}</th>
                        <th className="px-4 py-2 text-center">Dif</th>
                        <th className="px-4 py-2 text-center">%</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                                            {rankingBrokerData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-4 py-2 font-medium">{item.cia}</td>
                          <td className="px-4 py-2 text-center">${(item.qpol[period1Key] || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">${(item.qpol[period2Key] || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">${(item.qpol.crecimiento || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">{item.qpol.porcentaje || 0}%</td>
                          <td className="px-4 py-2 text-center">${(item.r12[period1Key] || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">${(item.r12[period2Key] || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">${(item.r12.crecimiento || 0).toLocaleString('es-AR')}</td>
                          <td className="px-4 py-2 text-center">{item.r12.porcentaje || 0}%</td>
                        </tr>
                      ))}
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
                  <h3 className="text-lg font-semibold">Comparativo Produccion Compañias</h3>
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
                              <th className="px-2 py-1 text-center" colSpan={3}>Cantidad</th>
                              <th className="px-2 py-1 text-center" colSpan={3}>Prima</th>
                            </tr>
                            <tr className="bg-orange-600 text-white">
                              <th className="px-2 py-1 text-left"></th>
                              <th className="px-2 py-1 text-center">{periodLabels.period1.toUpperCase()}</th>
                              <th className="px-2 py-1 text-center">{periodLabels.period2.toUpperCase()}</th>
                              <th className="px-2 py-1 text-center">Crec.</th>
                              <th className="px-2 py-1 text-center">{periodLabels.period1.toUpperCase()}</th>
                              <th className="px-2 py-1 text-center">{periodLabels.period2.toUpperCase()}</th>
                              <th className="px-2 py-1 text-center">Crec.</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                                                        {comparativoProduccionData.smg.map((item, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="px-2 py-1 font-medium">{item.seccion}</td>
                                <td className="px-2 py-1 text-center">{item.cantidad[period1Key] || 0}</td>
                                <td className="px-2 py-1 text-center">{item.cantidad[period2Key] || 0}</td>
                                <td className="px-2 py-1 text-center text-gray-900">+{item.cantidadPorcentaje.toFixed(1)}%</td>
                                <td className="px-2 py-1 text-center">${((item.prima[period1Key] || 0) / 1000).toFixed(0)}k</td>
                                <td className="px-2 py-1 text-center">${((item.prima[period2Key] || 0) / 1000).toFixed(0)}k</td>
                                <td className="px-2 py-1 text-center text-gray-900">+{item.primaPorcentaje.toFixed(1)}%</td>
                              </tr>
                            ))}
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">PRAXIS</td>
                              <td className="px-2 py-1 text-center">65</td>
                              <td className="px-2 py-1 text-center">70</td>
                              <td className="px-2 py-1 text-center text-gray-900">+7.7%</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                              <td className="px-2 py-1 text-center">$190k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+5.6%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">ROBO</td>
                              <td className="px-2 py-1 text-center">120</td>
                              <td className="px-2 py-1 text-center">135</td>
                              <td className="px-2 py-1 text-center text-gray-900">+12.5%</td>
                              <td className="px-2 py-1 text-center">$150k</td>
                              <td className="px-2 py-1 text-center">$165k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.0%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INT. COMERCIO</td>
                              <td className="px-2 py-1 text-center">95</td>
                              <td className="px-2 py-1 text-center">105</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.5%</td>
                              <td className="px-2 py-1 text-center">$280k</td>
                              <td className="px-2 py-1 text-center">$310k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.7%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">SEGURO TÉCNICO</td>
                              <td className="px-2 py-1 text-center">55</td>
                              <td className="px-2 py-1 text-center">60</td>
                              <td className="px-2 py-1 text-center text-gray-900">+9.1%</td>
                              <td className="px-2 py-1 text-center">$55k</td>
                              <td className="px-2 py-1 text-center">$60k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+9.1%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">RC</td>
                              <td className="px-2 py-1 text-center">75</td>
                              <td className="px-2 py-1 text-center">85</td>
                              <td className="px-2 py-1 text-center text-gray-900">+13.3%</td>
                              <td className="px-2 py-1 text-center">$75k</td>
                              <td className="px-2 py-1 text-center">$85k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+13.3%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">AP</td>
                              <td className="px-2 py-1 text-center">160</td>
                              <td className="px-2 py-1 text-center">180</td>
                              <td className="px-2 py-1 text-center text-gray-900">+12.5%</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                              <td className="px-2 py-1 text-center">$200k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+11.1%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INCENDIO</td>
                              <td className="px-2 py-1 text-center">120</td>
                              <td className="px-2 py-1 text-center">130</td>
                              <td className="px-2 py-1 text-center text-gray-900">+8.3%</td>
                              <td className="px-2 py-1 text-center">$320k</td>
                              <td className="px-2 py-1 text-center">$350k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+9.4%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INT. CONSORCIO</td>
                              <td className="px-2 py-1 text-center">45</td>
                              <td className="px-2 py-1 text-center">50</td>
                              <td className="px-2 py-1 text-center text-gray-900">+11.1%</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                              <td className="px-2 py-1 text-center">$200k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+11.1%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CASCOS</td>
                              <td className="px-2 py-1 text-center">35</td>
                              <td className="px-2 py-1 text-center">40</td>
                              <td className="px-2 py-1 text-center text-gray-900">+14.3%</td>
                              <td className="px-2 py-1 text-center">$35k</td>
                              <td className="px-2 py-1 text-center">$40k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+14.3%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">TRANSPORTES</td>
                              <td className="px-2 py-1 text-center">25</td>
                              <td className="px-2 py-1 text-center">28</td>
                              <td className="px-2 py-1 text-center text-gray-900">+12.0%</td>
                              <td className="px-2 py-1 text-center">$25k</td>
                              <td className="px-2 py-1 text-center">$28k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+12.0%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">MOTOS</td>
                              <td className="px-2 py-1 text-center">220</td>
                              <td className="px-2 py-1 text-center">240</td>
                              <td className="px-2 py-1 text-center text-gray-900">+9.1%</td>
                              <td className="px-2 py-1 text-center">$380k</td>
                              <td className="px-2 py-1 text-center">$420k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.5%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CRISTALES</td>
                              <td className="px-2 py-1 text-center">15</td>
                              <td className="px-2 py-1 text-center">18</td>
                              <td className="px-2 py-1 text-center text-gray-900">+20.0%</td>
                              <td className="px-2 py-1 text-center">$15k</td>
                              <td className="px-2 py-1 text-center">$18k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+20.0%</td>
                            </tr>
                            
                            {/* SMG Total Row */}
                            <tr className="bg-orange-100 text-orange-900 font-bold">
                              <td className="px-2 py-1">Total</td>
                              <td className="px-2 py-1 text-center">1.320</td>
                              <td className="px-2 py-1 text-center">1.456</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.3%</td>
                              <td className="px-2 py-1 text-center">$2.700k</td>
                              <td className="px-2 py-1 text-center">$2.922k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+8.2%</td>
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
                              <th className="px-2 py-1 text-center" colSpan={3}>Cantidad</th>
                              <th className="px-2 py-1 text-center" colSpan={3}>Prima</th>
                            </tr>
                            <tr className="bg-orange-600 text-white">
                              <th className="px-2 py-1 text-left"></th>
                              <th className="px-2 py-1 text-center">{periodLabels.period1.toUpperCase()}</th>
                              <th className="px-2 py-1 text-center">{periodLabels.period2.toUpperCase()}</th>
                              <th className="px-2 py-1 text-center">Crec.</th>
                              <th className="px-2 py-1 text-center">{periodLabels.period1.toUpperCase()}</th>
                              <th className="px-2 py-1 text-center">{periodLabels.period2.toUpperCase()}</th>
                              <th className="px-2 py-1 text-center">Crec.</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                                                        {comparativoProduccionData.lma.map((item, index) => (
                              <tr key={index} className="border-b border-gray-200">
                                <td className="px-2 py-1 font-medium">{item.seccion}</td>
                                <td className="px-2 py-1 text-center">{item.cantidad[period1Key] || 0}</td>
                                <td className="px-2 py-1 text-center">{item.cantidad[period2Key] || 0}</td>
                                <td className="px-2 py-1 text-center text-gray-900">+{item.cantidadPorcentaje.toFixed(1)}%</td>
                                <td className="px-2 py-1 text-center">${((item.prima[period1Key] || 0) / 1000).toFixed(0)}k</td>
                                <td className="px-2 py-1 text-center">${((item.prima[period2Key] || 0) / 1000).toFixed(0)}k</td>
                                <td className="px-2 py-1 text-center text-gray-900">+{item.primaPorcentaje.toFixed(1)}%</td>
                              </tr>
                            ))}
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">RC</td>
                              <td className="px-2 py-1 text-center">65</td>
                              <td className="px-2 py-1 text-center">75</td>
                              <td className="px-2 py-1 text-center text-gray-900">+15.4%</td>
                              <td className="px-2 py-1 text-center">$65k</td>
                              <td className="px-2 py-1 text-center">$75k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+15.4%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INT. CONSORCIO</td>
                              <td className="px-2 py-1 text-center">40</td>
                              <td className="px-2 py-1 text-center">45</td>
                              <td className="px-2 py-1 text-center text-gray-900">+12.5%</td>
                              <td className="px-2 py-1 text-center">$160k</td>
                              <td className="px-2 py-1 text-center">$180k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+12.5%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">SEGURO TÉCNICO</td>
                              <td className="px-2 py-1 text-center">50</td>
                              <td className="px-2 py-1 text-center">55</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.0%</td>
                              <td className="px-2 py-1 text-center">$50k</td>
                              <td className="px-2 py-1 text-center">$55k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.0%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INT. COMERCIO</td>
                              <td className="px-2 py-1 text-center">85</td>
                              <td className="px-2 py-1 text-center">95</td>
                              <td className="px-2 py-1 text-center text-gray-900">+11.8%</td>
                              <td className="px-2 py-1 text-center">$240k</td>
                              <td className="px-2 py-1 text-center">$270k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+12.5%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">INCENDIO</td>
                              <td className="px-2 py-1 text-center">110</td>
                              <td className="px-2 py-1 text-center">120</td>
                              <td className="px-2 py-1 text-center text-gray-900">+9.1%</td>
                              <td className="px-2 py-1 text-center">$280k</td>
                              <td className="px-2 py-1 text-center">$310k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.7%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">TRANSPORTES</td>
                              <td className="px-2 py-1 text-center">20</td>
                              <td className="px-2 py-1 text-center">23</td>
                              <td className="px-2 py-1 text-center text-gray-900">+15.0%</td>
                              <td className="px-2 py-1 text-center">$20k</td>
                              <td className="px-2 py-1 text-center">$23k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+15.0%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">MOTOS</td>
                              <td className="px-2 py-1 text-center">200</td>
                              <td className="px-2 py-1 text-center">220</td>
                              <td className="px-2 py-1 text-center text-gray-900">+10.0%</td>
                              <td className="px-2 py-1 text-center">$340k</td>
                              <td className="px-2 py-1 text-center">$380k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+11.8%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">VIDA</td>
                              <td className="px-2 py-1 text-center">30</td>
                              <td className="px-2 py-1 text-center">35</td>
                              <td className="px-2 py-1 text-center text-gray-900">+16.7%</td>
                              <td className="px-2 py-1 text-center">$30k</td>
                              <td className="px-2 py-1 text-center">$35k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+16.7%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CAUCIÓN</td>
                              <td className="px-2 py-1 text-center">75</td>
                              <td className="px-2 py-1 text-center">85</td>
                              <td className="px-2 py-1 text-center text-gray-900">+13.3%</td>
                              <td className="px-2 py-1 text-center">$400k</td>
                              <td className="px-2 py-1 text-center">$430k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+7.5%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">CASCOS</td>
                              <td className="px-2 py-1 text-center">30</td>
                              <td className="px-2 py-1 text-center">35</td>
                              <td className="px-2 py-1 text-center text-gray-900">+16.7%</td>
                              <td className="px-2 py-1 text-center">$30k</td>
                              <td className="px-2 py-1 text-center">$35k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+16.7%</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                              <td className="px-2 py-1 font-medium">ROBO y RS. VS.</td>
                              <td className="px-2 py-1 text-center">100</td>
                              <td className="px-2 py-1 text-center">115</td>
                              <td className="px-2 py-1 text-center text-gray-900">+15.0%</td>
                              <td className="px-2 py-1 text-center">$120k</td>
                              <td className="px-2 py-1 text-center">$135k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+12.5%</td>
                            </tr>
                            
                            {/* La Mercantil Andina Total Row */}
                            <tr className="bg-orange-100 text-orange-900 font-bold">
                              <td className="px-2 py-1">Total</td>
                              <td className="px-2 py-1 text-center">1.130</td>
                              <td className="px-2 py-1 text-center">1.258</td>
                              <td className="px-2 py-1 text-center text-gray-900">+11.3%</td>
                              <td className="px-2 py-1 text-center">$2.215k</td>
                              <td className="px-2 py-1 text-center">$2.433k</td>
                              <td className="px-2 py-1 text-center text-gray-900">+9.8%</td>
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
                  <h3 className="text-xl font-semibold">ART</h3>
                  <button
                    onClick={handleBackToASSA}
                    className="bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    <i className="fa-solid fa-times mr-1"></i>
                    Cerrar
                  </button>
                </div>
                
                <div className="space-y-6 p-6">
                  {/* Segunda tabla: COMPARATIVO JUNIO 23 vs JULIO 23 */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-4 py-3 text-center">
                      <h4 className="text-lg font-semibold">COMPARATIVO {periodLabels.period1.toUpperCase()} vs {periodLabels.period2.toUpperCase()}</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700 text-white">
                          <tr>
                            <th className="px-4 py-2 text-left">PERÍODO</th>
                            <th className="px-4 py-2 text-left">COMPAÑÍA</th>
                            <th className="px-4 py-2 text-center" colSpan={3}>{periodLabels.period1.toUpperCase()}</th>
                            <th className="px-4 py-2 text-center" colSpan={3}>{periodLabels.period2.toUpperCase()}</th>
                          </tr>
                          <tr className="bg-gray-600 text-white">
                            <th className="px-4 py-2 text-left"></th>
                            <th className="px-4 py-2 text-left"></th>
                            <th className="px-4 py-2 text-center">PRIMA ANUAL</th>
                            <th className="px-4 py-2 text-center">CONTRATOS</th>
                            <th className="px-4 py-2 text-center">CREC.</th>
                            <th className="px-4 py-2 text-center">PRIMA ANUAL</th>
                            <th className="px-4 py-2 text-center">CONTRATOS</th>
                            <th className="px-4 py-2 text-center">CREC.</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {artComparativoData.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200">
                              <td className="px-4 py-2"></td>
                              <td className="px-4 py-2 font-medium">{item.compania}</td>
                              <td className="px-4 py-2 text-center">${(item.primaAnual1 || 0).toLocaleString('es-AR')}</td>
                              <td className="px-4 py-2 text-center">{item.contratos1 || 0}</td>
                              <td className="px-4 py-2 text-center text-gray-900">+{item.primaPorcentaje.toFixed(1)}%</td>
                              <td className="px-4 py-2 text-center">${(item.primaAnual2 || 0).toLocaleString('es-AR')}</td>
                              <td className="px-4 py-2 text-center">{item.contratos2 || 0}</td>
                              <td className="px-4 py-2 text-center text-gray-900">+{item.contratosPorcentaje.toFixed(1)}%</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-800 text-white font-bold">
                            <td className="px-4 py-2"></td>
                            <td className="px-4 py-2">TOTAL</td>
                            <td className="px-4 py-2 text-center">${artComparativoData.reduce((sum, item) => sum + (item.primaAnual1 || 0), 0).toLocaleString('es-AR')}</td>
                            <td className="px-4 py-2 text-center">{artComparativoData.reduce((sum, item) => sum + (item.contratos1 || 0), 0)}</td>
                            <td className="px-4 py-2 text-center text-gray-900">+{((artComparativoData.reduce((sum, item) => sum + (item.primaPorcentaje || 0), 0) / artComparativoData.length)).toFixed(1)}%</td>
                            <td className="px-4 py-2 text-center">${artComparativoData.reduce((sum, item) => sum + (item.primaAnual2 || 0), 0).toLocaleString('es-AR')}</td>
                            <td className="px-4 py-2 text-center">{artComparativoData.reduce((sum, item) => sum + (item.contratos2 || 0), 0)}</td>
                            <td className="px-4 py-2 text-center text-gray-900">+{((artComparativoData.reduce((sum, item) => sum + (item.contratosPorcentaje || 0), 0) / artComparativoData.length)).toFixed(1)}%</td>
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