import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, ChevronDown, Leaf, Mail, Network, ShieldCheck, Smartphone, Sprout } from 'lucide-react';
import FooterGrass from './FooterGrass';
import './SiteFooter.css';

type Page = 'home' | 'overview' | 'simulators' | 'gallery' | 'beta' | 'admin';
type Navigate = (page: Page, hash?: string) => void;

function LinkGroup({ title, icon, children, id }: { title: string; icon: ReactNode; children: ReactNode; id: string }) {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 600px)').matches);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 600px)');
    const update = () => setMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return <nav className="site-footer-group" aria-label={title}>
    <h3>{mobile ? <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      {icon}<span>{title}</span><ChevronDown size={17} className={open ? 'is-open' : ''} />
    </button> : title}</h3>
    <ul id={id} hidden={mobile && !open}>{children}</ul>
  </nav>;
}

export default function SiteFooter({ navigateTo }: { navigateTo: Navigate }) {
  const [controlsHost, setControlsHost] = useState<HTMLDivElement | null>(null);
  const link = (text: string, page: Page, hash?: string) => <a href={hash ? `/#${hash}` : page === 'home' ? '/' : `/${page}`} onClick={event => {
    event.preventDefault(); navigateTo(page, hash);
  }}>{text}</a>;

  return <footer className="site-footer">
    <div className="site-footer-content">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <a className="site-footer-logo" href="/" onClick={event => { event.preventDefault(); navigateTo('home'); }}>
            <img src="/logo.jpeg" alt="" width="46" height="46" loading="lazy" />
            <span><strong>LunuNeth AI</strong><small>CROP INTELLIGENCE</small></span>
          </a>
          <p>Bridging deep learning and traditional agriculture to secure crop yields and improve diagnostic accessibility.</p>
          <a className="site-footer-contact" href="mailto:info@lununeth.ai"><Mail size={17} /><span>Get in touch</span></a>
        </div>
        <LinkGroup title="Platform Links" icon={<Network size={17} />} id="footer-platform-links">
          <li>{link('Project Overview', 'overview')}</li>
          <li>{link('Live Simulator', 'simulators')}</li>
          <li>{link('Research Logs', 'gallery')}</li>
          <li>{link('Our Team', 'home', 'team')}</li>
          <li>{link('Download Mobile App', 'beta')}</li>
        </LinkGroup>
        <LinkGroup title="Legal & Info" icon={<ShieldCheck size={17} />} id="footer-info-links">
          <li>{link('Contact Support', 'home', 'contact')}</li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="https://huggingface.co" target="_blank" rel="noopener noreferrer">Hugging Face Space<ArrowUpRight size={13} /></a></li>
        </LinkGroup>
        <div className="site-footer-actions">
          <div className="site-footer-downloads">
            <a href="/beta" onClick={event => { event.preventDefault(); navigateTo('beta'); }}><Smartphone size={20} />Get APK<ArrowUpRight size={13} /></a>
            <a href="/beta" onClick={event => { event.preventDefault(); navigateTo('beta'); }}><Smartphone size={20} />Get IPA<ArrowUpRight size={13} /></a>
          </div>
          <div ref={setControlsHost} className="site-footer-animation-controls" />
        </div>
      </div>
      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} LunuNeth AI.<span> Developed by R26-IT-100 Team.</span></p>
        <p className="site-footer-mission"><Leaf size={17} /><span>Smarter Farming</span><span>Healthier Crops</span><span>Sustainable Tomorrow</span></p>
        <Sprout className="site-footer-mobile-sprout" size={18} aria-hidden="true" />
      </div>
    </div>
    <FooterGrass controlsHost={controlsHost} />
  </footer>;
}
