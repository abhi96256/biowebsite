const { section } = require('./_helper');

module.exports = {
    name: 'leadership',
    label: 'Leadership',
    fields: section('leadership', [
        { key: 'label', value: 'Leadership Philosophy' },
        { key: 'headline', value: 'Leadership is about creating opportunities for others to succeed.' },
        { key: 'description', value: 'Every decision should improve governance, strengthen public trust, and enhance citizens\' quality of life.' },
        {
            key: 'principles',
            value: JSON.stringify([
                { label: 'Integrity', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&h=1200&fit=crop' },
                { label: 'Accountability', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=1200&fit=crop' },
                { label: 'Innovation', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=1200&fit=crop' },
                { label: 'Collaboration', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=1200&fit=crop' },
                { label: 'Excellence', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&h=1200&fit=crop' },
                { label: 'Compassion', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&h=1200&fit=crop' }
            ])
        }
    ,
        { key: 'meta_title', value: 'Suresh IAS - Official Website | Leadership' },
        { key: 'meta_keywords', value: 'Suresh IAS, IAS Officer, Public Service, Leadership' },
        { key: 'meta_description', value: 'Learn more about Leadership on the official website of Suresh IAS.' }
    ])
};
