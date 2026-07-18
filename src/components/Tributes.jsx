import React from 'react';
import './Tributes.css';

const Tributes = () => {
    return (
        <section className="tributes-section rel" id="tributes">
            <div className="max-w-container-max mx-auto px-margin-mobile md-px-margin-desktop z-10 rel">
                <div className="text-center mb-16">
                    <span className="font-label-caps text-secondary-fixed uppercase tracking-widest">Final Chapter</span>
                    <h2 className="font-headline-lg mt-4 tribute-title">Valedictory & Tributes</h2>
                </div>
                
                <div className="tribute-grid">
                    <div className="tribute-video-col">
                        <div className="framed-media video-wrapper group cursor-pointer">
                            <img alt="Farewell Video" className="video-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwQE6kYL1Bg23sIbHm-qDY4YLye22L8IarKvZqLAZ-YpA-R8o5Xzhrhp-PflZZH2JB_r8oBWHEIf-dqahKN628CFF03YXJvazFIFsxP0yVH4yYV9z3TKt1TCblTF8nQ1wcZk4e4D5PY4yqYysuyugvwA6gdj39irvXE1QjlnnYEOL696iLRh2UyJb0stD-erSh6tnDXEsW2beUl6fpEoga9QQ9MDcHc1BtMpZuWxFdD9s1aEFvHKaU" />
                            <span className="material-symbols-outlined play-icon text-secondary-fixed">play_circle</span>
                            <div className="video-label">
                                <p className="font-label-caps text-white">WATCH FAREWELL ADDRESS</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="tribute-form-col">
                        <div className="tribute-form-box">
                            <h3 className="font-headline-md text-secondary-fixed mb-4">Digital Guest Book</h3>
                            <p className="font-body-md text-surface-variant mb-6">Leave a message for Shri Rajesh Kumar on his retirement.</p>
                            <form className="space-y-4">
                                <input className="form-input font-body-md" placeholder="Full Name" type="text" />
                                <textarea className="form-textarea font-body-md" placeholder="Your Tribute" rows="4"></textarea>
                                <button className="submit-btn font-label-caps tracking-widest uppercase">Post Message</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="tribute-messages mt-16">
                    <div className="message-box">
                        "A giant of administration who never forgot the small man. Haryana is a better place because of you, sir."
                        <span className="message-author font-label-caps text-secondary-fixed tracking-widest">— Shri Amit V., IAS (Junior)</span>
                    </div>
                    <div className="message-box">
                        "His tenure at the Health Department remains a textbook case study for efficiency and empathy."
                        <span className="message-author font-label-caps text-secondary-fixed tracking-widest">— Dr. Meera Shah, WHO India</span>
                    </div>
                    <div className="message-box">
                        "Rajesh ji's integrity was our compass during many difficult bureaucratic storms. A true leader."
                        <span className="message-author font-label-caps text-secondary-fixed tracking-widest">— Retired Hon'ble Justice S.K.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tributes;
