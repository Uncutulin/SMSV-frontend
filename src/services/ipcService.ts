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
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar IPC');
    }

    return await response.json();
};
