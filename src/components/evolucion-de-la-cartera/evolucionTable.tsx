// src/app/evolucion-de-la-cartera/evolucionTable.tsx
import { getDifColor } from '@/app/evolucion-de-la-cartera/evolucionUtils';

interface Props {
    data: any[];
    labels: { inicio: string, fin: string };
    loading: boolean;
}

export default function EvolucionTable({ data, labels, loading }: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-white bg-[#003871]">
                            <th className="px-4 py-3 border-r-2 border-black">ENTIDAD</th>
                            <th className="px-4 py-3">{labels.inicio || 'Ini'}</th>
                            <th className="px-4 py-3">{labels.fin || 'Fin'}</th>
                            <th className="px-4 py-3">DIF</th>
                            <th className="px-4 py-3 border-r-2 border-black">% Q POL</th>
                            <th className="px-4 py-3">R12 {labels.inicio}</th>
                            <th className="px-4 py-3">R12 {labels.fin}</th>
                            <th className="px-4 py-3">DIF R12</th>
                            <th className="px-4 py-3">% R12</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={9} className="text-center py-10">Cargando datos...</td></tr>
                        ) : data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 font-bold border-r-2 border-black">{item.entidad}</td>
                                    <td className="px-4 py-2 text-center">{item.q_pol_periodo_ini}</td>
                                    <td className="px-4 py-2 text-center">{item.q_pol_periodo_fin}</td>
                                    <td className="px-4 py-2 text-center">{item.dif_q_pol}</td>
                                    <td className={`px-4 py-2 text-center border-r-2 border-black ${getDifColor(item.pct_q_pol)}`}>{item.pct_q_pol}</td>
                                    <td className="px-4 py-2 text-center">{item.r12_periodo_ini}</td>
                                    <td className="px-4 py-2 text-center">{item.r12_periodo_fin}</td>
                                    <td className="px-4 py-2 text-center">{item.dif_r12}</td>
                                    <td className={`px-4 py-2 text-center ${getDifColor(item.pct_r12)}`}>{item.pct_r12}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={9} className="text-center py-10">No hay datos disponibles</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}