const { section } = require('./_helper');

module.exports = {
    name: 'awards',
    label: 'Highlights / Achievements',
    fields: section('awards', [
        { key: 'label', value: 'Achievements' },
        { key: 'headline', value: 'Highlights' },
        { key: 'lead', value: 'Defining moments of public service — measured in impact, trust, and lasting change.' },
        {
            key: 'items',
            value: JSON.stringify([
                { title: 'Government Schemes', text: 'Successfully implemented major government schemes.', icon: 'check_circle' },
                { title: 'Citizen Services', text: 'Improved citizen service delivery.', icon: 'support_agent' },
                { title: 'Digital Governance', text: 'Strengthened digital governance systems.', icon: 'devices' },
                { title: 'Administrative Excellence', text: 'Recognized for administrative excellence.', icon: 'workspace_premium' },
                { title: 'Disaster Response', text: 'Led successful disaster response operations.', icon: 'emergency' },
                { title: 'Transparency', text: 'Enhanced transparency in administration.', icon: 'visibility' },
                { title: 'Grievance Resolution', text: 'Improved public grievance resolution.', icon: 'task_alt' },
                { title: 'Sustainable Development', text: 'Promoted sustainable development initiatives.', icon: 'eco' }
            ])
        }
    ])
};
