'use client';

import { useEffect, useRef } from 'react';

interface HighchartsChartProps {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'column';
  title: string;
  data: Record<string, unknown>;
  options?: Record<string, unknown>;
}

export default function HighchartsChart({ id, type, title, data, options = {} }: HighchartsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHighcharts = async () => {
      if (typeof window !== 'undefined' && chartRef.current) {
        const Highcharts = await import('highcharts');
        
        // Configuración global de Highcharts
        Highcharts.default.setOptions({
          colors: ['#007cc5', '#004376', '#74671f', '#e74c3c', '#9b59b6', '#f39c12'],
          chart: {
            backgroundColor: '#fff',
            style: {
              fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }
          },
          title: {
            text: '',
            style: {
              color: '#000000'
            }
          },
          legend: {
            enabled: true,
            itemStyle: {
              color: '#000000'
            }
          },
          xAxis: {
            labels: {
              style: {
                color: '#000000'
              }
            },
            lineColor: '#4f5b69',
            tickColor: '#4f5b69'
          },
          yAxis: {
            title: {
              style: {
                color: '#000000'
              }
            },
            labels: {
              style: {
                color: '#000000'
              }
            },
            gridLineColor: '#4f5b69'
          },
          tooltip: {
            style: {
              color: '#000000'
            }
          }
        });

        // Configuración específica del gráfico
        const chartOptions = {
          chart: {
            type: type,
            style: {
              fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }
          },
          title: {
            text: ''
          },
          ...options,
          ...data
        };

        Highcharts.default.chart(chartRef.current, chartOptions);
      }
    };

    loadHighcharts();
  }, [id, type, data, options]);

  return (
    <div className="rounded-lg shadow-md p-6 bg-white border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        {title}
      </h3>
      <div ref={chartRef} className="h-96 min-h-96"></div>
    </div>
  );
} 