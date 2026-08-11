import React from 'react';
import './About.css';
import { useContent } from '../context/ContentContext';

const About = () => {
    const { getContent, getImage } = useContent();

    const label = getContent('about', 'label', 'About Suresh');
    const title = getContent(
        'about',
        'title',
        'Suresh is an Indian Administrative Service (IAS) officer committed to delivering efficient governance, transparent administration, and sustainable development.'
    );
    const paragraph1 = getContent(
        'about',
        'paragraph1',
        'Throughout his career, he has worked across multiple sectors including education, healthcare, infrastructure, digital governance, disaster management, and rural development.'
    );
    const paragraph2 = getContent(
        'about',
        'paragraph2',
        'His leadership philosophy focuses on innovation, teamwork, and measurable public impact while maintaining the highest standards of ethics and integrity.'
    );
    const image = getImage('about', 'image', '/bg.png');

    return (
        <section className="about-section bg-surface" id="about">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop about-grid">
                <div className="about-img-col">
                    <div className="framed-media about-framed">
                        <img alt={label} src={image} />
                    </div>
                </div>
                <div className="about-text-col">
                    <div className="top-label-group">
                        <div className="h-line"></div>
                        <span className="font-label-caps text-secondary uppercase tracking-widest">{label}</span>
                    </div>
                    <h2 className="font-headline-lg text-primary about-title">{title}</h2>
                    <p className="font-body-lg text-on-surface-variant mb-6 leading-relaxed">{paragraph1}</p>
                    <p className="font-body-md text-on-surface-variant-80">{paragraph2}</p>
                </div>
            </div>
        </section>
    );
};

export default About;
