import React, { useState, useEffect, useCallback } from 'react';
import DriftWall from './DriftWall';
import './MediaGallery.css';
import { useContent } from '../context/ContentContext';
import { resolveServerMediaUrl } from '../config/api';

const resolveUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
    if (url.startsWith('/uploads')) return resolveServerMediaUrl(url);
    return url;
};

const isYouTube = (url) => url && (url.includes('youtube.com') || url.includes('youtu.be'));
const isVideo = (url) => url && (/\.(mp4|webm|ogg|mov)$/i.test(url) || isYouTube(url));

const getYouTubeEmbed = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const DEFAULT_PHOTOS = [
    { name: 'Official Meetings', icon: 'groups', cover: '', images: [] },
    { name: 'Public Events', icon: 'celebration', cover: '', images: [] },
    { name: 'Village Visits', icon: 'home', cover: '', images: [] },
    { name: 'Development Projects', icon: 'construction', cover: '', images: [] },
    { name: 'Community Interaction', icon: 'diversity_3', cover: '', images: [] },
    { name: 'School Visits', icon: 'school', cover: '', images: [] },
    { name: 'Healthcare Campaigns', icon: 'local_hospital', cover: '', images: [] },
    { name: 'Award Ceremonies', icon: 'emoji_events', cover: '', images: [] },
    { name: 'National Events', icon: 'flag', cover: '', images: [] },
    { name: 'Environmental Drives', icon: 'eco', cover: '', images: [] }
];

const DEFAULT_VIDEOS = [
    { name: 'Key Speeches', icon: 'record_voice_over', videos: [] },
    { name: 'Government Initiatives', icon: 'campaign', videos: [] },
    { name: 'Public Awareness Campaigns', icon: 'campaign', videos: [] },
    { name: 'Leadership Talks', icon: 'podcasts', videos: [] },
    { name: 'Development Stories', icon: 'auto_stories', videos: [] },
    { name: 'Citizen Success Stories', icon: 'star', videos: [] }
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

// ─── Lightbox Modal ────────────────────────────────────────────────────────────
const Lightbox = ({ category, type, onClose }) => {
    const [fullscreenIdx, setFullscreenIdx] = useState(null);

    const media = type === 'photos'
        ? (category.images || []).map(resolveUrl).filter(Boolean)
        : (category.videos || []).map(resolveUrl).filter(Boolean);

    const prev = useCallback(() => setFullscreenIdx(i => Math.max(0, i - 1)), []);
    const next = useCallback(() => setFullscreenIdx(i => Math.min(media.length - 1, i + 1)), [media.length]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') {
                if (fullscreenIdx !== null) setFullscreenIdx(null);
                else onClose();
            }
            if (fullscreenIdx !== null) {
                if (e.key === 'ArrowLeft') prev();
                if (e.key === 'ArrowRight') next();
            }
        };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose, fullscreenIdx, prev, next]);

    const renderGrid = () => (
        <div className="mg-modal-body">
            {media.length === 0 ? (
                <div className="mg-lightbox-empty">
                    <span className="material-symbols-outlined mg-lightbox-empty-icon">
                        {type === 'photos' ? 'add_photo_alternate' : 'video_library'}
                    </span>
                    <p>No {type === 'photos' ? 'photos' : 'videos'} added yet.</p>
                    <p className="mg-lightbox-empty-hint">
                        Go to <strong>Admin Dashboard → Media Gallery</strong> to add {type === 'photos' ? 'images' : 'video URLs'} for this category.
                    </p>
                </div>
            ) : (
                <div className="mg-media-grid">
                    {media.map((url, i) => (
                        <div key={i} className="mg-grid-item" onClick={() => setFullscreenIdx(i)}>
                            {type === 'photos' ? (
                                <img src={url} alt={`Media ${i + 1}`} loading="lazy" />
                            ) : (
                                <div className="mg-grid-video-thumb">
                                    <div className="video-overlay">
                                        <span className="material-symbols-outlined play-icon">play_circle</span>
                                    </div>
                                    {isYouTube(url) ? (
                                        <img src={`https://img.youtube.com/vi/${url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/)?.[1]}/hqdefault.jpg`} alt={`Video ${i + 1}`} onError={(e) => e.target.style.display = 'none'} />
                                    ) : (
                                        <video src={url} preload="metadata" />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const currentUrl = fullscreenIdx !== null ? media[fullscreenIdx] : null;

    return (
        <div className="mg-lightbox-overlay" onClick={() => fullscreenIdx === null && onClose()}>
            <div className={`mg-lightbox ${fullscreenIdx !== null ? 'fullscreen-mode' : ''}`} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="mg-lightbox-header">
                    <div className="mg-lightbox-title">
                        <span className="material-symbols-outlined">{category.icon}</span>
                        {category.name}
                        {media.length > 0 && fullscreenIdx === null && (
                            <span className="mg-lightbox-count">{media.length} Items</span>
                        )}
                        {fullscreenIdx !== null && (
                            <span className="mg-lightbox-count">{fullscreenIdx + 1} / {media.length}</span>
                        )}
                    </div>
                    <div className="mg-lightbox-actions">
                        {fullscreenIdx !== null && (
                            <button className="mg-lightbox-action-btn" onClick={() => setFullscreenIdx(null)} title="Back to Grid">
                                <span className="material-symbols-outlined">grid_view</span>
                            </button>
                        )}
                        <button className="mg-lightbox-action-btn mg-lightbox-close" onClick={onClose} aria-label="Close">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                {fullscreenIdx === null ? renderGrid() : (
                    <div className="mg-lightbox-body mg-fullscreen-viewer">
                        {type === 'photos' ? (
                            <img
                                key={currentUrl}
                                src={currentUrl}
                                alt={`${category.name} ${fullscreenIdx + 1}`}
                                className="mg-lightbox-img"
                            />
                        ) : isYouTube(currentUrl) ? (
                            <iframe
                                key={currentUrl}
                                src={getYouTubeEmbed(currentUrl)}
                                className="mg-lightbox-video"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title={`${category.name} video ${fullscreenIdx + 1}`}
                            />
                        ) : (
                            <video
                                key={currentUrl}
                                src={currentUrl}
                                className="mg-lightbox-video"
                                controls
                                autoPlay
                            />
                        )}

                        {/* Prev / Next */}
                        {media.length > 1 && (
                            <>
                                <button
                                    className="mg-lightbox-nav mg-lightbox-nav--prev"
                                    onClick={prev}
                                    disabled={fullscreenIdx === 0}
                                    aria-label="Previous"
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button
                                    className="mg-lightbox-nav mg-lightbox-nav--next"
                                    onClick={next}
                                    disabled={fullscreenIdx === media.length - 1}
                                    aria-label="Next"
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const MediaGallery = () => {
    const { getContent, getJSON } = useContent();
    const [activeTab, setActiveTab] = useState('photos');
    const [openCategory, setOpenCategory] = useState(null);

    const label = getContent('media_gallery', 'label', 'Media & Gallery');
    const headline = getContent('media_gallery', 'headline', 'Photo Gallery');
    const photoCategories = getJSON('media_gallery', 'photo_categories', DEFAULT_PHOTOS);
    const videoCategories = getJSON('media_gallery', 'video_categories', DEFAULT_VIDEOS);
    const driftWallItems = getJSON('media_gallery', 'drift_items', DEFAULT_DRIFT);

    const currentCategories = activeTab === 'photos' ? photoCategories : videoCategories;

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
                    <div className="photo-grid">
                        {currentCategories.map((category, index) => {
                            const coverSrc = category.cover ? resolveUrl(category.cover) : null;
                            const mediaCount = activeTab === 'photos'
                                ? (category.images || []).length
                                : (category.videos || []).length;

                            return (
                                <div
                                    key={index}
                                    className={`photo-category font-label-caps ${coverSrc ? 'has-cover' : ''}`}
                                    onClick={() => setOpenCategory({ ...category, _type: activeTab })}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={e => e.key === 'Enter' && setOpenCategory({ ...category, _type: activeTab })}
                                    aria-label={`Open ${category.name}`}
                                >
                                    {coverSrc && (
                                        <div className="category-cover">
                                            <img src={coverSrc} alt={category.name} />
                                            <div className="category-cover-overlay" />
                                        </div>
                                    )}
                                    <span className="material-symbols-outlined category-icon">{category.icon}</span>
                                    <span className="category-name">{category.name}</span>
                                    {mediaCount > 0 && (
                                        <span className="category-count">
                                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                                                {activeTab === 'photos' ? 'photo_library' : 'video_library'}
                                            </span>
                                            {mediaCount}
                                        </span>
                                    )}
                                    <span className="category-view-hint font-label-caps">
                                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_full</span>
                                        View
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {openCategory && (
                <Lightbox
                    category={openCategory}
                    type={openCategory._type}
                    onClose={() => setOpenCategory(null)}
                />
            )}
        </section>
    );
};

export default MediaGallery;
