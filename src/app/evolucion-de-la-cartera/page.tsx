"use client";
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

export default function EvolucionCartera() {
  const router = useRouter();
  const [showAssaTable, setShowAssaTable] = useState(false);
  const [showFilialesTable, setShowFilialesTable] = useState(false);
  const [showPasTable, setShowPasTable] = useState(false);
  const [showCallCenterTable, setShowCallCenterTable] = useState(false);
  const [showFilialesPasTable, setShowFilialesPasTable] = useState(false);
  const [rankingFilter, setRankingFilter] = useState<'con-art' | 'sin-art'>('con-art');

  // Estados para el filtro
  const [selectedYear1, setSelectedYear1] = useState('2023');
  const [selectedYear2, setSelectedYear2] = useState('2023');
  const [selectedMonth1, setSelectedMonth1] = useState('06');
  const [selectedMonth2, setSelectedMonth2] = useState('07');
  const [filterApplied, setFilterApplied] = useState(false);

  // useEffect para aplicar el filtro automáticamente
  useEffect(() => {
    setFilterApplied(true);
  }, [selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Función para obtener el nombre del mes
  const getMonthName = (month: string) => {
    const months = {
      '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
      '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
      '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
    };
    return months[month as keyof typeof months] || month;
  };

  // Función para generar datos dinámicos basados en los filtros
  const generateDynamicData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    return {
      CAS: {
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
      },
      ASSA: {
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
      },
      ART: {
        R12: {
          [month1 + year1]: Math.round(750000 * (1 + baseMultiplier)),
          [month2 + year2]: Math.round(820000 * (1 + comparisonMultiplier)),
          crecimiento: Math.round(70000 * (1 + comparisonMultiplier - baseMultiplier)),
          porcentaje: Math.round((9.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        },
        Q_POL: {
          [month1 + year1]: Math.round(480 * (1 + baseMultiplier)),
          [month2 + year2]: Math.round(550 * (1 + comparisonMultiplier)),
          crecimiento: Math.round(70 * (1 + comparisonMultiplier - baseMultiplier)),
          porcentaje: Math.round((14.6 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
        }
      }
    };
  };

  // Función para generar datos dinámicos para la tabla ASSA POR RIESGO
  const generateAssaPorRiesgoData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    return [
      {
        riesgo: 'AP',
        qPolizas1: Math.round(1245 * (1 + baseMultiplier)),
        r12_1: Math.round(498000 * (1 + baseMultiplier)),
        qPolizas2: Math.round(1380 * (1 + comparisonMultiplier)),
        r12_2: Math.round(552000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(135 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(54000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((10.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((10.8 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        riesgo: 'AUTOMOTORES',
        qPolizas1: Math.round(2156 * (1 + baseMultiplier)),
        r12_1: Math.round(862400 * (1 + baseMultiplier)),
        qPolizas2: Math.round(2340 * (1 + comparisonMultiplier)),
        r12_2: Math.round(936000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(184 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(73600 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((8.5 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((8.5 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        riesgo: 'RC',
        qPolizas1: Math.round(890 * (1 + baseMultiplier)),
        r12_1: Math.round(356000 * (1 + baseMultiplier)),
        qPolizas2: Math.round(945 * (1 + comparisonMultiplier)),
        r12_2: Math.round(378000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(55 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(22000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((6.2 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((6.2 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        riesgo: 'ROBO',
        qPolizas1: Math.round(567 * (1 + baseMultiplier)),
        r12_1: Math.round(226800 * (1 + baseMultiplier)),
        qPolizas2: Math.round(620 * (1 + comparisonMultiplier)),
        r12_2: Math.round(248000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(53 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(21200 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((9.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((9.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        riesgo: 'INCENDIO',
        qPolizas1: Math.round(1234 * (1 + baseMultiplier)),
        r12_1: Math.round(493600 * (1 + baseMultiplier)),
        qPolizas2: Math.round(1350 * (1 + comparisonMultiplier)),
        r12_2: Math.round(540000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(116 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(46400 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((9.4 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((9.4 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      }
    ];
  };

  // Función para generar datos dinámicos para la tabla CANAL FILIALES POR FILIAL
  const generateFilialesData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    return [
      {
        filial: 'FILIAL NORTE',
        qPolizas1: Math.round(456 * (1 + baseMultiplier)),
        r12_1: Math.round(182400 * (1 + baseMultiplier)),
        qPolizas2: Math.round(520 * (1 + comparisonMultiplier)),
        r12_2: Math.round(208000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(64 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(25600 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((14.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((14.0 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        filial: 'FILIAL SUR',
        qPolizas1: Math.round(789 * (1 + baseMultiplier)),
        r12_1: Math.round(315600 * (1 + baseMultiplier)),
        qPolizas2: Math.round(850 * (1 + comparisonMultiplier)),
        r12_2: Math.round(340000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(61 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(24400 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((7.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((7.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        filial: 'FILIAL ESTE',
        qPolizas1: Math.round(567 * (1 + baseMultiplier)),
        r12_1: Math.round(226800 * (1 + baseMultiplier)),
        qPolizas2: Math.round(620 * (1 + comparisonMultiplier)),
        r12_2: Math.round(248000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(53 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(21200 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((9.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((9.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        filial: 'FILIAL OESTE',
        qPolizas1: Math.round(890 * (1 + baseMultiplier)),
        r12_1: Math.round(356000 * (1 + baseMultiplier)),
        qPolizas2: Math.round(945 * (1 + comparisonMultiplier)),
        r12_2: Math.round(378000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(55 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(22000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((6.2 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((6.2 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      }
    ];
  };

  // Función para generar datos dinámicos para la tabla CANAL PAS POR RIESGO
  const generatePasData = (year1: string, month1: string, year2: string, month2: string) => {
    const baseMultiplier = (parseInt(year1) - 2022) * 0.1 + (parseInt(month1) - 6) * 0.02;
    const comparisonMultiplier = (parseInt(year2) - 2022) * 0.1 + (parseInt(month2) - 6) * 0.02;
    
    return [
      {
        riesgo: 'AP',
        qPolizas1: Math.round(234 * (1 + baseMultiplier)),
        r12_1: Math.round(93600 * (1 + baseMultiplier)),
        qPolizas2: Math.round(280 * (1 + comparisonMultiplier)),
        r12_2: Math.round(112000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(46 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(18400 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((19.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((19.7 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        riesgo: 'AUTOMOTORES',
        qPolizas1: Math.round(567 * (1 + baseMultiplier)),
        r12_1: Math.round(226800 * (1 + baseMultiplier)),
        qPolizas2: Math.round(620 * (1 + comparisonMultiplier)),
        r12_2: Math.round(248000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(53 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(21200 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((9.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((9.3 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        riesgo: 'RC',
        qPolizas1: Math.round(345 * (1 + baseMultiplier)),
        r12_1: Math.round(138000 * (1 + baseMultiplier)),
        qPolizas2: Math.round(380 * (1 + comparisonMultiplier)),
        r12_2: Math.round(152000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(35 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(14000 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((10.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((10.1 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      },
      {
        riesgo: 'ROBO',
        qPolizas1: Math.round(123 * (1 + baseMultiplier)),
        r12_1: Math.round(49200 * (1 + baseMultiplier)),
        qPolizas2: Math.round(145 * (1 + comparisonMultiplier)),
        r12_2: Math.round(58000 * (1 + comparisonMultiplier)),
        crecimientoQPol: Math.round(22 * (1 + comparisonMultiplier - baseMultiplier)),
        crecimientoR12: Math.round(8800 * (1 + comparisonMultiplier - baseMultiplier)),
        porcentajeQPol: Math.round((17.9 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10,
        porcentajeR12: Math.round((17.9 + (comparisonMultiplier - baseMultiplier) * 10) * 10) / 10
      }
    ];
  };

  // Datos dinámicos basados en el filtro
  const indicadoresData = useMemo(() => {
    if (filterApplied) {
      return generateDynamicData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return {
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
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos para la tabla ASSA POR RIESGO
  const assaPorRiesgoData = useMemo(() => {
    if (filterApplied) {
      return generateAssaPorRiesgoData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generateAssaPorRiesgoData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos para la tabla CANAL FILIALES POR FILIAL
  const filialesData = useMemo(() => {
    if (filterApplied) {
      return generateFilialesData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generateFilialesData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos para la tabla CANAL PAS POR RIESGO
  const pasData = useMemo(() => {
    if (filterApplied) {
      return generatePasData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generatePasData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);



  const handleVerClick = (compania: string) => {
    console.log(`Ver detalles de ${compania}`);
    if (compania === 'CAS') {
      router.push('/cas-indicator');
    } else if (compania === 'ASSA') {
      router.push('/assa-indicator');
    } else {
      alert(`Ver detalles de ${compania}`);
    }
  };

  // Calcular total de prima
  const totalPrima = useMemo(() => {
    if (filterApplied) {
      const period2Key = selectedMonth2 + selectedYear2;
      return indicadoresData.CAS.R12[period2Key] + 
             indicadoresData.ASSA.R12[period2Key] + 
             indicadoresData.ART.R12[period2Key];
    } else {
      return indicadoresData.CAS.R12.julio23 + 
    indicadoresData.ASSA.R12.julio23 + 
    indicadoresData.ART.R12.julio23;
    }
  }, [indicadoresData, filterApplied, selectedMonth2, selectedYear2]);

  // Gráfico comparativo de R12 por compañía
  const r12ChartData = useMemo(() => {
    const period1Key = filterApplied ? selectedMonth1 + selectedYear1 : 'junio23';
    const period2Key = filterApplied ? selectedMonth2 + selectedYear2 : 'julio23';
    const period1Label = filterApplied ? `${getMonthName(selectedMonth1)} ${selectedYear1}` : 'Junio 23';
    const period2Label = filterApplied ? `${getMonthName(selectedMonth2)} ${selectedYear2}` : 'Julio 23';

    return {
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
          name: period2Label, 
        data: [
            indicadoresData.CAS.R12[period2Key],
            indicadoresData.ASSA.R12[period2Key],
            indicadoresData.ART.R12[period2Key]
        ], 
        color: '#004376' 
      },
      { 
          name: period1Label, 
        data: [
            indicadoresData.CAS.R12[period1Key],
            indicadoresData.ASSA.R12[period1Key],
            indicadoresData.ART.R12[period1Key]
        ], 
        color: '#007cc5' 
      },
    ],
    credits: { enabled: false },
  };
  }, [indicadoresData, filterApplied, selectedMonth1, selectedYear1, selectedMonth2, selectedYear2]);

  // Gráfico de torta de Q PÓL por compañía
  const qPolPieData = useMemo(() => {
    const period2Key = filterApplied ? selectedMonth2 + selectedYear2 : 'julio23';
    const period2Label = filterApplied ? `${getMonthName(selectedMonth2)} ${selectedYear2}` : 'Julio 23';

    return {
    chart: { type: 'pie', height: 320 },
    series: [
      {
          name: `Q PÓL ${period2Label}`,
        data: [
            { name: 'CAS', y: indicadoresData.CAS.Q_POL[period2Key], color: '#004376' },
            { name: 'ASSA', y: indicadoresData.ASSA.Q_POL[period2Key], color: '#007cc5' },
            { name: 'ART', y: indicadoresData.ART.Q_POL[period2Key], color: '#74671f' },
        ],
      },
    ],
    credits: { enabled: false },
    legend: { enabled: true },
  };
  }, [indicadoresData, filterApplied, selectedMonth2, selectedYear2]);

  // Gráfico de evolución de R12
  const r12EvolutionData = useMemo(() => {
    const period1Key = filterApplied ? selectedMonth1 + selectedYear1 : 'junio23';
    const period2Key = filterApplied ? selectedMonth2 + selectedYear2 : 'julio23';
    const period1Label = filterApplied ? `${getMonthName(selectedMonth1)} ${selectedYear1}` : 'Junio 23';
    const period2Label = filterApplied ? `${getMonthName(selectedMonth2)} ${selectedYear2}` : 'Julio 23';

    return {
    chart: { type: 'line', height: 320 },
    xAxis: {
        categories: [period1Label, period2Label],
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
          data: [indicadoresData.CAS.R12[period1Key], indicadoresData.CAS.R12[period2Key]], 
        color: '#004376' 
      },
      { 
        name: 'ASSA', 
          data: [indicadoresData.ASSA.R12[period1Key], indicadoresData.ASSA.R12[period2Key]], 
        color: '#007cc5' 
      },
      { 
        name: 'ART', 
          data: [indicadoresData.ART.R12[period1Key], indicadoresData.ART.R12[period2Key]], 
        color: '#74671f' 
      },
    ],
    credits: { enabled: false },
  };
  }, [indicadoresData, filterApplied, selectedMonth1, selectedYear1, selectedMonth2, selectedYear2]);

  // Obtener etiquetas de períodos para las tablas
  const getPeriodLabels = () => {
    if (filterApplied) {
      return {
        period1: `${getMonthName(selectedMonth1)} ${selectedYear1}`,
        period2: `${getMonthName(selectedMonth2)} ${selectedYear2}`
      };
    } else {
      return {
        period1: 'Junio 23',
        period2: 'Julio 23'
      };
    }
  };

  const periodLabels = getPeriodLabels();
  const period1Key = filterApplied ? selectedMonth1 + selectedYear1 : 'junio23';
  const period2Key = filterApplied ? selectedMonth2 + selectedYear2 : 'julio23';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">EVOLUCIÓN DE CARTERA ASSA + CAS</h1>
          <p className="text-gray-600 mt-2">
            Indicadores R12 y Q PÓL - {periodLabels.period1} vs {periodLabels.period2}
          </p>
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

        {/* Indicadores por compañía */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* CAS */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 flex justify-between items-center">
              <h3 className="text-lg font-bold">CAS</h3>
              <button
                onClick={() => handleVerClick('CAS')}
                className="px-2 py-1 text-xs font-medium rounded-md transition-colors duration-200 bg-white text-blue-700 hover:bg-blue-50 flex items-center gap-1 border border-blue-300"
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
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">{periodLabels.period1}</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">{periodLabels.period2}</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">Crec.</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <td className="px-2 py-2 font-semibold text-blue-800 text-xs">R12</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.CAS.R12[period1Key].toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.CAS.R12[period2Key].toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.CAS.R12.crecimiento.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.CAS.R12.porcentaje}%</td>
                  </tr>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <td className="px-2 py-2 font-semibold text-blue-800 text-xs">Q PÓL</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.CAS.Q_POL[period1Key]}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.CAS.Q_POL[period2Key]}</td>
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
                className="px-2 py-1 text-xs font-medium rounded-md transition-colors duration-200 bg-white text-blue-700 hover:bg-blue-50 flex items-center gap-1 border border-blue-300"
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
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">{periodLabels.period1}</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">{periodLabels.period2}</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">Crec.</th>
                    <th className="px-2 py-2 text-center font-semibold text-blue-800 text-xs">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <td className="px-2 py-2 font-semibold text-blue-800 text-xs">R12</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ASSA.R12[period1Key].toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ASSA.R12[period2Key].toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ASSA.R12.crecimiento.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.ASSA.R12.porcentaje}%</td>
                  </tr>
                  <tr className="bg-blue-100 border-b border-blue-200">
                    <td className="px-2 py-2 font-semibold text-blue-800 text-xs">Q PÓL</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.ASSA.Q_POL[period1Key]}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.ASSA.Q_POL[period2Key]}</td>
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
                    <th className="px-2 py-2 text-center font-semibold text-amber-800 text-xs">{periodLabels.period1}</th>
                    <th className="px-2 py-2 text-center font-semibold text-amber-800 text-xs">{periodLabels.period2}</th>
                    <th className="px-2 py-2 text-center font-semibold text-amber-800 text-xs">Crec.</th>
                    <th className="px-2 py-2 text-center font-semibold text-amber-800 text-xs">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-amber-100 border-b border-amber-200">
                    <td className="px-2 py-2 font-semibold text-amber-800 text-xs">R12</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ART.R12[period1Key].toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ART.R12[period2Key].toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">$ {indicadoresData.ART.R12.crecimiento.toLocaleString('es-AR')}</td>
                    <td className="px-2 py-2 text-center font-bold text-green-600 text-xs">+{indicadoresData.ART.R12.porcentaje}%</td>
                  </tr>
                  <tr className="bg-amber-100 border-b border-amber-200">
                    <td className="px-2 py-2 font-semibold text-amber-800 text-xs">Q PÓL</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.ART.Q_POL[period1Key]}</td>
                    <td className="px-2 py-2 text-center font-medium text-xs">{indicadoresData.ART.Q_POL[period2Key]}</td>
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
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm">
            <div className="bg-red-600 text-white px-3 py-2 font-semibold text-center text-sm">
              TOTAL PRIMA
            </div>
            <div className="p-4 text-center">
              <div className="text-lg font-bold text-gray-900">
                $ {totalPrima.toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            onClick={() => {
              setShowAssaTable(false);
              setShowFilialesTable(false);
              setShowPasTable(false);
              setShowCallCenterTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            GRÁFICOS
          </button>
          <button 
            onClick={() => {
              setShowAssaTable(true);
              setShowFilialesTable(false);
              setShowPasTable(false);
              setShowCallCenterTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            ASSA POR RIESGO
          </button>
          <button 
            onClick={() => {
              setShowFilialesTable(true);
              setShowAssaTable(false);
              setShowPasTable(false);
              setShowCallCenterTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            CANAL FILIALES POR FILIAL
          </button>
          <button 
            onClick={() => {
              setShowPasTable(true);
              setShowAssaTable(false);
              setShowFilialesTable(false);
              setShowCallCenterTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            CANAL PAS POR RIESGO
          </button>
          {/* <button 
            onClick={() => {
              setShowCallCenterTable(!showCallCenterTable);
              setShowAssaTable(false);
              setShowFilialesTable(false);
              setShowPasTable(false);
              setShowFilialesPasTable(false);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            CALL CENTER + CASA CENTRAL
          </button>
          <button 
            onClick={() => {
              setShowFilialesPasTable(!showFilialesPasTable);
              setShowAssaTable(false);
              setShowFilialesTable(false);
              setShowPasTable(false);
              setShowCallCenterTable(false);
            }}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md cursor-pointer"
          >
            FILIALES + PAS
          </button> */}
        </div>

        <hr className="my-8 border-gray-300" />

        {showAssaTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
              EVOLUCIÓN ASSA POR RIESGO
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">RIESGO</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>{periodLabels.period1.toUpperCase()}</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>{periodLabels.period2.toUpperCase()}</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>CRECIMIENTO</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>% CREC.</th>
                  </tr>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-2 text-left font-semibold text-blue-800">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-blue-800">R12</th>
                  </tr>
                </thead>
                <tbody>
                  {assaPorRiesgoData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}>
                      <td className="px-4 py-2 font-medium text-gray-900">{item.riesgo}</td>
                      <td className="px-4 py-2 text-center text-red-600">{(item.qPolizas1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center text-red-600">{(item.qPolizas2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+{(item.crecimientoQPol || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+$ {(item.crecimientoR12 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center font-bold text-green-600">+{(item.porcentajeQPol || 0).toFixed(1)}%</td>
                      <td className="px-4 py-2 text-center font-bold text-green-600">+{(item.porcentajeR12 || 0).toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-800 text-white font-bold">
                    <td className="px-4 py-2">TOTAL</td>
                    <td className="px-4 py-2 text-center">{assaPorRiesgoData.reduce((sum, item) => sum + (item.qPolizas1 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">$ {assaPorRiesgoData.reduce((sum, item) => sum + (item.r12_1 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">{assaPorRiesgoData.reduce((sum, item) => sum + (item.qPolizas2 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">$ {assaPorRiesgoData.reduce((sum, item) => sum + (item.r12_2 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+{assaPorRiesgoData.reduce((sum, item) => sum + (item.crecimientoQPol || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+$ {assaPorRiesgoData.reduce((sum, item) => sum + (item.crecimientoR12 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+{(assaPorRiesgoData.reduce((sum, item) => sum + (item.porcentajeQPol || 0), 0) / assaPorRiesgoData.length).toFixed(1)}%</td>
                    <td className="px-4 py-2 text-center">+{(assaPorRiesgoData.reduce((sum, item) => sum + (item.porcentajeR12 || 0), 0) / assaPorRiesgoData.length).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {showFilialesTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 text-white px-4 py-3 font-semibold">
              CANAL FILIALES POR FILIAL
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">FILIAL</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>{periodLabels.period1.toUpperCase()}</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>{periodLabels.period2.toUpperCase()}</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>CRECIMIENTO</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>% CREC.</th>
                  </tr>
                  <tr className="bg-green-100">
                    <th className="px-4 py-2 text-left font-semibold text-green-800">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-green-800">R12</th>
                  </tr>
                </thead>
                <tbody>
                  {filialesData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}>
                      <td className="px-4 py-2 font-medium text-gray-900">{item.filial}</td>
                      <td className="px-4 py-2 text-center text-red-600">{(item.qPolizas1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center text-red-600">{(item.qPolizas2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+{(item.crecimientoQPol || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+$ {(item.crecimientoR12 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center font-bold text-green-600">+{(item.porcentajeQPol || 0).toFixed(1)}%</td>
                      <td className="px-4 py-2 text-center font-bold text-green-600">+{(item.porcentajeR12 || 0).toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="bg-green-800 text-white font-bold">
                    <td className="px-4 py-2">TOTAL</td>
                    <td className="px-4 py-2 text-center">{filialesData.reduce((sum, item) => sum + (item.qPolizas1 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">$ {filialesData.reduce((sum, item) => sum + (item.r12_1 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">{filialesData.reduce((sum, item) => sum + (item.qPolizas2 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">$ {filialesData.reduce((sum, item) => sum + (item.r12_2 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+{filialesData.reduce((sum, item) => sum + (item.crecimientoQPol || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+$ {filialesData.reduce((sum, item) => sum + (item.crecimientoR12 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+{(filialesData.reduce((sum, item) => sum + (item.porcentajeQPol || 0), 0) / filialesData.length).toFixed(1)}%</td>
                    <td className="px-4 py-2 text-center">+{(filialesData.reduce((sum, item) => sum + (item.porcentajeR12 || 0), 0) / filialesData.length).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {showPasTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-purple-600 text-white px-4 py-3 font-semibold">
              CANAL PAS POR RIESGO
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">RIESGO</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>{periodLabels.period1.toUpperCase()}</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>{periodLabels.period2.toUpperCase()}</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>CRECIMIENTO</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={2}>% CREC.</th>
                  </tr>
                  <tr className="bg-purple-100">
                    <th className="px-4 py-2 text-left font-semibold text-purple-800">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">Q PÓLIZAS</th>
                    <th className="px-4 py-2 text-center font-semibold text-purple-800">R12</th>
                  </tr>
                </thead>
                <tbody>
                  {pasData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}>
                      <td className="px-4 py-2 font-medium text-gray-900">{item.riesgo}</td>
                      <td className="px-4 py-2 text-center text-red-600">{(item.qPolizas1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center text-red-600">{(item.qPolizas2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+{(item.crecimientoQPol || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+$ {(item.crecimientoR12 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center font-bold text-green-600">+{(item.porcentajeQPol || 0).toFixed(1)}%</td>
                      <td className="px-4 py-2 text-center font-bold text-green-600">+{(item.porcentajeR12 || 0).toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="bg-purple-800 text-white font-bold">
                    <td className="px-4 py-2">TOTAL</td>
                    <td className="px-4 py-2 text-center">{pasData.reduce((sum, item) => sum + (item.qPolizas1 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">$ {pasData.reduce((sum, item) => sum + (item.r12_1 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">{pasData.reduce((sum, item) => sum + (item.qPolizas2 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">$ {pasData.reduce((sum, item) => sum + (item.r12_2 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+{pasData.reduce((sum, item) => sum + (item.crecimientoQPol || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+$ {pasData.reduce((sum, item) => sum + (item.crecimientoR12 || 0), 0).toLocaleString('es-AR')}</td>
                    <td className="px-4 py-2 text-center">+{(pasData.reduce((sum, item) => sum + (item.porcentajeQPol || 0), 0) / pasData.length).toFixed(1)}%</td>
                    <td className="px-4 py-2 text-center">+{(pasData.reduce((sum, item) => sum + (item.porcentajeR12 || 0), 0) / pasData.length).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {showCallCenterTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-orange-600 text-white px-4 py-3 font-semibold">
              Evolución de Ventas Brutas por Ramo
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">RAMO</th>
                    <th className="px-4 py-3 text-center font-bold">feb-23</th>
                    <th className="px-4 py-3 text-center font-bold">mar-23</th>
                    <th className="px-4 py-3 text-center font-bold">abr-23</th>
                    <th className="px-4 py-3 text-center font-bold">may-23</th>
                    <th className="px-4 py-3 text-center font-bold">jun-23</th>
                    <th className="px-4 py-3 text-center font-bold">jul-23</th>
                    <th className="px-4 py-3 text-center font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Auto</td>
                    <td className="px-4 py-2 text-center">$ 45,200</td>
                    <td className="px-4 py-2 text-center">$ 48,500</td>
                    <td className="px-4 py-2 text-center">$ 52,100</td>
                    <td className="px-4 py-2 text-center">$ 55,800</td>
                    <td className="px-4 py-2 text-center">$ 59,200</td>
                    <td className="px-4 py-2 text-center">$ 62,500</td>
                    <td className="px-4 py-2 text-center">$ 323,300</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Hogar</td>
                    <td className="px-4 py-2 text-center">$ 32,800</td>
                    <td className="px-4 py-2 text-center">$ 35,200</td>
                    <td className="px-4 py-2 text-center">$ 37,900</td>
                    <td className="px-4 py-2 text-center">$ 40,500</td>
                    <td className="px-4 py-2 text-center">$ 43,100</td>
                    <td className="px-4 py-2 text-center">$ 45,800</td>
                    <td className="px-4 py-2 text-center">$ 235,300</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Salud</td>
                    <td className="px-4 py-2 text-center">$ 28,500</td>
                    <td className="px-4 py-2 text-center">$ 30,200</td>
                    <td className="px-4 py-2 text-center">$ 32,100</td>
                    <td className="px-4 py-2 text-center">$ 34,000</td>
                    <td className="px-4 py-2 text-center">$ 36,200</td>
                    <td className="px-4 py-2 text-center">$ 38,500</td>
                    <td className="px-4 py-2 text-center">$ 199,500</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Vida</td>
                    <td className="px-4 py-2 text-center">$ 25,100</td>
                    <td className="px-4 py-2 text-center">$ 26,800</td>
                    <td className="px-4 py-2 text-center">$ 28,500</td>
                    <td className="px-4 py-2 text-center">$ 30,200</td>
                    <td className="px-4 py-2 text-center">$ 32,000</td>
                    <td className="px-4 py-2 text-center">$ 33,800</td>
                    <td className="px-4 py-2 text-center">$ 176,400</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Bolso</td>
                    <td className="px-4 py-2 text-center">$ 18,200</td>
                    <td className="px-4 py-2 text-center">$ 19,500</td>
                    <td className="px-4 py-2 text-center">$ 20,800</td>
                    <td className="px-4 py-2 text-center">$ 22,100</td>
                    <td className="px-4 py-2 text-center">$ 23,500</td>
                    <td className="px-4 py-2 text-center">$ 24,800</td>
                    <td className="px-4 py-2 text-center">$ 128,900</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Sepelio</td>
                    <td className="px-4 py-2 text-center">$ 15,800</td>
                    <td className="px-4 py-2 text-center">$ 16,500</td>
                    <td className="px-4 py-2 text-center">$ 17,200</td>
                    <td className="px-4 py-2 text-center">$ 18,000</td>
                    <td className="px-4 py-2 text-center">$ 18,800</td>
                    <td className="px-4 py-2 text-center">$ 19,600</td>
                    <td className="px-4 py-2 text-center">$ 105,900</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2 font-medium text-gray-900">Otros</td>
                    <td className="px-4 py-2 text-center">$ 12,400</td>
                    <td className="px-4 py-2 text-center">$ 13,200</td>
                    <td className="px-4 py-2 text-center">$ 14,000</td>
                    <td className="px-4 py-2 text-center">$ 14,800</td>
                    <td className="px-4 py-2 text-center">$ 15,600</td>
                    <td className="px-4 py-2 text-center">$ 16,400</td>
                    <td className="px-4 py-2 text-center">$ 86,400</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td className="px-4 py-3 text-gray-900">Total general</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 177,000</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 189,900</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 202,600</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 215,400</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 228,400</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 241,400</td>
                    <td className="px-4 py-3 text-center text-gray-900">$ 1,254,700</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
                                    {/* Gráfico de barras de Highcharts */}
                        <div className="mt-8">
                          <HighchartsChart
                            id="call-center-chart"
                            type="column"
                            title="Evolución de Ventas por Mes - Call Center + Casa Central"
                            data={{
                              chart: { type: 'column', height: 400 },
                              xAxis: {
                                categories: ['feb-23', 'mar-23', 'abr-23', 'may-23', 'jun-23', 'jul-23'],
                                title: { text: 'Meses' },
                              },
                              yAxis: {
                                title: { text: 'Ventas ($)' },
                                min: 0,
                                labels: {
                                  formatter: function (this: { value: number }) {
                                    if (this.value >= 1000000) return (this.value / 1000000) + ' M';
                                    if (this.value >= 1000) return (this.value / 1000) + ' K';
                                    return this.value;
                                  }
                                }
                              },
                              tooltip: {
                                pointFormatter: function (this: { y: number }) {
                                  return '<b>' + this.y.toLocaleString() + '</b>';
                                }
                              },
                              series: [
                                { 
                                  name: 'Auto', 
                                  data: [45200, 48500, 52100, 55800, 59200, 62500], 
                                  color: '#FF6B35' 
                                },
                                { 
                                  name: 'Hogar', 
                                  data: [32800, 35200, 37900, 40500, 43100, 45800], 
                                  color: '#F7931E' 
                                },
                                { 
                                  name: 'Salud', 
                                  data: [28500, 30200, 32100, 34000, 36200, 38500], 
                                  color: '#FFD23F' 
                                },
                                { 
                                  name: 'Vida', 
                                  data: [25100, 26800, 28500, 30200, 32000, 33800], 
                                  color: '#6BCF7F' 
                                },
                                { 
                                  name: 'Bolso', 
                                  data: [18200, 19500, 20800, 22100, 23500, 24800], 
                                  color: '#4ECDC4' 
                                },
                                { 
                                  name: 'Sepelio', 
                                  data: [15800, 16500, 17200, 18000, 18800, 19600], 
                                  color: '#45B7D1' 
                                },
                                { 
                                  name: 'Otros', 
                                  data: [12400, 13200, 14000, 14800, 15600, 16400], 
                                  color: '#96CEB4' 
                                }
                              ],
                              plotOptions: {
                                column: {
                                  stacking: 'normal',
                                  dataLabels: {
                                    enabled: true,
                                    formatter: function (this: { y: number }) {
                                      if (this.y >= 1000) return (this.y / 1000) + 'K';
                                      return this.y;
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </div>
          </div>
        ) : showFilialesPasTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-teal-600 text-white px-4 py-3 font-semibold flex justify-between items-center">
              <span>Ranking Productores {rankingFilter === 'con-art' ? 'con ART' : 'sin ART'}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setRankingFilter('con-art')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    rankingFilter === 'con-art'
                      ? 'bg-white text-teal-600'
                      : 'bg-teal-500 text-white hover:bg-teal-400'
                  }`}
                >
                  Con ART
                </button>
                <button
                  onClick={() => setRankingFilter('sin-art')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    rankingFilter === 'sin-art'
                      ? 'bg-white text-teal-600'
                      : 'bg-teal-500 text-white hover:bg-teal-400'
                  }`}
                >
                  Sin ART
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left font-bold">CANAL</th>
                    <th className="px-4 py-3 text-center font-bold">N°</th>
                    <th className="px-4 py-3 text-left font-bold">PAS</th>
                    <th className="px-4 py-3 text-center font-bold">Q PÓLIZAS</th>
                    <th className="px-4 py-3 text-center font-bold">R12</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingFilter === 'con-art' ? (
                    <>
                      {/* CANAL PAS + FILIALES Section for con-art */}
                      {Array.from({ length: 20 }, (_, i) => (
                        <tr key={`pas-filiales-con-art-${i}`} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 text-gray-900"></td>
                          <td className="px-4 py-3 text-gray-900 font-medium">{i + 1}</td>
                          <td className="px-4 py-3 text-gray-900">
                            {[
                              'FILIAL BAHIA BLANCA / PUNTA ALTA',
                              'JAACKS',
                              'SAS CONSULTORES SRL PABLO PENELA',
                              'REYES',
                              'PAMPA',
                              'GRUPO GCDC',
                              'FILIAL EL PALOMAR',
                              'FILIAL MAR DEL PLATA',
                              'FIALA DARIO',
                              'FILIAL MONTSERRAT',
                              'FILIAL LIBERTADOR',
                              'FILIAL PALERMO',
                              'GONZALEZ SANTOIANNI - DIRECTO',
                              'SOSA MONTEPAGANO MARTIN ROBERTO',
                              'MONZO',
                              'GRILLO & ORTIZ',
                              'SOSA JOSE',
                              'ALEA BROKER DE SEGUROS SA',
                              'CERAR',
                              'ARENA ALBERTO SEBASTIAN'
                            ][i]}
                          </td>
                          <td className="px-4 py-3 text-gray-900">1,089</td>
                          <td className="px-4 py-3 text-gray-900">$2,483,600</td>
                        </tr>
                      ))}
                      
                      {/* Totals */}
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>TOTAL 20 MEJORES</td>
                        <td className="px-4 py-3 font-semibold">2,178</td>
                        <td className="px-4 py-3 font-semibold">$4,967,200</td>
                      </tr>
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>RESTO</td>
                        <td className="px-4 py-3 font-semibold">743</td>
                        <td className="px-4 py-3 font-semibold">$1,694,800</td>
                      </tr>
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>TOTAL CANAL PAS + FILIALES</td>
                        <td className="px-4 py-3 font-semibold">2,921</td>
                        <td className="px-4 py-3 font-semibold">$6,662,000</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {/* CANAL PAS + FILIALES Section for sin-art */}
                      {Array.from({ length: 20 }, (_, i) => {
                        const sinArtData = [
                          { qPolizas: 856, r12: 1950000 },
                          { qPolizas: 743, r12: 1680000 },
                          { qPolizas: 692, r12: 1540000 },
                          { qPolizas: 634, r12: 1420000 },
                          { qPolizas: 587, r12: 1310000 },
                          { qPolizas: 534, r12: 1190000 },
                          { qPolizas: 489, r12: 1080000 },
                          { qPolizas: 445, r12: 980000 },
                          { qPolizas: 412, r12: 890000 },
                          { qPolizas: 378, r12: 820000 },
                          { qPolizas: 345, r12: 750000 },
                          { qPolizas: 312, r12: 680000 },
                          { qPolizas: 289, r12: 620000 },
                          { qPolizas: 267, r12: 570000 },
                          { qPolizas: 245, r12: 520000 },
                          { qPolizas: 223, r12: 470000 },
                          { qPolizas: 201, r12: 420000 },
                          { qPolizas: 178, r12: 370000 },
                          { qPolizas: 156, r12: 320000 },
                          { qPolizas: 134, r12: 270000 }
                        ];
                        
                        return (
                          <tr key={`pas-filiales-sin-art-${i}`} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-4 py-3 text-gray-900"></td>
                            <td className="px-4 py-3 text-gray-900 font-medium">{i + 1}</td>
                            <td className="px-4 py-3 text-gray-900">
                              {[
                                'FILIAL BAHIA BLANCA / PUNTA ALTA',
                                'JAACKS',
                                'SAS CONSULTORES SRL PABLO PENELA',
                                'REYES',
                                'PAMPA',
                                'GRUPO GCDC',
                                'FILIAL EL PALOMAR',
                                'FILIAL MAR DEL PLATA',
                                'FIALA DARIO',
                                'FILIAL MONTSERRAT',
                                'FILIAL LIBERTADOR',
                                'FILIAL PALERMO',
                                'GONZALEZ SANTOIANNI - DIRECTO',
                                'SOSA MONTEPAGANO MARTIN ROBERTO',
                                'MONZO',
                                'GRILLO & ORTIZ',
                                'SOSA JOSE',
                                'ALEA BROKER DE SEGUROS SA',
                                'CERAR',
                                'ARENA ALBERTO SEBASTIAN'
                              ][i]}
                            </td>
                            <td className="px-4 py-3 text-gray-900">{sinArtData[i].qPolizas.toLocaleString()}</td>
                            <td className="px-4 py-3 text-gray-900">${sinArtData[i].r12.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                      
                      {/* Totals */}
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>TOTAL 20 MEJORES</td>
                        <td className="px-4 py-3 font-semibold">7,234</td>
                        <td className="px-4 py-3 font-semibold">$16,420,000</td>
                      </tr>
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>RESTO</td>
                        <td className="px-4 py-3 font-semibold">1,856</td>
                        <td className="px-4 py-3 font-semibold">$4,180,000</td>
                      </tr>
                      <tr className="bg-teal-100 text-gray-900">
                        <td className="px-4 py-3 font-semibold" colSpan={3}>TOTAL CANAL PAS + FILIALES</td>
                        <td className="px-4 py-3 font-semibold">9,090</td>
                        <td className="px-4 py-3 font-semibold">$20,600,000</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (!showAssaTable && !showFilialesTable && !showPasTable && !showCallCenterTable && !showFilialesPasTable) ? (
          <>
            {/* Gráficos comparativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HighchartsChart
                id="comparativo-r12"
                type="column"
                title={`Comparativa R12 - ${periodLabels.period1} vs ${periodLabels.period2}`}
                data={r12ChartData}
              />
              <HighchartsChart
                id="torta-q-pol"
                type="pie"
                title={`Distribución Q PÓL ${periodLabels.period2}`}
                data={qPolPieData}
              />
            </div>
            
            {/* Gráfico de evolución R12 */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <HighchartsChart
                id="evolucion-r12"
                type="line"
                title={`Evolución R12 - ${periodLabels.period1} vs ${periodLabels.period2}`}
                data={r12EvolutionData}
              />
            </div>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
} 