import { Usuario } from '@/types/user';

export const fetchUsers = async (): Promise<Usuario[]> => {
    try {
        const response = await fetch('/api/internal/users', {
            headers: {
                'Content-Type': 'application/json',
            },
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
        const response = await fetch('/api/internal/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear usuario');
        }

        return true;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (id: number, userData: any): Promise<boolean> => {
    try {
        const response = await fetch(`/api/internal/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar usuario');
        }

        return true;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`/api/internal/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
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
