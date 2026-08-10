import React from 'react';
import './CoreValues.css';

const CoreValues = () => {
    const values = [
        { title: 'Integrity', description: 'Leading with honesty and ethical decision-making.', icon: 'verified' },
        { title: 'Service', description: 'Putting people at the center of governance.', icon: 'volunteer_activism' },
        { title: 'Transparency', description: 'Building trust through open administration.', icon: 'visibility' },
        { title: 'Innovation', description: 'Using technology for better governance.', icon: 'lightbulb' },
        { title: 'Empathy', description: 'Understanding people\'s needs before making decisions.', icon: 'favorite' },
        { title: 'Leadership', description: 'Creating positive change through collaboration.', icon: 'groups' }
    ];

    return (
        <section className="core-values-premium-section">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop relative z-10">
                <div className="cv-header-elegant">
                    <span className="cv-label-caps">Core Values</span>
                    <h2 className="cv-headline">Guiding Principles</h2>
                    <div className="cv-header-diamond"></div>
                </div>
                
                <div className="core-values-premium-grid">
                    {values.map((value, index) => (
                        <article key={value.title} className="cv-premium-card">
                            <div className="cv-glow-bg" aria-hidden="true" />
                            <div className="cv-card-inner">
                                <span className="cv-card-accent" aria-hidden="true" />
                                <div className="cv-number-watermark" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <div className="cv-icon-wrapper">
                                    <span className="material-symbols-outlined cv-icon" aria-hidden="true">
                                        {value.icon}
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
