const { section } = require('./_helper');

module.exports = {
    name: 'contact',
    label: 'Contact',
    fields: section('contact', [
        { key: 'label', value: 'Get in Touch' },
        { key: 'headline', value: 'Contact' },
        { key: 'office_label', value: 'Office' },
        { key: 'office_text', value: 'District Collector Office' },
        { key: 'email_label', value: 'Email' },
        { key: 'email_text', value: 'contact@sureshias.in' },
        { key: 'phone_label', value: 'Phone' },
        { key: 'phone_text', value: '+91 XXXXX XXXXX' },
        { key: 'hours_label', value: 'Office Hours' },
        { key: 'hours_text', value: 'Monday – Friday, 9:30 AM – 5:30 PM' },
        { key: 'social_label', value: 'Connect' },
        { key: 'social_headline', value: 'Social Media' },
        { key: 'linkedin_url', value: '#' },
        { key: 'x_url', value: '#' },
        { key: 'facebook_url', value: '#' },
        { key: 'instagram_url', value: '#' },
        { key: 'youtube_url', value: '#' }
    ])
};
