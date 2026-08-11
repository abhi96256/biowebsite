import React, { useMemo, useState } from 'react';
import { API_URL, resolveServerMediaUrl } from '../../config/api';

const API = API_URL;

const resolveMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
    if (url.startsWith('/uploads')) return resolveServerMediaUrl(url);
    return url;
};

/** Field schemas for repeater/list CMS keys */
const LIST_SCHEMAS = {
    blog_items: {
        label: 'Blog posts',
        addLabel: 'Add blog post',
        imageKey: 'image',
        blank: () => ({
            id: Date.now(),
            category: 'Governance',
            title: 'New article',
            excerpt: '',
            date: new Date().toISOString().slice(0, 10),
            readTime: '5 min read',
            image: '',
            featured: false
        }),
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'date', label: 'Date', type: 'text', placeholder: 'YYYY-MM-DD' },
            { key: 'readTime', label: 'Read time', type: 'text' },
            { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
            { key: 'featured', label: 'Featured', type: 'checkbox' },
            { key: 'image', label: 'Image', type: 'image' }
        ]
    },
    testimonials_items: {
        label: 'Testimonials',
        addLabel: 'Add testimonial',
        imageKey: 'imageUrl',
        blank: () => ({
            name: 'New person',
            title: 'Role',
            description: '',
            imageUrl: ''
        }),
        fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'title', label: 'Title / Role', type: 'text' },
            { key: 'description', label: 'Quote', type: 'textarea' },
            { key: 'imageUrl', label: 'Photo', type: 'image' }
        ]
    },
    leadership_principles: {
        label: 'Leadership images',
        addLabel: 'Add image card',
        imageKey: 'image',
        blank: () => ({
            label: 'New principle',
            image: '',
            link: '#'
        }),
        fields: [
            { key: 'label', label: 'Label', type: 'text' },
            { key: 'image', label: 'Image', type: 'image' }
        ]
    },
    media_gallery_drift_items: {
        label: 'Gallery background photos',
        addLabel: 'Add photo',
        imageKey: 'image',
        blank: () => ({ title: 'Photo', image: '' }),
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'image', label: 'Image', type: 'image' }
        ]
    },
    media_gallery_photo_categories: {
        label: 'Photo category cards',
        addLabel: 'Add card',
        blank: () => ({ name: 'New category', icon: 'photo_camera' }),
        fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'icon', label: 'Icon name', type: 'text', placeholder: 'Material icon e.g. groups' }
        ]
    },
    media_gallery_video_categories: {
        label: 'Video category cards',
        addLabel: 'Add card',
        blank: () => ({ name: 'New category', icon: 'videocam' }),
        fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'icon', label: 'Icon name', type: 'text' }
        ]
    },
    awards_items: {
        label: 'Highlight cards',
        addLabel: 'Add card',
        blank: () => ({ title: 'New highlight', text: '', icon: 'star' }),
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'text', label: 'Text', type: 'textarea' },
            { key: 'icon', label: 'Icon', type: 'text' }
        ]
    },
    faqs_items: {
        label: 'FAQ cards',
        addLabel: 'Add card',
        blank: () => ({ question: 'New question?', answer: '' }),
        fields: [
            { key: 'question', label: 'Question', type: 'text' },
            { key: 'answer', label: 'Answer', type: 'textarea' }
        ]
    },
    core_values_items: {
        label: 'Core value cards',
        addLabel: 'Add card',
        blank: () => ({ title: 'New value', description: '', icon: 'star' }),
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'icon', label: 'Icon (Material name)', type: 'text', placeholder: 'e.g. verified, favorite' }
        ]
    },
    vision_mission_mission_items: {
        label: 'Mission cards',
        addLabel: 'Add card',
        blank: () => ({ text: '', icon: 'star' }),
        fields: [
            { key: 'text', label: 'Text', type: 'text' },
            { key: 'icon', label: 'Icon', type: 'text' }
        ]
    },
    timeline_items: {
        label: 'Timeline cards',
        addLabel: 'Add card',
        blank: () => ({
            year: 'Year',
            title: 'Title',
            subtitle: '',
            items: ['Point 1']
        }),
        fields: [
            { key: 'year', label: 'Year / Phase', type: 'text' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'items', label: 'Bullet points (one per line)', type: 'lines' }
        ]
    },
    initiatives_items: {
        label: 'Initiative cards (tabs)',
        addLabel: 'Add card',
        isObjectMap: true,
        blank: () => ({
            _id: `initiative_${Date.now()}`,
            title: 'New Initiative',
            icon: 'star',
            pillar: 'Pillar name',
            blurb: '',
            items: ['Point 1']
        }),
        fields: [
            { key: '_id', label: 'ID key (unique, no spaces)', type: 'text', placeholder: 'e.g. healthcare' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'pillar', label: 'Pillar label', type: 'text' },
            { key: 'icon', label: 'Icon', type: 'text' },
            { key: 'blurb', label: 'Description', type: 'textarea' },
            { key: 'items', label: 'Bullet points (one per line)', type: 'lines' }
        ]
    },
    blog_categories: {
        label: 'Blog filter categories',
        addLabel: 'Add category',
        isStringList: true,
        blank: () => 'New',
        fields: [{ key: '_value', label: 'Category', type: 'text' }]
    }
};

export function getListSchema(section, key) {
    return LIST_SCHEMAS[`${section}_${key}`] || null;
}

async function uploadImage(file) {
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API}/content/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });
    if (res.status === 401 || res.status === 403) {
        throw new Error('AUTH');
    }
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Upload failed');
    }
    const data = await res.json();
    return data.url;
}

const ListFieldEditor = ({ section, fieldKey, value, onChange }) => {
    const schema = getListSchema(section, fieldKey);
    const [uploading, setUploading] = useState(null);

    const items = useMemo(() => {
        if (!schema) return [];
        if (schema.isStringList) {
            const arr = Array.isArray(value) ? value : [];
            return arr.map((v) => ({ _value: v }));
        }
        if (schema.isObjectMap) {
            const obj = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
            return Object.entries(obj).map(([id, data]) => ({
                _id: id,
                ...(data && typeof data === 'object' ? data : {})
            }));
        }
        return Array.isArray(value) ? value : [];
    }, [value, schema]);

    if (!schema) return null;

    const commit = (next) => {
        if (schema.isStringList) {
            onChange(next.map((row) => row._value));
        } else if (schema.isObjectMap) {
            const obj = {};
            next.forEach((row, i) => {
                const rawId = (row._id || `item_${i + 1}`).toString().trim().replace(/\s+/g, '_');
                const id = rawId || `item_${i + 1}`;
                const { _id, ...rest } = row;
                obj[id] = rest;
            });
            onChange(obj);
        } else {
            onChange(next);
        }
    };

    const updateItem = (index, key, val) => {
        const next = items.map((row, i) => (i === index ? { ...row, [key]: val } : row));
        commit(next);
    };

    const removeItem = (index) => {
        commit(items.filter((_, i) => i !== index));
    };

    const addItem = () => {
        const blank = schema.blank();
        if (schema.isStringList) {
            commit([...items, { _value: blank }]);
        } else {
            commit([...items, blank]);
        }
    };

    const onPickImage = async (index, imageKey, file) => {
        if (!file) return;
        setUploading(`${index}`);
        try {
            const url = await uploadImage(file);
            updateItem(index, imageKey, url);
        } catch (err) {
            if (err.message === 'AUTH') {
                alert('Session expired — please login again');
            } else {
                alert(err.message || 'Upload failed');
            }
        } finally {
            setUploading(null);
        }
    };

    return (
        <div className="list-editor">
            <div className="list-editor__head">
                <span className="list-editor__title">{schema.label}</span>
                <button type="button" className="list-editor__add" onClick={addItem}>
                    + {schema.addLabel}
                </button>
            </div>

            {items.length === 0 && <p className="empty-section">No items yet — click add above.</p>}

            {items.map((row, index) => (
                <div key={index} className="list-card">
                    <div className="list-card__top">
                        <span className="list-card__index">#{index + 1}</span>
                        <button type="button" className="list-card__remove" onClick={() => removeItem(index)}>
                            Remove
                        </button>
                    </div>

                    <div className="list-card__fields">
                        {schema.fields.map((f) => {
                            if (f.type === 'image') {
                                const img = row[f.key];
                                return (
                                    <div key={f.key} className="list-field list-field--image">
                                        <label>{f.label}</label>
                                        {img ? (
                                            <img src={resolveMediaUrl(img)} alt="" className="list-card__thumb" />
                                        ) : (
                                            <div className="no-image">No image</div>
                                        )}
                                        <div className="image-upload">
                                            <input
                                                type="file"
                                                id={`${section}-${fieldKey}-${index}-${f.key}`}
                                                accept="image/*"
                                                className="file-input"
                                                onChange={(e) =>
                                                    onPickImage(index, f.key, e.target.files?.[0])
                                                }
                                            />
                                            <label
                                                htmlFor={`${section}-${fieldKey}-${index}-${f.key}`}
                                                className="upload-btn"
                                            >
                                                {uploading === `${index}`
                                                    ? 'Uploading…'
                                                    : img
                                                      ? 'Change Image'
                                                      : 'Upload Image'}
                                            </label>
                                        </div>
                                    </div>
                                );
                            }

                            if (f.type === 'checkbox') {
                                return (
                                    <label key={f.key} className="list-field list-field--check">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(row[f.key])}
                                            onChange={(e) => updateItem(index, f.key, e.target.checked)}
                                        />
                                        {f.label}
                                    </label>
                                );
                            }

                            if (f.type === 'lines') {
                                const lines = Array.isArray(row[f.key]) ? row[f.key].join('\n') : '';
                                return (
                                    <div key={f.key} className="list-field">
                                        <label>{f.label}</label>
                                        <textarea
                                            className="content-input"
                                            rows={4}
                                            value={lines}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    f.key,
                                                    e.target.value
                                                        .split('\n')
                                                        .map((s) => s.trim())
                                                        .filter(Boolean)
                                                )
                                            }
                                        />
                                    </div>
                                );
                            }

                            if (f.type === 'textarea') {
                                return (
                                    <div key={f.key} className="list-field">
                                        <label>{f.label}</label>
                                        <textarea
                                            className="content-input"
                                            rows={3}
                                            value={row[f.key] ?? ''}
                                            onChange={(e) => updateItem(index, f.key, e.target.value)}
                                        />
                                    </div>
                                );
                            }

                            return (
                                <div key={f.key} className="list-field">
                                    <label>{f.label}</label>
                                    <input
                                        className="content-input"
                                        type="text"
                                        placeholder={f.placeholder || ''}
                                        value={row[f.key] ?? ''}
                                        onChange={(e) => updateItem(index, f.key, e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListFieldEditor;
