'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

const SCIENTISTS = [
  { color: '#3ecf8e', angle: Math.PI / 2 },           // Newton (top)
  { color: '#f5a623', angle: Math.PI / 2 + 2 * Math.PI / 5 },  // Einstein
  { color: '#a78bfa', angle: Math.PI / 2 + 4 * Math.PI / 5 },  // Ramanujan
  { color: '#38bdf8', angle: Math.PI / 2 + 6 * Math.PI / 5 },  // Bose
  { color: '#f87060', angle: Math.PI / 2 + 8 * Math.PI / 5 },  // Noether
];

/* ── Scientist Node ─────────────────────────────────────── */
function ScientistNode({ color, angle, radius }: {
  color: string; angle: number; radius: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const a = angle + t * 0.08;
    ref.current.position.set(
      Math.cos(a) * radius,
      Math.sin(t * 0.5 + angle) * 0.15,
      Math.sin(a) * radius
    );
    const s = 1 + Math.sin(t * 2 + angle * 3) * 0.2;
    pulseRef.current.scale.setScalar(s);
  });

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.15, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Central Convergence Core ───────────────────────────── */
function ConvergenceCore() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    const s = 1 + Math.sin(t * 0.8) * 0.08;
    ref.current.scale.setScalar(s);
  });

  return (
    <group ref={ref}>
      {/* Wireframe dodecahedron */}
      <mesh>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshBasicMaterial color="#f5a623" wireframe transparent opacity={0.7} />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.2, 20, 20]} />
        <meshBasicMaterial color="#ffe8a0" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshBasicMaterial color="#f5a623" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Vision Streams (particles flowing from nodes to center) */
function VisionStreams() {
  const ref = useRef<THREE.Points>(null!);
  const count = 500;

  const { positions, colors, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const sci = SCIENTISTS[i % 5];
      const c = new THREE.Color(sci.color);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      off[i] = Math.random();
    }
    return { positions: pos, colors: col, offsets: off };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 2.2;
    for (let i = 0; i < count; i++) {
      const sci = SCIENTISTS[i % 5];
      const progress = (offsets[i] + t * 0.3) % 1;
      const a = sci.angle + t * 0.08;
      const sx = Math.cos(a) * radius;
      const sz = Math.sin(a) * radius;
      // Lerp from scientist position to center with spiral
      const spiral = progress * Math.PI * 2;
      const r = (1 - progress) * radius;
      positions[i * 3] = sx * (1 - progress) + Math.cos(spiral) * r * 0.1;
      positions[i * 3 + 1] = Math.sin(progress * Math.PI) * 0.3 + Math.sin(t + offsets[i] * 6) * 0.05;
      positions[i * 3 + 2] = sz * (1 - progress) + Math.sin(spiral) * r * 0.1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ── Timeline Rings ─────────────────────────────────────── */
function TimelineRings() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={ref}>
      {[1.2, 1.8, 2.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.15, i * 0.3, 0]}>
          <torusGeometry args={[r, 0.008, 8, 80]} />
          <meshBasicMaterial color="#f5a623" transparent opacity={0.12 - i * 0.03} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Background Stars ───────────────────────────────────── */
function BGStars({ count = 1500 }: { count?: number }) {
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 25;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions: pos };
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#aaaacc" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Scene ──────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <BGStars />
      <TimelineRings />
      <ConvergenceCore />
      <VisionStreams />
      {SCIENTISTS.map((s, i) => (
        <ScientistNode key={i} color={s.color} angle={s.angle} radius={2.2} />
      ))}
    </>
  );
}

export default function Vision2026Scene() {
  return (
    <SceneFrame cameraPosition={[0, 2.5, 5.5]} fov={50} hint="5 scientists &bull; 1 vision &bull; 2026">
      <Scene />
    </SceneFrame>
  );
}
