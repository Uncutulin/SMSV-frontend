'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface FtpFile {
  name: string;
  type: 'file' | 'directory';
  path: string;
}

export default function FtpPage() {
  const [files, setFiles] = useState<FtpFile[]>([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/ftp-files?path=${encodeURIComponent(currentPath)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        setFiles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [currentPath]);

  const handleItemClick = (file: FtpFile) => {
    if (file.type === 'directory') {
      setCurrentPath(file.path);
    }
  };
  
  const handleNavigateUp = () => {
    if (currentPath === '/') return;
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
    setCurrentPath(newPath);
  };

  return (
    <DashboardLayout>
      <div className="p-3">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-900">Explorador de Archivos FTP</h1>
          <p className="text-gray-600 mt-2 pb-6">Navega por los archivos y carpetas del servidor.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Ruta actual: {currentPath}</h2>
            {currentPath !== '/' && (
                 <button
                 onClick={handleNavigateUp}
                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
               >
                 Subir un nivel
               </button>
            )}
          </div>

          {loading && (
            <div className="flex justify-center items-center p-8">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {files.map((file) => (
                <div
                  key={file.name}
                  onClick={() => handleItemClick(file)}
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  {file.type === 'directory' ? (
                    <FaFolder className="text-5xl text-yellow-500" />
                  ) : (
                    <FaFile className="text-5xl text-gray-500" />
                  )}
                  <span className="mt-2 text-sm text-center break-all">{file.name}</span>
                </div>
              ))}
            </div>
          )}
           {files.length === 0 && !loading && !error && (
                <div className="text-center text-gray-500 py-8">
                    No hay archivos en esta carpeta.
                </div>
            )}
        </div>
      </div>
    </DashboardLayout>
  );
}