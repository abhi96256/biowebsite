const { section } = require('./_helper');

module.exports = {
    name: 'vision_mission',
    label: 'Vision & Mission',
    fields: section('vision_mission', [
        { key: 'label', value: 'Purpose' },
        { key: 'headline', value: 'Vision & Mission' },
        { key: 'vision_text', value: 'To build a modern, transparent, inclusive, and technology-enabled administration that empowers every citizen.' },
        { key: 'vision_footer', value: 'Guiding north star' },
        {
            key: 'mission_items',
            value: JSON.stringify([
                { text: 'Deliver quality public services.', icon: 'verified' },
                { text: 'Promote digital governance.', icon: 'devices' },
                { text: 'Improve healthcare.', icon: 'health_and_safety' },
                { text: 'Strengthen education.', icon: 'school' },
                { text: 'Develop infrastructure.', icon: 'domain' },
                { text: 'Support women empowerment.', icon: 'diversity_1' },
                { text: 'Encourage youth participation.', icon: 'groups' },
                { text: 'Protect the environment.', icon: 'eco' },
                { text: 'Promote sustainable development.', icon: 'public' }
            ])
        }
    ])
};
