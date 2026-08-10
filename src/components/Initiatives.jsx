import React, { useState } from 'react';
import './Initiatives.css';

const AshokaChakra = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        <circle cx="50" cy="50" r="6" fill="currentColor" />
        {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + Math.cos(rad) * 10;
            const y1 = 50 + Math.sin(rad) * 10;
            const x2 = 50 + Math.cos(rad) * 34;
            const y2 = 50 + Math.sin(rad) * 34;
            return (
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
            );
        })}
    </svg>
);

const Initiatives = () => {
    const [activeTab, setActiveTab] = useState('healthcare');

    const initiatives = {
        governance: {
            title: 'Governance Reforms',
            icon: 'account_balance',
            pillar: 'Administrative Excellence',
            blurb: 'Upholding the IAS ethos of integrity and accountability — building transparent, citizen-first systems that strengthen public trust.',
            items: [
                'Digitization of public services',
                'Citizen grievance management',
                'Online service delivery',
                'Paperless administration'
            ]
        },
        education: {
            title: 'Education',
            icon: 'school',
            pillar: 'Nation Building',
            blurb: 'Investing in learning as the foundation of excellence — empowering every child with opportunity, skill, and dignity.',
            items: [
                'School infrastructure improvement',
                'Digital classrooms',
                'Scholarship awareness',
                'Skill development',
                'Teacher training'
            ]
        },
        healthcare: {
            title: 'Healthcare',
            icon: 'health_and_safety',
            pillar: 'Public Welfare',
            blurb: 'Service with compassion — expanding access to quality care through outreach, awareness, and stronger primary health systems.',
            items: [
                'Primary healthcare strengthening',
                'Health awareness campaigns',
                'Nutrition initiatives',
                'Medical outreach',
                'Telemedicine support'
            ]
        },
        rural: {
            title: 'Rural Development',
            icon: 'landscape',
            pillar: 'Inclusive Growth',
            blurb: 'Dedicated to rural excellence — building resilient villages with infrastructure, livelihoods, and essential public amenities.',
            items: [
                'Village infrastructure',
                'Clean drinking water',
                'Road connectivity',
                'Agricultural development',
                'Employment generation'
            ]
        },
        women: {
            title: 'Women Empowerment',
            icon: 'diversity_1',
            pillar: 'Social Equity',
            blurb: 'Advancing dignity and leadership — enabling economic independence, safety, and equal opportunity for women.',
            items: [
                'Self-help groups',
                'Entrepreneurship support',
                'Financial literacy',
                'Safety initiatives',
                'Leadership development'
            ]
        },
        youth: {
            title: 'Youth Development',
            icon: 'groups',
            pillar: 'Future Leadership',
            blurb: 'Nurturing tomorrow’s citizens — preparing youth with skills, guidance, and platforms for meaningful national contribution.',
            items: [
                'Sports promotion',
                'Career guidance',
                'Skill development',
                'Digital literacy',
                'Innovation programs'
            ]
        },
        environment: {
            title: 'Environment',
            icon: 'eco',
            pillar: 'Sustainable Duty',
            blurb: 'Stewardship for generations ahead — protecting natural resources through conservation, awareness, and sustainable action.',
            items: [
                'Tree plantation',
                'Water conservation',
                'Plastic-free campaigns',
                'Waste management',
                'Climate awareness'
            ]
        }
    };

    const keys = Object.keys(initiatives);
    const activeIndex = keys.indexOf(activeTab);
    const active = initiatives[activeTab];

    return (
        <section className="initiatives-section" id="initiatives">
            <AshokaChakra className="ini-bg-chakra" />

            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop">
                <div className="ini-header">
                    <div className="ini-ias-seal" aria-hidden="true">
                        <AshokaChakra className="ini-seal-chakra" />
                    </div>
                    <span className="ini-label">IAS Initiatives</span>
                    <h2 className="ini-headline">Pillars of Excellence</h2>
                    <p className="ini-tagline">
                        Service <span aria-hidden="true">·</span> Integrity{' '}
                        <span aria-hidden="true">·</span> Excellence
                    </p>
                    <p className="ini-subhead">
                        Focused programmes shaped by public duty — delivering accountable
                        administration and lasting impact for every citizen.
                    </p>
                </div>

                <div className="initiatives-layout">
                    <nav className="initiatives-nav" aria-label="Focus areas">
                        <p className="ini-nav-kicker">Areas of Service</p>
                        <ol className="ini-tabs">
                            {keys.map((key, index) => (
                                <li key={key}>
                                    <button
                                        type="button"
                                        className={`ini-tab${activeTab === key ? ' is-active' : ''}`}
                                        onClick={() => setActiveTab(key)}
                                        aria-current={activeTab === key ? 'true' : undefined}
                                    >
                                        <span className="ini-tab-num" aria-hidden="true">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="ini-tab-icon" aria-hidden="true">
                                            <span className="material-symbols-outlined">
                                                {initiatives[key].icon}
                                            </span>
                                        </span>
                                        <span className="ini-tab-label">{initiatives[key].title}</span>
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="initiatives-panel" key={activeTab}>
                        <div className="ini-panel-shell">
                            <div className="ini-panel-inner">
                                <AshokaChakra className="ini-panel-chakra" />
                                <span className="ini-panel-watermark" aria-hidden="true">
                                    {String(activeIndex + 1).padStart(2, '0')}
                                </span>

                                <div className="ini-panel-top">
                                    <div className="ini-panel-icon" aria-hidden="true">
                                        <span className="material-symbols-outlined">{active.icon}</span>
                                    </div>
                                    <div>
                                        <span className="ini-panel-kicker">{active.pillar}</span>
                                        <h3 className="ini-panel-title">{active.title}</h3>
                                    </div>
                                </div>

                                <p className="ini-panel-blurb">{active.blurb}</p>

                                <ul className="ini-feature-list">
                                    {active.items.map((item, index) => (
                                        <li key={item} className="ini-feature">
                                            <span className="ini-feature-num" aria-hidden="true">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="ini-feature-text">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="ini-panel-footer">
                                    <span className="ini-panel-footer-mark" aria-hidden="true">
                                        <AshokaChakra className="ini-footer-chakra" />
                                    </span>
                                    <span className="ini-panel-footer-text">
                                        Committed to administrative excellence &amp; public service
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Initiatives;
