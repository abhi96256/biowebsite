const { section } = require('./_helper');

module.exports = {
    name: 'media_gallery',
    label: 'Media Gallery',
    fields: section('media_gallery', [
        { key: 'label', value: 'Media & Gallery' },
        { key: 'headline', value: 'Photo Gallery' },
        {
            key: 'photo_categories',
            value: JSON.stringify([
                { name: 'Official Meetings', icon: 'groups' },
                { name: 'Public Events', icon: 'celebration' },
                { name: 'Village Visits', icon: 'home' },
                { name: 'Development Projects', icon: 'construction' },
                { name: 'Community Interaction', icon: 'diversity_3' },
                { name: 'School Visits', icon: 'school' },
                { name: 'Healthcare Campaigns', icon: 'local_hospital' },
                { name: 'Award Ceremonies', icon: 'emoji_events' },
                { name: 'National Events', icon: 'flag' },
                { name: 'Environmental Drives', icon: 'eco' }
            ])
        },
        {
            key: 'video_categories',
            value: JSON.stringify([
                { name: 'Key Speeches', icon: 'record_voice_over' },
                { name: 'Government Initiatives', icon: 'campaign' },
                { name: 'Public Awareness Campaigns', icon: 'campaign' },
                { name: 'Leadership Talks', icon: 'podcasts' },
                { name: 'Development Stories', icon: 'auto_stories' },
                { name: 'Citizen Success Stories', icon: 'star' }
            ])
        },
        {
            key: 'drift_items',
            value: JSON.stringify([
                { image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop', title: 'Official Meeting' },
                { image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop', title: 'Public Event' },
                { image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop', title: 'Village Visit' },
                { image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop', title: 'Development Project' },
                { image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop', title: 'Community' },
                { image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop', title: 'School Visit' },
                { image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', title: 'Healthcare' },
                { image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', title: 'Award Ceremony' },
                { image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600&h=400&fit=crop', title: 'National Event' },
                { image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop', title: 'Environment' },
                { image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop', title: 'Leadership' },
                { image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop', title: 'Excellence' }
            ])
        }
    ])
};
