const { section } = require('./_helper');

module.exports = {
    name: 'hero',
    label: 'Hero',
    fields: section('hero', [
        { key: 'name_top', value: 'SURESH' },
        { key: 'name_bottom', value: 'IAS' },
        { key: 'title', value: 'SURESH IAS' },
        { key: 'tagline', value: 'Transforming Governance Through Vision, Integrity & Service' },
        {
            key: 'description',
            value: 'Dedicated to building transparent governance, empowering communities, and creating sustainable development through responsible public administration.'
        },
        { key: 'button1', value: 'Explore My Journey' },
        { key: 'keyword_1', value: 'Leadership' },
        { key: 'keyword_2', value: 'Innovation' },
        { key: 'keyword_3', value: 'Accountability' },
        { key: 'keyword_4', value: 'Public Service' },
        { key: 'stat_1_label', value: 'Citizens Impacted' },
        { key: 'stat_1_value', value: 'Millions' },
        { key: 'stat_2_label', value: 'Awards & Recognition' },
        { key: 'stat_2_value', value: '20+' },
        { key: 'photo_badge', value: 'IAS' },
        { key: 'photo_badge_label', value: 'Officer' },
        { key: 'main_image', value: null, image_url: '/bg.png' }
    ,
        { key: 'meta_title', value: 'Suresh IAS - Official Website | Hero' },
        { key: 'meta_keywords', value: 'Suresh IAS, IAS Officer, Public Service, Hero' },
        { key: 'meta_description', value: 'Learn more about Hero on the official website of Suresh IAS.' }
    ])
};
