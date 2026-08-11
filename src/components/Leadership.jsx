import React from 'react';
import AccordionGallery from './AccordionGallery';
import './Leadership.css';
import { useContent } from '../context/ContentContext';

const DEFAULT_PRINCIPLES = [
    { image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&h=1200&fit=crop', label: 'Integrity', link: '#' },
    { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=1200&fit=crop', label: 'Accountability', link: '#' },
    { image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=1200&fit=crop', label: 'Innovation', link: '#' },
    { image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=1200&fit=crop', label: 'Collaboration', link: '#' },
    { image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&h=1200&fit=crop', label: 'Excellence', link: '#' },
    { image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&h=1200&fit=crop', label: 'Compassion', link: '#' }
];

const Leadership = () => {
    const { getContent, getJSON } = useContent();

    const label = getContent('leadership', 'label', 'Leadership Philosophy');
    const headline = getContent(
        'leadership',
        'headline',
        'Leadership is about creating opportunities for others to succeed.'
    );
    const description = getContent(
        'leadership',
        'description',
        "Every decision should improve governance, strengthen public trust, and enhance citizens' quality of life."
    );
    const principles = getJSON('leadership', 'principles', DEFAULT_PRINCIPLES).map((p) => ({
        link: '#',
        ...p
    }));

    return (
        <section className="leadership-section" id="leadership">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop">
                <div className="leadership-header">
                    <span className="font-label-caps text-secondary uppercase tracking-widest">{label}</span>
                    <h2 className="font-headline-lg leadership-headline">{headline}</h2>
                    <p className="font-body-md text-on-surface-variant">{description}</p>
                </div>
                <div className="leadership-gallery">
                    <AccordionGallery
                        items={principles}
                        defaultIndex={2}
                        expandRatio={0.58}
                        trigger="both"
                        accentColor="#e9c349"
                        overlayColor="#0a0713"
                        textColor="#ffffff"
                        grayscale
                        showLabels
                        duration={0.55}
                        ease="power3.out"
                        parallax={0.45}
                        tilt={8}
                        stagger={0.05}
                        height={460}
                        gap={10}
                        radius={16}
                        orientation="horizontal"
                    />
                </div>
            </div>
        </section>
    );
};

export default Leadership;
