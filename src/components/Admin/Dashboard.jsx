import React, { useState, useEffect } from 'react';
import './Admin.css';

const Dashboard = ({ onLogout }) => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [activeSection, setActiveSection] = useState('hero');
    const [editedContent, setEditedContent] = useState({});

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://localhost:5000/api/content', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setContent(data);
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, newValue, newImage) => {
        setSaving(true);
        setMessage('');

        try {
            const token = localStorage.getItem('adminToken');
            const formData = new FormData();
            formData.append('value', newValue);
            if (newImage) {
                formData.append('image', newImage);
            }

            const response = await fetch(`http://localhost:5000/api/content/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                setMessage('Content updated successfully!');
                fetchContent();
            } else {
                setMessage('Error updating content');
            }
        } catch (err) {
            setMessage('Server error');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleTextChange = (id, value) => {
        setEditedContent(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSaveAll = async () => {
        setSaving(true);
        setMessage('');
        
        try {
            const token = localStorage.getItem('adminToken');
            const updates = [];
            
            for (const [id, value] of Object.entries(editedContent)) {
                const formData = new FormData();
                const item = content.find(c => c.id === parseInt(id));
                
                if (value instanceof File) {
                    // It's a new image file
                    formData.append('value', item?.value || '');
                    formData.append('image', value);
                } else if (value === null) {
                    // Remove image
                    formData.append('value', item?.value || '');
                    formData.append('image', ''); // Empty string to remove
                } else {
                    // It's text content
                    formData.append('value', value);
                }
                
                updates.push(
                    fetch(`http://localhost:5000/api/content/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        body: formData
                    })
                );
            }
            
            const results = await Promise.all(updates);
            
            if (results.every(r => r.ok)) {
                setMessage('All changes saved successfully!');
                setEditedContent({});
                fetchContent();
            } else {
                setMessage('Error saving some changes');
            }
        } catch (err) {
            setMessage('Server error');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleImageChange = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedContent(prev => ({
                ...prev,
                [id]: file
            }));
        }
    };

    const handleRemoveImage = (id) => {
        setEditedContent(prev => ({
            ...prev,
            [id]: null // Use null to indicate removal
        }));
    };

    const sections = ['hero', 'about', 'timeline', 'impact', 'awards', 'legacy', 'tributes'];
    const sectionContent = content.filter(c => c.section === activeSection);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button onClick={onLogout} className="logout-btn">Logout</button>
            </header>

            <div className="dashboard-content">
                <nav className="sidebar">
                    <h3>Sections</h3>
                    {sections.map(section => (
                        <button
                            key={section}
                            className={`section-btn ${activeSection === section ? 'active' : ''}`}
                            onClick={() => setActiveSection(section)}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                </nav>

                <main className="main-content">
                    {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
                    
                    <h2 className="section-title">
                        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
                    </h2>

                    <div className="content-list">
                        {sectionContent.map(item => (
                            <div key={item.id} className="content-item">
                                <label className="content-label">
                                    {item.key.replace(/_/g, ' ').toUpperCase()}
                                </label>
                                
                                {item.image_url ? (
                                    <div className="image-editor">
                                        {editedContent[item.id] instanceof File ? (
                                            <img 
                                                src={URL.createObjectURL(editedContent[item.id])}
                                                alt={item.key}
                                                className="preview-image"
                                            />
                                        ) : (
                                            <img 
                                                src={`http://localhost:5000${item.image_url}`} 
                                                alt={item.key}
                                                className="preview-image"
                                            />
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
                                                Change Image
                                            </label>
                                            <button 
                                                onClick={() => handleRemoveImage(item.id)}
                                                className="remove-image-btn"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <textarea
                                        value={editedContent[item.id] !== undefined ? editedContent[item.id] : (item.value || '')}
                                        onChange={(e) => handleTextChange(item.id, e.target.value)}
                                        className="content-input"
                                        rows={item.key.includes('paragraph') ? 4 : 2}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {Object.keys(editedContent).length > 0 && (
                        <button 
                            onClick={handleSaveAll} 
                            className="save-all-btn"
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save All Changes'}
                        </button>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
