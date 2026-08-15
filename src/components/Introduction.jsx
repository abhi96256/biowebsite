import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Introduction.css';
import { useContent } from '../context/ContentContext';

const Introduction = () => {
    const { getContent } = useContent();

    const label = getContent('introduction', 'label', 'Introduction');
    const headline = getContent('introduction', 'headline', 'Welcome to my official website.');
    const primary = getContent(
        'introduction',
        'primary_text',
        'Public service is more than a profession—it is a lifelong commitment to improving lives, strengthening institutions, and creating opportunities for every citizen.'
    );
    const secondary = getContent(
        'introduction',
        'secondary_text',
        'This platform shares my professional journey, administrative experience, leadership philosophy, development initiatives, and vision for building a more inclusive and progressive society.'
    );

    // Meta tags from CMS
    const metaTitle = getContent('introduction', 'meta_title', 'Suresh IAS - Official Website | Introduction');
    const metaKeywords = getContent('introduction', 'meta_keywords', 'Suresh IAS, IAS Officer, Public Service, Governance, Leadership, Administration');
    const metaDescription = getContent('introduction', 'meta_description', 'Welcome to the official website of Suresh IAS. Learn about his journey in public service, administrative experience, leadership philosophy, and vision for inclusive development.');

    return (
        <>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="keywords" content={metaKeywords} />
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Helmet>
            <section className="introduction-section" id="about">
            <div className="intro-bg-elements">
                <div className="intro-circle-1"></div>
                <div className="intro-circle-2"></div>
                <div className="intro-pattern-overlay"></div>
            </div>

            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop relative z-10">
                <div className="intro-ultimate-card">
                    <div className="corner-border top-left"></div>
                    <div className="corner-border top-right"></div>
                    <div className="corner-border bottom-left"></div>
                    <div className="corner-border bottom-right"></div>

                    <div className="intro-badge">
                        <span className="intro-line"></span>
                        <span className="intro-badge-text">{label}</span>
                        <span className="intro-line"></span>
                    </div>

                    <div className="intro-quote-watermark">"</div>

                    <h2 className="intro-headline">{headline}</h2>

                    <div className="intro-divider">
                        <div className="intro-diamond"></div>
                    </div>

                    <div className="intro-body">
                        <div className="intro-primary-text rich-text-content" dangerouslySetInnerHTML={{ __html: primary }} />
                        <div className="intro-secondary-text rich-text-content" dangerouslySetInnerHTML={{ __html: secondary }} />
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Introduction;
