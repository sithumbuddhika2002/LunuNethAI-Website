import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Sprout, 
  Bot, 
  Activity, 
  GitMerge, 
  Target, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Send,
  Globe,
  Download,
  ArrowRight,
  TrendingUp,
  Leaf
} from 'lucide-react';

import leafIcon from './assets/feature-icons/leaf-fill.svg';
import pestIcon from './assets/feature-icons/bug-fill.svg';
import nutrientIcon from './assets/feature-icons/droplet-fill.svg';
import chatIcon from './assets/feature-icons/chat-dots-fill.svg';
import forecastIcon from './assets/feature-icons/globe-americas.svg';
import backendIcon from './assets/feature-icons/hdd-rack-fill.svg';

// Import custom components
const LiveDemoPage = lazy(() => import('./components/LiveDemoPage'));
import DownloadSection from './components/DownloadSection';
import ResearchGallery from './components/ResearchGallery';
import TeamSection from './components/TeamSection';
import ProjectOverview from './components/ProjectOverview';
import ThemeToggle from './components/ThemeToggle';
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
import AndroidInstallPopup from './components/AndroidInstallPopup';
import WindowsInstallPopup from './components/WindowsInstallPopup';
import FloatingOnionsScene from './components/FloatingOnionsScene';
import SiteFooter from './components/SiteFooter';
import { useScrollAnimations } from './hooks/useScrollAnimations';

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
  const [currentPage, setCurrentPage] = useState<'home' | 'overview' | 'simulators' | 'gallery' | 'beta' | 'admin'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigationFeedback, setNavigationFeedback] = useState(0);
  const navigationSequence = useRef(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const [activeFlavor, setActiveFlavor] = useState<'yellow' | 'purple'>('yellow');

  // Register GSAP ScrollTrigger animations across homepage sections
  useScrollAnimations(currentPage === 'home');

  // Refs for 3D elements
  const modelViewerRef = useRef<any>(null);

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

  // Handle URL changes & popstate routing dynamically (e.g. visiting /admin directly)
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;

      if (path === '/admin' || hash === '#admin' || hash === '#/admin' || search.includes('admin')) {
        setCurrentPage('admin');
      } else if (path === '/overview' || hash === '#overview' || hash === '#/overview' || search.includes('overview')) {
        setCurrentPage('overview');
      } else if (path === '/simulators' || hash === '#simulators' || hash === '#/simulators' || search.includes('simulators')) {
        setCurrentPage('simulators');
      } else if (path === '/gallery' || hash === '#gallery' || hash === '#/gallery' || search.includes('gallery')) {
        setCurrentPage('gallery');
      } else if (path === '/beta' || hash === '#beta' || hash === '#/beta' || search.includes('beta')) {
        setCurrentPage('beta');
      } else {
        setCurrentPage('home');
      }
    };

    handleUrlRouting();
    window.addEventListener('hashchange', handleUrlRouting);
    window.addEventListener('popstate', handleUrlRouting);
    return () => {
      window.removeEventListener('hashchange', handleUrlRouting);
      window.removeEventListener('popstate', handleUrlRouting);
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
          element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        }
      }, 250);
      
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  // Router-like function
  const navigateTo = (page: 'home' | 'overview' | 'simulators' | 'gallery' | 'beta' | 'admin', hash?: string) => {
    setNavigationFeedback(++navigationSequence.current);
    pendingHashRef.current = null;
    setCurrentPage(page);
    setMobileMenuOpen(false);

    // Update URL history pathname dynamically (pushState)
    const newPath = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', newPath);
    
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
            element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
          }
        } else {
          // Save the hash to be scrolled to after page transition mounts the home page elements
          pendingHashRef.current = hash;
        }
      } else {
        setActiveSection('');
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    } else {
      setActiveSection('');
      window.scrollTo({ top: 0, behavior: 'instant' });
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
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // switchColorway function for flavor changes
  const switchColorway = (flavor: 'yellow' | 'purple') => {
    if (isSwitching.current) return;
    isSwitching.current = true;
    setActiveFlavor(flavor);

    const modelViewer = modelViewerRef.current;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (modelViewer) modelViewer.src = flavor === 'purple' ? '/model/purple_onion.glb' : '/model/onion.glb';
      isSwitching.current = false;
      return;
    }

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
                if (modelViewer) {
                    modelViewer.src = "/model/purple_onion.glb";
                }
            } else {
                if (modelViewer) {
                    modelViewer.src = "/model/onion.glb";
                }
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
                    isSwitching.current = false;
                    if (modelViewer) {
                        modelViewer.style.filter = 'none';
                    }
                }
            });
        }
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
    if (currentPage !== 'home' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mouse = { x: 0, y: 0, px: 0, py: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;
      mouse.px = e.clientX;
      mouse.py = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let heroVisible = true;
    const observer = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; });
    if (heroRef.current) observer.observe(heroRef.current);
    let animationFrameId: number;
    let animatedTheta = 0;
    let animatedPhi = 90;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!heroVisible || document.hidden) return;

      
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
          const now = performance.now();
          const floatTheta = Math.sin(now * 0.0012) * 2.5;
          const floatPhi = Math.cos(now * 0.001) * 2.0;
          const targetTheta = (currentMouse.x * 35) + switchSpinRef.current + floatTheta;
          const targetPhi = 90 + (currentMouse.y * 18) + floatPhi;

          animatedTheta += (targetTheta - animatedTheta) * 0.08;
          animatedPhi += (targetPhi - animatedPhi) * 0.08;

          modelViewer.cameraOrbit = `${animatedTheta}deg ${animatedPhi}deg 380%`;
        }
      }

    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [currentPage]);

  // GSAP Entrance Animations
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (currentPage === 'home') {
      // Hero Entrance Timeline
      const heroTl = gsap.timeline();
      heroTl.from('.main-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
            .from('.hero-subheading', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.5')
            .from('.hero-left .description', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.cta-group', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.hero-mini-badges', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.hero-center', { opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out' }, '-=0.8')
            .from('.product-carousel', { opacity: 0, x: 20, duration: 0.6, ease: 'power2.out' }, '-=0.6');
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
      {navigationFeedback !== 0 && (
        <div
          key={navigationFeedback}
          className="navigation-loading"
          role="status"
          aria-label="Opening page"
          onAnimationEnd={() => setNavigationFeedback(0)}
        />
      )}
      {/* Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', whiteSpace: 'nowrap' }}>
            <img src="/logo.jpeg" alt="LunuNeth AI Logo" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-primary)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', whiteSpace: 'nowrap' }}>LunuNeth AI</span>
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

          <div className="nav-actions">
            <ThemeToggle />
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('beta'); }} 
              className="solid-btn" 
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              Install App
            </a>
            <button aria-label="Toggle navigation" aria-expanded={mobileMenuOpen} className="mobile-menu-btn flex-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            <div className="mobile-theme-row">
              <span>Theme Mode</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>

      {/* 3D Floating Onions Parallax Canvas across homepage */}
      {currentPage === 'home' && <FloatingOnionsScene />}

      {/* Hero Section */}
      {currentPage === 'home' && (
        <header className="hero-main-container" ref={heroRef}>
          <main className="hero">
            {/* Ultra-HD 3D Botanical Grass framing Hero corners */}
            <div className="grass-decor-hero-left" aria-hidden="true">
              <img src="/images/grass_hero_left_hd.png" alt="" className="grass-img grass-hero-blades-left" />
            </div>
            <div className="grass-decor-hero-right" aria-hidden="true">
              <img src="/images/grass_hero_right_hd.png" alt="" className="grass-img grass-hero-blades-right" />
            </div>

            <div className="hero-3d-content">
              {/* 3b. Left Column */}
              <div className="hero-left">
                <h1 className="main-title large-animation-1">
                  <span className="outline">Lunu</span>Neth AI
                </h1>
                <div className="hero-subheading">Crop Intelligence</div>
                <p className="description">
                  Empowering onion farmers and researchers with deep learning. 
                  Diagnose diseases, track thrips pests, identify nutrient deficiencies, and predict regional outbreaks.
                </p>
                <div className="cta-group">
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); navigateTo('beta'); }} 
                    className="primary-btn download-cta-btn"
                  >
                    Download App
                    <span className="plus-icon"><Download className="w-4 h-4" /></span>
                  </a>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); navigateTo('simulators'); }} 
                    className="primary-btn demo-cta-btn"
                  >
                    Try Live Demo
                    <span className="plus-icon"><ArrowRight className="w-4 h-4" /></span>
                  </a>
                </div>

                {/* 3 Mini Badges in Horizontal Row */}
                <div className="hero-mini-badges">
                  <div className="hero-mini-badge">
                    <div className="mini-badge-icon flex-center">
                      <Sprout className="w-3.5 h-3.5" />
                    </div>
                    <div className="mini-badge-text">
                      <span className="badge-line-1">AI-Powered</span>
                      <span className="badge-line-2">Diagnosis</span>
                    </div>
                  </div>
                  <div className="hero-mini-badge">
                    <div className="mini-badge-icon flex-center">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <div className="mini-badge-text">
                      <span className="badge-line-1">Real-time</span>
                      <span className="badge-line-2">Pest Detection</span>
                    </div>
                  </div>
                  <div className="hero-mini-badge">
                    <div className="mini-badge-icon flex-center">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <div className="mini-badge-text">
                      <span className="badge-line-1">Sustainable</span>
                      <span className="badge-line-2">Onion Farming</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3d. Center product (the 3D onion + circular backdrop + cursive callout script + floating leaves) */}
              <div className="hero-center">
                {/* Soft circular backdrop matching screenshot */}

                {/* Floating green leaves */}
                <div className="floating-leaf floating-leaf-left" aria-hidden="true">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="floating-leaf floating-leaf-right" aria-hidden="true">
                  <Leaf className="w-5 h-5" />
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

                {/* Handwriting cursive angled callout matching screenshot exactly */}
                <div className="hero-callout-script" aria-hidden="true">
                  <div className="callout-line-1">Precision</div>
                  <div className="callout-line-2">Farming</div>
                  <div className="callout-line-3">for a Healthier</div>
                  <div className="callout-line-4">
                    Tomorrow
                    <span className="callout-underline" />
                  </div>
                </div>
              </div>

              {/* 3f. Right Column */}
              <div className="hero-right">
                <div className="product-carousel">
                  <div className="carousel-cards">
                    <button type="button" className={`card ${activeFlavor === 'yellow' ? 'active' : ''}`} aria-pressed={activeFlavor === 'yellow'} onClick={() => handleFlavorChange('yellow')}>
                      <img src="/images/yellow_onion_card.png" alt="Yellow Spanish Onion" className="variety-thumb-img" />
                      <div className="card-info">
                        <span>Yellow Spanish</span>
                      </div>
                    </button>
                    <button type="button" className={`card ${activeFlavor === 'purple' ? 'active' : ''}`} aria-pressed={activeFlavor === 'purple'} onClick={() => handleFlavorChange('purple')}>
                      <img src="/images/purple_onion_card.png" alt="Red Baron Onion" className="variety-thumb-img" />
                      <div className="card-info">
                        <span>Red Baron</span>
                      </div>
                    </button>
                  </div>
                  <div className="carousel-nav">
                    <button className="nav-arrow" aria-label="Previous onion variety" onClick={toggleFlavor}>←</button>
                    <button className="nav-arrow" aria-label="Next onion variety" onClick={toggleFlavor}>→</button>
                  </div>
                </div>

                {/* Feature Highlight Card with 3 checklist items */}
                <div className="glass-card hero-highlight-card">
                  <div className="highlight-item">
                    <div className="highlight-icon flex-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span>Higher Yield with AI Insights</span>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon flex-center">
                      <Activity className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span>Early Disease Detection</span>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon flex-center">
                      <Sprout className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span>Data-Driven Farming Decisions</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </header>
      )}

      {/* Feature Section */}
      {currentPage === 'home' && (
        <section id="features" className="section" style={{ background: 'var(--bg-glass)' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="gradient-text">Intelligent Crop Protection Modules</h2>
              <p>Our unified platform hosts advanced deep learning pipelines to keep onion farms healthy, productive, and sustainable.</p>
            </div>

            <div className="features-grid">
              {/* Feature 1 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center">
                  <span className="feature-standard-icon" aria-hidden="true" style={{ maskImage: `url(${leafIcon})`, WebkitMaskImage: `url(${leafIcon})` }} />
                </div>
                <h3 className="feature-title">Onion Leaf Classifier</h3>
                <p className="feature-desc">
                  Diagnoses severe diseases like Purple Blotch and Leaf Twist Disease (LTD) using quantized MobileNet/TFLite models directly on-device.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }}>
                  <span className="feature-standard-icon" aria-hidden="true" style={{ maskImage: `url(${pestIcon})`, WebkitMaskImage: `url(${pestIcon})` }} />
                </div>
                <h3 className="feature-title">Thrips Pest Detector</h3>
                <p className="feature-desc">
                  Detects and labels onion thrips pests in real-time. Uses PyTorch Faster R-CNN target localization with visual bounding boxes.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: 'var(--accent-secondary)', borderColor: 'rgba(0, 255, 135, 0.2)', background: 'rgba(0, 255, 135, 0.05)' }}>
                  <span className="feature-standard-icon" aria-hidden="true" style={{ maskImage: `url(${nutrientIcon})`, WebkitMaskImage: `url(${nutrientIcon})` }} />
                </div>
                <h3 className="feature-title">Nutrient deficiency</h3>
                <p className="feature-desc">
                  Identifies Nitrogen (N), Phosphorus (P), and Potassium (K) deficiencies, projecting Grad-CAM heatmaps showing exact symptom focus.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.2)', background: 'rgba(167, 139, 250, 0.05)' }}>
                  <span className="feature-standard-icon" aria-hidden="true" style={{ maskImage: `url(${chatIcon})`, WebkitMaskImage: `url(${chatIcon})` }} />
                </div>
                <h3 className="feature-title">AgriBot Chat Advisor</h3>
                <p className="feature-desc">
                  Combines NLP BERT classification and Bayesian decision trees to interview users, delivering crop remedy recommendations.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.2)', background: 'rgba(245, 158, 11, 0.05)' }}>
                  <span className="feature-standard-icon" aria-hidden="true" style={{ maskImage: `url(${forecastIcon})`, WebkitMaskImage: `url(${forecastIcon})` }} />
                </div>
                <h3 className="feature-title">ST-GNN Outbreak Forecast</h3>
                <p className="feature-desc">
                  A Spatio-Temporal Graph Neural Network predicting region-wide disease spread by modeling spatial relations between adjacent farms.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card feature-card">
                <div className="feature-icon-wrapper flex-center" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <span className="feature-standard-icon" aria-hidden="true" style={{ maskImage: `url(${backendIcon})`, WebkitMaskImage: `url(${backendIcon})` }} />
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
        <Suspense fallback={<div role="status" style={{ minHeight: '70vh', padding: '10rem 2rem', textAlign: 'center' }}>Loading the interactive demo...</div>}>
          <LiveDemoPage />
        </Suspense>
      )}

      {/* Project Overview Section */}
      {currentPage === 'overview' && (
        <section id="overview" className="section" style={{ paddingTop: '8rem', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
          <div className="container">
            <ProjectOverview />
          </div>
        </section>
      )}

      {/* Research Image & Video Gallery Section */}
      {currentPage === 'gallery' && (
        <section id="gallery" className="section" style={{ paddingTop: '8rem', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
          <div className="container gallery-trigger">
            <div className="section-header">
              <h2 className="gradient-text">Research Gallery & Video Logs</h2>
              <p>Explore visual maps, drone surveys, microscopy data, and model validation runs compiled during our research cycles.</p>
            </div>
            <ResearchGallery />
          </div>
        </section>
      )}

      {/* Admin Dashboard Section */}
      {currentPage === 'admin' && (
        <section id="admin" className="section" style={{ paddingTop: '8rem', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
          <div className="container">
            <Suspense fallback={<div className="page-loading glass-card" role="status">Loading dashboard…</div>}><AdminDashboard /></Suspense>
          </div>
        </section>
      )}

      {/* Tech Architecture Section */}
      {currentPage === 'home' && (
        <section id="architecture" className="section architecture-section" style={{ background: 'var(--bg-glass)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', position: 'relative', overflow: 'hidden' }}>
          {/* Ultra-HD 3D Grasses framing Architecture section */}
          <div className="grass-decor-arch-left" aria-hidden="true">
            <img src="/images/grass_hero_left_hd.png" alt="" className="grass-img grass-arch-blades-left" />
          </div>
          <div className="grass-decor-arch-right" aria-hidden="true">
            <img src="/images/grass_hero_right_hd.png" alt="" className="grass-img grass-arch-blades-right" />
          </div>

          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div className="section-header" style={{ marginBottom: '4rem' }}>
              <h2 className="gradient-text">Unified Platform Architecture</h2>
              <p>A decoupled multi-agent architecture bridging mobile clients and scalable cloud deep learning services.</p>
            </div>

            {/* Architecture visual grid/flow */}
            <div className="architecture-grid">
              <div className="glass-card architecture-card">
                <div className="architecture-icon-wrap" style={{ color: '#10b981' }}><Globe className="w-10 h-10 mx-auto" /></div>
                <h4 style={{ marginBottom: '0.5rem' }}>Flutter Client App</h4>
                <p style={{ fontSize: '0.85rem' }}>Cross-platform UI (iOS/Android), offline sqlite caching, camera scan interfaces, and light TFLite classification.</p>
              </div>
              
              <div className="architecture-connector" aria-hidden="true">
                <span className="connector-node"></span>
                <span className="connector-line"></span>
                <span className="connector-node"></span>
              </div>

              <div className="glass-card architecture-card" style={{ borderColor: 'var(--border-glass-accent)' }}>
                <div className="architecture-icon-wrap" style={{ color: 'var(--accent-secondary)' }}><GitMerge className="w-10 h-10 mx-auto" /></div>
                <h4 style={{ marginBottom: '0.5rem' }}>FastAPI Router Server</h4>
                <p style={{ fontSize: '0.85rem' }}>Docker container hosting on Hugging Face Spaces. Multi-agent coordination, database clustering, and async processing.</p>
              </div>

              <div className="architecture-connector" aria-hidden="true">
                <span className="connector-node"></span>
                <span className="connector-line"></span>
                <span className="connector-node"></span>
              </div>

              <div className="glass-card architecture-card">
                <div className="architecture-icon-wrap" style={{ color: '#a78bfa' }}><Bot className="w-10 h-10 mx-auto" /></div>
                <h4 style={{ marginBottom: '0.5rem' }}>DL Inference Pipelines</h4>
                <p style={{ fontSize: '0.85rem' }}>PyTorch object detectors, EfficientNet Grad-CAM, BERT classification engines, and ST-GNN crop spread forecasting.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Research Team Section */}
      {currentPage === 'home' && (
        <section id="team" className="section" style={{ background: 'var(--bg-glass)', borderTop: '1px solid var(--border-glass)' }}>
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
        <section id="contact" className="section contact-section" style={{ background: 'var(--bg-glass)', borderTop: '1px solid var(--border-glass)', position: 'relative', overflow: 'hidden' }}>
          {/* Ultra-HD 3D Grass cluster framing Contact section */}
          <div className="grass-decor-contact-left" aria-hidden="true">
            <img src="/images/grass_hero_left_hd.png" alt="" className="grass-img grass-contact-tuft" />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="contact-wrapper">
              <div className="contact-info">
                <div>
                  <div className="hero-tag" style={{ width: 'fit-content', marginBottom: '1.25rem' }}>
                    <span></span> GET IN TOUCH
                  </div>
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
      <SiteFooter navigateTo={navigateTo} />

      {/* Auto Android Install Prompt Modal */}
      <AndroidInstallPopup />

      {/* Auto Windows Install Prompt Modal */}
      <WindowsInstallPopup />
    </div>
  );
}
