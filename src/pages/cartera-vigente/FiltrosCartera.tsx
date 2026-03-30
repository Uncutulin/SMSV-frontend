'use client';

interface Props {
  filters: any;
  anios: any[];
  meses: any[];
  onFilterChange: (key: string, value: string) => void;
  loading: boolean;
}

export function FiltrosCartera({ filters, anios, meses, onFilterChange, loading }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros de Búsqueda</h3>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-md font-medium text-blue-800 mb-3">Compañía</h4>
          <select 
            value={filters.compania} 
            onChange={(e) => onFilterChange('compania', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="TODOS">TODOS</option>
            <option value="CAS">CAS</option>
            <option value="ASSA">ASSA</option>
            <option value="ART">ART</option>
          </select>
        </div>

        <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="text-md font-medium text-purple-800 mb-3">Agrupar por</h4>
          <select 
            value={filters.tipo_filtro} 
            onChange={(e) => onFilterChange('tipo_filtro', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="CANAL">CANAL</option>
            <option value="RAMO">RAMO</option>
            <option value="CIA">CIA</option>
            <option value="PRODUCTORES">PRODUCTORES</option>
            <option value="EJECUTIVO">EJECUTIVO</option>
          </select>
        </div>

        <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="text-md font-medium text-green-800 mb-3">Período</h4>
          <div className="grid grid-cols-2 gap-4">
            <select 
              value={filters.anio} 
              onChange={(e) => onFilterChange('anio', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              disabled={loading}
            >
              {anios.map(item => <option key={item.anio} value={item.anio}>{item.anio}</option>)}
            </select>
            <select 
              value={filters.mes} 
              onChange={(e) => onFilterChange('mes', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              disabled={loading || meses.length === 0}
            >
              {meses.map(m => (
                <option key={m.mes_numero} value={m.mes_numero.toString().padStart(2, '0')}>
                  {m.mes_nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}