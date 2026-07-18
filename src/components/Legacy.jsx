import React from 'react';
import './Legacy.css';

const legacyItems = [
    { id: "01", title: "Administrative Reforms", desc: "Restructuring of state departments to reduce bureaucratic lag by 40%." },
    { id: "02", title: "Digital Transformation", desc: "The transition of 100% of state services to the 'Single Window' cloud portal." },
    { id: "03", title: "Crisis Leadership", desc: "Management of state-wide health crises with zero supply chain breakdown." },
    { id: "04", title: "Transparency Protocol", desc: "Implementation of open-ledger auditing for all state-funded infrastructure." },
    { id: "05", title: "Mentorship", desc: "A legacy of over 200 young IAS officers mentored under his direct guidance." }
];

const Legacy = () => {
    return (
        <section className="legacy-section" id="legacy">
            <div className="max-w-container-max mx-auto px-margin-mobile md-px-margin-desktop legacy-grid">
                <div>
                    <span className="font-label-caps text-secondary uppercase tracking-widest">Institutional Memory</span>
                    <h2 className="font-headline-lg text-primary mt-4 mb-8">What will India remember him for?</h2>
                    <div className="legacy-list">
                        {legacyItems.map(item => (
                            <div key={item.id} className="legacy-item group">
                                <span className="font-display-lg text-secondary legacy-num">{item.id}</span>
                                <div>
                                    <h4 className="font-headline-md title-size mb-2">{item.title}</h4>
                                    <p className="font-body-md text-on-surface-variant-80">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="legacy-img-col hidden-mobile">
                    <div className="asymmetric-border pl-12 py-12 relative">
                        <div className="framed-media legacy-img-wrapper absolute-left">
                            <img alt="Building" className="legacy-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA46_Kjo4NwwtacJz_gJduFMjn9ItgVhUR4mPE3VjBA4BbxBfcZ-moE0Nwd82fksz7Qv2v4NLqy0rq0cP6fUeOsLEibcaZW0i6C2t2WI4w5mhu-IGYcB8A4Jw1bA7FjTBlIIgcGtxvaH12zDduFYU8Y2x0LzemMOXTwvjMxgPaU-T_ggQKRHel94INfIYLrBEPQMGF6wFGLUKPUgyQjlQg2tCwoc4VSF48kwx7Hei3pwjmJJvv5EcDU" />
                        </div>
                        <div className="legacy-quote-box mt-8">
                            <h3 className="font-headline-md text-primary mb-4 italic">"An officer is only as good as the trust he earns from the last person in the line."</h3>
                            <p className="font-body-md text-secondary-fixed-dim-alt">From the valedictory address, LBSNAA, 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Legacy;
