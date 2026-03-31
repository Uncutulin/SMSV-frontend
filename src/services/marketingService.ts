import { MarketingResponse } from '../types/marketing';
import { getAuthHeaders } from '@/utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMarketingData = async (filters: any, page: number = 1, serverToken?: string): Promise<MarketingResponse> => {

    const cleanedFilters: any = {};
    
    // Lista de campos que manejamos como arrays de strings
    const arrayFields = [
        'sexo', 'provincia', 'canal', 'compania', 'productoVigente', 
        'estadoCivil', 'productoNoTiene', 'socioMutual', 'antiguedad', 
        'tieneMail', 'tieneTelefono', 'fuerzaEmpresa', 'situacionRevista', 'origenDato'
    ];

    arrayFields.forEach(field => {
        if (filters[field] && Array.isArray(filters[field]) && filters[field].length > 0) {
            cleanedFilters[field] = filters[field];
        }
    });

    // Manejo especial de edades
    if (filters.edadDesde?.[0]) cleanedFilters.edadDesde = [parseInt(filters.edadDesde[0], 10)];
    if (filters.edadHasta?.[0]) cleanedFilters.edadHasta = [parseInt(filters.edadHasta[0], 10)];

    // Otros parámetros (como per_page)
    if (filters.per_page) cleanedFilters.per_page = filters.per_page;

    const payload = {
        ...cleanedFilters,
        page
    };

    if (!API_URL) {
        throw new Error('La URL de la API (VITE_API_URL) no está configurada en el .env');
    }

    const response = await fetch(`${API_URL}/api/campanas-mkt`, {
        method: 'POST',
        headers: getAuthHeaders(serverToken),
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        // Intentamos obtener el error específico de Laravel si existe
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
    }

    return response.json();
};

export const fetchMarketingCombos = async (serverToken?: string): Promise<any> => {
    if (!API_URL) {
        throw new Error('La URL de la API (VITE_API_URL) no está configurada en el .env');
    }

    const response = await fetch(`${API_URL}/api/campanas-mkt/combos`, {
        method: 'GET',
        headers: getAuthHeaders(serverToken),
    });

    if (!response.ok) {
        throw new Error(`Error al obtener combos de marketing: ${response.status}`);
    }

    return response.json();
};