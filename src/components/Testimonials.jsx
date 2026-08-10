import React, { useState } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Government Official",
            title: "Public Administration",
            description:
                "An inspiring administrator dedicated to public welfare.",
            imageUrl:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
        },
        {
            name: "Community Representative",
            title: "Citizen Engagement",
            description:
                "A leader who listens and acts.",
            imageUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
        },
        {
            name: "Education Leader",
            title: "Education Sector",
            description:
                "Committed to transparency and excellence.",
            imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop",
        },
        {
            name: "Social Organization",
            title: "Community Development",
            description:
                "An officer who believes in people-first governance.",
            imageUrl:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
        }
    ];

    const handleNext = () =>
        setCurrentIndex((index) => (index + 1) % testimonials.length);
    const handlePrevious = () =>
        setCurrentIndex(
            (index) => (index - 1 + testimonials.length) % testimonials.length
        );

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="max-w-container-max px-margin-mobile md-px-margin-desktop">
                <div className="testimonials-header">
                    <span className="font-label-caps text-secondary uppercase tracking-widest">Testimonials</span>
                    <h2 className="font-headline-lg text-primary">What People Say</h2>
                </div>
                
                <div className="testimonial-carousel">
                    {/* Desktop layout */}
                    <div className='testimonial-desktop'>
                        {/* Avatar */}
                        <div className='testimonial-avatar'>
                            <img
                                src={currentTestimonial.imageUrl}
                                alt={currentTestimonial.name}
                                className='testimonial-image'
                                draggable={false}
                            />
                        </div>

                        {/* Card */}
                        <div className='testimonial-card-new'>
                            <div className='testimonial-content-new'>
                                <div className='testimonial-header-new'>
                                    <h2 className='testimonial-name'>
                                        {currentTestimonial.name}
                                    </h2>
                                    <p className='testimonial-title'>
                                        {currentTestimonial.title}
                                    </p>
                                </div>

                                <p className='testimonial-description'>
                                    {currentTestimonial.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile layout */}
                    <div className='testimonial-mobile'>
                        {/* Avatar */}
                        <div className='testimonial-avatar-mobile'>
                            <img
                                src={currentTestimonial.imageUrl}
                                alt={currentTestimonial.name}
                                className='testimonial-image-mobile'
                                draggable={false}
                            />
                        </div>

                        {/* Card content */}
                        <div className='testimonial-content-mobile'>
                            <h2 className='testimonial-name-mobile'>
                                {currentTestimonial.name}
                            </h2>
                            <p className='testimonial-title-mobile'>
                                {currentTestimonial.title}
                            </p>
                            <p className='testimonial-description-mobile'>
                                {currentTestimonial.description}
                            </p>
                        </div>
                    </div>

                    {/* Bottom navigation */}
                    <div className='testimonial-navigation'>
                        {/* Previous */}
                        <button
                            onClick={handlePrevious}
                            aria-label='Previous testimonial'
                            className='nav-button'
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>

                        {/* Dots */}
                        <div className='nav-dots'>
                            {testimonials.map((_, testimonialIndex) => (
                                <button
                                    key={testimonialIndex}
                                    onClick={() => setCurrentIndex(testimonialIndex)}
                                    className={`nav-dot ${testimonialIndex === currentIndex ? 'active' : ''}`}
                                    aria-label={`Go to testimonial ${testimonialIndex + 1}`}
                                />
                            ))}
                        </div>

                        {/* Next */}
                        <button
                            onClick={handleNext}
                            aria-label='Next testimonial'
                            className='nav-button'
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
