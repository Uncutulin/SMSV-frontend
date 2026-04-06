'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { listFTPFiles, downloadFTPFile } from '@/services/qstomService';
import Swal from 'sweetalert2';

interface FileItem {
    name: string;
    path: string;
    type: 'file' | 'directory';
    size?: number;
    last_modified?: number;
}

export default function FTPExplorerPage() {
    const [currentPath, setCurrentPath] = useState('/');
    const [items, setItems] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFiles(currentPath);
    }, [currentPath]);

    const loadFiles = async (path: string) => {
        setLoading(true);
        try {
            const data = await listFTPFiles(path);
            setItems(data);
        } catch (error: any) {
            Swal.fire('Error', error.message || 'No se pudieron cargar los archivos', 'error');
            // If failed, go back to root if not already there
            if (path !== '/') setCurrentPath('/');
        } finally {
            setLoading(false);
        }
    };

    const handleFolderClick = (path: string) => {
        setCurrentPath(path);
    };

    const handleFileClick = async (path: string) => {
        try {
            Swal.fire({
                title: 'Descargando...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            await downloadFTPFile(path);
            Swal.close();
        } catch (error: any) {
            Swal.fire('Error', error.message || 'Error al descargar el archivo', 'error');
        }
    };

    const handleGoBack = () => {
        if (currentPath === '/') return;
        const parts = currentPath.split('/').filter(Boolean);
        parts.pop();
        setCurrentPath('/' + parts.join('/'));
    };

    const formatSize = (bytes?: number) => {
        if (bytes === undefined) return '-';
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (timestamp?: number) => {
        if (!timestamp) return '-';
        return new Date(timestamp * 1000).toLocaleString('es-AR');
    };

    // Breadcrumbs logic
    const pathParts = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Root', path: '/' }];
    let tempPath = '';
    pathParts.forEach(part => {
        tempPath += '/' + part;
        breadcrumbs.push({ name: part, path: tempPath });
    });

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 font-outfit">Explorador FTP</h1>
                    <p className="text-gray-600 mt-2">Navega y descarga archivos directamente desde el servidor FTP.</p>
                </div>

                {/* Breadcrumbs & Actions */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            {breadcrumbs.map((bc, idx) => (
                                <li key={bc.path} className="inline-flex items-center">
                                    {idx > 0 && <span className="mx-2 text-gray-400">/</span>}
                                    <button
                                        onClick={() => setCurrentPath(bc.path)}
                                        className={`text-sm font-medium hover:text-blue-600 cursor-pointer ${
                                            idx === breadcrumbs.length - 1 ? 'text-blue-600' : 'text-gray-700'
                                        }`}
                                    >
                                        {bc.name}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    {currentPath !== '/' && (
                        <button
                            onClick={handleGoBack}
                            className="text-gray-600 hover:text-blue-600 flex items-center text-sm font-medium transition-colors cursor-pointer"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                            </svg>
                            Volver
                        </button>
                    )}
                </div>

                {/* File List */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tamaño</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Modificado</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                                                Cargando archivos...
                                            </div>
                                        </td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                            Este directorio está vacío.
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.path} className="hover:bg-blue-50/30 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {item.type === 'directory' ? (
                                                        <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                    <button
                                                        onClick={() => item.type === 'directory' ? handleFolderClick(item.path) : handleFileClick(item.path)}
                                                        className={`text-sm font-medium focus:outline-none hover:underline text-left ${
                                                            item.type === 'directory' ? 'text-gray-900 font-semibold' : 'text-gray-700'
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatSize(item.size)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(item.last_modified)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {item.type === 'file' ? (
                                                    <button
                                                        onClick={() => handleFileClick(item.path)}
                                                        className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                                        title="Descargar"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleFolderClick(item.path)}
                                                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                                        title="Abrir"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
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
