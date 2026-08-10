import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about-section bg-surface" id="about">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop about-grid">
                <div className="about-img-col">
                    <div className="framed-media about-framed">
                        <img alt="Suresh IAS" src="/bg.png" />
                    </div>
                </div>
                <div className="about-text-col">
                    <div className="top-label-group">
                        <div className="h-line"></div>
                        <span className="font-label-caps text-secondary uppercase tracking-widest">About Suresh</span>
                    </div>
                    <h2 className="font-headline-lg text-primary about-title">Suresh is an Indian Administrative Service (IAS) officer committed to delivering efficient governance, transparent administration, and sustainable development.</h2>
                    <p className="font-body-lg text-on-surface-variant mb-6 leading-relaxed">
                        Throughout his career, he has worked across multiple sectors including education, healthcare, infrastructure, digital governance, disaster management, and rural development.
                    </p>
                    <p className="font-body-md text-on-surface-variant-80">
                        His leadership philosophy focuses on innovation, teamwork, and measurable public impact while maintaining the highest standards of ethics and integrity.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
