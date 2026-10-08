import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const screens = {
  disease: { src: '/images/5.jpeg', alt: 'Onion leaf with a purple lesion from the LunuNeth disease screen' },
  nutrient: { src: '/images/17.jpeg', alt: 'Pale onion leaves held for nutrient analysis in the LunuNeth app' },
  pest: { src: '/images/11.jpeg', alt: 'Thrips on an onion leaf with five detection boxes from the LunuNeth app' },
  chat: { src: '/images/6.jpeg', alt: 'LunuNeth mobile chatbot showing a Sinhala follow-up question' },
};
export type DemoScreen = keyof typeof screens;

export function DemoAppImage({ screen }: { screen: Exclude<DemoScreen, 'chat'> }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`ld-crop-image ld-crop-${screen}`}>
      {failed ? <p className="ld-image-error"><ImageOff size={24} /> Sample image unavailable. You can still explore the example results.</p> :
        <img src={screens[screen].src} alt={screens[screen].alt} width="738" height="1600" loading="lazy" decoding="async" onError={() => setFailed(true)} />}
    </div>
  );
}

export function DemoScreenReference({ screen }: { screen: DemoScreen }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="ld-screen-reference" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>See the original app screen</summary>
      {open && <img src={screens[screen].src} alt={screens[screen].alt} width="738" height="1600" loading="lazy" />}
      <p>Actual app capture. The interactive example above reproduces this sample, not a new analysis.</p>
    </details>
  );
}
