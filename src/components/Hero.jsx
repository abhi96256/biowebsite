import React from 'react';
import StrokeText from './StrokeText';
import './Hero.css';
import { useContent } from '../context/ContentContext';

const Hero = () => {
    const { getContent, getImage } = useContent();

    const title = getContent('hero', 'title', 'SURESH IAS');
    const tagline = getContent(
        'hero',
        'tagline',
        'Transforming Governance Through Vision, Integrity & Service'
    );
    const description = getContent(
        'hero',
        'description',
        'Dedicated to building transparent governance, empowering communities, and creating sustainable development through responsible public administration.'
    );
    const button1 = getContent('hero', 'button1', 'Explore My Journey');
    const photo = getImage('hero', 'main_image', '/bg.png');
    const keywords = [
        getContent('hero', 'keyword_1', 'Leadership'),
        getContent('hero', 'keyword_2', 'Innovation'),
        getContent('hero', 'keyword_3', 'Accountability'),
        getContent('hero', 'keyword_4', 'Public Service')
    ];
    const strip = [
        `${getContent('hero', 'stat_1_label', 'Citizens Impacted')}: ${getContent('hero', 'stat_1_value', 'Millions')}`,
        `${getContent('hero', 'stat_2_label', 'Awards & Recognition')}: ${getContent('hero', 'stat_2_value', '20+')}`
    ];

    return (
        <header className="hero-v2" id="home">
            <div className="hero-v2__bg">
                <div className="hero-v2__bg-grain" />
                <div className="hero-v2__bg-glow hero-v2__bg-glow--left" />
                <div className="hero-v2__bg-glow hero-v2__bg-glow--right" />
            </div>

            <div className="hero-v2__name-bg" aria-hidden="true">
                <span className="hero-v2__name-top">{getContent('hero', 'name_top', 'SURESH')}</span>
                <span className="hero-v2__name-bottom">{getContent('hero', 'name_bottom', 'IAS')}</span>
            </div>

            <div className="hero-v2__layout">
                <div className="hero-v2__left">
                    <h1 className="hero-v2__title">
                        <StrokeText
                            text={title}
                            strokeColor="#e9c349"
                            fillColor="#ffffff"
                            strokeWidth={2}
                            drawDuration={2}
                            fillDelay={0.3}
                            stagger={0.08}
                            ease="power2.out"
                            trigger="mount"
                            fillMode="wipe"
                            fontSize={72}
                            fontWeight={700}
                            letterSpacing={2}
                            reverse={false}
                        />
                    </h1>
                    <p className="hero-v2__tagline font-body-md">{tagline}</p>
                    <p className="hero-v2__description font-body-md">{description}</p>

                    <div className="hero-v2__keywords">
                        {keywords.map((k) => (
                            <span key={k} className="hero-v2__keyword font-label-caps">
                                {k}
                            </span>
                        ))}
                    </div>

                    <div className="hero-v2__btns">
                        <a href="#journey" className="hero-v2__btn hero-v2__btn--primary font-label-caps">
                            {button1}
                        </a>
                    </div>
                </div>

                <div className="hero-v2__center">
                    <div className="hero-v2__photo-wrap">
                        <div className="hero-v2__photo-glow" />
                        <img src={photo} alt={title} className="hero-v2__photo" />
                        <div className="hero-v2__photo-badge">
                            <span className="hero-v2__photo-badge-num">
                                {getContent('hero', 'photo_badge', 'IAS')}
                            </span>
                            <span className="hero-v2__photo-badge-label font-label-caps">
                                {getContent('hero', 'photo_badge_label', 'Officer')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hero-v2__right">
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">10+</span>
                        <span className="hero-v2__stat-label font-label-caps">
                            Years in
                            <br />
                            Public Service
                        </span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">05</span>
                        <span className="hero-v2__stat-label font-label-caps">
                            Districts
                            <br />
                            Served
                        </span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">100+</span>
                        <span className="hero-v2__stat-label font-label-caps">
                            Government
                            <br />
                            Projects Led
                        </span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">50+</span>
                        <span className="hero-v2__stat-label font-label-caps">
                            Policy
                            <br />
                            Initiatives
                        </span>
                    </div>

                    <div className="hero-v2__scroll-hint font-label-caps">
                        <span className="hero-v2__scroll-line" />
                        Scroll to explore
                    </div>
                </div>
            </div>

            <div className="hero-v2__bottom-strip">
                {strip.map((tag, i) => (
                    <span key={i} className="hero-v2__strip-tag font-label-caps">
                        {tag}
                    </span>
                ))}
            </div>
        </header>
    );
};

export default Hero;
