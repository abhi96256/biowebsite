import React from 'react';
import './Introduction.css';

const Introduction = () => {
    return (
        <section className="introduction-section" id="about">
            <div className="intro-bg-elements">
                <div className="intro-circle-1"></div>
                <div className="intro-circle-2"></div>
                <div className="intro-pattern-overlay"></div>
            </div>
            
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop relative z-10">
                
                <div className="intro-ultimate-card">
                    {/* Decorative Corner Borders */}
                    <div className="corner-border top-left"></div>
                    <div className="corner-border top-right"></div>
                    <div className="corner-border bottom-left"></div>
                    <div className="corner-border bottom-right"></div>

                    <div className="intro-badge">
                        <span className="intro-line"></span>
                        <span className="intro-badge-text">Introduction</span>
                        <span className="intro-line"></span>
                    </div>

                    <div className="intro-quote-watermark">
                        "
                    </div>

                    <h2 className="intro-headline">Welcome to my official website.</h2>
                    
                    <div className="intro-divider">
                        <div className="intro-diamond"></div>
                    </div>

                    <div className="intro-body">
                        <p className="intro-primary-text">
                            <span className="drop-cap">P</span>ublic service is more than a profession—it is a lifelong commitment to improving lives, strengthening institutions, and creating opportunities for every citizen.
                        </p>
                        <p className="intro-secondary-text">
                            This platform shares my professional journey, administrative experience, leadership philosophy, development initiatives, and vision for building a more inclusive and progressive society.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Introduction;
