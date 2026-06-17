import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Shield, Activity } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function ScannerDemo() {
  const [activeTab, setActiveTab] = useState<'disease' | 'nutrient'>('disease');
  const [scanning, setScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);

  const startScan = () => {
    if (scanning) return;
    setScanning(true);
    setHasScanned(false);

    // Reset components
    gsap.set(laserRef.current, { y: 0, opacity: 1, display: 'block' });
    if (heatmapRef.current) gsap.set(heatmapRef.current, { opacity: 0 });

    // GSAP Timeline for scanning animation
    const tl = gsap.timeline({
      onComplete: () => {
        setScanning(false);
        setHasScanned(true);
        gsap.set(laserRef.current, { display: 'none' });
        
        // If nutrient deficiency selected, animate the Grad-CAM heatmap overlay
        if (activeTab === 'nutrient' && heatmapRef.current) {
          gsap.to(heatmapRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      }
    });

    // Animate scanning laser down and back up
    tl.to(laserRef.current, {
      y: 350,
      duration: 1.2,
      ease: 'power1.inOut'
    })
    .to(laserRef.current, {
      y: 0,
      duration: 1.0,
      ease: 'power1.inOut'
    })
    .to(laserRef.current, {
      opacity: 0,
      duration: 0.2
    });
  };

  const results = {
    disease: {
      label: 'Purple Blotch Detected',
      confidence: '94.2%',
      model: 'TFLite Leaf Disease Classifier',
      desc: 'Significant purple lesions with yellow halos observed. This indicates Alternaria porri infection.',
      advice: 'Ensure adequate drainage. Apply copper fungicides or Mancozeb as per guidelines.',
      icon: <Shield className="w-5 h-5 text-red-500" />
    },
    nutrient: {
      label: 'Nitrogen (N) Deficiency',
      confidence: '88.7%',
      model: 'EfficientNet Nutrient Checker + Grad-CAM',
      desc: 'Chlorosis starting from the tips of older leaves. Grad-CAM confirms activation focus on leaf tip.',
      advice: 'Apply Nitrogen fertilizer (Urea) or nitrogen-rich compost to correct deficiency.',
      icon: <Activity className="w-5 h-5 text-yellow-500" />
    }
  };

  const currentResult = results[activeTab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', alignItems: 'center' }}>
      {/* Mode Selectors */}
      <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.05)', padding: '0.35rem', borderRadius: '50px', border: '1px solid var(--border-glass)' }}>
        <button 
          onClick={() => { setActiveTab('disease'); setHasScanned(false); }}
          className={`chat-option-btn ${activeTab === 'disease' ? 'active' : ''}`}
          style={{ 
            background: activeTab === 'disease' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'disease' ? '#05140d' : 'var(--text-secondary)',
            fontWeight: 600,
            border: 'none',
            padding: '0.5rem 1.25rem'
          }}
        >
          Disease Classifier
        </button>
        <button 
          onClick={() => { setActiveTab('nutrient'); setHasScanned(false); }}
          className={`chat-option-btn ${activeTab === 'nutrient' ? 'active' : ''}`}
          style={{ 
            background: activeTab === 'nutrient' ? 'var(--accent-primary)' : 'transparent',
            color: activeTab === 'nutrient' ? '#05140d' : 'var(--text-secondary)',
            fontWeight: 600,
            border: 'none',
            padding: '0.5rem 1.25rem'
          }}
        >
          Nutrient Deficiency (Grad-CAM)
        </button>
      </div>

      {/* Simulator Device Frame */}
      <div ref={containerRef} className="scanner-demo-container">
        <div className="scanner-instructions">
          {scanning ? 'Running Inference...' : 'Hover/Click Scan to test'}
        </div>

        <div className="scanner-image-wrapper" onClick={startScan}>
          {/* Laser Guide Line */}
          <div ref={laserRef} className="scanner-laser-line"></div>

          {/* Leaf Graphic (SVG for crisp responsive scaling) */}
          <svg className="scanner-leaf-svg" viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="200" height="250" fill="url(#grid)" />
            
            {/* Leaf Outline */}
            <path 
              d="M 100 220 C 130 180 160 120 140 60 C 130 30 115 15 100 5 C 85 15 70 30 60 60 C 40 120 70 180 100 220 Z" 
              fill="rgba(16, 185, 129, 0.12)" 
              stroke="rgba(16, 185, 129, 0.3)" 
              strokeWidth="2" 
            />
            {/* Leaf Veins */}
            <path d="M 100 220 Q 100 112 100 5" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1.5" />
            <path d="M 100 170 Q 120 150 132 135" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.2" />
            <path d="M 100 170 Q 80 150 68 135" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.2" />
            <path d="M 100 120 Q 125 100 138 80" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.2" />
            <path d="M 100 120 Q 75 100 62 80" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.2" />

            {/* Disease Spot (Only displays or triggers on disease mode) */}
            {activeTab === 'disease' && (
              <>
                {/* Purple Blotch spot */}
                <ellipse cx="120" cy="110" rx="14" ry="8" fill="#4c1d95" opacity="0.6" />
                <ellipse cx="120" cy="110" rx="8" ry="4" fill="#6d28d9" opacity="0.8" />
                <ellipse cx="120" cy="110" rx="4" ry="2" fill="#8b5cf6" />
                {/* Yellowing Halo */}
                <path d="M 100 105 A 25 25 0 0 1 138 122" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
              </>
            )}

            {/* Nutrient tip yellowing indicator */}
            {activeTab === 'nutrient' && (
              <path 
                d="M 100 5 C 108 12 113 22 110 32 C 105 28 95 28 90 32 C 87 22 92 12 100 5 Z" 
                fill="#eab308" 
                opacity="0.55" 
              />
            )}
          </svg>

          {/* Grad-CAM Heatmap overlay wrapper (activated in nutrient mode post-scan) */}
          <div 
            ref={heatmapRef} 
            className="heatmap-overlay"
            style={{
              background: activeTab === 'nutrient' 
                ? 'radial-gradient(circle at 50% 12%, rgba(239, 68, 68, 0.8) 0%, rgba(245, 158, 11, 0.6) 25%, rgba(16, 185, 129, 0.0) 65%)'
                : 'transparent'
            }}
          ></div>

          {/* HUD Overlay scanner UI */}
          <div className="scanner-ui">
            {hasScanned ? (
              <div>
                <div className="scanner-hud-label">{currentResult.model}</div>
                <div className="scanner-result-title">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {currentResult.icon}
                    {currentResult.label}
                  </span>
                  <span className="scanner-confidence">{currentResult.confidence}</span>
                </div>
                <div className="scanner-details" style={{ marginBottom: '0.4rem' }}>
                  {currentResult.desc}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.4rem', display: 'flex', gap: '0.25rem' }}>
                  <strong>Recommendation:</strong> {currentResult.advice}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <button 
                  onClick={(e) => { e.stopPropagation(); startScan(); }}
                  disabled={scanning}
                  className="gradient-btn"
                  style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                >
                  {scanning ? 'Analyzing Crop...' : 'Analyze Leaf Scan'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
