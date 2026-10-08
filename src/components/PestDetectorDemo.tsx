import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Bug, RotateCcw, CloudSun, ChevronDown } from 'lucide-react';
import { DemoAppImage, DemoScreenReference } from './DemoAppImage';

gsap.registerPlugin(useGSAP);
const metrics = [
  { value: '5', label: 'Detections', detail: 'Five bounding boxes are reported in this app capture. Each box marks a possible thrips location on the leaf.' },
  { value: '91.9%', label: 'Confidence', detail: 'The app reports 91.9% confidence for this sample. This is a result for one image, not the overall accuracy of the model.' },
  { value: 'Low', label: 'Severity', detail: 'This saved result is classified as low severity. The preview does not assess a new crop or make a treatment decision.' },
];

export default function PestDetectorDemo() {
  const [selected, setSelected] = useState(0);
  const [scanning, setScanning] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: root });
  const replay = () => contextSafe(() => {
    if (scanning) return;
    setSelected(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setScanning(true);
    gsap.fromTo(sweep.current, { opacity: 1, scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: 'power1.inOut', onComplete: () => { gsap.set(sweep.current, { opacity: 0 }); setScanning(false); } });
  })();
  return (
    <div className="ld-app-demo" ref={root}>
      <div className="ld-app-panel">
        <header className="ld-panel-header"><span><Bug size={18} /> Pest detection</span><span className="ld-preview-label">Faster R-CNN</span></header>
        <div className="ld-photo-stage"><DemoAppImage screen="pest" /><div className="ld-scan-sweep" ref={sweep} aria-hidden="true" /></div>
        <div className="ld-panel-content">
          <div className="ld-pest-heading"><div><h3>Thrips detected</h3><p className="ld-help-text">Saved result from the mobile app</p></div><button className="ld-icon-button" disabled={scanning} onClick={replay} aria-label="Replay sample pest scan"><RotateCcw size={18} /></button></div>
          <div className="ld-metrics" role="group" aria-label="Explore detection results">{metrics.map((metric, index) => <button key={metric.label} aria-pressed={selected === index} onClick={() => setSelected(index)}><strong>{metric.value}</strong><span>{metric.label}</span></button>)}</div>
          <p className="ld-metric-detail" aria-live="polite">{scanning ? 'Replaying the saved detection. No new image is being analyzed.' : metrics[selected].detail}</p>
          <details className="ld-climate-details"><summary><CloudSun size={21} /><span>What is thrips climate risk?</span><ChevronDown size={16} /></summary><p>The mobile app also offers a climate-risk view using weather and crop data. This web preview shows only the supplied image result; no live weather or location is collected.</p></details>
        </div>
      </div>
      <DemoScreenReference screen="pest" />
    </div>
  );
}
