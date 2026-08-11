const { section } = require('./_helper');

module.exports = {
    name: 'faqs',
    label: 'FAQs',
    fields: section('faqs', [
        { key: 'label', value: 'FAQs' },
        { key: 'headline', value: 'Frequently Asked Questions' },
        {
            key: 'items',
            value: JSON.stringify([
                { question: 'What is your leadership philosophy?', answer: 'Leadership means serving people with integrity, accountability, and compassion.' },
                { question: 'What are your focus areas?', answer: 'Education, healthcare, digital governance, infrastructure, sustainability, and citizen engagement.' },
                { question: 'Can citizens contact your office?', answer: 'Yes. Citizens can reach out through the official communication channels for public matters.' },
                { question: 'How do you promote transparency?', answer: 'By encouraging digital governance, efficient grievance redressal, and open communication.' }
            ])
        }
    ])
};
