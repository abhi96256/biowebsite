import React from 'react';
import './Stats.css';

const statsData = [
    { value: "40+", label: "Years of Service" },
    { value: "18", label: "Departments" },
    { value: "15", label: "Districts Served" },
    { value: "600+", label: "Projects" },
    { value: "4Cr+", label: "Citizens Impacted" },
    { value: "100+", label: "Awards" },
];

const Stats = () => {
    return (
        <section className="stats-section">
            <div className="stats-grid max-w-container-max px-margin-mobile md-px-margin-desktop">
                {statsData.map((stat, i) => (
                    <div key={i} className="stat-item">
                        <span className="stat-value font-headline-lg">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
