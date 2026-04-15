'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { fetchQstomLogs, requestQstomReport } from '@/services/qstomService';
import { QSTOMReport } from '@/types/qstom';

export default function QSTOMLogsPage() {
    const [logs, setLogs] = useState<QSTOMReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [submittingReport, setSubmittingReport] = useState(false);
    const [reportDate, setReportDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [reportType, setReportType] = useState<number>(1);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const data = await fetchQstomLogs();
            setLogs(data);
        } catch (error) {
            console.error("Error loading QSTOM logs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRequestReport = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittingReport(true);
        setFeedback(null);

        try {
            await requestQstomReport({
                date: reportDate,
                type: reportType
            });
            setFeedback({ message: 'Reporte solicitado exitosamente.', type: 'success' });
            loadLogs(); // Refresh the list
        } catch (error: any) {
            setFeedback({
                message: error.message || 'Error al solicitar el reporte.',
                type: 'error'
            });
        } finally {
            setSubmittingReport(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 font-outfit">Logs de QSTOM</h1>
                        <p className="text-gray-600 mt-2">Historial de procesamiento de reportes QSTOM.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                            Solicitar Nuevo Reporte
                        </h2>
                        <form onSubmit={handleRequestReport} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del Reporte</label>
                                <input
                                    type="date"
                                    value={reportDate}
                                    onChange={(e) => setReportDate(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Reporte</label>
                                <select
                                    value={reportType}
                                    onChange={(e) => setReportType(Number(e.target.value))}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                >
                                    <option value={1}>1. TODOS</option>
                                    <option value={2}>2. PRODUCCION REALIZADA</option>
                                    <option value={3}>3. POLIZAS EN VIGENCIA</option>
                                    <option value={4}>4. PERSONAL ASEGURADO</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={submittingReport}
                                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 ${submittingReport ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                                    }`}
                            >
                                {submittingReport ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                        Solicitando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Solicitar Reporte
                                    </>
                                )}
                            </button>
                        </form>

                        {feedback && (
                            <div className={`mt-4 p-4 rounded-xl text-sm font-medium ${feedback.type === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'
                                }`}>
                                {feedback.message}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden flex flex-col justify-center">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">Información de QSTOM</h3>
                            <p className="text-blue-100 opacity-90 max-w-md">
                                Al solicitar un reporte, se enviará una petición al servidor externo. El proceso puede tardar unos minutos en completarse y aparecer en el historial.
                            </p>
                            <div className="mt-6 flex gap-4">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
                                    <span className="block text-xs uppercase tracking-wider text-blue-200 opacity-70 mb-1">Total Logs</span>
                                    <span className="text-2xl font-bold">{logs.length}</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
                    </div>
                </div>


                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Report ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Prod. Realizada</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pers. Asegurado</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pol. Vigencia</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Resultado</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Creado</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                                                Cargando registros...
                                            </div>
                                        </td>
                                    </tr>
                                ) : logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                            No se encontraron registros de logs.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.reportId}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{log.produccion_realizada}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{log.personal_asegurado}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{log.polizas_en_vigencia}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${log.result === 200
                                                    ? 'bg-green-100 text-green-800'
                                                    : log.result === 201
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {log.result === 200 ? 'Éxito' :
                                                        log.result === 201 ? 'Esperando Respuesta' :
                                                            `Error (${log.result})`}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(log.created_at).toLocaleString('es-AR')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
