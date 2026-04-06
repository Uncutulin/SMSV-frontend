import { QSTOMReport, RequestReportParams } from '@/types/qstom';
import { getAuthHeaders } from '@/utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

// En Vite utilizamos la URL base configurada para todas las llamadas al backend.

export const fetchQstomLogs = async (): Promise<QSTOMReport[]> => {
    const response = await fetch(`${API_URL}/api/qstom`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al obtener los logs');
    }
    return response.json();
};

export const requestQstomReport = async (data: RequestReportParams): Promise<void> => {
    const response = await fetch(`${API_URL}/api/qstom/solicitar-reporte`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Error al solicitar el reporte');
    }
};

export const fetchJerarquiaLogs = async (): Promise<any[]> => {
    const response = await fetch(`${API_URL}/api/jerarquia`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al obtener los logs de jerarquía');
    }
    return response.json();
};

export const fetchAseguradosLogs = async (): Promise<any[]> => {
    const response = await fetch(`${API_URL}/api/qstom-asegurados`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al obtener los logs de asegurados');
    }
    return response.json();
};

export const fetchFTPLogs = async (): Promise<any[]> => {
    const response = await fetch(`${API_URL}/api/qstom-productores`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al obtener los logs de FTP');
    }
    return response.json();
};

export const listFTPFiles = async (path: string = '/'): Promise<any[]> => {
    const response = await fetch(`${API_URL}/api/ftp/list?path=${encodeURIComponent(path)}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al listar archivos FTP');
    }
    return response.json();
};

export const downloadFTPFile = async (path: string) => {
    const response = await fetch(`${API_URL}/api/ftp/download?path=${encodeURIComponent(path)}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al descargar el archivo');
    }
    
    // Get filename from path
    const filename = path.split('/').pop() || 'file';
    
    // Create a blob and download it
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};
