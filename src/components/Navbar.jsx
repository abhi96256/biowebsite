import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'journey', 'impact', 'gallery', 'legacy', 'blog', 'tributes'];
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

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container max-w-container-max px-margin-mobile md-px-margin-desktop">
                <span className="navbar-brand font-headline-md tracking-tighter">Rajesh Kumar IAS (Retd.)</span>
                
                <div className="navbar-links">
                    {['home', 'journey', 'impact', 'gallery', 'legacy', 'blog', 'tributes'].map(item => (
                        <a 
                            key={item} 
                            href={`#${item}`} 
                            className={`nav-link font-label-caps ${activeSection === item ? 'active' : ''}`}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </a>
                    ))}
                </div>
                
                <button className="navbar-btn font-label-caps tracking-widest uppercase">
                    Contact
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
