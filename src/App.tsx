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
  ArrowUpRight, 
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

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'simulators' | 'gallery' | 'beta'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

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
  const navigateTo = (page: 'home' | 'simulators' | 'gallery' | 'beta', hash?: string) => {
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

  // GSAP Entrance Animations
  useGSAP(() => {
    // Kill existing triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    if (currentPage === 'home') {
      // Hero Animations
      const heroTl = gsap.timeline();
      heroTl.from('.hero-tag', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' })
            .from('.hero-title span', { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.4')
            .from('.hero-description', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.hero-btns', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .from('.hero-visual', { opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out' }, '-=0.8');

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
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.jpeg" alt="LunuNeth AI Logo" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-primary)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LunuNeth AI</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em' }}>CROP INTELLIGENCE</span>
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
            <li>
              <a 
                href="#" 
                className={currentPage === 'beta' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigateTo('beta'); }}
              >
                Download
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={currentPage === 'home' && activeSection === 'contact' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }}
              >
                Contact
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
            <a 
              href="#" 
              className={currentPage === 'beta' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigateTo('beta'); }}
            >
              Download
            </a>
            <a 
              href="#" 
              className={currentPage === 'home' && activeSection === 'contact' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigateTo('home', 'contact'); }}
            >
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {currentPage === 'home' && (
        <header className="container" ref={heroRef}>
          <div className="hero-wrapper">
            <div className="hero-content">
              <div className="hero-tag">
                <span></span> Next-Gen Crop Intelligence
              </div>
              <h1 className="hero-title">
                <span>Scientific </span>
                <span className="gradient-text">Crop Advisory </span>
                <span>at Your Fingertips</span>
              </h1>
              <p className="hero-description">
                Empowering onion farmers and researchers with deep learning. 
                Diagnose diseases, track thrips pests, identify nutrient deficiencies, and predict regional outbreaks.
              </p>
              <div className="hero-btns">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('beta'); }} 
                  className="solid-btn"
                >
                  Download Mobile App <ArrowUpRight className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('simulators'); }} 
                  className="outline-btn"
                >
                  Try Live Simulator
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-glow-orb"></div>
              {/* Visual Simulator Showcase */}
              <ScannerDemo />
            </div>
          </div>
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
