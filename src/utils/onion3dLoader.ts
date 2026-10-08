import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let cachedYellow: THREE.Group | null = null;
let cachedPurple: THREE.Group | null = null;
let loadPromise: Promise<{ yellow: THREE.Group; purple: THREE.Group }> | null = null;

/**
 * Normalizes a loaded 3D onion model:
 * - Centers geometry at (0, 0, 0)
 * - Scales the bounding box to a uniform 1.0 unit box
 * - Sets realistic PBR material properties (roughness, metalness, env map intensity)
 */
function normalizeModel(scene: THREE.Group): THREE.Group {
  const box = new THREE.Box3().setFromObject(scene);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 1.0 / maxDim;

  scene.position.sub(center);
  scene.scale.setScalar(scale);

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.roughness = Math.max(mat.roughness, 0.38);
        mat.metalness = Math.min(mat.metalness, 0.08);
        mat.envMapIntensity = 1.1;
        mat.needsUpdate = true;
      }
    }
  });

  const wrapper = new THREE.Group();
  wrapper.add(scene);
  return wrapper;
}

/**
 * Loads authentic yellow and purple 3D onion models once and caches them in memory.
 */
export function loadOnionAssets(): Promise<{ yellow: THREE.Group; purple: THREE.Group }> {
  if (cachedYellow && cachedPurple) {
    return Promise.resolve({ yellow: cachedYellow, purple: cachedPurple });
  }

  if (loadPromise) {
    return loadPromise;
  }

  const loader = new GLTFLoader();

  loadPromise = Promise.all([
    new Promise<THREE.Group>((resolve, reject) => {
      loader.load(
        '/model/onion.glb',
        (gltf) => {
          const norm = normalizeModel(gltf.scene);
          cachedYellow = norm;
          resolve(norm);
        },
        undefined,
        (err) => {
          console.warn('[Onion3DLoader] Failed to load onion.glb:', err);
          reject(err);
        }
      );
    }),
    new Promise<THREE.Group>((resolve, reject) => {
      loader.load(
        '/model/purple_onion.glb',
        (gltf) => {
          const norm = normalizeModel(gltf.scene);
          cachedPurple = norm;
          resolve(norm);
        },
        undefined,
        (err) => {
          console.warn('[Onion3DLoader] Failed to load purple_onion.glb:', err);
          reject(err);
        }
      );
    })
  ]).then(([yellow, purple]) => ({ yellow, purple }));

  return loadPromise;
}

/**
 * Clones a preloaded model instance for lightweight multi-object rendering.
 * Does not duplicate GPU textures or geometries.
 */
export function createOnionInstance(type: 'yellow' | 'purple'): THREE.Group | null {
  const template = type === 'purple' ? cachedPurple : cachedYellow;
  if (!template) return null;
  return template.clone(true);
}
