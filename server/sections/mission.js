const { section } = require('./_helper');

module.exports = {
    name: 'mission',
    label: 'Mission Quote',
    fields: section('mission', [
        { key: 'label', value: 'My Mission' },
        { key: 'statement', value: 'To create a citizen-first administration where transparency, innovation, accountability, and compassion drive every decision.' }
    ])
};
