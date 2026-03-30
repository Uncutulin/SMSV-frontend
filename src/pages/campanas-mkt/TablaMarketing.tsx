'use client';

import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';

interface Props {
    result: any[];
    pagination: any;
    loading: boolean;
    error: string | null;
    rowsPerPage: number;
    onRowsPerPageChange: (limit: number) => void;
    onPageChange: (page: number) => void;
}

export function TablaMarketing({
    result,
    pagination,
    loading,
    error,
    rowsPerPage,
    onRowsPerPageChange,
    onPageChange
}: Props) {
    const [activeInfo, setActiveInfo] = useState<string | null>(null);
    const [localSearch, setLocalSearch] = useState('');

    // 1. Buscador Local (Filtra sobre los datos de la página actual)
    const filteredResult = useMemo(() => {
        if (!localSearch) return result;
        const term = localSearch.toLowerCase();
        return result.filter((c: any) =>
            c.nombre?.toLowerCase().includes(term) ||
            c.nro_documento?.toString().includes(term) ||
            c.ramo_nombre?.toLowerCase().includes(term)
        );
    }, [result, localSearch]);

    // 2. Lógica para los popups de información (Iconos ℹ️)
    const getColStats = (field: string) => {
        const counts: Record<string, number> = {};
        result.forEach((item: any) => {
            const val = item[field]?.toString() || 'N/A';
            counts[val] = (counts[val] || 0) + 1;
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    };

    const HeaderWithInfo = ({ label, field }: { label: string, field: string }) => (
        <th className="px-3 py-3 text-left font-bold uppercase tracking-wider relative group border-r border-white/10">
            <div className="flex items-center justify-between gap-1">
                {label}
                <button
                    onClick={() => setActiveInfo(activeInfo === field ? null : field)}
                    className="hover:scale-110 transition-transform"
                >
                    <i className="fa-solid fa-circle-info text-blue-300"></i>
                </button>
            </div>
            {activeInfo === field && (
                <div className="absolute z-50 mt-2 w-64 bg-white border border-gray-200 shadow-2xl rounded-lg p-3 text-gray-800 normal-case font-normal left-0 top-full">
                    <div className="flex justify-between items-center mb-2 border-b pb-1">
                        <span className="font-bold text-xs">Distribución: {label}</span>
                        <button onClick={() => setActiveInfo(null)}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {getColStats(field).map(([name, count]) => (
                            <div key={name} className="flex justify-between py-1 text-[10px] border-b border-gray-50 last:border-0 hover:bg-gray-50 px-1">
                                <span className="truncate pr-2">{name}</span>
                                <span className="font-bold text-blue-600 bg-blue-50 px-1 rounded">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </th>
    );

    // 3. Exportación a Excel
    const exportToExcel = () => {
        const exportData = result.map(c => ({
            'NOMBRE': c.nombre,
            'DNI': c.nro_documento,
            'EDAD': c.edad,
            'PROVINCIA': c.productor_lugar || c.localidad,
            'CANAL': c.productor_segmento,
            'PRODUCTO': c.ramo_nombre,
            'COMPAÑIA': c.compania_nombre,
            'TELEFONO': c.telefono,
            'EMAIL': c.mail,
            'SOCIO MUTUAL': c.es_socio_mutual ? 'SI' : 'NO'
        }));
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Página Actual');
        XLSX.writeFile(wb, `Marketing_Export_${new Date().getTime()}.xlsx`);
    };

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mt-4 border border-gray-200">
            {/* HEADER DE LA TABLA: BUSCADOR Y SELECTOR */}
            <div className="bg-gray-50 px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Resultados</h2>
                        <p className="text-xs text-gray-500 font-medium">Total: {pagination?.total?.toLocaleString() || 0} registros</p>
                    </div>

                    <div className="flex items-center gap-2 ml-4 border-l pl-4 border-gray-300">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Ver</span>
                        <select
                            value={rowsPerPage}
                            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                            className="text-xs border rounded p-1 bg-white font-bold text-blue-900 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={500}>500</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input
                            type="text"
                            placeholder="Buscar en esta página..."
                            className="pl-9 pr-4 py-2 border rounded-md text-xs w-64 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={exportToExcel}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center transition-all shadow-md active:scale-95"
                    >
                        <i className="fa-solid fa-file-excel mr-2"></i> EXPORTAR
                    </button>
                </div>
            </div>

            {/* TABLA DE DATOS */}
            <div className="overflow-x-auto min-h-[400px]">
                <table className="min-w-full divide-y divide-gray-200 text-[11px]">
                    <thead className="bg-[#003871] text-white sticky top-0 z-10">
                        <tr>
                            <th className="px-3 py-3 text-left font-bold uppercase border-r border-white/10">Nombre</th>
                            <th className="px-3 py-3 text-left font-bold uppercase border-r border-white/10 text-blue-200">DNI</th>
                            <th className="px-3 py-3 text-left font-bold uppercase border-r border-white/10">Edad</th>
                            <HeaderWithInfo label="Provincia" field="productor_lugar" />
                            <HeaderWithInfo label="Canal" field="productor_segmento" />
                            <HeaderWithInfo label="Producto" field="ramo_nombre" />
                            <HeaderWithInfo label="Compañía" field="compania_nombre" />
                            <th className="px-3 py-3 text-left font-bold uppercase border-r border-white/10">Teléfono</th>
                            <th className="px-3 py-3 text-left font-bold uppercase border-r border-white/10">Email</th>
                            <HeaderWithInfo label="Socio" field="es_socio_mutual" />
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={10} className="text-center py-20"><i className="fa-solid fa-spinner fa-spin fa-2xl text-blue-600"></i></td></tr>
                        ) : filteredResult.length > 0 ? (
                            filteredResult.map((item: any, idx: number) => (
                                <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                    <td className="px-3 py-3 font-semibold text-gray-900 border-r border-gray-50">{item.nombre}</td>
                                    <td className="px-3 py-3 font-mono border-r border-gray-50">{item.nro_documento}</td>
                                    <td className="px-3 py-3 text-center border-r border-gray-50">{item.edad || '—'}</td>
                                    <td className="px-3 py-3 border-r border-gray-50">{item.productor_lugar || item.localidad}</td>
                                    <td className="px-3 py-3 border-r border-gray-50">{item.productor_segmento}</td>
                                    <td className="px-3 py-3 font-medium text-blue-800 border-r border-gray-50">{item.ramo_nombre}</td>
                                    <td className="px-3 py-3 text-gray-600 border-r border-gray-50">{item.compania_nombre}</td>
                                    <td className="px-3 py-3 border-r border-gray-50">{item.telefono || '—'}</td>
                                    <td className="px-3 py-3 text-blue-600 underline border-r border-gray-50">{item.mail || '—'}</td>
                                    <td className="px-3 py-3 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${item.es_socio_mutual ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.es_socio_mutual ? 'SI' : 'NO'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={10} className="text-center py-20 text-gray-400">No se encontraron registros en esta página</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINACIÓN ESTILO LARAVEL */}
            {pagination && pagination.last_page > 1 && (
                <div className="bg-gray-100 px-6 py-4 border-t flex justify-between items-center text-xs">
                    <div className="text-gray-500">
                        Página <span className="font-bold text-blue-900">{pagination.current_page}</span> de <span className="font-bold">{pagination.last_page}</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            disabled={pagination.current_page === 1 || loading}
                            onClick={() => onPageChange(pagination.current_page - 1)}
                            className="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-30 transition-all font-bold shadow-sm"
                        >
                            <i className="fa-solid fa-chevron-left mr-2"></i>Anterior
                        </button>
                        <button
                            disabled={pagination.current_page === pagination.last_page || loading}
                            onClick={() => onPageChange(pagination.current_page + 1)}
                            className="px-4 py-2 border rounded bg-white hover:bg-gray-50 disabled:opacity-30 transition-all font-bold shadow-sm"
                        >
                            Siguiente<i className="fa-solid fa-chevron-right ml-2"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}