// src/components/evolucion-por-tipo-operacion/EvolucionFilters.tsx
import { Compania, Ramo } from '@/services/evolucionTipoOperacionService';

interface Periodo {
    anio: number;
}

interface Mes {
    mes_numero: number;
    mes_nombre: string;
}

interface AllFilters {
    p1: { anio: string; mes: string };
    p2: { anio: string; mes: string };
    p3: { anio: string; mes: string };
    tipoVista: string;
    canal: string;
    cia: string;
    ramo: string;
}

interface Props {
    allFilters: AllFilters;
    handleFilterChange: (grupo: string, key: string, value: string) => void;

    aniosList1: Periodo[];
    mesesList1: Mes[];
    loadingList1: boolean;

    aniosList2: Periodo[];
    mesesList2: Mes[];
    loadingList2: boolean;

    aniosList3: Periodo[];
    mesesList3: Mes[];
    loadingList3: boolean;

    companias: Compania[];
    ramos: Ramo[];
    loadingFilters: boolean;
}

export default function EvolucionFilters({
    allFilters,
    handleFilterChange,
    aniosList1, mesesList1, loadingList1,
    aniosList2, mesesList2, loadingList2,
    aniosList3, mesesList3, loadingList3,
    companias, ramos,
    loadingFilters
}: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-xs">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>

            <div className="flex flex-col lg:flex-row gap-6 mb-6">
                {/* Período 1 */}
                <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-md font-medium text-blue-800 mb-3">Período 1 (Actual)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                            <select
                                value={allFilters.p1.anio}
                                onChange={(e) => handleFilterChange('p1', 'anio', e.target.value)}
                                disabled={loadingList1}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {aniosList1.map(a => (
                                    <option key={a.anio} value={a.anio.toString()}>{a.anio}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                            <select
                                value={allFilters.p1.mes}
                                onChange={(e) => handleFilterChange('p1', 'mes', e.target.value)}
                                disabled={loadingList1}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {mesesList1.map(m => (
                                    <option key={m.mes_numero} value={m.mes_numero.toString().padStart(2, '0')}>{m.mes_nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Período 2 */}
                <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="text-md font-medium text-green-800 mb-3">Período 2 (Anterior)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                            <select
                                value={allFilters.p2.anio}
                                onChange={(e) => handleFilterChange('p2', 'anio', e.target.value)}
                                disabled={loadingList2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                {aniosList2.map(a => (
                                    <option key={a.anio} value={a.anio.toString()}>{a.anio}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                            <select
                                value={allFilters.p2.mes}
                                onChange={(e) => handleFilterChange('p2', 'mes', e.target.value)}
                                disabled={loadingList2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                {mesesList2.map(m => (
                                    <option key={m.mes_numero} value={m.mes_numero.toString().padStart(2, '0')}>{m.mes_nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Período 3 */}
                <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="text-md font-medium text-purple-800 mb-3">Período 3 (Histórico)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                            <select
                                value={allFilters.p3.anio}
                                onChange={(e) => handleFilterChange('p3', 'anio', e.target.value)}
                                disabled={loadingList3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                {aniosList3.map(a => (
                                    <option key={a.anio} value={a.anio.toString()}>{a.anio}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                            <select
                                value={allFilters.p3.mes}
                                onChange={(e) => handleFilterChange('p3', 'mes', e.target.value)}
                                disabled={loadingList3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                {mesesList3.map(m => (
                                    <option key={m.mes_numero} value={m.mes_numero.toString().padStart(2, '0')}>{m.mes_nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtros - Tipo de Vista, Canal, CIA y Ramo inline */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-md font-medium text-gray-800 mb-3">Dimensiones</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Vista</label>
                        <select
                            value={allFilters.tipoVista}
                            onChange={(e) => handleFilterChange('tipoVista', '', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="TODOS">TODOS</option>
                            <option value="ASSA">ASSA</option>
                            <option value="CAS">CAS</option>
                            <option value="ART">ART</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Canal</label>
                        <select
                            value={allFilters.canal}
                            onChange={(e) => handleFilterChange('canal', '', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            <option value="TODOS">TODOS</option>
                            <option value="CANAL PAS">CANAL PAS</option>
                            <option value="CANAL DIRECTO">CANAL DIRECTO</option>
                            <option value="CANAL FILIALES">CANAL FILIALES</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CÍA</label>
                        <select
                            value={allFilters.cia}
                            onChange={(e) => handleFilterChange('cia', '', e.target.value)}
                            disabled={loadingFilters}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            <option value="TODOS">TODOS</option>
                            {companias.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ramo</label>
                        <select
                            value={allFilters.ramo}
                            onChange={(e) => handleFilterChange('ramo', '', e.target.value)}
                            disabled={loadingFilters}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                            <option value="TODOS">TODOS</option>
                            {ramos.map(r => <option key={r.id} value={r.nombre}>{r.nombre}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
