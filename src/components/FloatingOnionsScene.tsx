import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { loadOnionAssets, createOnionInstance } from '../utils/onion3dLoader';

interface OnionConfig {
  id: string;
  type: 'purple' | 'yellow';
  section: 'hero' | 'features' | 'architecture' | 'team' | 'contact';
  targetScrollProgress: number; // 0.0 to 1.0 (where it is vertically centered in the viewport)
  baseX: number; // X position in Three.js world units
  baseY: number; // Y offset in world units
  baseZ: number; // Z depth (-3 to +1)
  scale: number; // Normalized scale
  baseRot: [number, number, number];
  rotSpeed: [number, number, number]; // Rotation velocity
  floatFreq: number; // Float frequency
  floatAmp: number; // Float amplitude
  parallaxSpeed: number; // Scroll travel multiplier
  minDevice: 'mobile' | 'tablet' | 'desktop';
}

const ONION_CONFIGS: OnionConfig[] = [
  // 1. Hero Section Onions
  {
    id: 'hero-top-right',
    type: 'purple',
    section: 'hero',
    targetScrollProgress: 0.04,
    baseX: 4.8,
    baseY: 2.1,
    baseZ: -0.6,
    scale: 0.44,
    baseRot: [0.3, 0.4, -0.2],
    rotSpeed: [0.002, 0.003, 0.001],
    floatFreq: 1.1,
    floatAmp: 0.12,
    parallaxSpeed: 1.2,
    minDevice: 'desktop'
  },
  {
    id: 'hero-mid-left',
    type: 'yellow',
    section: 'hero',
    targetScrollProgress: 0.08,
    baseX: -5.4,
    baseY: -1.2,
    baseZ: 0.1,
    scale: 0.40,
    baseRot: [-0.2, 0.6, 0.1],
    rotSpeed: [-0.0015, 0.0025, 0.001],
    floatFreq: 0.9,
    floatAmp: 0.15,
    parallaxSpeed: 1.0,
    minDevice: 'tablet'
  },

  // 2. Crop Protection Modules (#features)
  {
    id: 'features-left',
    type: 'purple',
    section: 'features',
    targetScrollProgress: 0.28,
    baseX: -5.7,
    baseY: 0.8,
    baseZ: -0.2,
    scale: 0.48,
    baseRot: [0.5, -0.4, 0.2],
    rotSpeed: [0.002, 0.002, -0.001],
    floatFreq: 1.2,
    floatAmp: 0.14,
    parallaxSpeed: 1.1,
    minDevice: 'mobile'
  },
  {
    id: 'features-right',
    type: 'yellow',
    section: 'features',
    targetScrollProgress: 0.35,
    baseX: 5.6,
    baseY: -0.5,
    baseZ: 0.0,
    scale: 0.42,
    baseRot: [-0.4, 0.8, -0.3],
    rotSpeed: [-0.001, 0.002, 0.0015],
    floatFreq: 1.0,
    floatAmp: 0.13,
    parallaxSpeed: 1.0,
    minDevice: 'tablet'
  },
  {
    id: 'features-depth-bg',
    type: 'purple',
    section: 'features',
    targetScrollProgress: 0.39,
    baseX: -4.4,
    baseY: -2.0,
    baseZ: -2.2,
    scale: 0.28,
    baseRot: [0.2, 0.2, 0.5],
    rotSpeed: [0.001, 0.0015, 0.0008],
    floatFreq: 0.7,
    floatAmp: 0.08,
    parallaxSpeed: 0.55,
    minDevice: 'desktop'
  },

  // 3. Platform Architecture (#architecture)
  {
    id: 'arch-left',
    type: 'yellow',
    section: 'architecture',
    targetScrollProgress: 0.54,
    baseX: -5.6,
    baseY: 0.5,
    baseZ: 0.2,
    scale: 0.45,
    baseRot: [0.6, -0.5, 0.3],
    rotSpeed: [0.0018, 0.0022, -0.001],
    floatFreq: 1.1,
    floatAmp: 0.14,
    parallaxSpeed: 1.15,
    minDevice: 'tablet'
  },
  {
    id: 'arch-right',
    type: 'purple',
    section: 'architecture',
    targetScrollProgress: 0.61,
    baseX: 5.7,
    baseY: -0.6,
    baseZ: -0.4,
    scale: 0.41,
    baseRot: [-0.3, 0.7, 0.4],
    rotSpeed: [-0.0012, 0.0024, 0.0012],
    floatFreq: 0.95,
    floatAmp: 0.12,
    parallaxSpeed: 0.95,
    minDevice: 'desktop'
  },

  // 4. Research Team (#team)
  {
    id: 'team-left',
    type: 'purple',
    section: 'team',
    targetScrollProgress: 0.75,
    baseX: -5.8,
    baseY: 0.6,
    baseZ: -0.1,
    scale: 0.42,
    baseRot: [0.4, 0.3, -0.3],
    rotSpeed: [0.0015, 0.002, 0.001],
    floatFreq: 1.0,
    floatAmp: 0.12,
    parallaxSpeed: 1.05,
    minDevice: 'desktop'
  },
  {
    id: 'team-right',
    type: 'yellow',
    section: 'team',
    targetScrollProgress: 0.81,
    baseX: 5.8,
    baseY: -0.5,
    baseZ: -0.4,
    scale: 0.38,
    baseRot: [-0.5, 0.6, 0.2],
    rotSpeed: [-0.001, 0.0018, 0.0014],
    floatFreq: 0.85,
    floatAmp: 0.11,
    parallaxSpeed: 0.9,
    minDevice: 'tablet'
  },

  // 5. Contact Section (#contact)
  {
    id: 'contact-right',
    type: 'purple',
    section: 'contact',
    targetScrollProgress: 0.93,
    baseX: 5.4,
    baseY: 0.3,
    baseZ: 0.1,
    scale: 0.46,
    baseRot: [0.2, -0.4, 0.3],
    rotSpeed: [0.002, 0.0022, -0.001],
    floatFreq: 1.05,
    floatAmp: 0.14,
    parallaxSpeed: 1.1,
    minDevice: 'mobile'
  }
];

export const FloatingOnionsScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);

    // 2. High-Performance WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('[FloatingOnionsScene] WebGL initialization error:', e);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 3. Environmental Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.0);
    fillLight.position.set(-5, -4, -4);
    scene.add(fillLight);

    const emeraldRimLight = new THREE.DirectionalLight(0x10b981, 0.85);
    emeraldRimLight.position.set(0, -6, 2);
    scene.add(emeraldRimLight);

    // 4. Instantiated Onion Objects Map
    interface OnionInstance {
      config: OnionConfig;
      group: THREE.Group;
      currentRot: [number, number, number];
      idHash: number;
    }

    const instances: OnionInstance[] = [];
    let isDisposed = false;

    // Load assets and populate instances
    loadOnionAssets().then(() => {
      if (isDisposed) return;

      ONION_CONFIGS.forEach((cfg, idx) => {
        const mesh = createOnionInstance(cfg.type);
        if (!mesh) return;

        mesh.scale.setScalar(cfg.scale);
        mesh.rotation.set(...cfg.baseRot);
        mesh.position.set(cfg.baseX, cfg.baseY, cfg.baseZ);

        scene.add(mesh);

        instances.push({
          config: cfg,
          group: mesh,
          currentRot: [...cfg.baseRot],
          idHash: idx * 1.618
        });
      });

      // Render initial static frame immediately
      renderer.render(scene, camera);
    }).catch((err) => {
      console.warn('[FloatingOnionsScene] Could not load 3D onion assets:', err);
    });

    // 5. Responsive & Motion State
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const computeScrollProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return Math.min(1.0, Math.max(0, window.scrollY / maxScroll));
    };

    const handleScroll = () => {
      targetScrollProgress = computeScrollProgress();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable mouse parallax on mobile
      targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

      targetScrollProgress = computeScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    targetScrollProgress = computeScrollProgress();
    currentScrollProgress = targetScrollProgress;

    // 6. Animation Loop with Visibility Pause
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);

      if (document.hidden) return;

      const deltaMs = Math.min(now - lastTime, 100);
      lastTime = now;
      const t = now * 0.001;

      // Smooth lerp for scroll and mouse
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const widthRatio = Math.min(1.0, window.innerWidth / 1360);

      instances.forEach((inst) => {
        const { config, group, idHash } = inst;

        // Device filter
        if (isMobile && config.minDevice !== 'mobile') {
          group.visible = false;
          return;
        }
        if (isTablet && config.minDevice === 'desktop') {
          group.visible = false;
          return;
        }

        // Parallax vertical travel
        // delta is difference between user scroll position and this onion's center
        const scrollDelta = (currentScrollProgress - config.targetScrollProgress);
        // Vertical travel: 22 units spans across screen entry to exit
        const travelY = -scrollDelta * 22 * config.parallaxSpeed;
        const targetY = config.baseY + travelY;

        // Viewport frustum culling: hide if off-screen (camera FOV 45 at z ~ 10 is ~ +-5.5)
        if (targetY > 6.2 || targetY < -6.2) {
          group.visible = false;
          return;
        }
        group.visible = true;

        if (prefersReducedMotion) {
          // Static resting layout if user requests reduced motion
          group.position.set(config.baseX * widthRatio, config.baseY, config.baseZ);
          return;
        }

        // Floating oscillations
        const floatX = Math.sin(t * config.floatFreq + idHash) * config.floatAmp;
        const floatY = Math.cos(t * config.floatFreq * 0.85 + idHash) * (config.floatAmp * 1.15);
        const floatZ = Math.sin(t * config.floatFreq * 0.6 + idHash) * (config.floatAmp * 0.5);

        // Mouse Parallax Offset (subtle depth multiplier)
        const depthFactor = 1.0 / (Math.abs(config.baseZ) + 2.5);
        const mouseShiftX = isMobile ? 0 : currentMouseX * 0.65 * depthFactor;
        const mouseShiftY = isMobile ? 0 : -currentMouseY * 0.45 * depthFactor;

        // Position update
        const posX = (config.baseX * widthRatio) + floatX + mouseShiftX;
        const posY = targetY + floatY + mouseShiftY;
        const posZ = config.baseZ + floatZ;

        group.position.set(posX, posY, posZ);

        // Continuous subtle rotation
        inst.currentRot[0] += config.rotSpeed[0] * (deltaMs / 16.6);
        inst.currentRot[1] += config.rotSpeed[1] * (deltaMs / 16.6);
        inst.currentRot[2] += config.rotSpeed[2] * (deltaMs / 16.6);

        // Plus subtle scroll-dependent delta spin
        const scrollSpin = scrollDelta * 1.5;
        group.rotation.set(
          inst.currentRot[0],
          inst.currentRot[1] + scrollSpin,
          inst.currentRot[2]
        );
      });

      renderer.render(scene, camera);
    };

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(animate);
    } else {
      // Just render static scene on load
      const checkAndRender = () => {
        if (instances.length > 0) {
          renderer.render(scene, camera);
        } else {
          setTimeout(checkAndRender, 100);
        }
      };
      checkAndRender();
    }

    // 7. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      instances.forEach((inst) => {
        scene.remove(inst.group);
      });

      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="floating-onions-canvas"
      aria-hidden="true"
    />
  );
};

export default FloatingOnionsScene;
