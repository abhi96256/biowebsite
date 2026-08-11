const { section } = require('./_helper');

module.exports = {
    name: 'testimonials',
    label: 'Testimonials',
    fields: section('testimonials', [
        { key: 'label', value: 'Testimonials' },
        { key: 'headline', value: 'What People Say' },
        {
            key: 'items',
            value: JSON.stringify([
                {
                    name: 'Government Official',
                    title: 'Public Administration',
                    description: 'An inspiring administrator dedicated to public welfare.',
                    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop'
                },
                {
                    name: 'Community Representative',
                    title: 'Citizen Engagement',
                    description: 'A leader who listens and acts.',
                    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop'
                },
                {
                    name: 'Education Leader',
                    title: 'Education Sector',
                    description: 'Committed to transparency and excellence.',
                    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop'
                },
                {
                    name: 'Social Organization',
                    title: 'Community Development',
                    description: 'An officer who believes in people-first governance.',
                    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop'
                }
            ])
        }
    ])
};
