import React from 'react';
import './Statistics.css';

const Statistics = () => {
    const stats = [
        { number: '10+', label: 'Years in Public Service', icon: 'schedule' },
        { number: '05', label: 'Districts Served', icon: 'location_city' },
        { number: '100+', label: 'Government Projects Led', icon: 'construction' },
        { number: 'Millions', label: 'Citizens Impacted', icon: 'groups' },
        { number: '50+', label: 'Policy Initiatives', icon: 'policy' },
        { number: '20+', label: 'Awards & Recognition', icon: 'emoji_events' }
    ];

    return (
        <section className="statistics-premium-section">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop relative z-10">
                <div className="stats-header-elegant">
                    <div className="stats-header-line"></div>
                    <span className="stats-label-caps">Impact</span>
                    <h2 className="stats-headline">Statistics</h2>
                </div>
                
                <div className="stats-monolith">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-premium-card group">
                                <div className="stat-icon-wrapper">
                                    <span className="material-symbols-outlined stat-icon">{stat.icon}</span>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                                <div className="stat-hover-glow"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
