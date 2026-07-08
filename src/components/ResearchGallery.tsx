import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Play, 
  Eye, 
  Search, 
  SlidersHorizontal, 
  Info, 
  X,
  Database
} from 'lucide-react';
import { 
  getLogs, 
  CATEGORIES
} from '../utils/logsManager';
import type { CategoryType, GalleryItem } from '../utils/logsManager';

gsap.registerPlugin(useGSAP);

export default function ResearchGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | CategoryType>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Load logs on mount and when changes are dispatched
  const loadItems = () => {
    setGalleryItems(getLogs());
  };

  useEffect(() => {
    loadItems();
    window.addEventListener('lununeth_logs_updated', loadItems);
    return () => {
      window.removeEventListener('lununeth_logs_updated', loadItems);
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
  }, { dependencies: [searchQuery, categoryFilter, typeFilter, visibleCount, galleryItems], scope: containerRef });

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Reset pagination when search or filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, categoryFilter, typeFilter]);

  // SVG Renderer helper
  const renderSvgMedia = (preset?: string, markup?: string) => {
    if (markup) {
      return <div dangerouslySetInnerHTML={{ __html: markup }} className="w-full h-full flex-center" />;
    }

    switch (preset) {
      case 'vision-rcnn':
        return (
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
        );
      case 'vision-cam':
        return (
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
        );
      case 'data-bert':
        return (
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
        );
      default:
        return (
          <svg viewBox="0 0 320 200" fill="none" className="w-full h-full">
            <rect width="320" height="200" fill="#081410" />
            <circle cx="160" cy="100" r="40" stroke="var(--accent-primary)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            <path d="M 120 100 L 200 100 M 160 60 L 160 140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="160" y="103" textAnchor="middle" fill="var(--text-secondary)" fontFamily="monospace" fontSize="8">Telemetry Stream</text>
          </svg>
        );
    }
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
            <span className="filter-group-label"><SlidersHorizontal size={14} /> Research Category</span>
            <div className="filter-buttons flex-wrap" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setCategoryFilter('all')}
                className={`filter-pill ${categoryFilter === 'all' ? 'active' : ''}`}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat, i) => (
                <button 
                  key={i}
                  onClick={() => setCategoryFilter(cat)}
                  className={`filter-pill ${categoryFilter === cat ? 'active' : ''}`}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                >
                  {cat}
                </button>
              ))}
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
                renderSvgMedia(item.svgPreset, item.svgMarkup)
              )}
              
              {/* Eye Icon Hover Overlay */}
              <div 
                className="play-btn-overlay cursor-pointer"
                onClick={() => { setSelectedItem(item); }}
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
                onClick={() => { setSelectedItem(item); }}
                className="view-logs-link"
              >
                View Research Details &rarr;
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

      {/* Lightbox Detail Modal */}
      {selectedItem && createPortal(
        <div className="modal-backdrop-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-panel-container lightbox-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '850px' }}>
            
            {/* Modal Header */}
            <div className="modal-header-row" style={{ borderBottom: 'none', paddingBottom: '0.5rem' }}>
              <div className="modal-title-group">
                <span className="modal-category-badge">{selectedItem.category.toUpperCase()}</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.25rem' }}>{selectedItem.title}</h3>
              </div>
              <button onClick={() => setSelectedItem(null)} className="modal-close-btn flex-center">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Just the big media canvas and description */}
            <div className="modal-body-scrollable" style={{ paddingTop: '0.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', background: '#000', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                  {selectedItem.imagePath ? (
                    <img 
                      src={selectedItem.imagePath} 
                      alt={selectedItem.title} 
                      style={{ width: '100%', height: 'auto', maxHeight: '60vh', objectFit: 'contain', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderSvgMedia(selectedItem.svgPreset, selectedItem.svgMarkup)}
                    </div>
                  )}
                </div>
                
                <div style={{ padding: '0 0.5rem 1rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    {selectedItem.desc}
                  </p>
                </div>
                
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
