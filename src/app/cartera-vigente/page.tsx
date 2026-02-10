'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCarteraVigente } from '@/hooks/useCarteraVigente';
import StatCard from '@/components/dashboard/StatCard';
import { usePeriodos } from '@/hooks/usePeriodo';

export default function CarteraVigente() {
  // 1. Estados para manejar los Filtros
  const [filters, setFilters] = useState({
    compania: 'TODOS',
    anio: '',
    mes: '',
    tipo_filtro: 'CANAL'
  });

  // Datos de la Cartera
  const { listadoData, totalesData, loading, error } = useCarteraVigente(filters);

  // Obtenemos años y meses
  const { anios, meses, loading: loadingPeriodos } = usePeriodos(Number(filters.anio));


  const getFecha = (monthCode: string, yearCode: string) => {
    const mesEncontrado = meses.find(
      (m) => m.mes_numero.toString().padStart(2, '0') === monthCode
    );
    const yearEncontrado = anios.find(
      (m) => m.anio.toString().padStart(2, '0') === yearCode
    );
    const year = yearEncontrado ? yearEncontrado.anio : null;
    const month = mesEncontrado ? mesEncontrado.mes_nombre : null;
    return month ? month + ' ' + year : "Cargando...";
  };


  const handleFilterChange = (key: string, value: string) => {
    setBusquedaGrupo('');
    setFilters(prev => {
      const newState = { ...prev, [key]: value };
      if (key === 'anio') {
        newState.mes = '';
      }
      return newState;
    });
  };

  // Efecto para actualizar mes cuando cambian los meses disponibles (por cambio de año)
  // Efecto para inicializar Año
  useEffect(() => {
    if (anios.length > 0 && !filters.anio) {
      // Seleccionar el primer año (asumiendo que viene ordenado o es el más reciente)
      setFilters(prev => ({ ...prev, anio: anios[0].anio.toString() }));
    }
  }, [anios, filters.anio]);

  // Efecto para actualizar mes cuando cambian los meses disponibles (por cambio de año) o inicializar
  // Efecto para actualizar mes cuando cambian los meses disponibles (por cambio de año) o inicializar
  useEffect(() => {
    if (meses.length > 0) {
      const mesExiste = meses.some(m => m.mes_numero.toString().padStart(2, '0') === filters.mes);
      if (!mesExiste || !filters.mes) {
        const lastMonth = meses[meses.length - 1].mes_numero.toString().padStart(2, '0');
        setFilters(prev => ({ ...prev, mes: lastMonth }));
      }
    }
  }, [meses, filters.mes]);

  // --- LÓGICA DE ORDENAMIENTO Y BÚSQUEDA ---
  const [configOrden, setConfigOrden] = useState<{ columna: string, direccion: 'asc' | 'desc' } | null>(null);
  const [busquedaGrupo, setBusquedaGrupo] = useState('');

  const manejarOrden = (columna: string) => {
    let direccion: 'asc' | 'desc' = 'asc';
    if (configOrden && configOrden.columna === columna && configOrden.direccion === 'asc') {
      direccion = 'desc';
    }
    setConfigOrden({ columna, direccion });
  };

  const datosOrdenados = useMemo(() => {
    if (!listadoData || listadoData.length === 0) return [];

    // Separar la última fila (TOTAL)
    let datos = [...listadoData];
    const filaTotal = datos.pop(); // Removemos el último elemento (TOTAL)

    // 1. Filtrar por Busqueda de Grupo
    if (busquedaGrupo.trim() !== '') {
      const termino = busquedaGrupo.toLowerCase();
      datos = datos.filter(item =>
        item.nombre_grupo && item.nombre_grupo.toLowerCase().includes(termino)
      );
    }

    // 2. Ordenar
    if (configOrden) {
      datos.sort((a: any, b: any) => {
        let valorA = a[configOrden.columna];
        let valorB = b[configOrden.columna];

        // Función auxiliar para limpiar valores numéricos/moneda
        const limpiarValor = (val: any) => {
          if (typeof val === 'string') {
            val = val.replace(/\$/g, '').replace(/%/g, '').trim();
            // Asumiendo formato español: punto es separador de miles, coma es decimal.
            // Eliminamos TODOS los puntos.
            val = val.replace(/\./g, '');
            // Reemplazamos la coma por punto para que parseFloat lo entienda.
            val = val.replace(',', '.');

            const num = parseFloat(val);
            return isNaN(num) ? val : num;
          }
          return typeof val === 'number' ? val : val;
        };

        valorA = limpiarValor(valorA);
        valorB = limpiarValor(valorB);

        if (valorA < valorB) {
          return configOrden.direccion === 'asc' ? -1 : 1;
        }
        if (valorA > valorB) {
          return configOrden.direccion === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    // Reinsertar TOTAL al final si existía
    if (filaTotal) {
      datos.push(filaTotal);
    }

    return datos;
  }, [listadoData, configOrden, busquedaGrupo]);

  // Helper para renderizar iconos de orden
  const renderSortIcon = (columna: string) => {
    if (configOrden?.columna !== columna) return <span className="text-gray-400 ml-1 text-[10px]">⇅</span>;
    return configOrden.direccion === 'asc' ? <span className="text-white ml-1 text-[10px]">↑</span> : <span className="text-white ml-1 text-[10px]">↓</span>;
  };

  // Mapeo de indicadores (vienen formateados como string desde el Backend)
  const statsCards = [
    {
      title: 'Cantidad de Pólizas',
      value: totalesData?.total_polizas || '-',
      icon: 'fa-solid fa-file-contract',
      color: 'green' as const,
    },
    {
      title: 'Prima Anual emitida',
      value: totalesData?.total_anual || '-',
      icon: 'fa-regular fa-id-badge',
      color: 'blue' as const,
    },
    {
      title: 'Prima Último Mes',
      value: totalesData?.total_mensual || '-',
      icon: 'fa-solid fa-calendar-day',
      color: 'purple' as const,
    },
    {
      title: 'Cantidad de Cápitas',
      value: totalesData?.total_capitas || '-',
      icon: 'fa-solid fa-user',
      color: 'red' as const,
    },
  ];

  if (loadingPeriodos || !filters.anio || !filters.mes) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Cargando Periodos...</h2>
          <p className="text-gray-500 mt-2">Por favor espere mientras configuramos los filtros</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold text-gray-900">Cartera Vigente</h1>
        <p className="text-gray-600 mt-2">{getFecha(filters.mes, filters.anio)}</p>
      </div>

      {/* --- BLOQUE DE FILTROS --- */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros de Búsqueda</h3>
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Compañía */}
          <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-md font-medium text-blue-800 mb-3">Compañía</h4>
            <select
              value={filters.compania}
              onChange={(e) => handleFilterChange('compania', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="TODOS">TODOS</option>
              <option value="CAS">CAS</option>
              <option value="ASSA">ASSA</option>
              <option value="ART">ART</option>
            </select>
          </div>

          {/* Tipo de Filtro */}
          <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="text-md font-medium text-purple-800 mb-3">Agrupar por</h4>
            <select
              value={filters.tipo_filtro}
              onChange={(e) => handleFilterChange('tipo_filtro', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            >
              <option value="CANAL">CANAL</option>
              <option value="RAMO">RAMO</option>
              <option value="CIA">CIA</option>
              <option value="PRODUCTORES">PRODUCTORES</option>
              <option value="EJECUTIVO">EJECUTIVO</option>
            </select>
          </div>

          {/* Período Dinámico */}
          <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-md font-medium text-green-800 mb-3">Período</h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Select de Año */}
              <select
                value={filters.anio}
                onChange={(e) => handleFilterChange('anio', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                disabled={loadingPeriodos}
              >
                {anios.map((item) => (
                  <option key={item.anio} value={item.anio}>
                    {item.anio}
                  </option>
                ))}
              </select>

              {/* Select de Mes */}
              <select
                value={filters.mes}
                onChange={(e) => handleFilterChange('mes', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                disabled={loadingPeriodos || meses.length === 0}
              >
                {meses.map((m) => (
                  <option key={m.mes_numero} value={m.mes_numero.toString().padStart(2, '0')}>
                    {m.mes_nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- CARDS DE ESTADÍSTICAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => (
          <StatCard key={i} {...stat} loading={loading} />
        ))}
      </div>

      {/* --- TABLA DE DATOS --- */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Detalle por {filters.tipo_filtro}</h2>

          {/* Buscador */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Buscar por Grupo..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              value={busquedaGrupo}
              onChange={(e) => setBusquedaGrupo(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500 animate-pulse">Cargando información...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 font-medium">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-white" style={{ backgroundColor: '#003871' }}>
                  <th className="px-4 py-3 text-center font-bold border-r-2 border-black">#</th>
                  <th
                    className="px-4 py-3 text-left font-bold border-r-2 border-black cursor-pointer hover:bg-[#002b55] transition-colors select-none"
                    onClick={() => manejarOrden('nombre_grupo')}
                  >
                    <div className="flex items-center justify-between">
                      GRUPO
                      {renderSortIcon('nombre_grupo')}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-center font-bold border-r-2 border-black cursor-pointer hover:bg-[#002b55] transition-colors select-none"
                    onClick={() => manejarOrden('q_pol')}
                  >
                    <div className="flex items-center justify-center">
                      Q POL
                      {renderSortIcon('q_pol')}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-center font-bold cursor-pointer hover:bg-[#002b55] transition-colors select-none"
                    onClick={() => manejarOrden('r12')}
                  >
                    <div className="flex items-center justify-center">
                      R12
                      {renderSortIcon('r12')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {datosOrdenados?.map((item: any, index: number) => {
                  const isLast = index === datosOrdenados.length - 1;

                  return (
                    <tr
                      key={index}
                      className={`border-b hover:bg-[#3382af85] ${isLast
                        ? 'bg-blue-100 font-bold' // <--- Se agrega font-bold aquí para toda la fila
                        : index < 3
                          ? 'bg-yellow-50 font-semibold'
                          : index % 2 === 0
                            ? 'bg-white'
                            : 'bg-gray-50'
                        }`}
                    >
                      <td className={`px-4 py-2 text-center border-r-2 border-black ${isLast ? 'text-blue-900' : index < 3 ? 'text-yellow-600' : 'text-gray-900'
                        }`}>
                        {/* Si es la última fila (TOTAL), no mostramos el número */}
                        {!isLast && index + 1}
                      </td>
                      <td className={`px-4 py-2 border-r-2 border-black ${isLast ? 'text-blue-900' : index < 3 ? 'text-yellow-800' : 'text-gray-900'
                        }`}>
                        {item.nombre_grupo}
                      </td>
                      <td className={`px-4 py-2 text-center border-r-2 border-black ${isLast ? 'text-blue-900' : index < 3 ? 'text-yellow-800' : 'text-gray-900'
                        }`}>
                        {Number(item.q_pol).toLocaleString('es-AR')}
                      </td>
                      <td className={`px-4 py-2 text-center ${isLast ? 'text-blue-900' : index < 3 ? 'text-yellow-800' : 'text-gray-900'
                        }`}>
                        {item.r12}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div >
  );
}