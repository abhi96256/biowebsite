import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
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

const isRichTextField = (item) => {
    const k = (item.key || '').toLowerCase();
    // Exclude SEO meta fields — these should stay as plain inputs
    if (k.startsWith('meta_')) return false;
    return (
        k.includes('description') ||
        k.includes('paragraph') ||
        k.includes('content') ||
        k.includes('text') ||
        k === 'primary_text' ||
        k === 'secondary_text'
    );
};

const RichTextEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Start typing...'
            }),
            Link.configure({
                openOnClick: false
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            })
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'tiptap-editor'
            }
        }
    });

    if (!editor) return null;

    return (
        <div className="rich-text-editor">
            <div className="editor-toolbar">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`toolbar-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
                >
                    H3
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`toolbar-btn ${editor.isActive('heading', { level: 4 }) ? 'active' : ''}`}
                >
                    H4
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`toolbar-btn ${editor.isActive('heading', { level: 5 }) ? 'active' : ''}`}
                >
                    H5
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={`toolbar-btn ${editor.isActive('heading', { level: 6 }) ? 'active' : ''}`}
                >
                    H6
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`toolbar-btn ${editor.isActive('paragraph') ? 'active' : ''}`}
                >
                    P
                </button>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`toolbar-btn ${editor.isActive('strike') ? 'active' : ''}`}
                >
                    <s>S</s>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`toolbar-btn ${editor.isActive('underline') ? 'active' : ''}`}
                >
                    <u>U</u>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={`toolbar-btn ${editor.isActive('code') ? 'active' : ''}`}
                >
                    &lt;/&gt;
                </button>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
                >
                    1. List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
                >
                    Quote
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const previousUrl = editor.getAttributes('link').href;
                        const url = window.prompt('URL', previousUrl);
                        if (url === null) {
                            return;
                        }
                        if (url === '') {
                            editor.chain().focus().extendMarkRange('link').unsetLink().run();
                            return;
                        }
                        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                    }}
                    className={`toolbar-btn ${editor.isActive('link') ? 'active' : ''}`}
                >
                    Link
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className="toolbar-btn"
                >
                    ---
                </button>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}
                >
                    Left
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}
                >
                    Center
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}
                >
                    Right
                </button>
                <div className="toolbar-divider"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="toolbar-btn"
                >
                    Undo
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="toolbar-btn"
                >
                    Redo
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
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
                                    ) : isRichTextField(item) ? (
                                        <RichTextEditor
                                            value={typeof getRawValue(item) === 'string' ? getRawValue(item) : ''}
                                            onChange={(content) => handleTextChange(item.id, content)}
                                        />
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
