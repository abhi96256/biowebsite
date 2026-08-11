const { section } = require('./_helper');

module.exports = {
    name: 'timeline',
    label: 'Journey / Timeline',
    fields: section('timeline', [
        { key: 'label', value: 'Archival Record' },
        { key: 'headline', value: 'The Service Timeline' },
        {
            key: 'items',
            value: JSON.stringify([
                {
                    year: 'Early Career',
                    title: 'Early Career',
                    subtitle: 'Developed expertise in public administration, policy implementation, and governance.',
                    items: [
                        'Built strong foundation in public administration',
                        'Learned policy implementation strategies',
                        'Developed governance frameworks'
                    ]
                },
                {
                    year: 'Administrative Leadership',
                    title: 'Administrative Leadership',
                    subtitle: 'Led district-level administration while focusing on infrastructure, education, healthcare, and citizen welfare.',
                    items: [
                        'Led district-level administration',
                        'Focused on infrastructure development',
                        'Improved education and healthcare services',
                        'Enhanced citizen welfare programs'
                    ]
                },
                {
                    year: 'Innovation',
                    title: 'Innovation',
                    subtitle: 'Introduced technology-driven governance initiatives to improve service delivery.',
                    items: [
                        'Introduced technology-driven governance',
                        'Improved service delivery systems',
                        'Implemented digital solutions',
                        'Enhanced administrative efficiency'
                    ]
                },
                {
                    year: 'Community Engagement',
                    title: 'Community Engagement',
                    subtitle: 'Worked closely with local communities to understand their challenges and develop practical solutions.',
                    items: [
                        'Worked closely with local communities',
                        'Understood community challenges',
                        'Developed practical solutions',
                        'Built strong community relationships'
                    ]
                }
            ])
        }
    ])
};
