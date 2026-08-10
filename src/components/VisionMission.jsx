import React from 'react';
import './VisionMission.css';

const VisionMission = () => {
    const missionItems = [
        { text: 'Deliver quality public services.', icon: 'verified' },
        { text: 'Promote digital governance.', icon: 'devices' },
        { text: 'Improve healthcare.', icon: 'health_and_safety' },
        { text: 'Strengthen education.', icon: 'school' },
        { text: 'Develop infrastructure.', icon: 'domain' },
        { text: 'Support women empowerment.', icon: 'diversity_1' },
        { text: 'Encourage youth participation.', icon: 'groups' },
        { text: 'Protect the environment.', icon: 'eco' },
        { text: 'Promote sustainable development.', icon: 'public' }
    ];

    return (
        <section className="vision-mission-section" id="vision-mission">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop">
                <div className="vm-header">
                    <span className="vm-label">Purpose</span>
                    <h2 className="vm-headline">Vision &amp; Mission</h2>
                    <div className="vm-header-diamond" aria-hidden="true" />
                </div>

                <div className="vision-mission-grid">
                    <article className="vision-card">
                        <div className="vision-card-glow" aria-hidden="true" />
                        <div className="vision-card-inner">
                            <div className="vm-card-top">
                                <span className="vm-card-label">Vision</span>
                                <span className="vm-card-index" aria-hidden="true">01</span>
                            </div>
                            <span className="vision-quote-mark" aria-hidden="true">“</span>
                            <h3 className="vision-statement">
                                To build a modern, transparent, inclusive, and technology-enabled administration that empowers every citizen.
                            </h3>
                            <div className="vision-footer">
                                <span className="vision-footer-line" aria-hidden="true" />
                                <span className="vision-footer-text">Guiding north star</span>
                            </div>
                        </div>
                    </article>

                    <article className="mission-card">
                        <div className="mission-card-inner">
                            <div className="vm-card-top">
                                <span className="vm-card-label vm-card-label--dark">Mission</span>
                                <span className="vm-card-index vm-card-index--dark" aria-hidden="true">02</span>
                            </div>
                            <ul className="mission-grid">
                                {missionItems.map((item, index) => (
                                    <li key={item.text} className="mission-tile">
                                        <span className="mission-tile-num" aria-hidden="true">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="mission-tile-icon" aria-hidden="true">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </span>
                                        <span className="mission-tile-text">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
