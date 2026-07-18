import { useState, useEffect } from 'react';
import { Download, ShieldCheck, Cpu, X, Monitor } from 'lucide-react';

export default function WindowsInstallPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Detect if the user is on a Windows device
    const isWindows = /Windows/i.test(navigator.userAgent);

    // 2. Check if the user already downloaded the app
    const hasDownloaded = localStorage.getItem('lununeth_windows_app_downloaded');

    // Only show if the user is on Windows and has not downloaded it yet
    if (isWindows && !hasDownloaded) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // 1.5 second delay for smooth appearance

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    // Close the popup for the current session
    setIsVisible(false);
  };

  const handleInstallClick = () => {
    // Hide the popup and mark as downloaded in localStorage
    setIsVisible(false);
    localStorage.setItem('lununeth_windows_app_downloaded', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={`install-popup-backdrop ${isVisible ? 'visible' : ''}`} onClick={handleDismiss}>
      <div className="install-popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Icon Button */}
        <button 
          onClick={handleDismiss} 
          className="install-popup-close" 
          aria-label="Close installation prompt"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="install-popup-header">
          <div className="install-popup-icon-wrapper" style={{ padding: '2px', overflow: 'hidden' }}>
            <img 
              src="/logo.jpeg" 
              alt="LunuNeth AI Logo" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
            />
          </div>
          <h3 className="gradient-text install-popup-title">LunuNeth AI for Windows</h3>
          <p className="install-popup-description">
            Diagnose onion crop diseases and nutrient deficiencies offline using native desktop intelligence on your PC.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="install-popup-features">
          <div className="install-popup-feature-item">
            <Monitor className="w-5 h-5" />
            <span>Native desktop performance & local execution</span>
          </div>
          <div className="install-popup-feature-item">
            <ShieldCheck className="w-5 h-5" />
            <span>Secure offline processing</span>
          </div>
          <div className="install-popup-feature-item">
            <Cpu className="w-5 h-5" />
            <span>GPU acceleration for instant diagnostics</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="install-popup-actions">
          <a
            href="downloads/windows/LunuNeth_AI_Setup.exe"
            className="gradient-btn install-popup-btn-primary"
            onClick={handleInstallClick}
            download="LunuNeth_AI_Setup.exe"
          >
            <Download className="w-5 h-5" />
            Download Windows App
          </a>
          <button onClick={handleDismiss} className="install-popup-btn-secondary">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
