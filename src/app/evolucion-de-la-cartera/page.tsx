"use client";
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

export default function EvolucionCartera() {
  const router = useRouter();
  const [showAssaTable] = useState(false);
  const [showFilialesTable] = useState(false);
  const [showPasTable] = useState(false);
  const [showCallCenterTable] = useState(false);
  const [showFilialesPasTable] = useState(false);
  const [rankingFilter, setRankingFilter] = useState<'con-art' | 'sin-art'>('con-art');

  // Estados para el filtro
  const [selectedYear1, setSelectedYear1] = useState('2024');
  const [selectedYear2, setSelectedYear2] = useState('2025');
  const [selectedMonth1, setSelectedMonth1] = useState('01');
  const [selectedMonth2, setSelectedMonth2] = useState('01');
  const [tipoVista, setTipoVista] = useState('TOTAL X CÍA');
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





  // Datos específicos para TOTAL X CÍA
  const totalXCiaData = {
    CAS: {
      qPol202408: 27899,
      r12202408: 11820721857,
      qPol202508: 26669,
      r12202508: 23386730812,
      crecimientoQPol: -1230,
      porcentajeQPol: -4.41,
      crecimientoR12: 11566008954,
      porcentajeR12: 97.85
    },
    ASSA: {
      qPol202408: 75455,
      r12202408: 13250722758,
      qPol202508: 73631,
      r12202508: 28410171357,
      crecimientoQPol: -1824,
      porcentajeQPol: -2.42,
      crecimientoR12: 15159448599,
      porcentajeR12: 114.40
    },
    ART: {
      qPol202408: 3244,
      r12202408: 7550273010,
      qPol202508: 3345,
      r12202508: 12369878053,
      crecimientoQPol: 101,
      porcentajeQPol: 3.11,
      crecimientoR12: 4819605043,
      porcentajeR12: 63.83
    }
  };

  // Datos específicos para TOTAL X CANAL
  const totalXCanalData = {
    CANAL_DIRECTO: {
      qPol202408: 44658,
      r12202408: 10420688521,
      qPol202508: 43034,
      r12202508: 18119038113,
      crecimientoQPol: -1624,
      porcentajeQPol: -3.64,
      crecimientoR12: 7698349592,
      porcentajeR12: 73.88
    },
    CANAL_FILIALES: {
      qPol202408: 29437,
      r12202408: 4998522395,
      qPol202508: 27934,
      r12202508: 11602251313,
      crecimientoQPol: -1503,
      porcentajeQPol: -5.11,
      crecimientoR12: 6603728918,
      porcentajeR12: 132.11
    },
    CANAL_PAS: {
      qPol202408: 32503,
      r12202408: 17202508710,
      qPol202508: 32677,
      r12202508: 34445490795,
      crecimientoQPol: 174,
      porcentajeQPol: 0.54,
      crecimientoR12: 17242984085,
      porcentajeR12: 100.24
    }
  };

  // Datos específicos para CAS X CANAL
  const casXCanalData = {
    CANAL_DIRECTO: {
      qPol202408: 20735,
      r12202408: 6888439319,
      qPol202508: 20264,
      r12202508: 14583997615,
      crecimientoQPol: -471,
      porcentajeQPol: -2.27,
      crecimientoR12: 7695558296,
      porcentajeR12: 111.72
    },
    CANAL_FILIALES: {
      qPol202408: 6108,
      r12202408: 189013200,
      qPol202508: 5221,
      r12202508: 480754899,
      crecimientoQPol: -887,
      porcentajeQPol: -14.52,
      crecimientoR12: 291741700,
      porcentajeR12: 154.35
    },
    CANAL_PAS: {
      qPol202408: 1056,
      r12202408: 4743269339,
      qPol202508: 1184,
      r12202508: 8321978298,
      crecimientoQPol: 128,
      porcentajeQPol: 12.12,
      crecimientoR12: 3578708959,
      porcentajeR12: 75.45
    }
  };

  // Datos específicos para CAS X RAMO
  const casXRamoData = {
    AP: {
      qPol202408: 1943,
      r12202408: 100846660,
      qPol202508: 387,
      r12202508: 123478870,
      crecimientoQPol: -1556,
      porcentajeQPol: -80.08,
      crecimientoR12: 22632210,
      porcentajeR12: 22.44
    },
    AP_BOLSO: {
      qPol202408: 4176,
      r12202408: 3818065,
      qPol202508: 3994,
      r12202508: 8684762,
      crecimientoQPol: -182,
      porcentajeQPol: -4.36,
      crecimientoR12: 4866697,
      porcentajeR12: 127.47
    },
    ARMAS: {
      qPol202408: 185,
      r12202408: 2696933,
      qPol202508: 176,
      r12202508: 9083123,
      crecimientoQPol: -9,
      porcentajeQPol: -4.86,
      crecimientoR12: 6386190,
      porcentajeR12: 236.79
    },
    BOLSO_PROTEGIDO: {
      qPol202408: 5020,
      r12202408: 143612108,
      qPol202508: 4947,
      r12202508: 323744516,
      crecimientoQPol: -73,
      porcentajeQPol: -1.45,
      crecimientoR12: 180132407,
      porcentajeR12: 125.43
    },
    ESCOLTA: {
      qPol202408: 2169,
      r12202408: 47472437,
      qPol202508: 2589,
      r12202508: 174251101,
      crecimientoQPol: 420,
      porcentajeQPol: 19.36,
      crecimientoR12: 126778664,
      porcentajeR12: 267.06
    },
    ESCOLTA_EJERCITO: {
      qPol202408: 65,
      r12202408: 203896881,
      qPol202508: 69,
      r12202508: 445644686,
      crecimientoQPol: 4,
      porcentajeQPol: 6.15,
      crecimientoR12: 241747805,
      porcentajeR12: 118.56
    },
    ROBO: {
      qPol202408: 1,
      r12202408: 19811883,
      qPol202508: 1,
      r12202508: 37669275,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 17857392,
      porcentajeR12: 90.13
    },
    SALDO_DEUDOR: {
      qPol202408: 12,
      r12202408: 699713484,
      qPol202508: 11,
      r12202508: 659929483,
      crecimientoQPol: -1,
      porcentajeQPol: -8.33,
      crecimientoR12: -39784001,
      porcentajeR12: -5.69
    },
    SDJM: {
      qPol202408: 89,
      r12202408: 51462909,
      qPol202508: 145,
      r12202508: 142087469,
      crecimientoQPol: 56,
      porcentajeQPol: 62.92,
      crecimientoR12: 90624560,
      porcentajeR12: 176.10
    },
    SEPELIO_COLECTIVO: {
      qPol202408: 96,
      r12202408: 2400123114,
      qPol202508: 103,
      r12202508: 4695908050,
      crecimientoQPol: 7,
      porcentajeQPol: 7.29,
      crecimientoR12: 2295784936,
      porcentajeR12: 95.65
    },
    SEPELIO_INDIVIDUAL: {
      qPol202408: 1405,
      r12202408: 6165609,
      qPol202508: 1535,
      r12202508: 25540731,
      crecimientoQPol: 130,
      porcentajeQPol: 9.25,
      crecimientoR12: 19375122,
      porcentajeR12: 314.25
    },
    VIDA_COLECTIVO: {
      qPol202408: 237,
      r12202408: 4827939045,
      qPol202508: 234,
      r12202508: 9160455325,
      crecimientoQPol: -3,
      porcentajeQPol: -1.27,
      crecimientoR12: 4332516280,
      porcentajeR12: 89.74
    },
    VIDA_COLECTIVO_CON_AHORRO: {
      qPol202408: 4,
      r12202408: 43952280,
      qPol202508: 4,
      r12202508: 128390512,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 84438232,
      porcentajeR12: 192.11
    },
    VIDA_DIBA: {
      qPol202408: 4,
      r12202408: 1586517281,
      qPol202508: 4,
      r12202508: 3553967309,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 1967450028,
      porcentajeR12: 124.01
    },
    VIDA_INDIVIDUAL: {
      qPol202408: 33,
      r12202408: 4477,
      qPol202508: 33,
      r12202508: 4481,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 4,
      porcentajeR12: 0.09
    },
    VIDA_INDIVIDUAL_CON_AHORRO: {
      qPol202408: 12133,
      r12202408: 1673993351,
      qPol202508: 12047,
      r12202508: 3878282244,
      crecimientoQPol: -86,
      porcentajeQPol: -0.71,
      crecimientoR12: 2204288893,
      porcentajeR12: 131.68
    },
    VIDA_OBLIGATORIO: {
      qPol202408: 327,
      r12202408: 8695340,
      qPol202508: 390,
      r12202508: 19608876,
      crecimientoQPol: 63,
      porcentajeQPol: 19.27,
      crecimientoR12: 10913535,
      porcentajeR12: 125.51
    }
  };

  // Datos específicos para TOTAL X RAMO
  const totalXRamoData = {
    AP: {
      qPol202408: 1943,
      r12202408: 100846660,
      qPol202508: 387,
      r12202508: 123478870,
      crecimientoQPol: -1556,
      porcentajeQPol: -80.08,
      crecimientoR12: 22632210,
      porcentajeR12: 22.44
    },
    AP_BOLSO: {
      qPol202408: 4176,
      r12202408: 3818065,
      qPol202508: 3994,
      r12202508: 8684762,
      crecimientoQPol: -182,
      porcentajeQPol: -4.36,
      crecimientoR12: 4866697,
      porcentajeR12: 127.47
    },
    ARMAS: {
      qPol202408: 185,
      r12202408: 2696933,
      qPol202508: 176,
      r12202508: 9083123,
      crecimientoQPol: -9,
      porcentajeQPol: -4.86,
      crecimientoR12: 6386190,
      porcentajeR12: 236.79
    },
    BOLSO_PROTEGIDO: {
      qPol202408: 5020,
      r12202408: 143612108,
      qPol202508: 4947,
      r12202508: 323744516,
      crecimientoQPol: -73,
      porcentajeQPol: -1.45,
      crecimientoR12: 180132407,
      porcentajeR12: 125.43
    },
    ESCOLTA: {
      qPol202408: 2169,
      r12202408: 47472437,
      qPol202508: 2589,
      r12202508: 174251101,
      crecimientoQPol: 420,
      porcentajeQPol: 19.36,
      crecimientoR12: 126778664,
      porcentajeR12: 267.06
    },
    ESCOLTA_EJERCITO: {
      qPol202408: 65,
      r12202408: 203896881,
      qPol202508: 69,
      r12202508: 445644686,
      crecimientoQPol: 4,
      porcentajeQPol: 6.15,
      crecimientoR12: 241747805,
      porcentajeR12: 118.56
    },
    ROBO: {
      qPol202408: 1,
      r12202408: 19811883,
      qPol202508: 1,
      r12202508: 37669275,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 17857392,
      porcentajeR12: 90.13
    },
    SALDO_DEUDOR: {
      qPol202408: 12,
      r12202408: 699713484,
      qPol202508: 11,
      r12202508: 659929483,
      crecimientoQPol: -1,
      porcentajeQPol: -8.33,
      crecimientoR12: -39784001,
      porcentajeR12: -5.69
    },
    SDJM: {
      qPol202408: 89,
      r12202408: 51462909,
      qPol202508: 145,
      r12202508: 142087469,
      crecimientoQPol: 56,
      porcentajeQPol: 62.92,
      crecimientoR12: 90624560,
      porcentajeR12: 176.10
    },
    SEPELIO_COLECTIVO: {
      qPol202408: 96,
      r12202408: 2400123114,
      qPol202508: 103,
      r12202508: 4695908050,
      crecimientoQPol: 7,
      porcentajeQPol: 7.29,
      crecimientoR12: 2295784936,
      porcentajeR12: 95.65
    },
    SEPELIO_INDIVIDUAL: {
      qPol202408: 1405,
      r12202408: 6165609,
      qPol202508: 1535,
      r12202508: 25540731,
      crecimientoQPol: 130,
      porcentajeQPol: 9.25,
      crecimientoR12: 19375122,
      porcentajeR12: 314.25
    },
    VIDA_COLECTIVO: {
      qPol202408: 237,
      r12202408: 4827939045,
      qPol202508: 234,
      r12202508: 9160455325,
      crecimientoQPol: -3,
      porcentajeQPol: -1.27,
      crecimientoR12: 4332516280,
      porcentajeR12: 89.74
    },
    VIDA_COLECTIVO_CON_AHORRO: {
      qPol202408: 4,
      r12202408: 43952280,
      qPol202508: 4,
      r12202508: 128390512,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 84438232,
      porcentajeR12: 192.11
    },
    VIDA_DIBA: {
      qPol202408: 4,
      r12202408: 1586517281,
      qPol202508: 4,
      r12202508: 3553967309,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 1967450028,
      porcentajeR12: 124.01
    },
    VIDA_INDIVIDUAL: {
      qPol202408: 33,
      r12202408: 4477,
      qPol202508: 33,
      r12202508: 4481,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 4,
      porcentajeR12: 0.09
    },
    VIDA_INDIVIDUAL_CON_AHORRO: {
      qPol202408: 12133,
      r12202408: 1673993351,
      qPol202508: 12047,
      r12202508: 3878282244,
      crecimientoQPol: -86,
      porcentajeQPol: -0.71,
      crecimientoR12: 2204288893,
      porcentajeR12: 131.68
    },
    VIDA_OBLIGATORIO: {
      qPol202408: 327,
      r12202408: 8695340,
      qPol202508: 390,
      r12202508: 19608876,
      crecimientoQPol: 63,
      porcentajeQPol: 19.27,
      crecimientoR12: 10913535,
      porcentajeR12: 125.51
    }
  };

  // Datos específicos para ASSA X CANAL
  const assaXCanalData = {
    CANAL_DIRECTO: {
      qPol202408: 23806,
      r12202408: 2240959553,
      qPol202508: 22607,
      r12202508: 3431509543,
      crecimientoQPol: -1199,
      porcentajeQPol: -5.04,
      crecimientoR12: 1190549990,
      porcentajeR12: 53.13
    },
    CANAL_FILIALES: {
      qPol202408: 22313,
      r12202408: 4193230281,
      qPol202508: 21709,
      r12202508: 9421091618,
      crecimientoQPol: -604,
      porcentajeQPol: -2.71,
      crecimientoR12: 5227861338,
      porcentajeR12: 124.67
    },
    CANAL_PAS: {
      qPol202408: 29336,
      r12202408: 6816532925,
      qPol202508: 29315,
      r12202508: 15555770196,
      crecimientoQPol: -21,
      porcentajeQPol: -0.07,
      crecimientoR12: 8741037271,
      porcentajeR12: 128.23
    }
  };

  // Datos específicos para ASSA X RAMO
  const assaXRamoData = {
    AERONAVEGACION: {
      qPol202408: 5,
      r12202408: 5135009,
      qPol202508: 7,
      r12202508: 26056851,
      crecimientoQPol: 2,
      porcentajeQPol: 40.00,
      crecimientoR12: 20921842,
      porcentajeR12: 407.44
    },
    AP: {
      qPol202408: 9847,
      r12202408: 139061759,
      qPol202508: 7893,
      r12202508: 397825842,
      crecimientoQPol: -1954,
      porcentajeQPol: -19.84,
      crecimientoR12: 258764083,
      porcentajeR12: 186.08
    },
    AUTOMOTORES: {
      qPol202408: 26185,
      r12202408: 10545921731,
      qPol202508: 25872,
      r12202508: 22109067730,
      crecimientoQPol: -313,
      porcentajeQPol: -1.20,
      crecimientoR12: 11563145999,
      porcentajeR12: 109.65
    },
    CASCOS: {
      qPol202408: 85,
      r12202408: 9037238,
      qPol202508: 100,
      r12202508: 22205827,
      crecimientoQPol: 15,
      porcentajeQPol: 17.65,
      crecimientoR12: 13168588,
      porcentajeR12: 145.71
    },
    CAUCION: {
      qPol202408: 1255,
      r12202408: 178505745,
      qPol202508: 1415,
      r12202508: 247867241,
      crecimientoQPol: 160,
      porcentajeQPol: 12.75,
      crecimientoR12: 69361495,
      porcentajeR12: 38.86
    },
    COMBINADO_FAMILIAR: {
      qPol202408: 14553,
      r12202408: 673695571,
      qPol202508: 14150,
      r12202508: 1969642521,
      crecimientoQPol: -403,
      porcentajeQPol: -2.77,
      crecimientoR12: 1295946951,
      porcentajeR12: 192.36
    },
    INCENDIO: {
      qPol202408: 986,
      r12202408: 215310802,
      qPol202508: 1098,
      r12202508: 360437744,
      crecimientoQPol: 112,
      porcentajeQPol: 11.36,
      crecimientoR12: 145126942,
      porcentajeR12: 67.40
    },
    INT_COMERCIO: {
      qPol202408: 1070,
      r12202408: 170584891,
      qPol202508: 1088,
      r12202508: 503965600,
      crecimientoQPol: 18,
      porcentajeQPol: 1.68,
      crecimientoR12: 333380709,
      porcentajeR12: 195.43
    },
    INT_CONSORCIO: {
      qPol202408: 348,
      r12202408: 54835550,
      qPol202508: 358,
      r12202508: 216621078,
      crecimientoQPol: 10,
      porcentajeQPol: 2.87,
      crecimientoR12: 161785528,
      porcentajeR12: 295.04
    },
    MOTOS: {
      qPol202408: 2873,
      r12202408: 257920015,
      qPol202508: 2779,
      r12202508: 773443504,
      crecimientoQPol: -94,
      porcentajeQPol: -3.27,
      crecimientoR12: 515523489,
      porcentajeR12: 199.88
    },
    PRAXIS: {
      qPol202408: 1601,
      r12202408: 79593636,
      qPol202508: 1885,
      r12202508: 325809180,
      crecimientoQPol: 284,
      porcentajeQPol: 17.74,
      crecimientoR12: 246215544,
      porcentajeR12: 309.34
    },
    RC: {
      qPol202408: 916,
      r12202408: 163271810,
      qPol202508: 1081,
      r12202508: 314655120,
      crecimientoQPol: 165,
      porcentajeQPol: 18.01,
      crecimientoR12: 151383310,
      porcentajeR12: 92.72
    },
    ROBO: {
      qPol202408: 267,
      r12202408: 32854975,
      qPol202508: 252,
      r12202508: 119425509,
      crecimientoQPol: -15,
      porcentajeQPol: -5.62,
      crecimientoR12: 86570535,
      porcentajeR12: 263.49
    },
    RS_VS: {
      qPol202408: 168,
      r12202408: 5768893,
      qPol202508: 287,
      r12202508: 24540489,
      crecimientoQPol: 119,
      porcentajeQPol: 70.83,
      crecimientoR12: 18771596,
      porcentajeR12: 325.39
    },
    SALUD: {
      qPol202408: 13588,
      r12202408: 372266042,
      qPol202508: 13468,
      r12202508: 533492024,
      crecimientoQPol: -120,
      porcentajeQPol: -0.88,
      crecimientoR12: 161225982,
      porcentajeR12: 43.31
    },
    SEGURO_TECNICO: {
      qPol202408: 157,
      r12202408: 133314698,
      qPol202508: 132,
      r12202508: 108466196,
      crecimientoQPol: -25,
      porcentajeQPol: -15.92,
      crecimientoR12: -24848501,
      porcentajeR12: -18.64
    },
    SEPELIO_INDIVIDUAL: {
      qPol202408: 6,
      r12202408: 7984249,
      qPol202508: 6,
      r12202508: 35183978,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 27199729,
      porcentajeR12: 340.67
    },
    TRANSPORTES: {
      qPol202408: 27,
      r12202408: 25790732,
      qPol202508: 22,
      r12202508: 51966462,
      crecimientoQPol: -5,
      porcentajeQPol: -18.52,
      crecimientoR12: 26175730,
      porcentajeR12: 101.49
    },
    VIDA_COLECTIVO: {
      qPol202408: 209,
      r12202408: 143319269,
      qPol202508: 205,
      r12202508: 151592394,
      crecimientoQPol: -4,
      porcentajeQPol: -1.91,
      crecimientoR12: 8273126,
      porcentajeR12: 5.77
    },
    VIDA_INDIVIDUAL: {
      qPol202408: 272,
      r12202408: 31998834,
      qPol202508: 394,
      r12202508: 54756960,
      crecimientoQPol: 122,
      porcentajeQPol: 44.85,
      crecimientoR12: 22758126,
      porcentajeR12: 71.12
    },
    VIDA_OBLIGATORIO: {
      qPol202408: 1037,
      r12202408: 4551311,
      qPol202508: 1138,
      r12202508: 15382732,
      crecimientoQPol: 101,
      porcentajeQPol: 9.74,
      crecimientoR12: 10831421,
      porcentajeR12: 237.98
    }
  };

  // Datos específicos para ASSA X CÍA
  const assaXCiaData = {
    AFIANZADORA: {
      qPol202408: 121,
      r12202408: 23275510,
      qPol202508: 213,
      r12202508: 30786112,
      crecimientoQPol: 92,
      porcentajeQPol: 76.03,
      crecimientoR12: 7510602,
      porcentajeR12: 32.27
    },
    ALLIANZ: {
      qPol202408: 1564,
      r12202408: 313484478,
      qPol202508: 2325,
      r12202508: 1041865659,
      crecimientoQPol: 761,
      porcentajeQPol: 48.66,
      crecimientoR12: 728381180,
      porcentajeR12: 232.35
    },
    ATM: {
      qPol202408: 513,
      r12202408: 46181438,
      qPol202508: 716,
      r12202508: 138493339,
      crecimientoQPol: 203,
      porcentajeQPol: 39.57,
      crecimientoR12: 92311901,
      porcentajeR12: 199.89
    },
    BOSTON: {
      qPol202408: 18,
      r12202408: 8952959,
      qPol202508: 1,
      r12202508: 74379,
      crecimientoQPol: -17,
      porcentajeQPol: -94.44,
      crecimientoR12: -8878580,
      porcentajeR12: -99.17
    },
    CAUCIONES: {
      qPol202408: 19,
      r12202408: 5344606,
      qPol202508: 13,
      r12202508: 1390887,
      crecimientoQPol: -6,
      porcentajeQPol: -31.58,
      crecimientoR12: -3953720,
      porcentajeR12: -73.98
    },
    CHUBB: {
      qPol202408: 96,
      r12202408: 15861757,
      qPol202508: 15,
      r12202508: 18972684,
      crecimientoQPol: -81,
      porcentajeQPol: -84.38,
      crecimientoR12: 3110927,
      porcentajeR12: 19.61
    },
    FED_PAT: {
      qPol202408: 791,
      r12202408: 305661335,
      qPol202508: 959,
      r12202508: 531237711,
      crecimientoQPol: 168,
      porcentajeQPol: 21.24,
      crecimientoR12: 225576376,
      porcentajeR12: 73.80
    },
    HDI: {
      qPol202408: 9,
      r12202408: 734095,
      qPol202508: 7,
      r12202508: 2321757,
      crecimientoQPol: -2,
      porcentajeQPol: -22.22,
      crecimientoR12: 1587663,
      porcentajeR12: 216.27
    },
    INTEGRITY: {
      qPol202408: 1533,
      r12202408: 312773035,
      qPol202508: 1619,
      r12202508: 543840130,
      crecimientoQPol: 86,
      porcentajeQPol: 5.61,
      crecimientoR12: 231067095,
      porcentajeR12: 73.88
    },
    LA_HOLANDO: {
      qPol202408: 70,
      r12202408: 6838282,
      qPol202508: 62,
      r12202508: 15875658,
      crecimientoQPol: -8,
      porcentajeQPol: -11.43,
      crecimientoR12: 9037376,
      porcentajeR12: 132.16
    },
    LIBRA: {
      qPol202408: 793,
      r12202408: 5769511,
      qPol202508: 490,
      r12202508: 5769511,
      crecimientoQPol: -303,
      porcentajeQPol: -38.21,
      crecimientoR12: 0,
      porcentajeR12: 0.00
    },
    LMA: {
      qPol202408: 24266,
      r12202408: 3366394962,
      qPol202508: 23454,
      r12202508: 9590435724,
      crecimientoQPol: -812,
      porcentajeQPol: -3.35,
      crecimientoR12: 6224040762,
      porcentajeR12: 184.89
    },
    NACION: {
      qPol202408: 1,
      r12202408: 12922,
      qPol202508: 0,
      r12202508: 0,
      crecimientoQPol: -1,
      porcentajeQPol: -100.00,
      crecimientoR12: -12922,
      porcentajeR12: -100.00
    },
    NOBLE: {
      qPol202408: 12,
      r12202408: 6352831,
      qPol202508: 11,
      r12202508: 13304418,
      crecimientoQPol: -1,
      porcentajeQPol: -8.33,
      crecimientoR12: 6951587,
      porcentajeR12: 109.43
    },
    PRUDENCIA: {
      qPol202408: 265,
      r12202408: 46599032,
      qPol202508: 333,
      r12202508: 129736655,
      crecimientoQPol: 68,
      porcentajeQPol: 25.66,
      crecimientoR12: 83137623,
      porcentajeR12: 178.41
    },
    RIVADAVIA: {
      qPol202408: 10,
      r12202408: 2596687,
      qPol202508: 48,
      r12202508: 22280185,
      crecimientoQPol: 38,
      porcentajeQPol: 380.00,
      crecimientoR12: 19683498,
      porcentajeR12: 758.02
    },
    RUS: {
      qPol202408: 11,
      r12202408: 1497250,
      qPol202508: 9,
      r12202508: 3311881,
      crecimientoQPol: -2,
      porcentajeQPol: -18.18,
      crecimientoR12: 1814631,
      porcentajeR12: 121.20
    },
    SANCOR: {
      qPol202408: 4675,
      r12202408: 988772441,
      qPol202508: 3256,
      r12202508: 2826362279,
      crecimientoQPol: -1419,
      porcentajeQPol: -30.35,
      crecimientoR12: 1837589837,
      porcentajeR12: 185.85
    },
    SMG: {
      qPol202408: 27059,
      r12202408: 7188385151,
      qPol202508: 25746,
      r12202508: 12404213055,
      crecimientoQPol: -1313,
      porcentajeQPol: -4.85,
      crecimientoR12: 5215827904,
      porcentajeR12: 72.56
    },
    SMG_LIFE: {
      qPol202408: 13379,
      r12202408: 528038385,
      qPol202508: 13295,
      r12202508: 684862351,
      crecimientoQPol: -84,
      porcentajeQPol: -0.63,
      crecimientoR12: 156823967,
      porcentajeR12: 29.70
    },
    TPC: {
      qPol202408: 20,
      r12202408: 81052,
      qPol202508: 0,
      r12202508: 20927,
      crecimientoQPol: -20,
      porcentajeQPol: -100.00,
      crecimientoR12: -60125,
      porcentajeR12: -74.18
    },
    VICTORIA: {
      qPol202408: 46,
      r12202408: 7172892,
      qPol202508: 214,
      r12202508: 55348609,
      crecimientoQPol: 168,
      porcentajeQPol: 365.22,
      crecimientoR12: 48175717,
      porcentajeR12: 671.64
    },
    ZURICH: {
      qPol202408: 8,
      r12202408: 2291112,
      qPol202508: 2,
      r12202508: 96455,
      crecimientoQPol: -6,
      porcentajeQPol: -75.00,
      crecimientoR12: -2194657,
      porcentajeR12: -95.79
    },
    COSENA: {
      qPol202408: 136,
      r12202408: 61962312,
      qPol202508: 218,
      r12202508: 52853317,
      crecimientoQPol: 82,
      porcentajeQPol: 60.29,
      crecimientoR12: -9108995,
      porcentajeR12: -14.70
    },
    SAN_CRISTOBAL: {
      qPol202408: 40,
      r12202408: 5688723,
      qPol202508: 621,
      r12202508: 296318204,
      crecimientoQPol: 581,
      porcentajeQPol: 1452.50,
      crecimientoR12: 290629481,
      porcentajeR12: 5108.87
    }
  };

  // Datos específicos para ART X CANAL
  const artXCanalData = {
    CANAL_DIRECTO: {
      qPol202408: 117,
      r12202408: 1291289649,
      qPol202508: 163,
      r12202508: 103530955,
      crecimientoQPol: 46,
      porcentajeQPol: 39.32,
      crecimientoR12: -1187758694,
      porcentajeR12: -91.98
    },
    CANAL_FILIALES: {
      qPol202408: 1016,
      r12202408: 616278915,
      qPol202508: 1004,
      r12202508: 1700404796,
      crecimientoQPol: -12,
      porcentajeQPol: -1.18,
      crecimientoR12: 1084125881,
      porcentajeR12: 175.91
    },
    CANAL_PAS: {
      qPol202408: 2111,
      r12202408: 5642704446,
      qPol202508: 2178,
      r12202508: 10565942302,
      crecimientoQPol: 67,
      porcentajeQPol: 3.17,
      crecimientoR12: 4923237856,
      porcentajeR12: 87.25
    }
  };

  // Datos específicos para ART X CÍA
  const artXCiaData = {
    ANDINA_ART: {
      qPol202408: 73,
      r12202408: 166842533,
      qPol202508: 244,
      r12202508: 1479829623,
      crecimientoQPol: 171,
      porcentajeQPol: 234.25,
      crecimientoR12: 1312987090,
      porcentajeR12: 786.96
    },
    ASOCIART_ART: {
      qPol202408: 323,
      r12202408: 1629349277,
      qPol202508: 361,
      r12202508: 2575358075,
      crecimientoQPol: 38,
      porcentajeQPol: 11.76,
      crecimientoR12: 946008798,
      porcentajeR12: 58.06
    },
    EXPERTA_ART: {
      qPol202408: 28,
      r12202408: 138734835,
      qPol202508: 23,
      r12202508: 309246420,
      crecimientoQPol: -5,
      porcentajeQPol: -17.86,
      crecimientoR12: 170511586,
      porcentajeR12: 122.90
    },
    FED_PAT: {
      qPol202408: 132,
      r12202408: 2349559046,
      qPol202508: 106,
      r12202508: 1069467626,
      crecimientoQPol: -26,
      porcentajeQPol: -19.70,
      crecimientoR12: -1280091420,
      porcentajeR12: -54.48
    },
    GALENO_ART: {
      qPol202408: 12,
      r12202408: 66536918,
      qPol202508: 8,
      r12202508: 10885655,
      crecimientoQPol: -4,
      porcentajeQPol: -33.33,
      crecimientoR12: -55651263,
      porcentajeR12: -83.64
    },
    LA_HOLANDO_ART: {
      qPol202408: 8,
      r12202408: 21561415,
      qPol202508: 11,
      r12202508: 248271635,
      crecimientoQPol: 3,
      porcentajeQPol: 37.50,
      crecimientoR12: 226710220,
      porcentajeR12: 1051.46
    },
    OMINT_ART: {
      qPol202408: 4,
      r12202408: 5009147,
      qPol202508: 4,
      r12202508: 8405747,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 3396600,
      porcentajeR12: 67.81
    },
    PREVENCION_ART: {
      qPol202408: 1579,
      r12202408: 1215706171,
      qPol202508: 1590,
      r12202508: 2745633959,
      crecimientoQPol: 11,
      porcentajeQPol: 0.70,
      crecimientoR12: 1529927788,
      porcentajeR12: 125.85
    },
    PROVINCIA_ART: {
      qPol202408: 574,
      r12202408: 1074334312,
      qPol202508: 534,
      r12202508: 2361201528,
      crecimientoQPol: -40,
      porcentajeQPol: -6.97,
      crecimientoR12: 1286867216,
      porcentajeR12: 119.78
    },
    SMG_ART: {
      qPol202408: 511,
      r12202408: 882639356,
      qPol202508: 460,
      r12202508: 1546534132,
      crecimientoQPol: -51,
      porcentajeQPol: -9.98,
      crecimientoR12: 663894776,
      porcentajeR12: 75.22
    },
    VICTORIA_ART: {
      qPol202408: 0,
      r12202408: 0,
      qPol202508: 4,
      r12202508: 15043652,
      crecimientoQPol: 4,
      porcentajeQPol: 100.00,
      crecimientoR12: 15043652,
      porcentajeR12: 100.00
    }
  };

  // Gráfico comparativo de R12 por compañía
  const r12ChartData = useMemo(() => {
    if (tipoVista === 'TOTAL X CÍA') {
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
            name: '202408', 
            data: [
              totalXCiaData.CAS.r12202408,
              totalXCiaData.ASSA.r12202408,
              totalXCiaData.ART.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              totalXCiaData.CAS.r12202508,
              totalXCiaData.ASSA.r12202508,
              totalXCiaData.ART.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'TOTAL X CANAL') {
      return {
        chart: { type: 'column', height: 320 },
        xAxis: {
          categories: ['CANAL DIRECTO', 'CANAL FILIALES', 'CANAL PAS'],
          title: { text: 'Canal' },
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
            name: '202408', 
            data: [
              totalXCanalData.CANAL_DIRECTO.r12202408,
              totalXCanalData.CANAL_FILIALES.r12202408,
              totalXCanalData.CANAL_PAS.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              totalXCanalData.CANAL_DIRECTO.r12202508,
              totalXCanalData.CANAL_FILIALES.r12202508,
              totalXCanalData.CANAL_PAS.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'CAS X CANAL') {
      return {
        chart: { type: 'column', height: 320 },
        xAxis: {
          categories: ['CANAL DIRECTO', 'CANAL FILIALES', 'CANAL PAS'],
          title: { text: 'Canal' },
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
            name: '202408', 
            data: [
              casXCanalData.CANAL_DIRECTO.r12202408,
              casXCanalData.CANAL_FILIALES.r12202408,
              casXCanalData.CANAL_PAS.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              casXCanalData.CANAL_DIRECTO.r12202508,
              casXCanalData.CANAL_FILIALES.r12202508,
              casXCanalData.CANAL_PAS.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'CAS X RAMO') {
      return {
        chart: { type: 'column', height: 400 },
        xAxis: {
          categories: [
            'AP', 'AP BOLSO', 'ARMAS', 'BOLSO PROTEGIDO', 'ESCOLTA', 'ESCOLTA EJERCITO', 
            'ROBO', 'SALDO DEUDOR', 'SDJM', 'SEPELIO COLECTIVO', 'SEPELIO INDIVIDUAL', 
            'VIDA COLECTIVO', 'VIDA COLECTIVO CON AHORRO', 'VIDA DIBA', 'VIDA INDIVIDUAL', 
            'VIDA INDIVIDUAL CON AHORRO', 'VIDA OBLIGATORIO'
          ],
          title: { text: 'Ramo' },
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px'
            }
          }
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
            name: '202408', 
            data: [
              casXRamoData.AP.r12202408,
              casXRamoData.AP_BOLSO.r12202408,
              casXRamoData.ARMAS.r12202408,
              casXRamoData.BOLSO_PROTEGIDO.r12202408,
              casXRamoData.ESCOLTA.r12202408,
              casXRamoData.ESCOLTA_EJERCITO.r12202408,
              casXRamoData.ROBO.r12202408,
              casXRamoData.SALDO_DEUDOR.r12202408,
              casXRamoData.SDJM.r12202408,
              casXRamoData.SEPELIO_COLECTIVO.r12202408,
              casXRamoData.SEPELIO_INDIVIDUAL.r12202408,
              casXRamoData.VIDA_COLECTIVO.r12202408,
              casXRamoData.VIDA_COLECTIVO_CON_AHORRO.r12202408,
              casXRamoData.VIDA_DIBA.r12202408,
              casXRamoData.VIDA_INDIVIDUAL.r12202408,
              casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.r12202408,
              casXRamoData.VIDA_OBLIGATORIO.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              casXRamoData.AP.r12202508,
              casXRamoData.AP_BOLSO.r12202508,
              casXRamoData.ARMAS.r12202508,
              casXRamoData.BOLSO_PROTEGIDO.r12202508,
              casXRamoData.ESCOLTA.r12202508,
              casXRamoData.ESCOLTA_EJERCITO.r12202508,
              casXRamoData.ROBO.r12202508,
              casXRamoData.SALDO_DEUDOR.r12202508,
              casXRamoData.SDJM.r12202508,
              casXRamoData.SEPELIO_COLECTIVO.r12202508,
              casXRamoData.SEPELIO_INDIVIDUAL.r12202508,
              casXRamoData.VIDA_COLECTIVO.r12202508,
              casXRamoData.VIDA_COLECTIVO_CON_AHORRO.r12202508,
              casXRamoData.VIDA_DIBA.r12202508,
              casXRamoData.VIDA_INDIVIDUAL.r12202508,
              casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.r12202508,
              casXRamoData.VIDA_OBLIGATORIO.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'TOTAL X RAMO') {
      return {
        chart: { type: 'column', height: 400 },
        xAxis: {
          categories: [
            'AP', 'AP BOLSO', 'ARMAS', 'BOLSO PROTEGIDO', 'ESCOLTA', 'ESCOLTA EJERCITO', 
            'ROBO', 'SALDO DEUDOR', 'SDJM', 'SEPELIO COLECTIVO', 'SEPELIO INDIVIDUAL', 
            'VIDA COLECTIVO', 'VIDA COLECTIVO CON AHORRO', 'VIDA DIBA', 'VIDA INDIVIDUAL', 
            'VIDA INDIVIDUAL CON AHORRO', 'VIDA OBLIGATORIO'
          ],
          title: { text: 'Ramo' },
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px'
            }
          }
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
            name: '202408', 
            data: [
              totalXRamoData.AP.r12202408,
              totalXRamoData.AP_BOLSO.r12202408,
              totalXRamoData.ARMAS.r12202408,
              totalXRamoData.BOLSO_PROTEGIDO.r12202408,
              totalXRamoData.ESCOLTA.r12202408,
              totalXRamoData.ESCOLTA_EJERCITO.r12202408,
              totalXRamoData.ROBO.r12202408,
              totalXRamoData.SALDO_DEUDOR.r12202408,
              totalXRamoData.SDJM.r12202408,
              totalXRamoData.SEPELIO_COLECTIVO.r12202408,
              totalXRamoData.SEPELIO_INDIVIDUAL.r12202408,
              totalXRamoData.VIDA_COLECTIVO.r12202408,
              totalXRamoData.VIDA_COLECTIVO_CON_AHORRO.r12202408,
              totalXRamoData.VIDA_DIBA.r12202408,
              totalXRamoData.VIDA_INDIVIDUAL.r12202408,
              totalXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.r12202408,
              totalXRamoData.VIDA_OBLIGATORIO.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              totalXRamoData.AP.r12202508,
              totalXRamoData.AP_BOLSO.r12202508,
              totalXRamoData.ARMAS.r12202508,
              totalXRamoData.BOLSO_PROTEGIDO.r12202508,
              totalXRamoData.ESCOLTA.r12202508,
              totalXRamoData.ESCOLTA_EJERCITO.r12202508,
              totalXRamoData.ROBO.r12202508,
              totalXRamoData.SALDO_DEUDOR.r12202508,
              totalXRamoData.SDJM.r12202508,
              totalXRamoData.SEPELIO_COLECTIVO.r12202508,
              totalXRamoData.SEPELIO_INDIVIDUAL.r12202508,
              totalXRamoData.VIDA_COLECTIVO.r12202508,
              totalXRamoData.VIDA_COLECTIVO_CON_AHORRO.r12202508,
              totalXRamoData.VIDA_DIBA.r12202508,
              totalXRamoData.VIDA_INDIVIDUAL.r12202508,
              totalXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.r12202508,
              totalXRamoData.VIDA_OBLIGATORIO.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'ASSA X CANAL') {
      return {
        chart: { type: 'column', height: 320 },
        xAxis: {
          categories: ['CANAL DIRECTO', 'CANAL FILIALES', 'CANAL PAS'],
          title: { text: 'Canal' },
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
            name: '202408', 
            data: [
              assaXCanalData.CANAL_DIRECTO.r12202408,
              assaXCanalData.CANAL_FILIALES.r12202408,
              assaXCanalData.CANAL_PAS.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              assaXCanalData.CANAL_DIRECTO.r12202508,
              assaXCanalData.CANAL_FILIALES.r12202508,
              assaXCanalData.CANAL_PAS.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'ASSA X RAMO') {
      return {
        chart: { type: 'column', height: 400 },
        xAxis: {
          categories: [
            'AERONAVEGACIÓN', 'AP', 'AUTOMOTORES', 'CASCOS', 'CAUCIÓN', 'COMBINADO FAMILIAR', 
            'INCENDIO', 'INT. COMERCIO', 'INT. CONSORCIO', 'MOTOS', 'PRAXIS', 'RC', 
            'ROBO', 'RS. VS.', 'SALUD', 'SEGURO TÉCNICO', 'SEPELIO INDIVIDUAL', 'TRANSPORTES', 
            'VIDA COLECTIVO', 'VIDA INDIVIDUAL', 'VIDA OBLIGATORIO'
          ],
          title: { text: 'Ramo' },
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px'
            }
          }
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
            name: '202408', 
            data: [
              assaXRamoData.AERONAVEGACION.r12202408,
              assaXRamoData.AP.r12202408,
              assaXRamoData.AUTOMOTORES.r12202408,
              assaXRamoData.CASCOS.r12202408,
              assaXRamoData.CAUCION.r12202408,
              assaXRamoData.COMBINADO_FAMILIAR.r12202408,
              assaXRamoData.INCENDIO.r12202408,
              assaXRamoData.INT_COMERCIO.r12202408,
              assaXRamoData.INT_CONSORCIO.r12202408,
              assaXRamoData.MOTOS.r12202408,
              assaXRamoData.PRAXIS.r12202408,
              assaXRamoData.RC.r12202408,
              assaXRamoData.ROBO.r12202408,
              assaXRamoData.RS_VS.r12202408,
              assaXRamoData.SALUD.r12202408,
              assaXRamoData.SEGURO_TECNICO.r12202408,
              assaXRamoData.SEPELIO_INDIVIDUAL.r12202408,
              assaXRamoData.TRANSPORTES.r12202408,
              assaXRamoData.VIDA_COLECTIVO.r12202408,
              assaXRamoData.VIDA_INDIVIDUAL.r12202408,
              assaXRamoData.VIDA_OBLIGATORIO.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              assaXRamoData.AERONAVEGACION.r12202508,
              assaXRamoData.AP.r12202508,
              assaXRamoData.AUTOMOTORES.r12202508,
              assaXRamoData.CASCOS.r12202508,
              assaXRamoData.CAUCION.r12202508,
              assaXRamoData.COMBINADO_FAMILIAR.r12202508,
              assaXRamoData.INCENDIO.r12202508,
              assaXRamoData.INT_COMERCIO.r12202508,
              assaXRamoData.INT_CONSORCIO.r12202508,
              assaXRamoData.MOTOS.r12202508,
              assaXRamoData.PRAXIS.r12202508,
              assaXRamoData.RC.r12202508,
              assaXRamoData.ROBO.r12202508,
              assaXRamoData.RS_VS.r12202508,
              assaXRamoData.SALUD.r12202508,
              assaXRamoData.SEGURO_TECNICO.r12202508,
              assaXRamoData.SEPELIO_INDIVIDUAL.r12202508,
              assaXRamoData.TRANSPORTES.r12202508,
              assaXRamoData.VIDA_COLECTIVO.r12202508,
              assaXRamoData.VIDA_INDIVIDUAL.r12202508,
              assaXRamoData.VIDA_OBLIGATORIO.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'ASSA X CÍA') {
      return {
        chart: { type: 'column', height: 400 },
        xAxis: {
          categories: [
            'AFIANZADORA', 'ALLIANZ', 'ATM', 'BOSTON', 'CAUCIONES', 'CHUBB', 'FED PAT', 'HDI', 
            'INTEGRITY', 'LA HOLANDO', 'LIBRA', 'LMA', 'NACIÓN', 'NOBLE', 'PRUDENCIA', 'RIVADAVIA', 
            'RUS', 'SANCOR', 'SMG', 'SMG LIFE', 'TPC', 'VICTORIA', 'ZURICH', 'COSENA', 'SAN CRISTOBAL'
          ],
          title: { text: 'Compañía' },
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px'
            }
          }
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
            name: '202408', 
            data: [
              assaXCiaData.AFIANZADORA.r12202408,
              assaXCiaData.ALLIANZ.r12202408,
              assaXCiaData.ATM.r12202408,
              assaXCiaData.BOSTON.r12202408,
              assaXCiaData.CAUCIONES.r12202408,
              assaXCiaData.CHUBB.r12202408,
              assaXCiaData.FED_PAT.r12202408,
              assaXCiaData.HDI.r12202408,
              assaXCiaData.INTEGRITY.r12202408,
              assaXCiaData.LA_HOLANDO.r12202408,
              assaXCiaData.LIBRA.r12202408,
              assaXCiaData.LMA.r12202408,
              assaXCiaData.NACION.r12202408,
              assaXCiaData.NOBLE.r12202408,
              assaXCiaData.PRUDENCIA.r12202408,
              assaXCiaData.RIVADAVIA.r12202408,
              assaXCiaData.RUS.r12202408,
              assaXCiaData.SANCOR.r12202408,
              assaXCiaData.SMG.r12202408,
              assaXCiaData.SMG_LIFE.r12202408,
              assaXCiaData.TPC.r12202408,
              assaXCiaData.VICTORIA.r12202408,
              assaXCiaData.ZURICH.r12202408,
              assaXCiaData.COSENA.r12202408,
              assaXCiaData.SAN_CRISTOBAL.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              assaXCiaData.AFIANZADORA.r12202508,
              assaXCiaData.ALLIANZ.r12202508,
              assaXCiaData.ATM.r12202508,
              assaXCiaData.BOSTON.r12202508,
              assaXCiaData.CAUCIONES.r12202508,
              assaXCiaData.CHUBB.r12202508,
              assaXCiaData.FED_PAT.r12202508,
              assaXCiaData.HDI.r12202508,
              assaXCiaData.INTEGRITY.r12202508,
              assaXCiaData.LA_HOLANDO.r12202508,
              assaXCiaData.LIBRA.r12202508,
              assaXCiaData.LMA.r12202508,
              assaXCiaData.NACION.r12202508,
              assaXCiaData.NOBLE.r12202508,
              assaXCiaData.PRUDENCIA.r12202508,
              assaXCiaData.RIVADAVIA.r12202508,
              assaXCiaData.RUS.r12202508,
              assaXCiaData.SANCOR.r12202508,
              assaXCiaData.SMG.r12202508,
              assaXCiaData.SMG_LIFE.r12202508,
              assaXCiaData.TPC.r12202508,
              assaXCiaData.VICTORIA.r12202508,
              assaXCiaData.ZURICH.r12202508,
              assaXCiaData.COSENA.r12202508,
              assaXCiaData.SAN_CRISTOBAL.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'ART X CANAL') {
      return {
        chart: { type: 'column', height: 400 },
        xAxis: {
          categories: ['CANAL DIRECTO', 'CANAL FILIALES', 'CANAL PAS'],
          title: { text: 'Canal' },
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
            name: '202408', 
            data: [
              artXCanalData.CANAL_DIRECTO.r12202408,
              artXCanalData.CANAL_FILIALES.r12202408,
              artXCanalData.CANAL_PAS.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              artXCanalData.CANAL_DIRECTO.r12202508,
              artXCanalData.CANAL_FILIALES.r12202508,
              artXCanalData.CANAL_PAS.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'ART X CÍA') {
      return {
        chart: { type: 'column', height: 400 },
        xAxis: {
          categories: [
            'ANDINA ART', 'ASOCIART ART', 'EXPERTA ART', 'FED PAT', 'GALENO ART', 
            'LA HOLANDO ART', 'OMINT ART', 'PREVENCIÓN ART', 'PROVINCIA ART', 'SMG ART', 'VICTORIA ART'
          ],
          title: { text: 'Compañía' },
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px'
            }
          }
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
            name: '202408', 
            data: [
              artXCiaData.ANDINA_ART.r12202408,
              artXCiaData.ASOCIART_ART.r12202408,
              artXCiaData.EXPERTA_ART.r12202408,
              artXCiaData.FED_PAT.r12202408,
              artXCiaData.GALENO_ART.r12202408,
              artXCiaData.LA_HOLANDO_ART.r12202408,
              artXCiaData.OMINT_ART.r12202408,
              artXCiaData.PREVENCION_ART.r12202408,
              artXCiaData.PROVINCIA_ART.r12202408,
              artXCiaData.SMG_ART.r12202408,
              artXCiaData.VICTORIA_ART.r12202408
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202508', 
            data: [
              artXCiaData.ANDINA_ART.r12202508,
              artXCiaData.ASOCIART_ART.r12202508,
              artXCiaData.EXPERTA_ART.r12202508,
              artXCiaData.FED_PAT.r12202508,
              artXCiaData.GALENO_ART.r12202508,
              artXCiaData.LA_HOLANDO_ART.r12202508,
              artXCiaData.OMINT_ART.r12202508,
              artXCiaData.PREVENCION_ART.r12202508,
              artXCiaData.PROVINCIA_ART.r12202508,
              artXCiaData.SMG_ART.r12202508,
              artXCiaData.VICTORIA_ART.r12202508
            ], 
            color: '#003871' 
          },
        ],
        credits: { enabled: false },
      };
    }

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
  }, [indicadoresData, filterApplied, selectedMonth1, selectedYear1, selectedMonth2, selectedYear2, tipoVista, totalXCiaData]);

  // Gráfico de torta de Q PÓL por compañía
  const qPolPieData = useMemo(() => {
    if (tipoVista === 'TOTAL X CÍA') {
      return {
        chart: { type: 'pie', height: 320 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'CAS', y: totalXCiaData.CAS.qPol202508, color: '#003871' },
              { name: 'ASSA', y: totalXCiaData.ASSA.qPol202508, color: '#007DC5' },
              { name: 'ART', y: totalXCiaData.ART.qPol202508, color: '#00AEEF' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { enabled: true },
      };
    }

    if (tipoVista === 'TOTAL X CANAL') {
      return {
        chart: { type: 'pie', height: 320 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'CANAL DIRECTO', y: totalXCanalData.CANAL_DIRECTO.qPol202508, color: '#003871' },
              { name: 'CANAL FILIALES', y: totalXCanalData.CANAL_FILIALES.qPol202508, color: '#007DC5' },
              { name: 'CANAL PAS', y: totalXCanalData.CANAL_PAS.qPol202508, color: '#00AEEF' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { enabled: true },
      };
    }

    if (tipoVista === 'CAS X CANAL') {
      return {
        chart: { type: 'pie', height: 320 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'CANAL DIRECTO', y: casXCanalData.CANAL_DIRECTO.qPol202508, color: '#003871' },
              { name: 'CANAL FILIALES', y: casXCanalData.CANAL_FILIALES.qPol202508, color: '#007DC5' },
              { name: 'CANAL PAS', y: casXCanalData.CANAL_PAS.qPol202508, color: '#00AEEF' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { enabled: true },
      };
    }

    if (tipoVista === 'CAS X RAMO') {
      return {
        chart: { type: 'pie', height: 400 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'VIDA INDIVIDUAL CON AHORRO', y: casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.qPol202508, color: '#003871' },
              { name: 'CANAL DIRECTO', y: casXRamoData.AP.qPol202508 + casXRamoData.AP_BOLSO.qPol202508 + casXRamoData.ARMAS.qPol202508 + casXRamoData.BOLSO_PROTEGIDO.qPol202508 + casXRamoData.ESCOLTA.qPol202508 + casXRamoData.ESCOLTA_EJERCITO.qPol202508 + casXRamoData.ROBO.qPol202508 + casXRamoData.SALDO_DEUDOR.qPol202508 + casXRamoData.SDJM.qPol202508, color: '#007DC5' },
              { name: 'SEPELIO INDIVIDUAL', y: casXRamoData.SEPELIO_INDIVIDUAL.qPol202508, color: '#00AEEF' },
              { name: 'VIDA OBLIGATORIO', y: casXRamoData.VIDA_OBLIGATORIO.qPol202508, color: '#FF6B6B' },
              { name: 'SEPELIO COLECTIVO', y: casXRamoData.SEPELIO_COLECTIVO.qPol202508, color: '#4ECDC4' },
              { name: 'VIDA COLECTIVO', y: casXRamoData.VIDA_COLECTIVO.qPol202508, color: '#45B7D1' },
              { name: 'VIDA COLECTIVO CON AHORRO', y: casXRamoData.VIDA_COLECTIVO_CON_AHORRO.qPol202508, color: '#96CEB4' },
              { name: 'VIDA DIBA', y: casXRamoData.VIDA_DIBA.qPol202508, color: '#FFEAA7' },
              { name: 'VIDA INDIVIDUAL', y: casXRamoData.VIDA_INDIVIDUAL.qPol202508, color: '#DDA0DD' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { 
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'TOTAL X RAMO') {
      return {
        chart: { type: 'pie', height: 400 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'VIDA INDIVIDUAL CON AHORRO', y: totalXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.qPol202508, color: '#003871' },
              { name: 'CANAL DIRECTO', y: totalXRamoData.AP.qPol202508 + totalXRamoData.AP_BOLSO.qPol202508 + totalXRamoData.ARMAS.qPol202508 + totalXRamoData.BOLSO_PROTEGIDO.qPol202508 + totalXRamoData.ESCOLTA.qPol202508 + totalXRamoData.ESCOLTA_EJERCITO.qPol202508 + totalXRamoData.ROBO.qPol202508 + totalXRamoData.SALDO_DEUDOR.qPol202508 + totalXRamoData.SDJM.qPol202508, color: '#007DC5' },
              { name: 'SEPELIO INDIVIDUAL', y: totalXRamoData.SEPELIO_INDIVIDUAL.qPol202508, color: '#00AEEF' },
              { name: 'VIDA OBLIGATORIO', y: totalXRamoData.VIDA_OBLIGATORIO.qPol202508, color: '#FF6B6B' },
              { name: 'SEPELIO COLECTIVO', y: totalXRamoData.SEPELIO_COLECTIVO.qPol202508, color: '#4ECDC4' },
              { name: 'VIDA COLECTIVO', y: totalXRamoData.VIDA_COLECTIVO.qPol202508, color: '#45B7D1' },
              { name: 'VIDA COLECTIVO CON AHORRO', y: totalXRamoData.VIDA_COLECTIVO_CON_AHORRO.qPol202508, color: '#96CEB4' },
              { name: 'VIDA DIBA', y: totalXRamoData.VIDA_DIBA.qPol202508, color: '#FFEAA7' },
              { name: 'VIDA INDIVIDUAL', y: totalXRamoData.VIDA_INDIVIDUAL.qPol202508, color: '#DDA0DD' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { 
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'ASSA X CANAL') {
      return {
        chart: { type: 'pie', height: 320 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'CANAL PAS', y: assaXCanalData.CANAL_PAS.qPol202508, color: '#003871' },
              { name: 'CANAL DIRECTO', y: assaXCanalData.CANAL_DIRECTO.qPol202508, color: '#007DC5' },
              { name: 'CANAL FILIALES', y: assaXCanalData.CANAL_FILIALES.qPol202508, color: '#00AEEF' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { enabled: true },
      };
    }

    if (tipoVista === 'ASSA X RAMO') {
      return {
        chart: { type: 'pie', height: 400 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'AUTOMOTORES', y: assaXRamoData.AUTOMOTORES.qPol202508, color: '#003871' },
              { name: 'COMBINADO FAMILIAR', y: assaXRamoData.COMBINADO_FAMILIAR.qPol202508, color: '#007DC5' },
              { name: 'SALUD', y: assaXRamoData.SALUD.qPol202508, color: '#00AEEF' },
              { name: 'AP', y: assaXRamoData.AP.qPol202508, color: '#FF6B6B' },
              { name: 'MOTOS', y: assaXRamoData.MOTOS.qPol202508, color: '#4ECDC4' },
              { name: 'PRAXIS', y: assaXRamoData.PRAXIS.qPol202508, color: '#45B7D1' },
              { name: 'RC', y: assaXRamoData.RC.qPol202508, color: '#96CEB4' },
              { name: 'CAUCIÓN', y: assaXRamoData.CAUCION.qPol202508, color: '#FFEAA7' },
              { name: 'VIDA OBLIGATORIO', y: assaXRamoData.VIDA_OBLIGATORIO.qPol202508, color: '#DDA0DD' },
              { name: 'OTROS', y: assaXRamoData.AERONAVEGACION.qPol202508 + assaXRamoData.CASCOS.qPol202508 + assaXRamoData.INCENDIO.qPol202508 + assaXRamoData.INT_COMERCIO.qPol202508 + assaXRamoData.INT_CONSORCIO.qPol202508 + assaXRamoData.ROBO.qPol202508 + assaXRamoData.RS_VS.qPol202508 + assaXRamoData.SEGURO_TECNICO.qPol202508 + assaXRamoData.SEPELIO_INDIVIDUAL.qPol202508 + assaXRamoData.TRANSPORTES.qPol202508 + assaXRamoData.VIDA_COLECTIVO.qPol202508 + assaXRamoData.VIDA_INDIVIDUAL.qPol202508, color: '#98D8C8' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { 
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'ASSA X CÍA') {
      return {
        chart: { type: 'pie', height: 400 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'SMG', y: assaXCiaData.SMG.qPol202508, color: '#003871' },
              { name: 'LMA', y: assaXCiaData.LMA.qPol202508, color: '#007DC5' },
              { name: 'SMG LIFE', y: assaXCiaData.SMG_LIFE.qPol202508, color: '#00AEEF' },
              { name: 'SANCOR', y: assaXCiaData.SANCOR.qPol202508, color: '#FF6B6B' },
              { name: 'ALLIANZ', y: assaXCiaData.ALLIANZ.qPol202508, color: '#4ECDC4' },
              { name: 'INTEGRITY', y: assaXCiaData.INTEGRITY.qPol202508, color: '#45B7D1' },
              { name: 'FED PAT', y: assaXCiaData.FED_PAT.qPol202508, color: '#96CEB4' },
              { name: 'SAN CRISTOBAL', y: assaXCiaData.SAN_CRISTOBAL.qPol202508, color: '#FFEAA7' },
              { name: 'VICTORIA', y: assaXCiaData.VICTORIA.qPol202508, color: '#DDA0DD' },
              { name: 'OTROS', y: assaXCiaData.AFIANZADORA.qPol202508 + assaXCiaData.ATM.qPol202508 + assaXCiaData.BOSTON.qPol202508 + assaXCiaData.CAUCIONES.qPol202508 + assaXCiaData.CHUBB.qPol202508 + assaXCiaData.HDI.qPol202508 + assaXCiaData.LA_HOLANDO.qPol202508 + assaXCiaData.LIBRA.qPol202508 + assaXCiaData.NACION.qPol202508 + assaXCiaData.NOBLE.qPol202508 + assaXCiaData.PRUDENCIA.qPol202508 + assaXCiaData.RIVADAVIA.qPol202508 + assaXCiaData.RUS.qPol202508 + assaXCiaData.TPC.qPol202508 + assaXCiaData.ZURICH.qPol202508 + assaXCiaData.COSENA.qPol202508, color: '#98D8C8' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { 
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'ART X CANAL') {
      return {
        chart: { type: 'pie', height: 400 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'CANAL PAS', y: artXCanalData.CANAL_PAS.qPol202508, color: '#003871' },
              { name: 'CANAL FILIALES', y: artXCanalData.CANAL_FILIALES.qPol202508, color: '#007DC5' },
              { name: 'CANAL DIRECTO', y: artXCanalData.CANAL_DIRECTO.qPol202508, color: '#00AEEF' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { 
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'ART X CÍA') {
      return {
        chart: { type: 'pie', height: 400 },
        series: [
          {
            name: 'Q PÓL 202508',
            data: [
              { name: 'PREVENCIÓN ART', y: artXCiaData.PREVENCION_ART.qPol202508, color: '#003871' },
              { name: 'ASOCIART ART', y: artXCiaData.ASOCIART_ART.qPol202508, color: '#007DC5' },
              { name: 'PROVINCIA ART', y: artXCiaData.PROVINCIA_ART.qPol202508, color: '#00AEEF' },
              { name: 'SMG ART', y: artXCiaData.SMG_ART.qPol202508, color: '#FF6B6B' },
              { name: 'ANDINA ART', y: artXCiaData.ANDINA_ART.qPol202508, color: '#4ECDC4' },
              { name: 'FED PAT', y: artXCiaData.FED_PAT.qPol202508, color: '#45B7D1' },
              { name: 'EXPERTA ART', y: artXCiaData.EXPERTA_ART.qPol202508, color: '#96CEB4' },
              { name: 'LA HOLANDO ART', y: artXCiaData.LA_HOLANDO_ART.qPol202508, color: '#FFEAA7' },
              { name: 'OTROS', y: artXCiaData.GALENO_ART.qPol202508 + artXCiaData.OMINT_ART.qPol202508 + artXCiaData.VICTORIA_ART.qPol202508, color: '#DDA0DD' },
            ],
          },
        ],
        credits: { enabled: false },
        legend: { 
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

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
  }, [indicadoresData, filterApplied, selectedMonth2, selectedYear2, tipoVista, totalXCiaData, totalXCanalData, totalXRamoData, casXCanalData, casXRamoData, assaXCanalData, assaXRamoData, assaXCiaData, artXCanalData, artXCiaData]);

  // Gráfico de evolución de R12
  const r12EvolutionData = useMemo(() => {
    if (tipoVista === 'TOTAL X CÍA') {
      return {
        chart: { type: 'line', height: 320 },
        xAxis: {
          categories: ['202408', '202508'],
          title: { text: 'Período' },
        },
        yAxis: {
          title: { text: 'Q PÓL (Cantidad)' },
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
            data: [totalXCiaData.CAS.qPol202408, totalXCiaData.CAS.qPol202508], 
            color: '#003871' 
          },
          { 
            name: 'ASSA', 
            data: [totalXCiaData.ASSA.qPol202408, totalXCiaData.ASSA.qPol202508], 
            color: '#007DC5' 
          },
          { 
            name: 'ART', 
            data: [totalXCiaData.ART.qPol202408, totalXCiaData.ART.qPol202508], 
            color: '#00AEEF' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'TOTAL X CANAL') {
      return {
        chart: { type: 'line', height: 320 },
        xAxis: {
          categories: ['202408', '202508'],
          title: { text: 'Período' },
        },
        yAxis: {
          title: { text: 'Q PÓL (Cantidad)' },
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
            name: 'CANAL DIRECTO', 
            data: [totalXCanalData.CANAL_DIRECTO.qPol202408, totalXCanalData.CANAL_DIRECTO.qPol202508], 
            color: '#003871' 
          },
          { 
            name: 'CANAL FILIALES', 
            data: [totalXCanalData.CANAL_FILIALES.qPol202408, totalXCanalData.CANAL_FILIALES.qPol202508], 
            color: '#007DC5' 
          },
          { 
            name: 'CANAL PAS', 
            data: [totalXCanalData.CANAL_PAS.qPol202408, totalXCanalData.CANAL_PAS.qPol202508], 
            color: '#00AEEF' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'CAS X CANAL') {
      return {
        chart: { type: 'line', height: 320 },
        xAxis: {
          categories: ['202408', '202508'],
          title: { text: 'Período' },
        },
        yAxis: {
          title: { text: 'Q PÓL (Cantidad)' },
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
            name: 'CANAL DIRECTO', 
            data: [casXCanalData.CANAL_DIRECTO.qPol202408, casXCanalData.CANAL_DIRECTO.qPol202508], 
            color: '#003871' 
          },
          { 
            name: 'CANAL FILIALES', 
            data: [casXCanalData.CANAL_FILIALES.qPol202408, casXCanalData.CANAL_FILIALES.qPol202508], 
            color: '#007DC5' 
          },
          { 
            name: 'CANAL PAS', 
            data: [casXCanalData.CANAL_PAS.qPol202408, casXCanalData.CANAL_PAS.qPol202508], 
            color: '#00AEEF' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'CAS X RAMO') {
      return {
        chart: { type: 'line', height: 400 },
        xAxis: {
          categories: ['202408', '202508'],
          title: { text: 'Período' },
        },
        yAxis: {
          title: { text: 'Q PÓL (Cantidad)' },
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
            name: 'VIDA COLECTIVO', 
            data: [casXRamoData.VIDA_COLECTIVO.qPol202408, casXRamoData.VIDA_COLECTIVO.qPol202508], 
            color: '#003871' 
          },
          { 
            name: 'VIDA INDIVIDUAL CON AHORRO', 
            data: [casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.qPol202408, casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.qPol202508], 
            color: '#007DC5' 
          },
          { 
            name: 'SEPELIO COLECTIVO', 
            data: [casXRamoData.SEPELIO_COLECTIVO.qPol202408, casXRamoData.SEPELIO_COLECTIVO.qPol202508], 
            color: '#00AEEF' 
          },
          { 
            name: 'VIDA DIBA', 
            data: [casXRamoData.VIDA_DIBA.qPol202408, casXRamoData.VIDA_DIBA.qPol202508], 
            color: '#FF6B6B' 
          },
          { 
            name: 'ESCOLTA EJERCITO', 
            data: [casXRamoData.ESCOLTA_EJERCITO.qPol202408, casXRamoData.ESCOLTA_EJERCITO.qPol202508], 
            color: '#4ECDC4' 
          },
          { 
            name: 'BOLSO PROTEGIDO', 
            data: [casXRamoData.BOLSO_PROTEGIDO.qPol202408, casXRamoData.BOLSO_PROTEGIDO.qPol202508], 
            color: '#45B7D1' 
          },
          { 
            name: 'SALDO DEUDOR', 
            data: [casXRamoData.SALDO_DEUDOR.qPol202408, casXRamoData.SALDO_DEUDOR.qPol202508], 
            color: '#96CEB4' 
          },
          { 
            name: 'ESCOLTA', 
            data: [casXRamoData.ESCOLTA.qPol202408, casXRamoData.ESCOLTA.qPol202508], 
            color: '#FFEAA7' 
          },
          { 
            name: 'AP', 
            data: [casXRamoData.AP.qPol202408, casXRamoData.AP.qPol202508], 
            color: '#DDA0DD' 
          },
          { 
            name: 'SEPELIO INDIVIDUAL', 
            data: [casXRamoData.SEPELIO_INDIVIDUAL.qPol202408, casXRamoData.SEPELIO_INDIVIDUAL.qPol202508], 
            color: '#98D8C8' 
          },
        ],
        credits: { enabled: false },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'TOTAL X RAMO') {
      return {
        chart: { type: 'line', height: 400 },
        xAxis: {
          categories: ['202408', '202508'],
          title: { text: 'Período' },
        },
        yAxis: {
          title: { text: 'Q PÓL (Cantidad)' },
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
            name: 'VIDA COLECTIVO', 
            data: [totalXRamoData.VIDA_COLECTIVO.qPol202408, totalXRamoData.VIDA_COLECTIVO.qPol202508], 
            color: '#003871' 
          },
          { 
            name: 'VIDA INDIVIDUAL CON AHORRO', 
            data: [totalXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.qPol202408, totalXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.qPol202508], 
            color: '#007DC5' 
          },
          { 
            name: 'SEPELIO COLECTIVO', 
            data: [totalXRamoData.SEPELIO_COLECTIVO.qPol202408, totalXRamoData.SEPELIO_COLECTIVO.qPol202508], 
            color: '#00AEEF' 
          },
          { 
            name: 'VIDA DIBA', 
            data: [totalXRamoData.VIDA_DIBA.qPol202408, totalXRamoData.VIDA_DIBA.qPol202508], 
            color: '#FF6B6B' 
          },
          { 
            name: 'ESCOLTA EJERCITO', 
            data: [totalXRamoData.ESCOLTA_EJERCITO.qPol202408, totalXRamoData.ESCOLTA_EJERCITO.qPol202508], 
            color: '#4ECDC4' 
          },
          { 
            name: 'BOLSO PROTEGIDO', 
            data: [totalXRamoData.BOLSO_PROTEGIDO.qPol202408, totalXRamoData.BOLSO_PROTEGIDO.qPol202508], 
            color: '#45B7D1' 
          },
          { 
            name: 'SALDO DEUDOR', 
            data: [totalXRamoData.SALDO_DEUDOR.qPol202408, totalXRamoData.SALDO_DEUDOR.qPol202508], 
            color: '#96CEB4' 
          },
          { 
            name: 'ESCOLTA', 
            data: [totalXRamoData.ESCOLTA.qPol202408, totalXRamoData.ESCOLTA.qPol202508], 
            color: '#FFEAA7' 
          },
          { 
            name: 'AP', 
            data: [totalXRamoData.AP.qPol202408, totalXRamoData.AP.qPol202508], 
            color: '#DDA0DD' 
          },
          { 
            name: 'SEPELIO INDIVIDUAL', 
            data: [totalXRamoData.SEPELIO_INDIVIDUAL.qPol202408, totalXRamoData.SEPELIO_INDIVIDUAL.qPol202508], 
            color: '#98D8C8' 
          },
        ],
        credits: { enabled: false },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'ASSA X CANAL') {
      return {
        chart: { type: 'line', height: 320 },
        xAxis: {
          categories: ['202408', '202508'],
          title: { text: 'Período' },
        },
        yAxis: {
          title: { text: 'Q PÓL (Cantidad)' },
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
            name: 'CANAL PAS', 
            data: [assaXCanalData.CANAL_PAS.qPol202408, assaXCanalData.CANAL_PAS.qPol202508], 
            color: '#003871' 
          },
          { 
            name: 'CANAL FILIALES', 
            data: [assaXCanalData.CANAL_FILIALES.qPol202408, assaXCanalData.CANAL_FILIALES.qPol202508], 
            color: '#007DC5' 
          },
          { 
            name: 'CANAL DIRECTO', 
            data: [assaXCanalData.CANAL_DIRECTO.qPol202408, assaXCanalData.CANAL_DIRECTO.qPol202508], 
            color: '#00AEEF' 
          },
        ],
        credits: { enabled: false },
      };
    }

    if (tipoVista === 'ASSA X RAMO') {
      return {
        chart: { type: 'line', height: 400 },
        xAxis: {
          categories: ['202408', '202508'],
          title: { text: 'Período' },
        },
        yAxis: {
          title: { text: 'Q PÓL (Cantidad)' },
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
            name: 'AUTOMOTORES', 
            data: [assaXRamoData.AUTOMOTORES.qPol202408, assaXRamoData.AUTOMOTORES.qPol202508], 
            color: '#003871' 
          },
          { 
            name: 'COMBINADO FAMILIAR', 
            data: [assaXRamoData.COMBINADO_FAMILIAR.qPol202408, assaXRamoData.COMBINADO_FAMILIAR.qPol202508], 
            color: '#007DC5' 
          },
          { 
            name: 'SALUD', 
            data: [assaXRamoData.SALUD.qPol202408, assaXRamoData.SALUD.qPol202508], 
            color: '#00AEEF' 
          },
          { 
            name: 'AP', 
            data: [assaXRamoData.AP.qPol202408, assaXRamoData.AP.qPol202508], 
            color: '#FF6B6B' 
          },
          { 
            name: 'MOTOS', 
            data: [assaXRamoData.MOTOS.qPol202408, assaXRamoData.MOTOS.qPol202508], 
            color: '#4ECDC4' 
          },
          { 
            name: 'PRAXIS', 
            data: [assaXRamoData.PRAXIS.qPol202408, assaXRamoData.PRAXIS.qPol202508], 
            color: '#45B7D1' 
          },
          { 
            name: 'RC', 
            data: [assaXRamoData.RC.qPol202408, assaXRamoData.RC.qPol202508], 
            color: '#96CEB4' 
          },
          { 
            name: 'CAUCIÓN', 
            data: [assaXRamoData.CAUCION.qPol202408, assaXRamoData.CAUCION.qPol202508], 
            color: '#FFEAA7' 
          },
          { 
            name: 'VIDA OBLIGATORIO', 
            data: [assaXRamoData.VIDA_OBLIGATORIO.qPol202408, assaXRamoData.VIDA_OBLIGATORIO.qPol202508], 
            color: '#DDA0DD' 
          },
          { 
            name: 'INCENDIO', 
            data: [assaXRamoData.INCENDIO.qPol202408, assaXRamoData.INCENDIO.qPol202508], 
            color: '#98D8C8' 
          },
        ],
        credits: { enabled: false },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'ASSA X CÍA') {
      return {
        chart: { type: 'line', height: 400 },
        xAxis: {
          categories: ['202408', '202508'],
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
            name: 'SMG', 
            data: [assaXCiaData.SMG.r12202408, assaXCiaData.SMG.r12202508], 
            color: '#003871' 
          },
          { 
            name: 'LMA', 
            data: [assaXCiaData.LMA.r12202408, assaXCiaData.LMA.r12202508], 
            color: '#007DC5' 
          },
          { 
            name: 'SANCOR', 
            data: [assaXCiaData.SANCOR.r12202408, assaXCiaData.SANCOR.r12202508], 
            color: '#00AEEF' 
          },
          { 
            name: 'ALLIANZ', 
            data: [assaXCiaData.ALLIANZ.r12202408, assaXCiaData.ALLIANZ.r12202508], 
            color: '#FF6B6B' 
          },
          { 
            name: 'INTEGRITY', 
            data: [assaXCiaData.INTEGRITY.r12202408, assaXCiaData.INTEGRITY.r12202508], 
            color: '#4ECDC4' 
          },
          { 
            name: 'FED PAT', 
            data: [assaXCiaData.FED_PAT.r12202408, assaXCiaData.FED_PAT.r12202508], 
            color: '#45B7D1' 
          },
          { 
            name: 'SMG LIFE', 
            data: [assaXCiaData.SMG_LIFE.r12202408, assaXCiaData.SMG_LIFE.r12202508], 
            color: '#96CEB4' 
          },
          { 
            name: 'SAN CRISTOBAL', 
            data: [assaXCiaData.SAN_CRISTOBAL.r12202408, assaXCiaData.SAN_CRISTOBAL.r12202508], 
            color: '#FFEAA7' 
          },
          { 
            name: 'VICTORIA', 
            data: [assaXCiaData.VICTORIA.r12202408, assaXCiaData.VICTORIA.r12202508], 
            color: '#DDA0DD' 
          },
          { 
            name: 'ATM', 
            data: [assaXCiaData.ATM.r12202408, assaXCiaData.ATM.r12202508], 
            color: '#98D8C8' 
          },
        ],
        credits: { enabled: false },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'ART X CANAL') {
      return {
        chart: { type: 'line', height: 400 },
        xAxis: {
          categories: ['202408', '202508'],
          title: { text: 'Período' },
        },
        yAxis: {
          title: { text: 'Q PÓL (Cantidad)' },
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
            name: 'CANAL PAS', 
            data: [artXCanalData.CANAL_PAS.qPol202408, artXCanalData.CANAL_PAS.qPol202508], 
            color: '#003871' 
          },
          { 
            name: 'CANAL FILIALES', 
            data: [artXCanalData.CANAL_FILIALES.qPol202408, artXCanalData.CANAL_FILIALES.qPol202508], 
            color: '#007DC5' 
          },
          { 
            name: 'CANAL DIRECTO', 
            data: [artXCanalData.CANAL_DIRECTO.qPol202408, artXCanalData.CANAL_DIRECTO.qPol202508], 
            color: '#00AEEF' 
          },
        ],
        credits: { enabled: false },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

    if (tipoVista === 'ART X CÍA') {
      return {
        chart: { type: 'line', height: 400 },
        xAxis: {
          categories: ['202408', '202508'],
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
            name: 'PREVENCIÓN ART', 
            data: [artXCiaData.PREVENCION_ART.r12202408, artXCiaData.PREVENCION_ART.r12202508], 
            color: '#003871' 
          },
          { 
            name: 'ASOCIART ART', 
            data: [artXCiaData.ASOCIART_ART.r12202408, artXCiaData.ASOCIART_ART.r12202508], 
            color: '#007DC5' 
          },
          { 
            name: 'PROVINCIA ART', 
            data: [artXCiaData.PROVINCIA_ART.r12202408, artXCiaData.PROVINCIA_ART.r12202508], 
            color: '#00AEEF' 
          },
          { 
            name: 'SMG ART', 
            data: [artXCiaData.SMG_ART.r12202408, artXCiaData.SMG_ART.r12202508], 
            color: '#FF6B6B' 
          },
          { 
            name: 'ANDINA ART', 
            data: [artXCiaData.ANDINA_ART.r12202408, artXCiaData.ANDINA_ART.r12202508], 
            color: '#4ECDC4' 
          },
          { 
            name: 'FED PAT', 
            data: [artXCiaData.FED_PAT.r12202408, artXCiaData.FED_PAT.r12202508], 
            color: '#45B7D1' 
          },
          { 
            name: 'EXPERTA ART', 
            data: [artXCiaData.EXPERTA_ART.r12202408, artXCiaData.EXPERTA_ART.r12202508], 
            color: '#96CEB4' 
          },
          { 
            name: 'LA HOLANDO ART', 
            data: [artXCiaData.LA_HOLANDO_ART.r12202408, artXCiaData.LA_HOLANDO_ART.r12202508], 
            color: '#FFEAA7' 
          },
          { 
            name: 'GALENO ART', 
            data: [artXCiaData.GALENO_ART.r12202408, artXCiaData.GALENO_ART.r12202508], 
            color: '#DDA0DD' 
          },
          { 
            name: 'OMINT ART', 
            data: [artXCiaData.OMINT_ART.r12202408, artXCiaData.OMINT_ART.r12202508], 
            color: '#98D8C8' 
          },
        ],
        credits: { enabled: false },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          itemStyle: {
            fontSize: '10px'
          }
        },
      };
    }

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
  }, [indicadoresData, filterApplied, selectedMonth1, selectedYear1, selectedMonth2, selectedYear2, tipoVista, totalXCiaData, totalXCanalData, totalXRamoData, casXCanalData, casXRamoData, assaXCanalData, assaXRamoData, assaXCiaData, artXCanalData, artXCiaData]);

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Evolución de Cartera</h1>
          <p className="text-gray-600 mt-2">Visualice la Evolución de Cartera</p>
        </div>

        {/* Bloque de filtro */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtro</h3>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Fecha Inicio */}
            <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-md font-medium text-blue-800 mb-3">Fecha Inicio</h4>
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
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                  <select 
                    value={"08"}
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

            {/* Fecha Fin */}
            <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-md font-medium text-green-800 mb-3">Fecha Fin</h4>
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
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                  <select 
                    value={"08"}
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

          {/* Tipo de Vista */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vista</label>
            <select 
              value={tipoVista}
              onChange={(e) => setTipoVista(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <optgroup label="Vistas Generales">
                <option value="TOTAL X CÍA">TOTAL X CÍA</option>
                <option value="TOTAL X CANAL">TOTAL X CANAL</option>
                <option value="TOTAL X RAMO">TOTAL X RAMO</option>
              </optgroup>
              <optgroup label="Vistas CAS">
                <option value="CAS X CANAL">CAS X CANAL</option>
                <option value="CAS X RAMO">CAS X RAMO</option>
              </optgroup>
              <optgroup label="Vistas ASSA">
                <option value="ASSA X CANAL">ASSA X CANAL</option>
                <option value="ASSA X RAMO">ASSA X RAMO</option>
                <option value="ASSA X CÍA">ASSA X CÍA</option>
              </optgroup>
              <optgroup label="Vistas ART">
                <option value="ART X CANAL">ART X CANAL</option>
                <option value="ART X CÍA">ART X CÍA</option>
              </optgroup>
            </select>
        </div>

          {/* Botón Aplicar Filtros */}
          <div className="flex justify-end hidden">
              <button
              onClick={() => setFilterApplied(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md flex items-center gap-2"
              >
              <i className="fa-solid fa-check text-white"></i>
              Aplicar Filtros
              </button>
            </div>
        </div>

        {/* Tabla TOTAL X CÍA */}
        {tipoVista === 'TOTAL X CÍA' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black">  </th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">COMPAÑÍA</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">27,899</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,669</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,230</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-4.41%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 11,820,721,857</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 23,386,730,812</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 11,566,008,954</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">97.85%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ASSA</td>
                    <td className="px-4 py-2 text-center text-gray-900">75,455</td>
                    <td className="px-4 py-2 text-center text-gray-900">73,631</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,824</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-2.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 13,250,722,758</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 28,410,171,357</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 15,159,448,599</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">114.40%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900  border-r-2 border-black">ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,244</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,345</td>
                    <td className="px-4 py-2 text-center text-gray-900">101</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">3.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 7,550,273,010</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 12,369,878,053</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,819,605,043</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">63.83%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">106,598</td>
                    <td className="px-4 py-2 text-center">103,645</td>
                    <td className="px-4 py-2 text-center">-2,953</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">-2.77%</td>
                    <td className="px-4 py-2 text-center">$ 32,621,717,625</td>
                    <td className="px-4 py-2 text-center">$ 64,166,780,222</td>
                    <td className="px-4 py-2 text-center">$ 31,545,062,596</td>
                    <td className="px-4 py-2 text-center">96.70%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla TOTAL X CANAL */}
        {tipoVista === 'TOTAL X CANAL' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black">  </th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL DIRECTO</td>
                    <td className="px-4 py-2 text-center text-gray-900">44,658</td>
                    <td className="px-4 py-2 text-center text-gray-900">43,034</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,624</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-3.64%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 10,420,688,521</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 18,119,038,113</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 7,698,349,592</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">73.88%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL FILIALES</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,437</td>
                    <td className="px-4 py-2 text-center text-gray-900">27,934</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,503</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-5.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,998,522,395</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 11,602,251,313</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,603,728,918</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">132.11%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL PAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,503</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,677</td>
                    <td className="px-4 py-2 text-center text-gray-900">174</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.54%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 17,202,506,710</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 34,445,490,795</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 17,242,984,085</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">100.24%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">106,598</td>
                    <td className="px-4 py-2 text-center">103,645</td>
                    <td className="px-4 py-2 text-center">-2,953</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">-2.77%</td>
                    <td className="px-4 py-2 text-center">$ 32,621,717,625</td>
                    <td className="px-4 py-2 text-center">$ 64,166,780,222</td>
                    <td className="px-4 py-2 text-center">$ 31,545,062,596</td>
                    <td className="px-4 py-2 text-center">96.70%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla CAS X CANAL */}
        {tipoVista === 'CAS X CANAL' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black"> </th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL DIRECTO</td>
                    <td className="px-4 py-2 text-center text-gray-900">20,735</td>
                    <td className="px-4 py-2 text-center text-gray-900">20,264</td>
                    <td className="px-4 py-2 text-center text-gray-900">-471</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-2.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,888,439,319</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 14,583,997,615</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 7,695,558,296</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">111.72%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL FILIALES</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,108</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,221</td>
                    <td className="px-4 py-2 text-center text-gray-900">-887</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-14.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 189,013,200</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 480,754,899</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 291,741,700</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">154.35%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL PAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,056</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,184</td>
                    <td className="px-4 py-2 text-center text-gray-900">128</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">12.12%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,743,269,339</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,321,978,298</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,578,708,959</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">75.45%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">27,899</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-1,230</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">-4.41%</td>
                    <td className="px-4 py-2 text-center">$ 11,820,721,857</td>
                    <td className="px-4 py-2 text-center">$ 23,386,730,812</td>
                    <td className="px-4 py-2 text-center">$ 11,566,008,954</td>
                    <td className="px-4 py-2 text-center">97.85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla TOTAL X RAMO */}
        {tipoVista === 'TOTAL X RAMO' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black"></th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">RAMO</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,943</td>
                    <td className="px-4 py-2 text-center text-gray-900">387</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,556</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-80.08%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 100,846,660</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 123,478,870</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 22,632,210</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">22.44%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP BOLSO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,176</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,994</td>
                    <td className="px-4 py-2 text-center text-gray-900">-182</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-4.36%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,818,065</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,684,762</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,866,697</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">127.47%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ARMAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">185</td>
                    <td className="px-4 py-2 text-center text-gray-900">176</td>
                    <td className="px-4 py-2 text-center text-gray-900">-9</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-4.86%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,696,933</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 9,083,123</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,386,190</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">236.79%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">BOLSO PROTEGIDO</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,020</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,947</td>
                    <td className="px-4 py-2 text-center text-gray-900">-73</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-1.45%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 143,612,108</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 323,744,516</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 180,132,407</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">125.43%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ESCOLTA</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,169</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,589</td>
                    <td className="px-4 py-2 text-center text-gray-900">420</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">19.36%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 47,472,437</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 174,251,101</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 126,778,664</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">267.06%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ESCOLTA EJERCITO</td>
                    <td className="px-4 py-2 text-center text-gray-900">65</td>
                    <td className="px-4 py-2 text-center text-gray-900">69</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">6.15%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 203,896,881</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 445,644,686</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 241,747,805</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">118.56%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ROBO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 19,811,883</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 37,669,275</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 17,857,392</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.13%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SALDO DEUDOR</td>
                    <td className="px-4 py-2 text-center text-gray-900">12</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-8.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 699,713,484</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 659,929,483</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -39,784,001</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-5.69%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SDJM</td>
                    <td className="px-4 py-2 text-center text-gray-900">89</td>
                    <td className="px-4 py-2 text-center text-gray-900">145</td>
                    <td className="px-4 py-2 text-center text-gray-900">56</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">62.92%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 51,462,909</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 142,087,469</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 90,624,560</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">176.10%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">96</td>
                    <td className="px-4 py-2 text-center text-gray-900">103</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">7.29%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,400,123,114</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,695,908,050</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,295,784,936</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">95.65%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,405</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,535</td>
                    <td className="px-4 py-2 text-center text-gray-900">130</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">9.25%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,165,609</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 25,540,731</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 19,375,122</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">314.25%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">237</td>
                    <td className="px-4 py-2 text-center text-gray-900">234</td>
                    <td className="px-4 py-2 text-center text-gray-900">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-1.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,827,939,045</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 9,160,455,325</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,332,516,280</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.74%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO CON AHORRO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 43,952,280</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 128,390,512</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 84,438,232</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">192.11%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA DIBA</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,586,517,281</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,553,967,309</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,967,450,028</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">124.01%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">33</td>
                    <td className="px-4 py-2 text-center text-gray-900">33</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,477</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,481</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.09%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL CON AHORRO</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,133</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,047</td>
                    <td className="px-4 py-2 text-center text-gray-900">-86</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-0.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,673,993,351</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,878,282,244</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,204,288,893</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">131.68%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA OBLIGATORIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">327</td>
                    <td className="px-4 py-2 text-center text-gray-900">390</td>
                    <td className="px-4 py-2 text-center text-gray-900">63</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">19.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,695,340</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 19,608,876</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 10,913,535</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">125.51%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">27,899</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-1,230</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">-4.41%</td>
                    <td className="px-4 py-2 text-center">$ 11,820,721,857</td>
                    <td className="px-4 py-2 text-center">$ 23,386,730,812</td>
                    <td className="px-4 py-2 text-center">$ 11,566,008,954</td>
                    <td className="px-4 py-2 text-center">97.85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla CAS X RAMO */}
        {tipoVista === 'CAS X RAMO' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black"></th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">RAMO</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,943</td>
                    <td className="px-4 py-2 text-center text-gray-900">387</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,556</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-80.08%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 100,846,660</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 123,478,870</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 22,632,210</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">22.44%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP BOLSO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,176</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,994</td>
                    <td className="px-4 py-2 text-center text-gray-900">-182</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-4.36%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,818,065</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,684,762</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,866,697</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">127.47%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ARMAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">185</td>
                    <td className="px-4 py-2 text-center text-gray-900">176</td>
                    <td className="px-4 py-2 text-center text-gray-900">-9</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-4.86%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,696,933</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 9,083,123</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,386,190</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">236.79%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">BOLSO PROTEGIDO</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,020</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,947</td>
                    <td className="px-4 py-2 text-center text-gray-900">-73</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-1.45%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 143,612,108</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 323,744,516</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 180,132,407</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">125.43%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ESCOLTA</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,169</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,589</td>
                    <td className="px-4 py-2 text-center text-gray-900">420</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">19.36%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 47,472,437</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 174,251,101</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 126,778,664</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">267.06%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ESCOLTA EJERCITO</td>
                    <td className="px-4 py-2 text-center text-gray-900">65</td>
                    <td className="px-4 py-2 text-center text-gray-900">69</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">6.15%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 203,896,881</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 445,644,686</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 241,747,805</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">118.56%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ROBO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 19,811,883</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 37,669,275</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 17,857,392</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.13%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SALDO DEUDOR</td>
                    <td className="px-4 py-2 text-center text-gray-900">12</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-8.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 699,713,484</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 659,929,483</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -39,784,001</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-5.69%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SDJM</td>
                    <td className="px-4 py-2 text-center text-gray-900">89</td>
                    <td className="px-4 py-2 text-center text-gray-900">145</td>
                    <td className="px-4 py-2 text-center text-gray-900">56</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">62.92%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 51,462,909</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 142,087,469</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 90,624,560</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">176.10%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">96</td>
                    <td className="px-4 py-2 text-center text-gray-900">103</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">7.29%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,400,123,114</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,695,908,050</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,295,784,936</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">95.65%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,405</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,535</td>
                    <td className="px-4 py-2 text-center text-gray-900">130</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">9.25%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,165,609</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 25,540,731</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 19,375,122</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">314.25%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">237</td>
                    <td className="px-4 py-2 text-center text-gray-900">234</td>
                    <td className="px-4 py-2 text-center text-gray-900">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-1.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,827,939,045</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 9,160,455,325</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,332,516,280</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.74%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO CON AHORRO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 43,952,280</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 128,390,512</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 84,438,232</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">192.11%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA DIBA</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,586,517,281</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,553,967,309</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,967,450,028</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">124.01%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">33</td>
                    <td className="px-4 py-2 text-center text-gray-900">33</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,477</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,481</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.09%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL CON AHORRO</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,133</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,047</td>
                    <td className="px-4 py-2 text-center text-gray-900">-86</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-0.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,673,993,351</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,878,282,244</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,204,288,893</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">131.68%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA OBLIGATORIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">327</td>
                    <td className="px-4 py-2 text-center text-gray-900">390</td>
                    <td className="px-4 py-2 text-center text-gray-900">63</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">19.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,695,340</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 19,608,876</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 10,913,535</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">125.51%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">27,899</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-1,230</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">-4.41%</td>
                    <td className="px-4 py-2 text-center">$ 11,820,721,857</td>
                    <td className="px-4 py-2 text-center">$ 23,386,730,812</td>
                    <td className="px-4 py-2 text-center">$ 11,566,008,954</td>
                    <td className="px-4 py-2 text-center">97.85%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla ASSA X CANAL */}
        {tipoVista === 'ASSA X CANAL' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black"></th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">CANAL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL DIRECTO</td>
                    <td className="px-4 py-2 text-center text-gray-900">23,806</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,607</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,199</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-5.04%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,240,959,553</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,431,509,543</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,190,549,990</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">53.13%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL FILIALES</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,313</td>
                    <td className="px-4 py-2 text-center text-gray-900">21,709</td>
                    <td className="px-4 py-2 text-center text-gray-900">-604</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-2.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,193,230,281</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 9,421,091,618</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,227,861,338</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">124.67%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL PAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,336</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,315</td>
                    <td className="px-4 py-2 text-center text-gray-900">-21</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-0.07%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,816,532,925</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 15,557,570,196</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,741,037,271</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">128.23%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">75,455</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-1,824</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">-2.42%</td>
                    <td className="px-4 py-2 text-center">$ 13,250,722,758</td>
                    <td className="px-4 py-2 text-center">$ 28,410,171,357</td>
                    <td className="px-4 py-2 text-center">$ 15,159,448,599</td>
                    <td className="px-4 py-2 text-center">114.40%</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
        )}

        {/* Tabla ASSA X RAMO */}
        {tipoVista === 'ASSA X RAMO' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>                    
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black"></th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">RAMO</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AERONAVEGACIÓN</td>
                    <td className="px-4 py-2 text-center text-gray-900">5</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center text-gray-900">2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">40.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,135,009</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 26,056,851</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 20,921,842</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">407.44%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,847</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,893</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,954</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-19.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 139,061,759</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 397,825,842</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 258,764,083</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">186.08%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AUTOMOTORES</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,185</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,872</td>
                    <td className="px-4 py-2 text-center text-gray-900">-313</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-1.20%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 10,545,921,731</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 22,109,067,730</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 11,563,145,999</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">109.65%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CASCOS</td>
                    <td className="px-4 py-2 text-center text-gray-900">85</td>
                    <td className="px-4 py-2 text-center text-gray-900">100</td>
                    <td className="px-4 py-2 text-center text-gray-900">15</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">17.65%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 9,037,238</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 22,205,827</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 13,168,588</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">145.71%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CAUCIÓN</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,255</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,415</td>
                    <td className="px-4 py-2 text-center text-gray-900">160</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">12.75%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 178,505,745</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 247,867,241</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 69,361,495</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">38.86%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">COMBINADO FAMILIAR</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,553</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,150</td>
                    <td className="px-4 py-2 text-center text-gray-900">-403</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-2.77%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 673,695,571</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,969,642,521</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,295,946,951</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">192.36%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">INCENDIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">986</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,098</td>
                    <td className="px-4 py-2 text-center text-gray-900">112</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">11.36%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 215,310,802</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 360,437,744</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 145,126,942</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">67.40%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">INT. COMERCIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,070</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,088</td>
                    <td className="px-4 py-2 text-center text-gray-900">18</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">1.68%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 170,584,891</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 503,965,600</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 333,380,709</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">195.43%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">INT. CONSORCIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">348</td>
                    <td className="px-4 py-2 text-center text-gray-900">358</td>
                    <td className="px-4 py-2 text-center text-gray-900">10</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">2.87%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 54,835,550</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 216,621,078</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 161,785,528</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">295.04%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">MOTOS</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,873</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,779</td>
                    <td className="px-4 py-2 text-center text-gray-900">-94</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-3.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 257,920,015</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 773,443,504</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 515,523,489</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">199.88%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">PRAXIS</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,601</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,885</td>
                    <td className="px-4 py-2 text-center text-gray-900">284</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">17.74%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 79,593,636</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 325,809,180</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 246,215,544</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">309.34%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">RC</td>
                    <td className="px-4 py-2 text-center text-gray-900">916</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,081</td>
                    <td className="px-4 py-2 text-center text-gray-900">165</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">18.01%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 163,271,810</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 314,655,120</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 151,383,310</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">92.72%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ROBO</td>
                    <td className="px-4 py-2 text-center text-gray-900">267</td>
                    <td className="px-4 py-2 text-center text-gray-900">252</td>
                    <td className="px-4 py-2 text-center text-gray-900">-15</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-5.62%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 32,854,975</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 119,425,509</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 86,570,535</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">263.49%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">RS. VS.</td>
                    <td className="px-4 py-2 text-center text-gray-900">168</td>
                    <td className="px-4 py-2 text-center text-gray-900">287</td>
                    <td className="px-4 py-2 text-center text-gray-900">119</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">70.83%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,768,893</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 24,540,489</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 18,771,596</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">325.39%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SALUD</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,588</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,468</td>
                    <td className="px-4 py-2 text-center text-gray-900">-120</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-0.88%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 372,266,042</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 533,492,024</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 161,225,982</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">43.31%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEGURO TÉCNICO</td>
                    <td className="px-4 py-2 text-center text-gray-900">157</td>
                    <td className="px-4 py-2 text-center text-gray-900">132</td>
                    <td className="px-4 py-2 text-center text-gray-900">-25</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-15.92%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 133,314,698</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 108,466,196</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -24,848,501</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-18.64%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">6</td>
                    <td className="px-4 py-2 text-center text-gray-900">6</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 7,984,249</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 35,183,978</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 27,199,729</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">340.67%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">TRANSPORTES</td>
                    <td className="px-4 py-2 text-center text-gray-900">27</td>
                    <td className="px-4 py-2 text-center text-gray-900">22</td>
                    <td className="px-4 py-2 text-center text-gray-900">-5</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-18.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 25,790,732</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 51,966,462</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 26,175,730</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">101.49%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">209</td>
                    <td className="px-4 py-2 text-center text-gray-900">205</td>
                    <td className="px-4 py-2 text-center text-gray-900">-4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-1.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 143,319,269</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 151,592,394</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,273,126</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5.77%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">272</td>
                    <td className="px-4 py-2 text-center text-gray-900">394</td>
                    <td className="px-4 py-2 text-center text-gray-900">122</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">44.85%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 31,998,834</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 54,756,960</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 22,758,126</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">71.12%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA OBLIGATORIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,037</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,138</td>
                    <td className="px-4 py-2 text-center text-gray-900">101</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">9.74%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,551,311</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 15,382,732</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 10,831,421</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">237.98%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">75,455</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-1,824</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">-2.42%</td>
                    <td className="px-4 py-2 text-center">$ 13,250,722,758</td>
                    <td className="px-4 py-2 text-center">$ 28,410,171,357</td>
                    <td className="px-4 py-2 text-center">$ 15,159,448,599</td>
                    <td className="px-4 py-2 text-center">114.40%</td>
                  </tr>
                </tbody>
              </table>
        </div>
          </div>
        )}

        {/* Tabla ASSA X CÍA */}
        {tipoVista === 'ASSA X CÍA' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black"> </th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">CÍA</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AFIANZADORA</td>
                    <td className="px-4 py-2 text-center text-gray-900">121</td>
                    <td className="px-4 py-2 text-center text-gray-900">213</td>
                    <td className="px-4 py-2 text-center text-gray-900">92</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">76.03%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 23,275,510</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 30,786,112</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 7,510,602</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">32.27%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ALLIANZ</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,564</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,325</td>
                    <td className="px-4 py-2 text-center text-gray-900">761</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">48.66%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 313,484,478</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,041,865,659</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 728,381,180</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">232.35%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ATM</td>
                    <td className="px-4 py-2 text-center text-gray-900">513</td>
                    <td className="px-4 py-2 text-center text-gray-900">716</td>
                    <td className="px-4 py-2 text-center text-gray-900">203</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">39.57%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 46,181,438</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 138,493,339</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 92,311,901</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">199.89%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">BOSTON</td>
                    <td className="px-4 py-2 text-center text-gray-900">18</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">-17</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-94.44%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,952,959</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 74,379</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -8,878,580</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-99.17%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CAUCIONES</td>
                    <td className="px-4 py-2 text-center text-gray-900">19</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">-6</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-31.58%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,344,606</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,390,887</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -3,953,720</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-73.98%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CHUBB</td>
                    <td className="px-4 py-2 text-center text-gray-900">96</td>
                    <td className="px-4 py-2 text-center text-gray-900">15</td>
                    <td className="px-4 py-2 text-center text-gray-900">-81</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-84.38%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 15,861,757</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 18,972,684</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,110,927</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">19.61%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">FED PAT</td>
                    <td className="px-4 py-2 text-center text-gray-900">791</td>
                    <td className="px-4 py-2 text-center text-gray-900">959</td>
                    <td className="px-4 py-2 text-center text-gray-900">168</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">21.24%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 305,661,335</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 531,237,711</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 225,576,376</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">73.80%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">HDI</td>
                    <td className="px-4 py-2 text-center text-gray-900">9</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center text-gray-900">-2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-22.22%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 734,095</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,321,757</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,587,663</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">216.27%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">INTEGRITY</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,533</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,619</td>
                    <td className="px-4 py-2 text-center text-gray-900">86</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">5.61%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 312,773,035</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 543,840,130</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 231,067,095</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">73.88%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">LA HOLANDO</td>
                    <td className="px-4 py-2 text-center text-gray-900">70</td>
                    <td className="px-4 py-2 text-center text-gray-900">62</td>
                    <td className="px-4 py-2 text-center text-gray-900">-8</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-11.43%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,838,282</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 15,875,658</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 9,037,376</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">132.16%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">LIBRA</td>
                    <td className="px-4 py-2 text-center text-gray-900">793</td>
                    <td className="px-4 py-2 text-center text-gray-900">490</td>
                    <td className="px-4 py-2 text-center text-gray-900">-303</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-38.21%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,769,511</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,769,511</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.00%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">LMA</td>
                    <td className="px-4 py-2 text-center text-gray-900">24,266</td>
                    <td className="px-4 py-2 text-center text-gray-900">23,454</td>
                    <td className="px-4 py-2 text-center text-gray-900">-812</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-3.35%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,366,394,962</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 9,590,435,724</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,224,040,762</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">184.89%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">NACIÓN</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-100.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 12,922</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -12,922</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-100.00%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">NOBLE</td>
                    <td className="px-4 py-2 text-center text-gray-900">12</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-8.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,352,831</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 13,304,418</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 6,951,587</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">109.43%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">PRUDENCIA</td>
                    <td className="px-4 py-2 text-center text-gray-900">265</td>
                    <td className="px-4 py-2 text-center text-gray-900">333</td>
                    <td className="px-4 py-2 text-center text-gray-900">68</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">25.66%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 46,599,032</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 129,736,655</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 83,137,623</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">178.41%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">RIVADAVIA</td>
                    <td className="px-4 py-2 text-center text-gray-900">10</td>
                    <td className="px-4 py-2 text-center text-gray-900">48</td>
                    <td className="px-4 py-2 text-center text-gray-900">38</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">380.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,596,687</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 22,280,185</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 19,683,498</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">758.02%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">RUS</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center text-gray-900">9</td>
                    <td className="px-4 py-2 text-center text-gray-900">-2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-18.18%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,497,250</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,311,881</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,814,631</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">121.20%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SANCOR</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,675</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,256</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,419</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-30.35%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 988,772,441</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,826,362,279</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,837,589,837</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">185.85%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SMG</td>
                    <td className="px-4 py-2 text-center text-gray-900">27,059</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,746</td>
                    <td className="px-4 py-2 text-center text-gray-900">-1,313</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-4.85%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 7,188,385,151</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 12,404,213,055</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,215,827,904</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">72.56%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SMG LIFE</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,379</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,295</td>
                    <td className="px-4 py-2 text-center text-gray-900">-84</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-0.63%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 528,038,385</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 684,862,351</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 156,823,967</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">29.70%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">TPC</td>
                    <td className="px-4 py-2 text-center text-gray-900">20</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center text-gray-900">-20</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-100.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 81,052</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 20,927</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -60,125</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-74.18%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VICTORIA</td>
                    <td className="px-4 py-2 text-center text-gray-900">46</td>
                    <td className="px-4 py-2 text-center text-gray-900">214</td>
                    <td className="px-4 py-2 text-center text-gray-900">168</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">365.22%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 7,172,892</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 55,348,609</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 48,175,717</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">671.64%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ZURICH</td>
                    <td className="px-4 py-2 text-center text-gray-900">8</td>
                    <td className="px-4 py-2 text-center text-gray-900">2</td>
                    <td className="px-4 py-2 text-center text-gray-900">-6</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-75.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,291,112</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 96,455</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -2,194,657</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-95.79%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">COSENA</td>
                    <td className="px-4 py-2 text-center text-gray-900">136</td>
                    <td className="px-4 py-2 text-center text-gray-900">218</td>
                    <td className="px-4 py-2 text-center text-gray-900">82</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">60.29%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 61,962,312</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 52,853,317</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -9,108,995</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-14.70%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SAN CRISTOBAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">40</td>
                    <td className="px-4 py-2 text-center text-gray-900">621</td>
                    <td className="px-4 py-2 text-center text-gray-900">581</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">1452.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,688,723</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 296,318,204</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 290,629,481</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5108.87%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">75,455</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-1,824</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">-2.42%</td>
                    <td className="px-4 py-2 text-center">$ 13,250,722,758</td>
                    <td className="px-4 py-2 text-center">$ 28,410,171,357</td>
                    <td className="px-4 py-2 text-center">$ 15,159,448,599</td>
                    <td className="px-4 py-2 text-center">114.40%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla ART X CANAL */}
        {tipoVista === 'ART X CANAL' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black"> </th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">Canal</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL DIRECTO</td>
                    <td className="px-4 py-2 text-center text-gray-900">117</td>
                    <td className="px-4 py-2 text-center text-gray-900">163</td>
                    <td className="px-4 py-2 text-center text-gray-900">46</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">39.32%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,291,289,649</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 103,530,955</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -1,187,758,694</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-91.98%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL FILIALES</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,016</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,004</td>
                    <td className="px-4 py-2 text-center text-gray-900">-12</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-1.18%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 616,278,915</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,700,404,796</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,084,125,881</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">175.91%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL PAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,111</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,178</td>
                    <td className="px-4 py-2 text-center text-gray-900">67</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">3.17%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,642,704,446</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 10,565,942,302</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 4,923,237,856</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">87.25%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">3,244</td>
                    <td className="px-4 py-2 text-center">3,345</td>
                    <td className="px-4 py-2 text-center">101</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">3.11%</td>
                    <td className="px-4 py-2 text-center">$ 7,550,273,010</td>
                    <td className="px-4 py-2 text-center">$ 12,369,878,053</td>
                    <td className="px-4 py-2 text-center">$ 4,819,605,043</td>
                    <td className="px-4 py-2 text-center">63.83%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tabla ART X CÍA */}
        {tipoVista === 'ART X CÍA' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white" style={{backgroundColor: '#003871'}}>
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black"> </th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black">C REAL 202508</th>
                    <th className="px-4 py-3 text-center font-bold">202408</th>
                    <th className="px-4 py-3 text-center font-bold">202508</th>
                    <th className="px-4 py-3 text-center font-bold">DIF</th>
                    <th className="px-4 py-3 text-center font-bold">C REAL 202508</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black">CÍA</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ANDINA ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">73</td>
                    <td className="px-4 py-2 text-center text-gray-900">244</td>
                    <td className="px-4 py-2 text-center text-gray-900">171</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">234.25%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 166,842,533</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,479,829,623</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,312,987,090</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">786.96%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ASOCIART ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">323</td>
                    <td className="px-4 py-2 text-center text-gray-900">361</td>
                    <td className="px-4 py-2 text-center text-gray-900">38</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">11.76%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,629,349,277</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,575,358,075</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 946,008,798</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">58.06%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">EXPERTA ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">28</td>
                    <td className="px-4 py-2 text-center text-gray-900">23</td>
                    <td className="px-4 py-2 text-center text-gray-900">-5</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-17.86%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 138,734,835</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 309,246,420</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 170,511,586</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">122.90%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">FED PAT</td>
                    <td className="px-4 py-2 text-center text-gray-900">132</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center text-gray-900">-26</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-19.70%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,349,559,046</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,069,467,626</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -1,280,091,420</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-54.48%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">GALENO ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">12</td>
                    <td className="px-4 py-2 text-center text-gray-900">8</td>
                    <td className="px-4 py-2 text-center text-gray-900">-4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-33.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 66,536,918</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 10,885,655</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -55,651,263</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-83.64%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">LA HOLANDO ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">8</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center text-gray-900">3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">37.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 21,561,415</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 248,271,635</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 226,710,220</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">1051.46%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">OMINT ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 5,009,147</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 8,405,747</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 3,396,600</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">67.81%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">PREVENCIÓN ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,579</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,590</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.70%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,215,706,171</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,745,633,959</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,529,927,788</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">125.85%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">PROVINCIA ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">534</td>
                    <td className="px-4 py-2 text-center text-gray-900">574</td>
                    <td className="px-4 py-2 text-center text-gray-900">-40</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-6.97%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,074,334,312</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 2,361,201,528</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,286,867,216</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">119.78%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SMG ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">511</td>
                    <td className="px-4 py-2 text-center text-gray-900">460</td>
                    <td className="px-4 py-2 text-center text-gray-900">-51</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">-9.98%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 882,639,356</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 1,546,534,132</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 663,894,776</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">75.22%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VICTORIA ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">100.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ -</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 15,043,652</td>
                    <td className="px-4 py-2 text-center text-gray-900">$ 15,043,652</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">100.00%</td>
                  </tr>
                  <tr className="text-white font-bold" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">3,244</td>
                    <td className="px-4 py-2 text-center">3,345</td>
                    <td className="px-4 py-2 text-center">101</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">3.11%</td>
                    <td className="px-4 py-2 text-center">$ 7,550,273,010</td>
                    <td className="px-4 py-2 text-center">$ 12,369,878,053</td>
                    <td className="px-4 py-2 text-center">$ 4,819,605,043</td>
                    <td className="px-4 py-2 text-center">63.83%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <hr className="my-8 border-gray-300" />

        {showAssaTable ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
              EVOLUCIÓN ASSA POR RIESGO
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
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
                      <td className="px-4 py-2 text-center text-gray-900">{(item.qPolizas1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center text-gray-900">{(item.qPolizas2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+{(item.crecimientoQPol || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+$ {(item.crecimientoR12 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center font-bold text-gray-900">+{(item.porcentajeQPol || 0).toFixed(1)}%</td>
                      <td className="px-4 py-2 text-center font-bold text-gray-900">+{(item.porcentajeR12 || 0).toFixed(1)}%</td>
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
              <table className="w-full text-xs">
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
                      <td className="px-4 py-2 text-center text-gray-900">{(item.qPolizas1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center text-gray-900">{(item.qPolizas2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+{(item.crecimientoQPol || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+$ {(item.crecimientoR12 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center font-bold text-gray-900">+{(item.porcentajeQPol || 0).toFixed(1)}%</td>
                      <td className="px-4 py-2 text-center font-bold text-gray-900">+{(item.porcentajeR12 || 0).toFixed(1)}%</td>
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
              <table className="w-full text-xs">
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
                      <td className="px-4 py-2 text-center text-gray-900">{(item.qPolizas1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_1 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center text-gray-900">{(item.qPolizas2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">$ {(item.r12_2 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+{(item.crecimientoQPol || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center">+$ {(item.crecimientoR12 || 0).toLocaleString('es-AR')}</td>
                      <td className="px-4 py-2 text-center font-bold text-gray-900">+{(item.porcentajeQPol || 0).toFixed(1)}%</td>
                      <td className="px-4 py-2 text-center font-bold text-gray-900">+{(item.porcentajeR12 || 0).toFixed(1)}%</td>
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
              <table className="w-full text-xs">
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
              <table className="w-full text-xs">
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
        ) : (tipoVista === 'TOTAL X CÍA' || tipoVista === 'TOTAL X CANAL' || tipoVista === 'TOTAL X RAMO' || tipoVista === 'CAS X CANAL' || tipoVista === 'CAS X RAMO' || tipoVista === 'ASSA X CANAL' || tipoVista === 'ASSA X RAMO' || tipoVista === 'ASSA X CÍA' || tipoVista === 'ART X CANAL' || tipoVista === 'ART X CÍA' || (!showAssaTable && !showFilialesTable && !showPasTable && !showCallCenterTable && !showFilialesPasTable)) ? (
          <>
            {/* Gráficos comparativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HighchartsChart
                id="comparativo-r12"
                type="column"
                title={
                  tipoVista === 'TOTAL X CÍA' ? 'Comparativa R12 - 202408 vs 202508' :
                  tipoVista === 'TOTAL X CANAL' ? 'Comparativa R12 por Canal - 202408 vs 202508' :
                  tipoVista === 'TOTAL X RAMO' ? 'Comparativa R12 por Ramo - 202408 vs 202508' :
                  tipoVista === 'CAS X CANAL' ? 'Comparativa R12 CAS por Canal - 202408 vs 202508' :
                  tipoVista === 'CAS X RAMO' ? 'Comparativa R12 CAS por Ramo - 202408 vs 202508' :
                  tipoVista === 'ASSA X CANAL' ? 'Comparativa R12 ASSA por Canal - 202408 vs 202508' :
                  tipoVista === 'ASSA X RAMO' ? 'Comparativa R12 ASSA por Ramo - 202408 vs 202508' :
                  tipoVista === 'ASSA X CÍA' ? 'Comparativa R12 ASSA por Compañía - 202408 vs 202508' :
                  tipoVista === 'ART X CANAL' ? 'Comparativa R12 ART por Canal - 202408 vs 202508' :
                  tipoVista === 'ART X CÍA' ? 'Comparativa R12 ART por Compañía - 202408 vs 202508' :
                  `Comparativa R12 - ${periodLabels.period1} vs ${periodLabels.period2}`
                }
                data={r12ChartData}
              />
              <HighchartsChart
                id="torta-q-pol"
                type="pie"
                title={
                  tipoVista === 'TOTAL X CÍA' ? 'Distribución Q PÓL 202508' :
                  tipoVista === 'TOTAL X CANAL' ? 'Distribución Q PÓL por Canal 202508' :
                  tipoVista === 'TOTAL X RAMO' ? 'Distribución Q PÓL por Ramo 202508' :
                  tipoVista === 'CAS X CANAL' ? 'Distribución Q PÓL CAS por Canal 202508' :
                  tipoVista === 'CAS X RAMO' ? 'Distribución Q PÓL CAS por Ramo 202508' :
                  tipoVista === 'ASSA X CANAL' ? 'Distribución Q PÓL ASSA por Canal 202508' :
                  tipoVista === 'ASSA X RAMO' ? 'Distribución Q PÓL ASSA por Ramo 202508' :
                  tipoVista === 'ASSA X CÍA' ? 'Distribución Q PÓL ASSA por Compañía 202508' :
                  tipoVista === 'ART X CANAL' ? 'Distribución Q PÓL ART por Canal 202508' :
                  tipoVista === 'ART X CÍA' ? 'Distribución Q PÓL ART por Compañía 202508' :
                  `Distribución Q PÓL ${periodLabels.period2}`
                }
                data={qPolPieData}
              />
            </div>
            
            {/* Gráfico de evolución R12 */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <HighchartsChart
                id="evolucion-r12"
                type="line"
                title={
                  tipoVista === 'TOTAL X CÍA' ? 'Evolución Q PÓL - 202408 vs 202508' :
                  tipoVista === 'TOTAL X CANAL' ? 'Evolución Q PÓL por Canal - 202408 vs 202508' :
                  tipoVista === 'TOTAL X RAMO' ? 'Evolución Q PÓL por Ramo - 202408 vs 202508' :
                  tipoVista === 'CAS X CANAL' ? 'Evolución Q PÓL CAS por Canal - 202408 vs 202508' :
                  tipoVista === 'CAS X RAMO' ? 'Evolución Q PÓL CAS por Ramo - 202408 vs 202508' :
                  tipoVista === 'ASSA X CANAL' ? 'Evolución Q PÓL ASSA por Canal - 202408 vs 202508' :
                  tipoVista === 'ASSA X RAMO' ? 'Evolución Q PÓL ASSA por Ramo - 202408 vs 202508' :
                  tipoVista === 'ASSA X CÍA' ? 'Evolución Q PÓL ASSA por Compañía - 202408 vs 202508' :
                  tipoVista === 'ART X CANAL' ? 'Evolución Q PÓL ART por Canal - 202408 vs 202508' :
                  tipoVista === 'ART X CÍA' ? 'Evolución Q PÓL ART por Compañía - 202408 vs 202508' :
                  `Evolución R12 - ${periodLabels.period1} vs ${periodLabels.period2}`
                }
                data={r12EvolutionData}
              />
            </div>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
} 
