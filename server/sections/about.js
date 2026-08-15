const { section } = require('./_helper');

module.exports = {
    name: 'about',
    label: 'About',
    fields: section('about', [
        { key: 'label', value: 'About Suresh' },
        {
            key: 'title',
            value: 'Suresh is an Indian Administrative Service (IAS) officer committed to delivering efficient governance, transparent administration, and sustainable development.'
        },
        {
            key: 'paragraph1',
            value: 'Throughout his career, he has worked across multiple sectors including education, healthcare, infrastructure, digital governance, disaster management, and rural development.'
        },
        {
            key: 'paragraph2',
            value: 'His leadership philosophy focuses on innovation, teamwork, and measurable public impact while maintaining the highest standards of ethics and integrity.'
        },
        { key: 'image', value: null, image_url: '/bg.png' }
    ,
        { key: 'meta_title', value: 'Suresh IAS - Official Website | About' },
        { key: 'meta_keywords', value: 'Suresh IAS, IAS Officer, Public Service, About' },
        { key: 'meta_description', value: 'Learn more about About on the official website of Suresh IAS.' }
    ])
};
