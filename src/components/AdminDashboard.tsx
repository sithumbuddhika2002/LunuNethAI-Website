import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Lock, 
  Unlock, 
  Video, 
  Image as ImageIcon, 
  Folder, 
  LogOut, 
  Layout, 
  FileText, 
  CheckCircle, 
  Search, 
  SlidersHorizontal,
  X,
  PlusCircle,
  Database,
  UploadCloud,
  Smartphone,
  Monitor
} from 'lucide-react';
import { 
  getLogs, 
  addLog, 
  updateLog, 
  deleteLog, 
  CATEGORIES
} from '../utils/logsManager';
import type { CategoryType, GalleryItem, SpecItem } from '../utils/logsManager';

// Canvas-based image compression helper to keep Base64 strings small (under 60KB) for localStorage
const compressImage = (base64Str: string, maxWidth = 500, maxHeight = 500): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Export as JPEG with 0.7 quality to significantly reduce localStorage byte footprint
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

const getCategoryShortLabel = (cat: string) => {
  if (cat.includes('Purple Blotch')) return 'Purple Blotch';
  if (cat.includes('Trilingual Chatbot')) return 'Trilingual Chatbot';
  if (cat.includes('Thrips')) return 'Thrips Pest';
  if (cat.includes('Nutrient Deficiency')) return 'Nutrient Deficiency';
  if (cat.includes('Mobile App')) return 'App Screens';
  return cat;
};

export default function AdminDashboard() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('lununeth_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard navigation state
  const [activeTab, setActiveTab] = useState<'overview' | 'releases' | CategoryType>('overview');

  // Logs state
  const [logs, setLogs] = useState<GalleryItem[]>([]);
  
  // Table search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');

  // Editor Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<GalleryItem | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('Purple Blotch Disease Detection');
  const [formType, setFormType] = useState<'image' | 'video'>('image');
  const [formBadge, setFormBadge] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [mediaSource, setMediaSource] = useState<'path' | 'preset' | 'markup'>('path');
  const [formImagePath, setFormImagePath] = useState('');
  const [formPreset, setFormPreset] = useState('vision-rcnn');
  const [formSvgMarkup, setFormSvgMarkup] = useState('');
  const [formSpecs, setFormSpecs] = useState<SpecItem[]>([
    { label: 'Model Architecture', value: '' },
    { label: 'Target Coordinates', value: '' },
    { label: 'Avg Inference Speed', value: '' },
    { label: 'Precision Metric', value: '' }
  ]);
  const [formTelemetry, setFormTelemetry] = useState('');

  // Delete confirmation modal state
  const [deletingLogId, setDeletingLogId] = useState<number | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Handle local image file uploading
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      triggerToast('File size too large. Choose an image under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        triggerToast('Compressing image for database...');
        try {
          const compressed = await compressImage(base64);
          setFormImagePath(compressed);
          triggerToast('Image optimized and loaded successfully!');
        } catch (err) {
          setFormImagePath(base64);
          triggerToast('Image loaded successfully.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Load logs on mount and handle updates
  useEffect(() => {
    setLogs(getLogs());

    const handleLogsUpdate = () => {
      setLogs(getLogs());
    };

    window.addEventListener('lununeth_logs_updated', handleLogsUpdate);
    return () => {
      window.removeEventListener('lununeth_logs_updated', handleLogsUpdate);
    };
  }, []);

  // Show toast helper
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  // Handle release file upload
  const [uploadingRelease, setUploadingRelease] = useState<'android' | 'windows' | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  const handleReleaseUpload = (platform: 'android' | 'windows', file: File | undefined) => {
    if (!file) return;
    
    // Basic validation
    if (platform === 'android' && !file.name.endsWith('.apk')) {
      triggerToast('Invalid file format. Please upload an .apk file for Android.');
      return;
    }
    if (platform === 'windows' && !file.name.endsWith('.exe')) {
      triggerToast('Invalid file format. Please upload an .exe file for Windows.');
      return;
    }

    setUploadingRelease(platform);
    setUploadProgress(0);
    triggerToast(`Uploading ${platform} release...`);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('platform', platform);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload_release.php', true);
    
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      setUploadingRelease(null);
      if (xhr.status === 200) {
        try {
          const result = JSON.parse(xhr.responseText);
          if (result.status === 'success') {
            triggerToast(`${platform.charAt(0).toUpperCase() + platform.slice(1)} app updated successfully!`);
          } else {
            triggerToast(`Upload failed: ${result.message}`);
          }
        } catch (e) {
          triggerToast(`Invalid response from server.`);
        }
      } else {
        triggerToast(`Server error during upload.`);
      }
    };

    xhr.onerror = () => {
      setUploadingRelease(null);
      triggerToast(`Network error while uploading ${platform} release.`);
    };

    xhr.send(formData);
  };

  // Auth handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('lununeth_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
      triggerToast('Authenticated successfully. Welcome back!');
    } else {
      setAuthError('Invalid admin password code. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lununeth_admin_auth');
    triggerToast('Logged out of Admin Portal');
  };

  // Open editor for adding new log
  const handleAddNew = () => {
    setEditingLog(null);
    setFormTitle('');
    // Pre-populate category based on active tab
    if (activeTab !== 'overview') {
      setFormCategory(activeTab as CategoryType);
    } else {
      setFormCategory('Purple Blotch Disease Detection');
    }
    setFormType('image');
    setFormBadge('');
    setFormDesc('');
    setMediaSource('path');
    setFormImagePath('');
    setFormPreset('vision-rcnn');
    setFormSvgMarkup('');
    setFormSpecs([
      { label: 'Model Architecture', value: 'YOLOv8 Edge' },
      { label: 'Target Coordinates', value: 'Bounding boxes [.json]' },
      { label: 'Avg Inference Speed', value: '18.5 ms' },
      { label: 'Precision Metric (mAP50)', value: '93.2%' }
    ]);
    setFormTelemetry(JSON.stringify({
      log_metadata: {
        id: "LUNUNETH-LOG-TEMP",
        timestamp: new Date().toISOString(),
        category: "PURPLE BLOTCH DETECTION",
        log_type: "IMAGE"
      },
      telemetry: {
        node_status: "ACTIVE",
        pipeline_integrity: 1.00
      }
    }, null, 2));
    
    setIsModalOpen(true);
  };

  // Open editor for editing existing log
  const handleEdit = (log: GalleryItem) => {
    setEditingLog(log);
    setFormTitle(log.title);
    setFormCategory(log.category);
    setFormType(log.type);
    setFormBadge(log.badge);
    setFormDesc(log.desc);
    
    if (log.imagePath) {
      setMediaSource('path');
      setFormImagePath(log.imagePath);
    } else if (log.svgMarkup) {
      setMediaSource('markup');
      setFormSvgMarkup(log.svgMarkup);
    } else {
      setMediaSource('preset');
      setFormPreset(log.svgPreset || 'vision-rcnn');
    }

    setFormSpecs(log.specs && log.specs.length > 0 ? [...log.specs] : [
      { label: 'Model Architecture', value: '' },
      { label: 'Target Coordinates', value: '' },
      { label: 'Avg Inference Speed', value: '' },
      { label: 'Precision Metric', value: '' }
    ]);
    
    setFormTelemetry(log.telemetryJson || '');
    setIsModalOpen(true);
  };



  // Save log (Insert or Update)
  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formTitle.trim()) {
      triggerToast('Title field is required');
      return;
    }

    // Validate JSON
    let cleanTelemetry = formTelemetry;
    if (cleanTelemetry.trim()) {
      try {
        JSON.parse(cleanTelemetry);
      } catch (err) {
        triggerToast('Raw Telemetry is not valid JSON!');
        return;
      }
    } else {
      cleanTelemetry = '{}';
    }

    const payload: Omit<GalleryItem, 'id' | 'date'> = {
      title: formTitle,
      category: formCategory,
      type: formType,
      badge: formBadge,
      desc: formDesc,
      specs: formSpecs.filter(s => s.label.trim() !== ''),
      telemetryJson: cleanTelemetry,
      ...(mediaSource === 'path' ? { imagePath: formImagePath } : {}),
      ...(mediaSource === 'preset' ? { svgPreset: formPreset } : {}),
      ...(mediaSource === 'markup' ? { svgMarkup: formSvgMarkup } : {})
    };

    if (editingLog) {
      const updated: GalleryItem = {
        ...editingLog,
        ...payload
      };
      updateLog(updated);
      triggerToast(`"${formTitle}" updated successfully!`);
    } else {
      addLog(payload);
      triggerToast(`"${formTitle}" added to database!`);
    }

    setIsModalOpen(false);
  };

  // Confirm delete
  const handleDeleteConfirm = (id: number) => {
    setDeletingLogId(id);
  };

  const handleExecuteDelete = () => {
    if (deletingLogId !== null) {
      const logToDelete = logs.find(l => l.id === deletingLogId);
      deleteLog(deletingLogId);
      triggerToast(`"${logToDelete?.title}" deleted successfully.`);
      setDeletingLogId(null);
    }
  };

  // Filter logs for table list based on active category tab, search query, and media type
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.badge.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter is based directly on the active tab
    const matchesCategory = activeTab === 'overview' ? true : log.category === activeTab;
    const matchesType = typeFilter === 'all' || log.type === typeFilter;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Calculate statistics
  const totalLogsCount = logs.length;
  const imageCount = logs.filter(l => l.type === 'image').length;
  const videoCount = logs.filter(l => l.type === 'video').length;

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = logs.filter(l => l.category === cat).length;
    return acc;
  }, {} as Record<CategoryType, number>);

  // Render Login state
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper flex-center">
        <div className="glass-card login-card" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem', textAlign: 'center' }}>
          <div className="login-icon-box flex-center mx-auto">
            <Lock className="w-8 h-8 text-emerald-400" />
          </div>
          
          <h2 style={{ fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            LunuNeth AI Admin
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Secured administrator dashboard portal. Enter passkey below to manage database.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <label className="form-label" htmlFor="password">Administrator Passcode</label>
              <input 
                type="password" 
                id="password"
                className="form-control" 
                placeholder="Enter admin passcode"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ textAlign: 'center', letterSpacing: '0.1em', fontSize: '1.1rem' }}
                required
              />
              {authError && (
                <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center' }}>
                  {authError}
                </div>
              )}
            </div>

            <button type="submit" className="solid-btn w-full" style={{ padding: '0.75rem' }}>
              <Unlock className="w-4 h-4 mr-2 inline-block" /> Unlock Dashboard
            </button>
          </form>

          <div style={{ marginTop: '2rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <strong>Default Code:</strong> <code style={{ color: 'var(--accent-secondary)', fontSize: '0.8rem', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px' }}>admin123</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Top Header */}
      <div className="admin-header">
        <div className="admin-title-row">
          <div className="flex-center" style={{ gap: '0.75rem' }}>
            <div className="admin-badge flex-center">
              <Database size={16} />
            </div>
            <div>
              <h2 className="gradient-text" style={{ fontSize: '1.75rem', marginBottom: 0 }}>LunuNeth AI Console</h2>
              <p style={{ fontSize: '0.8rem', margin: 0 }}>Database management & research metrics portal</p>
            </div>
          </div>
          
          <div className="admin-nav-actions">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <Layout size={15} /> Overview
            </button>
            
            {CATEGORIES.map((cat, i) => (
              <button 
                key={i}
                onClick={() => setActiveTab(cat as any)} 
                className={`admin-tab-btn ${activeTab === cat ? 'active' : ''}`}
                title={`Manage logs under ${cat}`}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              >
                <Folder size={13} /> {getCategoryShortLabel(cat)}
              </button>
            ))}

            <button 
              onClick={() => setActiveTab('releases')} 
              className={`admin-tab-btn ${activeTab === 'releases' ? 'active' : ''}`}
              title="Manage App Releases"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              <UploadCloud size={13} /> App Releases
            </button>

            <button onClick={handleLogout} className="admin-logout-btn flex-center" style={{ marginLeft: 'auto' }}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="admin-body">
        
        {/* Tab 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="admin-overview-tab animate-fade-in">
            {/* Stats Cards Row */}
            <div className="admin-stats-grid">
              <div className="glass-card stat-item-card">
                <span className="stat-label">Total Logs Dynamic</span>
                <span className="stat-value">{totalLogsCount}</span>
                <div className="stat-footer-bar text-emerald-400">
                  <FileText size={12} className="inline mr-1" /> Dynamic collection
                </div>
              </div>

              <div className="glass-card stat-item-card">
                <span className="stat-label">Visual Image Logs</span>
                <span className="stat-value">{imageCount}</span>
                <div className="stat-footer-bar" style={{ color: 'var(--accent-secondary)' }}>
                  <ImageIcon size={12} className="inline mr-1" /> Scanners & Drone maps
                </div>
              </div>

              <div className="glass-card stat-item-card">
                <span className="stat-label">Inference Video Logs</span>
                <span className="stat-value">{videoCount}</span>
                <div className="stat-footer-bar" style={{ color: '#0ea5e9' }}>
                  <Video size={12} className="inline mr-1" /> Model tracking stream
                </div>
              </div>
            </div>

            {/* Category Breakdown list */}
            <div className="admin-layout-split">
              <div className="glass-card category-breakdown-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Folder size={18} className="text-emerald-400" /> Research Domain Distribution
                </h3>
                
                <div className="category-bars">
                  {CATEGORIES.map((cat, i) => {
                    const count = categoryCounts[cat] || 0;
                    const percent = totalLogsCount > 0 ? (count / totalLogsCount) * 100 : 0;
                    return (
                      <div key={i} className="category-bar-row" style={{ marginBottom: '1.25rem' }}>
                        <div className="category-bar-labels">
                          <span className="cat-name">{cat}</span>
                          <span className="cat-count"><strong>{count}</strong> logs</span>
                        </div>
                        <div className="cat-progress-bg">
                          <div 
                            className="cat-progress-fill" 
                            style={{ 
                              width: `${percent}%`, 
                              background: `linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))`
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Logs card */}
              <div className="glass-card recent-activity-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SlidersHorizontal size={18} className="text-emerald-400" /> Recent Log Listings
                </h3>
                <div className="recent-logs-list">
                  {logs.slice(-5).reverse().map((log) => (
                    <div key={log.id} className="recent-log-row flex-center">
                      <div className="log-type-indicator">
                        {log.type === 'video' ? <Video size={14} className="text-sky-400" /> : <ImageIcon size={14} className="text-emerald-400" />}
                      </div>
                      <div className="log-row-details">
                        <span className="log-row-title">{log.title}</span>
                        <span className="log-row-category">{log.category}</span>
                      </div>
                      <span className="log-row-date">{log.date}</span>
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                      No logs currently defined. Click "Manage Logs" to create one.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: App Releases Upload */}
        {activeTab === 'releases' && (
          <div className="admin-releases-tab animate-fade-in" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UploadCloud size={18} className="text-emerald-400" /> Manage App Releases
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Upload new production releases for the LunuNeth AI applications. These files will be immediately available to users via the Download Section. (Note: Requires PHP backend via /upload_release.php)
            </p>

            <div className="admin-stats-grid">
              {/* Android Release Card */}
              <div className="glass-card stat-item-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: '#10b981', marginBottom: '1rem', transition: 'all 0.3s ease', transform: uploadingRelease === 'android' ? 'scale(1.1)' : 'scale(1)', animation: uploadingRelease === 'android' ? 'pulse 1.5s infinite' : 'none' }}>
                  <Smartphone size={32} />
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Android App (APK)</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Upload the latest Android .apk bundle. Ensure it is named <code>LunuNeth_AI.apk</code>.
                </p>
                
                {uploadingRelease === 'android' ? (
                  <div style={{ width: '100%', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#10b981' }}>
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#10b981', transition: 'width 0.3s ease' }}></div>
                    </div>
                  </div>
                ) : (
                  <label className="gradient-btn" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center' }}>
                    Upload Android APK
                    <input 
                      type="file" 
                      accept=".apk" 
                      style={{ display: 'none' }}
                      disabled={uploadingRelease !== null}
                      onChange={(e) => handleReleaseUpload('android', e.target.files?.[0])}
                    />
                  </label>
                )}
              </div>

              {/* Windows Release Card */}
              <div className="glass-card stat-item-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ background: 'rgba(0, 164, 239, 0.1)', padding: '1rem', borderRadius: '50%', color: '#00a4ef', marginBottom: '1rem', transition: 'all 0.3s ease', transform: uploadingRelease === 'windows' ? 'scale(1.1)' : 'scale(1)', animation: uploadingRelease === 'windows' ? 'pulse 1.5s infinite' : 'none' }}>
                  <Monitor size={32} />
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Windows Setup (EXE)</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Upload the latest Windows .exe installer. Make sure it is compiled.
                </p>

                {uploadingRelease === 'windows' ? (
                  <div style={{ width: '100%', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#00a4ef' }}>
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${uploadProgress}%`, height: '100%', background: 'linear-gradient(90deg, #0078d7, #00a4ef)', transition: 'width 0.3s ease' }}></div>
                    </div>
                  </div>
                ) : (
                  <label className="gradient-btn" style={{ cursor: 'pointer', width: '100%', justifyContent: 'center', background: 'linear-gradient(90deg, #0078d7, #00a4ef)' }}>
                    Upload Windows EXE
                    <input 
                      type="file" 
                      accept=".exe" 
                      style={{ display: 'none' }}
                      disabled={uploadingRelease !== null}
                      onChange={(e) => handleReleaseUpload('windows', e.target.files?.[0])}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Logs Table CRUD */}
        {activeTab !== 'overview' && activeTab !== 'releases' && (
          <div className="admin-manage-tab animate-fade-in">
            {/* Search and Action Bar */}
            <div className="admin-search-actions-bar">
              <div className="search-bar-wrapper">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search logs by keyword..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="admin-filter-group flex-center" style={{ gap: '1rem' }}>
                <select 
                  className="admin-select-filter"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                >
                  <option value="all">All Media Types</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                </select>

                <button onClick={handleAddNew} className="solid-btn admin-add-btn">
                  <Plus size={16} /> Add Log to {getCategoryShortLabel(activeTab)}
                </button>
              </div>
            </div>

            {/* Logs Table */}
            <div className="admin-table-wrapper glass-card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>Media Preview</th>
                    <th>Title & Badge</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Telemetry Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="log-td-id">#{1000 + log.id}</td>
                      <td>
                        <div className="table-media-preview flex-center">
                          {log.imagePath ? (
                            <img src={log.imagePath} alt={log.title} className="table-img" />
                          ) : (
                            <div className="table-preset-icon">
                              {log.type === 'video' ? <Video size={16} /> : <ImageIcon size={16} />}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.title}</span>
                          <span className="table-badge-tag">{log.badge}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '200px' }}>
                        {log.category}
                      </td>
                      <td>
                        <span className={`table-type-badge ${log.type}`}>
                          {log.type.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{log.date}</td>
                      <td>
                        <div className="table-actions flex-center" style={{ gap: '0.5rem' }}>
                          <button onClick={() => handleEdit(log)} className="btn-action-edit flex-center" title="Edit Log">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => handleDeleteConfirm(log.id)} className="btn-action-delete flex-center" title="Delete Log">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No logs match your filter/search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

        {/* Toast Feedback */}
      {toastVisible && toastMessage && (
        <div className="admin-toast-alert animate-fade-in">
          <CheckCircle size={16} />
          {toastMessage}
        </div>
      )}

      {/* Insert / Edit Form Modal */}
      {isModalOpen && createPortal(
        <div className="modal-backdrop-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-panel-container admin-modal-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <div className="modal-header-row">
              <div className="modal-title-group">
                <span className="modal-category-badge">LOG EDITOR</span>
                <h3>{editingLog ? `Modify Log: #${1000 + editingLog.id}` : 'Create New Research Log'}</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="modal-close-btn flex-center">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveLog} className="admin-form-modal">
              <div className="modal-body-scrollable">
                <div className="admin-form-grid">
                  
                  {/* Left Column: Basic Details */}
                  <div className="admin-form-col">
                    <div className="form-group">
                      <label className="form-label">Log Title *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Faster R-CNN Inference Session"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Research Category *</label>
                      <select 
                        className="form-control"
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as any)}
                        required
                      >
                        {CATEGORIES.map((cat, i) => (
                          <option key={i} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="form-label">Log Media Type *</label>
                        <select 
                          className="form-control"
                          value={formType}
                          onChange={(e) => setFormType(e.target.value as any)}
                        >
                          <option value="image">Image Log</option>
                          <option value="video">Video Log</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Display Badge *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Model Inference Log"
                          value={formBadge}
                          onChange={(e) => setFormBadge(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Log Description *</label>
                      <textarea 
                        className="form-control textarea" 
                        rows={3}
                        placeholder="Detailed description of the telemetry run..."
                        value={formDesc}
                        onChange={(e) => setFormDesc(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    {/* Media config */}
                    <div className="form-group" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '1rem' }}>
                      <label className="form-label">Visual Media Source</label>
                      <div className="form-radio-row flex-center" style={{ justifyContent: 'flex-start', gap: '1.5rem', marginBottom: '0.75rem' }}>
                        <label className="flex-center" style={{ gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <input 
                            type="radio" 
                            name="mediaSource" 
                            checked={mediaSource === 'path'} 
                            onChange={() => setMediaSource('path')} 
                          /> Image File Path / URL
                        </label>
                        
                        <label className="flex-center" style={{ gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <input 
                            type="radio" 
                            name="mediaSource" 
                            checked={mediaSource === 'preset'} 
                            onChange={() => setMediaSource('preset')} 
                          /> Visual Preset (SVG)
                        </label>

                        <label className="flex-center" style={{ gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <input 
                            type="radio" 
                            name="mediaSource" 
                            checked={mediaSource === 'markup'} 
                            onChange={() => setMediaSource('markup')} 
                          /> Custom SVG Markup
                        </label>
                      </div>

                      {mediaSource === 'path' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="./images/1.jpeg or paste custom image URL"
                            value={formImagePath}
                            onChange={(e) => setFormImagePath(e.target.value)}
                          />
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                            <label className="solid-btn" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                              <PlusCircle size={14} /> Upload Local Image
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileUpload} 
                                style={{ display: 'none' }} 
                              />
                            </label>
                            {formImagePath && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '40px', height: '30px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-glass)', background: '#000' }}>
                                  <img src={formImagePath} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                  {formImagePath.startsWith('data:') ? 'Local file uploaded' : 'Path URL specified'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {mediaSource === 'preset' && (
                        <select 
                          className="form-control"
                          value={formPreset}
                          onChange={(e) => setFormPreset(e.target.value)}
                        >
                          <option value="vision-rcnn">Inference Bounding Box Scanner Preset</option>
                          <option value="vision-cam">Grad-CAM Heatmap Focus Preset</option>
                          <option value="data-bert">BERT Intent Classification Presets</option>
                        </select>
                      )}

                      {mediaSource === 'markup' && (
                        <textarea 
                          className="form-control textarea" 
                          rows={4}
                          placeholder="Paste raw <svg>...</svg> code here"
                          value={formSvgMarkup}
                          onChange={(e) => setFormSvgMarkup(e.target.value)}
                          style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                        ></textarea>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Live Media Preview */}
                  <div className="admin-form-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Visual Media Preview</label>
                    <div style={{ 
                      flex: 1, 
                      minHeight: '280px', 
                      background: 'rgba(5, 12, 10, 0.95)', 
                      border: '1px solid var(--border-glass)', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {mediaSource === 'path' && formImagePath ? (
                        <img 
                          src={formImagePath} 
                          alt="Preview" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : mediaSource === 'preset' ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          <span style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem', color: 'var(--accent-secondary)' }}>
                            Selected Visual SVG Preset:
                          </span>
                          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {formPreset === 'vision-rcnn' ? 'Inference Bounding Box Scanner' : 
                             formPreset === 'vision-cam' ? 'Grad-CAM Heatmap Focus' : 
                             'BERT Intent Classification'}
                          </span>
                          <div style={{ marginTop: '1rem', opacity: 0.6 }}>
                            (Renders dynamically in public gallery details view)
                          </div>
                        </div>
                      ) : mediaSource === 'markup' && formSvgMarkup ? (
                        <div 
                          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                          dangerouslySetInnerHTML={{ __html: formSvgMarkup }}
                        />
                      ) : (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>
                          No image path specified or local file uploaded yet.
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      💡 This preview shows how the image will be framed when viewers click the log on the website. Use <strong>Upload Local Image</strong> to load a file from your device.
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-footer-row flex-center" style={{ justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="outline-btn"
                  style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="solid-btn"
                  style={{ padding: '0.6rem 2rem', fontSize: '0.85rem' }}
                >
                  {editingLog ? 'Save Modifications' : 'Create Database Node'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {deletingLogId !== null && createPortal(
        <div className="modal-backdrop-overlay flex-center" onClick={() => setDeletingLogId(null)}>
          <div className="glass-card confirmation-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', width: '100%', padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trash2 size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Delete Database Node?</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Are you sure you want to delete log #{1000 + deletingLogId}? This action will remove the node from local storage and cannot be undone.
            </p>
            <div className="flex-center" style={{ gap: '1rem' }}>
              <button onClick={() => setDeletingLogId(null)} className="outline-btn flex-1" style={{ padding: '0.5rem' }}>
                Cancel
              </button>
              <button onClick={handleExecuteDelete} className="solid-btn flex-1" style={{ padding: '0.5rem', background: '#ef4444', borderColor: '#ef4444' }}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Floating Success Toast */}
      <div className={`floating-success-toast ${toastVisible ? 'visible' : ''}`}>
        <CheckCircle size={16} className="toast-icon text-emerald-400" />
        <span>{toastMessage}</span>
      </div>

    </div>
  );
}
