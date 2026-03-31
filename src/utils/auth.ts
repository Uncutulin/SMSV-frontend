export const getAuthHeaders = (serverToken?: string): Record<string, string> => {
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (serverToken) {
        headers['Authorization'] = `Bearer ${serverToken}`;
    } else if (typeof window !== 'undefined') {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            headers['Authorization'] = `Bearer ${localToken}`;
        }
    }

    return headers;
};
