'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Swal from 'sweetalert2';

interface QSTOMReport {
  id: number;
  reportId: string;
  date: string;
  startDate: string;
  endDate: string;
  errors: string[];
  result: number;
  produccion_realizada: number;
  personal_asegurado: number;
  polizas_en_vigencia: number;
  created_at: string;
  updated_at: string;
}

export default function QstomApiPage() {
  const [logs, setLogs] = useState<QSTOMReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reportLoading, setReportLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* State for date picker, default to current date (local) */
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  /* State for report type */
  const [selectedType, setSelectedType] = useState<number>(1);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/internal/qstom');
        if (!response.ok) {
          throw new Error('Error al obtener los logs');
        }
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleRequestReport = async () => {
    setReportLoading(true);
    try {
      const response = await fetch('/api/internal/qstom/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: selectedDate,
          type: selectedType
        })
      });

      if (!response.ok) {
        throw new Error('Error al solicitar el reporte');
      }

      Swal.fire({
        title: '¡Éxito!',
        text: 'Reporte solicitado exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.reload();
      });
    } catch (err) {
      let message = 'An unexpected error occurred';
      if (err instanceof Error) {
        message = err.message;
      }
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-3">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Logs - QSTOM API</h1>
          <p className="text-gray-600 mt-2 pb-6">Resultados de la integración con QSTOM</p>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Registros</h2>
            <div className="flex items-center">
              <select
                className="mr-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={selectedType}
                onChange={(e) => setSelectedType(Number(e.target.value))}
              >
                <option value={1}>1. TODOS</option>
                <option value={2}>2. PRODUCCION REALIZADA</option>
                <option value={3}>3. POLIZAS EN VIGENCIA</option>
                <option value={4}>4. PERSONAL ASEGURADO</option>
              </select>
              <input
                type="date"
                className="mr-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer font-bold"
                onClick={handleRequestReport}
                disabled={reportLoading}
              >
                {reportLoading ? 'Solicitando...' : 'Solicitar Reporte'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Report ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Fecha Actualizado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Resultado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Errores
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Producción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Asegurados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Pólizas Vigentes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Cargando...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No hay logs para mostrar.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {log.reportId ?? 'sin datos'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.date ? new Date(log.date).toLocaleString() : 'sin datos'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.updated_at ? new Date(log.updated_at).toLocaleString() : 'sin datos'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.result === 200 ? 'bg-green-100 text-green-800' : log.result === 201 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {log.result === 200 ? 'Exitoso' : log.result === 201 ? 'Pendiente' : log.result ? 'Fallido' : 'sin datos'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {log.errors && log.errors.length > 0 ? log.errors.join(', ') : 'Ninguno'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {log.produccion_realizada ?? 'sin datos'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {log.personal_asegurado ?? 'sin datos'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {log.polizas_en_vigencia ?? 'sin datos'}
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