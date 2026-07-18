import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: true, // Enable smooth scroll on touch devices (mobile)
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Sync GSAP ScrollTrigger with Lenis scroll
        lenis.on('scroll', ScrollTrigger.update);

        // Tell GSAP to use Lenis's raf (requestAnimationFrame) loop
        gsap.ticker.add((time)=>{
            lenis.raf(time * 1000)
        });

        // Prevents GSAP from adjusting time/lag so it doesn't conflict with Lenis
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
