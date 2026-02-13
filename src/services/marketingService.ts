import { MarketingResponse } from '../types/marketing';

const API_URL = process.env.API_BASE_URL;

export const fetchMarketingData = async (filters: any, page: number = 1): Promise<MarketingResponse> => {

    // Función auxiliar para unir arrays de forma segura
    const safeJoin = (val: any) => (Array.isArray(val) && val.length > 0 ? val.join(',') : '');

    const payload = {
        ...filters,
        page,
        // Usamos safeJoin para evitar errores si el filtro está vacío
        sexo: safeJoin(filters.sexo),
        provincia: safeJoin(filters.provincia),
        canal: safeJoin(filters.canal),
        compania: safeJoin(filters.compania),
        productoVigente: safeJoin(filters.productoVigente),
        estadoCivil: safeJoin(filters.estadoCivil),
        productoNoTiene: safeJoin(filters.productoNoTiene),
        socioMutual: safeJoin(filters.socioMutual),
        antiguedad: safeJoin(filters.antiguedad),
        tieneMail: safeJoin(filters.tieneMail),
        tieneTelefono: safeJoin(filters.tieneTelefono),
        fuerzaEmpresa: safeJoin(filters.fuerzaEmpresa),
        situacionRevista: safeJoin(filters.situacionRevista),
        origenDato: safeJoin(filters.origenDato),

        // Parseo seguro de edades
        edadDesde: filters.edadDesde?.[0] ? parseInt(filters.edadDesde[0], 10) : null,
        edadHasta: filters.edadHasta?.[0] ? parseInt(filters.edadHasta[0], 10) : null,
    };

    if (!API_URL) {
        throw new Error('La URL de la API (API_BASE_URL) no está configurada en el .env');
    }

    const response = await fetch(`${API_URL}/api/campanas-mkt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        // Intentamos obtener el error específico de Laravel si existe
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }

    return response.json();
};