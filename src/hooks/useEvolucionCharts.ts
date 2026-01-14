import { useMemo } from 'react';
import { DatoComparativo } from '@/types/evolucionCarteraVigente';
import { getXAxisTitle } from '@/app/evolucion-de-la-cartera/evolucionUtils';

export const useEvolucionCharts = (
    listaComparativa: DatoComparativo[],
    tipoVista: string,
    filterApplied: boolean,
    selectedMonth1: string,
    selectedYear1: string,
    selectedMonth2: string,
    selectedYear2: string,
    allFilters: any // Keeping detailed type loose for now to match general object structure
) => {

    const r12ChartData = useMemo(() => {
        if (listaComparativa && listaComparativa.length > 0) {
            // 1. Extraemos los nombres de las entidades para el eje X
            const nombresEntidades = listaComparativa.map(item => item.entidad);

            return {
                chart: { type: 'column', height: 320 },
                xAxis: {
                    categories: nombresEntidades, // <--- Dinámico
                    title: { text: getXAxisTitle(tipoVista) },
                },
                yAxis: {
                    title: { text: 'R12 (Millones $)' },
                    min: 0,
                    labels: {
                        formatter: function (this: any): string | number {
                            if (this.value >= 1000000) return (this.value / 1000000) + ' M';
                            if (this.value >= 1000) return (this.value / 1000) + ' mil';
                            return this.value;
                        }
                    }
                },
                series: [
                    {
                        name: 'Periodo Inicial', // Ajusta según el nombre real de tu periodo
                        // 2. Mapeamos los datos del periodo inicial
                        data: listaComparativa.map(item => item.q_pol_periodo_ini),
                        color: '#007DC5'
                    },
                    {
                        name: 'Periodo Final',
                        // 3. Mapeamos los datos del periodo final
                        data: listaComparativa.map(item => item.q_pol_periodo_fin),
                        color: '#003871'
                    },
                ],
                tooltip: {
                    shared: true, // Recomendado para comparar columnas fácilmente
                    pointFormatter: function (this: any): string {
                        if (this.y >= 1000000) return '<b>' + (this.y / 1000000) + ' Millones</b>';
                        if (this.y >= 1000) return '<b>' + (this.y / 1000) + ' mil</b>';
                        return '<b>' + this.y + '</b>';
                    }
                },
                credits: { enabled: false },
            };
        }
        return null; // O una configuración por defecto
    }, [tipoVista, listaComparativa]); // Importante: agregar dependencias


    // Gráfico de torta de Q PÓL por compañía
    const qPolPieData = useMemo(() => {
        // Definimos una paleta de colores para las porciones
        const colors = ['#003871', '#007DC5', '#00AEEF', '#5ec9f2', '#84d9f9'];

        // Función auxiliar para transformar los datos de la lista al formato de Highcharts Pie
        const formatPieData = (lista: DatoComparativo[]) => {
            return lista.map((item, index) => ({
                name: item.entidad,
                y: item.q_pol_periodo_fin, // Usamos el periodo final como en tu ejemplo (202508)
                color: colors[index % colors.length] // Rota los colores si hay más entidades que colores
            }));
        };

        if (listaComparativa && listaComparativa.length > 0) {
            return {
                chart: { type: 'pie', height: 320 },
                series: [
                    {
                        name: 'Q PÓL Periodo Actual',
                        data: formatPieData(listaComparativa),
                    },
                ],
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        },
                        showInLegend: true
                    }
                },
                credits: { enabled: false },
                legend: { enabled: true },
            };
        }

        return null;
    }, [tipoVista, listaComparativa]);


    // Gráfico de evolución de R12
    const r12EvolutionData = useMemo(() => {
        // Paleta de colores extendida para gráficos con muchas líneas (como RAMOS o CÍAS)
        const colors = [
            '#003871', '#007DC5', '#00AEEF', '#FF6B6B', '#4ECDC4',
            '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'
        ];

        // Definimos las etiquetas de los periodos (Eje X)
        const period1Label = filterApplied ? `${selectedMonth1} ${selectedYear1}` : '202408';
        const period2Label = filterApplied ? `${selectedMonth2} ${selectedYear2}` : '202508';

        // Transformamos la listaComparativa en series para el gráfico de líneas
        const dynamicSeries = listaComparativa.map((item, index) => ({
            name: item.entidad,
            data: [item.q_pol_periodo_ini, item.q_pol_periodo_fin],
            color: colors[index % colors.length]
        }));

        return {
            chart: {
                type: 'line',
                height: tipoVista.includes('RAMO') || tipoVista.includes('CÍA') ? 400 : 320
            },
            title: { text: `Evolución - ${tipoVista}` },
            xAxis: {
                categories: [period1Label, period2Label],
                title: { text: 'Período' },
            },
            yAxis: {
                title: { text: 'Cantidad / Valor' },
                min: 0,
                labels: {
                    formatter: function (this: any): string | number {
                        if (this.value >= 1000000) return (this.value / 1000000) + ' M';
                        if (this.value >= 1000) return (this.value / 1000) + ' mil';
                        return this.value;
                    }
                }
            },
            tooltip: {
                shared: true, // Para ver todas las series al pasar el mouse
                pointFormatter: function (this: any): string {
                    const val = this.y >= 1000000 ? (this.y / 1000000).toFixed(2) + ' M' :
                        this.y >= 1000 ? (this.y / 1000).toFixed(1) + ' mil' : this.y;
                    return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${val}</b><br/>`;
                }
            },
            series: dynamicSeries,
            legend: {
                enabled: true,
                layout: dynamicSeries.length > 5 ? 'vertical' : 'horizontal',
                align: dynamicSeries.length > 5 ? 'right' : 'center',
                verticalAlign: dynamicSeries.length > 5 ? 'middle' : 'bottom',
                itemStyle: { fontSize: '10px' }
            },
            credits: { enabled: false },
        };
    }, [listaComparativa, tipoVista, filterApplied, selectedMonth1, selectedYear1, selectedMonth2, selectedYear2]);

    return { r12ChartData, qPolPieData, r12EvolutionData };
};
