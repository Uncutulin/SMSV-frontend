import { type IPCData } from '@/app/admin/ipc/page';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface IPCRequest {
    periodo_yyyymm: number;
    fuente: string;
    nombre_compania?: string;
    nombre_ramo?: string;
    cod_canal?: string;
    nombre_segmento?: string;
    ipc_mensual: number;
    ipc_ytd: number;
    ipc_interanual: number;
    disc_anual_q: number;
    disc_anual_prima: number;
    fuente_registro?: string;
}

export const storeIPC = async (data: IPCRequest) => {
    const response = await fetch(`${API_URL}/api/ipc/indice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar IPC');
    }

    return await response.json();
};

export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface IPCListResponse {
    data: IPCData[];
    pagination: Pagination;
}

export const getIPCList = async (anio?: number | '', mes?: number | '', page: number = 1): Promise<IPCListResponse> => {
    let url = `${API_URL}/api/ipc`;
    const params = new URLSearchParams();
    if (anio) params.append('anio', String(anio));
    if (mes) params.append('mes', String(mes));
    if (page > 1) params.append('page', String(page));
    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener la lista de IPC');
    }

    const result = await response.json();
    if (result.status === 'success' && Array.isArray(result.data)) {
        return {
            data: result.data.map((item: any) => ({
                id: String(item.id),
                mes: String(item.mes),
                ipcMes: parseFloat(item.ipcMes) || 0,
                ipcYtd: parseFloat(item.ipcYtd) || 0,
                ipcInteranual: parseFloat(item.ipcInteranual) || 0,
                assaCasArt: item.assaCasArt ? [item.assaCasArt] : [],
                ramaUnificada: item.nombre_ramo ? item.nombre_ramo.split(',') : [],
                ramDes: item.nombre_ramo ? item.nombre_ramo.split(',') : [],
                artCod: [],
                descProducto: [],
                cia: item.cia ? item.cia.split(',') : [],
                canal: item.canal ? item.canal.split(',') : [],
                segmento: item.nombre_segmento ? item.nombre_segmento.split(',') : [],
                ecEjecutivo: [],
                discrecionalAnualQ: parseFloat(item.disc_anual_q) || 0,
                discrecionalAnualPrima: parseFloat(item.disc_anual_prima) || 0,
            })),
            pagination: result.pagination || {
                total: 0,
                per_page: 20,
                current_page: 1,
                last_page: 1
            }
        };
    }
    return { data: [], pagination: { total: 0, per_page: 20, current_page: 1, last_page: 1 } };
};

export const getIpcAnios = async (): Promise<number[]> => {
    try {
        const response = await fetch(`${API_URL}/api/ipc/anios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (!response.ok) return [];
        const result = await response.json();
        if (result.status === 'success' && Array.isArray(result.data)) return result.data;
        if (Array.isArray(result)) return result;
        return [];
    } catch {
        return [];
    }
};

export interface IpcMes {
    id: number;
    nombre: string;
}

export const getIpcMeses = async (): Promise<IpcMes[]> => {
    try {
        const response = await fetch(`${API_URL}/api/ipc/meses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (!response.ok) return [];
        const result = await response.json();
        if (result.status === 'success' && Array.isArray(result.data)) return result.data;
        if (Array.isArray(result)) return result;
        return [];
    } catch {
        return [];
    }
};

export interface IPCUpdateRequest {
    periodo_yyyymm?: number;
    fuente?: string;
    ipc_mensual?: number;
    ipc_ytd?: number;
    ipc_interanual?: number;
    disc_anual_q?: number;
    disc_anual_prima?: number;
}

export const updateIPC = async (id: string | number, data: IPCUpdateRequest) => {
    const response = await fetch(`${API_URL}/api/ipc/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar IPC');
    }

    return await response.json();
};

export const deleteIPC = async (id: string | number) => {
    const response = await fetch(`${API_URL}/api/ipc/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al eliminar IPC');
    }

    return await response.json();
};
