import React from 'react';
import { Helmet } from 'react-helmet-async';
import './VisionMission.css';
import { useContent } from '../context/ContentContext';

const DEFAULT_MISSION = [
    { text: 'Deliver quality public services.', icon: 'verified' },
    { text: 'Promote digital governance.', icon: 'devices' },
    { text: 'Improve healthcare.', icon: 'health_and_safety' },
    { text: 'Strengthen education.', icon: 'school' },
    { text: 'Develop infrastructure.', icon: 'domain' },
    { text: 'Support women empowerment.', icon: 'diversity_1' },
    { text: 'Encourage youth participation.', icon: 'groups' },
    { text: 'Protect the environment.', icon: 'eco' },
    { text: 'Promote sustainable development.', icon: 'public' }
];

const VisionMission = () => {
    const { getContent, getJSON } = useContent();

    const label = getContent('vision_mission', 'label', 'Purpose');
    const headline = getContent('vision_mission', 'headline', 'Vision & Mission');
    const visionText = getContent(
        'vision_mission',
        'vision_text',
        'To build a modern, transparent, inclusive, and technology-enabled administration that empowers every citizen.'
    );
    const visionFooter = getContent('vision_mission', 'vision_footer', 'Guiding north star');
    const missionItems = getJSON('vision_mission', 'mission_items', DEFAULT_MISSION);

    // SEO meta tags from CMS
    const metaTitle = getContent('vision_mission', 'meta_title', 'Vision & Mission - Dr.D.Suresh IAS Official Website');
    const metaKeywords = getContent('vision_mission', 'meta_keywords', 'Suresh IAS, Vision, Mission, Governance, Public Service');
    const metaDescription = getContent('vision_mission', 'meta_description', 'Discover the vision and mission of Dr.D.Suresh IAS — building a modern, transparent, and inclusive administration.');

    return (
        <>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Helmet>
        <section className="vision-mission-section" id="vision-mission">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop">
                <div className="vm-header">
                    <span className="vm-label">{label}</span>
                    <h2 className="vm-headline">{headline}</h2>
                    <div className="vm-header-diamond" aria-hidden="true" />
                </div>

                <div className="vision-mission-grid">
                    <article className="vision-card">
                        <div className="vision-card-glow" aria-hidden="true" />
                        <div className="vision-card-inner">
                            <div className="vm-card-top">
                                <span className="vm-card-label">Vision</span>
                                <span className="vm-card-index" aria-hidden="true">
                                    01
                                </span>
                            </div>
                            <span className="vision-quote-mark" aria-hidden="true">
                                “
                            </span>
                            <div className="vision-statement rich-text-content" dangerouslySetInnerHTML={{ __html: visionText }} />
                            <div className="vision-footer">
                                <span className="vision-footer-line" aria-hidden="true" />
                                <span className="vision-footer-text">{visionFooter}</span>
                            </div>
                        </div>
                    </article>

                    <article className="mission-card">
                        <div className="mission-card-inner">
                            <div className="vm-card-top">
                                <span className="vm-card-label vm-card-label--dark">Mission</span>
                                <span className="vm-card-index vm-card-index--dark" aria-hidden="true">
                                    02
                                </span>
                            </div>
                            <ul className="mission-grid">
                                {missionItems.map((item, index) => (
                                    <li key={item.text || index} className="mission-tile">
                                        <span className="mission-tile-num" aria-hidden="true">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="mission-tile-icon" aria-hidden="true">
                                            <span className="material-symbols-outlined">{item.icon || 'star'}</span>
                                        </span>
                                        <span className="mission-tile-text">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
        </>
    );
};

export default VisionMission;
