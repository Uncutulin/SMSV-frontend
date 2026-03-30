import { Role } from '@/types/user';
import { getAuthHeaders } from '@/utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const fetchRoles = async (): Promise<Role[]> => {
    try {
        const response = await fetch(`${API_URL}/api/roles`, {
            headers: getAuthHeaders(),
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`Error fetching roles: ${response.statusText}`);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching roles:", error);
        return [];
    }
};
