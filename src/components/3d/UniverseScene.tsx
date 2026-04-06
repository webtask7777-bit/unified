'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

/*
  Realistic Spiral Galaxy — based on NASA/Hubble/JWST reference
*/

/* ── Soft circular star texture (no square particles) ───── */
function createStarTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.15, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.3)');
  gradient.addColorStop(0.7, 'rgba(255,255,255,0.05)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ── Main Galaxy Particles ──────────────────────────────── */
function Galaxy() {
  const ref = useRef<THREE.Points>(null!);
  const starTex = useMemo(() => createStarTexture(), []);
  const count = 42000;
  const maxR = 5.2;
  const pitchAngle = 20 * (Math.PI / 180); // 20 degree pitch
  const b = 1 / Math.tan(pitchAngle); // logarithmic spiral rate

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x: number, y: number, z: number;
      let r: number, t: number;

      // 70% arm stars, 20% interarm, 10% bulge
      const roll = Math.random();

      if (roll < 0.1) {
        // ── BULGE STARS ──
        // Sersic-like profile: concentrated, spheroidal
        r = Math.pow(Math.random(), 2.5) * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.cos(phi) * 0.5; // oblate spheroid
        z = r * Math.sin(phi) * Math.sin(theta);
        t = 0; // core

        // Warm amber/gold
        col[i3] = 1.0;
        col[i3 + 1] = 0.82 + Math.random() * 0.12;
        col[i3 + 2] = 0.45 + Math.random() * 0.2;
        // Bulge stars: small, dense
        sz[i] = 0.02 + Math.pow(Math.random(), 3) * 0.04;

      } else if (roll < 0.3) {
        // ── INTERARM STARS ──
        // Uniformly scattered in disk, dimmer, warmer
        r = Math.pow(Math.random(), 0.5) * maxR;
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * r;
        // Exponential vertical falloff
        const scaleH = maxR / 55;
        y = (Math.random() < 0.5 ? 1 : -1) * Math.abs(gaussRandom()) * scaleH;
        z = Math.sin(angle) * r;
        t = r / maxR;

        // Dim warm yellow-orange (old disk population)
        const brightness = 0.3 + Math.random() * 0.35;
        col[i3] = brightness + 0.15;
        col[i3 + 1] = brightness + 0.05;
        col[i3 + 2] = brightness * 0.6;
        sz[i] = 0.012 + Math.pow(Math.random(), 3) * 0.025;

      } else {
        // ── ARM STARS ──
        // Determine which arm (0-3: 0,1 primary; 2,3 secondary)
        const armIdx = i % 4;
        const isPrimary = armIdx < 2;
        const armBase = (armIdx / 2) * Math.PI; // 2 arm pairs at 0° and 180°

        // Radius with concentration bias
        r = Math.pow(Math.random(), 0.45) * maxR;
        if (r < 0.15) r = 0.15 + Math.random() * 0.3; // avoid core overlap

        // Logarithmic spiral angle
        const theta = Math.log(r / 0.2) * b + armBase;

        // Gaussian scatter perpendicular to arm
        const armWidth = isPrimary ? 0.22 : 0.35; // secondary arms wider/more diffuse
        const scatter = gaussRandom() * armWidth * (0.5 + r * 0.12);

        const angle = theta + scatter;
        x = Math.cos(angle) * r;
        z = Math.sin(angle) * r;

        // Exponential vertical falloff — very thin disk
        const scaleH = maxR / 55;
        y = (Math.random() < 0.5 ? 1 : -1) * Math.abs(gaussRandom()) * scaleH * (0.5 + r * 0.15);

        t = r / maxR;

        // Color based on position in arm and distance
        if (t < 0.2) {
          // Inner arm — transition from warm to white
          col[i3] = 1.0;
          col[i3 + 1] = 0.88 + Math.random() * 0.1;
          col[i3 + 2] = 0.65 + Math.random() * 0.2;
        } else {
          // Mid-outer arms
          const starType = Math.random();
          if (starType < 0.45) {
            // Blue-white young OB stars (dominant in arms visually)
            col[i3] = 0.6 + Math.random() * 0.25;
            col[i3 + 1] = 0.72 + Math.random() * 0.2;
            col[i3 + 2] = 0.95 + Math.random() * 0.05;
          } else if (starType < 0.55) {
            // Pink/magenta HII emission knots
            col[i3] = 0.95 + Math.random() * 0.05;
            col[i3 + 1] = 0.3 + Math.random() * 0.25;
            col[i3 + 2] = 0.55 + Math.random() * 0.25;
          } else if (starType < 0.75) {
            // White stars
            const w = 0.8 + Math.random() * 0.2;
            col[i3] = w;
            col[i3 + 1] = w;
            col[i3 + 2] = w;
          } else if (starType < 0.9) {
            // Yellow old arm stars
            col[i3] = 0.95;
            col[i3 + 1] = 0.8 + Math.random() * 0.1;
            col[i3 + 2] = 0.4 + Math.random() * 0.2;
          } else {
            // Red supergiants (rare, large)
            col[i3] = 1.0;
            col[i3 + 1] = 0.25 + Math.random() * 0.2;
            col[i3 + 2] = 0.1 + Math.random() * 0.1;
          }
        }

        // Secondary arms are dimmer
        if (!isPrimary) {
          col[i3] *= 0.65;
          col[i3 + 1] *= 0.65;
          col[i3 + 2] *= 0.65;
        }

        // Power-law size: many small, few large (IMF-like)
        sz[i] = 0.015 + Math.pow(Math.random(), 2.5) * 0.045;
        // Occasional bright star cluster
        if (Math.random() < 0.005) sz[i] = 0.06 + Math.random() * 0.03;
      }

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
    }
    return { positions: pos, colors: col, sizes: sz };
  }, [b, maxR]);

  // Differential rotation: handled per-frame by rotating the whole group slowly
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={starTex}
        size={0.06}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Gaussian random (Box-Muller) ───────────────────────── */
function gaussRandom(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* ── Central Bulge Glow (soft amber bloom) ──────────────── */
function BulgeGlow() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.getElapsedTime() * 0.4) * 0.03;
    ref.current.scale.set(s, s * 0.4, s);
  });

  return (
    <group ref={ref}>
      {/* Hot inner core */}
      <mesh>
        <sphereGeometry args={[0.08, 20, 20]} />
        <meshBasicMaterial color="#fff5e0" transparent opacity={0.95} />
      </mesh>
      {/* Amber glow */}
      <mesh>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshBasicMaterial color="#ffcc66" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Warm halo */}
      <mesh>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshBasicMaterial color="#cc8833" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Extended soft glow */}
      <mesh>
        <sphereGeometry args={[0.85, 20, 20]} />
        <meshBasicMaterial color="#885522" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── HII Region Nebula Glow (pink emission knots) ───────── */
function HIIRegions() {
  const ref = useRef<THREE.Group>(null!);

  const regions = useMemo(() => {
    const result: { x: number; z: number; size: number; color: string }[] = [];
    const pitchAng = 20 * (Math.PI / 180);
    const bRate = 1 / Math.tan(pitchAng);
    const hiiColors = ['#ff4488', '#ff5577', '#ee3399', '#ff6688', '#dd4488', '#ff5599'];

    for (let i = 0; i < 14; i++) {
      const armBase = (i % 2) * Math.PI;
      const r = 1.2 + Math.random() * 3.2;
      const theta = Math.log(r / 0.2) * bRate + armBase + (Math.random() - 0.5) * 0.25;
      result.push({
        x: Math.cos(theta) * r,
        z: Math.sin(theta) * r,
        size: 0.08 + Math.random() * 0.15,
        color: hiiColors[i % hiiColors.length],
      });
    }
    return result;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={ref}>
      {regions.map((h, i) => (
        <mesh key={i} position={[h.x, 0, h.z]}>
          <sphereGeometry args={[h.size, 10, 10]} />
          <meshBasicMaterial
            color={h.color}
            transparent
            opacity={0.045}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Blue Arm Glow (young star regions) ─────────────────── */
function ArmGlow() {
  const ref = useRef<THREE.Group>(null!);

  const glows = useMemo(() => {
    const result: { x: number; z: number; size: number }[] = [];
    const pitchAng = 20 * (Math.PI / 180);
    const bRate = 1 / Math.tan(pitchAng);
    for (let i = 0; i < 12; i++) {
      const armBase = (i % 2) * Math.PI;
      const r = 0.8 + Math.random() * 3.8;
      const theta = Math.log(r / 0.2) * bRate + armBase + (Math.random() - 0.5) * 0.15;
      result.push({
        x: Math.cos(theta) * r,
        z: Math.sin(theta) * r,
        size: 0.2 + Math.random() * 0.4,
      });
    }
    return result;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={ref}>
      {glows.map((g, i) => (
        <mesh key={i} position={[g.x, 0, g.z]}>
          <sphereGeometry args={[g.size, 10, 10]} />
          <meshBasicMaterial
            color="#2244aa"
            transparent
            opacity={0.025}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Background Stars ───────────────────────────────────── */
function BGStars({ count = 2000 }: { count?: number }) {
  const tex = useMemo(() => createStarTexture(), []);
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 35;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);
      // Faint white/blue/yellow
      const type = Math.random();
      if (type < 0.7) {
        const w = 0.4 + Math.random() * 0.5;
        col[i3] = w; col[i3 + 1] = w; col[i3 + 2] = w + 0.05;
      } else if (type < 0.85) {
        col[i3] = 0.5; col[i3 + 1] = 0.6; col[i3 + 2] = 0.9;
      } else {
        col[i3] = 0.9; col[i3 + 1] = 0.8; col[i3 + 2] = 0.5;
      }
    }
    return { positions: pos, colors: col };
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial map={tex} size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Scientist Stars (bright colored nodes in arms) ─────── */
function ScientistStar({ color, armIdx, rPos }: {
  color: string; armIdx: number; rPos: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);
  const pitchAng = 20 * (Math.PI / 180);
  const bRate = 1 / Math.tan(pitchAng);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const armBase = (armIdx % 2) * Math.PI;
    const theta = Math.log(rPos / 0.2) * bRate + armBase + t * 0.01;
    ref.current.position.set(Math.cos(theta) * rPos, 0, Math.sin(theta) * rPos);
    const s = 1 + Math.sin(t * 2 + armIdx * 2) * 0.25;
    pulseRef.current.scale.setScalar(s);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Scene ──────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <BGStars />
      <Galaxy />
      <BulgeGlow />
      <HIIRegions />
      <ArmGlow />

      {/* Scientists as bright star nodes positioned along spiral arms */}
      <ScientistStar color="#ff6622" armIdx={0} rPos={1.6} />  {/* Newton */}
      <ScientistStar color="#3388ff" armIdx={1} rPos={2.0} />  {/* Einstein */}
      <ScientistStar color="#22cc77" armIdx={0} rPos={2.8} />  {/* Ramanujan */}
      <ScientistStar color="#9955ff" armIdx={1} rPos={3.3} />  {/* Bose */}
      <ScientistStar color="#ffaa11" armIdx={0} rPos={4.0} />  {/* Noether */}
    </>
  );
}

export default function UniverseScene() {
  return (
    <SceneFrame cameraPosition={[0, 3, 6.5]} fov={50} hint="drag to rotate &bull; scroll to zoom">
      <Scene />
    </SceneFrame>
  );
}
