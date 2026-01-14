// src/app/evolucion-de-la-cartera/evolucionUtils.ts

/**
 * Retorna la clase CSS de color según el valor numérico
 */
export const getDifColor = (value: string | number) => {
    const numericValue = typeof value === 'string'
        ? parseFloat(value.replace(/,/g, '').replace('%', ''))
        : value;

    if (numericValue < 0) return 'text-red-600 font-semibold';
    if (numericValue > 0) return 'text-green-600 font-semibold';
    return 'text-gray-900';
};

/**
 * Genera etiquetas de periodos para mostrar en la interfaz
 */
export const getPeriodLabels = (filterApplied: boolean, inicio: any, fin: any) => {
    if (filterApplied) {
        return {
            period1: `${inicio.mes} ${inicio.anio}`,
            period2: `${fin.mes} ${fin.anio}`
        };
    }
    return {
        period1: 'Junio 23',
        period2: 'Julio 23'
    };
};

/* Generar título dinámico para el eje X basado en el tipo de vista */
export const getXAxisTitle = (vista: string) => {
    if (vista.includes('CANAL')) return 'Canal';
    if (vista.includes('RAMO')) return 'Ramo';
    if (vista.includes('CÍA')) return 'Compañía';
    return 'Entidad';
};

// Función para generar datos dinámicos para la tabla ASSA POR RIESGO
export const generateAssaPorRiesgoData = (year1: string, month1: string, year2: string, month2: string) => {
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
export const generateFilialesData = (year1: string, month1: string, year2: string, month2: string) => {
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
export const generatePasData = (year1: string, month1: string, year2: string, month2: string) => {
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