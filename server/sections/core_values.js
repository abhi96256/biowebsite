const { section } = require('./_helper');

module.exports = {
    name: 'core_values',
    label: 'Core Values',
    fields: section('core_values', [
        { key: 'label', value: 'Core Values' },
        { key: 'headline', value: 'Guiding Principles' },
        {
            key: 'items',
            value: JSON.stringify([
                { title: 'Integrity', description: 'Leading with honesty and ethical decision-making.', icon: 'verified' },
                { title: 'Service', description: 'Putting people at the center of governance.', icon: 'volunteer_activism' },
                { title: 'Transparency', description: 'Building trust through open administration.', icon: 'visibility' },
                { title: 'Innovation', description: 'Using technology for better governance.', icon: 'lightbulb' },
                { title: 'Empathy', description: 'Understanding people\'s needs before making decisions.', icon: 'favorite' },
                { title: 'Leadership', description: 'Creating positive change through collaboration.', icon: 'groups' }
            ])
        }
    ])
};
