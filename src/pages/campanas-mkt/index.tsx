'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useMarketing } from '@/hooks/useMarketing';
import { MultiSelect } from './MultiSelect';
import { TablaMarketing } from './TablaMarketing';
import { fetchMarketingCombos, fetchMarketingData } from '@/services/marketingService';
import * as XLSX from 'xlsx';

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
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // 2. Hook de datos paginados
  const { data, pagination, loading, error, loadMarketing } = useMarketing();

  // 3. Handlers de filtros
  const handleFilterChange = (field: string, value: string[]) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = async (page: number = 1, limit: number = rowsPerPage) => {
    await loadMarketing({ ...filters, per_page: limit }, page);
    setFiltersApplied(true);
  };

  const handleExportAll = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(0);
    try {
      // 1. Obtenemos el total de registros y la paginación real del servidor
      const initialRes = await fetchMarketingData({ ...filters, per_page: 1000 }, 1);
      const totalRecords = initialRes.total || 0;
      
      if (totalRecords === 0) {
        alert("No hay registros para exportar.");
        setIsExporting(false);
        return;
      }

      // El servidor puede limitar el per_page (ej: máximo 100)
      const actualPerPage = initialRes.per_page || 1000;
      const totalPages = initialRes.last_page || Math.ceil(totalRecords / actualPerPage);
      
      console.log(`Iniciando exportación: ${totalRecords} registros, ${totalPages} páginas (Lote: ${actualPerPage})`);
      
      let allRecords: any[] = [];
      // Agregamos la primera página que ya pedimos
      if (initialRes.data) allRecords = [...initialRes.data];

      for (let p = 2; p <= totalPages; p++) {
        const response = await fetchMarketingData({ ...filters, per_page: actualPerPage }, p);
        if (response.data && response.data.length > 0) {
          allRecords = [...allRecords, ...response.data];
        }
        setExportProgress(Math.round((p / totalPages) * 100));
      }

      // 2. Generar CSV
      const headers = ['NOMBRE', 'DNI', 'EDAD', 'PROVINCIA', 'CANAL', 'RAMO', 'PRODUCTO', 'COMPAÑIA', 'TELEFONO', 'EMAIL', 'SOCIO MUTUAL'];
      const csvRows = [headers.join(',')];

      allRecords.forEach(c => {
        const row = [
          `"${(c.nombre || '').replace(/"/g, '""')}"`,
          c.nro_documento || '',
          c.edad || '',
          `"${(c.productor_lugar || c.localidad || '').replace(/"/g, '""')}"`,
          `"${(c.productor_segmento || '').replace(/"/g, '""')}"`,
          `"${(c.ramo_nombre || '').replace(/"/g, '""')}"`,
          `"${(c.producto_nombre || '').replace(/"/g, '""')}"`,
          `"${(c.compania_nombre || '').replace(/"/g, '""')}"`,
          `"${(c.telefono || '').replace(/"/g, '""')}"`,
          `"${(c.mail || '').replace(/"/g, '""')}"`,
          c.es_socio_mutual ? 'SI' : 'NO'
        ];
        csvRows.push(row.join(','));
      });

      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Export_Marketing_Completo_${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error("Error exporting:", err);
      alert("Error al exportar. Es posible que el servidor haya limitado el acceso.");
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
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

  const [filtersData, setFiltersData] = useState({
    sexo: [], edadDesde: [], edadHasta: [], localidad: [], canal: [],
    estadoCivil: [], productoVigente: [], productoNoTiene: [], compania: [],
    socioMutual: [], antiguedad: [], tieneMail: [], tieneTelefono: [],
    fuerzaEmpresa: [], situacionRevista: [], origenDato: []
  });

  const getFiltersData = async () => {
    try {
      const dataItems = await fetchMarketingCombos();
      setFiltersData(dataItems);
    } catch (err) {
      console.error("Error fetching filters data:", err);
    }
  };

  useEffect(() => {
    getFiltersData();
  }, []);

  return (
    <DashboardLayout>
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
              <MultiSelect options={filtersData.sexo} value={filters.sexo} onChange={(v) => handleFilterChange("sexo", v)} placeholder="Seleccionar Sexo" />
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
              <MultiSelect options={filtersData.localidad} value={filters.provincia} onChange={(v) => handleFilterChange("provincia", v)} placeholder="Seleccionar Localidad" />
            </div>

            {/* Fila 2 */}
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Canal</label>
              <MultiSelect options={filtersData.canal} value={filters.canal} onChange={(v) => handleFilterChange("canal", v)} placeholder="Seleccionar Canal" />
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Estado Civil</label>
              <MultiSelect options={["SOLTERO/A", "CASADO/A", "DIVORCIADO/A", "VIUDO/A", "CONCUBINATO"]} value={filters.estadoCivil} onChange={(v) => handleFilterChange("estadoCivil", v)} placeholder="Seleccionar Estado Civil" />
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Producto Vigente</label>
              <MultiSelect options={filtersData.productoVigente} value={filters.productoVigente} onChange={(v) => handleFilterChange("productoVigente", v)} placeholder="Seleccionar Producto" />
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Sin el Producto</label>
              <MultiSelect options={filtersData.productoVigente} value={filters.productoNoTiene} onChange={(v) => handleFilterChange("productoNoTiene", v)} placeholder="Seleccionar Producto Faltante" />
            </div>

            {/* Fila 3 */}
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Compañía</label>
              <MultiSelect options={filtersData.compania} value={filters.compania} onChange={(v) => handleFilterChange("compania", v)} placeholder="Seleccionar Compañía" />
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Socio Mutual</label>
              <select
                value={filters.socioMutual[0] || ''}
                onChange={(e) => handleFilterChange("socioMutual", e.target.value ? [e.target.value] : [])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-xs bg-white h-[38px] cursor-pointer"
              >
                <option value="">Seleccionar...</option>
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Antigüedad (ASSA/CAS)</label>
              <MultiSelect options={["0 a 2 AÑOS", "2 a 5 AÑOS", "5 o más AÑOS"]} value={filters.antiguedad} onChange={(v) => handleFilterChange("antiguedad", v)} placeholder="Seleccionar Rango" />
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Tiene Mail</label>
              <select
                value={filters.tieneMail[0] || ''}
                onChange={(e) => handleFilterChange("tieneMail", e.target.value ? [e.target.value] : [])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-xs bg-white h-[38px] cursor-pointer"
              >
                <option value="">Seleccionar...</option>
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Fila 4 */}
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Tiene Teléfono</label>
              <select
                value={filters.tieneTelefono[0] || ''}
                onChange={(e) => handleFilterChange("tieneTelefono", e.target.value ? [e.target.value] : [])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-xs bg-white h-[38px] cursor-pointer"
              >
                <option value="">Seleccionar...</option>
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">FUERZA/Empresa</label>
              <MultiSelect options={["EJERCITO", "ARMADA", "PREFECTURA", "GENDARMERIA", "FUERZA AEREA", "POLICIA"]} value={filters.fuerzaEmpresa} onChange={(v) => handleFilterChange("fuerzaEmpresa", v)} placeholder="Seleccionar Fuerza" />
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Sit. Revista</label>
              <MultiSelect options={["EN ACTIVIDAD", "RETIRADO", "PENSIONADO", "NO APLICA"]} value={filters.situacionRevista} onChange={(v) => handleFilterChange("situacionRevista", v)} placeholder="Seleccionar Situación" />
            </div>
            <div>
              <label className="block font-bold mb-1 uppercase text-gray-700">Origen Dato</label>
              <MultiSelect options={filtersData.origenDato} value={filters.origenDato} onChange={(v) => handleFilterChange("origenDato", v)} placeholder="Seleccionar Origen" />
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
              onExportAll={handleExportAll}
              isExporting={isExporting}
              exportProgress={exportProgress}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}