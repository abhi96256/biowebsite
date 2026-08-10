import React, { useState, useEffect } from 'react';
import './Timeline.css';

const Timeline = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % 4);
        }, 4000);
        
        return () => clearInterval(interval);
    }, [isMobile]);

    const timelineData = [
        {
            year: 'Early Career',
            title: 'Early Career',
            subtitle: 'Developed expertise in public administration, policy implementation, and governance.',
            items: [
                'Built strong foundation in public administration',
                'Learned policy implementation strategies',
                'Developed governance frameworks'
            ]
        },
        {
            year: 'Administrative Leadership',
            title: 'Administrative Leadership',
            subtitle: 'Led district-level administration while focusing on infrastructure, education, healthcare, and citizen welfare.',
            items: [
                'Led district-level administration',
                'Focused on infrastructure development',
                'Improved education and healthcare services',
                'Enhanced citizen welfare programs'
            ]
        },
        {
            year: 'Innovation',
            title: 'Innovation',
            subtitle: 'Introduced technology-driven governance initiatives to improve service delivery.',
            items: [
                'Introduced technology-driven governance',
                'Improved service delivery systems',
                'Implemented digital solutions',
                'Enhanced administrative efficiency'
            ]
        },
        {
            year: 'Community Engagement',
            title: 'Community Engagement',
            subtitle: 'Worked closely with local communities to understand their challenges and develop practical solutions.',
            items: [
                'Worked closely with local communities',
                'Understood community challenges',
                'Developed practical solutions',
                'Built strong community relationships'
            ]
        }
    ];

    const renderTimelineItem = (item, index, isReverse = false) => (
        <div className={`timeline-item ${isReverse ? 'reverse' : ''} ${index === 2 ? 'mb-small' : ''}`}>
            <div className={`timeline-year ${isReverse ? 'left-align' : 'right-align'} md-block`}>
                <span className="font-label-caps text-secondary">{item.year}</span>
            </div>
            <div className="timeline-dot md-block"></div>
            <div className={`timeline-content ${isReverse ? 'right-pad' : 'left-pad'}`}>
                <div className="bg-white framed-media timeline-card">
                    <span className="font-label-caps text-secondary block mobile-only mb-2">{item.year}</span>
                    <h3 className="font-headline-md text-primary title-size mb-2">{item.title}</h3>
                    <p className="font-body-md text-on-surface-variant italic mb-4">{item.subtitle}</p>
                    <ul className="timeline-list font-body-md">
                        {item.items.map((listItem, i) => (
                            <li key={i}><span className="text-secondary mr-2">•</span> {listItem}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

    const renderCarouselItem = (item, index) => (
        <div className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
            <div className="bg-white framed-media timeline-card carousel-card">
                <span className="font-label-caps text-secondary block mb-2">{item.year}</span>
                <h3 className="font-headline-md text-primary title-size mb-2">{item.title}</h3>
                <p className="font-body-md text-on-surface-variant italic mb-4">{item.subtitle}</p>
                <ul className="timeline-list font-body-md">
                    {item.items.map((listItem, i) => (
                        <li key={i}><span className="text-secondary mr-2">•</span> {listItem}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <section className="timeline-section" id="journey">
            <div className="timeline-header max-w-container-max px-margin-mobile md-px-margin-desktop">
                <span className="font-label-caps text-secondary uppercase tracking-widest block mb-4">Archival Record</span>
                <h2 className="font-headline-lg text-primary">The Service Timeline</h2>
            </div>
            
            {isMobile ? (
                <div className="timeline-carousel px-margin-mobile">
                    <div className="carousel-slides">
                        {timelineData.map((item, index) => renderCarouselItem(item, index))}
                    </div>
                    <div className="carousel-dots">
                        {timelineData.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <span className="carousel-dot-inner"></span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="timeline-container px-margin-mobile">
                    <div className="vertical-line"></div>
                    {timelineData.map((item, index) => renderTimelineItem(item, index, index % 2 === 1))}
                </div>
            )}
        </section>
    );
};

export default Timeline;
