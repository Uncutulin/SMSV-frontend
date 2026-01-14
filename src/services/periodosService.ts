const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener la lista de años únicos
export const fetchAnios = async () => {
    const res = await fetch(`${API_URL}/api/periodos/get-anios`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Error al cargar años');
    const response = await res.json();
    return response.data.anios; // Retorna el array de años
};

// Obtener meses filtrados por año
export const fetchMesesByAnio = async (anio: number) => {
    const res = await fetch(`${API_URL}/api/periodos/get-meses?anio=${anio}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Error al cargar meses');
    const response = await res.json();
    return response.data.meses;
};

// Tu función original para la data final (indicadores y tabla)
export const fetchPeriodosData = async (params: string) => {
    const [resStats, resTabla] = await Promise.all([
        fetch(`${API_URL}/api/periodos/indicadores?${params}`, { cache: 'no-store' }),
        fetch(`${API_URL}/api/periodos/listado?${params}`, { cache: 'no-store' })
    ]);

    if (!resStats.ok || !resTabla.ok) throw new Error('Error en los datos del periodo');
    return { totales: await resStats.json(), tabla: await resTabla.json() };
};