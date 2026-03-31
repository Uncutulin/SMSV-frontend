import { Usuario } from '@/types/user';
import { getAuthHeaders } from '@/utils/auth';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async (): Promise<Usuario[]> => {
    try {
        const response = await fetch(`${API_URL}/api/internal/users`, {
            headers: getAuthHeaders(),
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`Error fetching users: ${response.statusText}`);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const createUser = async (userData: any): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/api/internal/register`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || 'Error al crear usuario');
            (error as any).errors = errorData.errors;
            throw error;
        }

        return true;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (id: number, userData: any): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/api/internal/users/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || 'Error al actualizar usuario');
            (error as any).errors = errorData.errors;
            throw error;
        }

        return true;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/api/internal/users/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar usuario');
        }

        return true;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
