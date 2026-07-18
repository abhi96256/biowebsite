import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const GSAPScrollEffects = () => {
    const location = useLocation();

    useEffect(() => {
        // Clear existing ScrollTriggers
        ScrollTrigger.getAll().forEach(t => t.kill());

        let timeout;

        const checkDOM = () => {
            // Try new hero-v2 title first, then fallback to old hero-title
            const heroTitle = document.querySelector('.hero-v2__title') || document.querySelector('.hero-title');
            if (!heroTitle) {
                timeout = setTimeout(checkDOM, 100);
                return;
            }

            // --- 1. HERO ANIMATION (Similar to initIntro) ---
            const heroTimeline = gsap.timeline({ delay: 0.3 });
            
            // Split hero title for animation
            const textSplit = new SplitType(heroTitle, { types: 'lines,words', lineClass: 'split-line' });
                
                // Add overflow hidden to lines to create the "reveal" effect from Codepen
                const lines = document.querySelectorAll('.split-line');
                lines.forEach(line => {
                    const wrapper = document.createElement('div');
                    wrapper.style.overflow = 'hidden';
                    wrapper.style.display = 'inline-block';
                    // wrap word in wrapper
                    line.parentNode.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                });

                heroTimeline.from(textSplit.words, {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    stagger: 0.05
                });

            // Hero left-side texts and buttons (new V2 selectors + old fallback)
            const heroTexts = document.querySelectorAll(
                '.hero-v2__left p, .hero-v2__left blockquote, .hero-v2__badge, .hero-v2__btns, .hero-text-col p, .hero-btn-group'
            );
            if (heroTexts.length) {
                heroTimeline.from(heroTexts, {
                    x: -50,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power4.out',
                    stagger: 0.1
                }, "-=0.8");
            }

            // Hero photo (new V2 + old fallback)
            const heroImages = document.querySelectorAll('.hero-v2__photo, .hero-img-col img');
            if (heroImages.length) {
                heroTimeline.from(heroImages, {
                    y: 80,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power3.out',
                    stagger: 0.2
                }, "-=1.2");
            }

            // Hero right stats
            const heroStats = document.querySelectorAll('.hero-v2__stat');
            if (heroStats.length) {
                heroTimeline.from(heroStats, {
                    x: 60,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.12
                }, "-=1.2");
            }

            // Bottom strip tags
            const stripTags = document.querySelectorAll('.hero-v2__strip-tag');
            if (stripTags.length) {
                heroTimeline.from(stripTags, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.08
                }, "-=0.6");
            }


            // --- 2. SCROLL ANIMATIONS FOR SECTIONS (Similar to initSlides) ---
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                // Animate Section Titles
                const sectionTitles = section.querySelectorAll('h2, h3');
                sectionTitles.forEach(title => {
                    const splitInfo = new SplitType(title, { types: 'lines', lineClass: 'scroll-line' });
                    
                    // Overflow hidden wrapper for reveal effect
                    splitInfo.lines.forEach(line => {
                        gsap.set(line, { y: 100, opacity: 0 }); // Initial state
                    });

                    gsap.to(splitInfo.lines, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 75%', // triggers when section top hits 75% of viewport
                        },
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power4.out',
                        stagger: 0.1
                    });
                });

                // Animate paragraphs
                const paragraphs = section.querySelectorAll('p, li');
                if (paragraphs.length) {
                    gsap.fromTo(paragraphs, 
                        { y: 50, opacity: 0 },
                        {
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 70%',
                            },
                            y: 0,
                            opacity: 1,
                            duration: 1.2,
                            ease: 'power4.out',
                            stagger: 0.05
                        }
                    );
                }
            });

            // --- TIMELINE SPECIFIC ANIMATION ---
            const timelineSection = document.querySelector('.timeline-section');
            if (timelineSection) {
                // Animate the vertical line drawing down
                const vLine = timelineSection.querySelector('.vertical-line');
                if (vLine) {
                    gsap.fromTo(vLine, 
                        { scaleY: 0, transformOrigin: 'top center' },
                        { 
                            scaleY: 1, 
                            ease: 'none',
                            scrollTrigger: {
                                trigger: timelineSection,
                                start: 'top 50%',
                                end: 'bottom 80%',
                                scrub: true
                            }
                        }
                    );
                }

                // Animate the items sliding in from sides
                const timelineItems = timelineSection.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    const isReverse = item.classList.contains('reverse');
                    const card = item.querySelector('.timeline-card');
                    const dot = item.querySelector('.timeline-dot');
                    const year = item.querySelector('.timeline-year');

                    if (card && dot && year) {
                        const tlItem = gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 80%'
                            }
                        });

                        // Dot pops in
                        tlItem.fromTo(dot, 
                            { scale: 0, opacity: 0 }, 
                            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
                        )
                        // Card slides in from side (reverse = left, normal = right)
                        .fromTo(card, 
                            { x: isReverse ? -100 : 100, opacity: 0 }, 
                            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
                            "-=0.3"
                        )
                        // Year fades in from opposite side
                        .fromTo(year,
                            { x: isReverse ? 50 : -50, opacity: 0 },
                            { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
                            "-=0.8"
                        );
                    }
                });
            }


            // --- 3. PARALLAX EFFECT FOR IMAGES (Similar to initParallax) ---
            // Find wrappers that contain images
            const imageWrappers = document.querySelectorAll('.framed-media, .img-wrapper, .hero-bg-container');
            
            imageWrappers.forEach(wrapper => {
                const img = wrapper.querySelector('img');
                if (img) {
                    // Ensure wrapper has overflow hidden
                    wrapper.style.overflow = 'hidden';
                    
                    // Make image taller to allow parallax scroll
                    img.style.height = '120%';
                    img.style.objectFit = 'cover';
                    
                    gsap.fromTo(img,
                        { y: "-10%" },
                        {
                            y: "10%",
                            ease: "none",
                            scrollTrigger: {
                                trigger: wrapper,
                                start: "top bottom", 
                                end: "bottom top", 
                                scrub: 1 // smooth scrubbing
                            }
                        }
                    );
                }
            });

        };

        checkDOM();

        return () => {
            clearTimeout(timeout);
            ScrollTrigger.getAll().forEach(t => t.kill());
            SplitType.revert('.hero-title, h2, h3');
        };
    }, [location]); // Re-run when route changes

    return null;
};

export default GSAPScrollEffects;
