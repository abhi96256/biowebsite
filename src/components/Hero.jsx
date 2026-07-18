import React from 'react';
import { useContent } from '../context/ContentContext';
import './Hero.css';

const Hero = () => {
    const { getContent, loading } = useContent();

    if (loading) return <div className="hero-v2" id="home" />;

    const photoSrc = getContent('hero', 'main_image') || '/bg.png';

    return (
        <header className="hero-v2" id="home">

            {/* ── Dark BG + subtle texture ── */}
            <div className="hero-v2__bg">
                <div className="hero-v2__bg-grain" />
                <div className="hero-v2__bg-glow hero-v2__bg-glow--left" />
                <div className="hero-v2__bg-glow hero-v2__bg-glow--right" />
            </div>

            {/* ── Big name text BEHIND photo ── */}
            <div className="hero-v2__name-bg" aria-hidden="true">
                <span className="hero-v2__name-top">RAJESH</span>
                <span className="hero-v2__name-bottom">KUMAR</span>
            </div>

            {/* ── Main layout ── */}
            <div className="hero-v2__layout">

                {/* LEFT column */}
                <div className="hero-v2__left">
                    <p className="hero-v2__badge font-label-caps">
                        <span className="hero-v2__badge-dot" />
                        Honoring 40 Years of Service
                    </p>
                    <h1 className="hero-v2__title">
                        Shri Rajesh<br />Kumar
                        <span className="hero-v2__title-sub"> IAS (Retd.)</span>
                    </h1>
                    <p className="hero-v2__designation font-body-md">
                        Former Chief Secretary<br />Government of Haryana
                    </p>

                    <blockquote className="hero-v2__quote">
                        "Governance is not a throne to sit on&mdash;it is a field in which to toil."
                    </blockquote>

                    <div className="hero-v2__btns">
                        <a href="#journey" className="hero-v2__btn hero-v2__btn--primary font-label-caps">
                            Explore Journey
                        </a>
                        <a href="#legacy" className="hero-v2__btn hero-v2__btn--outline font-label-caps">
                            View Legacy
                        </a>
                    </div>
                </div>

                {/* CENTER — Photo */}
                <div className="hero-v2__center">
                    <div className="hero-v2__photo-wrap">
                        <div className="hero-v2__photo-glow" />
                        <img
                            src={photoSrc}
                            alt="Shri Rajesh Kumar IAS"
                            className="hero-v2__photo"
                        />
                        {/* floating badge */}
                        <div className="hero-v2__photo-badge">
                            <span className="hero-v2__photo-badge-num">IAS</span>
                            <span className="hero-v2__photo-badge-label font-label-caps">1984 Batch</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT column — stats */}
                <div className="hero-v2__right">
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">40+</span>
                        <span className="hero-v2__stat-label font-label-caps">Years of<br />Public Service</span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">12</span>
                        <span className="hero-v2__stat-label font-label-caps">Districts<br />Administered</span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">8</span>
                        <span className="hero-v2__stat-label font-label-caps">National<br />Awards</span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">3</span>
                        <span className="hero-v2__stat-label font-label-caps">State<br />Portfolios</span>
                    </div>

                    <div className="hero-v2__scroll-hint font-label-caps">
                        <span className="hero-v2__scroll-line" />
                        Scroll to explore
                    </div>
                </div>
            </div>

            {/* ── Bottom strip ── */}
            <div className="hero-v2__bottom-strip">
                {['Haryana Cadre', 'Chief Secretary 2019–2023', 'G20 Sherpa Team', 'Padma Shri Nominee', 'RTI Champion'].map((tag, i) => (
                    <span key={i} className="hero-v2__strip-tag font-label-caps">{tag}</span>
                ))}
            </div>
        </header>
    );
};

export default Hero;
