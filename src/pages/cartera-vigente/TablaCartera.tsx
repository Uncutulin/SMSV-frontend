'use client';

interface Props {
    datos: any[];
    loading: boolean;
    error: string | null;
    tipoFiltro: string;
    busquedaGrupo: string;
    setBusquedaGrupo: (val: string) => void;
    configOrden: any;
    onOrdenar: (val: any) => void;
}

export function TablaCartera({
    datos, loading, error, tipoFiltro, busquedaGrupo, setBusquedaGrupo, configOrden, onOrdenar
}: Props) {

    const manejarOrden = (columna: string) => {
        const direccion = configOrden?.columna === columna && configOrden.direccion === 'asc' ? 'desc' : 'asc';
        onOrdenar({ columna, direccion });
    };

    const renderIcon = (columna: string) => {
        if (configOrden?.columna !== columna) return <span className="opacity-30 ml-1">⇅</span>;
        return configOrden.direccion === 'asc' ? <span className="ml-1">↑</span> : <span className="ml-1">↓</span>;
    };

    return (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <h2 className="text-lg font-semibold text-gray-800">Detalle por {tipoFiltro}</h2>
                <input
                    type="text"
                    placeholder="Buscar por Grupo..."
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 text-sm focus:ring-2 focus:ring-blue-500"
                    value={busquedaGrupo}
                    onChange={(e) => setBusquedaGrupo(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-400 animate-pulse">Cargando información...</div>
            ) : error ? (
                <div className="text-center py-12 text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead className="text-white bg-[#003871]">
                            <tr>
                                <th className="px-4 py-3 border-r border-black/10">#</th>
                                <th className="px-4 py-3 text-left border-r border-black/10 cursor-pointer" onClick={() => manejarOrden('nombre_grupo')}>
                                    GRUPO {renderIcon('nombre_grupo')}
                                </th>
                                <th className="px-4 py-3 text-center border-r border-black/10 cursor-pointer" onClick={() => manejarOrden('q_pol')}>
                                    Q POL {renderIcon('q_pol')}
                                </th>
                                <th className="px-4 py-3 text-center cursor-pointer" onClick={() => manejarOrden('r12')}>
                                    R12 {renderIcon('r12')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((item, index) => {
                                const isLast = index === datos.length - 1;
                                return (
                                    <tr key={index} className={`border-b hover:bg-blue-50 ${isLast ? 'bg-blue-100 font-bold' : index < 3 ? 'bg-yellow-50 font-semibold' : 'odd:bg-white even:bg-gray-50'}`}>
                                        <td className="px-4 py-2 text-center border-r border-gray-100">{!isLast && index + 1}</td>
                                        <td className="px-4 py-2 border-r border-gray-100">{item.nombre_grupo}</td>
                                        <td className="px-4 py-2 text-center border-r border-gray-100">{Number(item.q_pol).toLocaleString('es-AR')}</td>
                                        <td className="px-4 py-2 text-center">{item.r12}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}