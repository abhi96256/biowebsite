const { section } = require('./_helper');

module.exports = {
    name: 'introduction',
    label: 'Introduction',
    fields: section('introduction', [
        { key: 'label', value: 'Introduction' },
        { key: 'headline', value: 'Welcome to my official website.' },
        { key: 'primary_text', value: 'Public service is more than a profession—it is a lifelong commitment to improving lives, strengthening institutions, and creating opportunities for every citizen.' },
        { key: 'secondary_text', value: 'This platform shares my professional journey, administrative experience, leadership philosophy, development initiatives, and vision for building a more inclusive and progressive society.' }
    ])
};
