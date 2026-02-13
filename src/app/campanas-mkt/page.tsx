'use client';

import { useState, useEffect } from 'react';
import { useMarketing } from '@/hooks/useMarketing';
import HighchartsChart from '@/components/dashboard/HighchartsChart';
import { MultiSelect } from './MultiSelect';
import { TablaMarketing } from './TablaMarketing';

export default function CampanasMKTPage() {
  // 1. Estado de los 16 filtros originales
  const [filters, setFilters] = useState({
    sexo: [] as string[],
    edadDesde: [] as string[],
    edadHasta: [] as string[],
    provincia: [] as string[],
    canal: [] as string[],
    estadoCivil: [] as string[],
    productoVigente: [] as string[],
    productoNoTiene: [] as string[],
    compania: [] as string[],
    socioMutual: [] as string[],
    antiguedad: [] as string[],
    tieneMail: [] as string[],
    tieneTelefono: [] as string[],
    fuerzaEmpresa: [] as string[],
    situacionRevista: [] as string[],
    origenDato: [] as string[]
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // 2. Hook de datos paginados
  const { data, pagination, loading, error, loadMarketing } = useMarketing();

  // 3. Handlers de filtros
  const handleFilterChange = (field: string, value: string[]) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = async (page: number = 1, limit: number = rowsPerPage) => {
    // Se envía el objeto de filtros junto con la página y el límite al proxy
    await loadMarketing({ ...filters, per_page: limit }, page);
    setFiltersApplied(true);
  };

  const clearFilters = () => {
    setFilters({
      sexo: [], edadDesde: [], edadHasta: [], provincia: [], canal: [],
      estadoCivil: [], productoVigente: [], productoNoTiene: [], compania: [],
      socioMutual: [], antiguedad: [], tieneMail: [], tieneTelefono: [],
      fuerzaEmpresa: [], situacionRevista: [], origenDato: []
    });
    setFiltersApplied(false);
  };

  return (
    <div className="flex-1 pb-6 px-4 w-full h-full">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Campañas de Marketing</h1>
        <p className="text-gray-600 mt-2 pb-7 font-medium">Defina su audiencia objetivo</p>
      </div>

      {/* BLOQUE DE FILTROS (16 campos) */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-[11px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Filtro</h3>
        <p className="text-gray-500 mb-4 italic">
          <i className="fa-solid fa-circle-info mr-1"></i>
          Haga clic en cada filtro para desplegar las opciones y seleccionar múltiples valores
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Fila 1 */}
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Sexo</label>
            <MultiSelect options={["Masculino", "Femenino"]} value={filters.sexo} onChange={(v) => handleFilterChange("sexo", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Edad Desde</label>
            <input type="number" placeholder="Ej: 25" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" value={filters.edadDesde[0] || ''} onChange={(e) => handleFilterChange("edadDesde", [e.target.value])} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Edad Hasta</label>
            <input type="number" placeholder="Ej: 65" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" value={filters.edadHasta[0] || ''} onChange={(e) => handleFilterChange("edadHasta", [e.target.value])} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Provincia/Localidad</label>
            <MultiSelect options={["CABA", "Gran Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Neuquén", "Salta", "Misiones"]} value={filters.provincia} onChange={(v) => handleFilterChange("provincia", v)} />
          </div>

          {/* Fila 2 */}
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Canal</label>
            <MultiSelect options={["CANAL PAS", "CANAL FILIALES", "CANAL DIRECTO", "DIGITAL"]} value={filters.canal} onChange={(v) => handleFilterChange("canal", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Estado Civil</label>
            <MultiSelect options={["SOLTERO/A", "CASADO/A", "DIVORCIADO/A", "VIUDO/A", "CONCUBINATO"]} value={filters.estadoCivil} onChange={(v) => handleFilterChange("estadoCivil", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Producto Vigente</label>
            <MultiSelect options={["AUTOMOTORES", "VIDA", "HOGAR", "CAUCIÓN", "ART", "AP", "MOTOS", "SALUD"]} value={filters.productoVigente} onChange={(v) => handleFilterChange("productoVigente", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Sin el Producto</label>
            <MultiSelect options={["AUTOMOTORES", "VIDA", "HOGAR", "CAUCIÓN", "ART", "AP", "MOTOS", "SALUD"]} value={filters.productoNoTiene} onChange={(v) => handleFilterChange("productoNoTiene", v)} />
          </div>

          {/* Fila 3 */}
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Compañía</label>
            <MultiSelect options={["AFIANZADORA", "NACION", "SANCOR", "ZURICH", "ALLIANZ", "FED PAT", "RUS"]} value={filters.compania} onChange={(v) => handleFilterChange("compania", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Socio Mutual</label>
            <MultiSelect options={["SI", "NO"]} value={filters.socioMutual} onChange={(v) => handleFilterChange("socioMutual", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Antigüedad (ASSA/CAS)</label>
            <MultiSelect options={["0 a 2 AÑOS", "2 a 5 AÑOS", "5 o más AÑOS"]} value={filters.antiguedad} onChange={(v) => handleFilterChange("antiguedad", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Tiene Mail</label>
            <MultiSelect options={["SI", "NO"]} value={filters.tieneMail} onChange={(v) => handleFilterChange("tieneMail", v)} />
          </div>

          {/* Fila 4 */}
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Tiene Teléfono</label>
            <MultiSelect options={["SI", "NO"]} value={filters.tieneTelefono} onChange={(v) => handleFilterChange("tieneTelefono", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">FUERZA/Empresa</label>
            <MultiSelect options={["EJERCITO", "ARMADA", "PREFECTURA", "GENDARMERIA", "FUERZA AEREA", "POLICIA"]} value={filters.fuerzaEmpresa} onChange={(v) => handleFilterChange("fuerzaEmpresa", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Sit. Revista</label>
            <MultiSelect options={["EN ACTIVIDAD", "RETIRADO", "PENSIONADO", "NO APLICA"]} value={filters.situacionRevista} onChange={(v) => handleFilterChange("situacionRevista", v)} />
          </div>
          <div>
            <label className="block font-bold mb-1 uppercase text-gray-700">Origen Dato</label>
            <MultiSelect options={["WEB", "CAMPANA", "REFERIDOS", "BBDD", "NEWSLETTER"]} value={filters.origenDato} onChange={(v) => handleFilterChange("origenDato", v)} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <i className="fa-solid fa-xmark mr-2"></i>Limpiar Filtros
          </button>
          <button
            onClick={() => applyFilters(1)}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors text-sm font-bold flex items-center shadow-md"
          >
            <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-magnifying-glass'} mr-2`}></i>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* RESULTADOS Y GRÁFICOS */}
      {filtersApplied && (
        <div className="animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <HighchartsChart id="sexo-mkt" type="pie" title="Segmentación por Sexo" data={{ series: [{ name: 'Clientes', data: [{ name: 'Masculino', y: 55 }, { name: 'Femenino', y: 45 }] }] }} />
            <HighchartsChart id="edad-mkt" type="pie" title="Segmentación por Edad" data={{ series: [{ name: 'Clientes', data: [{ name: '18-35', y: 30 }, { name: '36-60', y: 50 }, { name: '60+', y: 20 }] }] }} />
          </div>

          <TablaMarketing
            result={data}
            pagination={pagination}
            loading={loading}
            error={error}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(newLimit: number) => {
              setRowsPerPage(newLimit);
              applyFilters(1, newLimit);
            }}
            onPageChange={(p: number) => applyFilters(p, rowsPerPage)}
          />
        </div>
      )}
    </div>
  );
}