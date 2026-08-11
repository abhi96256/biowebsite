const { section } = require('./_helper');

module.exports = {
    name: 'initiatives',
    label: 'Initiatives',
    fields: section('initiatives', [
        { key: 'label', value: 'IAS Initiatives' },
        { key: 'headline', value: 'Pillars of Excellence' },
        { key: 'tagline', value: 'Service · Integrity · Excellence' },
        { key: 'subhead', value: 'Focused programmes shaped by public duty — delivering accountable administration and lasting impact for every citizen.' },
        { key: 'nav_kicker', value: 'Areas of Service' },
        {
            key: 'items',
            value: JSON.stringify({
                governance: {
                    title: 'Governance Reforms',
                    icon: 'account_balance',
                    pillar: 'Administrative Excellence',
                    blurb: 'Upholding the IAS ethos of integrity and accountability — building transparent, citizen-first systems that strengthen public trust.',
                    items: ['Digitization of public services', 'Citizen grievance management', 'Online service delivery', 'Paperless administration']
                },
                education: {
                    title: 'Education',
                    icon: 'school',
                    pillar: 'Nation Building',
                    blurb: 'Investing in learning as the foundation of excellence — empowering every child with opportunity, skill, and dignity.',
                    items: ['School infrastructure improvement', 'Digital classrooms', 'Scholarship awareness', 'Skill development', 'Teacher training']
                },
                healthcare: {
                    title: 'Healthcare',
                    icon: 'health_and_safety',
                    pillar: 'Public Welfare',
                    blurb: 'Service with compassion — expanding access to quality care through outreach, awareness, and stronger primary health systems.',
                    items: ['Primary healthcare strengthening', 'Health awareness campaigns', 'Nutrition initiatives', 'Medical outreach', 'Telemedicine support']
                },
                rural: {
                    title: 'Rural Development',
                    icon: 'landscape',
                    pillar: 'Inclusive Growth',
                    blurb: 'Dedicated to rural excellence — building resilient villages with infrastructure, livelihoods, and essential public amenities.',
                    items: ['Village infrastructure', 'Clean drinking water', 'Road connectivity', 'Agricultural development', 'Employment generation']
                },
                women: {
                    title: 'Women Empowerment',
                    icon: 'diversity_1',
                    pillar: 'Social Equity',
                    blurb: 'Advancing dignity and leadership — enabling economic independence, safety, and equal opportunity for women.',
                    items: ['Self-help groups', 'Entrepreneurship support', 'Financial literacy', 'Safety initiatives', 'Leadership development']
                },
                youth: {
                    title: 'Youth Development',
                    icon: 'groups',
                    pillar: 'Future Leadership',
                    blurb: 'Nurturing tomorrow\'s citizens — preparing youth with skills, guidance, and platforms for meaningful national contribution.',
                    items: ['Sports promotion', 'Career guidance', 'Skill development', 'Digital literacy', 'Innovation programs']
                },
                environment: {
                    title: 'Environment',
                    icon: 'eco',
                    pillar: 'Sustainable Duty',
                    blurb: 'Stewardship for generations ahead — protecting natural resources through conservation, awareness, and sustainable action.',
                    items: ['Tree plantation', 'Water conservation', 'Plastic-free campaigns', 'Waste management', 'Climate awareness']
                }
            })
        }
    ])
};
