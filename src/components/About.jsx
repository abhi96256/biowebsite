import React from 'react';
import { Helmet } from 'react-helmet-async';
import './About.css';
import { useContent } from '../context/ContentContext';

const About = () => {
    const { getContent, getImage } = useContent();

    const label = getContent('about', 'label', 'About Dr.D.Suresh');
    const title = getContent(
        'about',
        'title',
        'Dr.Suresh is an Indian Administrative Service (IAS) officer committed to delivering efficient governance, transparent administration, and sustainable development.'
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
    const image = getImage('about', 'image', '/bg1.png');

    // SEO meta tags from CMS
    const metaTitle = getContent('about', 'meta_title', 'About Dr.D.Suresh IAS - Official Website');
    const metaKeywords = getContent('about', 'meta_keywords', 'Suresh IAS, About, IAS Officer, Public Service');
    const metaDescription = getContent('about', 'meta_description', 'Learn about Dr.D.Suresh IAS, his career, leadership philosophy and commitment to public service and governance.');

    return (
        <>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Helmet>
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
                    <div className="font-body-lg text-on-surface-variant mb-6 leading-relaxed rich-text-content" dangerouslySetInnerHTML={{ __html: paragraph1 }} />
                    <div className="font-body-md text-on-surface-variant-80 rich-text-content" dangerouslySetInnerHTML={{ __html: paragraph2 }} />
                </div>
            </div>
        </section>
        </>
    );
};

export default About;
