import React from 'react';
import './Footer.css';

const currentYear = new Date().getFullYear();

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Journey', href: '#journey' },
  { label: 'Impact', href: '#impact' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Legacy', href: '#legacy' },
  { label: 'Blog', href: '#blog' },
  { label: 'Tributes', href: '#tributes' },
];

const QUICK_LINKS = [
  { label: 'Archive Access', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact Registry', href: '#' },
  { label: 'Press & Media', href: '#' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer-v2">

      {/* ── Top back-to-top bar ── */}
      <div className="footer-top-bar">
        <div className="footer-top-inner max-w-container-max px-margin-mobile md-px-margin-desktop">
          <p className="footer-top-text font-label-caps">
            A life in service of the nation &mdash; Haryana Cadre, IAS 1984
          </p>
          <button className="footer-scroll-top font-label-caps" onClick={scrollToTop}>
            Back to top
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_upward</span>
          </button>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="footer-body max-w-container-max px-margin-mobile md-px-margin-desktop">

        {/* Brand col */}
        <div className="footer-brand-col">
          <span className="footer-brand-name">Rajesh Kumar</span>
          <span className="footer-brand-title font-label-caps">IAS (Retd.)</span>
          <p className="footer-brand-desc font-body-md">
            Former Chief Secretary, Government of Haryana. Four decades of transparent governance,
            institutional reform &amp; citizen welfare.
          </p>
          <div className="footer-credentials">
            <span className="footer-cred-tag font-label-caps">Haryana Cadre</span>
            <span className="footer-cred-tag font-label-caps">1984 Batch</span>
            <span className="footer-cred-tag font-label-caps">Padma Nominee</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading font-label-caps">Explore</h4>
          <ul className="footer-link-list">
            {NAV_LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} className="footer-link font-body-md">
                  <span className="footer-link-arrow material-symbols-outlined">chevron_right</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading font-label-caps">Quick Links</h4>
          <ul className="footer-link-list">
            {QUICK_LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} className="footer-link font-body-md">
                  <span className="footer-link-arrow material-symbols-outlined">chevron_right</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Icons col */}
        <div className="footer-contact-col">
          <h4 className="footer-col-heading font-label-caps">Legacy Pillars</h4>
          <div className="footer-pillars">
            {[
              { icon: 'account_balance', label: 'Governance' },
              { icon: 'local_hospital', label: 'Public Health' },
              { icon: 'agriculture', label: 'Agriculture' },
              { icon: 'school', label: 'Education' },
              { icon: 'construction', label: 'Infrastructure' },
              { icon: 'policy', label: 'RTI Reform' },
            ].map(p => (
              <div key={p.label} className="footer-pillar">
                <span className="material-symbols-outlined footer-pillar-icon">{p.icon}</span>
                <span className="footer-pillar-label font-label-caps">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="footer-divider max-w-container-max px-margin-mobile md-px-margin-desktop" />

      {/* ── Bottom bar ── */}
      <div className="footer-bottom max-w-container-max px-margin-mobile md-px-margin-desktop">
        <p className="footer-copy font-label-caps">
          &copy; {currentYear} The Legacy of Shri Rajesh Kumar, IAS (Retd.). All rights reserved.
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
