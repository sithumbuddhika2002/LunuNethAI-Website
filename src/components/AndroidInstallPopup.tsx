import { useState, useEffect } from 'react';
import { Smartphone, Download, ShieldCheck, Cpu, Zap, X } from 'lucide-react';

export default function AndroidInstallPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Detect if the user is on an Android device
    const isAndroid = /Android/i.test(navigator.userAgent);

    // Future platforms support hooks (not active for prompt display yet)
    // const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    // const isWindows = /Windows/i.test(navigator.userAgent);

    // 2. Check if user already dismissed or downloaded the app
    const hasBeenDismissed = localStorage.getItem('lununeth_android_app_prompt_dismissed');

    // Only show if the user is on Android and has not dismissed it before
    if (isAndroid && !hasBeenDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // 1.5 second delay for smooth appearance

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Persist preference so the user is not repeatedly prompted
    localStorage.setItem('lununeth_android_app_prompt_dismissed', 'true');
  };

  const handleInstallClick = () => {
    // When they click Install, trigger the download automatically and hide popup
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className={`install-popup-backdrop ${isVisible ? 'visible' : ''}`}>
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
          <div className="install-popup-icon-wrapper">
            <Smartphone className="w-10 h-10" />
          </div>
          <h3 className="gradient-text install-popup-title">LunuNeth AI for Android</h3>
          <p className="install-popup-description">
            Diagnose onion crop diseases and nutrient deficiencies offline using real-time edge intelligence.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="install-popup-features">
          <div className="install-popup-feature-item">
            <ShieldCheck className="w-5 h-5" />
            <span>Direct secure APK installation</span>
          </div>
          <div className="install-popup-feature-item">
            <Cpu className="w-5 h-5" />
            <span>Local TFLite offline inference models</span>
          </div>
          <div className="install-popup-feature-item">
            <Zap className="w-5 h-5" />
            <span>Real-time scanner with instant results</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="install-popup-actions">
          <a
            href="downloads/android/lunuNeth%20AI%201.0.apk"
            className="gradient-btn install-popup-btn-primary"
            onClick={handleInstallClick}
            download="lunuNeth AI 1.0.apk"
          >
            <Download className="w-5 h-5" />
            Install Android App
          </a>
          <button onClick={handleDismiss} className="install-popup-btn-secondary">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
