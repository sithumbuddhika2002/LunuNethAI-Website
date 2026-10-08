import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ScanLine, Bug, MessagesSquare, Check } from 'lucide-react';
import ScannerDemo from './ScannerDemo';
import PestDetectorDemo from './PestDetectorDemo';
import AgriBotDemo from './AgriBotDemo';
import './LiveDemoPage.css';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { id: 'demo-leaf', label: 'Inspect the leaf', icon: ScanLine },
  { id: 'demo-pests', label: 'Look closer', icon: Bug },
  { id: 'demo-advice', label: 'Find a next step', icon: MessagesSquare },
];

export default function LiveDemoPage() {
  const root = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      // Chapter changes are discrete; scroll animation never updates React per frame.
      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: `#${chapter.id}`,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActiveChapter(index),
          onEnterBack: () => setActiveChapter(index),
        });
      });
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.ld-hero-copy > *', { y: 20, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out' });
        gsap.utils.toArray<HTMLElement>('.ld-reveal', page).forEach((element) => {
          gsap.from(element, {
            y: 24, opacity: 0, duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          });
        });
      });
      media.add('(prefers-reduced-motion: no-preference) and (min-width: 900px) and (pointer: fine)', () => {
          gsap.to('.ld-plant', {
            y: 65, rotation: 4, ease: 'none',
            scrollTrigger: { trigger: '.ld-hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
          });
          gsap.utils.toArray<HTMLElement>('.ld-chapter-copy', page).forEach((element) => {
            gsap.fromTo(element, { y: 16 }, {
              y: -16, ease: 'none',
              scrollTrigger: { trigger: element.closest('.ld-chapter'), start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            });
          });
      });
    }, page);
    // Results can expand without leaving stale chapter positions.
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(page);
    return () => { observer.disconnect(); media.revert(); context.revert(); };
  }, []);

  const goTo = (id: string) => {
    const target = root.current?.querySelector<HTMLElement>(`#${id}`);
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };

  return (
    <main id="demo" className="live-demo" ref={root}>
      <div className="ld-shell">
        <header className="ld-hero">
          <div className="ld-hero-copy">
            <p className="ld-eyebrow">LunuNeth AI / Interactive demo</p>
            <h1>A closer look.<br /><span>A clearer next step.</span></h1>
            <p>Follow an onion crop from the first sign of trouble to a more informed decision.</p>
            <button className="ld-button" onClick={() => goTo('demo-leaf')}>Explore the demo <ArrowDown size={18} /></button>
          </div>
          <div className="ld-hero-art" aria-hidden="true">
            <div className="ld-orbit" />
            <img className="ld-plant" src="/images/real_3d_plant.png" alt="" width="1194" height="711" fetchPriority="high" />
            <div className="ld-art-caption"><ScanLine size={20} /><span>Small signs.<br /><strong>Useful insights.</strong></span></div>
          </div>
        </header>

        <nav className="ld-chapters" aria-label="Demo chapters">
          {chapters.map(({ id, label, icon: Icon }, index) => (
            <button key={id} onClick={() => goTo(id)} aria-current={activeChapter === index ? 'step' : undefined}>
              <Icon size={19} aria-hidden="true" /><span>{label}</span><ArrowRight size={16} className="ld-nav-arrow" />
            </button>
          ))}
        </nav>

        <section id="demo-leaf" className="ld-chapter ld-leaf" tabIndex={-1} aria-labelledby="ld-leaf-title">
          <div className="ld-chapter-copy">
            <div className="ld-reveal">
              <ScanLine className="ld-chapter-icon" size={30} aria-hidden="true" />
              <h2 id="ld-leaf-title">Every leaf<br />tells a story.</h2>
              <p>A change in colour. A mark that wasn’t there yesterday. Start by exploring what a leaf can reveal.</p>
              <div className="ld-instruction"><strong>Your turn</strong><p>Choose disease or nutrient mode, then analyze the sample leaf to reveal its example result.</p></div>
              <ul className="ld-features"><li><Check size={17} /> Compare disease classifications</li><li><Check size={17} /> Explore nitrogen, phosphorus and potassium</li></ul>
              <button className="ld-text-button" onClick={() => goTo('demo-pests')}>Next, look for pests <ArrowRight size={17} /></button>
            </div>
          </div>
          <div className="ld-demo-surface ld-reveal"><ScannerDemo /><p className="ld-sample-note">Your app’s crop images • Saved sample results</p></div>
        </section>

        <section id="demo-pests" className="ld-chapter ld-pests" tabIndex={-1} aria-labelledby="ld-pest-title">
          <div className="ld-chapter-copy"><div className="ld-reveal">
            <Bug className="ld-chapter-icon" size={30} aria-hidden="true" />
            <h2 id="ld-pest-title">The smallest clues<br />deserve attention.</h2>
            <p>Not every crop concern starts with disease. Look between the leaves to explore how pest detection locates thrips.</p>
            <div className="ld-instruction"><strong>Take a closer look</strong><p>Explore the five detections from the app. Tap a result to understand its count, confidence or severity.</p></div>
            <button className="ld-text-button" onClick={() => goTo('demo-advice')}>Now, ask a question <ArrowRight size={17} /></button>
          </div></div>
          <div className="ld-demo-surface ld-reveal"><PestDetectorDemo /><p className="ld-sample-note">Example detections • No live camera required</p></div>
        </section>

        <section id="demo-advice" className="ld-chapter ld-advice" tabIndex={-1} aria-labelledby="ld-advice-title">
          <div className="ld-chapter-copy"><div className="ld-reveal">
            <MessagesSquare className="ld-chapter-icon" size={30} aria-hidden="true" />
            <h2 id="ld-advice-title">Turn a concern<br />into a conversation.</h2>
            <p>You’ve inspected the leaf and looked for pests. Explore what to ask next with AgriBot.</p>
            <div className="ld-instruction"><strong>A conversation in your language</strong><p>Choose English, Sinhala or Singlish. Share a crop concern, then answer the follow-up questions using the easy reply buttons.</p></div>
            <p className="ld-sample-note">This guided preview uses scripted replies, not a live AI service.</p>
          </div></div>
          <div className="ld-demo-surface ld-reveal"><AgriBotDemo /></div>
        </section>

        <section className="ld-ending ld-reveal" aria-labelledby="ld-ending-title">
          <h2 id="ld-ending-title">Observe. Understand. Act.</h2>
          <p>Three perspectives on one crop. Revisit a demo to explore a different question.</p>
          <button className="ld-text-button" onClick={() => goTo('demo-leaf')}>Try another leaf scan <ArrowRight size={18} /></button>
        </section>
      </div>
    </main>
  );
}
