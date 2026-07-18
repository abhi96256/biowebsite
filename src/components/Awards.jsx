import React from 'react';
import './Awards.css';

const awardsData = [
    { year: "2021", title: "Excellence in E-Governance", desc: "Prime Minister's Award for Digital Innovation", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSBeo2E13fEmGpIloPlAwkdKAVQ-xcP_dS1WlRfDqu3aJ7bB0L6anOT6M0crwxAMTfAN90FkTYixDcskWj5LrUVtToNZhLsdbt2y7MeoMMQk4PQCzIr2-2rHf8by8vi5aBkUrINxLMp7J1t5497YBKuVNRMqZSEcOBjNU1zJEhI22S12WSPZQh5x70MxEC2QX7uDeg7XDmf_HlUe-Qagm8yv91v7G1MGR8yIgUgK4ug-W4ufArr5_P" },
    { year: "2018", title: "Distinguished Service Medal", desc: "For exceptional performance in district administration", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmPAaNIJJ077_fJ4R7Me_5nXG2PGjnMjiNAQbyeH_EFbQvVI0J3Hcn5zrWXcME2wVJgHYLmSQ2Jxn0bg7-6u-C1iITQT8H2ZhdufrYQmTJTSSMRVR_Wz8nNNo-eGuXO6STc5737WTIzPNHrQBf5AgdEbYXWYkoY0dTVS-AqinyYYcLNC_uuszgYdEXoRR_Qf_Bgcl70XPVzS5ZJLI9waQeKIQ8JhxleJVXXUjddgamhjFofriiaN9C" },
    { year: "2023", title: "Chief Minister's Commendation", desc: "For vision and leadership as Chief Secretary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCaLAY0-5igwtWqGFa068cuoi2leaRqPAAgiTL28lnWjW7ib_hA1EF0BSUsagXzRe6ZnEEfwHF0END4BMpVDlbCn8aV36CLrGZg4zh9ncNMT7Ly6-LnnPhwfaGHiPi9ZMiyvg-u2Sdw2ODJo9wu_neUZ4HzCilquaujL9ytsDwUuu_W4d-82Bh1UqqMCV01MaADyn8AgkAiFi1Un_8Jsg2DjEsC9CfVWTgTq20XBd3t8z6MaoACCzZ" }
];

const Awards = () => {
    return (
        <section className="awards-section" id="gallery">
            <div className="max-w-container-max mx-auto px-margin-mobile md-px-margin-desktop">
                <div className="awards-header text-center mb-16">
                    <span className="font-label-caps text-secondary uppercase tracking-widest">Recognition</span>
                    <h2 className="font-headline-lg text-primary mt-4">A Decorated Career</h2>
                </div>
                <div className="awards-grid">
                    {awardsData.map((award, idx) => (
                        <div key={idx} className="award-item">
                            <div className="framed-media award-img-wrapper group">
                                <img alt={`Award ${idx+1}`} className="award-img" src={award.img} />
                                <div className="award-overlay"></div>
                            </div>
                            <div className="award-content pl-4 border-l">
                                <p className="font-label-caps text-secondary mb-1">{award.year}</p>
                                <h4 className="font-headline-md title-size">{award.title}</h4>
                                <p className="font-body-md text-on-surface-variant-70">{award.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;
