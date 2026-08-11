import React from 'react';
import './Awards.css';
import { useContent } from '../context/ContentContext';

const DEFAULT_HIGHLIGHTS = [
    { title: 'Government Schemes', text: 'Successfully implemented major government schemes.', icon: 'check_circle' },
    { title: 'Citizen Services', text: 'Improved citizen service delivery.', icon: 'support_agent' },
    { title: 'Digital Governance', text: 'Strengthened digital governance systems.', icon: 'devices' },
    { title: 'Administrative Excellence', text: 'Recognized for administrative excellence.', icon: 'workspace_premium' },
    { title: 'Disaster Response', text: 'Led successful disaster response operations.', icon: 'emergency' },
    { title: 'Transparency', text: 'Enhanced transparency in administration.', icon: 'visibility' },
    { title: 'Grievance Resolution', text: 'Improved public grievance resolution.', icon: 'task_alt' },
    { title: 'Sustainable Development', text: 'Promoted sustainable development initiatives.', icon: 'eco' }
];

const Awards = () => {
    const { getContent, getJSON } = useContent();
    const label = getContent('awards', 'label', 'Achievements');
    const headline = getContent('awards', 'headline', 'Highlights');
    const lead = getContent(
        'awards',
        'lead',
        'Defining moments of public service — measured in impact, trust, and lasting change.'
    );
    const highlights = getJSON('awards', 'items', DEFAULT_HIGHLIGHTS);

    return (
        <section className="awards-section" id="achievements">
            <div className="max-w-container-max mx-auto px-margin-mobile md-px-margin-desktop">
                <div className="hl-layout">
                    <aside className="hl-intro">
                        <span className="hl-label">{label}</span>
                        <h2 className="hl-headline">{headline}</h2>
                        <p className="hl-lead">{lead}</p>
                        <div className="hl-intro-meta">
                            <span className="hl-count">{String(highlights.length).padStart(2, '0')}</span>
                            <span className="hl-count-label">milestones</span>
                        </div>
                        <div className="hl-intro-diamond" aria-hidden="true" />
                    </aside>

                    <ol className="hl-rail">
                        {highlights.map((item, index) => (
                            <li key={item.title || index} className="hl-row">
                                <span className="hl-num" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="hl-body">
                                    <h3 className="hl-title">{item.title}</h3>
                                    <p className="hl-text">{item.text}</p>
                                </div>
                                <span className="hl-icon" aria-hidden="true">
                                    <span className="material-symbols-outlined">{item.icon || 'star'}</span>
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Awards;
