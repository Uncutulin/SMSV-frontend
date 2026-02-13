'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCarteraVigente } from '@/hooks/useCarteraVigente';
import { usePeriodos } from '@/hooks/usePeriodo';
import StatCard from '@/components/dashboard/StatCard';
import { cleanCurrency } from '@/lib/utils';
// Importes locales (Colocación)
import { FiltrosCartera } from '@/app/cartera-vigente/FiltrosCartera';
import { TablaCartera } from '@/app/cartera-vigente/TablaCartera';
import { CarteraVigenteListado } from '@/types/carteraVigente';

export default function CarteraPage() {
  const [filters, setFilters] = useState({
    compania: 'TODOS',
    anio: '',
    mes: '',
    tipo_filtro: 'CANAL'
  });

  const [busquedaGrupo, setBusquedaGrupo] = useState('');
  const [configOrden, setConfigOrden] = useState<{ columna: string, direccion: 'asc' | 'desc' } | null>(null);

  const { listadoData, totalesData, loading, error } = useCarteraVigente(filters);
  const { anios, meses, loading: loadingPeriodos } = usePeriodos(Number(filters.anio));

  // --- Handlers ---
  const handleFilterChange = (key: string, value: string) => {
    setBusquedaGrupo('');
    setFilters(prev => ({
      ...prev,
      [key]: value,
      ...(key === 'anio' && { mes: '' })
    }));
  };

  // --- Lógica de Sincronización de Periodos ---
  useEffect(() => {
    if (anios.length > 0 && !filters.anio) {
      setFilters(p => ({ ...p, anio: anios[0].anio.toString() }));
    }
  }, [anios, filters.anio]);

  useEffect(() => {
    if (meses.length > 0) {
      const mesExiste = meses.some(m => m.mes_numero.toString().padStart(2, '0') === filters.mes);
      if (!mesExiste || !filters.mes) {
        setFilters(p => ({ ...p, mes: meses[meses.length - 1].mes_numero.toString().padStart(2, '0') }));
      }
    }
  }, [meses, filters.mes]);

  // --- Procesamiento de Datos ---
  const datosFinales = useMemo(() => {
    if (!listadoData?.length) return [];
    let datos = listadoData.slice(0, -1);
    const filaTotal = listadoData[listadoData.length - 1];

    if (busquedaGrupo.trim()) {
      datos = datos.filter(i => i.nombre_grupo?.toLowerCase().includes(busquedaGrupo.toLowerCase()));
    }
    if (configOrden) {
      datos.sort((a: CarteraVigenteListado, b: CarteraVigenteListado) => {
        const columna = configOrden.columna as keyof CarteraVigenteListado;
        const valorA = cleanCurrency(a[columna]);
        const valorB = cleanCurrency(b[columna]);

        if (valorA < valorB) {
          return configOrden.direccion === 'asc' ? -1 : 1;
        }
        if (valorA > valorB) {
          return configOrden.direccion === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return [...datos, filaTotal];
  }, [listadoData, configOrden, busquedaGrupo]);

  const statsCards = [
    { title: 'Cantidad de Pólizas', value: totalesData?.total_polizas || '-', icon: 'fa-solid fa-file-contract', color: 'green' as const },
    { title: 'Prima Anual emitida', value: totalesData?.total_anual || '-', icon: 'fa-regular fa-id-badge', color: 'blue' as const },
    { title: 'Prima Último Mes', value: totalesData?.total_mensual || '-', icon: 'fa-solid fa-calendar-day', color: 'purple' as const },
    { title: 'Cantidad de Cápitas', value: totalesData?.total_capitas || '-', icon: 'fa-solid fa-user', color: 'red' as const },
  ];

  if (loadingPeriodos || !filters.anio) return <div className="p-10 text-center">Cargando Periodos...</div>;

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Cartera Vigente</h1>
        <p className="text-gray-600 mt-2 font-medium">
          {meses.find(m => m.mes_numero.toString().padStart(2, '0') === filters.mes)?.mes_nombre} {filters.anio}
        </p>
      </div>

      <FiltrosCartera
        filters={filters}
        anios={anios}
        meses={meses}
        onFilterChange={handleFilterChange}
        loading={loadingPeriodos}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => <StatCard key={i} {...stat} loading={loading} />)}
      </div>

      <TablaCartera
        datos={datosFinales}
        loading={loading}
        error={error}
        tipoFiltro={filters.tipo_filtro}
        busquedaGrupo={busquedaGrupo}
        setBusquedaGrupo={setBusquedaGrupo}
        configOrden={configOrden}
        onOrdenar={setConfigOrden}
      />
    </div>
  );
}