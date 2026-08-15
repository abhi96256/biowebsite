const { section } = require('./_helper');

module.exports = {
    name: 'blog',
    label: 'Blog',
    fields: section('blog', [
        { key: 'label', value: 'Blog & Insights' },
        { key: 'headline', value: 'Recent Articles' },
        { key: 'description', value: 'Insights on governance, leadership, and public service.' },
        {
            key: 'categories',
            value: JSON.stringify([
                'All',
                'Governance',
                'Innovation',
                'Development',
                'Policy',
                'Youth',
                'Leadership',
                'Technology'
            ])
        },
        {
            key: 'items',
            value: JSON.stringify([
                {
                    id: 1,
                    category: 'Governance',
                    title: 'The Future of Digital Governance',
                    excerpt: 'Exploring how technology is transforming public administration and citizen services.',
                    date: '2024-06-10',
                    readTime: '5 min read',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
                    featured: true
                },
                {
                    id: 2,
                    category: 'Governance',
                    title: 'Building Citizen-Centric Administration',
                    excerpt: 'Putting citizens at the center of policy design and service delivery.',
                    date: '2024-05-22',
                    readTime: '6 min read',
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop',
                    featured: false
                },
                {
                    id: 3,
                    category: 'Innovation',
                    title: 'Innovation in Public Service',
                    excerpt: 'How innovative approaches are solving complex governance challenges.',
                    date: '2024-04-14',
                    readTime: '5 min read',
                    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
                    featured: false
                },
                {
                    id: 4,
                    category: 'Development',
                    title: 'Sustainable Rural Development',
                    excerpt: 'Strategies for inclusive growth in rural communities.',
                    date: '2024-03-05',
                    readTime: '7 min read',
                    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
                    featured: false
                },
                {
                    id: 5,
                    category: 'Policy',
                    title: 'Women Empowerment through Policy',
                    excerpt: 'Creating opportunities for women through targeted policy interventions.',
                    date: '2024-02-18',
                    readTime: '6 min read',
                    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop',
                    featured: false
                },
                {
                    id: 6,
                    category: 'Youth',
                    title: 'Youth as Nation Builders',
                    excerpt: 'Empowering the next generation of leaders and change-makers.',
                    date: '2024-01-30',
                    readTime: '5 min read',
                    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop',
                    featured: false
                },
                {
                    id: 7,
                    category: 'Leadership',
                    title: 'Leadership Lessons in Administration',
                    excerpt: 'Key insights from decades of public service leadership.',
                    date: '2024-01-15',
                    readTime: '6 min read',
                    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
                    featured: false
                },
                {
                    id: 8,
                    category: 'Technology',
                    title: 'Technology for Better Governance',
                    excerpt: 'Leveraging digital tools for efficient and transparent administration.',
                    date: '2024-01-01',
                    readTime: '5 min read',
                    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop',
                    featured: false
                }
            ])
        }
    ,
        { key: 'meta_title', value: 'Suresh IAS - Official Website | Blog' },
        { key: 'meta_keywords', value: 'Suresh IAS, IAS Officer, Public Service, Blog' },
        { key: 'meta_description', value: 'Learn more about Blog on the official website of Suresh IAS.' }
    ])
};
