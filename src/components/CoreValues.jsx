import React from 'react';
import './CoreValues.css';
import { useContent } from '../context/ContentContext';

const DEFAULT_VALUES = [
    { title: 'Integrity', description: 'Leading with honesty and ethical decision-making.', icon: 'verified' },
    { title: 'Service', description: 'Putting people at the center of governance.', icon: 'volunteer_activism' },
    { title: 'Transparency', description: 'Building trust through open administration.', icon: 'visibility' },
    { title: 'Innovation', description: 'Using technology for better governance.', icon: 'lightbulb' },
    { title: 'Empathy', description: "Understanding people's needs before making decisions.", icon: 'favorite' },
    { title: 'Leadership', description: 'Creating positive change through collaboration.', icon: 'groups' }
];

const CoreValues = () => {
    const { getContent, getJSON } = useContent();
    const label = getContent('core_values', 'label', 'Core Values');
    const headline = getContent('core_values', 'headline', 'Guiding Principles');
    const values = getJSON('core_values', 'items', DEFAULT_VALUES);

    return (
        <section className="core-values-premium-section">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop relative z-10">
                <div className="cv-header-elegant">
                    <span className="cv-label-caps">{label}</span>
                    <h2 className="cv-headline">{headline}</h2>
                    <div className="cv-header-diamond"></div>
                </div>

                <div className="core-values-premium-grid">
                    {values.map((value, index) => (
                        <article key={value.title || index} className="cv-premium-card">
                            <div className="cv-glow-bg" aria-hidden="true" />
                            <div className="cv-card-inner">
                                <span className="cv-card-accent" aria-hidden="true" />
                                <div className="cv-number-watermark" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div className="cv-icon-wrapper">
                                    <span className="material-symbols-outlined cv-icon" aria-hidden="true">
                                        {value.icon || 'star'}
                                    </span>
                                </div>
                                <h3 className="cv-title">{value.title}</h3>
                                <p className="cv-description">{value.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;
