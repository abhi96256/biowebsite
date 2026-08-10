import React from 'react';
import './Mission.css';

const Mission = () => {
    return (
        <section className="mission-premium-section" id="mission">
            <div className="mission-glow-bg"></div>
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop relative z-10">
                <div className="mission-elegant-card">
                    <div className="mission-badge">
                        <span className="mission-line"></span>
                        <span className="mission-badge-text">My Mission</span>
                        <span className="mission-line"></span>
                    </div>
                    
                    <div className="mission-quote-container">
                        <div className="quote-mark-top">"</div>
                        <h2 className="mission-statement">
                            To create a citizen-first administration where transparency, innovation, accountability, and compassion drive every decision.
                        </h2>
                        <div className="quote-mark-bottom">"</div>
                    </div>
                    
                    <div className="mission-gold-border"></div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
