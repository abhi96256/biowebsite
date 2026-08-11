import React, { useState } from 'react';
import DriftWall from './DriftWall';
import './MediaGallery.css';
import { useContent } from '../context/ContentContext';

const DEFAULT_PHOTOS = [
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
];

const DEFAULT_VIDEOS = [
    { name: 'Key Speeches', icon: 'record_voice_over' },
    { name: 'Government Initiatives', icon: 'campaign' },
    { name: 'Public Awareness Campaigns', icon: 'campaign' },
    { name: 'Leadership Talks', icon: 'podcasts' },
    { name: 'Development Stories', icon: 'auto_stories' },
    { name: 'Citizen Success Stories', icon: 'star' }
];

const DEFAULT_DRIFT = [
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
];

const MediaGallery = () => {
    const { getContent, getJSON } = useContent();
    const [activeTab, setActiveTab] = useState('photos');

    const label = getContent('media_gallery', 'label', 'Media & Gallery');
    const headline = getContent('media_gallery', 'headline', 'Photo Gallery');
    const photoCategories = getJSON('media_gallery', 'photo_categories', DEFAULT_PHOTOS);
    const videoCategories = getJSON('media_gallery', 'video_categories', DEFAULT_VIDEOS);
    const driftWallItems = getJSON('media_gallery', 'drift_items', DEFAULT_DRIFT);

    return (
        <section className="media-gallery-section" id="media-gallery">
            <div className="drift-wall-background">
                <DriftWall
                    items={driftWallItems}
                    columns={6}
                    tileWidth={220}
                    tileHeight={150}
                    gap={20}
                    tilt={12}
                    turn={-10}
                    perspective={1000}
                    depth={100}
                    speed={35}
                    direction="up"
                    variance={0.4}
                    parallax={0.5}
                    lift={50}
                    fade={0.5}
                    dim={0.6}
                    overlayColor="#0a0713"
                    radius={12}
                    roll={0}
                    pauseOnHover={false}
                    grayscale={false}
                />
            </div>

            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop media-gallery-content">
                <div className="media-gallery-header">
                    <span className="font-label-caps text-secondary uppercase tracking-widest">{label}</span>
                    <h2 className="font-headline-lg text-primary">{headline}</h2>
                </div>
                <div className="media-tabs">
                    <button
                        className={`media-tab font-label-caps ${activeTab === 'photos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('photos')}
                    >
                        <span className="material-symbols-outlined media-tab-icon">photo_camera</span>
                        Photos
                    </button>
                    <button
                        className={`media-tab font-label-caps ${activeTab === 'videos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        <span className="material-symbols-outlined media-tab-icon">videocam</span>
                        Videos
                    </button>
                </div>
                <div className="media-content">
                    {activeTab === 'photos' ? (
                        <div className="photo-grid">
                            {photoCategories.map((category, index) => (
                                <div key={index} className="photo-category font-label-caps">
                                    <span className="material-symbols-outlined category-icon">{category.icon}</span>
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="video-grid">
                            {videoCategories.map((category, index) => (
                                <div key={index} className="video-category font-label-caps">
                                    <span className="material-symbols-outlined category-icon">{category.icon}</span>
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MediaGallery;
