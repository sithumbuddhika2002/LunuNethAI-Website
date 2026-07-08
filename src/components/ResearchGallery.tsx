import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Play, 
  Eye, 
  Search, 
  SlidersHorizontal, 
  Info, 
  Terminal, 
  Download, 
  Copy, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  X,
  Database
} from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'vision' | 'field' | 'data'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [jsonExpanded, setJsonExpanded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 2,
      type: 'video',
      category: 'vision',
      title: 'Faster R-CNN Inference Session',
      desc: 'Video capture demonstrating PyTorch pest detection model processing thrips target coordinates on leaves.',
      badge: 'Model Inference Log',
      svgMedia: (
        <svg viewBox="0 0 320 200" fill="none" className="w-full h-full">
          <rect width="320" height="200" fill="#0c101b" />
          <rect x="20" y="20" width="280" height="160" fill="#082218" opacity="0.4" />
          <rect x="70" y="50" width="80" height="70" stroke="#ef4444" strokeWidth="1.5" fill="rgba(239,68,68,0.05)" />
          <text x="70" y="44" fill="#ef4444" fontFamily="monospace" fontSize="9" fontWeight="bold">Thrips 96.4%</text>
          <rect x="190" y="100" width="60" height="50" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(245,158,11,0.05)" />
          <text x="190" y="94" fill="#f59e0b" fontFamily="monospace" fontSize="9" fontWeight="bold">Thrips 88.2%</text>
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
        <svg viewBox="0 0 320 200" fill="none" className="w-full h-full">
          <rect width="320" height="200" fill="#04120a" />
          <path d="M 160 180 C 190 140 220 90 200 40 C 190 20 175 10 160 2 C 145 10 130 20 120 40 C 100 90 130 140 160 180 Z" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" />
          <ellipse cx="160" cy="80" rx="45" ry="30" fill="rgba(239, 68, 68, 0.3)" />
          <ellipse cx="160" cy="80" rx="30" ry="20" fill="rgba(245, 158, 11, 0.5)" />
          <ellipse cx="160" cy="80" rx="15" ry="10" fill="rgba(239, 68, 68, 0.7)" />
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
      title: 'AgriBot BERT Intent Classification Logs',
      desc: 'Real-time classification training dashboard showing BERT model intent categorizations.',
      badge: 'BERT Analytics Video',
      svgMedia: (
        <svg viewBox="0 0 320 200" fill="none" className="w-full h-full">
          <rect width="320" height="200" fill="#0d1117" />
          <rect x="40" y="40" width="120" height="18" rx="2" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" />
          <text x="48" y="52" fill="#10b981" fontFamily="monospace" fontSize="8">#Intent: DiseaseInfo - 98.4%</text>
          <rect x="40" y="65" width="160" height="18" rx="2" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" />
          <text x="48" y="77" fill="#10b981" fontFamily="monospace" fontSize="8">#Intent: PestControlTips - 95.8%</text>
          <rect x="40" y="90" width="80" height="18" rx="2" fill="rgba(239, 68, 68, 0.15)" stroke="rgba(239, 68, 68, 0.3)" />
          <text x="48" y="102" fill="#ef4444" fontFamily="monospace" fontSize="8">#Intent: WeatherForecast - 44.1%</text>
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

  // Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Filter items based on search query, category filter, and media type filter
  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Stagger entry animations on query or filter changes
  useGSAP(() => {
    gsap.fromTo('.gallery-card-anim', 
      {
        opacity: 0,
        y: 20,
        scale: 0.97
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
        overwrite: 'auto'
      }
    );
  }, { dependencies: [searchQuery, categoryFilter, typeFilter, visibleCount], scope: containerRef });

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Reset pagination when search or filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, categoryFilter, typeFilter]);

  // Mock specs details depending on item category
  const getItemSpecs = (item: GalleryItem) => {
    if (item.category === 'vision') {
      return [
        { label: 'Model Architecture', value: item.title.includes('R-CNN') ? 'Faster R-CNN ResNet50' : item.title.includes('Grad-CAM') ? 'EfficientNet-B4 CNN' : 'YOLOv8 Edge' },
        { label: 'Target Coordinates', value: 'Coco-annotations [.json]' },
        { label: 'Avg Inference Speed', value: item.title.includes('Edge') ? '15.4 ms (mobile)' : '24.8 FPS (server)' },
        { label: 'Precision Metric (mAP50)', value: item.title.includes('Inference') ? '94.2%' : '96.8%' }
      ];
    } else if (item.category === 'field') {
      return [
        { label: 'Protocol / Sensor', value: item.title.includes('Drone') ? 'Multi-spectral sensor' : 'IoT Soil humidity probe' },
        { label: 'Connection Standard', value: 'LoRaWAN node protocol' },
        { label: 'Sampling Interval', value: 'Every 15 minutes' },
        { label: 'Signal Quality (RSSI)', value: '-68 dBm (stable)' }
      ];
    } else {
      return [
        { label: 'Data Model Focus', value: item.title.includes('BERT') ? 'Transformer classification' : 'Microclimate predictive model' },
        { label: 'Inference Engine', value: 'HuggingFace pipelines' },
        { label: 'Data Set Volume', value: '14,200 active logs' },
        { label: 'Classification Accuracy', value: '98.4% F1-Score' }
      ];
    }
  };

  // Mock JSON telemetry representation
  const getMockJson = (item: GalleryItem) => {
    return JSON.stringify({
      log_metadata: {
        id: `LUNUNETH-LOG-${1000 + item.id}`,
        timestamp: "2026-06-25T10:15:30Z",
        category: item.category.toUpperCase(),
        log_type: item.type.toUpperCase()
      },
      telemetry: {
        node_status: "ACTIVE",
        pipeline_integrity: 1.00,
        data_packet_loss: "0.00%",
        battery_voltage: item.category === 'field' ? "3.62 V" : undefined
      },
      model_metrics: item.category === 'vision' ? {
        confidence_threshold: 0.65,
        detections_in_frame: 2,
        bounding_box_format: "xyxy"
      } : undefined
    }, null, 2);
  };

  return (
    <div ref={containerRef} className="gallery-layout-container">
      
      {/* Search and Filters Layout */}
      <div className="gallery-search-filter-card">
        {/* Search Input */}
        <div className="search-bar-wrapper">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search logs by keyword (e.g. YOLO, thrips, Grad-CAM, telemetry...)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="search-clear-btn">
              &times;
            </button>
          )}
        </div>

        {/* Double-Axis Filters */}
        <div className="filter-controls-row">
          {/* Category Filter */}
          <div className="filter-group">
            <span className="filter-group-label"><SlidersHorizontal size={14} /> Domain Category</span>
            <div className="filter-buttons">
              <button 
                onClick={() => setCategoryFilter('all')}
                className={`filter-pill ${categoryFilter === 'all' ? 'active' : ''}`}
              >
                All Domains
              </button>
              <button 
                onClick={() => setCategoryFilter('vision')}
                className={`filter-pill ${categoryFilter === 'vision' ? 'active' : ''}`}
              >
                Computer Vision
              </button>
              <button 
                onClick={() => setCategoryFilter('field')}
                className={`filter-pill ${categoryFilter === 'field' ? 'active' : ''}`}
              >
                Field Telemetry
              </button>
              <button 
                onClick={() => setCategoryFilter('data')}
                className={`filter-pill ${categoryFilter === 'data' ? 'active' : ''}`}
              >
                Analytics & Logs
              </button>
            </div>
          </div>

          {/* Media Type Filter */}
          <div className="filter-group">
            <span className="filter-group-label"><Database size={14} /> Log Type</span>
            <div className="filter-buttons">
              <button 
                onClick={() => setTypeFilter('all')}
                className={`filter-pill ${typeFilter === 'all' ? 'active' : ''}`}
              >
                All Logs
              </button>
              <button 
                onClick={() => setTypeFilter('image')}
                className={`filter-pill ${typeFilter === 'image' ? 'active' : ''}`}
              >
                Images
              </button>
              <button 
                onClick={() => setTypeFilter('video')}
                className={`filter-pill ${typeFilter === 'video' ? 'active' : ''}`}
              >
                Videos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count Info */}
      <div className="results-count-bar">
        Showing <strong>{Math.min(filteredItems.length, visibleCount)}</strong> of <strong>{filteredItems.length}</strong> matching research logs
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="gallery-empty-state">
          <Info className="empty-icon" />
          <h3>No matching research logs found</h3>
          <p>Try clearing your search query or adjusting filters to find what you are looking for.</p>
          <button 
            onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setTypeFilter('all'); }}
            className="solid-btn"
            style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
          >
            Reset Filters & Search
          </button>
        </div>
      )}

      {/* Grid of Cards */}
      <div className="gallery-grid">
        {filteredItems.slice(0, visibleCount).map((item) => (
          <div key={item.id} className="gallery-card gallery-card-anim">
            <div className="gallery-card-badge">{item.badge}</div>
            
            <div className="gallery-media-wrapper">
              {item.imagePath ? (
                <img 
                  src={item.imagePath} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              ) : (
                item.svgMedia
              )}
              
              {/* Eye Icon Hover Overlay */}
              <div 
                className="play-btn-overlay cursor-pointer"
                onClick={() => { setSelectedItem(item); setJsonExpanded(false); }}
              >
                <div className="play-icon-box flex-center">
                  {item.type === 'video' ? <Play className="w-5 h-5 fill-current" /> : <Eye className="w-5 h-5" />}
                </div>
              </div>
            </div>

            <div className="gallery-card-info">
              <h4 className="gallery-card-title">{item.title}</h4>
              <p className="gallery-card-desc">{item.desc}</p>
              <button 
                onClick={() => { setSelectedItem(item); setJsonExpanded(false); }}
                className="view-logs-link"
              >
                Inspect Telemetry Logs &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Pagination */}
      {filteredItems.length > visibleCount && (
        <div className="flex-center" style={{ marginTop: '4rem' }}>
          <button onClick={handleLoadMore} className="solid-btn load-more-btn">
            Load More Research Logs
          </button>
        </div>
      )}

      {/* Premium Detail Modal Portal */}
      {selectedItem && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-panel-container" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="modal-header-row">
              <div className="modal-title-group">
                <span className="modal-category-badge">{selectedItem.category.toUpperCase()} LOG</span>
                <h3>{selectedItem.title}</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="modal-close-btn flex-center">
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body Grid */}
            <div className="modal-body-scrollable">
              <div className="modal-grid-layout">
                
                {/* Column 1: Video Canvas or Image */}
                <div className="modal-media-column">
                  <div className="modal-media-canvas">
                    {selectedItem.imagePath ? (
                      <img 
                        src={selectedItem.imagePath} 
                        alt={selectedItem.title} 
                        className="modal-image-display" 
                      />
                    ) : (
                      <div className="modal-svg-display">
                        {selectedItem.svgMedia}
                      </div>
                    )}
                    
                    {/* Simulated Player Controls overlay for videos */}
                    {selectedItem.type === 'video' && (
                      <div className="video-player-controls-overlay">
                        <Play className="player-control-icon text-emerald-400" />
                        <div className="player-progress-bar">
                          <div className="player-progress-fill"></div>
                        </div>
                        <span className="player-time-code">00:48 / 02:15</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="modal-media-description">
                    <strong>Research Scope:</strong> {selectedItem.desc}
                  </p>
                </div>

                {/* Column 2: Metadata & JSON Log Terminal */}
                <div className="modal-specs-column">
                  
                  {/* Research specs table */}
                  <div className="specs-table-card">
                    <div className="specs-card-header"><Info size={14} /> Training / Device Specifications</div>
                    <div className="specs-rows">
                      {getItemSpecs(selectedItem).map((spec, i) => (
                        <div key={i} className="specs-row">
                          <span className="spec-label">{spec.label}</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                      <div className="specs-row">
                        <span className="spec-label">Telemetry Log Date</span>
                        <span className="spec-value">June 25, 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="modal-actions-container">
                    <button 
                      onClick={() => showToast(`Dataset slice from "${selectedItem.title}" exported successfully!`)}
                      className="solid-btn action-btn-glow"
                    >
                      <Download size={14} /> Export Dataset Slice
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`d:/git/LunuNethAI-Website/logs/LUNUNETH-LOG-${1000 + selectedItem.id}.json`);
                        showToast("Log absolute path copied to clipboard!");
                      }}
                      className="outline-btn"
                    >
                      <Copy size={14} /> Copy Local Log Path
                    </button>
                  </div>

                  {/* Collapsible JSON Log Terminal */}
                  <div className="terminal-log-container">
                    <button 
                      className="terminal-header-toggle"
                      onClick={() => setJsonExpanded(!jsonExpanded)}
                    >
                      <span className="flex-center" style={{ gap: '0.5rem' }}><Terminal size={13} /> Raw JSON Telemetry</span>
                      {jsonExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {jsonExpanded && (
                      <pre className="terminal-code-block">
                        <code>{getMockJson(selectedItem)}</code>
                      </pre>
                    )}
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Floating Success Toast */}
      <div className={`floating-success-toast ${toastVisible ? 'visible' : ''}`}>
        <CheckCircle2 size={16} className="toast-icon text-emerald-400" />
        <span>{toastMessage}</span>
      </div>

    </div>
  );
}
