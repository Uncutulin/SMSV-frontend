// src/app/evolucion-de-la-cartera/evolucionTable.tsx
import { getDifColor } from '@/app/evolucion-de-la-cartera/evolucionUtils';

interface Props {
    data: any[];
    labels: { inicio: string, fin: string };
    loading: boolean;
    alOrdenar: (columna: string) => void;
    configOrden: { columna: string, direccion: 'asc' | 'desc' } | null;
}

export default function EvolucionTable({ data, labels, loading, alOrdenar, configOrden }: Props) {

    const renderSortIcon = (columna: string) => {
        if (configOrden?.columna !== columna) return <span className="text-gray-400 ml-1">⇅</span>;
        return configOrden.direccion === 'asc' ? <span className="text-white ml-1">↑</span> : <span className="text-white ml-1">↓</span>;
    };

    const renderHeader = (label: string, columna: string, sortable: boolean = true, className: string = "px-4 py-3") => (
        <th
            className={`${className} ${sortable ? 'cursor-pointer hover:bg-[#002b55] transition-colors select-none' : ''}`}
            onClick={() => sortable && alOrdenar(columna)}
        >
            <div className="flex items-center justify-center">
                {label}
                {sortable && renderSortIcon(columna)}
            </div>
        </th>
    );

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-white bg-[#003871]">
                            {renderHeader("ENTIDAD", "entidad", true, "px-4 py-3 border-r-2 border-black")}
                            {renderHeader(labels.inicio || 'Ini', "q_pol_periodo_ini")}
                            {renderHeader(labels.fin || 'Fin', "q_pol_periodo_fin")}
                            {/* DIF no se ordena explícitamente en el pedido, pero podríamos dejarlo sin ordenar o agregarlo si se desea. El pedido dice GRUPO, Q POL, R12. Asumo DIF no. */}
                            <th className="px-4 py-3">DIF</th>
                            <th className="px-4 py-3 border-r-2 border-black">% Q POL</th>
                            {renderHeader(`R12 ${labels.inicio}`, "r12_periodo_ini")}
                            {renderHeader(`R12 ${labels.fin}`, "r12_periodo_fin")}
                            <th className="px-4 py-3">DIF R12</th>
                            <th className="px-4 py-3">% R12</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={9} className="text-center py-10">Cargando datos...</td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((item, index) => {
                                // 1. Definimos si es la última fila (la de TOTAL)
                                const isLast = index === data.length - 1 && item.entidad === 'TOTAL';

                                return (
                                    <tr
                                        key={index}
                                        // 2. Aplicamos el color condicional a toda la fila si es la última
                                        className={`border-b hover:bg-gray-50 ${isLast ? 'bg-blue-100 font-bold' : ''}`}
                                    >
                                        <td className="px-4 py-2 font-bold border-r-2 border-black">{item.entidad}</td>
                                        <td className="px-4 py-2 text-center">{item.q_pol_periodo_ini}</td>
                                        <td className="px-4 py-2 text-center">{item.q_pol_periodo_fin}</td>
                                        <td className="px-4 py-2 text-center">{item.dif_q_pol}</td>
                                        <td className={`px-4 py-2 text-center border-r-2 border-black ${getDifColor(item.pct_q_pol)}`}>
                                            {item.pct_q_pol}
                                        </td>
                                        <td className="px-4 py-2 text-center">{item.r12_periodo_ini}</td>
                                        <td className="px-4 py-2 text-center">{item.r12_periodo_fin}</td>
                                        <td className="px-4 py-2 text-center">{item.dif_r12}</td>
                                        <td className={`px-4 py-2 text-center ${getDifColor(item.pct_r12)}`}>
                                            {item.pct_r12}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center py-10">No hay datos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}