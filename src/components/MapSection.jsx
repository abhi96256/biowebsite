import React, { useState } from 'react';
import './MapSection.css';

const DISTRICTS = [
  {
    name: 'Gurugram',
    role: 'District Collector',
    years: '1992–1995',
    highlight: 'Led industrial policy reforms that attracted 40+ MNCs',
    icon: '🏙️',
  },
  {
    name: 'Rohtak',
    role: 'Divisional Commissioner',
    years: '1998–2001',
    highlight: 'Transformed rural healthcare delivery across 6 blocks',
    icon: '🏥',
  },
  {
    name: 'Ambala',
    role: 'District Collector',
    years: '2003–2006',
    highlight: 'Implemented landmark land acquisition reforms',
    icon: '⚖️',
  },
  {
    name: 'Hisar',
    role: 'Collector & DM',
    years: '2007–2010',
    highlight: 'Pioneered drought-relief infrastructure across 8 blocks',
    icon: '🌾',
  },
  {
    name: 'Chandigarh',
    role: 'Chief Secretary',
    years: '2019–2023',
    highlight: 'Chaired 400+ cabinet meetings; steered G20 coordination',
    icon: '🏛️',
  },
  {
    name: 'Faridabad',
    role: 'Additional Secretary',
    years: '2014–2017',
    highlight: 'Spearheaded Smart City Mission Phase I',
    icon: '🏗️',
  },
];

const IMPACT_STATS = [
  { num: '12+', label: 'Districts Served' },
  { num: '40', label: 'Years of Service' },
  { num: '6', label: 'Divisions Led' },
  { num: '3', label: 'State Ministries' },
];

const MapSection = () => {
  const [activeDistrict, setActiveDistrict] = useState(0);

  return (
    <section className="geo-section" id="map">

      {/* ── Header ── */}
      <div className="geo-header max-w-container-max px-margin-mobile md-px-margin-desktop">
        <span className="geo-label font-label-caps">Geographic Footprint</span>
        <h2 className="geo-title font-headline-lg">Service Across the Soil</h2>
        <p className="geo-subtitle font-body-md">
          From the bustling industrial hubs of Gurugram to the pastoral heartlands of Rohtak —
          Shri Rajesh Kumar's tenure touched every corner of Haryana.
        </p>
      </div>

      {/* ── Main body ── */}
      <div className="geo-body max-w-container-max px-margin-mobile md-px-margin-desktop">

        {/* Left — District list */}
        <div className="geo-districts">
          {DISTRICTS.map((d, i) => (
            <button
              key={d.name}
              className={`geo-district-btn ${activeDistrict === i ? 'geo-district-btn--active' : ''}`}
              onClick={() => setActiveDistrict(i)}
            >
              <span className="geo-district-icon">{d.icon}</span>
              <div className="geo-district-info">
                <span className="geo-district-name font-label-caps">{d.name}</span>
                <span className="geo-district-role">{d.role}</span>
              </div>
              <span className="geo-district-years font-label-caps">{d.years}</span>
              <span className="geo-district-arrow material-symbols-outlined">chevron_right</span>
            </button>
          ))}
        </div>

        <div className="geo-map-col">
          <div className="geo-map-wrap">
            <div className="geo-map-glow" />

            {/* Haryana SVG Map */}
            <div className="geo-map-frame">
              <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg" className="geo-svg-map">
                {/* Haryana state outline — simplified */}
                <defs>
                  <filter id="glow-filter">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <radialGradient id="stateGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(233,195,73,0.12)"/>
                    <stop offset="100%" stopColor="rgba(233,195,73,0.02)"/>
                  </radialGradient>
                </defs>

                {/* State fill */}
                <path
                  d="M80 60 L160 30 L240 40 L320 70 L350 130 L340 200 L310 260 L280 320 L220 350 L160 340 L110 300 L70 240 L50 170 L60 110 Z"
                  fill="url(#stateGrad)"
                  stroke="rgba(233,195,73,0.4)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Internal district lines */}
                <g stroke="rgba(233,195,73,0.15)" strokeWidth="0.8" fill="none">
                  <line x1="80" y1="150" x2="350" y2="150"/>
                  <line x1="80" y1="230" x2="310" y2="230"/>
                  <line x1="200" y1="40" x2="200" y2="350"/>
                  <line x1="140" y1="40" x2="110" y2="300"/>
                  <line x1="270" y1="50" x2="280" y2="320"/>
                </g>

                {/* Grid dots */}
                {[...Array(8)].map((_, r) =>
                  [...Array(8)].map((_, c) => (
                    <circle key={`${r}-${c}`} cx={70 + c * 40} cy={55 + r * 40}
                      r="1" fill="rgba(233,195,73,0.2)" />
                  ))
                )}

                {/* District markers */}
                {[
                  { name: 'Gurugram', x: 130, y: 180, active: false },
                  { name: 'Rohtak',   x: 185, y: 145, active: false },
                  { name: 'Ambala',   x: 200, y: 75,  active: false },
                  { name: 'Hisar',    x: 110, y: 200, active: false },
                  { name: 'Chandigarh', x: 240, y: 60, active: false },
                  { name: 'Faridabad', x: 160, y: 220, active: false },
                ].map(d => (
                  <g key={d.name}>
                    {/* Pulse ring */}
                    <circle cx={d.x} cy={d.y} r="10" fill="rgba(233,195,73,0.08)"
                      stroke="rgba(233,195,73,0.25)" strokeWidth="0.8"/>
                    {/* Dot */}
                    <circle cx={d.x} cy={d.y} r="4"
                      fill={d.active ? '#e9c349' : 'rgba(233,195,73,0.6)'}
                      stroke="#050e1a" strokeWidth="1.5"
                      filter="url(#glow-filter)"/>
                    {/* Label */}
                    <text x={d.x + 12} y={d.y + 4}
                      fontSize="9" fill="rgba(255,255,255,0.65)"
                      fontFamily="Inter, sans-serif" letterSpacing="0.05em">
                      {d.name}
                    </text>
                  </g>
                ))}

                {/* State label */}
                <text x="200" y="195" textAnchor="middle"
                  fontSize="22" fill="rgba(233,195,73,0.06)"
                  fontFamily="serif" fontWeight="700" letterSpacing="0.1em">
                  HARYANA
                </text>

                {/* Compass rose */}
                <g transform="translate(355,45)">
                  <text x="0" y="0" textAnchor="middle" fontSize="8"
                    fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">N</text>
                  <line x1="0" y1="4" x2="0" y2="14"
                    stroke="rgba(233,195,73,0.4)" strokeWidth="1"/>
                </g>
              </svg>

              {/* Scale bar */}
              <div className="geo-map-scale font-label-caps">
                <span className="geo-scale-line" />
                <span>0 &nbsp; 50 km</span>
              </div>
            </div>

            {/* Active district badge */}
            <div className="geo-map-badge">
              <span className="geo-map-badge-icon">{DISTRICTS[activeDistrict].icon}</span>
              <div>
                <p className="geo-map-badge-name font-label-caps">{DISTRICTS[activeDistrict].name}</p>
                <p className="geo-map-badge-role">{DISTRICTS[activeDistrict].role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Detail card */}
        <div className="geo-detail">
          <div className="geo-detail-card" key={activeDistrict}>
            <div className="geo-detail-top">
              <span className="geo-detail-icon">{DISTRICTS[activeDistrict].icon}</span>
              <div>
                <h3 className="geo-detail-name">{DISTRICTS[activeDistrict].name}</h3>
                <p className="geo-detail-role font-label-caps">{DISTRICTS[activeDistrict].role}</p>
              </div>
            </div>
            <div className="geo-detail-years font-label-caps">
              <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: 'middle' }}>calendar_today</span>
              &nbsp;{DISTRICTS[activeDistrict].years}
            </div>
            <p className="geo-detail-highlight font-body-md">
              {DISTRICTS[activeDistrict].highlight}
            </p>
            <div className="geo-detail-divider" />
            <p className="geo-detail-footer font-label-caps">
              Haryana State Cadre &nbsp;·&nbsp; IAS 1984 Batch
            </p>
          </div>

          {/* Impact Stats */}
          <div className="geo-stats">
            {IMPACT_STATS.map(s => (
              <div key={s.label} className="geo-stat">
                <span className="geo-stat-num">{s.num}</span>
                <span className="geo-stat-label font-label-caps">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MapSection;
