export interface Role {
    id: number;
    name: string;
    descripcion: string | null;
    created_at?: string;
    updated_at?: string;
    pivot?: {
        user_id: number;
        role_id: number;
    };
}

export interface Usuario {
    id: number; // API uses number
    name: string;
    apellido: string;
    dni: string;
    email: string;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
    roles: Role[]; // Array of Role objects
    activo: boolean; // Note: API response didn't show 'activo', assuming it exists or mapped
    force_2fa?: boolean;
    two_factor_confirmed_at?: string | null;
    deleted_at?: string | null;
}
