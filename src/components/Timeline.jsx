import React from 'react';
import './Timeline.css';

const Timeline = () => {
    return (
        <section className="timeline-section" id="journey">
            <div className="timeline-header max-w-container-max px-margin-mobile md-px-margin-desktop">
                <span className="font-label-caps text-secondary uppercase tracking-widest block mb-4">Archival Record</span>
                <h2 className="font-headline-lg text-primary">The Service Timeline</h2>
            </div>
            
            <div className="timeline-container px-margin-mobile">
                <div className="vertical-line"></div>
                
                {/* Item 1 */}
                <div className="timeline-item">
                    <div className="timeline-year right-align md-block">
                        <span className="font-label-caps text-secondary">2005 - 2008</span>
                    </div>
                    <div className="timeline-dot md-block"></div>
                    <div className="timeline-content left-pad">
                        <div className="bg-white framed-media timeline-card">
                            <span className="font-label-caps text-secondary block mobile-only mb-2">2005 - 2008</span>
                            <h3 className="font-headline-md text-primary title-size mb-2">District Magistrate</h3>
                            <p className="font-body-md text-on-surface-variant italic mb-4">Gurugram District</p>
                            <ul className="timeline-list font-body-md">
                                <li><span className="text-secondary mr-2">•</span> Built 400 rural schools</li>
                                <li><span className="text-secondary mr-2">•</span> Reduced local crime rate by 35%</li>
                                <li><span className="text-secondary mr-2">•</span> Launched India's first digital land records initiative</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="timeline-item reverse">
                    <div className="timeline-year left-align md-block">
                        <span className="font-label-caps text-secondary">2012 - 2015</span>
                    </div>
                    <div className="timeline-dot md-block"></div>
                    <div className="timeline-content right-pad">
                        <div className="bg-white framed-media timeline-card">
                            <span className="font-label-caps text-secondary block mobile-only mb-2">2012 - 2015</span>
                            <h3 className="font-headline-md text-primary title-size mb-2">Secretary, Health</h3>
                            <p className="font-body-md text-on-surface-variant italic mb-4">Dept. of Health & Family Welfare</p>
                            <ul className="timeline-list font-body-md">
                                <li><span className="text-secondary mr-2">•</span> Established 12 new tertiary care hospitals</li>
                                <li><span className="text-secondary mr-2">•</span> Achieved 100% infant immunization coverage</li>
                                <li><span className="text-secondary mr-2">•</span> Pioneered the "Health-At-Door" mobile clinic service</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="timeline-item mb-small">
                    <div className="timeline-year right-align md-block">
                        <span className="font-label-caps text-secondary">2019 - 2023</span>
                    </div>
                    <div className="timeline-dot md-block"></div>
                    <div className="timeline-content left-pad">
                        <div className="bg-white framed-media timeline-card">
                            <span className="font-label-caps text-secondary block mobile-only mb-2">2019 - 2023</span>
                            <h3 className="font-headline-md text-primary title-size mb-2">Chief Secretary</h3>
                            <p className="font-body-md text-on-surface-variant italic mb-4">Government of Haryana</p>
                            <ul className="timeline-list font-body-md">
                                <li><span className="text-secondary mr-2">•</span> Oversaw the G20 working group transitions</li>
                                <li><span className="text-secondary mr-2">•</span> Implemented the 'State Excellence' 5-year plan</li>
                                <li><span className="text-secondary mr-2">•</span> Managed the state's largest-ever infrastructure budget</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
