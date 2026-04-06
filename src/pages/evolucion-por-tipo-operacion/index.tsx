'use client';

import { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import { usePeriodos } from '@/hooks/usePeriodo';
import { useEvolucionTipoOperacion } from '@/hooks/useEvolucionTipoOperacion';
import { Compania } from '@/services/evolucionTipoOperacionService';
import EvolucionFilters from '@/components/evolucion-por-tipo-operacion/EvolucionFilters';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EvolucionPorTipoOperacion() {
  // Estado unificado para todos los periodos y filtros adicionales
  const [allFilters, setAllFilters] = useState({
    p1: { anio: '', mes: '' },
    p2: { anio: '', mes: '' },
    p3: { anio: '', mes: '' },
    tipoVista: 'TODOS',
    canal: 'TODOS',
    cia: 'TODOS',
    ramo: 'TODOS'
  });

  const handleSearch = (filters: any) => {
    setAllFilters(filters);
  };

  // Hooks para obtener periodos dinámicos
  const { anios: anios1, meses: meses1, loading: loading1 } = usePeriodos(allFilters.p1.anio ? Number(allFilters.p1.anio) : undefined);
  const { anios: anios2, meses: meses2, loading: loading2 } = usePeriodos(allFilters.p2.anio ? Number(allFilters.p2.anio) : undefined);
  const { anios: anios3, meses: meses3, loading: loading3 } = usePeriodos(allFilters.p3.anio ? Number(allFilters.p3.anio) : undefined);

  // Inicializar años con el último disponible
  useEffect(() => {
    if (!loading1 && anios1.length > 0 && !allFilters.p1.anio) {
      const latestYear = anios1[0].anio.toString();
      setAllFilters(prev => ({
        ...prev,
        p1: { ...prev.p1, anio: latestYear },
        p2: { ...prev.p2, anio: latestYear },
        p3: { ...prev.p3, anio: latestYear }
      }));
    }
  }, [loading1, anios1]);

  // Función para manejar cambios en los filtros
  const handleFilterChange = (grupo: string, key: string, value: string) => {
    setAllFilters(prev => {
      // Si es un grupo de periodo (p1, p2, p3)
      if (['p1', 'p2', 'p3'].includes(grupo)) {
        return {
          ...prev,
          [grupo]: {
            ...(prev as any)[grupo],
            [key]: value,
            // Si cambia el año, reseteamos el mes para ese grupo
            ...(key === 'anio' ? { mes: '' } : {})
          }
        };
      }

      // Mutual exclusivity for canal, cia, ramo
      if (grupo === 'canal' && value !== 'TODOS') {
        return { ...prev, canal: value, cia: 'TODOS', ramo: 'TODOS' };
      }
      if (grupo === 'cia' && value !== 'TODOS') {
        return { ...prev, cia: value, canal: 'TODOS', ramo: 'TODOS' };
      }
      if (grupo === 'ramo' && value !== 'TODOS') {
        return { ...prev, ramo: value, canal: 'TODOS', cia: 'TODOS' };
      }

      // Si es un filtro general (tipoVista u otros que no requieren exclusividad)
      return {
        ...prev,
        [grupo]: value
      };
    });
  };

  // Auto-select last available month if current selection is invalid
  useEffect(() => {
    if (!loading1 && meses1.length > 0) {
      const currentMonth = allFilters.p1.mes;
      const monthExists = meses1.some(m => m.mes_numero.toString().padStart(2, '0') === currentMonth);
      if (!monthExists || currentMonth === '') {
        const lastMonth = meses1[meses1.length - 1].mes_numero.toString().padStart(2, '0');
        setAllFilters(prev => ({ ...prev, p1: { ...prev.p1, mes: lastMonth } }));
      }
    }
  }, [loading1, meses1, allFilters.p1.anio]);

  useEffect(() => {
    if (!loading2 && meses2.length > 0) {
      const currentMonth = allFilters.p2.mes;
      const monthExists = meses2.some(m => m.mes_numero.toString().padStart(2, '0') === currentMonth);
      if (!monthExists || currentMonth === '') {
        const lastMonth = meses2[meses2.length - 1].mes_numero.toString().padStart(2, '0');
        setAllFilters(prev => ({ ...prev, p2: { ...prev.p2, mes: lastMonth } }));
      }
    }
  }, [loading2, meses2, allFilters.p2.anio]);

  useEffect(() => {
    if (!loading3 && meses3.length > 0) {
      const currentMonth = allFilters.p3.mes;
      const monthExists = meses3.some(m => m.mes_numero.toString().padStart(2, '0') === currentMonth);
      if (!monthExists || currentMonth === '') {
        const lastMonth = meses3[meses3.length - 1].mes_numero.toString().padStart(2, '0');
        setAllFilters(prev => ({ ...prev, p3: { ...prev.p3, mes: lastMonth } }));
      }
    }
  }, [loading3, meses3, allFilters.p3.anio]);

  // Hook principal de datos
  const {
    r12Data,
    qpolData,
    labels,
    loading,
    hasFetched,
    canales,
    companias,
    ramos,
    loadingFilters
  } = useEvolucionTipoOperacion({
    anio1: allFilters.p1.anio, mes1: allFilters.p1.mes,
    anio2: allFilters.p2.anio, mes2: allFilters.p2.mes,
    anio3: allFilters.p3.anio, mes3: allFilters.p3.mes,
    tipoVista: allFilters.tipoVista,
    filtroCanal: allFilters.canal,
    filtroCia: allFilters.cia,
    filtroRamo: allFilters.ramo
  });


  // Transformación de datos para el gráfico de barras R12
  const chartData = useMemo(() => {
    if (!r12Data || r12Data.length === 0) return null;

    // Filtrar la fila TOTAL si existe para evitar que desvirtúe el gráfico
    const dataForChart = r12Data.filter(item => item.entidad !== 'TOTAL');
    const categories = dataForChart.map(item => item.entidad);

    return {
      chart: { type: 'column', height: 360 },
      title: { text: `Evolución R12 por Tipo de Operación - ${allFilters.tipoVista}` },
      xAxis: {
        categories: categories,
        title: { text: 'Tipo de Operación' },
        labels: { rotation: -45, style: { fontSize: '11px' } }
      },
      yAxis: {
        title: { text: 'R12 ($)' },
        min: 0,
        labels: {
          formatter: function (this: { value: number }) {
            if (this.value >= 1000000) return (this.value / 1000000).toLocaleString() + ' M';
            if (this.value >= 1000) return (this.value / 1000).toLocaleString() + ' mil';
            return this.value.toLocaleString();
          }
        }
      },
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>$ {point.y:,.0f}</b><br/>'
      },
      series: [
        {
          name: labels.p1 || `P1`,
          data: dataForChart.map(item => item.p1),
          color: '#004376'
        },
        {
          name: labels.p2 || `P2`,
          data: dataForChart.map(item => item.p2),
          color: '#007DC5'
        },
        {
          name: labels.p3 || `P3`,
          data: dataForChart.map(item => item.p3),
          color: '#00AEEF'
        }
      ],
      credits: { enabled: false },
      legend: { enabled: true }
    };
  }, [r12Data, labels, allFilters.tipoVista]);

  // Transformación de datos para el gráfico de líneas Q POL
  const lineChartData = useMemo(() => {
    if (!qpolData || qpolData.length === 0) return null;

    const dataForChart = qpolData.filter(item => item.entidad !== 'TOTAL');
    const categories = [labels.p1 || 'P1', labels.p2 || 'P2', labels.p3 || 'P3'];

    // Colores premium para cada tipo de operación
    const colors = ['#28a745', '#dc3545', '#007DC5', '#ff8c00', '#6c757d', '#b042f5', '#f54291'];

    const series = dataForChart.map((item, index) => ({
      name: item.entidad,
      data: [item.p1, item.p2, item.p3],
      color: colors[index % colors.length],
      marker: { symbol: 'circle' }
    }));

    return {
      chart: { type: 'line', height: 400 },
      title: { text: `Evolución Q POL - ${categories.join(' vs ')}` },
      xAxis: {
        categories: categories,
        title: { text: 'Período' }
      },
      yAxis: {
        title: { text: 'Q POL' },
        min: 0
      },
      tooltip: {
        shared: true,
        crosshairs: true
      },
      series: series,
      credits: { enabled: false },
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      }
    };
  }, [qpolData, labels]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {loading && <LoadingSpinner fullPage />}
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Evolución por Tipo de Operación</h1>
          <p className="text-gray-600 mt-2">Visualice la Evolución de las Operaciones por su Tipo</p>
        </div>

        <EvolucionFilters
          allFilters={allFilters}
          handleFilterChange={handleFilterChange}
          aniosList1={anios1}
          mesesList1={meses1}
          loadingList1={loading1}
          aniosList2={anios2}
          mesesList2={meses2}
          loadingList2={loading2}
          aniosList3={anios3}
          mesesList3={meses3}
          loadingList3={loading3}
          companias={companias}
          ramos={ramos}
          loadingFilters={loadingFilters}
        />

        {/* Gráficos */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-primary font-medium">Cargando datos...</span>
          </div>
        ) : hasFetched && (r12Data.length > 0 || qpolData.length > 0) ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
            {/* Gráfico de barras R12 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {chartData && (
                <HighchartsChart
                  id="evolucion-r12"
                  type="column"
                  title=""
                  data={chartData}
                />
              )}
            </div>

            {/* Gráfico de líneas Q POL */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {lineChartData && (
                <HighchartsChart
                  id="evolucion-qpol"
                  type="line"
                  title=""
                  data={lineChartData}
                />
              )}
            </div>
          </div>
        ) : hasFetched && !loading && (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <p className="text-gray-500">No se encontraron datos para los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
