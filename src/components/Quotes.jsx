import React from 'react';
import './Quotes.css';

const Quotes = () => {
    return (
        <section className="quotes-section bg-primary text-white text-center rel">
            <div className="quotes-bg-overlay"></div>
            <div className="quotes-content max-w-3xl mx-auto px-margin-mobile">
                <span className="material-symbols-outlined text-secondary quote-icon">format_quote</span>
                <blockquote className="quote-text font-headline-md italic leading-tight">
                    "Administration is not about power. It is about responsibility—the weight of millions of expectations carried with a steady hand."
                </blockquote>
                <div className="quote-line bg-secondary mx-auto"></div>
            </div>
        </section>
    );
};

export default Quotes;
