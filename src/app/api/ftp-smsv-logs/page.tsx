'use client';

import { useState, useEffect, Suspense } from 'react';
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

function FtpSmsvLogsContent() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const searchParams = useSearchParams();
  const currentPath = 'smsv_logs'; // Hardcoded path for SMSV logs

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
          throw new Error('Error al obtener la lista de archivos de logs');
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

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) && file.name.endsWith('.log')
  );

  return (
    <div className="p-3">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900">Logs de FTP SMSV</h1>
        <p className="text-gray-600 mt-2 pb-6">Aquí se muestran los archivos de logs de la integración con SMSV.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Contenido de: /{currentPath}</h2>
          <input
            type="text"
            placeholder="Buscar archivos de log..."
            className="mt-4 p-2 border border-gray-300 rounded-md w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Cargando...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : filteredFiles.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              {searchQuery ? 'No se encontraron archivos que coincidan con la búsqueda.' : 'La carpeta está vacía.'}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
              {filteredFiles.map((file) => (
                <div key={file.name} className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200">
                  <a href={`/api/ftp-files?path=${encodeURIComponent(path.join(currentPath, file.name))}`} download className="flex flex-col items-center text-gray-800 hover:underline">
                    <span className="text-5xl mb-2">📄</span>
                    <span className="text-sm text-center break-all">{file.name}</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FtpSmsvLogsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Cargando logs...</div>}>
        <FtpSmsvLogsContent />
      </Suspense>
    </DashboardLayout>
  );
}
