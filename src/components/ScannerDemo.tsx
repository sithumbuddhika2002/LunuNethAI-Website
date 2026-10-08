import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScanLine, Leaf, RotateCcw, Check, FlaskConical } from 'lucide-react';
import { DemoAppImage, DemoScreenReference } from './DemoAppImage';

gsap.registerPlugin(useGSAP);

// Values transcribed from the supplied app captures, not model accuracy claims.
const probabilities = [
  ['Purple Blotch Severe', '38.4%'], ['Anthracnose Severe', '29.9%'],
  ['Purple Blotch Early', '18.5%'], ['Healthy', '7.0%'], ['Anthracnose Early', '6.2%'],
];
const nutrients = {
  N: { name: 'Nitrogen', score: 26, note: 'The app sample recommends monitoring and re-checking in 2 weeks.', fertilizer: 'Urea (46% N)' },
  P: { name: 'Phosphorus', score: 13, note: 'The app sample reports adequate levels and suggests re-checking in 3 weeks.', fertilizer: 'Triple Super Phosphate (TSP)' },
  K: { name: 'Potassium', score: 22, note: 'The app sample marks this stress score as adequate. A potassium recommendation is not visible in this capture.', fertilizer: 'Potassium status' },
};

export default function ScannerDemo() {
  const [mode, setMode] = useState<'disease' | 'nutrient'>('disease');
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [nutrient, setNutrient] = useState<keyof typeof nutrients>('N');
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: root });

  const scan = () => contextSafe(() => {
    if (scanning) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setComplete(true); return; }
    setScanning(true);
    setComplete(false);
    gsap.fromTo(line.current, { scaleY: 0, opacity: 1 }, {
      scaleY: 1, duration: 1.1, ease: 'power1.inOut',
      onComplete: () => {
        gsap.set(line.current, { opacity: 0 });
        setScanning(false);
        setComplete(true);
      },
    });
  })();

  const selected = nutrients[nutrient];
  return (
    <div className="ld-app-demo" ref={root}>
      <div className="ld-mode-switch" role="group" aria-label="Choose an analysis">
        <button aria-pressed={mode === 'disease'} disabled={scanning} onClick={() => { setMode('disease'); setComplete(false); }}><Leaf size={17} /> Disease</button>
        <button aria-pressed={mode === 'nutrient'} disabled={scanning} onClick={() => { setMode('nutrient'); setComplete(false); }}><FlaskConical size={17} /> Nutrients</button>
      </div>
      <div className="ld-app-panel">
        <header className="ld-panel-header"><span>{mode === 'disease' ? 'Leaf disease check' : 'Nutrient health check'}</span><span className="ld-preview-label">Sample preview</span></header>
        <div className="ld-photo-stage"><DemoAppImage key={mode} screen={mode} /><div className="ld-scan-sweep" ref={line} aria-hidden="true" /></div>
        <div className="ld-panel-content">
          <button className="ld-button ld-scan-button" onClick={scan} disabled={scanning}>{complete ? <RotateCcw size={17} /> : <ScanLine size={17} />}{scanning ? 'Replaying analysis...' : complete ? 'Replay sample scan' : 'Analyze this sample'}</button>
          <div aria-live="polite" aria-busy={scanning}>
            {!complete ? <p className="ld-help-text">{scanning ? 'Revealing the saved app result.' : 'Try the crop photo from our mobile app. No camera or upload needed.'}</p> : <>
              <p className="ld-complete"><Check size={15} /> Sample analysis complete</p>
              <div className="ld-result-heading"><div><span>{mode === 'disease' ? 'Diagnosis result' : 'Primary deficiency detected'}</span><h3>{mode === 'disease' ? 'Purple Blotch (Severe)' : 'N-Deficiency'}</h3></div><div className="ld-confidence"><strong>{mode === 'disease' ? '38.4%' : '31.1%'}</strong><span>confidence</span></div></div>
              {mode === 'disease' ? <>
                <p className="ld-help-text">Mid stage · This supplied app capture uses mock mode. Scores below are example class probabilities.</p>
                <details className="ld-result-details" open><summary>Compare classifications</summary><dl className="ld-probabilities">{probabilities.map(([label, value], index) => <div key={label} className={index === 0 ? 'is-leading' : ''}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></details>
              </> : <>
                <dl className="ld-nutrient-classes"><div><dt>Healthy</dt><dd>27.6%</dd></div><div><dt>K-Deficiency</dt><dd>25.7%</dd></div><div><dt>N-Deficiency</dt><dd>31.1%</dd></div><div><dt>P-Deficiency</dt><dd>15.6%</dd></div></dl>
                <h4 className="ld-small-heading">Explore NPK stress scores</h4>
                <div className="ld-npk" role="group" aria-label="Select a nutrient">{(Object.keys(nutrients) as (keyof typeof nutrients)[]).map((key) => <button key={key} onClick={() => setNutrient(key)} aria-pressed={nutrient === key} aria-label={`${nutrients[key].name}, ${nutrients[key].score}% stress, adequate`}><span>{key}</span><strong>{nutrients[key].score}%</strong><small>Adequate</small></button>)}</div>
                <div className="ld-nutrient-note"><strong>{selected.fertilizer}</strong><p>{selected.note}</p></div>
              </>}
            </>}
          </div>
        </div>
      </div>
      <DemoScreenReference key={mode} screen={mode} />
    </div>
  );
}
