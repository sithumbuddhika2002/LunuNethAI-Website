import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Sprout, 
  Bot, 
  Activity, 
  GitMerge, 
  Target, 
  Map, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Send,
  Zap,
  Globe
} from 'lucide-react';

// Import custom components
import ScannerDemo from './components/ScannerDemo';
import PestDetectorDemo from './components/PestDetectorDemo';
import AgriBotDemo from './components/AgriBotDemo';
import DownloadSection from './components/DownloadSection';
import ResearchGallery from './components/ResearchGallery';
import TeamSection from './components/TeamSection';
import ProjectOverview from './components/ProjectOverview';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Type declarations for Google model-viewer custom element
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean;
        'disable-zoom'?: boolean;
        'shadow-intensity'?: string | number;
        'environment-image'?: string;
        exposure?: string | number;
        'interaction-prompt'?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        loading?: string;
        class?: string;
        id?: string;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'overview' | 'simulators' | 'gallery' | 'beta'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const [activeFlavor, setActiveFlavor] = useState<'yellow' | 'purple'>('yellow');

  // Refs for 3D elements
  const modelViewerRef = useRef<any>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const accessoriesBGRef = useRef<HTMLDivElement>(null);
  const accessoriesFGRef = useRef<HTMLDivElement>(null);

  const isSwitching = useRef(false);
  const switchSpinRef = useRef(0);
  const isUserInteractingRef = useRef(false);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Farmer', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isClickNavigating = useRef(false);
  const clickNavTimeoutRef = useRef<number | null>(null);
  const pendingHashRef = useRef<string | null>(null);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (clickNavTimeoutRef.current) {
        window.clearTimeout(clickNavTimeoutRef.current);
      }
    };
  }, []);

  // Handle pending scroll targets when transitioning back to the homepage
  useEffect(() => {
    if (currentPage === 'home' && pendingHashRef.current) {
      const hash = pendingHashRef.current;
      pendingHashRef.current = null;
      
      // Delay slightly to allow the home page components to mount and stabilize in the DOM
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
      
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  // Router-like function
  const navigateTo = (page: 'home' | 'overview' | 'simulators' | 'gallery' | 'beta', hash?: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    
    // Set click navigating to true to disable scroll-spy temporarily during transition
    isClickNavigating.current = true;
    if (clickNavTimeoutRef.current) {
      window.clearTimeout(clickNavTimeoutRef.current);
    }

    if (page === 'home') {
      if (hash) {
        setActiveSection(hash);
        if (currentPage === 'home') {
          // If already on the home page, scroll immediately
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // Save the hash to be scrolled to after page transition mounts the home page elements
          pendingHashRef.current = hash;
        }
      } else {
        setActiveSection('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveSection('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Re-enable scroll spy after scroll animation finishes (~1000ms)
    clickNavTimeoutRef.current = window.setTimeout(() => {
      isClickNavigating.current = false;
    }, 1000);
  };

  // Handle navbar scroll background change and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // If a click navigation is active, don't update activeSection based on scroll events
      if (isClickNavigating.current) return;

      if (currentPage === 'home') {
        const teamEl = document.getElementById('team');
        const contactEl = document.getElementById('contact');
        const scrollPosition = window.scrollY + 250; // offset for nav height

        if (contactEl && scrollPosition >= contactEl.offsetTop) {
          setActiveSection('contact');
        } else if (teamEl && scrollPosition >= teamEl.offsetTop) {
          setActiveSection('team');
        } else {
          setActiveSection('');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // switchColorway function for flavor changes
  const switchColorway = (flavor: 'yellow' | 'purple') => {
    if (isSwitching.current) return;
    isSwitching.current = true;
    setActiveFlavor(flavor);

    const body = document.body;
    const accessories = document.querySelectorAll('.accessory');
    const heroCenter = document.querySelector('.hero-center') as HTMLElement;
    const modelViewer = modelViewerRef.current;

    // Background color morphing using GSAP
    const targetColors = flavor === 'purple' ?
        { inner: '#2e1049', mid: '#1e1b4b', outer: '#090514' } :
        { inner: '#0f2c1f', mid: '#0a1a12', outer: '#040b08' };

    gsap.to(body, {
        '--bg-inner': targetColors.inner,
        '--bg-mid': targetColors.mid,
        '--bg-outer': targetColors.outer,
        duration: 1.5,
        ease: 'power2.inOut'
    });

    // 3D Model spin animation (360 spin + blur with back settle)
    const spinObj = { val: 0, blur: 0 };
    gsap.to(spinObj, {
        val: 360,
        blur: 15,
        duration: 0.6,
        ease: "power2.in",
        onUpdate: () => {
            switchSpinRef.current = spinObj.val;
            if (modelViewer) {
                modelViewer.style.filter = `blur(${spinObj.blur}px)`;
            }
        },
        onComplete: () => {
            // Swap model at the peak of the spin
            if (flavor === 'purple') {
                body.classList.add('purple-theme');
                if (modelViewer) {
                    modelViewer.src = "/model/purple_onion.glb";
                }
                accessories.forEach(acc => {
                    (acc as any).src = "/model/onion.glb";
                });
            } else {
                body.classList.remove('purple-theme');
                if (modelViewer) {
                    modelViewer.src = "/model/onion.glb";
                }
                accessories.forEach(acc => {
                    (acc as any).src = "/model/purple_onion.glb";
                });
            }

            gsap.to(spinObj, {
                val: 720,
                blur: 0,
                duration: 1.5,
                ease: "back.out(0.7)",
                onUpdate: () => {
                    switchSpinRef.current = spinObj.val;
                    if (modelViewer) {
                        modelViewer.style.filter = `blur(${spinObj.blur}px)`;
                    }
                },
                onComplete: () => {
                    switchSpinRef.current = 0;
                    if (modelViewer) {
                        modelViewer.style.filter = 'none';
                    }
                }
            });
        }
    });

    // Accessories implode/explode transition
    let completedAccessories = 0;
    accessories.forEach((acc) => {
        const accessory = acc as HTMLElement;
        const aW = accessory.offsetWidth / 2 || 60;
        const aH = accessory.offsetHeight / 2 || 60;
        const centerX = (heroCenter.offsetWidth / 2 - accessory.offsetLeft - aW);
        const centerY = (heroCenter.offsetHeight / 2 - accessory.offsetTop - aH);

        const startAngle = parseFloat(accessory.dataset.angle || '0') || 0;
        const currentBaseX = parseFloat(accessory.dataset.baseX || '0') || 0;
        const currentBaseY = parseFloat(accessory.dataset.baseY || '0') || 0;

        const nextBaseX = (Math.random() - 0.5) * 200;
        const nextBaseY = (Math.random() - 0.5) * 200;

        gsap.set(accessory, {
            rotation: startAngle,
            x: currentBaseX,
            y: currentBaseY
        });

        const accessoryTl = gsap.timeline();

        accessoryTl.to(accessory, {
            x: centerX,
            y: centerY,
            rotation: startAngle + 45,
            scale: 0.1,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                if (heroCenter) heroCenter.style.zIndex = '50';
            }
        })
        .to(accessory, {
            duration: 0.3
        })
        .to(accessory, {
            onStart: () => {
                if (heroCenter) heroCenter.style.zIndex = '1';
            },
            x: nextBaseX,
            y: nextBaseY,
            rotation: startAngle + 90,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.5)",
            onComplete: () => {
                accessory.dataset.angle = (startAngle + 90).toString();
                accessory.dataset.baseX = nextBaseX.toString();
                accessory.dataset.baseY = nextBaseY.toString();
                accessory.dataset.rx = '0';
                accessory.dataset.ry = '0';

                completedAccessories++;
                if (completedAccessories === accessories.length) {
                    isSwitching.current = false;
                }
            }
        });
    });
  };

  const handleFlavorChange = (flavor: 'yellow' | 'purple') => {
    if (flavor === activeFlavor) return;
    switchColorway(flavor);
  };

  const toggleFlavor = () => {
    const nextFlavor = activeFlavor === 'yellow' ? 'purple' : 'yellow';
    switchColorway(nextFlavor);
  };

  // Mouse tracking and animation frame loop
  useEffect(() => {
    if (currentPage !== 'home') return;

    // Initialize accessory data attributes
    const accessories = document.querySelectorAll('.accessory');
    accessories.forEach(a => {
      const el = a as HTMLElement;
      el.dataset.rx = '0';
      el.dataset.ry = '0';
      el.dataset.angle = (Math.random() * 360).toString();
      el.dataset.baseX = '0';
      el.dataset.baseY = '0';
    });

    let mouse = { x: 0, y: 0, px: 0, py: 0 };
    let currentMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;
      mouse.px = e.clientX;
      mouse.py = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let animatedTheta = 0;
    let animatedPhi = 90;

    const animate = () => {
      const time = Date.now() * 0.001;
      
      currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

      const modelViewer = modelViewerRef.current;
      if (modelViewer) {
        if (isUserInteractingRef.current) {
          try {
            const orbit = modelViewer.getCameraOrbit();
            animatedTheta = (orbit.theta * 180) / Math.PI;
            animatedPhi = (orbit.phi * 180) / Math.PI;
          } catch (e) {
            // Ignore error if model-viewer is not fully initialized
          }
        } else {
          const targetTheta = (currentMouse.x * 40) + switchSpinRef.current;
          const targetPhi = 90 + (currentMouse.y * 20);

          animatedTheta += (targetTheta - animatedTheta) * 0.08;
          animatedPhi += (targetPhi - animatedPhi) * 0.08;

          modelViewer.cameraOrbit = `${animatedTheta}deg ${animatedPhi}deg 380%`;
        }
      }

      if (accessoriesFGRef.current) {
        accessoriesFGRef.current.style.transform = `translate(${currentMouse.x * 60}px, ${currentMouse.y * 60}px)`;
      }
      if (accessoriesBGRef.current) {
        accessoriesBGRef.current.style.transform = `translate(${currentMouse.x * -30}px, ${currentMouse.y * -30}px)`;
      }
      if (tagsRef.current) {
        tagsRef.current.style.transform = `translate(${currentMouse.x * -15}px, ${currentMouse.y * -15}px)`;
      }

      if (!isSwitching.current) {
        const allAccessories = document.querySelectorAll('.accessory');
        allAccessories.forEach((acc, i) => {
          const accessory = acc as HTMLElement;
          const accRect = accessory.getBoundingClientRect();
          const accX = accRect.left + accRect.width / 2;
          const accY = accRect.top + accRect.height / 2;

          const diffX = mouse.px - accX;
          const diffY = mouse.py - accY;
          const distance = Math.sqrt(diffX * diffX + diffY * diffY);

          let targetRx = 0, targetRy = 0, speedMult = 1;

          if (distance < 400) {
            const force = (400 - distance) / 400;
            targetRx = (diffX / distance) * force * -80;
            targetRy = (diffY / distance) * force * -80;
            speedMult = 1 + force * 5;
          }

          let rx = parseFloat(accessory.dataset.rx || '0') || 0;
          let ry = parseFloat(accessory.dataset.ry || '0') || 0;
          let angle = parseFloat(accessory.dataset.angle || '0') || 0;
          let baseX = parseFloat(accessory.dataset.baseX || '0') || 0;
          let baseY = parseFloat(accessory.dataset.baseY || '0') || 0;

          rx += (targetRx - rx) * 0.1;
          ry += (targetRy - ry) * 0.1;
          angle += 0.2 * speedMult;

          accessory.dataset.rx = rx.toString();
          accessory.dataset.ry = ry.toString();
          accessory.dataset.angle = angle.toString();

          const dur = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10][i % 9];
          const phase = (time + i * 0.7) * (Math.PI * 2 / dur);
          const floatY = Math.sin(phase) * 15;
          const floatAngle = Math.cos(phase) * 6;

          accessory.style.transform = `translate(calc(${rx + baseX}px), calc(${ry + baseY}px + ${floatY}px)) rotate(calc(${angle}deg + ${floatAngle}deg))`;
        });
      }

      const tags = document.querySelectorAll('.tag');
      tags.forEach((tagEl, i) => {
        const tag = tagEl as HTMLElement;
        const dur = 10 + i * 2;
        const phase = (time + i * 1.2) * (Math.PI * 2 / dur);
        const floatY = Math.sin(phase) * 20;
        const floatX = Math.cos(phase * 0.5) * 15;
        const floatAngle = Math.sin(phase * 0.3) * 15;
        tag.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${floatAngle}deg)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const particleInterval = setInterval(() => {
      const container = document.getElementById('bubbles-container');
      if (!container) return;
      const particle = document.createElement('div');
      particle.className = 'bubble-img';
      
      const size = Math.random() * 12 + 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = '-50px';
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.pointerEvents = 'none';
      
      const isPurple = document.body.classList.contains('purple-theme');
      const color = isPurple ? 'rgba(167, 139, 250, 0.6)' : 'rgba(0, 255, 135, 0.6)';
      particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 80%)`;
      particle.style.boxShadow = `0 0 10px ${isPurple ? 'rgba(167, 139, 250, 0.3)' : 'rgba(0, 255, 135, 0.3)'}`;
      
      const duration = Math.random() * 6 + 4;
      particle.style.animation = `floatUpImg ${duration}s linear forwards`;

      container.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1000);
    }, 400);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(particleInterval);
    };
  }, [currentPage]);

  // GSAP Entrance Animations
  useGSAP(() => {
    // Kill existing triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    if (currentPage === 'home') {
      // Hero Animations
      const heroTl = gsap.timeline();
      heroTl.from('.hero-tag', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' })
            .from('.main-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.4')
            .from('.hero-left .description', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.cta-group', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.hero-center', { opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out' }, '-=0.8');

      // Scroll Trigger animations for cards and sections using fromTo for stability
      if (document.querySelector('.feature-card')) {
        gsap.fromTo('.feature-card', 
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: '.features-grid',
              start: 'top 80%',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      }

      if (document.querySelector('.team-trigger')) {
        gsap.fromTo('.team-trigger', 
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: '#team',
              start: 'top 80%',
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out'
          }
        );
      }
    } else if (currentPage === 'simulators') {
      // Animate simulator page entrance
      gsap.fromTo('.section-header', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      
      if (document.querySelector('.showcase-row-1')) {
        gsap.fromTo('.showcase-row-1', 
          { opacity: 0, y: 45 },
          {
            scrollTrigger: {
              trigger: '.showcase-row-1',
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out'
          }
        );
      }

      if (document.querySelector('.showcase-row-2')) {
        gsap.fromTo('.showcase-row-2', 
          { opacity: 0, y: 45 },
          {
            scrollTrigger: {
              trigger: '.showcase-row-2',
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out'
          }
        );
      }

      if (document.querySelector('.showcase-row-3')) {
        gsap.fromTo('.showcase-row-3', 
          { opacity: 0, y: 45 },
          {
            scrollTrigger: {
              trigger: '.showcase-row-3',
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out'
          }
        );
      }
    } else if (currentPage === 'gallery') {
      gsap.fromTo('.section-header', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      if (document.querySelector('.gallery-trigger')) {
        gsap.fromTo('.gallery-trigger', 
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: '#gallery',
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out'
          }
        );
      }
    } else if (currentPage === 'overview') {
      gsap.fromTo('.section-header', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    } else if (currentPage === 'beta') {
      gsap.fromTo('.section-header', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    // Refresh ScrollTriggers
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

  }, { dependencies: [currentPage], scope: containerRef });

  // Handle Form Submit (connect to public/contact.php)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch('contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setFormStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', role: 'Farmer', message: '' });
      } else {
        setFormStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (err) {
      setFormStatus({ 
        type: 'error', 
        message: 'Could not connect to the server. Your submission was logged locally (if running PHP).' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} style={{ background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      {/* Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', whiteSpace: 'nowrap' }}>
            <img src="/logo.jpeg" alt="LunuNeth AI Logo" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-primary)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', whiteSpace: 'nowrap' }}>LunuNeth AI</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>CROP INTELLIGENCE</span>
            </div>
          </a>
          
          <ul className="nav-links">
            <li>
              <a 
                href="#" 
                className={currentPage === 'home' && activeSection === '' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={currentPage === 'overview' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigateTo('overview'); }}
              >
                Overview
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={currentPage === 'simulators' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigateTo('simulators'); }}
              >
                Live Demo
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={currentPage === 'gallery' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}
              >
                Research Logs
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={currentPage === 'home' && activeSection === 'team' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigateTo('home', 'team'); }}
              >
                Our Team
              </a>
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('beta'); }} 
              className="solid-btn" 
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              Install App
            </a>
            <button className="mobile-menu-btn flex-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown">
            <a 
              href="#" 
              className={currentPage === 'home' && activeSection === '' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            >
              Home
            </a>
            <a 
              href="#" 
              className={currentPage === 'overview' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigateTo('overview'); }}
            >
              Overview
            </a>
            <a 
              href="#" 
              className={currentPage === 'simulators' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigateTo('simulators'); }}
            >
              Live Demo
            </a>
            <a 
              href="#" 
              className={currentPage === 'gallery' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}
            >
              Research Logs
            </a>
            <a 
              href="#" 
              className={currentPage === 'home' && activeSection === 'team' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigateTo('home', 'team'); }}
            >
              Our Team
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {currentPage === 'home' && (
        <header className="hero-main-container" ref={heroRef}>
          <main className="hero">
            <div id="bubbles-container"></div>
            <div className="hero-3d-content">
              {/* 3b. Left Column */}
              <div className="hero-left">
                <div className="hero-tag">
                  <span></span> Next-Gen Crop Intelligence
                </div>
                <h1 className="main-title large-animation-1">
                  <span className="outline">Lunu</span>Neth<br/>
                  AI
                </h1>
                <p className="description">
                  Empowering onion farmers and researchers with deep learning. 
                  Diagnose diseases, track thrips pests, identify nutrient deficiencies, and predict regional outbreaks.
                </p>
                <div className="cta-group">
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); navigateTo('beta'); }} 
                    className="primary-btn"
                  >
                    Download App
                    <span className="plus-icon">+</span>
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); navigateTo('simulators'); }} 
                    className="primary-btn"
                    style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                  >
                    Try Live Demo
                    <span className="plus-icon" style={{ background: 'var(--accent-secondary)' }}>→</span>
                  </a>
                </div>

                <div className="award-badge">
                  <div className="award-icon">
                    <Sprout className="text-emerald-400 w-5 h-5" />
                  </div>
                  <div className="award-text">
                    <span className="award-title">AI CROP ADVISORY</span>
                    <span className="award-subtitle">ALGORITHMIC PRECISION 2026</span>
                  </div>
                </div>
              </div>

              {/* 3d. Center product (the 3D onion + tags + accessories) */}
              <div className="hero-center">
                {/* 3a. Far background tags */}
                <div className="tags-container" ref={tagsRef}>
                  <model-viewer className="tag t1" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="45deg 75deg 105%"></model-viewer>
                  <model-viewer className="tag t2" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="-30deg 60deg 105%"></model-viewer>
                  <model-viewer className="tag t3" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="120deg 85deg 105%"></model-viewer>
                  <model-viewer className="tag t4" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="10deg 45deg 105%"></model-viewer>
                </div>

                {/* 3c. Background accessories (behind main model) */}
                <div className="accessories-container-bg" ref={accessoriesBGRef}>
                  <model-viewer className="accessory a7" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="-20deg 110deg 105%"></model-viewer>
                  <model-viewer className="accessory a8" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="160deg 45deg 105%"></model-viewer>
                  <model-viewer className="accessory a9" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.0" interaction-prompt="none" camera-orbit="45deg 20deg 105%"></model-viewer>
                </div>

                <model-viewer id="product-model" ref={modelViewerRef} src="/model/onion.glb" alt="LunuNeth AI Onion 3D Model" camera-controls
                  disable-zoom shadow-intensity="0" environment-image="neutral" exposure="1.5"
                  interaction-prompt="none" camera-orbit="0deg 90deg 380%" field-of-view="30deg"
                  className="main-product-3d"
                  onPointerDown={() => { isUserInteractingRef.current = true; }}
                  onPointerUp={() => { isUserInteractingRef.current = false; }}
                  onPointerLeave={() => { isUserInteractingRef.current = false; }}
                  onTouchStart={() => { isUserInteractingRef.current = true; }}
                  onTouchEnd={() => { isUserInteractingRef.current = false; }}
                >
                </model-viewer>

                {/* 3e. Foreground accessories */}
                <div className="accessories-container" ref={accessoriesFGRef}>
                  <model-viewer className="accessory a1" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="45deg 120deg 105%"></model-viewer>
                  <model-viewer className="accessory a2" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="-120deg 45deg 105%"></model-viewer>
                  <model-viewer className="accessory a3" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="200deg 90deg 105%"></model-viewer>
                  <model-viewer className="accessory a4" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="10deg 20deg 105%"></model-viewer>
                  <model-viewer className="accessory a5" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="-45deg 160deg 105%"></model-viewer>
                  <model-viewer className="accessory a6" src="/model/purple_onion.glb" environment-image="neutral" exposure="1.2" interaction-prompt="none" camera-orbit="80deg 75deg 105%"></model-viewer>
                </div>
              </div>

              {/* 3f. Right Column */}
              <div className="hero-right">
                <div className="product-carousel">
                  <div className="carousel-cards">
                    <div className={`card ${activeFlavor === 'yellow' ? 'active' : ''}`} onClick={() => handleFlavorChange('yellow')}>
                      <img src="/images/yellow_onion_card.png" alt="LunuNeth Yellow Spanish Onion" />
                      <div className="card-info">
                        <span>Yellow Spanish</span>
                        <span>$1.89 / lb</span>
                      </div>
                    </div>
                    <div className={`card ${activeFlavor === 'purple' ? 'active' : ''}`} onClick={() => handleFlavorChange('purple')}>
                      <img src="/images/purple_onion_card.png" alt="LunuNeth Red Baron Onion" style={{ filter: 'brightness(0.85)' }} />
                      <div className="card-info">
                        <span>Red Baron</span>
                        <span>$2.49 / lb</span>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-nav">
                    <button className="nav-arrow" onClick={toggleFlavor}>←</button>
                    <button className="nav-arrow" onClick={toggleFlavor}>→</button>
                  </div>
                </div>
                <h2 className="side-title large-animation-1">
                  <span className="outline">Precision</span><br/>
                  Farming
                </h2>
              </div>
            </div>
          </main>
        </header>
      )}

      {/* Feature Section */}
      {currentPage === 'home' && (
        <section id="features" className="section" style={{ background: 'rgba(5, 15, 10, 0.2)' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="gradient-text">Intelligent Crop Protection Modules</h2>
              <p>Our unified platform hosts advanced deep learning pipelines to keep onion farms healthy, productive, and sustainable.</p>
            </div>

            <div className="features-grid">
              {/* Feature 1 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center">
                  <Sprout />
                </div>
                <h3 className="feature-title">Onion Leaf Classifier</h3>
                <p className="feature-desc">
                  Diagnoses severe diseases like Purple Blotch and Leaf Twist Disease (LTD) using quantized MobileNet/TFLite models directly on-device.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }}>
                  <Target />
                </div>
                <h3 className="feature-title">Thrips Pest Detector</h3>
                <p className="feature-desc">
                  Detects and labels onion thrips pests in real-time. Uses PyTorch Faster R-CNN target localization with visual bounding boxes.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#00ff87', borderColor: 'rgba(0, 255, 135, 0.2)', background: 'rgba(0, 255, 135, 0.05)' }}>
                  <Activity />
                </div>
                <h3 className="feature-title">Nutrient deficiency</h3>
                <p className="feature-desc">
                  Identifies Nitrogen (N), Phosphorus (P), and Potassium (K) deficiencies, projecting Grad-CAM heatmaps showing exact symptom focus.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.2)', background: 'rgba(167, 139, 250, 0.05)' }}>
                  <Bot />
                </div>
                <h3 className="feature-title">AgriBot Chat Advisor</h3>
                <p className="feature-desc">
                  Combines NLP BERT classification and Bayesian decision trees to interview users, delivering crop remedy recommendations.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.2)', background: 'rgba(245, 158, 11, 0.05)' }}>
                  <Map />
                </div>
                <h3 className="feature-title">ST-GNN Outbreak Forecast</h3>
                <p className="feature-desc">
                  A Spatio-Temporal Graph Neural Network predicting region-wide disease spread by modeling spatial relations between adjacent farms.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <GitMerge />
                </div>
                <h3 className="feature-title">Multi-Agent Backend</h3>
                <p className="feature-desc">
                  FastAPI asynchronous backend with isolated microservices, Docker Hugging Face Space deployments, and unified MongoDB clustering.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Showcase Demos Section */}
      {currentPage === 'simulators' && (
        <section id="demo" className="section" style={{ paddingTop: '8rem' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="gradient-text">Interactive Live Simulators</h2>
              <p>Experience how our deep learning models run diagnostic analysis directly inside the mobile app ecosystem.</p>
            </div>

            <div className="showcase-wrapper">
              {/* Demo 1 */}
              <div className="showcase-row showcase-row-1">
                <div className="showcase-content">
                  <div className="showcase-step-num">Step 1</div>
                  <h2>Leaf disease & Nutrient scan</h2>
                  <p>
                    Experience the localized TFLite classifier and Grad-CAM analyzer. Tap the button on the leaf visual to scan.
                  </p>
                  <ul className="showcase-bullets">
                    <li style={{ display: 'flex', gap: '0.5rem' }}>
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span><strong>TFLite Integration:</strong> Runs on-device with sub-100ms inference times.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.5rem' }}>
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span><strong>Grad-CAM:</strong> Highlights nutrient deficient regions using red-to-yellow thermal maps.</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-center">
                  <ScannerDemo />
                </div>
              </div>

              {/* Demo 2 */}
              <div className="showcase-row reverse showcase-row-2">
                <div className="flex-center">
                  <PestDetectorDemo />
                </div>
                <div className="showcase-content">
                  <div className="showcase-step-num">Step 2</div>
                  <h2>PyTorch Pest Target Bounding Box</h2>
                  <p>
                    Our object detection model runs Faster R-CNN to localize tiny thrips. Hover or tap the onion plant vector to activate target boxes.
                  </p>
                  <ul className="showcase-bullets">
                    <li style={{ display: 'flex', gap: '0.5rem' }}>
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span><strong>Precise Localization:</strong> Draws bounding coordinates indicating thrips clusters.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.5rem' }}>
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span><strong>Density Mapping:</strong> Computes pest counts per leaf area to guide smart spray applications.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Demo 3 */}
              <div className="showcase-row showcase-row-3">
                <div className="showcase-content">
                  <div className="showcase-step-num">Step 3</div>
                  <h2>BERT AgriBot Chatbot Dialog</h2>
                  <p>
                    Consult our chatbot for crop diagnosis and management advisory. Select options or type messages inside the simulator.
                  </p>
                  <ul className="showcase-bullets">
                    <li style={{ display: 'flex', gap: '0.5rem' }}>
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span><strong>Natural Language:</strong> BERT classifier routes questions to relevant agronomic domains.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.5rem' }}>
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span><strong>Bayesian Logic:</strong> Guides you through symptom checking logic to identify root causes.</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-center">
                  <AgriBotDemo />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Overview Section */}
      {currentPage === 'overview' && (
        <section id="overview" className="section" style={{ paddingTop: '8rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(5, 15, 10, 0.1)' }}>
          <div className="container">
            <ProjectOverview />
          </div>
        </section>
      )}

      {/* Research Image & Video Gallery Section */}
      {currentPage === 'gallery' && (
        <section id="gallery" className="section" style={{ paddingTop: '8rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(5, 15, 10, 0.1)' }}>
          <div className="container gallery-trigger">
            <div className="section-header">
              <h2 className="gradient-text">Research Gallery & Video Logs</h2>
              <p>Explore visual maps, drone surveys, microscopy data, and model validation runs compiled during our research cycles.</p>
            </div>
            <ResearchGallery />
          </div>
        </section>
      )}

      {/* Tech Architecture Section */}
      {currentPage === 'home' && (
        <section id="architecture" className="section" style={{ background: 'rgba(5, 15, 10, 0.25)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="section-header" style={{ marginBottom: '4rem' }}>
              <h2 className="gradient-text">Unified Platform Architecture</h2>
              <p>A decoupled multi-agent architecture bridging mobile clients and scalable cloud deep learning services.</p>
            </div>

            {/* Architecture visual grid/flow */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#10b981' }}><Globe className="w-10 h-10 mx-auto" /></div>
                <h4 style={{ marginBottom: '0.5rem' }}>Flutter Client App</h4>
                <p style={{ fontSize: '0.85rem' }}>Cross-platform UI (iOS/Android), offline sqlite caching, camera scan interfaces, and light TFLite classification.</p>
              </div>
              
              <div className="glass-card" style={{ padding: '2rem 1.5rem', borderColor: 'rgba(16, 185, 129, 0.4)', boxShadow: '0 0 20px var(--accent-glow)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#00ff87' }}><GitMerge className="w-10 h-10 mx-auto" /></div>
                <h4 style={{ marginBottom: '0.5rem' }}>FastAPI Router Server</h4>
                <p style={{ fontSize: '0.85rem' }}>Docker container hosting on Hugging Face Spaces. Multi-agent coordination, database clustering, and async processing.</p>
              </div>

              <div className="glass-card" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#a78bfa' }}><Bot className="w-10 h-10 mx-auto" /></div>
                <h4 style={{ marginBottom: '0.5rem' }}>DL Inference Pipelines</h4>
                <p style={{ fontSize: '0.85rem' }}>PyTorch object detectors, EfficientNet Grad-CAM, BERT classification engines, and ST-GNN crop spread forecasting.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Research Team Section */}
      {currentPage === 'home' && (
        <section id="team" className="section" style={{ background: 'rgba(5, 15, 10, 0.2)', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container team-trigger">
            <div className="section-header">
              <h2 className="gradient-text">Meet Our Research Team</h2>
              <p>The academic supervisor, team leader, and developers behind the design and modeling of LunuNeth AI.</p>
            </div>
            <TeamSection />
          </div>
        </section>
      )}

      {/* Download Center Section */}
      {currentPage === 'beta' && (
        <section id="download" className="section" style={{ paddingTop: '8rem' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="gradient-text">Join the LunuNeth AI Beta Program</h2>
              <p>Download our mobile app to start testing crop diagnostic intelligence directly on your fields today.</p>
            </div>

            <DownloadSection />
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      {currentPage === 'home' && (
        <section id="contact" className="section" style={{ background: 'rgba(5, 15, 10, 0.2)', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <div className="contact-wrapper">
              <div className="contact-info">
                <div>
                  <h2 className="gradient-text">Let's Connect</h2>
                  <p>Have questions about deployment, neural networks, or using LunuNeth AI in your region? Get in touch with our team.</p>
                </div>

                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon-box flex-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="contact-item-title">Send Email</div>
                      <a href="mailto:info@lununeth.ai" className="contact-item-value">info@lununeth.ai</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon-box flex-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="contact-item-title">Call Helpline</div>
                      <span className="contact-item-value">+94 77 123 4567</span>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon-box flex-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="contact-item-title">Helpline Location</div>
                      <span className="contact-item-value">Colombo, Sri Lanka</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Powered by BERT NLP + PyTorch models. All rights reserved.
                </div>
              </div>

              {/* React Form */}
              <div className="glass-card">
                <form onSubmit={handleSubmit}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Send Us a Message</div>

                  {formStatus && (
                    <div className={`form-status ${formStatus.type}`}>
                      {formStatus.message}
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name" 
                        className="form-input" 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your email" 
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">I am a...</label>
                    <select 
                      value={formData.role} 
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="form-select"
                    >
                      <option value="Farmer">Farmer / Grower</option>
                      <option value="Researcher">Agricultural Researcher</option>
                      <option value="Developer">Software Developer</option>
                      <option value="Other">Other Interested Party</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '2rem' }}>
                    <label className="form-label">Message</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your question or partnership proposal..." 
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="solid-btn" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Send Inquiry Message'} <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-logo-desc">
              <a href="#" className="logo" style={{ marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }} onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
                <img src="/logo.jpeg" alt="LunuNeth AI Logo" style={{ width: '2.2rem', height: '2.2rem', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-primary)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, textAlign: 'left' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LunuNeth AI</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em' }}>CROP INTELLIGENCE</span>
                </div>
              </a>
              <p style={{ fontSize: '0.85rem' }}>
                Bridging deep learning and traditional agriculture to secure crop yields and improve diagnostic accessibility.
              </p>
            </div>

            <div className="footer-col">
              <h4>Platform Links</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('overview'); }}>Project Overview</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('simulators'); }}>Live Simulator</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}>Research Logs</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home', 'team'); }}>Our Team</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('beta'); }}>Download Mobile App</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Legal & Info</h4>
              <ul className="footer-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }}>Contact Support</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="https://huggingface.co" target="_blank" rel="noopener noreferrer">Hugging Face Space</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>&copy; {new Date().getFullYear()} LunuNeth AI. Designed for modern agricultural deployment.</div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('beta'); }} style={{ color: 'var(--accent-secondary)' }}>Get APK</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('beta'); }} style={{ color: 'var(--accent-secondary)' }}>Get IPA</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
