import { getAuthHeaders } from '@/utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials: any, device_id?: string) => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ ...credentials, device_id }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
    }
    return data;
};

export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/api/logout`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return response.ok;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
};

export const twoFactorChallenge = async (code: string, tempToken?: string, device_id?: string) => {
    const response = await fetch(`${API_URL}/api/two-factor-challenge`, {
        method: 'POST',
        headers: getAuthHeaders(tempToken),
        body: JSON.stringify({ code, device_id }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Código de autenticación inválido');
    }
    return data;
};

export const enableTwoFactor = async (tempToken?: string) => {
    const response = await fetch(`${API_URL}/user/two-factor-authentication`, {
        method: 'POST',
        headers: getAuthHeaders(tempToken)
    });
    if (!response.ok) {
        throw new Error('Error al habilitar 2FA');
    }
    return response;
};

export const getTwoFactorQrCode = async (tempToken?: string) => {
    const response = await fetch(`${API_URL}/user/two-factor-qr-code`, {
        headers: getAuthHeaders(tempToken)
    });
    if (!response.ok) {
        throw new Error('Error al obtener QR de 2FA');
    }
    return await response.json();
};

export const getTwoFactorSecretKey = async (tempToken?: string) => {
    const response = await fetch(`${API_URL}/user/two-factor-secret-key`, {
        headers: getAuthHeaders(tempToken)
    });
    if (!response.ok) {
        throw new Error('Error al obtener la clave secreta de 2FA');
    }
    return await response.json();
};

export const confirmTwoFactor = async (code: string, tempToken?: string, device_id?: string) => {
    const response = await fetch(`${API_URL}/api/confirm-two-factor-and-login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getAuthHeaders(tempToken)
        },
        body: JSON.stringify({ code, device_id }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'El código ingresado es incorrecto');
    }
    return data;
};

export const disableTwoFactor = async () => {
    const response = await fetch(`${API_URL}/user/two-factor-authentication`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al desactivar 2FA');
    }
    return response;
};

export const getRecoveryCodes = async () => {
    const response = await fetch(`${API_URL}/user/two-factor-recovery-codes`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Error al obtener códigos de recuperación');
    }
    return await response.json();
};

export const forgotPassword = async (email: string) => {
    const response = await fetch(`${API_URL}/api/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'No se pudo procesar la solicitud');
    }
    return data;
};

export const changeRequiredPassword = async (password: string, password_confirmation: string, tempToken?: string) => {
    const response = await fetch(`${API_URL}/api/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getAuthHeaders(tempToken)
        },
        body: JSON.stringify({ password, password_confirmation }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'No se pudo actualizar la contraseña');
    }
    return data;
};
