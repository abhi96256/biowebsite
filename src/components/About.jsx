import React from 'react';
import { useContent } from '../context/ContentContext';
import './About.css';

const About = () => {
    const { getContent, loading } = useContent();

    if (loading) {
        return <section className="about-section bg-surface">Loading...</section>;
    }

    return (
        <section className="about-section bg-surface">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop about-grid">
                <div className="about-img-col">
                    <div className="framed-media about-framed">
                        <img alt="Casual portrait" src={getContent('about', 'image') || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTcq88qpVOZi7bJE9cKoEyFWoH0cmtlpSO9hZJ4wUA_MTXlqT3-GMr0nadVS6PPqmy0T6dQp1QXiYHzWNgljYgcOnloKhNx_w7VGRZZRWWUFrk8nf-aVj1wBhc_AyvPJB-0Rd53LUnCPQJvx1guQs01hsFBsEd5JpBT1wuTC60IEPBVtglLJ1ZmRsT-3DyUFGCrn1c-8OhawxaATL1AhHrA2YqKAu_peCe7_5v7MWF34hKvT4UwcEG'} />
                    </div>
                </div>
                <div className="about-text-col">
                    <div className="top-label-group">
                        <div className="h-line"></div>
                        <span className="font-label-caps text-secondary uppercase tracking-widest">{getContent('about', 'label') || 'The Man Behind the Officer'}</span>
                    </div>
                    <h2 className="font-headline-lg text-primary about-title">{getContent('about', 'title') || 'A Life Defined by Integrity and Curiosity'}</h2>
                    <p className="font-body-lg text-on-surface-variant mb-6 leading-relaxed">
                        {getContent('about', 'paragraph1') || 'Beyond the formal corridors of power, Rajesh Kumar is a scholar of Indian history and a patron of the arts. Born into a family of educators, the values of discipline and service were instilled early. His journey into the civil services wasn\'t merely a career choice, but a calling to address the systemic challenges he witnessed in rural India.'}
                    </p>
                    <p className="font-body-md text-on-surface-variant-80">
                        {getContent('about', 'paragraph2') || 'Known for his "open door" policy, he spent his weekends visiting village councils without security, listening to the unspoken needs of the community. His approach to administration is deeply human—balancing the rigidity of law with the flexibility of empathy.'}
                    </p>
                    <div className="sign-container">
                        <img className="sign-img" alt="Signature" src={getContent('about', 'signature') || 'https://lh3.googleusercontent.com/aida-public/AB6AXuANfeiZnU1aFqcxLg-3uioR8DKq6QHsc4bcUaMiqwf9ptvb8Kdu1rucy5hMSgeBLcH2ChLJ6kfgNxUOqz4-qtvJI7e0xdUTmk4PJY8UT-3__Ww3MABJo_UzM-8X8vxoOOHijt0TQl18XluZXqSWrqH235PpUs9xTZzqmVq8eIJwHPXFK49HVZkbyCp9bSdAGMvbK8oTtkJzu9EPmXz2XpqvND_Y_zmIYsWZyTbsvc-V14A4fqrMcqrT'} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
