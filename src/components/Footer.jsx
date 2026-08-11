import React from 'react';
import './Footer.css';
import { useContent } from '../context/ContentContext';

const currentYear = new Date().getFullYear();

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Gallery', href: '#media-gallery' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' }
];

const QUICK_LINKS = [
  { label: 'Government Services', href: '#' },
  { label: 'Public Grievances', href: '#' },
  { label: 'RTI Information', href: '#' },
  { label: 'Government Schemes', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' }
];

const Footer = () => {
  const { getContent } = useContent();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer-v2">
      <div className="footer-top-bar">
        <div className="footer-top-inner max-w-container-max px-margin-mobile md-px-margin-desktop">
          <p className="footer-top-text font-label-caps">
            {getContent('footer', 'top_text', 'A life in service of the nation — Haryana Cadre, IAS 1984')}
          </p>
          <button className="footer-scroll-top font-label-caps" onClick={scrollToTop}>
            Back to top
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              arrow_upward
            </span>
          </button>
        </div>
      </div>

      <div className="footer-body max-w-container-max px-margin-mobile md-px-margin-desktop">
        <div className="footer-brand-col">
          <span className="footer-brand-name">{getContent('footer', 'brand_name', 'DR.D.SURESH, IAS')}</span>
          <p className="footer-brand-desc font-body-md">
            {getContent('footer', 'brand_desc', 'Serving the Nation with Integrity, Accountability & Excellence.')}
          </p>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-heading font-label-caps">Explore</h4>
          <ul className="footer-link-list">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="footer-link font-body-md">
                  <span className="footer-link-arrow material-symbols-outlined">chevron_right</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-heading font-label-caps">Quick Links</h4>
          <ul className="footer-link-list">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="footer-link font-body-md">
                  <span className="footer-link-arrow material-symbols-outlined">chevron_right</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-col-heading font-label-caps">Useful Links</h4>
          <ul className="footer-link-list">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="footer-link font-body-md">
                  <span className="footer-link-arrow material-symbols-outlined">chevron_right</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-divider max-w-container-max px-margin-mobile md-px-margin-desktop" />

      <div className="footer-bottom max-w-container-max px-margin-mobile md-px-margin-desktop">
        <p className="footer-copy font-label-caps">
          &copy; {currentYear} {getContent('footer', 'copyright', 'Suresh, IAS. All Rights Reserved.')}
        </p>
        <div className="footer-bottom-icons">
          <span className="material-symbols-outlined footer-icon">history_edu</span>
          <span className="material-symbols-outlined footer-icon">policy</span>
          <span className="material-symbols-outlined footer-icon">account_balance</span>
          <span className="material-symbols-outlined footer-icon">gavel</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
