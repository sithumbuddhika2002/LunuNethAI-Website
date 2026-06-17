import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Play, Image as ImageIcon, Video, Layers, Eye } from 'lucide-react';

gsap.registerPlugin(useGSAP);

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  category: 'vision' | 'field' | 'data';
  title: string;
  desc: string;
  badge: string;
  svgMedia?: React.ReactNode;
  imagePath?: string;
}

export default function ResearchGallery() {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 2,
      type: 'video',
      category: 'vision',
      title: 'Faster R-CNN Inference Session',
      desc: 'Video capture demonstrating PyTorch pest detection model processing thrips target coordinates on leaves.',
      badge: 'Model Inference Log',
      svgMedia: (
        <svg viewBox="0 0 320 200" fill="none">
          <rect width="320" height="200" fill="#0c101b" />
          <rect x="20" y="20" width="280" height="160" fill="#082218" opacity="0.4" />
          {/* Bounding box vectors */}
          <rect x="70" y="50" width="80" height="70" stroke="#ef4444" strokeWidth="1.5" fill="rgba(239,68,68,0.05)" />
          <text x="70" y="44" fill="#ef4444" fontFamily="monospace" fontSize="9" fontWeight="bold">Thrips 96.4%</text>
          
          <rect x="190" y="100" width="60" height="50" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(245,158,11,0.05)" />
          <text x="190" y="94" fill="#f59e0b" fontFamily="monospace" fontSize="9" fontWeight="bold">Thrips 88.2%</text>

          {/* Code log overlay in background */}
          <text x="25" y="150" fill="#10b981" fontFamily="monospace" fontSize="7" opacity="0.6">[INFO] Box coordinates extracted...</text>
          <text x="25" y="160" fill="#10b981" fontFamily="monospace" fontSize="7" opacity="0.6">[INFO] FPS: 24.8 | Confidence threshold: 0.7</text>
        </svg>
      )
    },
    {
      id: 4,
      type: 'video',
      category: 'vision',
      title: 'EfficientNet Grad-CAM Validation',
      desc: 'Thermal heatmap mapping showing where the convolutional neural network focuses when identifying Potassium deficiency.',
      badge: 'Grad-CAM Video Log',
      svgMedia: (
        <svg viewBox="0 0 320 200" fill="none">
          <rect width="320" height="200" fill="#04120a" />
          {/* Leaf vector outline */}
          <path d="M 160 180 C 190 140 220 90 200 40 C 190 20 175 10 160 2 C 145 10 130 20 120 40 C 100 90 130 140 160 180 Z" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" />
          {/* Heatmap rings */}
          <ellipse cx="160" cy="80" rx="45" ry="30" fill="rgba(239, 68, 68, 0.3)" />
          <ellipse cx="160" cy="80" rx="30" ry="20" fill="rgba(245, 158, 11, 0.5)" />
          <ellipse cx="160" cy="80" rx="15" ry="10" fill="rgba(239, 68, 68, 0.7)" />
          {/* Bounding pointer */}
          <path d="M 160 80 L 250 80" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
          <rect x="250" y="70" width="60" height="20" rx="4" fill="rgba(0,0,0,0.8)" />
          <text x="255" y="83" fill="#f8fafc" fontFamily="monospace" fontSize="8">Deficient Focus</text>
        </svg>
      )
    },
    {
      id: 6,
      type: 'video',
      category: 'data',
      title: 'AgriBot BERT Inten Classification Logs',
      desc: 'Real-time classification training dashboard showing BERT model intent categorizations.',
      badge: 'BERT Analytics Video',
      svgMedia: (
        <svg viewBox="0 0 320 200" fill="none">
          <rect width="320" height="200" fill="#0d1117" />
          {/* Simulated chart blocks representing intent classifications */}
          <rect x="40" y="40" width="120" height="18" rx="2" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" />
          <text x="48" y="52" fill="#10b981" fontFamily="monospace" fontSize="8">#Intent: DiseaseInfo - 98.4%</text>
          
          <rect x="40" y="65" width="160" height="18" rx="2" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" />
          <text x="48" y="77" fill="#10b981" fontFamily="monospace" fontSize="8">#Intent: PestControlTips - 95.8%</text>

          <rect x="40" y="90" width="80" height="18" rx="2" fill="rgba(239, 68, 68, 0.15)" stroke="rgba(239, 68, 68, 0.3)" />
          <text x="48" y="102" fill="#ef4444" fontFamily="monospace" fontSize="8">#Intent: WeatherForecast - 44.1%</text>

          {/* Graph node representations */}
          <circle cx="250" cy="140" r="18" fill="#1e1b4b" stroke="#4f46e5" />
          <text x="242" y="143" fill="#f8fafc" fontFamily="monospace" fontSize="9" fontWeight="bold">BERT</text>
          
          <path d="M 232 140 L 180 140" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <circle cx="180" cy="140" r="8" fill="#065f46" stroke="#10b981" />
          
          <path d="M 268 140 L 295 120" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <circle cx="295" cy="120" r="8" fill="#7c2d12" stroke="#ea580c" />
        </svg>
      )
    },
    {
      id: 7,
      type: 'image',
      category: 'data',
      title: 'LunuNeth AI Home Dashboard',
      desc: 'Overview of crop health, localized weather alerts, and rapid diagnostic options for farmers.',
      badge: 'App UI Dashboard',
      imagePath: './images/1.jpeg'
    },
    {
      id: 8,
      type: 'image',
      category: 'vision',
      title: 'Pest Detection Camera Interface',
      desc: 'Real-time edge computer vision scanning onion leaves for active thrips presence.',
      badge: 'Edge AI Scanner',
      imagePath: './images/2.jpeg'
    },
    {
      id: 9,
      type: 'image',
      category: 'data',
      title: 'AgriBot Interactive Advisory',
      desc: 'AI conversational agent providing personalized fertilization schedules and disease mitigation advice.',
      badge: 'LLM Advisory',
      imagePath: './images/3.jpeg'
    },
    {
      id: 10,
      type: 'image',
      category: 'field',
      title: 'Spatio-Temporal Disease Map',
      desc: 'Geographic heatmaps indicating high-risk zones for Purple Blotch spread based on local microclimate sensors.',
      badge: 'Disease Spread Map',
      imagePath: './images/4.jpeg'
    },
    {
      id: 11,
      type: 'image',
      category: 'vision',
      title: 'Leaf Disease Diagnostic Report',
      desc: 'Onion leaf disease diagnostic results showcasing confidence scores and recommended treatments for downy mildew.',
      badge: 'Inference Report',
      imagePath: './images/5.jpeg'
    },
    {
      id: 12,
      type: 'image',
      category: 'vision',
      title: 'Downy Mildew Severity Analysis',
      desc: 'Quantitative segmentation showing leaf surface area affected by active fungal growth.',
      badge: 'Vision Segmentation',
      imagePath: './images/6.jpeg'
    },
    {
      id: 13,
      type: 'image',
      category: 'field',
      title: 'Real-Time Sensor Node Network',
      desc: 'Grid coordinates of field-deployed IoT humidity and temperature nodes for early warning networks.',
      badge: 'IoT Telemetry',
      imagePath: './images/7.jpeg'
    },
    {
      id: 14,
      type: 'image',
      category: 'data',
      title: 'Weather and Microclimate Analytics',
      desc: 'Deep dive into historical relative humidity curves predicting spore germination thresholds.',
      badge: 'Sensor Analytics',
      imagePath: './images/8.jpeg'
    },
    {
      id: 15,
      type: 'image',
      category: 'vision',
      title: 'Onion Crop Development Stage Tracker',
      desc: 'Automatic identification of phenological growth stages using multi-spectral images.',
      badge: 'Phenology Classifier',
      imagePath: './images/9.jpeg'
    },
    {
      id: 16,
      type: 'image',
      category: 'vision',
      title: 'Purple Blotch Diagnostic Logs',
      desc: 'Field-level model output capturing early necrotic lesions on onion leaves.',
      badge: 'Disease Diagnosis',
      imagePath: './images/10.jpeg'
    },
    {
      id: 17,
      type: 'image',
      category: 'data',
      title: 'Thrips Population Trend Analysis',
      desc: 'Historical graph predicting pest spikes based on temperature trends and humidity indices.',
      badge: 'Pest Forecast',
      imagePath: './images/11.jpeg'
    },
    {
      id: 18,
      type: 'image',
      category: 'data',
      title: 'AgriBot Advisory Chat Logs',
      desc: 'Detailed transcripts of botanical inquiries handled by the conversational chatbot agent.',
      badge: 'Advisory Chatbot',
      imagePath: './images/12.jpeg'
    },
    {
      id: 19,
      type: 'image',
      category: 'vision',
      title: 'Leaf Surface Microscopy Scan',
      desc: 'Magnified view of Alternaria porri conidiophores on infected tissue collected from control fields.',
      badge: 'Microscopy Data',
      imagePath: './images/13.jpeg'
    },
    {
      id: 20,
      type: 'image',
      category: 'field',
      title: 'Field Drone Multi-Spectral Map',
      desc: 'Normalized Difference Vegetation Index (NDVI) overlay indicating crop vigor anomalies across local acreage.',
      badge: 'NDVI Field Scan',
      imagePath: './images/14.jpeg'
    },
    {
      id: 21,
      type: 'video',
      category: 'vision',
      title: 'Edge Inference Video Walkthrough',
      desc: 'Live execution of pest detector running locally on a mobile device under low-light conditions.',
      badge: 'App Live Demo',
      imagePath: './images/15.jpeg'
    },
    {
      id: 22,
      type: 'video',
      category: 'data',
      title: 'AgriBot Audio-to-Text Advisory Demo',
      desc: 'Voice command feature allowing farmers to verbally ask diagnostic questions in local languages.',
      badge: 'Voice Interface Video',
      imagePath: './images/16.jpeg'
    },
    {
      id: 23,
      type: 'video',
      category: 'field',
      title: 'IoT Sensor Calibration Stream',
      desc: 'Video recording showing real-time sensor node telemetry stream validation and hardware performance.',
      badge: 'IoT Telemetry Log',
      imagePath: './images/17.jpeg'
    },
    {
      id: 24,
      type: 'video',
      category: 'vision',
      title: 'Thrips Edge Tracker Deployment',
      desc: 'On-device processing speed and CPU temperature log visualization during continuous field testing.',
      badge: 'Edge CPU Profiling',
      imagePath: './images/18.jpeg'
    },
    {
      id: 25,
      type: 'video',
      category: 'field',
      title: 'Autonomous Sprayer Coordination Map',
      desc: 'Live drone video feed tracking mock coordinates for precision spot spraying of bio-pesticides.',
      badge: 'Precision Spraying Demo',
      imagePath: './images/19.jpeg'
    },
    {
      id: 26,
      type: 'video',
      category: 'data',
      title: 'Model Optimization & Quantization Run',
      desc: 'PyTorch to ONNX/TFLite export pipeline demonstration with size reduction and latency analytics.',
      badge: 'Quantization Log',
      imagePath: './images/20.jpeg'
    },
    {
      id: 27,
      type: 'video',
      category: 'data',
      title: 'Integrated Farm Management Portal',
      desc: 'Video dashboard walkthrough connecting local field data to national agronomic research centers.',
      badge: 'Admin Dashboard Demo',
      imagePath: './images/21.jpeg'
    }
  ];

  // Filter functionality with GSAP transitions
  useGSAP(() => {
    gsap.fromTo('.gallery-card-anim', 
      {
        opacity: 0,
        scale: 0.9,
        y: 20
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        overwrite: 'auto'
      }
    );
  }, { dependencies: [filter], scope: containerRef });

  const filteredItems = galleryItems.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {/* Category Selectors */}
      <div className="gallery-filter-container">
        <button
          onClick={() => setFilter('all')}
          className="solid-btn"
          style={{
            background: filter === 'all' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
            color: filter === 'all' ? '#05140d' : 'var(--text-secondary)',
            border: '1px solid var(--border-glass)',
            boxShadow: filter === 'all' ? '0 0 15px var(--accent-glow)' : 'none',
            padding: '0.5rem 1.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Layers className="w-4 h-4" /> All Research Logs
        </button>
        <button
          onClick={() => setFilter('image')}
          className="solid-btn"
          style={{
            background: filter === 'image' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
            color: filter === 'image' ? '#05140d' : 'var(--text-secondary)',
            border: '1px solid var(--border-glass)',
            boxShadow: filter === 'image' ? '0 0 15px var(--accent-glow)' : 'none',
            padding: '0.5rem 1.5rem',
            fontSize: '0.9rem'
          }}
        >
          <ImageIcon className="w-4 h-4" /> Image Gallery
        </button>
        <button
          onClick={() => setFilter('video')}
          className="solid-btn"
          style={{
            background: filter === 'video' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
            color: filter === 'video' ? '#05140d' : 'var(--text-secondary)',
            border: '1px solid var(--border-glass)',
            boxShadow: filter === 'video' ? '0 0 15px var(--accent-glow)' : 'none',
            padding: '0.5rem 1.5rem',
            fontSize: '0.9rem'
          }}
        >
          <Video className="w-4 h-4" /> Video Logs
        </button>
      </div>

      {/* Media Grid */}
      <div className="gallery-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="gallery-card gallery-card-anim">
            <div className="gallery-card-badge">{item.badge}</div>
            
            <div className="gallery-media-wrapper" style={{ aspectRatio: item.imagePath ? '3/5' : '16/10' }}>
              {item.imagePath ? (
                <img 
                  src={item.imagePath} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                item.svgMedia
              )}
              
              {/* If Video, show Play Button Overlay */}
              {item.type === 'video' && (
                <div 
                  className="play-btn-overlay"
                  onClick={() => setSelectedVideo(item)}
                >
                  <div className="play-icon-box flex-center">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
              )}
            </div>

            <div className="gallery-card-info">
              <h4 className="gallery-card-title">{item.title}</h4>
              <p className="gallery-card-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Video Player Modal */}
      {selectedVideo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={() => setSelectedVideo(null)}>
          <div 
            style={{
              width: '100%',
              maxWidth: selectedVideo.imagePath ? '380px' : '700px',
              background: 'hsl(var(--bg-dark-raw))',
              border: '1px solid var(--border-glass)',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
              transition: 'max-width 0.3s ease-out'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border-glass)',
              display: 'flex',
              justifyContent: 'between',
              alignItems: 'center'
            }}>
              <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Video className="w-4 h-4 text-emerald-400" />
                {selectedVideo.title}
              </div>
              <button 
                onClick={() => setSelectedVideo(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                &times;
              </button>
            </div>

            {/* Video Canvas Simulation */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: selectedVideo.imagePath ? '9/16' : '16/9', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '100%', opacity: 0.85 }}>
                {selectedVideo.imagePath ? (
                  <img 
                    src={selectedVideo.imagePath} 
                    alt={selectedVideo.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                ) : (
                  <div style={{ transform: 'scale(1.5)', width: '100%', height: '100%' }}>
                    {selectedVideo.svgMedia}
                  </div>
                )}
              </div>
              
              {/* Floating controls overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                zIndex: 10
              }}>
                <Play className="w-5 h-5 text-emerald-400" />
                <div style={{ flexGrow: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: '45%', height: '100%', background: 'var(--accent-primary)', position: 'absolute', left: 0, top: 0 }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>00:45 / 02:18</span>
              </div>
            </div>

            {/* Modal Info Footer */}
            <div style={{ padding: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong>Description:</strong> {selectedVideo.desc}
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)', fontSize: '0.8rem' }}>
                <Eye className="w-4 h-4" /> <span>Real-time test prediction logs compiled successfully.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
