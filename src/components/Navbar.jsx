import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'journey', 'leadership', 'vision-mission', 'initiatives', 'achievements', 'media-gallery', 'testimonials', 'blog', 'faqs', 'contact'];
            let current = 'home';
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element && window.pageYOffset >= element.offsetTop - 100) {
                    current = section;
                }
            });
            setActiveSection(current);
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavClick = () => setMenuOpen(false);

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container max-w-container-max px-margin-mobile md-px-margin-desktop">
                    {/* Desktop links */}
                    <div className="navbar-links">
                        {['home', 'about', 'journey', 'leadership', 'vision-mission', 'initiatives', 'achievements', 'media-gallery', 'testimonials', 'blog', 'faqs', 'contact'].map(item => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className={`nav-link font-label-caps ${activeSection === item ? 'active' : ''}`}
                            >
                                {item.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </a>
                        ))}
                    </div>

                    <div className="navbar-right">
                        {/* Hamburger */}
                        <button
                            className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
                            onClick={() => setMenuOpen(o => !o)}
                            aria-label="Toggle menu"
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`}>
                <div className="mobile-drawer__header">
                    <span className="mobile-drawer__brand font-label-caps">Menu</span>
                    <button
                        className="mobile-drawer__close"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="mobile-drawer__inner">
                    {['home', 'about', 'journey', 'leadership', 'vision-mission', 'initiatives', 'achievements', 'media-gallery', 'testimonials', 'blog', 'faqs', 'contact'].map(item => (
                        <a
                            key={item}
                            href={`#${item}`}
                            className={`mobile-nav-link font-label-caps ${activeSection === item ? 'active' : ''}`}
                            onClick={handleNavClick}
                        >
                            {item.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </a>
                    ))}
                </div>
            </div>

            {/* Backdrop */}
            {menuOpen && <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />}
        </>
    );
};

export default Navbar;
