export interface MarketingItem {
    IDPersona: number;
    nombre: string;
    apellido: string | null;
    nro_documento: number;
    compania_nombre: string;
    ramo_nombre: string;
    numeropoliza: string;
    telefono: string | null;
    mail: string | null;
    localidad: string | null;
    productor_segmento: string;
    es_socio_mutual: boolean;
    edad: number | null;
    sexo: string | null;
    provincia: string | null;
    canal: string | null;
    estado_civil: string | null;
    producto_vigente: string | null;
    compania: string | null;
    producto_no_tiene: string | null;
    socio_mutual: string | null;
    antiguedad: string | null;
    tiene_mail: string | null;
    tiene_telefono: string | null;
    fuerza_empresa: string | null;
    situacion_revista: string | null;
    origen_dato: string | null;
}

export interface MarketingResponse {
    current_page: number;
    data: MarketingItem[];
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}