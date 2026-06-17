import { useState } from 'react';
import { ShieldAlert, Target } from 'lucide-react';

export default function PestDetectorDemo() {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  const pests = [
    { id: 1, label: 'Thrips', confidence: '96.4%', left: '38%', top: '22%', width: '16%', height: '20%', severity: 'High' },
    { id: 2, label: 'Thrips', confidence: '91.8%', left: '15%', top: '55%', width: '14%', height: '18%', severity: 'Medium' },
    { id: 3, label: 'Thrips', confidence: '87.5%', left: '68%', top: '42%', width: '15%', height: '22%', severity: 'Medium' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* Device Frame / Simulator */}
      <div className="pest-detector-wrapper" style={{ cursor: 'pointer' }}>
        
        {/* Background Grid Pattern + Onion Plants SVG */}
        <svg className="pest-bg-svg" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#081e14" />
              <stop offset="100%" stopColor="#040e0a" />
            </linearGradient>
            <pattern id="cropGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(16, 185, 129, 0.03)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          
          {/* Background */}
          <rect width="400" height="250" fill="url(#skyGrad)" />
          <rect width="400" height="250" fill="url(#cropGrid)" />
          
          {/* Ground */}
          <path d="M 0 220 Q 200 210 400 220 L 400 250 L 0 250 Z" fill="#09140e" />

          {/* Onion Plants vectors */}
          {/* Plant 1 (Left) */}
          <g transform="translate(60, 110) scale(0.65)">
            <path d="M 50 160 Q 30 110 5 80" stroke="#065f46" strokeWidth="6" strokeLinecap="round" />
            <path d="M 50 160 Q 40 90 25 40" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            <path d="M 50 160 Q 50 70 50 10" stroke="#10b981" strokeWidth="7" strokeLinecap="round" />
            <path d="M 50 160 Q 60 90 75 40" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            <path d="M 50 160 Q 70 110 95 80" stroke="#065f46" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="50" cy="160" rx="14" ry="20" fill="#f8fafc" opacity="0.9" /> {/* Onion bulb */}
          </g>

          {/* Plant 2 (Middle) */}
          <g transform="translate(180, 80) scale(0.8)">
            <path d="M 50 170 Q 25 110 2 70" stroke="#065f46" strokeWidth="7" strokeLinecap="round" />
            <path d="M 50 170 Q 38 90 22 35" stroke="#047857" strokeWidth="6" strokeLinecap="round" />
            <path d="M 50 170 Q 50 60 50 0" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
            <path d="M 50 170 Q 62 90 78 35" stroke="#047857" strokeWidth="6" strokeLinecap="round" />
            <path d="M 50 170 Q 75 110 98 70" stroke="#065f46" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="50" cy="170" rx="16" ry="24" fill="#f8fafc" opacity="0.95" />
          </g>

          {/* Plant 3 (Right) */}
          <g transform="translate(290, 100) scale(0.7)">
            <path d="M 50 165 Q 28 110 4 75" stroke="#065f46" strokeWidth="6" strokeLinecap="round" />
            <path d="M 50 165 Q 39 90 23 38" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            <path d="M 50 165 Q 50 65 50 5" stroke="#10b981" strokeWidth="7" strokeLinecap="round" />
            <path d="M 50 165 Q 61 90 77 38" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            <path d="M 50 165 Q 72 110 96 75" stroke="#065f46" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="50" cy="165" rx="15" ry="22" fill="#f8fafc" opacity="0.9" />
          </g>

          {/* Thrips pest representations (small glowing indicators inside the plants) */}
          <circle cx="85" cy="155" r="3" fill="#eab308" filter="drop-shadow(0 0 4px #eab308)" />
          <circle cx="178" cy="115" r="3" fill="#eab308" filter="drop-shadow(0 0 4px #eab308)" />
          <circle cx="310" cy="140" r="3" fill="#eab308" filter="drop-shadow(0 0 4px #eab308)" />
        </svg>

        {/* Bounding Boxes */}
        {pests.map((pest) => (
          <div
            key={pest.id}
            className="bbox-rect"
            style={{
              left: pest.left,
              top: pest.top,
              width: pest.width,
              height: pest.height,
              borderColor: hoveredBox === pest.id || hoveredBox === null ? '#ef4444' : 'rgba(239, 68, 68, 0.3)',
              boxShadow: hoveredBox === pest.id ? '0 0 15px rgba(239, 68, 68, 0.6)' : 'none',
              transform: hoveredBox === pest.id ? 'scale(1.05)' : 'scale(1)'
            }}
            onMouseEnter={() => setHoveredBox(pest.id)}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <div className="bbox-label" style={{ backgroundColor: pest.severity === 'High' ? '#ef4444' : '#f59e0b' }}>
              {pest.label} {pest.confidence}
            </div>
          </div>
        ))}
      </div>

      {/* Model Analytics Status */}
      <div className="glass-card" style={{ padding: '1.25rem 1.5rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.5rem', borderRadius: '8px', display: 'flex' }}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>PYTORCH FASTER R-CNN</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Active Pest Detection System</div>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Pests</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Target className="w-4 h-4" /> 3 Detected
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-glass)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average Conf.</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>91.9%</div>
            </div>
          </div>
        </div>

        {hoveredBox !== null && (
          <div 
            style={{ 
              marginTop: '1rem', 
              paddingTop: '0.75rem', 
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              animation: 'slideUp 0.2s ease-out forwards'
            }}
          >
            <strong>Box #{hoveredBox} Details:</strong> Detected Thrips tabaci. Severity is marked as <span style={{ color: pests[hoveredBox-1].severity === 'High' ? '#ef4444' : '#f59e0b', fontWeight: 600 }}>{pests[hoveredBox-1].severity}</span>. Prompt intervention recommended to avoid crop damage.
          </div>
        )}
      </div>
    </div>
  );
}
