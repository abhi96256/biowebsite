import React, { useState } from 'react';
import './FAQs.css';

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What is your leadership philosophy?',
            answer: 'Leadership means serving people with integrity, accountability, and compassion.'
        },
        {
            question: 'What are your focus areas?',
            answer: 'Education, healthcare, digital governance, infrastructure, sustainability, and citizen engagement.'
        },
        {
            question: 'Can citizens contact your office?',
            answer: 'Yes. Citizens can reach out through the official communication channels for public matters.'
        },
        {
            question: 'How do you promote transparency?',
            answer: 'By encouraging digital governance, efficient grievance redressal, and open communication.'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faqs-section" id="faqs">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop">
                <div className="faqs-header">
                    <span className="font-label-caps text-secondary uppercase tracking-widest">FAQs</span>
                    <h2 className="font-headline-lg text-primary">Frequently Asked Questions</h2>
                </div>
                <div className="faqs-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                            <button 
                                className="faq-question font-body-md"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                            </button>
                            <div className={`faq-answer font-body-md ${openIndex === index ? 'open' : ''}`}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQs;
