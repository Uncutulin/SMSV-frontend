"use client";
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { usePeriodos } from '@/hooks/usePeriodo';
import { useEvolucionCarteraVigente } from '@/hooks/useEvolucionCarteraVigente';
import EvolucionFilters from '@/components/evolucion-de-la-cartera/evolucionFilters'; // Fixed casing
import EvolucionTable from '@/components/evolucion-de-la-cartera/evolucionTable'; // Fixed casing
import { useEvolucionCharts } from '@/hooks/useEvolucionCharts';
import {
  generateAssaPorRiesgoData,
  generateFilialesData,
  generatePasData
} from './evolucionUtils';

const initialFilterState = {
  compania: 'TODOS',
  anio: '2025',
  mes: '10',
  tipo_filtro: 'CANAL'
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-blue-600 font-medium">Cargando gráficos...</span>
  </div>
);

export default function EvolucionCartera() {
  const router = useRouter();
  // State variables for unused tables (preserved to match request)
  const [showAssaTable] = useState(false);
  const [showFilialesTable] = useState(false);
  const [showPasTable] = useState(false);
  const [showCallCenterTable] = useState(false);
  const [showFilialesPasTable] = useState(false);
  const [rankingFilter, setRankingFilter] = useState<'con-art' | 'sin-art'>('con-art');

  // Estados para el filtro (Used for internal logic in original file)
  const [selectedYear1, setSelectedYear1] = useState('2024');
  const [selectedYear2, setSelectedYear2] = useState('2025');
  const [selectedMonth1, setSelectedMonth1] = useState('01');
  const [selectedMonth2, setSelectedMonth2] = useState('01');

  const [tipoVista, setTipoVista] = useState('TOTAL X CÍA');
  const [filtroProductor, setFiltroProductor] = useState('TODOS');
  const [filtroEjecutivo, setFiltroEjecutivo] = useState('TODOS');
  const [filterApplied, setFilterApplied] = useState(false);

  // Un solo estado para todos los grupos (Used for UI binding)
  const [allFilters, setAllFilters] = useState({
    inicio: { ...initialFilterState },
    fin: { ...initialFilterState },
    productores: { ...initialFilterState },
    ejecutivos: { ...initialFilterState }
  });

  // En la sección de Hooks
  const { anios: aniosInicio, meses: mesesInicio, loading: loadingInicio } = usePeriodos(allFilters.inicio.anio);
  const { anios: aniosFin, meses: mesesFin, loading: loadingFin } = usePeriodos(allFilters.fin.anio);

  // Si quieres centralizar la lógica de carga para usarla en un solo Spinner global:
  const isAnyPeriodLoading = loadingInicio || loadingFin;

  const handleFilterChange = (grupo: keyof typeof allFilters, key: string, value: string) => {
    setAllFilters(prev => ({
      ...prev,
      [grupo]: {
        ...prev[grupo],
        [key]: value,
        // Si cambia el año, reseteamos el mes de ese grupo específico
        ...(key === 'anio' ? { mes: '' } : {})
      }
    }));
  };

  const {
    listaProductores,
    listaEjecutivos,
    loadingDropdowns,
    listaComparativa,
    comparativaLabels,
    loadingComparativa
  } = useEvolucionCarteraVigente(
    tipoVista,
    allFilters.inicio.anio,
    allFilters.inicio.mes,
    allFilters.fin.anio,
    allFilters.fin.mes,
    filtroProductor,
    filtroEjecutivo
  );

  // 2. Reseteas las selecciones cuando cambia la vista
  useEffect(() => {
    setFiltroProductor('TODOS');
    setFiltroEjecutivo('TODOS');
  }, [tipoVista]);

  // Hooks para obtener periodos dinámicos (Legacy/Unused logic for 'selectedYear' variables)
  const { meses: meses1 } = usePeriodos(Number(selectedYear1));
  const { meses: meses2 } = usePeriodos(Number(selectedYear2));

  // Efecto para actualizar mes1 cuando cambian los meses disponibles
  useEffect(() => {
    if (meses1.length > 0) {
      const mesExiste = meses1.some(m => m.mes_numero.toString().padStart(2, '0') === selectedMonth1);
      if (!mesExiste || selectedMonth1 === '') {
        const lastMonth = meses1[meses1.length - 1].mes_numero.toString().padStart(2, '0');
        setSelectedMonth1(lastMonth);
      }
    }
  }, [meses1, selectedMonth1]);

  // Efecto para actualizar mes2 cuando cambian los meses disponibles
  useEffect(() => {
    if (meses2.length > 0) {
      const mesExiste = meses2.some(m => m.mes_numero.toString().padStart(2, '0') === selectedMonth2);
      if (!mesExiste || selectedMonth2 === '') {
        const lastMonth = meses2[meses2.length - 1].mes_numero.toString().padStart(2, '0');
        setSelectedMonth2(lastMonth);
      }
    }
  }, [meses2, selectedMonth2]);


  // useEffect para aplicar el filtro automáticamente (Legacy logic)
  useEffect(() => {
    if (selectedMonth1 !== '' && selectedMonth2 !== '') {
      setFilterApplied(true);
    }
  }, [selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);


  // Datos dinámicos para la tabla ASSA POR RIESGO (Unused)
  const assaPorRiesgoData = useMemo(() => {
    if (filterApplied) {
      return generateAssaPorRiesgoData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generateAssaPorRiesgoData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos para la tabla CANAL FILIALES POR FILIAL (Unused)
  const filialesData = useMemo(() => {
    if (filterApplied) {
      return generateFilialesData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generateFilialesData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Datos dinámicos para la tabla CANAL PAS POR RIESGO (Unused)
  const pasData = useMemo(() => {
    if (filterApplied) {
      return generatePasData(selectedYear1, selectedMonth1, selectedYear2, selectedMonth2);
    } else {
      return generatePasData('2023', '06', '2023', '07');
    }
  }, [filterApplied, selectedYear1, selectedMonth1, selectedYear2, selectedMonth2]);

  // Use custom hook for charts
  const { r12ChartData, qPolPieData, r12EvolutionData } = useEvolucionCharts(
    listaComparativa,
    tipoVista,
    filterApplied,
    selectedMonth1, // Note: The chart titles in original code used allFilters, but the hook uses these arguments for titles/series
    selectedYear1,
    selectedMonth2,
    selectedYear2,
    allFilters
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Evolución de Cartera</h1>
          <p className="text-gray-600 mt-2">Visualice la Evolución de Cartera</p>
        </div>

        <EvolucionFilters
          allFilters={allFilters}
          handleFilterChange={handleFilterChange}
          loadingInicio={loadingInicio}
          loadingFin={loadingFin}
          aniosInicio={aniosInicio}
          mesesInicio={mesesInicio}
          aniosFin={aniosFin}
          mesesFin={mesesFin}
          tipoVista={tipoVista}
          setTipoVista={setTipoVista}
          filtroProductor={filtroProductor}
          setFiltroProductor={setFiltroProductor}
          filtroEjecutivo={filtroEjecutivo}
          setFiltroEjecutivo={setFiltroEjecutivo}
          listaProductores={listaProductores}
          listaEjecutivos={listaEjecutivos}
          loadingDropdowns={loadingDropdowns}
          setFilterApplied={setFilterApplied}
        />

        {/* Tabla TOTAL X CÍA */}
        <EvolucionTable
          data={listaComparativa}
          labels={{ inicio: comparativaLabels.inicio, fin: comparativaLabels.fin }}
          loading={loadingComparativa}
        />

        <hr className="my-8 border-gray-300" />

        {/* Graficos */}
        {loadingComparativa ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Gráficos comparativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HighchartsChart
                id="comparativo-r12"
                type="column"
                title={'Comparativa R12 - ' + allFilters.inicio.anio + allFilters.inicio.mes + ' vs ' + allFilters.inicio.anio + allFilters.fin.mes}
                data={r12ChartData || {}}
              />
              <HighchartsChart
                id="torta-q-pol"
                type="pie"
                title={'Distribución Q PÓL - ' + allFilters.inicio.anio + allFilters.inicio.mes + ' vs ' + allFilters.inicio.anio + allFilters.fin.mes}
                data={qPolPieData || {}}
              />
            </div>


            {/* Gráfico de evolución R12 */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <HighchartsChart
                id="evolucion-r12"
                type="line"
                title={'Evolución Q PÓL - ' + allFilters.inicio.anio + allFilters.inicio.mes + ' vs ' + allFilters.inicio.anio + allFilters.fin.mes}
                data={r12EvolutionData}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout >
  );
} 
