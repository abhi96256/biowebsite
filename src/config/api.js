const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export const API_BASE_URL = API_BASE;
export const API_URL = `${API_BASE}/api`;
export const CONTENT_API_URL = `${API_BASE}/api/content`;

export const resolveServerMediaUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (url.startsWith('/uploads')) return `${API_BASE}${url}`;
    return url;
};
