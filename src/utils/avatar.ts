export const getAvatarUrl = (avatarUrl: string | null | undefined): string | null => {
    if (!avatarUrl) return null;

    if (avatarUrl.startsWith('blob:')) {
        return avatarUrl;
    }

    const API_URL = import.meta.env.VITE_API_URL;
    if (!API_URL) return avatarUrl;

    try {
        if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')) {
            const urlObj = new URL(avatarUrl);
            const apiOrigin = new URL(API_URL).origin;
            return `${apiOrigin}${urlObj.pathname}`;
        }
        
        const apiOrigin = new URL(API_URL).origin;
        const cleanPath = avatarUrl.startsWith('/') ? avatarUrl : `/${avatarUrl}`;
        return `${apiOrigin}${cleanPath}`;
    } catch (e) {
        console.error("Error formatting avatar URL:", e);
        return avatarUrl;
    }
};
