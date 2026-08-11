const { section } = require('./_helper');

module.exports = {
    name: 'footer',
    label: 'Footer',
    fields: section('footer', [
        { key: 'brand_name', value: 'SURESH, IAS' },
        { key: 'brand_desc', value: 'Serving the Nation with Integrity, Accountability & Excellence.' },
        { key: 'top_text', value: 'A life in service of the nation — Haryana Cadre, IAS 1984' },
        { key: 'copyright', value: 'Suresh, IAS. All Rights Reserved.' }
    ])
};
