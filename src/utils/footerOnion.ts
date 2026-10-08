import * as THREE from 'three';

/** Whole, closed bulb geometry. Resources belong to the footer, not the model cache. */
export function createFooterOnions() {
  const curve = new THREE.SplineCurve([
    new THREE.Vector2(0, 0), new THREE.Vector2(.13, .035),
    new THREE.Vector2(.32, .14), new THREE.Vector2(.405, .34),
    new THREE.Vector2(.37, .52), new THREE.Vector2(.25, .68),
    new THREE.Vector2(.105, .81), new THREE.Vector2(.035, .92),
    new THREE.Vector2(.018, 1), new THREE.Vector2(0, 1.025),
  ]);
  const geometry = new THREE.LatheGeometry(curve.getPoints(80), 96);
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
    const a = Math.atan2(x, z);
    const ribs = 1 + Math.sin(a * 15 + y * 1.4) * .009 + Math.sin(a * 7 - y * 3) * .012;
    positions.setXYZ(i, x * ribs, y, z * ribs * .96);
  }
  geometry.computeVertexNormals();
  const width = 512, height = 256;
  const color = new Uint8Array(width * height * 4);
  const relief = new Uint8Array(width * height * 4);
  let seed = 37;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    seed = (seed * 16807) % 2147483647;
    const u = x / width * Math.PI * 2, v = y / height;
    const grain = seed / 2147483647;
    const veins = Math.pow(.5 + .5 * Math.sin(u * 73 + Math.sin(v * 7 + u * 3) * .8), 12);
    const bands = Math.sin(u * 13 + v * 2) * .5 + .5;
    const dry = THREE.MathUtils.smoothstep(v, .82, .97);
    const shade = .72 + bands * .32 + veins * .25 + grain * .08;
    const offset = (y * width + x) * 4;
    color.set([
      Math.min(255, (112 + dry * 48) * shade),
      (29 + dry * 73) * shade,
      (65 + dry * 3) * shade, 255,
    ], offset);
    const bump = Math.round(100 + veins * 70 + grain * 20);
    relief.set([bump, bump, bump, 255], offset);
  }
  const map = new THREE.DataTexture(color, width, height);
  map.colorSpace = THREE.SRGBColorSpace;
  const bumpMap = new THREE.DataTexture(relief, width, height);
  for (const texture of [map, bumpMap]) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
  }
  const skin = new THREE.MeshPhysicalMaterial({ map, bumpMap, bumpScale: .009, roughness: .48, metalness: 0, clearcoat: .12, clearcoatRoughness: .5 });
  const rootMaterial = new THREE.MeshStandardMaterial({ color: 0x8b683d, roughness: .95 });
  const rootGeometries: THREE.BufferGeometry[] = [];
  const groups = Array.from({ length: 4 }, (_, index) => {
    const group = new THREE.Group();
    const bulb = new THREE.Mesh(geometry, skin);
    bulb.userData.onionIndex = index;
    group.add(bulb);
    for (let r = 0; r < 7; r++) {
      const angle = r * 2.4;
      const root = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(angle) * .065, .045, Math.sin(angle) * .065),
        new THREE.Vector3(Math.cos(angle) * .11, .015, Math.sin(angle) * .11),
        new THREE.Vector3(Math.cos(angle + .4) * .16, .005, Math.sin(angle + .4) * .16),
      ]);
      const rootGeometry = new THREE.TubeGeometry(root, 6, .004, 3, false);
      rootGeometries.push(rootGeometry);
      group.add(new THREE.Mesh(rootGeometry, rootMaterial));
    }
    return group;
  });
  return { groups, dispose: () => {
    geometry.dispose(); skin.dispose(); rootMaterial.dispose(); map.dispose(); bumpMap.dispose();
    rootGeometries.forEach(root => root.dispose());
  } };
}
