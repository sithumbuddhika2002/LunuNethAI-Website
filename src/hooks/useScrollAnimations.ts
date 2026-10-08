import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize GSAP ScrollTrigger animations across the LunuNeth AI homepage.
 * Reversible on upward scroll, with reduced-motion support and clean teardown.
 */
export function useScrollAnimations(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    // Respect user's accessibility motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Ensure all animated elements are immediately visible without transforms
      gsap.set([
        '.feature-card',
        '.architecture-card',
        '.connector-line',
        '.connector-node',
        '.supervisor-card',
        '.student-card',
        '.contact-info',
        '.contact-form-glass',
        '.section-header'
      ], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        scaleX: 1,
        clearProps: 'all'
      });
      return;
    }

    // Context for easy scoping and garbage collection
    const ctx = gsap.context(() => {
      // 1. Universal Section Header Entrance
      const sectionHeaders = document.querySelectorAll('.section-header');
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 28 },
          {
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out'
          }
        );
      });

      // 2. Intelligent Crop Protection Modules (#features)
      const featureCards = document.querySelectorAll('.feature-card');
      if (featureCards.length > 0) {
        gsap.fromTo(
          featureCards,
          { opacity: 0, y: 38 },
          {
            scrollTrigger: {
              trigger: '.features-grid',
              start: 'top 82%',
              toggleActions: 'play reverse play reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out'
          }
        );
      }

      // 3. Platform Architecture (#architecture)
      const archGrid = document.querySelector('.architecture-grid');
      if (archGrid) {
        const archTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#architecture',
            start: 'top 75%',
            toggleActions: 'play reverse play reverse'
          }
        });

        // Step 1: Card 1 (Flutter App)
        archTl.fromTo(
          '.architecture-card:nth-child(1)',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );

        // Step 2: Connector 1 (Line draws, nodes pulse)
        archTl.fromTo(
          '.architecture-connector:nth-child(2) .connector-line',
          { scaleX: 0, transformOrigin: 'left center', opacity: 0 },
          { scaleX: 1, opacity: 0.8, duration: 0.4, ease: 'power2.out' },
          '-=0.15'
        );
        archTl.fromTo(
          '.architecture-connector:nth-child(2) .connector-node',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.1, duration: 0.3, ease: 'back.out(2)' },
          '-=0.25'
        );

        // Step 3: Card 2 (FastAPI Router)
        archTl.fromTo(
          '.architecture-card:nth-child(3)',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.15'
        );

        // Step 4: Connector 2 (Line draws, nodes pulse)
        archTl.fromTo(
          '.architecture-connector:nth-child(4) .connector-line',
          { scaleX: 0, transformOrigin: 'left center', opacity: 0 },
          { scaleX: 1, opacity: 0.8, duration: 0.4, ease: 'power2.out' },
          '-=0.15'
        );
        archTl.fromTo(
          '.architecture-connector:nth-child(4) .connector-node',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.1, duration: 0.3, ease: 'back.out(2)' },
          '-=0.25'
        );

        // Step 5: Card 3 (DL Inference Pipelines)
        archTl.fromTo(
          '.architecture-card:nth-child(5)',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.15'
        );
      }

      // 4. Research Team (#team)
      const supervisorCards = document.querySelectorAll('.supervisor-card');
      if (supervisorCards.length > 0) {
        gsap.fromTo(
          supervisorCards,
          { opacity: 0, y: 32 },
          {
            scrollTrigger: {
              trigger: '.supervisor-container',
              start: 'top 82%',
              toggleActions: 'play reverse play reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.15,
            ease: 'power2.out'
          }
        );
      }

      const teamDivider = document.querySelector('.team-section-divider');
      if (teamDivider) {
        gsap.fromTo(
          teamDivider,
          { opacity: 0, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: teamDivider,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse'
            },
            opacity: 0.7,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          }
        );
      }

      const studentCards = document.querySelectorAll('.student-card');
      if (studentCards.length > 0) {
        gsap.fromTo(
          studentCards,
          { opacity: 0, y: 32 },
          {
            scrollTrigger: {
              trigger: '.student-grid-4',
              start: 'top 82%',
              toggleActions: 'play reverse play reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out'
          }
        );
      }

      // 5. Contact Section (#contact)
      const contactInfo = document.querySelector('.contact-info');
      const contactForm = document.querySelector('.contact-form-glass');
      if (contactInfo && contactForm) {
        gsap.fromTo(
          contactInfo,
          { opacity: 0, x: -30 },
          {
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 80%',
              toggleActions: 'play reverse play reverse'
            },
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: 'power2.out'
          }
        );

        gsap.fromTo(
          contactForm,
          { opacity: 0, x: 30 },
          {
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 80%',
              toggleActions: 'play reverse play reverse'
            },
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: 'power2.out'
          }
        );
      }
    });

    return () => {
      ctx.revert(); // Reverts and cleans up all animations, timelines, and ScrollTriggers
    };
  }, [enabled]);
}
