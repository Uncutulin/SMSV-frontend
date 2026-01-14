// src/app/evolucion-de-la-cartera/useEvolucionCharts.ts
import { useMemo } from 'react';
import { DatoComparativo } from '@/types/evolucionCarteraVigente';

export const useEvolucionCarteraVigenteCharts = (listaComparativa: DatoComparativo[], tipoVista: string, allFilters: any) => {

    const getXAxisTitle = (vista: string) => {
        if (vista.includes('CANAL')) return 'Canal';
        if (vista.includes('RAMO')) return 'Ramo';
        if (vista.includes('CÍA')) return 'Compañía';
        return 'Entidad';
    };

    const r12ChartData = useMemo(() => {
        if (listaComparativa && listaComparativa.length > 0) {
            const nombresEntidades = listaComparativa.map(item => item.entidad);

            return {
                chart: { type: 'column', height: 320 },
                xAxis: {
                    categories: nombresEntidades,
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
                        name: 'Periodo Inicial',
                        data: listaComparativa.map(item => item.q_pol_periodo_ini),
                        color: '#007DC5'
                    },
                    {
                        name: 'Periodo Final',
                        data: listaComparativa.map(item => item.q_pol_periodo_fin),
                        color: '#003871'
                    },
                ],
                tooltip: {
                    shared: true,
                    pointFormatter: function (this: any): string {
                        if (this.y >= 1000000) return '<b>' + (this.y / 1000000) + ' Millones</b>';
                        if (this.y >= 1000) return '<b>' + (this.y / 1000) + ' mil</b>';
                        return '<b>' + this.y + '</b>';
                    }
                },
                credits: { enabled: false },
            };
        }
        return null;
    }, [tipoVista, listaComparativa]);


    const qPolPieData = useMemo(() => {
        const colors = ['#003871', '#007DC5', '#00AEEF', '#5ec9f2', '#84d9f9'];

        const formatPieData = (lista: DatoComparativo[]) => {
            return lista.map((item, index) => ({
                name: item.entidad,
                y: item.q_pol_periodo_fin,
                color: colors[index % colors.length]
            }));
        };

        if (listaComparativa && listaComparativa.length > 0) {
            return {
                chart: { type: 'pie', height: 320 },
                title: { text: `Distribución Q PÓL - ${tipoVista}` },
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


    const r12EvolutionData = useMemo(() => {
        const colors = [
            '#003871', '#007DC5', '#00AEEF', '#FF6B6B', '#4ECDC4',
            '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'
        ];

        // Aqui asumimos que si no se pasan en allFilters, usamos valores por defecto, 
        // pero idealmente deberíamos recibir los labels o fechas exactas
        const period1Label = `${allFilters.inicio.mes} ${allFilters.inicio.anio}`;
        const period2Label = `${allFilters.fin.mes} ${allFilters.fin.anio}`;

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
                shared: true,
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
    }, [listaComparativa, tipoVista, allFilters]);

    return { r12ChartData, qPolPieData, r12EvolutionData };
};
