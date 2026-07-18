import React from 'react';
import './Impact.css';

const impacts = [
    { icon: "medical_services", title: "Healthcare", desc: "Revolutionized primary health reach in tribal belts.", stat: "12M+ Treated" },
    { icon: "school", title: "Education", desc: "Digitalizing 2,500 government schools.", stat: "98% Literacy" },
    { icon: "agriculture", title: "Agriculture", desc: "Direct benefit transfer systems for farmers.", stat: "40% Income Rise" },
    { icon: "water_drop", title: "Water", desc: "Ensuring tap water for every rural household.", stat: "22 Districts Covered" },
    { icon: "female", title: "Women Empowerment", desc: "Self-help group funding and micro-credit.", stat: "500k Entrepreneurs" },
    { icon: "eco", title: "Environment", desc: "Aravalli reforestation and lake rejuvenation.", stat: "1M Trees Planted" },
    { icon: "roofing", title: "Rural Development", desc: "Road connectivity for isolated hamlets.", stat: "12,000km Built" },
    { icon: "emergency", title: "Disaster Management", desc: "State-of-the-art response systems.", stat: "Zero Casualty Goal" }
];

const Impact = () => {
    return (
        <section className="impact-section" id="impact">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop">
                <div className="impact-header-row">
                    <div>
                        <span className="font-label-caps text-secondary uppercase tracking-widest block">Pillars of Impact</span>
                        <h2 className="font-headline-lg text-primary mt-4">Domains of Transformation</h2>
                    </div>
                    <div className="header-line"></div>
                </div>
                
                <div className="impact-grid">
                    {impacts.map((item, index) => (
                        <div key={index} className="impact-card group">
                            <span className="material-symbols-outlined impact-icon text-secondary">{item.icon}</span>
                            <h3 className="font-headline-md title-size mb-2">{item.title}</h3>
                            <p className="font-body-md text-on-surface-variant mb-4">{item.desc}</p>
                            <div className="impact-stat-box">
                                <span className="font-label-caps text-secondary text-lg">{item.stat}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Impact;
