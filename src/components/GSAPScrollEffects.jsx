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

        // Wait 800ms — gives ContentContext API fetch + React re-renders time to complete
        // so all section h2/p elements are in the DOM before GSAP runs
        const initScrollAnimations = () => {

            // --- 2. SCROLL ANIMATIONS FOR SECTIONS ---
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

        timeout = setTimeout(initScrollAnimations, 800);

        return () => {
            clearTimeout(timeout);
            ScrollTrigger.getAll().forEach(t => t.kill());
            SplitType.revert('h2, h3');
        };
    }, [location]); // Re-run when route changes

    return null;
};

export default GSAPScrollEffects;
