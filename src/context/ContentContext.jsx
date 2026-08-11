import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();
const API = 'http://localhost:5000/api/content';

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState({});
    const [raw, setRaw] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            if (!Array.isArray(data)) {
                setLoading(false);
                return;
            }

            const contentObj = {};
            data.forEach((item) => {
                const key = `${item.section}_${item.key}`;
                contentObj[key] = item.value || item.image_url || '';
                if (item.image_url) {
                    contentObj[`${key}__image`] = item.image_url.startsWith('http')
                        ? item.image_url
                        : item.image_url.startsWith('/')
                          ? `http://localhost:5000${item.image_url.startsWith('/uploads') ? item.image_url : item.image_url}`
                          : item.image_url;
                    // Public assets like /bg.png stay on the Vite origin
                    if (item.image_url.startsWith('/') && !item.image_url.startsWith('/uploads')) {
                        contentObj[`${key}__image`] = item.image_url;
                    }
                }
            });

            setRaw(data);
            setContent(contentObj);
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const getContent = (section, key, fallback = '') => {
        const val = content[`${section}_${key}`];
        if (val === undefined || val === null || val === '') return fallback;
        return val;
    };

    const getImage = (section, key, fallback = '') => {
        const img = content[`${section}_${key}__image`] || content[`${section}_${key}`];
        if (!img || typeof img !== 'string') return fallback;
        const trimmed = img.trim();
        if (!trimmed) return fallback;
        // Ignore plain text placeholders that are not paths/URLs
        if (!trimmed.startsWith('/') && !trimmed.startsWith('http') && !trimmed.startsWith('data:')) {
            return fallback;
        }
        if (trimmed.startsWith('/uploads')) {
            return `http://localhost:5000${trimmed}`;
        }
        return trimmed;
    };

    const getJSON = (section, key, fallback = []) => {
        const rawVal = content[`${section}_${key}`];
        if (!rawVal) return fallback;
        try {
            return typeof rawVal === 'string' ? JSON.parse(rawVal) : rawVal;
        } catch {
            return fallback;
        }
    };

    return (
        <ContentContext.Provider
            value={{ content, raw, loading, getContent, getImage, getJSON, fetchContent }}
        >
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within ContentProvider');
    }
    return context;
};
