import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/content');
            const data = await response.json();
            
            // Convert array to object for easy access
            const contentObj = {};
            data.forEach(item => {
                const key = `${item.section}_${item.key}`;
                contentObj[key] = item.value || item.image_url;
            });
            
            setContent(contentObj);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching content:', err);
            setLoading(false);
        }
    };

    const getContent = (section, key) => {
        return content[`${section}_${key}`] || '';
    };

    return (
        <ContentContext.Provider value={{ content, loading, getContent, fetchContent }}>
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
