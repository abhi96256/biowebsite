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

        {/* Center — Map */}
        <div className="geo-map-col">
          <div className="geo-map-wrap">
            {/* Glow pulse behind map */}
            <div className="geo-map-glow" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIBcYUjamJZ7hvbs_8p37kucSty9hF_K5MYPg7Wsta4FBacPrqPN4-0NjTDwkv8DVpUGRTVMt_0sTpvuO7e47ezs0UusZ6kThyQsbRAmiMAE7hyB_1J-DFm1fdPQ7JP0BMwHSE_4t-5RGiZED0IRgezSAj6DAC1pKwZ1e4s9v9aghL1EBVaIzQKtRvOQbN-iP-05sv_l_fSyT7Wh1vC4X7AM3bG1gLMlZYQ3ptoAKjDwbtR2M9"
              alt="Map of Haryana"
              className="geo-map-img"
            />
            {/* Active district overlay */}
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
