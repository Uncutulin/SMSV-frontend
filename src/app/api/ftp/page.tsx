'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import path from 'path';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileEntry } from '@/lib/files';

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

export default function FtpPage() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const currentPath = searchParams.get('path') || '';

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getCookie('token');
        if (!token) {
          throw new Error('No se encontró el token de autenticación.');
        }
        const response = await fetch(`/api/ftp-list?path=${encodeURIComponent(currentPath)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener la lista de archivos');
        }
        const data = await response.json();
        setFiles(data);
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

    fetchFiles();
  }, [currentPath]);

  const parentPath = currentPath ? path.dirname(currentPath) : '';

  return (
    <DashboardLayout>
      <div className="p-3">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Explorador de Archivos</h1>
          <p className="text-gray-600 mt-2 pb-6">Navega por los archivos y carpetas del servidor.</p>
        </div>

        <div className="mb-4">
          <Link href="/api/ftp" className="text-blue-500 hover:underline">Raíz</Link>
          {currentPath && (
            <>
              {' / '}
              <Link href={`/api/ftp?path=${parentPath}`} className="text-blue-500 hover:underline">
                Volver
              </Link>
            </>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Contenido de: /{currentPath}</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                      Cargando...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : files.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                      La carpeta está vacía.
                    </td>
                  </tr>
                ) : (
                  files.map((file) => (
                    <tr key={file.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {file.isDirectory ? '📁' : '📄'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.isDirectory ? (
                          <Link href={`/api/ftp?path=${encodeURIComponent(path.join(currentPath, file.name))}`} className="text-blue-700 hover:underline">
                            {file.name}
                          </Link>
                        ) : (
                          <a href={`/api/ftp-files?path=${encodeURIComponent(path.join(currentPath, file.name))}`} download className="text-gray-800 hover:underline">
                            {file.name}
                          </a>
                        )}
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