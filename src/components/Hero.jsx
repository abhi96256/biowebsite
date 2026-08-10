import React from 'react';
import StrokeText from './StrokeText';
import './Hero.css';

const Hero = () => {
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
                <span className="hero-v2__name-top">SURESH</span>
                <span className="hero-v2__name-bottom">IAS</span>
            </div>

            {/* ── Main layout ── */}
            <div className="hero-v2__layout">

                {/* LEFT column */}
                <div className="hero-v2__left">
                    <h1 className="hero-v2__title">
                        <StrokeText
                            text="SURESH IAS"
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
                    <p className="hero-v2__tagline font-body-md">
                        Transforming Governance Through Vision, Integrity & Service
                    </p>
                    <p className="hero-v2__description font-body-md">
                        Dedicated to building transparent governance, empowering communities, and creating sustainable development through responsible public administration.
                    </p>

                    <div className="hero-v2__keywords">
                        <span className="hero-v2__keyword font-label-caps">Leadership</span>
                        <span className="hero-v2__keyword font-label-caps">Innovation</span>
                        <span className="hero-v2__keyword font-label-caps">Accountability</span>
                        <span className="hero-v2__keyword font-label-caps">Public Service</span>
                    </div>

                    <div className="hero-v2__btns">
                        <a href="#journey" className="hero-v2__btn hero-v2__btn--primary font-label-caps">
                            Explore My Journey
                        </a>
                    </div>
                </div>

                {/* CENTER — Photo */}
                <div className="hero-v2__center">
                    <div className="hero-v2__photo-wrap">
                        <div className="hero-v2__photo-glow" />
                        <img
                            src="/bg.png"
                            alt="Suresh IAS"
                            className="hero-v2__photo"
                        />
                        {/* floating badge */}
                        <div className="hero-v2__photo-badge">
                            <span className="hero-v2__photo-badge-num">IAS</span>
                            <span className="hero-v2__photo-badge-label font-label-caps">Officer</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT column — stats */}
                <div className="hero-v2__right">
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">10+</span>
                        <span className="hero-v2__stat-label font-label-caps">Years in<br />Public Service</span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">05</span>
                        <span className="hero-v2__stat-label font-label-caps">Districts<br />Served</span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">100+</span>
                        <span className="hero-v2__stat-label font-label-caps">Government<br />Projects Led</span>
                    </div>
                    <div className="hero-v2__divider" />
                    <div className="hero-v2__stat">
                        <span className="hero-v2__stat-num">50+</span>
                        <span className="hero-v2__stat-label font-label-caps">Policy<br />Initiatives</span>
                    </div>

                    <div className="hero-v2__scroll-hint font-label-caps">
                        <span className="hero-v2__scroll-line" />
                        Scroll to explore
                    </div>
                </div>
            </div>

            {/* ── Bottom strip ── */}
            <div className="hero-v2__bottom-strip">
                {['Citizens Impacted: Millions', 'Awards & Recognition: 20+'].map((tag, i) => (
                    <span key={i} className="hero-v2__strip-tag font-label-caps">{tag}</span>
                ))}
            </div>
        </header>
    );
};

export default Hero;
