"use client";
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

export default function PresupuestoComercial() {
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
      qPol202406: 27899,
      r12202406: 11820721857,
      qPol202506: 26669,
      r12202506: 23386730812,
      crecimientoQPol: -1230,
      porcentajeQPol: -4.41,
      crecimientoR12: 11566008954,
      porcentajeR12: 97.85
    },
    ASSA: {
      qPol202406: 75455,
      r12202406: 13250722758,
      qPol202506: 73631,
      r12202506: 28410171357,
      crecimientoQPol: -1824,
      porcentajeQPol: -2.42,
      crecimientoR12: 15159448599,
      porcentajeR12: 114.40
    },
    ART: {
      qPol202406: 3244,
      r12202406: 7550273010,
      qPol202506: 3345,
      r12202506: 12369878053,
      crecimientoQPol: 101,
      porcentajeQPol: 3.11,
      crecimientoR12: 4819605043,
      porcentajeR12: 63.83
    }
  };

  // Datos específicos para TOTAL X CANAL
  const totalXCanalData = {
    CANAL_DIRECTO: {
      qPol202406: 44658,
      r12202406: 10420688521,
      qPol202506: 43034,
      r12202506: 18119038113,
      crecimientoQPol: -1624,
      porcentajeQPol: -3.64,
      crecimientoR12: 7698349592,
      porcentajeR12: 73.88
    },
    CANAL_FILIALES: {
      qPol202406: 29437,
      r12202406: 4998522395,
      qPol202506: 27934,
      r12202506: 11602251313,
      crecimientoQPol: -1503,
      porcentajeQPol: -5.11,
      crecimientoR12: 6603728918,
      porcentajeR12: 132.11
    },
    CANAL_PAS: {
      qPol202406: 32503,
      r12202406: 17202506710,
      qPol202506: 32677,
      r12202506: 34445490795,
      crecimientoQPol: 174,
      porcentajeQPol: 0.54,
      crecimientoR12: 17242984085,
      porcentajeR12: 100.24
    }
  };

  // Datos específicos para CAS X CANAL
  const casXCanalData = {
    CANAL_DIRECTO: {
      qPol202406: 20735,
      r12202406: 6888439319,
      qPol202506: 20264,
      r12202506: 14583997615,
      crecimientoQPol: -471,
      porcentajeQPol: -2.27,
      crecimientoR12: 7695558296,
      porcentajeR12: 111.72
    },
    CANAL_FILIALES: {
      qPol202406: 6108,
      r12202406: 189013200,
      qPol202506: 5221,
      r12202506: 480754899,
      crecimientoQPol: -887,
      porcentajeQPol: -14.52,
      crecimientoR12: 291741700,
      porcentajeR12: 154.35
    },
    CANAL_PAS: {
      qPol202406: 1056,
      r12202406: 4743269339,
      qPol202506: 1184,
      r12202506: 8321978298,
      crecimientoQPol: 128,
      porcentajeQPol: 12.12,
      crecimientoR12: 3578708959,
      porcentajeR12: 75.45
    }
  };

  // Datos específicos para CAS X RAMO
  const casXRamoData = {
    AP: {
      qPol202406: 1943,
      r12202406: 100846660,
      qPol202506: 387,
      r12202506: 123478870,
      crecimientoQPol: -1556,
      porcentajeQPol: -80.08,
      crecimientoR12: 22632210,
      porcentajeR12: 22.44
    },
    AP_BOLSO: {
      qPol202406: 4176,
      r12202406: 3818065,
      qPol202506: 3994,
      r12202506: 8684762,
      crecimientoQPol: -182,
      porcentajeQPol: -4.36,
      crecimientoR12: 4866697,
      porcentajeR12: 127.47
    },
    ARMAS: {
      qPol202406: 185,
      r12202406: 2696933,
      qPol202506: 176,
      r12202506: 9083123,
      crecimientoQPol: -9,
      porcentajeQPol: -4.86,
      crecimientoR12: 6386190,
      porcentajeR12: 236.79
    },
    BOLSO_PROTEGIDO: {
      qPol202406: 5020,
      r12202406: 143612108,
      qPol202506: 4947,
      r12202506: 323744516,
      crecimientoQPol: -73,
      porcentajeQPol: -1.45,
      crecimientoR12: 180132407,
      porcentajeR12: 125.43
    },
    ESCOLTA: {
      qPol202406: 2169,
      r12202406: 47472437,
      qPol202506: 2589,
      r12202506: 174251101,
      crecimientoQPol: 420,
      porcentajeQPol: 19.36,
      crecimientoR12: 126778664,
      porcentajeR12: 267.06
    },
    ESCOLTA_EJERCITO: {
      qPol202406: 65,
      r12202406: 203896881,
      qPol202506: 69,
      r12202506: 445644686,
      crecimientoQPol: 4,
      porcentajeQPol: 6.15,
      crecimientoR12: 241747805,
      porcentajeR12: 118.56
    },
    ROBO: {
      qPol202406: 1,
      r12202406: 19811883,
      qPol202506: 1,
      r12202506: 37669275,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 17857392,
      porcentajeR12: 90.13
    },
    SALDO_DEUDOR: {
      qPol202406: 12,
      r12202406: 699713484,
      qPol202506: 11,
      r12202506: 659929483,
      crecimientoQPol: -1,
      porcentajeQPol: -8.33,
      crecimientoR12: -39784001,
      porcentajeR12: -5.69
    },
    SDJM: {
      qPol202406: 89,
      r12202406: 51462909,
      qPol202506: 145,
      r12202506: 142087469,
      crecimientoQPol: 56,
      porcentajeQPol: 62.92,
      crecimientoR12: 90624560,
      porcentajeR12: 176.10
    },
    SEPELIO_COLECTIVO: {
      qPol202406: 96,
      r12202406: 2400123114,
      qPol202506: 103,
      r12202506: 4695908050,
      crecimientoQPol: 7,
      porcentajeQPol: 7.29,
      crecimientoR12: 2295784936,
      porcentajeR12: 95.65
    },
    SEPELIO_INDIVIDUAL: {
      qPol202406: 1405,
      r12202406: 6165609,
      qPol202506: 1535,
      r12202506: 25540731,
      crecimientoQPol: 130,
      porcentajeQPol: 9.25,
      crecimientoR12: 19375122,
      porcentajeR12: 314.25
    },
    VIDA_COLECTIVO: {
      qPol202406: 237,
      r12202406: 4827939045,
      qPol202506: 234,
      r12202506: 9160455325,
      crecimientoQPol: -3,
      porcentajeQPol: -1.27,
      crecimientoR12: 4332516280,
      porcentajeR12: 89.74
    },
    VIDA_COLECTIVO_CON_AHORRO: {
      qPol202406: 4,
      r12202406: 43952280,
      qPol202506: 4,
      r12202506: 128390512,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 84438232,
      porcentajeR12: 192.11
    },
    VIDA_DIBA: {
      qPol202406: 4,
      r12202406: 1586517281,
      qPol202506: 4,
      r12202506: 3553967309,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 1967450028,
      porcentajeR12: 124.01
    },
    VIDA_INDIVIDUAL: {
      qPol202406: 33,
      r12202406: 4477,
      qPol202506: 33,
      r12202506: 4481,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 4,
      porcentajeR12: 0.09
    },
    VIDA_INDIVIDUAL_CON_AHORRO: {
      qPol202406: 12133,
      r12202406: 1673993351,
      qPol202506: 12047,
      r12202506: 3878282244,
      crecimientoQPol: -86,
      porcentajeQPol: -0.71,
      crecimientoR12: 2204288893,
      porcentajeR12: 131.68
    },
    VIDA_OBLIGATORIO: {
      qPol202406: 327,
      r12202406: 8695340,
      qPol202506: 390,
      r12202506: 19608876,
      crecimientoQPol: 63,
      porcentajeQPol: 19.27,
      crecimientoR12: 10913535,
      porcentajeR12: 125.51
    }
  };

  // Datos específicos para ASSA X CANAL
  const assaXCanalData = {
    CANAL_DIRECTO: {
      qPol202406: 23806,
      r12202406: 2240959553,
      qPol202506: 22607,
      r12202506: 3431509543,
      crecimientoQPol: -1199,
      porcentajeQPol: -5.04,
      crecimientoR12: 1190549990,
      porcentajeR12: 53.13
    },
    CANAL_FILIALES: {
      qPol202406: 22313,
      r12202406: 4193230281,
      qPol202506: 21709,
      r12202506: 9421091618,
      crecimientoQPol: -604,
      porcentajeQPol: -2.71,
      crecimientoR12: 5227861338,
      porcentajeR12: 124.67
    },
    CANAL_PAS: {
      qPol202406: 29336,
      r12202406: 6816532925,
      qPol202506: 29315,
      r12202506: 15555770196,
      crecimientoQPol: -21,
      porcentajeQPol: -0.07,
      crecimientoR12: 8741037271,
      porcentajeR12: 128.23
    }
  };

  // Datos específicos para ASSA X RAMO
  const assaXRamoData = {
    AERONAVEGACION: {
      qPol202406: 5,
      r12202406: 5135009,
      qPol202506: 7,
      r12202506: 26056851,
      crecimientoQPol: 2,
      porcentajeQPol: 40.00,
      crecimientoR12: 20921842,
      porcentajeR12: 407.44
    },
    AP: {
      qPol202406: 9847,
      r12202406: 139061759,
      qPol202506: 7893,
      r12202506: 397825842,
      crecimientoQPol: -1954,
      porcentajeQPol: -19.84,
      crecimientoR12: 258764083,
      porcentajeR12: 186.08
    },
    AUTOMOTORES: {
      qPol202406: 26185,
      r12202406: 10545921731,
      qPol202506: 25872,
      r12202506: 22109067730,
      crecimientoQPol: -313,
      porcentajeQPol: -1.20,
      crecimientoR12: 11563145999,
      porcentajeR12: 109.65
    },
    CASCOS: {
      qPol202406: 85,
      r12202406: 9037238,
      qPol202506: 100,
      r12202506: 22205827,
      crecimientoQPol: 15,
      porcentajeQPol: 17.65,
      crecimientoR12: 13168588,
      porcentajeR12: 145.71
    },
    CAUCION: {
      qPol202406: 1255,
      r12202406: 178505745,
      qPol202506: 1415,
      r12202506: 247867241,
      crecimientoQPol: 160,
      porcentajeQPol: 12.75,
      crecimientoR12: 69361495,
      porcentajeR12: 38.86
    },
    COMBINADO_FAMILIAR: {
      qPol202406: 14553,
      r12202406: 673695571,
      qPol202506: 14150,
      r12202506: 1969642521,
      crecimientoQPol: -403,
      porcentajeQPol: -2.77,
      crecimientoR12: 1295946951,
      porcentajeR12: 192.36
    },
    INCENDIO: {
      qPol202406: 986,
      r12202406: 215310802,
      qPol202506: 1098,
      r12202506: 360437744,
      crecimientoQPol: 112,
      porcentajeQPol: 11.36,
      crecimientoR12: 145126942,
      porcentajeR12: 67.40
    },
    INT_COMERCIO: {
      qPol202406: 1070,
      r12202406: 170584891,
      qPol202506: 1088,
      r12202506: 503965600,
      crecimientoQPol: 18,
      porcentajeQPol: 1.68,
      crecimientoR12: 333380709,
      porcentajeR12: 195.43
    },
    INT_CONSORCIO: {
      qPol202406: 348,
      r12202406: 54835550,
      qPol202506: 358,
      r12202506: 216621078,
      crecimientoQPol: 10,
      porcentajeQPol: 2.87,
      crecimientoR12: 161785528,
      porcentajeR12: 295.04
    },
    MOTOS: {
      qPol202406: 2873,
      r12202406: 257920015,
      qPol202506: 2779,
      r12202506: 773443504,
      crecimientoQPol: -94,
      porcentajeQPol: -3.27,
      crecimientoR12: 515523489,
      porcentajeR12: 199.88
    },
    PRAXIS: {
      qPol202406: 1601,
      r12202406: 79593636,
      qPol202506: 1885,
      r12202506: 325809180,
      crecimientoQPol: 284,
      porcentajeQPol: 17.74,
      crecimientoR12: 246215544,
      porcentajeR12: 309.34
    },
    RC: {
      qPol202406: 916,
      r12202406: 163271810,
      qPol202506: 1081,
      r12202506: 314655120,
      crecimientoQPol: 165,
      porcentajeQPol: 18.01,
      crecimientoR12: 151383310,
      porcentajeR12: 92.72
    },
    ROBO: {
      qPol202406: 267,
      r12202406: 32854975,
      qPol202506: 252,
      r12202506: 119425509,
      crecimientoQPol: -15,
      porcentajeQPol: -5.62,
      crecimientoR12: 86570535,
      porcentajeR12: 263.49
    },
    RS_VS: {
      qPol202406: 168,
      r12202406: 5768893,
      qPol202506: 287,
      r12202506: 24540489,
      crecimientoQPol: 119,
      porcentajeQPol: 70.83,
      crecimientoR12: 18771596,
      porcentajeR12: 325.39
    },
    SALUD: {
      qPol202406: 13588,
      r12202406: 372266042,
      qPol202506: 13468,
      r12202506: 533492024,
      crecimientoQPol: -120,
      porcentajeQPol: -0.88,
      crecimientoR12: 161225982,
      porcentajeR12: 43.31
    },
    SEGURO_TECNICO: {
      qPol202406: 157,
      r12202406: 133314698,
      qPol202506: 132,
      r12202506: 108466196,
      crecimientoQPol: -25,
      porcentajeQPol: -15.92,
      crecimientoR12: -24848501,
      porcentajeR12: -18.64
    },
    SEPELIO_INDIVIDUAL: {
      qPol202406: 6,
      r12202406: 7984249,
      qPol202506: 6,
      r12202506: 35183978,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 27199729,
      porcentajeR12: 340.67
    },
    TRANSPORTES: {
      qPol202406: 27,
      r12202406: 25790732,
      qPol202506: 22,
      r12202506: 51966462,
      crecimientoQPol: -5,
      porcentajeQPol: -18.52,
      crecimientoR12: 26175730,
      porcentajeR12: 101.49
    },
    VIDA_COLECTIVO: {
      qPol202406: 209,
      r12202406: 143319269,
      qPol202506: 205,
      r12202506: 151592394,
      crecimientoQPol: -4,
      porcentajeQPol: -1.91,
      crecimientoR12: 8273126,
      porcentajeR12: 5.77
    },
    VIDA_INDIVIDUAL: {
      qPol202406: 272,
      r12202406: 31998834,
      qPol202506: 394,
      r12202506: 54756960,
      crecimientoQPol: 122,
      porcentajeQPol: 44.85,
      crecimientoR12: 22758126,
      porcentajeR12: 71.12
    },
    VIDA_OBLIGATORIO: {
      qPol202406: 1037,
      r12202406: 4551311,
      qPol202506: 1138,
      r12202506: 15382732,
      crecimientoQPol: 101,
      porcentajeQPol: 9.74,
      crecimientoR12: 10831421,
      porcentajeR12: 237.98
    }
  };

  // Datos específicos para ASSA X CÍA
  const assaXCiaData = {
    AFIANZADORA: {
      qPol202406: 121,
      r12202406: 23275510,
      qPol202506: 213,
      r12202506: 30786112,
      crecimientoQPol: 92,
      porcentajeQPol: 76.03,
      crecimientoR12: 7510602,
      porcentajeR12: 32.27
    },
    ALLIANZ: {
      qPol202406: 1564,
      r12202406: 313484478,
      qPol202506: 2325,
      r12202506: 1041865659,
      crecimientoQPol: 761,
      porcentajeQPol: 48.66,
      crecimientoR12: 728381180,
      porcentajeR12: 232.35
    },
    ATM: {
      qPol202406: 513,
      r12202406: 46181438,
      qPol202506: 716,
      r12202506: 138493339,
      crecimientoQPol: 203,
      porcentajeQPol: 39.57,
      crecimientoR12: 92311901,
      porcentajeR12: 199.89
    },
    BOSTON: {
      qPol202406: 18,
      r12202406: 8952959,
      qPol202506: 1,
      r12202506: 74379,
      crecimientoQPol: -17,
      porcentajeQPol: -94.44,
      crecimientoR12: -8878580,
      porcentajeR12: -99.17
    },
    CAUCIONES: {
      qPol202406: 19,
      r12202406: 5344606,
      qPol202506: 13,
      r12202506: 1390887,
      crecimientoQPol: -6,
      porcentajeQPol: -31.58,
      crecimientoR12: -3953720,
      porcentajeR12: -73.98
    },
    CHUBB: {
      qPol202406: 96,
      r12202406: 15861757,
      qPol202506: 15,
      r12202506: 18972684,
      crecimientoQPol: -81,
      porcentajeQPol: -84.38,
      crecimientoR12: 3110927,
      porcentajeR12: 19.61
    },
    FED_PAT: {
      qPol202406: 791,
      r12202406: 305661335,
      qPol202506: 959,
      r12202506: 531237711,
      crecimientoQPol: 168,
      porcentajeQPol: 21.24,
      crecimientoR12: 225576376,
      porcentajeR12: 73.80
    },
    HDI: {
      qPol202406: 9,
      r12202406: 734095,
      qPol202506: 7,
      r12202506: 2321757,
      crecimientoQPol: -2,
      porcentajeQPol: -22.22,
      crecimientoR12: 1587663,
      porcentajeR12: 216.27
    },
    INTEGRITY: {
      qPol202406: 1533,
      r12202406: 312773035,
      qPol202506: 1619,
      r12202506: 543840130,
      crecimientoQPol: 86,
      porcentajeQPol: 5.61,
      crecimientoR12: 231067095,
      porcentajeR12: 73.88
    },
    LA_HOLANDO: {
      qPol202406: 70,
      r12202406: 6838282,
      qPol202506: 62,
      r12202506: 15875658,
      crecimientoQPol: -8,
      porcentajeQPol: -11.43,
      crecimientoR12: 9037376,
      porcentajeR12: 132.16
    },
    LIBRA: {
      qPol202406: 793,
      r12202406: 5769511,
      qPol202506: 490,
      r12202506: 5769511,
      crecimientoQPol: -303,
      porcentajeQPol: -38.21,
      crecimientoR12: 0,
      porcentajeR12: 0.00
    },
    LMA: {
      qPol202406: 24266,
      r12202406: 3366394962,
      qPol202506: 23454,
      r12202506: 9590435724,
      crecimientoQPol: -812,
      porcentajeQPol: -3.35,
      crecimientoR12: 6224040762,
      porcentajeR12: 184.89
    },
    NACION: {
      qPol202406: 1,
      r12202406: 12922,
      qPol202506: 0,
      r12202506: 0,
      crecimientoQPol: -1,
      porcentajeQPol: -100.00,
      crecimientoR12: -12922,
      porcentajeR12: -100.00
    },
    NOBLE: {
      qPol202406: 12,
      r12202406: 6352831,
      qPol202506: 11,
      r12202506: 13304418,
      crecimientoQPol: -1,
      porcentajeQPol: -8.33,
      crecimientoR12: 6951587,
      porcentajeR12: 109.43
    },
    PRUDENCIA: {
      qPol202406: 265,
      r12202406: 46599032,
      qPol202506: 333,
      r12202506: 129736655,
      crecimientoQPol: 68,
      porcentajeQPol: 25.66,
      crecimientoR12: 83137623,
      porcentajeR12: 178.41
    },
    RIVADAVIA: {
      qPol202406: 10,
      r12202406: 2596687,
      qPol202506: 48,
      r12202506: 22280185,
      crecimientoQPol: 38,
      porcentajeQPol: 380.00,
      crecimientoR12: 19683498,
      porcentajeR12: 758.02
    },
    RUS: {
      qPol202406: 11,
      r12202406: 1497250,
      qPol202506: 9,
      r12202506: 3311881,
      crecimientoQPol: -2,
      porcentajeQPol: -18.18,
      crecimientoR12: 1814631,
      porcentajeR12: 121.20
    },
    SANCOR: {
      qPol202406: 4675,
      r12202406: 988772441,
      qPol202506: 3256,
      r12202506: 2826362279,
      crecimientoQPol: -1419,
      porcentajeQPol: -30.35,
      crecimientoR12: 1837589837,
      porcentajeR12: 185.85
    },
    SMG: {
      qPol202406: 27059,
      r12202406: 7188385151,
      qPol202506: 25746,
      r12202506: 12404213055,
      crecimientoQPol: -1313,
      porcentajeQPol: -4.85,
      crecimientoR12: 5215827904,
      porcentajeR12: 72.56
    },
    SMG_LIFE: {
      qPol202406: 13379,
      r12202406: 528038385,
      qPol202506: 13295,
      r12202506: 684862351,
      crecimientoQPol: -84,
      porcentajeQPol: -0.63,
      crecimientoR12: 156823967,
      porcentajeR12: 29.70
    },
    TPC: {
      qPol202406: 20,
      r12202406: 81052,
      qPol202506: 0,
      r12202506: 20927,
      crecimientoQPol: -20,
      porcentajeQPol: -100.00,
      crecimientoR12: -60125,
      porcentajeR12: -74.18
    },
    VICTORIA: {
      qPol202406: 46,
      r12202406: 7172892,
      qPol202506: 214,
      r12202506: 55348609,
      crecimientoQPol: 168,
      porcentajeQPol: 365.22,
      crecimientoR12: 48175717,
      porcentajeR12: 671.64
    },
    ZURICH: {
      qPol202406: 8,
      r12202406: 2291112,
      qPol202506: 2,
      r12202506: 96455,
      crecimientoQPol: -6,
      porcentajeQPol: -75.00,
      crecimientoR12: -2194657,
      porcentajeR12: -95.79
    },
    COSENA: {
      qPol202406: 136,
      r12202406: 61962312,
      qPol202506: 218,
      r12202506: 52853317,
      crecimientoQPol: 82,
      porcentajeQPol: 60.29,
      crecimientoR12: -9108995,
      porcentajeR12: -14.70
    },
    SAN_CRISTOBAL: {
      qPol202406: 40,
      r12202406: 5688723,
      qPol202506: 621,
      r12202506: 296318204,
      crecimientoQPol: 581,
      porcentajeQPol: 1452.50,
      crecimientoR12: 290629481,
      porcentajeR12: 5108.87
    }
  };

  // Datos específicos para ART X CANAL
  const artXCanalData = {
    CANAL_DIRECTO: {
      qPol202406: 117,
      r12202406: 1291289649,
      qPol202506: 163,
      r12202506: 103530955,
      crecimientoQPol: 46,
      porcentajeQPol: 39.32,
      crecimientoR12: -1187758694,
      porcentajeR12: -91.98
    },
    CANAL_FILIALES: {
      qPol202406: 1016,
      r12202406: 616278915,
      qPol202506: 1004,
      r12202506: 1700404796,
      crecimientoQPol: -12,
      porcentajeQPol: -1.18,
      crecimientoR12: 1084125881,
      porcentajeR12: 175.91
    },
    CANAL_PAS: {
      qPol202406: 2111,
      r12202406: 5642704446,
      qPol202506: 2178,
      r12202506: 10565942302,
      crecimientoQPol: 67,
      porcentajeQPol: 3.17,
      crecimientoR12: 4923237856,
      porcentajeR12: 87.25
    }
  };

  // Datos específicos para ART X CÍA
  const artXCiaData = {
    ANDINA_ART: {
      qPol202406: 73,
      r12202406: 166842533,
      qPol202506: 244,
      r12202506: 1479829623,
      crecimientoQPol: 171,
      porcentajeQPol: 234.25,
      crecimientoR12: 1312987090,
      porcentajeR12: 786.96
    },
    ASOCIART_ART: {
      qPol202406: 323,
      r12202406: 1629349277,
      qPol202506: 361,
      r12202506: 2575358075,
      crecimientoQPol: 38,
      porcentajeQPol: 11.76,
      crecimientoR12: 946008798,
      porcentajeR12: 58.06
    },
    EXPERTA_ART: {
      qPol202406: 28,
      r12202406: 138734835,
      qPol202506: 23,
      r12202506: 309246420,
      crecimientoQPol: -5,
      porcentajeQPol: -17.86,
      crecimientoR12: 170511586,
      porcentajeR12: 122.90
    },
    FED_PAT: {
      qPol202406: 132,
      r12202406: 2349559046,
      qPol202506: 106,
      r12202506: 1069467626,
      crecimientoQPol: -26,
      porcentajeQPol: -19.70,
      crecimientoR12: -1280091420,
      porcentajeR12: -54.48
    },
    GALENO_ART: {
      qPol202406: 12,
      r12202406: 66536918,
      qPol202506: 8,
      r12202506: 10885655,
      crecimientoQPol: -4,
      porcentajeQPol: -33.33,
      crecimientoR12: -55651263,
      porcentajeR12: -83.64
    },
    LA_HOLANDO_ART: {
      qPol202406: 8,
      r12202406: 21561415,
      qPol202506: 11,
      r12202506: 248271635,
      crecimientoQPol: 3,
      porcentajeQPol: 37.50,
      crecimientoR12: 226710220,
      porcentajeR12: 1051.46
    },
    OMINT_ART: {
      qPol202406: 4,
      r12202406: 5009147,
      qPol202506: 4,
      r12202506: 8405747,
      crecimientoQPol: 0,
      porcentajeQPol: 0.00,
      crecimientoR12: 3396600,
      porcentajeR12: 67.81
    },
    PREVENCION_ART: {
      qPol202406: 1579,
      r12202406: 1215706171,
      qPol202506: 1590,
      r12202506: 2745633959,
      crecimientoQPol: 11,
      porcentajeQPol: 0.70,
      crecimientoR12: 1529927788,
      porcentajeR12: 125.85
    },
    PROVINCIA_ART: {
      qPol202406: 574,
      r12202406: 1074334312,
      qPol202506: 534,
      r12202506: 2361201528,
      crecimientoQPol: -40,
      porcentajeQPol: -6.97,
      crecimientoR12: 1286867216,
      porcentajeR12: 119.78
    },
    SMG_ART: {
      qPol202406: 511,
      r12202406: 882639356,
      qPol202506: 460,
      r12202506: 1546534132,
      crecimientoQPol: -51,
      porcentajeQPol: -9.98,
      crecimientoR12: 663894776,
      porcentajeR12: 75.22
    },
    VICTORIA_ART: {
      qPol202406: 0,
      r12202406: 0,
      qPol202506: 4,
      r12202506: 15043652,
      crecimientoQPol: 4,
      porcentajeQPol: 100.00,
      crecimientoR12: 15043652,
      porcentajeR12: 100.00
    }
  };

  // Gráfico de torta de Q PÓL por compañía
  const qPolPieData = useMemo(() => {
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
            name: '202406', 
            data: [
              totalXCiaData.CAS.r12202406,
              totalXCiaData.ASSA.r12202406,
              totalXCiaData.ART.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              totalXCiaData.CAS.r12202506,
              totalXCiaData.ASSA.r12202506,
              totalXCiaData.ART.r12202506
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
            name: '202406', 
            data: [
              totalXCanalData.CANAL_DIRECTO.r12202406,
              totalXCanalData.CANAL_FILIALES.r12202406,
              totalXCanalData.CANAL_PAS.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              totalXCanalData.CANAL_DIRECTO.r12202506,
              totalXCanalData.CANAL_FILIALES.r12202506,
              totalXCanalData.CANAL_PAS.r12202506
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
            name: '202406', 
            data: [
              casXCanalData.CANAL_DIRECTO.r12202406,
              casXCanalData.CANAL_FILIALES.r12202406,
              casXCanalData.CANAL_PAS.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              casXCanalData.CANAL_DIRECTO.r12202506,
              casXCanalData.CANAL_FILIALES.r12202506,
              casXCanalData.CANAL_PAS.r12202506
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
            name: '202406', 
            data: [
              casXRamoData.AP.r12202406,
              casXRamoData.AP_BOLSO.r12202406,
              casXRamoData.ARMAS.r12202406,
              casXRamoData.BOLSO_PROTEGIDO.r12202406,
              casXRamoData.ESCOLTA.r12202406,
              casXRamoData.ESCOLTA_EJERCITO.r12202406,
              casXRamoData.ROBO.r12202406,
              casXRamoData.SALDO_DEUDOR.r12202406,
              casXRamoData.SDJM.r12202406,
              casXRamoData.SEPELIO_COLECTIVO.r12202406,
              casXRamoData.SEPELIO_INDIVIDUAL.r12202406,
              casXRamoData.VIDA_COLECTIVO.r12202406,
              casXRamoData.VIDA_COLECTIVO_CON_AHORRO.r12202406,
              casXRamoData.VIDA_DIBA.r12202406,
              casXRamoData.VIDA_INDIVIDUAL.r12202406,
              casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.r12202406,
              casXRamoData.VIDA_OBLIGATORIO.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              casXRamoData.AP.r12202506,
              casXRamoData.AP_BOLSO.r12202506,
              casXRamoData.ARMAS.r12202506,
              casXRamoData.BOLSO_PROTEGIDO.r12202506,
              casXRamoData.ESCOLTA.r12202506,
              casXRamoData.ESCOLTA_EJERCITO.r12202506,
              casXRamoData.ROBO.r12202506,
              casXRamoData.SALDO_DEUDOR.r12202506,
              casXRamoData.SDJM.r12202506,
              casXRamoData.SEPELIO_COLECTIVO.r12202506,
              casXRamoData.SEPELIO_INDIVIDUAL.r12202506,
              casXRamoData.VIDA_COLECTIVO.r12202506,
              casXRamoData.VIDA_COLECTIVO_CON_AHORRO.r12202506,
              casXRamoData.VIDA_DIBA.r12202506,
              casXRamoData.VIDA_INDIVIDUAL.r12202506,
              casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.r12202506,
              casXRamoData.VIDA_OBLIGATORIO.r12202506
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
            name: '202406', 
            data: [
              assaXCanalData.CANAL_DIRECTO.r12202406,
              assaXCanalData.CANAL_FILIALES.r12202406,
              assaXCanalData.CANAL_PAS.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              assaXCanalData.CANAL_DIRECTO.r12202506,
              assaXCanalData.CANAL_FILIALES.r12202506,
              assaXCanalData.CANAL_PAS.r12202506
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
            name: '202406', 
            data: [
              assaXRamoData.AERONAVEGACION.r12202406,
              assaXRamoData.AP.r12202406,
              assaXRamoData.AUTOMOTORES.r12202406,
              assaXRamoData.CASCOS.r12202406,
              assaXRamoData.CAUCION.r12202406,
              assaXRamoData.COMBINADO_FAMILIAR.r12202406,
              assaXRamoData.INCENDIO.r12202406,
              assaXRamoData.INT_COMERCIO.r12202406,
              assaXRamoData.INT_CONSORCIO.r12202406,
              assaXRamoData.MOTOS.r12202406,
              assaXRamoData.PRAXIS.r12202406,
              assaXRamoData.RC.r12202406,
              assaXRamoData.ROBO.r12202406,
              assaXRamoData.RS_VS.r12202406,
              assaXRamoData.SALUD.r12202406,
              assaXRamoData.SEGURO_TECNICO.r12202406,
              assaXRamoData.SEPELIO_INDIVIDUAL.r12202406,
              assaXRamoData.TRANSPORTES.r12202406,
              assaXRamoData.VIDA_COLECTIVO.r12202406,
              assaXRamoData.VIDA_INDIVIDUAL.r12202406,
              assaXRamoData.VIDA_OBLIGATORIO.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              assaXRamoData.AERONAVEGACION.r12202506,
              assaXRamoData.AP.r12202506,
              assaXRamoData.AUTOMOTORES.r12202506,
              assaXRamoData.CASCOS.r12202506,
              assaXRamoData.CAUCION.r12202506,
              assaXRamoData.COMBINADO_FAMILIAR.r12202506,
              assaXRamoData.INCENDIO.r12202506,
              assaXRamoData.INT_COMERCIO.r12202506,
              assaXRamoData.INT_CONSORCIO.r12202506,
              assaXRamoData.MOTOS.r12202506,
              assaXRamoData.PRAXIS.r12202506,
              assaXRamoData.RC.r12202506,
              assaXRamoData.ROBO.r12202506,
              assaXRamoData.RS_VS.r12202506,
              assaXRamoData.SALUD.r12202506,
              assaXRamoData.SEGURO_TECNICO.r12202506,
              assaXRamoData.SEPELIO_INDIVIDUAL.r12202506,
              assaXRamoData.TRANSPORTES.r12202506,
              assaXRamoData.VIDA_COLECTIVO.r12202506,
              assaXRamoData.VIDA_INDIVIDUAL.r12202506,
              assaXRamoData.VIDA_OBLIGATORIO.r12202506
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
            name: '202406', 
            data: [
              assaXCiaData.AFIANZADORA.r12202406,
              assaXCiaData.ALLIANZ.r12202406,
              assaXCiaData.ATM.r12202406,
              assaXCiaData.BOSTON.r12202406,
              assaXCiaData.CAUCIONES.r12202406,
              assaXCiaData.CHUBB.r12202406,
              assaXCiaData.FED_PAT.r12202406,
              assaXCiaData.HDI.r12202406,
              assaXCiaData.INTEGRITY.r12202406,
              assaXCiaData.LA_HOLANDO.r12202406,
              assaXCiaData.LIBRA.r12202406,
              assaXCiaData.LMA.r12202406,
              assaXCiaData.NACION.r12202406,
              assaXCiaData.NOBLE.r12202406,
              assaXCiaData.PRUDENCIA.r12202406,
              assaXCiaData.RIVADAVIA.r12202406,
              assaXCiaData.RUS.r12202406,
              assaXCiaData.SANCOR.r12202406,
              assaXCiaData.SMG.r12202406,
              assaXCiaData.SMG_LIFE.r12202406,
              assaXCiaData.TPC.r12202406,
              assaXCiaData.VICTORIA.r12202406,
              assaXCiaData.ZURICH.r12202406,
              assaXCiaData.COSENA.r12202406,
              assaXCiaData.SAN_CRISTOBAL.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              assaXCiaData.AFIANZADORA.r12202506,
              assaXCiaData.ALLIANZ.r12202506,
              assaXCiaData.ATM.r12202506,
              assaXCiaData.BOSTON.r12202506,
              assaXCiaData.CAUCIONES.r12202506,
              assaXCiaData.CHUBB.r12202506,
              assaXCiaData.FED_PAT.r12202506,
              assaXCiaData.HDI.r12202506,
              assaXCiaData.INTEGRITY.r12202506,
              assaXCiaData.LA_HOLANDO.r12202506,
              assaXCiaData.LIBRA.r12202506,
              assaXCiaData.LMA.r12202506,
              assaXCiaData.NACION.r12202506,
              assaXCiaData.NOBLE.r12202506,
              assaXCiaData.PRUDENCIA.r12202506,
              assaXCiaData.RIVADAVIA.r12202506,
              assaXCiaData.RUS.r12202506,
              assaXCiaData.SANCOR.r12202506,
              assaXCiaData.SMG.r12202506,
              assaXCiaData.SMG_LIFE.r12202506,
              assaXCiaData.TPC.r12202506,
              assaXCiaData.VICTORIA.r12202506,
              assaXCiaData.ZURICH.r12202506,
              assaXCiaData.COSENA.r12202506,
              assaXCiaData.SAN_CRISTOBAL.r12202506
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
            name: '202406', 
            data: [
              artXCanalData.CANAL_DIRECTO.r12202406,
              artXCanalData.CANAL_FILIALES.r12202406,
              artXCanalData.CANAL_PAS.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              artXCanalData.CANAL_DIRECTO.r12202506,
              artXCanalData.CANAL_FILIALES.r12202506,
              artXCanalData.CANAL_PAS.r12202506
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
            name: '202406', 
            data: [
              artXCiaData.ANDINA_ART.r12202406,
              artXCiaData.ASOCIART_ART.r12202406,
              artXCiaData.EXPERTA_ART.r12202406,
              artXCiaData.FED_PAT.r12202406,
              artXCiaData.GALENO_ART.r12202406,
              artXCiaData.LA_HOLANDO_ART.r12202406,
              artXCiaData.OMINT_ART.r12202406,
              artXCiaData.PREVENCION_ART.r12202406,
              artXCiaData.PROVINCIA_ART.r12202406,
              artXCiaData.SMG_ART.r12202406,
              artXCiaData.VICTORIA_ART.r12202406
            ], 
            color: '#007DC5' 
          },
          { 
            name: '202506', 
            data: [
              artXCiaData.ANDINA_ART.r12202506,
              artXCiaData.ASOCIART_ART.r12202506,
              artXCiaData.EXPERTA_ART.r12202506,
              artXCiaData.FED_PAT.r12202506,
              artXCiaData.GALENO_ART.r12202506,
              artXCiaData.LA_HOLANDO_ART.r12202506,
              artXCiaData.OMINT_ART.r12202506,
              artXCiaData.PREVENCION_ART.r12202506,
              artXCiaData.PROVINCIA_ART.r12202506,
              artXCiaData.SMG_ART.r12202506,
              artXCiaData.VICTORIA_ART.r12202506
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

    if (tipoVista === 'TOTAL X CANAL') {
      return {
        chart: { type: 'pie', height: 320 },
        series: [
          {
            name: 'Q PÓL 202506',
            data: [
              { name: 'CANAL DIRECTO', y: totalXCanalData.CANAL_DIRECTO.qPol202506, color: '#003871' },
              { name: 'CANAL FILIALES', y: totalXCanalData.CANAL_FILIALES.qPol202506, color: '#007DC5' },
              { name: 'CANAL PAS', y: totalXCanalData.CANAL_PAS.qPol202506, color: '#00AEEF' },
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
            name: 'Q PÓL 202506',
            data: [
              { name: 'CANAL DIRECTO', y: casXCanalData.CANAL_DIRECTO.qPol202506, color: '#003871' },
              { name: 'CANAL FILIALES', y: casXCanalData.CANAL_FILIALES.qPol202506, color: '#007DC5' },
              { name: 'CANAL PAS', y: casXCanalData.CANAL_PAS.qPol202506, color: '#00AEEF' },
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
            name: 'Q PÓL 202506',
            data: [
              { name: 'VIDA INDIVIDUAL CON AHORRO', y: casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.qPol202506, color: '#003871' },
              { name: 'CANAL DIRECTO', y: casXRamoData.AP.qPol202506 + casXRamoData.AP_BOLSO.qPol202506 + casXRamoData.ARMAS.qPol202506 + casXRamoData.BOLSO_PROTEGIDO.qPol202506 + casXRamoData.ESCOLTA.qPol202506 + casXRamoData.ESCOLTA_EJERCITO.qPol202506 + casXRamoData.ROBO.qPol202506 + casXRamoData.SALDO_DEUDOR.qPol202506 + casXRamoData.SDJM.qPol202506, color: '#007DC5' },
              { name: 'SEPELIO INDIVIDUAL', y: casXRamoData.SEPELIO_INDIVIDUAL.qPol202506, color: '#00AEEF' },
              { name: 'VIDA OBLIGATORIO', y: casXRamoData.VIDA_OBLIGATORIO.qPol202506, color: '#FF6B6B' },
              { name: 'SEPELIO COLECTIVO', y: casXRamoData.SEPELIO_COLECTIVO.qPol202506, color: '#4ECDC4' },
              { name: 'VIDA COLECTIVO', y: casXRamoData.VIDA_COLECTIVO.qPol202506, color: '#45B7D1' },
              { name: 'VIDA COLECTIVO CON AHORRO', y: casXRamoData.VIDA_COLECTIVO_CON_AHORRO.qPol202506, color: '#96CEB4' },
              { name: 'VIDA DIBA', y: casXRamoData.VIDA_DIBA.qPol202506, color: '#FFEAA7' },
              { name: 'VIDA INDIVIDUAL', y: casXRamoData.VIDA_INDIVIDUAL.qPol202506, color: '#DDA0DD' },
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
            name: 'Q PÓL 202506',
            data: [
              { name: 'CANAL PAS', y: assaXCanalData.CANAL_PAS.qPol202506, color: '#003871' },
              { name: 'CANAL DIRECTO', y: assaXCanalData.CANAL_DIRECTO.qPol202506, color: '#007DC5' },
              { name: 'CANAL FILIALES', y: assaXCanalData.CANAL_FILIALES.qPol202506, color: '#00AEEF' },
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
            name: 'Q PÓL 202506',
            data: [
              { name: 'AUTOMOTORES', y: assaXRamoData.AUTOMOTORES.qPol202506, color: '#003871' },
              { name: 'COMBINADO FAMILIAR', y: assaXRamoData.COMBINADO_FAMILIAR.qPol202506, color: '#007DC5' },
              { name: 'SALUD', y: assaXRamoData.SALUD.qPol202506, color: '#00AEEF' },
              { name: 'AP', y: assaXRamoData.AP.qPol202506, color: '#FF6B6B' },
              { name: 'MOTOS', y: assaXRamoData.MOTOS.qPol202506, color: '#4ECDC4' },
              { name: 'PRAXIS', y: assaXRamoData.PRAXIS.qPol202506, color: '#45B7D1' },
              { name: 'RC', y: assaXRamoData.RC.qPol202506, color: '#96CEB4' },
              { name: 'CAUCIÓN', y: assaXRamoData.CAUCION.qPol202506, color: '#FFEAA7' },
              { name: 'VIDA OBLIGATORIO', y: assaXRamoData.VIDA_OBLIGATORIO.qPol202506, color: '#DDA0DD' },
              { name: 'OTROS', y: assaXRamoData.AERONAVEGACION.qPol202506 + assaXRamoData.CASCOS.qPol202506 + assaXRamoData.INCENDIO.qPol202506 + assaXRamoData.INT_COMERCIO.qPol202506 + assaXRamoData.INT_CONSORCIO.qPol202506 + assaXRamoData.ROBO.qPol202506 + assaXRamoData.RS_VS.qPol202506 + assaXRamoData.SEGURO_TECNICO.qPol202506 + assaXRamoData.SEPELIO_INDIVIDUAL.qPol202506 + assaXRamoData.TRANSPORTES.qPol202506 + assaXRamoData.VIDA_COLECTIVO.qPol202506 + assaXRamoData.VIDA_INDIVIDUAL.qPol202506, color: '#98D8C8' },
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
            name: 'Q PÓL 202506',
            data: [
              { name: 'SMG', y: assaXCiaData.SMG.qPol202506, color: '#003871' },
              { name: 'LMA', y: assaXCiaData.LMA.qPol202506, color: '#007DC5' },
              { name: 'SMG LIFE', y: assaXCiaData.SMG_LIFE.qPol202506, color: '#00AEEF' },
              { name: 'SANCOR', y: assaXCiaData.SANCOR.qPol202506, color: '#FF6B6B' },
              { name: 'ALLIANZ', y: assaXCiaData.ALLIANZ.qPol202506, color: '#4ECDC4' },
              { name: 'INTEGRITY', y: assaXCiaData.INTEGRITY.qPol202506, color: '#45B7D1' },
              { name: 'FED PAT', y: assaXCiaData.FED_PAT.qPol202506, color: '#96CEB4' },
              { name: 'SAN CRISTOBAL', y: assaXCiaData.SAN_CRISTOBAL.qPol202506, color: '#FFEAA7' },
              { name: 'VICTORIA', y: assaXCiaData.VICTORIA.qPol202506, color: '#DDA0DD' },
              { name: 'OTROS', y: assaXCiaData.AFIANZADORA.qPol202506 + assaXCiaData.ATM.qPol202506 + assaXCiaData.BOSTON.qPol202506 + assaXCiaData.CAUCIONES.qPol202506 + assaXCiaData.CHUBB.qPol202506 + assaXCiaData.HDI.qPol202506 + assaXCiaData.LA_HOLANDO.qPol202506 + assaXCiaData.LIBRA.qPol202506 + assaXCiaData.NACION.qPol202506 + assaXCiaData.NOBLE.qPol202506 + assaXCiaData.PRUDENCIA.qPol202506 + assaXCiaData.RIVADAVIA.qPol202506 + assaXCiaData.RUS.qPol202506 + assaXCiaData.TPC.qPol202506 + assaXCiaData.ZURICH.qPol202506 + assaXCiaData.COSENA.qPol202506, color: '#98D8C8' },
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
            name: 'Q PÓL 202506',
            data: [
              { name: 'CANAL PAS', y: artXCanalData.CANAL_PAS.qPol202506, color: '#003871' },
              { name: 'CANAL FILIALES', y: artXCanalData.CANAL_FILIALES.qPol202506, color: '#007DC5' },
              { name: 'CANAL DIRECTO', y: artXCanalData.CANAL_DIRECTO.qPol202506, color: '#00AEEF' },
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
            name: 'Q PÓL 202506',
            data: [
              { name: 'PREVENCIÓN ART', y: artXCiaData.PREVENCION_ART.qPol202506, color: '#003871' },
              { name: 'ASOCIART ART', y: artXCiaData.ASOCIART_ART.qPol202506, color: '#007DC5' },
              { name: 'PROVINCIA ART', y: artXCiaData.PROVINCIA_ART.qPol202506, color: '#00AEEF' },
              { name: 'SMG ART', y: artXCiaData.SMG_ART.qPol202506, color: '#FF6B6B' },
              { name: 'ANDINA ART', y: artXCiaData.ANDINA_ART.qPol202506, color: '#4ECDC4' },
              { name: 'FED PAT', y: artXCiaData.FED_PAT.qPol202506, color: '#45B7D1' },
              { name: 'EXPERTA ART', y: artXCiaData.EXPERTA_ART.qPol202506, color: '#96CEB4' },
              { name: 'LA HOLANDO ART', y: artXCiaData.LA_HOLANDO_ART.qPol202506, color: '#FFEAA7' },
              { name: 'OTROS', y: artXCiaData.GALENO_ART.qPol202506 + artXCiaData.OMINT_ART.qPol202506 + artXCiaData.VICTORIA_ART.qPol202506, color: '#DDA0DD' },
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
  }, [indicadoresData, filterApplied, selectedMonth2, selectedYear2, tipoVista, totalXCiaData, totalXCanalData, casXCanalData, casXRamoData, assaXCanalData, assaXRamoData, assaXCiaData, artXCanalData, artXCiaData]);

  // Gráfico de evolución de R12
  const r12EvolutionData = useMemo(() => {
    if (tipoVista === 'TOTAL X CÍA') {
      return {
        chart: { type: 'line', height: 320 },
        xAxis: {
          categories: ['202406', '202506'],
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
            data: [totalXCiaData.CAS.r12202406, totalXCiaData.CAS.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'ASSA', 
            data: [totalXCiaData.ASSA.r12202406, totalXCiaData.ASSA.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'ART', 
            data: [totalXCiaData.ART.r12202406, totalXCiaData.ART.r12202506], 
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
          categories: ['202406', '202506'],
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
            name: 'CANAL DIRECTO', 
            data: [totalXCanalData.CANAL_DIRECTO.r12202406, totalXCanalData.CANAL_DIRECTO.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'CANAL FILIALES', 
            data: [totalXCanalData.CANAL_FILIALES.r12202406, totalXCanalData.CANAL_FILIALES.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'CANAL PAS', 
            data: [totalXCanalData.CANAL_PAS.r12202406, totalXCanalData.CANAL_PAS.r12202506], 
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
          categories: ['202406', '202506'],
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
            name: 'CANAL DIRECTO', 
            data: [casXCanalData.CANAL_DIRECTO.r12202406, casXCanalData.CANAL_DIRECTO.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'CANAL FILIALES', 
            data: [casXCanalData.CANAL_FILIALES.r12202406, casXCanalData.CANAL_FILIALES.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'CANAL PAS', 
            data: [casXCanalData.CANAL_PAS.r12202406, casXCanalData.CANAL_PAS.r12202506], 
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
          categories: ['202406', '202506'],
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
            name: 'VIDA COLECTIVO', 
            data: [casXRamoData.VIDA_COLECTIVO.r12202406, casXRamoData.VIDA_COLECTIVO.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'VIDA INDIVIDUAL CON AHORRO', 
            data: [casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.r12202406, casXRamoData.VIDA_INDIVIDUAL_CON_AHORRO.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'SEPELIO COLECTIVO', 
            data: [casXRamoData.SEPELIO_COLECTIVO.r12202406, casXRamoData.SEPELIO_COLECTIVO.r12202506], 
            color: '#00AEEF' 
          },
          { 
            name: 'VIDA DIBA', 
            data: [casXRamoData.VIDA_DIBA.r12202406, casXRamoData.VIDA_DIBA.r12202506], 
            color: '#FF6B6B' 
          },
          { 
            name: 'ESCOLTA EJERCITO', 
            data: [casXRamoData.ESCOLTA_EJERCITO.r12202406, casXRamoData.ESCOLTA_EJERCITO.r12202506], 
            color: '#4ECDC4' 
          },
          { 
            name: 'BOLSO PROTEGIDO', 
            data: [casXRamoData.BOLSO_PROTEGIDO.r12202406, casXRamoData.BOLSO_PROTEGIDO.r12202506], 
            color: '#45B7D1' 
          },
          { 
            name: 'SALDO DEUDOR', 
            data: [casXRamoData.SALDO_DEUDOR.r12202406, casXRamoData.SALDO_DEUDOR.r12202506], 
            color: '#96CEB4' 
          },
          { 
            name: 'ESCOLTA', 
            data: [casXRamoData.ESCOLTA.r12202406, casXRamoData.ESCOLTA.r12202506], 
            color: '#FFEAA7' 
          },
          { 
            name: 'AP', 
            data: [casXRamoData.AP.r12202406, casXRamoData.AP.r12202506], 
            color: '#DDA0DD' 
          },
          { 
            name: 'SEPELIO INDIVIDUAL', 
            data: [casXRamoData.SEPELIO_INDIVIDUAL.r12202406, casXRamoData.SEPELIO_INDIVIDUAL.r12202506], 
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
          categories: ['202406', '202506'],
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
            name: 'CANAL PAS', 
            data: [assaXCanalData.CANAL_PAS.r12202406, assaXCanalData.CANAL_PAS.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'CANAL FILIALES', 
            data: [assaXCanalData.CANAL_FILIALES.r12202406, assaXCanalData.CANAL_FILIALES.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'CANAL DIRECTO', 
            data: [assaXCanalData.CANAL_DIRECTO.r12202406, assaXCanalData.CANAL_DIRECTO.r12202506], 
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
          categories: ['202406', '202506'],
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
            name: 'AUTOMOTORES', 
            data: [assaXRamoData.AUTOMOTORES.r12202406, assaXRamoData.AUTOMOTORES.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'COMBINADO FAMILIAR', 
            data: [assaXRamoData.COMBINADO_FAMILIAR.r12202406, assaXRamoData.COMBINADO_FAMILIAR.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'SALUD', 
            data: [assaXRamoData.SALUD.r12202406, assaXRamoData.SALUD.r12202506], 
            color: '#00AEEF' 
          },
          { 
            name: 'AP', 
            data: [assaXRamoData.AP.r12202406, assaXRamoData.AP.r12202506], 
            color: '#FF6B6B' 
          },
          { 
            name: 'MOTOS', 
            data: [assaXRamoData.MOTOS.r12202406, assaXRamoData.MOTOS.r12202506], 
            color: '#4ECDC4' 
          },
          { 
            name: 'PRAXIS', 
            data: [assaXRamoData.PRAXIS.r12202406, assaXRamoData.PRAXIS.r12202506], 
            color: '#45B7D1' 
          },
          { 
            name: 'RC', 
            data: [assaXRamoData.RC.r12202406, assaXRamoData.RC.r12202506], 
            color: '#96CEB4' 
          },
          { 
            name: 'CAUCIÓN', 
            data: [assaXRamoData.CAUCION.r12202406, assaXRamoData.CAUCION.r12202506], 
            color: '#FFEAA7' 
          },
          { 
            name: 'VIDA OBLIGATORIO', 
            data: [assaXRamoData.VIDA_OBLIGATORIO.r12202406, assaXRamoData.VIDA_OBLIGATORIO.r12202506], 
            color: '#DDA0DD' 
          },
          { 
            name: 'INCENDIO', 
            data: [assaXRamoData.INCENDIO.r12202406, assaXRamoData.INCENDIO.r12202506], 
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
          categories: ['202406', '202506'],
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
            data: [assaXCiaData.SMG.r12202406, assaXCiaData.SMG.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'LMA', 
            data: [assaXCiaData.LMA.r12202406, assaXCiaData.LMA.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'SANCOR', 
            data: [assaXCiaData.SANCOR.r12202406, assaXCiaData.SANCOR.r12202506], 
            color: '#00AEEF' 
          },
          { 
            name: 'ALLIANZ', 
            data: [assaXCiaData.ALLIANZ.r12202406, assaXCiaData.ALLIANZ.r12202506], 
            color: '#FF6B6B' 
          },
          { 
            name: 'INTEGRITY', 
            data: [assaXCiaData.INTEGRITY.r12202406, assaXCiaData.INTEGRITY.r12202506], 
            color: '#4ECDC4' 
          },
          { 
            name: 'FED PAT', 
            data: [assaXCiaData.FED_PAT.r12202406, assaXCiaData.FED_PAT.r12202506], 
            color: '#45B7D1' 
          },
          { 
            name: 'SMG LIFE', 
            data: [assaXCiaData.SMG_LIFE.r12202406, assaXCiaData.SMG_LIFE.r12202506], 
            color: '#96CEB4' 
          },
          { 
            name: 'SAN CRISTOBAL', 
            data: [assaXCiaData.SAN_CRISTOBAL.r12202406, assaXCiaData.SAN_CRISTOBAL.r12202506], 
            color: '#FFEAA7' 
          },
          { 
            name: 'VICTORIA', 
            data: [assaXCiaData.VICTORIA.r12202406, assaXCiaData.VICTORIA.r12202506], 
            color: '#DDA0DD' 
          },
          { 
            name: 'ATM', 
            data: [assaXCiaData.ATM.r12202406, assaXCiaData.ATM.r12202506], 
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
          categories: ['202406', '202506'],
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
            name: 'CANAL PAS', 
            data: [artXCanalData.CANAL_PAS.r12202406, artXCanalData.CANAL_PAS.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'CANAL FILIALES', 
            data: [artXCanalData.CANAL_FILIALES.r12202406, artXCanalData.CANAL_FILIALES.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'CANAL DIRECTO', 
            data: [artXCanalData.CANAL_DIRECTO.r12202406, artXCanalData.CANAL_DIRECTO.r12202506], 
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
          categories: ['202406', '202506'],
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
            data: [artXCiaData.PREVENCION_ART.r12202406, artXCiaData.PREVENCION_ART.r12202506], 
            color: '#003871' 
          },
          { 
            name: 'ASOCIART ART', 
            data: [artXCiaData.ASOCIART_ART.r12202406, artXCiaData.ASOCIART_ART.r12202506], 
            color: '#007DC5' 
          },
          { 
            name: 'PROVINCIA ART', 
            data: [artXCiaData.PROVINCIA_ART.r12202406, artXCiaData.PROVINCIA_ART.r12202506], 
            color: '#00AEEF' 
          },
          { 
            name: 'SMG ART', 
            data: [artXCiaData.SMG_ART.r12202406, artXCiaData.SMG_ART.r12202506], 
            color: '#FF6B6B' 
          },
          { 
            name: 'ANDINA ART', 
            data: [artXCiaData.ANDINA_ART.r12202406, artXCiaData.ANDINA_ART.r12202506], 
            color: '#4ECDC4' 
          },
          { 
            name: 'FED PAT', 
            data: [artXCiaData.FED_PAT.r12202406, artXCiaData.FED_PAT.r12202506], 
            color: '#45B7D1' 
          },
          { 
            name: 'EXPERTA ART', 
            data: [artXCiaData.EXPERTA_ART.r12202406, artXCiaData.EXPERTA_ART.r12202506], 
            color: '#96CEB4' 
          },
          { 
            name: 'LA HOLANDO ART', 
            data: [artXCiaData.LA_HOLANDO_ART.r12202406, artXCiaData.LA_HOLANDO_ART.r12202506], 
            color: '#FFEAA7' 
          },
          { 
            name: 'GALENO ART', 
            data: [artXCiaData.GALENO_ART.r12202406, artXCiaData.GALENO_ART.r12202506], 
            color: '#DDA0DD' 
          },
          { 
            name: 'OMINT ART', 
            data: [artXCiaData.OMINT_ART.r12202406, artXCiaData.OMINT_ART.r12202506], 
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
  }, [indicadoresData, filterApplied, selectedMonth1, selectedYear1, selectedMonth2, selectedYear2, tipoVista, totalXCiaData, totalXCanalData, casXCanalData, casXRamoData, assaXCanalData, assaXRamoData, assaXCiaData, artXCanalData, artXCiaData]);

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

  // Datos para gráficos de cumplimiento presupuestario
  const cumplimientoQPolData = useMemo(() => {
    return {
      chart: { type: 'line', height: 330 },
      title: {
        text: 'Cumplimiento YTD Q PÓL'
      },
      xAxis: {
        categories: tipoVista.includes('CÍA') ? ['CAS', 'ASSA', 'ART'] : 
                   tipoVista.includes('CANAL') ? ['CANAL DIRECTO', 'CANAL BROKER', 'CANAL BANCA'] :
                   tipoVista.includes('RAMO') ? ['AP', 'VIDA', 'SEPELIO'] : ['CAS', 'ASSA', 'ART'],
        title: { text: tipoVista.includes('CÍA') ? 'Compañía' : tipoVista.includes('CANAL') ? 'Canal' : 'Ramo' }
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
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
          fontSize: '12px'
        }
      },
      series: [
        {
          name: 'PPTO Q PÓL',
          data: tipoVista.includes('CÍA') ? [30689, 83002, 3568] :
                tipoVista.includes('CANAL') ? [50000, 40000, 30000] :
                tipoVista.includes('RAMO') ? [60000, 50000, 40000] : [30689, 83002, 3568],
          color: '#003871',
          marker: { symbol: 'circle' }
        },
        {
          name: 'REAL Q PÓL',
          data: tipoVista.includes('CÍA') ? [26669, 73631, 3345] :
                tipoVista.includes('CANAL') ? [45000, 35000, 25000] :
                tipoVista.includes('RAMO') ? [55000, 45000, 35000] : [26669, 73631, 3345],
          color: '#00AEEF',
          marker: { symbol: 'diamond' }
        }
      ],
      credits: { enabled: false }
    };
  }, [tipoVista, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  const cumplimientoR12Data = useMemo(() => {
    const period1 = `${getMonthName(selectedMonth1)} ${selectedYear1}`;
    const period2 = `${getMonthName(selectedMonth2)} ${selectedYear2}`;
    
    return {
      chart: { type: 'column', height: 330 },
      title: {
        text: 'Cumplimiento YTD R12'
      },
      xAxis: {
        categories: tipoVista.includes('CÍA') ? ['CAS', 'ASSA', 'ART'] : 
                   tipoVista.includes('CANAL') ? ['CANAL DIRECTO', 'CANAL BROKER', 'CANAL BANCA'] :
                   tipoVista.includes('RAMO') ? ['AP', 'VIDA', 'SEPELIO'] : ['CAS', 'ASSA', 'ART'],
        title: { text: tipoVista.includes('CÍA') ? 'Compañía' : tipoVista.includes('CANAL') ? 'Canal' : 'Ramo' }
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
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
          fontSize: '12px'
        }
      },
      series: [
        {
          name: 'PPTO R12',
          data: tipoVista.includes('CÍA') ? [17660158455, 19797597276, 11280107876] :
                tipoVista.includes('CANAL') ? [15000000000, 12000000000, 8000000000] :
                tipoVista.includes('RAMO') ? [20000000000, 18000000000, 12000000000] : [17660158455, 19797597276, 11280107876],
          color: '#003871'
        },
        {
          name: 'REAL R12',
          data: tipoVista.includes('CÍA') ? [23386730812, 28410171357, 12369878053] :
                tipoVista.includes('CANAL') ? [13500000000, 11000000000, 9000000000] :
                tipoVista.includes('RAMO') ? [17500000000, 19500000000, 11000000000] : [23386730812, 28410171357, 12369878053],
          color: '#00AEEF'
        }
      ],
      credits: { enabled: false }
    };
  }, [tipoVista, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  return (
    <div className="space-y-6">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Presupuesto Comercial</h1>
          <p className="text-gray-600 mt-2">Visualice el Presupuesto Comercial</p>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}> </th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>                  
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">30,689</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,669</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-4,020</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.90%</td>
                    <td className="px-4 py-2 text-center text-gray-900">17,660,158,455</td>
                    <td className="px-4 py-2 text-center text-gray-900">23,386,730,812</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5,726,572,357</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">132.43%</td>
                    <td className="px-4 py-2 text-center text-gray-900">30,689</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,669</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-4,020</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.90%</td>
                    <td className="px-4 py-2 text-center text-gray-900">17,660,158,455</td>
                    <td className="px-4 py-2 text-center text-gray-900">23,386,730,812</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5,726,572,357</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">132.43%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ASSA</td>
                    <td className="px-4 py-2 text-center text-gray-900">83,002</td>
                    <td className="px-4 py-2 text-center text-gray-900">73,631</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-9,371</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,797,597,276</td>
                    <td className="px-4 py-2 text-center text-gray-900">28,410,171,357</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">8,612,574,081</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">143.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">83,002</td>
                    <td className="px-4 py-2 text-center text-gray-900">73,631</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-9,371</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,797,528,261</td>
                    <td className="px-4 py-2 text-center text-gray-900">28,410,171,357</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">8,612,643,096</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">143.50%</td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,568</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,345</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-223</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">93.74%</td>
                    <td className="px-4 py-2 text-center text-gray-900">11,280,107,876</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,369,878,053</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">1,089,770,177</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">109.66%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,568</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,345</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-223</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">93.74%</td>
                    <td className="px-4 py-2 text-center text-gray-900">11,280,107,876</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,369,878,053</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">1,089,770,177</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">109.66%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">117,259</td>
                    <td className="px-4 py-2 text-center">103,645</td>
                    <td className="px-4 py-2 text-center">-13,614</td>
                    <td className="px-4 py-2 text-center">88.39%</td>
                    <td className="px-4 py-2 text-center">48,737,863,608</td>
                    <td className="px-4 py-2 text-center">64,166,780,222</td>
                    <td className="px-4 py-2 text-center">15,428,916,614</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">131.66%</td>
                    <td className="px-4 py-2 text-center">117,259</td>
                    <td className="px-4 py-2 text-center">103,645</td>
                    <td className="px-4 py-2 text-center">-13,614</td>
                    <td className="px-4 py-2 text-center">88.39%</td>
                    <td className="px-4 py-2 text-center">48,737,794,593</td>
                    <td className="px-4 py-2 text-center">64,166,780,222</td>
                    <td className="px-4 py-2 text-center">15,428,985,629</td>
                    <td className="px-4 py-2 text-center">131.66%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}> </th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL DIRECTO</td>
                    <td className="px-4 py-2 text-center text-gray-900">49,124</td>
                    <td className="px-4 py-2 text-center text-gray-900">43,034</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-6,090</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">87.60%</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,568,508,650</td>
                    <td className="px-4 py-2 text-center text-gray-900">18,119,038,113</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">2,550,529,463</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">116.38%</td>
                    <td className="px-4 py-2 text-center text-gray-900">49,124</td>
                    <td className="px-4 py-2 text-center text-gray-900">43,034</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-6,090</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">87.60%</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,568,508,650</td>
                    <td className="px-4 py-2 text-center text-gray-900">18,119,038,113</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">2,550,529,463</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">116.38%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL FILIALES</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,381</td>
                    <td className="px-4 py-2 text-center text-gray-900">27,934</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-4,447</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,467,792,458</td>
                    <td className="px-4 py-2 text-center text-gray-900">11,602,251,313</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">4,134,458,855</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">155.36%</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,381</td>
                    <td className="px-4 py-2 text-center text-gray-900">27,934</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-4,447</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,467,792,458</td>
                    <td className="px-4 py-2 text-center text-gray-900">11,602,251,313</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">4,134,458,855</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">155.36%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL PAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">35,754</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,677</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-3,077</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">91.39%</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,701,562,499</td>
                    <td className="px-4 py-2 text-center text-gray-900">34,445,490,795</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">8,743,928,296</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">134.02%</td>
                    <td className="px-4 py-2 text-center text-gray-900">35,754</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,677</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-3,077</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">91.39%</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,701,493,484</td>
                    <td className="px-4 py-2 text-center text-gray-900">34,445,490,795</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">8,743,997,311</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">134.02%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">117,259</td>
                    <td className="px-4 py-2 text-center">103,645</td>
                    <td className="px-4 py-2 text-center">-13,614</td>
                    <td className="px-4 py-2 text-center">88.39%</td>
                    <td className="px-4 py-2 text-center">48,737,863,608</td>
                    <td className="px-4 py-2 text-center">64,166,780,222</td>
                    <td className="px-4 py-2 text-center">15,428,916,614</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">131.66%</td>
                    <td className="px-4 py-2 text-center">117,259</td>
                    <td className="px-4 py-2 text-center">103,645</td>
                    <td className="px-4 py-2 text-center">-13,614</td>
                    <td className="px-4 py-2 text-center">88.39%</td>
                    <td className="px-4 py-2 text-center">48,737,794,593</td>
                    <td className="px-4 py-2 text-center">64,166,780,222</td>
                    <td className="px-4 py-2 text-center">15,428,985,629</td>
                    <td className="px-4 py-2 text-center">131.66%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}></th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL DIRECTO</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,809</td>
                    <td className="px-4 py-2 text-center text-gray-900">20,264</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-2,545</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,291,328,343</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,583,997,615</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">4,292,669,272</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">141.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,809</td>
                    <td className="px-4 py-2 text-center text-gray-900">20,264</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-2,545</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,291,328,343</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,583,997,615</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">4,292,669,272</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">141.71%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL FILIALES</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,719</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,221</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-1,498</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">77.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,282,385,720</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,480,754,899</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-2,801,630,821</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">170.25%</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,719</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,221</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-1,498</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">77.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,282,385,720</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,480,754,899</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-2,801,630,821</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">170.25%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL PAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,162</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,184</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">22</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">101.93%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,086,444,392</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,321,978,298</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">1,235,533,906</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">117.44%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,162</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,184</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">22</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">101.93%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,086,444,392</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,321,978,298</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">1,235,533,906</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">117.44%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]" style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">30,689</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-4,020</td>
                    <td className="px-4 py-2 text-center">86.90%</td>
                    <td className="px-4 py-2 text-center">17,660,158,455</td>
                    <td className="px-4 py-2 text-center">23,386,730,812</td>
                    <td className="px-4 py-2 text-center">5,726,572,357</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">132.43%</td>
                    <td className="px-4 py-2 text-center">30,689</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-4,020</td>
                    <td className="px-4 py-2 text-center">86.90%</td>
                    <td className="px-4 py-2 text-center">17,660,158,455</td>
                    <td className="px-4 py-2 text-center">23,386,730,812</td>
                    <td className="px-4 py-2 text-center">5,726,572,357</td>
                    <td className="px-4 py-2 text-center">132.43%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}></th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,137</td>
                    <td className="px-4 py-2 text-center text-gray-900">387</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-1,750</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">18.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">150,664,910</td>
                    <td className="px-4 py-2 text-center text-gray-900">123,478,870</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-27,186,040</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">81.96%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,137</td>
                    <td className="px-4 py-2 text-center text-gray-900">387</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-1,750</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">18.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">150,664,910</td>
                    <td className="px-4 py-2 text-center text-gray-900">123,478,870</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-27,186,040</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">81.96%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP BOLSO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,594</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,994</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-600</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.95%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,704,189</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,684,762</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">2,980,573</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">152.25%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,594</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,994</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-600</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.95%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,704,189</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,684,762</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">2,980,573</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">152.25%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ARMAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">204</td>
                    <td className="px-4 py-2 text-center text-gray-900">176</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-28</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.49%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,029,218</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,083,123</td>
                    <td className="px-4 py-2 text-center font-bold text-black">5,053,905</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">225.43%</td>
                    <td className="px-4 py-2 text-center text-gray-900">204</td>
                    <td className="px-4 py-2 text-center text-gray-900">176</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-28</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.49%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,029,218</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,083,123</td>
                    <td className="px-4 py-2 text-center font-bold text-black">5,053,905</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">225.43%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">BOLSO PROTEGIDO</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,522</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,947</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-575</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.59%</td>
                    <td className="px-4 py-2 text-center text-gray-900">214,556,490</td>
                    <td className="px-4 py-2 text-center text-gray-900">323,744,516</td>
                    <td className="px-4 py-2 text-center font-bold text-black">109,188,026</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">150.89%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,522</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,947</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-575</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.59%</td>
                    <td className="px-4 py-2 text-center text-gray-900">214,556,490</td>
                    <td className="px-4 py-2 text-center text-gray-900">323,744,516</td>
                    <td className="px-4 py-2 text-center font-bold text-black">109,188,026</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">150.89%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ESCOLTA</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,386</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,589</td>
                    <td className="px-4 py-2 text-center font-bold text-black">203</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.51%</td>
                    <td className="px-4 py-2 text-center text-gray-900">70,923,821</td>
                    <td className="px-4 py-2 text-center text-gray-900">174,251,101</td>
                    <td className="px-4 py-2 text-center font-bold text-black">103,327,280</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">245.69%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,386</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,589</td>
                    <td className="px-4 py-2 text-center font-bold text-black">203</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.51%</td>
                    <td className="px-4 py-2 text-center text-gray-900">70,923,821</td>
                    <td className="px-4 py-2 text-center text-gray-900">174,251,101</td>
                    <td className="px-4 py-2 text-center font-bold text-black">103,327,280</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">245.69%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ESCOLTA EJERCITO</td>
                    <td className="px-4 py-2 text-center text-gray-900">72</td>
                    <td className="px-4 py-2 text-center text-gray-900">69</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">96.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">304,621,940</td>
                    <td className="px-4 py-2 text-center text-gray-900">445,644,686</td>
                    <td className="px-4 py-2 text-center font-bold text-black">141,022,746</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">146.29%</td>
                    <td className="px-4 py-2 text-center text-gray-900">72</td>
                    <td className="px-4 py-2 text-center text-gray-900">69</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">96.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">304,621,940</td>
                    <td className="px-4 py-2 text-center text-gray-900">445,644,686</td>
                    <td className="px-4 py-2 text-center font-bold text-black">141,022,746</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">146.29%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ROBO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,598,954</td>
                    <td className="px-4 py-2 text-center text-gray-900">37,669,275</td>
                    <td className="px-4 py-2 text-center font-bold text-black">8,070,321</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">127.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,598,954</td>
                    <td className="px-4 py-2 text-center text-gray-900">37,669,275</td>
                    <td className="px-4 py-2 text-center font-bold text-black">8,070,321</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">127.27%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SALDO DEUDOR</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">83.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,045,371,946</td>
                    <td className="px-4 py-2 text-center text-gray-900">659,929,483</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-385,442,463</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">63.13%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">83.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,045,371,946</td>
                    <td className="px-4 py-2 text-center text-gray-900">659,929,483</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-385,442,463</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">63.13%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SDJM</td>
                    <td className="px-4 py-2 text-center text-gray-900">98</td>
                    <td className="px-4 py-2 text-center text-gray-900">145</td>
                    <td className="px-4 py-2 text-center font-bold text-black">47</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">148.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">76,885,586</td>
                    <td className="px-4 py-2 text-center text-gray-900">142,087,469</td>
                    <td className="px-4 py-2 text-center font-bold text-black">65,201,883</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">184.80%</td>
                    <td className="px-4 py-2 text-center text-gray-900">98</td>
                    <td className="px-4 py-2 text-center text-gray-900">145</td>
                    <td className="px-4 py-2 text-center font-bold text-black">47</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">148.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">76,885,586</td>
                    <td className="px-4 py-2 text-center text-gray-900">142,087,469</td>
                    <td className="px-4 py-2 text-center font-bold text-black">65,201,883</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">184.80%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center text-gray-900">103</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">97.54%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,585,783,932</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,695,908,050</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,110,124,118</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">130.96%</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center text-gray-900">103</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">97.54%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,585,783,932</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,695,908,050</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,110,124,118</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">130.96%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,546</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,535</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-11</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">99.32%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,211,420</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,540,731</td>
                    <td className="px-4 py-2 text-center font-bold text-black">16,329,311</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">277.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,546</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,535</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-11</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">99.32%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,211,420</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,540,731</td>
                    <td className="px-4 py-2 text-center font-bold text-black">16,329,311</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">277.27%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">261</td>
                    <td className="px-4 py-2 text-center text-gray-900">234</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-27</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.76%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,212,940,934</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,160,455,325</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,947,514,391</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">127.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">261</td>
                    <td className="px-4 py-2 text-center text-gray-900">234</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-27</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.76%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,212,940,934</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,160,455,325</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,947,514,391</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">127.00%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO CON AHORRO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">65,664,706</td>
                    <td className="px-4 py-2 text-center text-gray-900">128,390,512</td>
                    <td className="px-4 py-2 text-center font-bold text-black">62,725,806</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">195.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">65,664,706</td>
                    <td className="px-4 py-2 text-center text-gray-900">128,390,512</td>
                    <td className="px-4 py-2 text-center font-bold text-black">62,725,806</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">195.52%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA DIBA</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,370,256,817</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,553,967,309</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,183,710,492</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">149.94%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,370,256,817</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,553,967,309</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,183,710,492</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">149.94%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">36</td>
                    <td className="px-4 py-2 text-center text-gray-900">33</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,688</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,481</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,207</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">66.99%</td>
                    <td className="px-4 py-2 text-center text-gray-900">36</td>
                    <td className="px-4 py-2 text-center text-gray-900">33</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,688</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,481</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,207</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">66.99%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL CON AHORRO</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,346</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,047</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,299</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.26%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,500,946,066</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,878,282,244</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,377,336,178</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">155.07%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,346</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,047</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,299</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.26%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,500,946,066</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,878,282,244</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,377,336,178</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">155.07%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA OBLIGATORIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">360</td>
                    <td className="px-4 py-2 text-center text-gray-900">390</td>
                    <td className="px-4 py-2 text-center font-bold text-black">30</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,990,838</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,608,876</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,618,038</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">150.94%</td>
                    <td className="px-4 py-2 text-center text-gray-900">360</td>
                    <td className="px-4 py-2 text-center text-gray-900">390</td>
                    <td className="px-4 py-2 text-center font-bold text-black">30</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,990,838</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,608,876</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,618,038</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">150.94%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">30,689</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-4,020</td>
                    <td className="px-4 py-2 text-center">86.90%</td>
                    <td className="px-4 py-2 text-center">17,660,158,455</td>
                    <td className="px-4 py-2 text-center">23,386,730,812</td>
                    <td className="px-4 py-2 text-center">5,726,572,357</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">132.43%</td>
                    <td className="px-4 py-2 text-center">30,689</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-4,020</td>
                    <td className="px-4 py-2 text-center">86.90%</td>
                    <td className="px-4 py-2 text-center">17,660,158,455</td>
                    <td className="px-4 py-2 text-center">23,386,730,812</td>
                    <td className="px-4 py-2 text-center">5,726,572,357</td>
                    <td className="px-4 py-2 text-center">132.43%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}></th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,137</td>
                    <td className="px-4 py-2 text-center text-gray-900">387</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-1,750</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">18.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">150,664,910</td>
                    <td className="px-4 py-2 text-center text-gray-900">123,478,870</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-27,186,040</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">81.96%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,137</td>
                    <td className="px-4 py-2 text-center text-gray-900">387</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-1,750</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">18.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">150,664,910</td>
                    <td className="px-4 py-2 text-center text-gray-900">123,478,870</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-27,186,040</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">81.96%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP BOLSO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,594</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,994</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-600</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.95%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,704,189</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,684,762</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">2,980,573</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">152.25%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,594</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,994</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-600</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.95%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,704,189</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,684,762</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">2,980,573</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">152.25%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ARMAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">204</td>
                    <td className="px-4 py-2 text-center text-gray-900">176</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-28</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.49%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,029,218</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,083,123</td>
                    <td className="px-4 py-2 text-center font-bold text-black">5,053,905</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">225.43%</td>
                    <td className="px-4 py-2 text-center text-gray-900">204</td>
                    <td className="px-4 py-2 text-center text-gray-900">176</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-28</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.49%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,029,218</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,083,123</td>
                    <td className="px-4 py-2 text-center font-bold text-black">5,053,905</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">225.43%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">BOLSO PROTEGIDO</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,522</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,947</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-575</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.59%</td>
                    <td className="px-4 py-2 text-center text-gray-900">214,556,490</td>
                    <td className="px-4 py-2 text-center text-gray-900">323,744,516</td>
                    <td className="px-4 py-2 text-center font-bold text-black">109,188,026</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">150.89%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,522</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,947</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-575</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.59%</td>
                    <td className="px-4 py-2 text-center text-gray-900">214,556,490</td>
                    <td className="px-4 py-2 text-center text-gray-900">323,744,516</td>
                    <td className="px-4 py-2 text-center font-bold text-black">109,188,026</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">150.89%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ESCOLTA</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,386</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,589</td>
                    <td className="px-4 py-2 text-center font-bold text-black">203</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.51%</td>
                    <td className="px-4 py-2 text-center text-gray-900">70,923,821</td>
                    <td className="px-4 py-2 text-center text-gray-900">174,251,101</td>
                    <td className="px-4 py-2 text-center font-bold text-black">103,327,280</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">245.69%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,386</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,589</td>
                    <td className="px-4 py-2 text-center font-bold text-black">203</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.51%</td>
                    <td className="px-4 py-2 text-center text-gray-900">70,923,821</td>
                    <td className="px-4 py-2 text-center text-gray-900">174,251,101</td>
                    <td className="px-4 py-2 text-center font-bold text-black">103,327,280</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">245.69%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ESCOLTA EJERCITO</td>
                    <td className="px-4 py-2 text-center text-gray-900">72</td>
                    <td className="px-4 py-2 text-center text-gray-900">69</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">96.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">304,621,940</td>
                    <td className="px-4 py-2 text-center text-gray-900">445,644,686</td>
                    <td className="px-4 py-2 text-center font-bold text-black">141,022,746</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">146.29%</td>
                    <td className="px-4 py-2 text-center text-gray-900">72</td>
                    <td className="px-4 py-2 text-center text-gray-900">69</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">96.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">304,621,940</td>
                    <td className="px-4 py-2 text-center text-gray-900">445,644,686</td>
                    <td className="px-4 py-2 text-center font-bold text-black">141,022,746</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">146.29%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ROBO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,598,954</td>
                    <td className="px-4 py-2 text-center text-gray-900">37,669,275</td>
                    <td className="px-4 py-2 text-center font-bold text-black">8,070,321</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">127.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,598,954</td>
                    <td className="px-4 py-2 text-center text-gray-900">37,669,275</td>
                    <td className="px-4 py-2 text-center font-bold text-black">8,070,321</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">127.27%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SALDO DEUDOR</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">83.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,045,371,946</td>
                    <td className="px-4 py-2 text-center text-gray-900">659,929,483</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-385,442,463</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">63.13%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">83.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,045,371,946</td>
                    <td className="px-4 py-2 text-center text-gray-900">659,929,483</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-385,442,463</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">63.13%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SDJM</td>
                    <td className="px-4 py-2 text-center text-gray-900">98</td>
                    <td className="px-4 py-2 text-center text-gray-900">145</td>
                    <td className="px-4 py-2 text-center font-bold text-black">47</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">148.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">76,885,586</td>
                    <td className="px-4 py-2 text-center text-gray-900">142,087,469</td>
                    <td className="px-4 py-2 text-center font-bold text-black">65,201,883</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">184.80%</td>
                    <td className="px-4 py-2 text-center text-gray-900">98</td>
                    <td className="px-4 py-2 text-center text-gray-900">145</td>
                    <td className="px-4 py-2 text-center font-bold text-black">47</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">148.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">76,885,586</td>
                    <td className="px-4 py-2 text-center text-gray-900">142,087,469</td>
                    <td className="px-4 py-2 text-center font-bold text-black">65,201,883</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">184.80%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center text-gray-900">103</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">97.54%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,585,783,932</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,695,908,050</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,110,124,118</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">130.96%</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center text-gray-900">103</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">97.54%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,585,783,932</td>
                    <td className="px-4 py-2 text-center text-gray-900">4,695,908,050</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,110,124,118</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">130.96%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,546</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,535</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-11</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">99.32%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,211,420</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,540,731</td>
                    <td className="px-4 py-2 text-center font-bold text-black">16,329,311</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">277.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,546</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,535</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-11</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">99.32%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,211,420</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,540,731</td>
                    <td className="px-4 py-2 text-center font-bold text-black">16,329,311</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">277.27%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">261</td>
                    <td className="px-4 py-2 text-center text-gray-900">234</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-27</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.76%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,212,940,934</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,160,455,325</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,947,514,391</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">127.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">261</td>
                    <td className="px-4 py-2 text-center text-gray-900">234</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-27</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.76%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,212,940,934</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,160,455,325</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,947,514,391</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">127.00%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO CON AHORRO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">65,664,706</td>
                    <td className="px-4 py-2 text-center text-gray-900">128,390,512</td>
                    <td className="px-4 py-2 text-center font-bold text-black">62,725,806</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">195.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">65,664,706</td>
                    <td className="px-4 py-2 text-center text-gray-900">128,390,512</td>
                    <td className="px-4 py-2 text-center font-bold text-black">62,725,806</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">195.52%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA DIBA</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,370,256,817</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,553,967,309</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,183,710,492</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">149.94%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,370,256,817</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,553,967,309</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,183,710,492</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">149.94%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">360</td>
                    <td className="px-4 py-2 text-center text-gray-900">390</td>
                    <td className="px-4 py-2 text-center font-bold text-black">30</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,990,838</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,608,876</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,618,038</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">150.94%</td>
                    <td className="px-4 py-2 text-center text-gray-900">360</td>
                    <td className="px-4 py-2 text-center text-gray-900">390</td>
                    <td className="px-4 py-2 text-center font-bold text-black">30</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,990,838</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,608,876</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,618,038</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">150.94%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL CON AHORRO</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">65,664,706</td>
                    <td className="px-4 py-2 text-center text-gray-900">128,390,512</td>
                    <td className="px-4 py-2 text-center font-bold text-black">62,725,806</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">195.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">65,664,706</td>
                    <td className="px-4 py-2 text-center text-gray-900">128,390,512</td>
                    <td className="px-4 py-2 text-center font-bold text-black">62,725,806</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">195.52%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA OBLIGATORIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">360</td>
                    <td className="px-4 py-2 text-center text-gray-900">390</td>
                    <td className="px-4 py-2 text-center font-bold text-black">30</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,990,838</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,608,876</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,618,038</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">150.94%</td>
                    <td className="px-4 py-2 text-center text-gray-900">360</td>
                    <td className="px-4 py-2 text-center text-gray-900">390</td>
                    <td className="px-4 py-2 text-center font-bold text-black">30</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">108.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,990,838</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,608,876</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,618,038</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">150.94%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">30,689</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-4,020</td>
                    <td className="px-4 py-2 text-center">86.90%</td>
                    <td className="px-4 py-2 text-center">17,660,158,455</td>
                    <td className="px-4 py-2 text-center">23,386,730,812</td>
                    <td className="px-4 py-2 text-center">5,726,572,357</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">132.43%</td>
                    <td className="px-4 py-2 text-center">30,689</td>
                    <td className="px-4 py-2 text-center">26,669</td>
                    <td className="px-4 py-2 text-center">-4,020</td>
                    <td className="px-4 py-2 text-center">86.90%</td>
                    <td className="px-4 py-2 text-center">17,660,158,455</td>
                    <td className="px-4 py-2 text-center">23,386,730,812</td>
                    <td className="px-4 py-2 text-center">5,726,572,357</td>
                    <td className="px-4 py-2 text-center">132.43%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}></th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL DIRECTO</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,187</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,607</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-3,580</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,347,993,572</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,431,509,543</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">83,515,971</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">102.49%</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,187</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,607</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-3,580</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,347,993,572</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,431,509,543</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">83,515,971</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">102.49%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL FILIALES</td>
                    <td className="px-4 py-2 text-center text-gray-900">24,544</td>
                    <td className="px-4 py-2 text-center text-gray-900">21,709</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-2,835</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.45%</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,264,686,039</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,421,091,618</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">3,156,405,579</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">150.38%</td>
                    <td className="px-4 py-2 text-center text-gray-900">24,544</td>
                    <td className="px-4 py-2 text-center text-gray-900">21,709</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-2,835</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.45%</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,264,686,039</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,421,091,618</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">3,156,405,579</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">150.38%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL PAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,271</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,315</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-2,956</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,184,917,665</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,557,570,196</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5,372,652,531</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">152.75%</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,271</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,315</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">-2,956</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,184,848,650</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,557,570,196</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5,372,721,546</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">152.75%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">83,002</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-9,371</td>
                    <td className="px-4 py-2 text-center">88.71%</td>
                    <td className="px-4 py-2 text-center">19,797,597,276</td>
                    <td className="px-4 py-2 text-center">28,410,171,357</td>
                    <td className="px-4 py-2 text-center">8,612,574,081</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">143.50%</td>
                    <td className="px-4 py-2 text-center">83,002</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-9,371</td>
                    <td className="px-4 py-2 text-center">88.71%</td>
                    <td className="px-4 py-2 text-center">19,797,528,261</td>
                    <td className="px-4 py-2 text-center">28,410,171,357</td>
                    <td className="px-4 py-2 text-center">8,612,643,096</td>
                    <td className="px-4 py-2 text-center">143.50%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}></th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AERONAVEGACIÓN</td>
                    <td className="px-4 py-2 text-center text-gray-900">6</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">127.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,671,704</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,056,851</td>
                    <td className="px-4 py-2 text-center font-bold text-black">18,385,147</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">339.65%</td>
                    <td className="px-4 py-2 text-center text-gray-900">6</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">127.27%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,671,704</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,056,851</td>
                    <td className="px-4 py-2 text-center font-bold text-black">18,385,147</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">339.65%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AP</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,832</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,893</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,939</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">72.87%</td>
                    <td className="px-4 py-2 text-center text-gray-900">207,758,268</td>
                    <td className="px-4 py-2 text-center text-gray-900">397,825,842</td>
                    <td className="px-4 py-2 text-center font-bold text-black">190,067,574</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">191.48%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,832</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,893</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,939</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">72.87%</td>
                    <td className="px-4 py-2 text-center text-gray-900">207,758,268</td>
                    <td className="px-4 py-2 text-center text-gray-900">397,825,842</td>
                    <td className="px-4 py-2 text-center font-bold text-black">190,067,574</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">191.48%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AUTOMOTORES</td>
                    <td className="px-4 py-2 text-center text-gray-900">28,804</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,872</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,932</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.82%</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,755,607,066</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,109,067,730</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,353,460,664</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">140.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">28,804</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,872</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,932</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.82%</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,755,607,066</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,109,067,730</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,353,460,664</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">140.33%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CASCOS</td>
                    <td className="px-4 py-2 text-center text-gray-900">94</td>
                    <td className="px-4 py-2 text-center text-gray-900">100</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">106.95%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,501,634</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,205,827</td>
                    <td className="px-4 py-2 text-center font-bold text-black">8,704,193</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">164.47%</td>
                    <td className="px-4 py-2 text-center text-gray-900">94</td>
                    <td className="px-4 py-2 text-center text-gray-900">100</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">106.95%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,501,634</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,205,827</td>
                    <td className="px-4 py-2 text-center font-bold text-black">8,704,193</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">164.47%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CAUCIÓN</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,381</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,415</td>
                    <td className="px-4 py-2 text-center font-bold text-black">34</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">102.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">266,687,584</td>
                    <td className="px-4 py-2 text-center text-gray-900">247,867,241</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-18,820,343</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">92.94%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,381</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,415</td>
                    <td className="px-4 py-2 text-center font-bold text-black">34</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">102.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">266,687,584</td>
                    <td className="px-4 py-2 text-center text-gray-900">247,867,241</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-18,820,343</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">92.94%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">COMBINADO FAMILIAR</td>
                    <td className="px-4 py-2 text-center text-gray-900">16,008</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,150</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,858</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.39%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,006,501,182</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,969,642,521</td>
                    <td className="px-4 py-2 text-center font-bold text-black">963,141,339</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">195.69%</td>
                    <td className="px-4 py-2 text-center text-gray-900">16,008</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,150</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,858</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.39%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,006,501,182</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,969,642,521</td>
                    <td className="px-4 py-2 text-center font-bold text-black">963,141,339</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">195.69%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">INCENDIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,085</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,098</td>
                    <td className="px-4 py-2 text-center font-bold text-black">13</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">101.24%</td>
                    <td className="px-4 py-2 text-center text-gray-900">321,674,338</td>
                    <td className="px-4 py-2 text-center text-gray-900">360,437,744</td>
                    <td className="px-4 py-2 text-center font-bold text-black">38,763,406</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">112.05%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,085</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,098</td>
                    <td className="px-4 py-2 text-center font-bold text-black">13</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">101.24%</td>
                    <td className="px-4 py-2 text-center text-gray-900">321,674,338</td>
                    <td className="px-4 py-2 text-center text-gray-900">360,437,744</td>
                    <td className="px-4 py-2 text-center font-bold text-black">38,763,406</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">112.05%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">INT. COMERCIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,177</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,088</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-89</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">92.44%</td>
                    <td className="px-4 py-2 text-center text-gray-900">254,853,827</td>
                    <td className="px-4 py-2 text-center text-gray-900">503,965,600</td>
                    <td className="px-4 py-2 text-center font-bold text-black">249,111,773</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">197.75%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,177</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,088</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-89</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">92.44%</td>
                    <td className="px-4 py-2 text-center text-gray-900">254,853,827</td>
                    <td className="px-4 py-2 text-center text-gray-900">503,965,600</td>
                    <td className="px-4 py-2 text-center font-bold text-black">249,111,773</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">197.75%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">INT. CONSORCIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">383</td>
                    <td className="px-4 py-2 text-center text-gray-900">358</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-25</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">93.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">81,924,312</td>
                    <td className="px-4 py-2 text-center text-gray-900">216,621,078</td>
                    <td className="px-4 py-2 text-center font-bold text-black">134,696,766</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">264.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">383</td>
                    <td className="px-4 py-2 text-center text-gray-900">358</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-25</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">93.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">81,924,312</td>
                    <td className="px-4 py-2 text-center text-gray-900">216,621,078</td>
                    <td className="px-4 py-2 text-center font-bold text-black">134,696,766</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">264.42%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">MOTOS</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,160</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,779</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-381</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">87.93%</td>
                    <td className="px-4 py-2 text-center text-gray-900">385,332,503</td>
                    <td className="px-4 py-2 text-center text-gray-900">773,443,504</td>
                    <td className="px-4 py-2 text-center font-bold text-black">388,111,001</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">200.72%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,160</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,779</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-381</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">87.93%</td>
                    <td className="px-4 py-2 text-center text-gray-900">385,332,503</td>
                    <td className="px-4 py-2 text-center text-gray-900">773,443,504</td>
                    <td className="px-4 py-2 text-center font-bold text-black">388,111,001</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">200.72%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">PRAXIS</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,761</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,885</td>
                    <td className="px-4 py-2 text-center font-bold text-black">124</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">107.04%</td>
                    <td className="px-4 py-2 text-center text-gray-900">118,912,892</td>
                    <td className="px-4 py-2 text-center text-gray-900">325,809,180</td>
                    <td className="px-4 py-2 text-center font-bold text-black">206,896,288</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">273.99%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,761</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,885</td>
                    <td className="px-4 py-2 text-center font-bold text-black">124</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">107.04%</td>
                    <td className="px-4 py-2 text-center text-gray-900">118,912,892</td>
                    <td className="px-4 py-2 text-center text-gray-900">325,809,180</td>
                    <td className="px-4 py-2 text-center font-bold text-black">206,896,288</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">273.99%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">RC</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,008</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,081</td>
                    <td className="px-4 py-2 text-center font-bold text-black">73</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">107.28%</td>
                    <td className="px-4 py-2 text-center text-gray-900">243,928,084</td>
                    <td className="px-4 py-2 text-center text-gray-900">314,655,120</td>
                    <td className="px-4 py-2 text-center font-bold text-black">70,727,036</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">129.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,008</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,081</td>
                    <td className="px-4 py-2 text-center font-bold text-black">73</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">107.28%</td>
                    <td className="px-4 py-2 text-center text-gray-900">243,928,084</td>
                    <td className="px-4 py-2 text-center text-gray-900">314,655,120</td>
                    <td className="px-4 py-2 text-center font-bold text-black">70,727,036</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">129.00%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ROBO</td>
                    <td className="px-4 py-2 text-center text-gray-900">294</td>
                    <td className="px-4 py-2 text-center text-gray-900">252</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-42</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">85.80%</td>
                    <td className="px-4 py-2 text-center text-gray-900">49,085,332</td>
                    <td className="px-4 py-2 text-center text-gray-900">119,425,509</td>
                    <td className="px-4 py-2 text-center font-bold text-black">70,340,177</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">243.30%</td>
                    <td className="px-4 py-2 text-center text-gray-900">294</td>
                    <td className="px-4 py-2 text-center text-gray-900">252</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-42</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">85.80%</td>
                    <td className="px-4 py-2 text-center text-gray-900">49,085,332</td>
                    <td className="px-4 py-2 text-center text-gray-900">119,425,509</td>
                    <td className="px-4 py-2 text-center font-bold text-black">70,340,177</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">243.30%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">RS. VS.</td>
                    <td className="px-4 py-2 text-center text-gray-900">185</td>
                    <td className="px-4 py-2 text-center text-gray-900">287</td>
                    <td className="px-4 py-2 text-center font-bold text-black">102</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">155.30%</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,618,726</td>
                    <td className="px-4 py-2 text-center text-gray-900">24,540,489</td>
                    <td className="px-4 py-2 text-center font-bold text-black">15,921,763</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">284.73%</td>
                    <td className="px-4 py-2 text-center text-gray-900">185</td>
                    <td className="px-4 py-2 text-center text-gray-900">287</td>
                    <td className="px-4 py-2 text-center font-bold text-black">102</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">155.30%</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,618,726</td>
                    <td className="px-4 py-2 text-center text-gray-900">24,540,489</td>
                    <td className="px-4 py-2 text-center font-bold text-black">15,921,763</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">284.73%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SALUD</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,947</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,468</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,479</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">556,165,467</td>
                    <td className="px-4 py-2 text-center text-gray-900">533,492,024</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-22,673,443</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">95.92%</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,947</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,468</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,479</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">556,165,467</td>
                    <td className="px-4 py-2 text-center text-gray-900">533,492,024</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-22,673,443</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">95.92%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEGURO TÉCNICO</td>
                    <td className="px-4 py-2 text-center text-gray-900">173</td>
                    <td className="px-4 py-2 text-center text-gray-900">132</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-41</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">76.43%</td>
                    <td className="px-4 py-2 text-center text-gray-900">199,172,158</td>
                    <td className="px-4 py-2 text-center text-gray-900">108,466,196</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-90,705,962</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">54.46%</td>
                    <td className="px-4 py-2 text-center text-gray-900">173</td>
                    <td className="px-4 py-2 text-center text-gray-900">132</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-41</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">76.43%</td>
                    <td className="px-4 py-2 text-center text-gray-900">199,172,158</td>
                    <td className="px-4 py-2 text-center text-gray-900">108,466,196</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-90,705,962</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">54.46%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SEPELIO INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center text-gray-900">6</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">11,928,467</td>
                    <td className="px-4 py-2 text-center text-gray-900">35,183,978</td>
                    <td className="px-4 py-2 text-center font-bold text-black">23,255,511</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">294.96%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center text-gray-900">6</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">11,928,467</td>
                    <td className="px-4 py-2 text-center text-gray-900">35,183,978</td>
                    <td className="px-4 py-2 text-center font-bold text-black">23,255,511</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">294.96%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">TRANSPORTES</td>
                    <td className="px-4 py-2 text-center text-gray-900">30</td>
                    <td className="px-4 py-2 text-center text-gray-900">22</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-8</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">74.07%</td>
                    <td className="px-4 py-2 text-center text-gray-900">38,531,353</td>
                    <td className="px-4 py-2 text-center text-gray-900">51,966,462</td>
                    <td className="px-4 py-2 text-center font-bold text-black">13,435,109</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">134.87%</td>
                    <td className="px-4 py-2 text-center text-gray-900">30</td>
                    <td className="px-4 py-2 text-center text-gray-900">22</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-8</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">74.07%</td>
                    <td className="px-4 py-2 text-center text-gray-900">38,531,353</td>
                    <td className="px-4 py-2 text-center text-gray-900">51,966,462</td>
                    <td className="px-4 py-2 text-center font-bold text-black">13,435,109</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">134.87%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA COLECTIVO</td>
                    <td className="px-4 py-2 text-center text-gray-900">230</td>
                    <td className="px-4 py-2 text-center text-gray-900">205</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-25</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.17%</td>
                    <td className="px-4 py-2 text-center text-gray-900">214,118,988</td>
                    <td className="px-4 py-2 text-center text-gray-900">151,592,394</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-62,526,594</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">70.80%</td>
                    <td className="px-4 py-2 text-center text-gray-900">230</td>
                    <td className="px-4 py-2 text-center text-gray-900">205</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-25</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.17%</td>
                    <td className="px-4 py-2 text-center text-gray-900">214,118,988</td>
                    <td className="px-4 py-2 text-center text-gray-900">151,592,394</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-62,526,594</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">70.80%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA INDIVIDUAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">299</td>
                    <td className="px-4 py-2 text-center text-gray-900">394</td>
                    <td className="px-4 py-2 text-center font-bold text-black">95</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">131.68%</td>
                    <td className="px-4 py-2 text-center text-gray-900">47,806,257</td>
                    <td className="px-4 py-2 text-center text-gray-900">54,756,960</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,950,703</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">114.54%</td>
                    <td className="px-4 py-2 text-center text-gray-900">299</td>
                    <td className="px-4 py-2 text-center text-gray-900">394</td>
                    <td className="px-4 py-2 text-center font-bold text-black">95</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">131.68%</td>
                    <td className="px-4 py-2 text-center text-gray-900">47,806,257</td>
                    <td className="px-4 py-2 text-center text-gray-900">54,756,960</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6,950,703</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">114.54%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VIDA OBLIGATORIO</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,141</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,138</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">99.76%</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,799,658</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,382,732</td>
                    <td className="px-4 py-2 text-center font-bold text-black">8,583,074</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">226.23%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,141</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,138</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">99.76%</td>
                    <td className="px-4 py-2 text-center text-gray-900">6,799,658</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,382,732</td>
                    <td className="px-4 py-2 text-center font-bold text-black">8,583,074</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">226.23%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">83,002</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-9,371</td>
                    <td className="px-4 py-2 text-center">88.71%</td>
                    <td className="px-4 py-2 text-center">19,797,597,276</td>
                    <td className="px-4 py-2 text-center">28,410,171,357</td>
                    <td className="px-4 py-2 text-center">8,612,574,081</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">143.50%</td>
                    <td className="px-4 py-2 text-center">83,002</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-9,371</td>
                    <td className="px-4 py-2 text-center">88.71%</td>
                    <td className="px-4 py-2 text-center">19,797,528,261</td>
                    <td className="px-4 py-2 text-center">28,410,171,357</td>
                    <td className="px-4 py-2 text-center">8,612,574,081</td>
                    <td className="px-4 py-2 text-center">143.50%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}></th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">AFIANZADORA</td>
                    <td className="px-4 py-2 text-center text-gray-900">133</td>
                    <td className="px-4 py-2 text-center text-gray-900">213</td>
                    <td className="px-4 py-2 text-center font-bold text-black">80</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">160.03%</td>
                    <td className="px-4 py-2 text-center text-gray-900">34,773,612</td>
                    <td className="px-4 py-2 text-center text-gray-900">30,786,112</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3,987,500</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">88.53%</td>
                    <td className="px-4 py-2 text-center text-gray-900">133</td>
                    <td className="px-4 py-2 text-center text-gray-900">213</td>
                    <td className="px-4 py-2 text-center font-bold text-black">80</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">160.03%</td>
                    <td className="px-4 py-2 text-center text-gray-900">34,773,612</td>
                    <td className="px-4 py-2 text-center text-gray-900">30,786,112</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3,987,500</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">88.53%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ALLIANZ</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,720</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,325</td>
                    <td className="px-4 py-2 text-center font-bold text-black">605</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">135.14%</td>
                    <td className="px-4 py-2 text-center text-gray-900">468,345,810</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,041,865,659</td>
                    <td className="px-4 py-2 text-center font-bold text-black">573,519,849</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">222.46%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,720</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,325</td>
                    <td className="px-4 py-2 text-center font-bold text-black">605</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">135.14%</td>
                    <td className="px-4 py-2 text-center text-gray-900">468,345,810</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,041,865,659</td>
                    <td className="px-4 py-2 text-center font-bold text-black">573,519,849</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">222.46%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ATM</td>
                    <td className="px-4 py-2 text-center text-gray-900">564</td>
                    <td className="px-4 py-2 text-center text-gray-900">716</td>
                    <td className="px-4 py-2 text-center font-bold text-black">152</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">126.88%</td>
                    <td className="px-4 py-2 text-center text-gray-900">68,995,069</td>
                    <td className="px-4 py-2 text-center text-gray-900">138,493,339</td>
                    <td className="px-4 py-2 text-center font-bold text-black">69,498,270</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">200.73%</td>
                    <td className="px-4 py-2 text-center text-gray-900">564</td>
                    <td className="px-4 py-2 text-center text-gray-900">716</td>
                    <td className="px-4 py-2 text-center font-bold text-black">152</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">126.88%</td>
                    <td className="px-4 py-2 text-center text-gray-900">68,995,069</td>
                    <td className="px-4 py-2 text-center text-gray-900">138,493,339</td>
                    <td className="px-4 py-2 text-center font-bold text-black">69,498,270</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">200.73%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">BOSTON</td>
                    <td className="px-4 py-2 text-center text-gray-900">20</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-19</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5.05%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,375,720</td>
                    <td className="px-4 py-2 text-center text-gray-900">74,379</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-13,301,341</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.56%</td>
                    <td className="px-4 py-2 text-center text-gray-900">20</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-19</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5.05%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,375,720</td>
                    <td className="px-4 py-2 text-center text-gray-900">74,379</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-13,301,341</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.56%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CAUCIONES</td>
                    <td className="px-4 py-2 text-center text-gray-900">21</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-8</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">62.20%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,984,842</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,390,887</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-6,593,955</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">17.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">21</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-8</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">62.20%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,984,842</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,390,887</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-6,593,955</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">17.42%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CHUBB</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center text-gray-900">15</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-91</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">14.20%</td>
                    <td className="px-4 py-2 text-center text-gray-900">23,697,464</td>
                    <td className="px-4 py-2 text-center text-gray-900">18,972,684</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-4,724,780</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">80.06%</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center text-gray-900">15</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-91</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">14.20%</td>
                    <td className="px-4 py-2 text-center text-gray-900">23,697,464</td>
                    <td className="px-4 py-2 text-center text-gray-900">18,972,684</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-4,724,780</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">80.06%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">FED PAT</td>
                    <td className="px-4 py-2 text-center text-gray-900">870</td>
                    <td className="px-4 py-2 text-center text-gray-900">959</td>
                    <td className="px-4 py-2 text-center font-bold text-black">89</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">110.22%</td>
                    <td className="px-4 py-2 text-center text-gray-900">456,658,035</td>
                    <td className="px-4 py-2 text-center text-gray-900">531,237,711</td>
                    <td className="px-4 py-2 text-center font-bold text-black">74,579,676</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">116.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">870</td>
                    <td className="px-4 py-2 text-center text-gray-900">959</td>
                    <td className="px-4 py-2 text-center font-bold text-black">89</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">110.22%</td>
                    <td className="px-4 py-2 text-center text-gray-900">456,658,035</td>
                    <td className="px-4 py-2 text-center text-gray-900">531,237,711</td>
                    <td className="px-4 py-2 text-center font-bold text-black">74,579,676</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">116.33%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">HDI</td>
                    <td className="px-4 py-2 text-center text-gray-900">10</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">70.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,096,737</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,321,757</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,225,020</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">211.70%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10</td>
                    <td className="px-4 py-2 text-center text-gray-900">7</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">70.71%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,096,737</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,321,757</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,225,020</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">211.70%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">INTEGRITY</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,686</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,619</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-67</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">96.01%</td>
                    <td className="px-4 py-2 text-center text-gray-900">467,282,914</td>
                    <td className="px-4 py-2 text-center text-gray-900">543,840,130</td>
                    <td className="px-4 py-2 text-center font-bold text-black">76,557,216</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">116.38%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,686</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,619</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-67</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">96.01%</td>
                    <td className="px-4 py-2 text-center text-gray-900">467,282,914</td>
                    <td className="px-4 py-2 text-center text-gray-900">543,840,130</td>
                    <td className="px-4 py-2 text-center font-bold text-black">76,557,216</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">116.38%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">LA HOLANDO</td>
                    <td className="px-4 py-2 text-center text-gray-900">77</td>
                    <td className="px-4 py-2 text-center text-gray-900">62</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-15</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">80.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,216,393</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,875,658</td>
                    <td className="px-4 py-2 text-center font-bold text-black">5,659,265</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">155.39%</td>
                    <td className="px-4 py-2 text-center text-gray-900">77</td>
                    <td className="px-4 py-2 text-center text-gray-900">62</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-15</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">80.52%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,216,393</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,875,658</td>
                    <td className="px-4 py-2 text-center font-bold text-black">5,659,265</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">155.39%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">LIBRA</td>
                    <td className="px-4 py-2 text-center text-gray-900">872</td>
                    <td className="px-4 py-2 text-center text-gray-900">490</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-382</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">56.17%</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,619,650</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,769,511</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,850,139</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">66.93%</td>
                    <td className="px-4 py-2 text-center text-gray-900">872</td>
                    <td className="px-4 py-2 text-center text-gray-900">490</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-382</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">56.17%</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,619,650</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,769,511</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,850,139</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">66.93%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">LMA</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,693</td>
                    <td className="px-4 py-2 text-center text-gray-900">23,454</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3,239</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">87.87%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,029,394,074</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,590,435,724</td>
                    <td className="px-4 py-2 text-center font-bold text-black">4,561,041,650</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">190.69%</td>
                    <td className="px-4 py-2 text-center text-gray-900">26,693</td>
                    <td className="px-4 py-2 text-center text-gray-900">23,454</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3,239</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">87.87%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,029,394,074</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,590,435,724</td>
                    <td className="px-4 py-2 text-center font-bold text-black">4,561,041,650</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">190.69%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">NACIÓN</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,305</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-19,305</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">19,305</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-19,305</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.00%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">NOBLE</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">83.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,491,130</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,304,418</td>
                    <td className="px-4 py-2 text-center font-bold text-black">3,813,288</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">140.18%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">83.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,491,130</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,304,418</td>
                    <td className="px-4 py-2 text-center font-bold text-black">3,813,288</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">140.18%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">PRUDENCIA</td>
                    <td className="px-4 py-2 text-center text-gray-900">292</td>
                    <td className="px-4 py-2 text-center text-gray-900">333</td>
                    <td className="px-4 py-2 text-center font-bold text-black">41</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">114.24%</td>
                    <td className="px-4 py-2 text-center text-gray-900">69,618,953</td>
                    <td className="px-4 py-2 text-center text-gray-900">129,736,655</td>
                    <td className="px-4 py-2 text-center font-bold text-black">60,117,702</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">186.35%</td>
                    <td className="px-4 py-2 text-center text-gray-900">292</td>
                    <td className="px-4 py-2 text-center text-gray-900">333</td>
                    <td className="px-4 py-2 text-center font-bold text-black">41</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">114.24%</td>
                    <td className="px-4 py-2 text-center text-gray-900">69,618,953</td>
                    <td className="px-4 py-2 text-center text-gray-900">129,736,655</td>
                    <td className="px-4 py-2 text-center font-bold text-black">60,117,702</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">186.35%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">RIVADAVIA</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center text-gray-900">48</td>
                    <td className="px-4 py-2 text-center font-bold text-black">37</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">436.36%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,879,450</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,280,185</td>
                    <td className="px-4 py-2 text-center font-bold text-black">18,400,735</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">574.31%</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center text-gray-900">48</td>
                    <td className="px-4 py-2 text-center font-bold text-black">37</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">436.36%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,879,450</td>
                    <td className="px-4 py-2 text-center text-gray-900">22,280,185</td>
                    <td className="px-4 py-2 text-center font-bold text-black">18,400,735</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">574.31%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">RUS</td>
                    <td className="px-4 py-2 text-center text-gray-900">12</td>
                    <td className="px-4 py-2 text-center text-gray-900">9</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">74.38%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,236,892</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,311,881</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,074,989</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">148.06%</td>
                    <td className="px-4 py-2 text-center text-gray-900">12</td>
                    <td className="px-4 py-2 text-center text-gray-900">9</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">74.38%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,236,892</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,311,881</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,074,989</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">148.06%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SANCOR</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,143</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,256</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,887</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">63.32%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,477,226,027</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,826,362,279</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,349,136,252</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">191.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">5,143</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,256</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,887</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">63.32%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,477,226,027</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,826,362,279</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,349,136,252</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">191.33%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SMG</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,765</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,746</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-4,019</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,739,447,416</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,404,213,055</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,664,765,639</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">115.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">29,765</td>
                    <td className="px-4 py-2 text-center text-gray-900">25,746</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-4,019</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.50%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,739,447,416</td>
                    <td className="px-4 py-2 text-center text-gray-900">12,404,213,055</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,664,765,639</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">115.50%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SMG LIFE</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,717</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,295</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,422</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.34%</td>
                    <td className="px-4 py-2 text-center text-gray-900">788,889,347</td>
                    <td className="px-4 py-2 text-center text-gray-900">684,862,351</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-104,026,996</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">86.81%</td>
                    <td className="px-4 py-2 text-center text-gray-900">14,717</td>
                    <td className="px-4 py-2 text-center text-gray-900">13,295</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,422</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.34%</td>
                    <td className="px-4 py-2 text-center text-gray-900">788,889,347</td>
                    <td className="px-4 py-2 text-center text-gray-900">684,862,351</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-104,026,996</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">86.81%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">TPC</td>
                    <td className="px-4 py-2 text-center text-gray-900">22</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-22</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">121,091</td>
                    <td className="px-4 py-2 text-center text-gray-900">20,927</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-100,164</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">17.28%</td>
                    <td className="px-4 py-2 text-center text-gray-900">22</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-22</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">0.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">121,091</td>
                    <td className="px-4 py-2 text-center text-gray-900">20,927</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-100,164</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">17.28%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VICTORIA</td>
                    <td className="px-4 py-2 text-center text-gray-900">51</td>
                    <td className="px-4 py-2 text-center text-gray-900">214</td>
                    <td className="px-4 py-2 text-center font-bold text-black">163</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">422.92%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,716,301</td>
                    <td className="px-4 py-2 text-center text-gray-900">55,348,609</td>
                    <td className="px-4 py-2 text-center font-bold text-black">44,632,308</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">516.49%</td>
                    <td className="px-4 py-2 text-center text-gray-900">51</td>
                    <td className="px-4 py-2 text-center text-gray-900">214</td>
                    <td className="px-4 py-2 text-center font-bold text-black">163</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">422.92%</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,716,301</td>
                    <td className="px-4 py-2 text-center text-gray-900">55,348,609</td>
                    <td className="px-4 py-2 text-center font-bold text-black">44,632,308</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">516.49%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ZURICH</td>
                    <td className="px-4 py-2 text-center text-gray-900">9</td>
                    <td className="px-4 py-2 text-center text-gray-900">2</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-7</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">22.73%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,422,922</td>
                    <td className="px-4 py-2 text-center text-gray-900">96,455</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3,326,467</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">2.82%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9</td>
                    <td className="px-4 py-2 text-center text-gray-900">2</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-7</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">22.73%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,422,922</td>
                    <td className="px-4 py-2 text-center text-gray-900">96,455</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-3,326,467</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">2.82%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">COSENA</td>
                    <td className="px-4 py-2 text-center text-gray-900">150</td>
                    <td className="px-4 py-2 text-center text-gray-900">218</td>
                    <td className="px-4 py-2 text-center font-bold text-black">68</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">145.72%</td>
                    <td className="px-4 py-2 text-center text-gray-900">92,571,694</td>
                    <td className="px-4 py-2 text-center text-gray-900">52,853,317</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-39,718,377</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">57.09%</td>
                    <td className="px-4 py-2 text-center text-gray-900">150</td>
                    <td className="px-4 py-2 text-center text-gray-900">218</td>
                    <td className="px-4 py-2 text-center font-bold text-black">68</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">145.72%</td>
                    <td className="px-4 py-2 text-center text-gray-900">92,571,694</td>
                    <td className="px-4 py-2 text-center text-gray-900">52,853,317</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-39,718,377</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">57.09%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SAN CRISTOBAL</td>
                    <td className="px-4 py-2 text-center text-gray-900">45</td>
                    <td className="px-4 py-2 text-center text-gray-900">621</td>
                    <td className="px-4 py-2 text-center font-bold text-black">576</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">1375.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,516,428</td>
                    <td className="px-4 py-2 text-center text-gray-900">296,318,204</td>
                    <td className="px-4 py-2 text-center font-bold text-black">286,801,776</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">3113.75%</td>
                    <td className="px-4 py-2 text-center text-gray-900">45</td>
                    <td className="px-4 py-2 text-center text-gray-900">621</td>
                    <td className="px-4 py-2 text-center font-bold text-black">576</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">1375.42%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9,447,413</td>
                    <td className="px-4 py-2 text-center text-gray-900">296,318,204</td>
                    <td className="px-4 py-2 text-center font-bold text-black">286,870,791</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">3136.50%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">83,002</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-9,371</td>
                    <td className="px-4 py-2 text-center">88.71%</td>
                    <td className="px-4 py-2 text-center">19,797,597,276</td>
                    <td className="px-4 py-2 text-center">28,410,171,357</td>
                    <td className="px-4 py-2 text-center">8,612,574,081</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">143.50%</td>
                    <td className="px-4 py-2 text-center">83,002</td>
                    <td className="px-4 py-2 text-center">73,631</td>
                    <td className="px-4 py-2 text-center">-9,371</td>
                    <td className="px-4 py-2 text-center">88.71%</td>
                    <td className="px-4 py-2 text-center">19,797,528,261</td>
                    <td className="px-4 py-2 text-center">28,410,171,357</td>
                    <td className="px-4 py-2 text-center">8,612,574,081</td>
                    <td className="px-4 py-2 text-center">143.50%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}></th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL DIRECTO</td>
                    <td className="px-4 py-2 text-center text-gray-900">129</td>
                    <td className="px-4 py-2 text-center text-gray-900">163</td>
                    <td className="px-4 py-2 text-center font-bold text-black">34</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">126.65%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,929,186,735</td>
                    <td className="px-4 py-2 text-center text-gray-900">103,530,955</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,825,655,780</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">5.37%</td>
                    <td className="px-4 py-2 text-center text-gray-900">129</td>
                    <td className="px-4 py-2 text-center text-gray-900">163</td>
                    <td className="px-4 py-2 text-center font-bold text-black">34</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">126.65%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,929,186,735</td>
                    <td className="px-4 py-2 text-center text-gray-900">103,530,955</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-1,825,655,780</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">5.37%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL FILIALES</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,118</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,004</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-114</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">920,720,699</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,700,404,796</td>
                    <td className="px-4 py-2 text-center font-bold text-black">779,684,097</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">184.68%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,118</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,004</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-114</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">89.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">920,720,699</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,700,404,796</td>
                    <td className="px-4 py-2 text-center font-bold text-black">779,684,097</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">184.68%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">CANAL PAS</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,322</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,178</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-144</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">93.79%</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,430,200,442</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,565,942,302</td>
                    <td className="px-4 py-2 text-center font-bold text-black">2,135,741,860</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">125.33%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,322</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,178</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-144</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">93.79%</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,430,200,442</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,565,942,302</td>
                    <td className="px-4 py-2 text-center font-bold text-black">2,135,741,860</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">125.33%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">3,568</td>
                    <td className="px-4 py-2 text-center">3,345</td>
                    <td className="px-4 py-2 text-center">-223</td>
                    <td className="px-4 py-2 text-center">93.74%</td>
                    <td className="px-4 py-2 text-center">11,280,107,876</td>
                    <td className="px-4 py-2 text-center">12,369,878,053</td>
                    <td className="px-4 py-2 text-center">1,089,770,177</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">109.66%</td>
                    <td className="px-4 py-2 text-center">3,568</td>
                    <td className="px-4 py-2 text-center">3,345</td>
                    <td className="px-4 py-2 text-center">-223</td>
                    <td className="px-4 py-2 text-center">93.74%</td>
                    <td className="px-4 py-2 text-center">11,280,107,876</td>
                    <td className="px-4 py-2 text-center">12,369,878,053</td>
                    <td className="px-4 py-2 text-center">1,089,770,177</td>
                    <td className="px-4 py-2 text-center">109.66%</td>
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
                    <th className="px-4 py-3 text-left font-bold border-r-2 border-black" style={{backgroundColor: '#6c757d'}}></th>
                    <th className="px-4 py-3 text-center font-bold border-r-2 border-black" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO YTD 202506</th>
                    <th className="px-4 py-3 text-center font-bold" colSpan={8} style={{backgroundColor: '#6c757d'}}>CUMP. PPTO TOTAL 202506</th>
                  </tr>
                  <tr style={{backgroundColor: '#00AEEF'}}>
                    <th className="px-4 py-2 text-left font-semibold text-white border-r-2 border-black"></th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white border-r-2 border-black">% R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO Q PÓL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% Q POL</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">PPTO R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">REAL R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">DIF R12</th>
                    <th className="px-4 py-2 text-center font-semibold text-white">% R12</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ANDINA ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">80</td>
                    <td className="px-4 py-2 text-center text-gray-900">244</td>
                    <td className="px-4 py-2 text-center font-bold text-black">164</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">303.86%</td>
                    <td className="px-4 py-2 text-center text-gray-900">249,262,744</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,479,829,623</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,230,566,879</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">593.68%</td>
                    <td className="px-4 py-2 text-center text-gray-900">80</td>
                    <td className="px-4 py-2 text-center text-gray-900">244</td>
                    <td className="px-4 py-2 text-center font-bold text-black">164</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">303.86%</td>
                    <td className="px-4 py-2 text-center text-gray-900">249,262,744</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,479,829,623</td>
                    <td className="px-4 py-2 text-center font-bold text-black">1,230,566,879</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">593.68%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">ASOCIART ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">355</td>
                    <td className="px-4 py-2 text-center text-gray-900">361</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">101.60%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,434,247,820</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,575,358,075</td>
                    <td className="px-4 py-2 text-center font-bold text-black">141,110,255</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">105.80%</td>
                    <td className="px-4 py-2 text-center text-gray-900">355</td>
                    <td className="px-4 py-2 text-center text-gray-900">361</td>
                    <td className="px-4 py-2 text-center font-bold text-black">6</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">101.60%</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,434,247,820</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,575,358,075</td>
                    <td className="px-4 py-2 text-center font-bold text-black">141,110,255</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">105.80%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">EXPERTA ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">31</td>
                    <td className="px-4 py-2 text-center text-gray-900">23</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-8</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">74.68%</td>
                    <td className="px-4 py-2 text-center text-gray-900">207,269,843</td>
                    <td className="px-4 py-2 text-center text-gray-900">309,246,420</td>
                    <td className="px-4 py-2 text-center font-bold text-black">101,976,577</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">149.20%</td>
                    <td className="px-4 py-2 text-center text-gray-900">31</td>
                    <td className="px-4 py-2 text-center text-gray-900">23</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-8</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">74.68%</td>
                    <td className="px-4 py-2 text-center text-gray-900">207,269,843</td>
                    <td className="px-4 py-2 text-center text-gray-900">309,246,420</td>
                    <td className="px-4 py-2 text-center font-bold text-black">101,976,577</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">149.20%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">FED PAT</td>
                    <td className="px-4 py-2 text-center text-gray-900">145</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-39</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">73.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,510,241,215</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,069,467,626</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,440,773,589</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">30.47%</td>
                    <td className="px-4 py-2 text-center text-gray-900">145</td>
                    <td className="px-4 py-2 text-center text-gray-900">106</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-39</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">73.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">3,510,241,215</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,069,467,626</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-2,440,773,589</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">30.47%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">GALENO ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">8</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-5</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">60.61%</td>
                    <td className="px-4 py-2 text-center text-gray-900">99,406,156</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,885,655</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-88,520,501</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">10.95%</td>
                    <td className="px-4 py-2 text-center text-gray-900">13</td>
                    <td className="px-4 py-2 text-center text-gray-900">8</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-5</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">60.61%</td>
                    <td className="px-4 py-2 text-center text-gray-900">99,406,156</td>
                    <td className="px-4 py-2 text-center text-gray-900">10,885,655</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-88,520,501</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">10.95%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">LA HOLANDO ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">9</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-black">2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">125.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,212,754</td>
                    <td className="px-4 py-2 text-center text-gray-900">248,271,635</td>
                    <td className="px-4 py-2 text-center font-bold text-black">216,058,881</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">770.72%</td>
                    <td className="px-4 py-2 text-center text-gray-900">9</td>
                    <td className="px-4 py-2 text-center text-gray-900">11</td>
                    <td className="px-4 py-2 text-center font-bold text-black">2</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">125.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">32,212,754</td>
                    <td className="px-4 py-2 text-center text-gray-900">248,271,635</td>
                    <td className="px-4 py-2 text-center font-bold text-black">216,058,881</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">770.72%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">OMINT ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,483,665</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,405,747</td>
                    <td className="px-4 py-2 text-center font-bold text-black">922,082</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">112.32%</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">0</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">90.91%</td>
                    <td className="px-4 py-2 text-center text-gray-900">7,483,665</td>
                    <td className="px-4 py-2 text-center text-gray-900">8,405,747</td>
                    <td className="px-4 py-2 text-center font-bold text-black">922,082</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">112.32%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">PREVENCION ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,737</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,590</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-147</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">91.54%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,816,265,019</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,745,633,959</td>
                    <td className="px-4 py-2 text-center font-bold text-black">929,368,940</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">151.17%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,737</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,590</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-147</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">91.54%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,816,265,019</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,745,633,959</td>
                    <td className="px-4 py-2 text-center font-bold text-black">929,368,940</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">151.17%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">PROVINCIA ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">631</td>
                    <td className="px-4 py-2 text-center text-gray-900">534</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-97</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">84.57%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,605,055,462</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,361,201,528</td>
                    <td className="px-4 py-2 text-center font-bold text-black">756,146,066</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">147.11%</td>
                    <td className="px-4 py-2 text-center text-gray-900">631</td>
                    <td className="px-4 py-2 text-center text-gray-900">534</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-97</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">84.57%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,605,055,462</td>
                    <td className="px-4 py-2 text-center text-gray-900">2,361,201,528</td>
                    <td className="px-4 py-2 text-center font-bold text-black">756,146,066</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">147.11%</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">SMG ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">562</td>
                    <td className="px-4 py-2 text-center text-gray-900">460</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-102</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">81.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,318,663,198</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,546,534,132</td>
                    <td className="px-4 py-2 text-center font-bold text-black">227,870,934</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">117.28%</td>
                    <td className="px-4 py-2 text-center text-gray-900">562</td>
                    <td className="px-4 py-2 text-center text-gray-900">460</td>
                    <td className="px-4 py-2 text-center font-bold text-black">-102</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">81.84%</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,318,663,198</td>
                    <td className="px-4 py-2 text-center text-gray-900">1,546,534,132</td>
                    <td className="px-4 py-2 text-center font-bold text-black">227,870,934</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">117.28%</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900 border-r-2 border-black">VICTORIA ART</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">100.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,043,652</td>
                    <td className="px-4 py-2 text-center font-bold text-black">15,043,652</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900 border-r-2 border-black">100.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center text-gray-900">4</td>
                    <td className="px-4 py-2 text-center font-bold text-black">4</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">100.00%</td>
                    <td className="px-4 py-2 text-center text-gray-900">-</td>
                    <td className="px-4 py-2 text-center text-gray-900">15,043,652</td>
                    <td className="px-4 py-2 text-center font-bold text-black">15,043,652</td>
                    <td className="px-4 py-2 text-center font-bold text-gray-900">100.00%</td>
                  </tr>
                  <tr className="text-white font-bold border-b hover:bg-[#3382af85]"style={{backgroundColor: '#007DC5'}}>
                    <td className="px-4 py-2 border-r-2 border-black">Total general</td>
                    <td className="px-4 py-2 text-center">3,568</td>
                    <td className="px-4 py-2 text-center">3,345</td>
                    <td className="px-4 py-2 text-center">-223</td>
                    <td className="px-4 py-2 text-center">93.74%</td>
                    <td className="px-4 py-2 text-center">11,280,107,876</td>
                    <td className="px-4 py-2 text-center">12,369,878,053</td>
                    <td className="px-4 py-2 text-center">1,089,770,177</td>
                    <td className="px-4 py-2 text-center border-r-2 border-black">109.66%</td>
                    <td className="px-4 py-2 text-center">3,568</td>
                    <td className="px-4 py-2 text-center">3,345</td>
                    <td className="px-4 py-2 text-center">-223</td>
                    <td className="px-4 py-2 text-center">93.74%</td>
                    <td className="px-4 py-2 text-center">11,280,107,876</td>
                    <td className="px-4 py-2 text-center">12,369,878,053</td>
                    <td className="px-4 py-2 text-center">1,089,770,177</td>
                    <td className="px-4 py-2 text-center">109.66%</td>
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
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900">Auto</td>
                    <td className="px-4 py-2 text-center">$ 45,200</td>
                    <td className="px-4 py-2 text-center">$ 48,500</td>
                    <td className="px-4 py-2 text-center">$ 52,100</td>
                    <td className="px-4 py-2 text-center">$ 55,800</td>
                    <td className="px-4 py-2 text-center">$ 59,200</td>
                    <td className="px-4 py-2 text-center">$ 62,500</td>
                    <td className="px-4 py-2 text-center">$ 323,300</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900">Hogar</td>
                    <td className="px-4 py-2 text-center">$ 32,800</td>
                    <td className="px-4 py-2 text-center">$ 35,200</td>
                    <td className="px-4 py-2 text-center">$ 37,900</td>
                    <td className="px-4 py-2 text-center">$ 40,500</td>
                    <td className="px-4 py-2 text-center">$ 43,100</td>
                    <td className="px-4 py-2 text-center">$ 45,800</td>
                    <td className="px-4 py-2 text-center">$ 235,300</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900">Salud</td>
                    <td className="px-4 py-2 text-center">$ 28,500</td>
                    <td className="px-4 py-2 text-center">$ 30,200</td>
                    <td className="px-4 py-2 text-center">$ 32,100</td>
                    <td className="px-4 py-2 text-center">$ 34,000</td>
                    <td className="px-4 py-2 text-center">$ 36,200</td>
                    <td className="px-4 py-2 text-center">$ 38,500</td>
                    <td className="px-4 py-2 text-center">$ 199,500</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900">Vida</td>
                    <td className="px-4 py-2 text-center">$ 25,100</td>
                    <td className="px-4 py-2 text-center">$ 26,800</td>
                    <td className="px-4 py-2 text-center">$ 28,500</td>
                    <td className="px-4 py-2 text-center">$ 30,200</td>
                    <td className="px-4 py-2 text-center">$ 32,000</td>
                    <td className="px-4 py-2 text-center">$ 33,800</td>
                    <td className="px-4 py-2 text-center">$ 176,400</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900">Bolso</td>
                    <td className="px-4 py-2 text-center">$ 18,200</td>
                    <td className="px-4 py-2 text-center">$ 19,500</td>
                    <td className="px-4 py-2 text-center">$ 20,800</td>
                    <td className="px-4 py-2 text-center">$ 22,100</td>
                    <td className="px-4 py-2 text-center">$ 23,500</td>
                    <td className="px-4 py-2 text-center">$ 24,800</td>
                    <td className="px-4 py-2 text-center">$ 128,900</td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-b hover:bg-[#3382af85]">
                    <td className="px-4 py-2 font-medium text-gray-900">Sepelio</td>
                    <td className="px-4 py-2 text-center">$ 15,800</td>
                    <td className="px-4 py-2 text-center">$ 16,500</td>
                    <td className="px-4 py-2 text-center">$ 17,200</td>
                    <td className="px-4 py-2 text-center">$ 18,000</td>
                    <td className="px-4 py-2 text-center">$ 18,800</td>
                    <td className="px-4 py-2 text-center">$ 19,600</td>
                    <td className="px-4 py-2 text-center">$ 105,900</td>
                  </tr>
                  <tr className="bg-white border-b border-b hover:bg-[#3382af85]">
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
        ) : (tipoVista === 'TOTAL X CÍA' || tipoVista === 'TOTAL X CANAL' || tipoVista === 'TOTAL X RAMO' || tipoVista === 'CAS X CANAL' || tipoVista === 'CAS X RAMO' || tipoVista === 'ASSA X CANAL' || tipoVista === 'ASSA X RAMO' || tipoVista === 'ASSA X CÍA' || tipoVista === 'ART X CANAL' || tipoVista === 'ART X CÍA' || (!showAssaTable && !showFilialesTable && !showPasTable && !showCallCenterTable && !showFilialesPasTable)) ? (
          <>
            {/* Gráficos de cumplimiento presupuestario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HighchartsChart
                id="cumplimiento-r12"
                type="column"
                title=""
                data={cumplimientoR12Data}
              />
              <HighchartsChart
                id="cumplimiento-qpol"
                type="line"
                title=""
                data={cumplimientoQPolData}
              />
            </div>
          </>
        ) : null}
      </div>
  );
} 
