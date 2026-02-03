import { Role } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const fetchRoles = async (): Promise<Role[]> => {
    try {
        const response = await fetch(`${API_URL}/api/roles`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
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
