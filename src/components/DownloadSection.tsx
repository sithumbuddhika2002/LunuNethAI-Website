import { Smartphone, Download, ShieldCheck, Cpu, ExternalLink, QrCode, Monitor } from 'lucide-react';

export default function DownloadSection() {
  return (
    <div className="download-grid">
      {/* Android Download Card */}
      <div className="glass-card download-card">
        <div className="download-icon">
          <Smartphone className="w-12 h-12" />
        </div>
        <h3 className="gradient-text">Android Installation</h3>
        <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
          Deploy immediately on any Android device. Get full access to local TFLite offline models.
        </p>
        
        <ul className="download-list">
          <li>
            <ShieldCheck className="w-4 h-4" /> Direct APK installation
          </li>
          <li>
            <Cpu className="w-4 h-4" /> Offline inference enabled
          </li>
          <li>
            <QrCode className="w-4 h-4" /> QR scan code install option
          </li>
        </ul>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
          <a 
            href="downloads/android/lunuNeth%20AI%201.0.apk" 
            className="gradient-btn"
            style={{ justifyContent: 'center' }}
            download
          >
            <Download className="w-4 h-4" /> Download Android APK
          </a>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Supports Android 8.0 (Oreo) and above. Size: ~94.5 MB
          </div>
        </div>

        {/* Small Android instructions accordion/tip box */}
        <div style={{ 
          marginTop: '1.5rem', 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px dashed var(--border-glass)', 
          padding: '1rem', 
          borderRadius: '10px',
          textAlign: 'left',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>How to install:</strong>
          <ol style={{ marginLeft: '1.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <li>Download the APK file onto your device.</li>
            <li>If prompted, enable <em>"Install from Unknown Sources"</em> in settings.</li>
            <li>Open the file and tap <strong>Install</strong>.</li>
          </ol>
        </div>
      </div>

      {/* iOS Download Card */}
      <div className="glass-card download-card">
        <div className="download-icon" style={{ color: '#00ff87', filter: 'drop-shadow(0 0 12px rgba(0, 255, 135, 0.3))' }}>
          <Smartphone className="w-12 h-12" />
        </div>
        <h3 className="gradient-text" style={{ background: 'linear-gradient(135deg, var(--text-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          iOS Installation
        </h3>
        <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
          Test on Apple devices. Sideload the IPA package or join our TestFlight beta channel.
        </p>

        <ul className="download-list">
          <li>
            <ShieldCheck className="w-4 h-4" /> Secure sandbox validation
          </li>
          <li>
            <Cpu className="w-4 h-4" /> CoreML classification support
          </li>
          <li>
            <ExternalLink className="w-4 h-4" /> TestFlight Beta deployment
          </li>
        </ul>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
          <a 
            href="https://testflight.apple.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="outline-btn"
            style={{ justifyContent: 'center' }}
          >
            <ExternalLink className="w-4 h-4" /> Join TestFlight Beta
          </a>
          <a 
            href="itms-services://?action=download-manifest&url=https://lununethai.com/downloads/ios/manifest.plist" 
            className="outline-btn"
            style={{ justifyContent: 'center', borderColor: 'rgba(0, 255, 135, 0.3)', color: 'var(--accent-secondary)' }}
          >
            <Download className="w-4 h-4" /> Install iOS App (OTA)
          </a>
        </div>

        {/* Small iOS instructions box */}
        <div style={{ 
          marginTop: '1.5rem', 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px dashed var(--border-glass)', 
          padding: '1rem', 
          borderRadius: '10px',
          textAlign: 'left',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>Installation guidelines:</strong>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <li><strong>TestFlight:</strong> Click the beta link to open directly in iOS TestFlight app.</li>
            <li><strong>Direct OTA Install:</strong> Tap "Install iOS App" directly on your iOS device. After installation, navigate to <em>Settings &gt; General &gt; VPN &amp; Device Management</em> to Trust the enterprise profile.</li>
          </ul>
        </div>
      </div>

      {/* Windows Download Card */}
      <div className="glass-card download-card">
        <div className="download-icon" style={{ color: '#00a4ef', filter: 'drop-shadow(0 0 12px rgba(0, 164, 239, 0.3))' }}>
          <Monitor className="w-12 h-12" />
        </div>
        <h3 className="gradient-text" style={{ background: 'linear-gradient(135deg, var(--text-primary), #00a4ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Windows Installation
        </h3>
        <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
          Run directly on your Windows PC. Get full desktop performance for offline disease diagnosis.
        </p>

        <ul className="download-list">
          <li>
            <ShieldCheck className="w-4 h-4" /> Secure setup executable
          </li>
          <li>
            <Cpu className="w-4 h-4" /> Native desktop performance
          </li>
          <li>
            <Monitor className="w-4 h-4" /> Local GPU acceleration
          </li>
        </ul>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
          <a 
            href="https://github.com/sithumbuddhika2002/LunuNethAI-Website/releases/download/v1.0.0/LunuNeth_AI_Setup.exe" 
            className="gradient-btn"
            style={{ justifyContent: 'center', background: 'linear-gradient(90deg, #0078d7, #00a4ef)' }}
            download
          >
            <Download className="w-4 h-4" /> Download Windows App
          </a>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Supports Windows 10/11. Size: ~120 MB
          </div>
        </div>

        {/* Small Windows instructions box */}
        <div style={{ 
          marginTop: '1.5rem', 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px dashed var(--border-glass)', 
          padding: '1rem', 
          borderRadius: '10px',
          textAlign: 'left',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>How to install:</strong>
          <ol style={{ marginLeft: '1.25rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <li>Download the <code>.exe</code> file onto your PC.</li>
            <li>Double-click the installer.</li>
            <li>If prompted by Windows SmartScreen, click <strong>More info</strong> and <strong>Run anyway</strong>.</li>
            <li>Follow the setup wizard to complete installation.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
