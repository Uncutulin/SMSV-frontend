'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Swal from 'sweetalert2';

interface JerarquiaLog {
  id: number;
  status: string;
  message: string | null;
  filename: string | null;
  created_at: string;
  updated_at: string;
}

function getCookie(name: string): string | undefined {
    if (typeof document === 'undefined') {
      return undefined;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift();
    }
  }

export default function JerarquiaPage() {
  const [logs, setLogs] = useState<JerarquiaLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reportLoading, setReportLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = getCookie('token');
        if (!token) {
          throw new Error('No se encontró el token de autenticación.');
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jerarquia`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener los logs de jerarquía');
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
        const token = getCookie('token');
        if (!token) {
            throw new Error('No se encontró el token de autenticación.');
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jerarquia/obtener-archivo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error al solicitar el archivo de jerarquía');
        }
        Swal.fire({
          title: '¡Éxito!',
          text: 'Archivo de jerarquía solicitado exitosamente',
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
          <h1 className="text-3xl font-bold text-gray-900">Logs de Jerarquía</h1>
          <p className="text-gray-600 mt-2 pb-6">Resultados de la integración de Jerarquías</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Registros</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer font-bold"
              onClick={handleRequestReport}
              disabled={reportLoading}
            >
              {reportLoading ? 'Solicitando...' : 'Solicitar Jerarquia'}
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mensaje
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Archivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Creación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Actualización
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Cargando...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No hay logs para mostrar.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {log.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          log.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.message ?? 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.filename ?? 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.updated_at).toLocaleString()}
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
