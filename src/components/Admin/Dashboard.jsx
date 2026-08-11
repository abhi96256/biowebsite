import React, { useState, useEffect } from 'react';
import ListFieldEditor, { getListSchema } from './ListFieldEditor';
import './Admin.css';
import { API_URL, resolveServerMediaUrl } from '../../config/api';

const API = API_URL;

const resolveMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
    if (url.startsWith('/uploads')) return resolveServerMediaUrl(url);
    return url;
};

const isImageField = (item) => {
    if (item.image_url) return true;
    const k = (item.key || '').toLowerCase();
    return (
        k === 'image' ||
        k === 'photo' ||
        k === 'main_image' ||
        k === 'signature' ||
        k.endsWith('_image') ||
        k.endsWith('_photo')
    );
};

const FALLBACK_SECTIONS = [
    { name: 'hero', label: 'Hero' },
    { name: 'introduction', label: 'Introduction' },
    { name: 'mission', label: 'Mission Quote' },
    { name: 'about', label: 'About' },
    { name: 'core_values', label: 'Core Values' },
    { name: 'timeline', label: 'Journey / Timeline' },
    { name: 'leadership', label: 'Leadership' },
    { name: 'vision_mission', label: 'Vision & Mission' },
    { name: 'initiatives', label: 'Initiatives' },
    { name: 'awards', label: 'Highlights / Achievements' },
    { name: 'media_gallery', label: 'Media Gallery' },
    { name: 'testimonials', label: 'Testimonials' },
    { name: 'blog', label: 'Blog' },
    { name: 'faqs', label: 'FAQs' },
    { name: 'contact', label: 'Contact' },
    { name: 'footer', label: 'Footer' }
];

function parseMaybeJson(raw, fallback = []) {
    if (Array.isArray(raw) || (raw && typeof raw === 'object')) return raw;
    if (raw === undefined || raw === null || raw === '') return fallback;
    try {
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

const Dashboard = ({ onLogout }) => {
    const [content, setContent] = useState([]);
    const [sections, setSections] = useState(FALLBACK_SECTIONS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [activeSection, setActiveSection] = useState('hero');
    const [editedContent, setEditedContent] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetchSections();
        fetchContent();
    }, []);

    useEffect(() => {
        setSidebarOpen(false);
    }, [activeSection]);

    const fetchSections = async () => {
        try {
            const response = await fetch(`${API}/content/sections`);
            const data = await response.json();
            if (Array.isArray(data) && data.length) {
                setSections(data);
                setActiveSection(data[0].name);
            }
        } catch (err) {
            console.error('Error fetching sections:', err);
        }
    };

    const fetchContent = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API}/content`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setContent(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (id, value) => {
        setEditedContent((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedContent((prev) => ({ ...prev, [id]: file }));
        }
    };

    const handleRemoveImage = (id) => {
        setEditedContent((prev) => ({ ...prev, [id]: null }));
    };

    const handleListChange = (id, listValue) => {
        setEditedContent((prev) => ({ ...prev, [id]: JSON.stringify(listValue) }));
    };

    const getRawValue = (item) => {
        if (editedContent[item.id] !== undefined) return editedContent[item.id];
        return item.value ?? '';
    };

    const handleSaveAll = async () => {
        setSaving(true);
        setMessage('');

        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                setMessage('Session expired — please login again');
                onLogout?.();
                return;
            }

            const updates = [];

            for (const [id, value] of Object.entries(editedContent)) {
                const item = content.find((c) => c.id === parseInt(id, 10));

                if (value instanceof File) {
                    const formData = new FormData();
                    formData.append('value', item?.value || '');
                    formData.append('image', value);
                    updates.push(
                        fetch(`${API}/content/${id}`, {
                            method: 'PUT',
                            headers: { Authorization: `Bearer ${token}` },
                            body: formData
                        })
                    );
                } else if (value === null) {
                    const formData = new FormData();
                    formData.append('value', item?.value || '');
                    formData.append('image', '');
                    updates.push(
                        fetch(`${API}/content/${id}`, {
                            method: 'PUT',
                            headers: { Authorization: `Bearer ${token}` },
                            body: formData
                        })
                    );
                } else {
                    updates.push(
                        fetch(`${API}/content/${id}`, {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ value })
                        })
                    );
                }
            }

            const results = await Promise.all(updates);

            if (results.some((r) => r.status === 401 || r.status === 403)) {
                setMessage('Session expired — please login again');
                localStorage.removeItem('adminToken');
                onLogout?.();
                return;
            }

            if (results.every((r) => r.ok)) {
                setMessage('All changes saved successfully!');
                setEditedContent({});
                fetchContent();
            } else {
                const failed = results.find((r) => !r.ok);
                const errBody = failed ? await failed.json().catch(() => ({})) : {};
                setMessage(errBody.error || 'Error saving some changes');
            }
        } catch (err) {
            setMessage('Server error');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 4000);
        }
    };

    const sectionContent = content.filter((c) => c.section === activeSection);
    const activeLabel =
        sections.find((s) => s.name === activeSection)?.label ||
        activeSection.replace(/_/g, ' ');

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="dashboard-header-left">
                    <button
                        type="button"
                        className="menu-toggle"
                        aria-label="Open sections menu"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <h1>Admin Dashboard</h1>
                </div>
                <button onClick={onLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            {sidebarOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    aria-label="Close menu"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="dashboard-content">
                <nav className={`sidebar ${sidebarOpen ? 'is-open' : ''}`}>
                    <div className="sidebar-mobile-head">
                        <h3>Sections</h3>
                        <button
                            type="button"
                            className="sidebar-close"
                            aria-label="Close sections"
                            onClick={() => setSidebarOpen(false)}
                        >
                            ×
                        </button>
                    </div>
                    <h3 className="sidebar-desktop-title">Sections</h3>
                    {sections.map((section) => (
                        <button
                            key={section.name}
                            className={`section-btn ${activeSection === section.name ? 'active' : ''}`}
                            onClick={() => setActiveSection(section.name)}
                        >
                            {section.label}
                        </button>
                    ))}
                </nav>

                <main className="main-content">
                    {message && (
                        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}

                    <h2 className="section-title">{activeLabel}</h2>
                    <p className="section-hint">
                        Text aur images yahan se change karo. Cards wale sections me{' '}
                        <strong>+ Add card</strong> se naya card, Remove se hatao. Save ke baad website update
                        hoti hai.
                    </p>

                    <div className="content-list">
                        {sectionContent.length === 0 && (
                            <p className="empty-section">
                                No fields for this section yet. Restart the server to seed defaults.
                            </p>
                        )}

                        {sectionContent.map((item) => {
                            const listSchema = getListSchema(item.section, item.key);

                            return (
                                <div key={item.id} className="content-item">
                                    <label className="content-label">
                                        {item.key.replace(/_/g, ' ').toUpperCase()}
                                    </label>

                                    {listSchema ? (
                                        <ListFieldEditor
                                            section={item.section}
                                            fieldKey={item.key}
                                            value={parseMaybeJson(
                                                getRawValue(item),
                                                listSchema.isObjectMap ? {} : []
                                            )}
                                            onChange={(list) => handleListChange(item.id, list)}
                                        />
                                    ) : isImageField(item) ? (
                                        <div className="image-editor">
                                            {editedContent[item.id] instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(editedContent[item.id])}
                                                    alt={item.key}
                                                    className="preview-image"
                                                />
                                            ) : item.image_url ? (
                                                <img
                                                    src={resolveMediaUrl(item.image_url)}
                                                    alt={item.key}
                                                    className="preview-image"
                                                />
                                            ) : (
                                                <div className="no-image">No image — upload to change</div>
                                            )}
                                            <div className="image-upload">
                                                <input
                                                    type="file"
                                                    id={`image-${item.id}`}
                                                    onChange={(e) => handleImageChange(item.id, e)}
                                                    accept="image/*"
                                                    className="file-input"
                                                />
                                                <label htmlFor={`image-${item.id}`} className="upload-btn">
                                                    {item.image_url ? 'Change Image' : 'Upload Image'}
                                                </label>
                                                {item.image_url && (
                                                    <button
                                                        onClick={() => handleRemoveImage(item.id)}
                                                        className="remove-image-btn"
                                                    >
                                                        Remove Image
                                                    </button>
                                                )}
                                            </div>
                                            {item.image_url && (
                                                <p className="section-hint" style={{ marginTop: 8 }}>
                                                    Current: {item.image_url}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <textarea
                                            value={
                                                typeof getRawValue(item) === 'string'
                                                    ? getRawValue(item)
                                                    : JSON.stringify(getRawValue(item), null, 2)
                                            }
                                            onChange={(e) => handleTextChange(item.id, e.target.value)}
                                            className="content-input"
                                            rows={
                                                item.key.includes('paragraph') ||
                                                item.key.includes('text') ||
                                                item.key.includes('description') ||
                                                item.key === 'items'
                                                    ? 5
                                                    : 2
                                            }
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {Object.keys(editedContent).length > 0 && (
                        <button onClick={handleSaveAll} className="save-all-btn" disabled={saving}>
                            {saving ? 'Saving...' : 'Save All Changes'}
                        </button>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
