'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

// Gravitational potential surface — shows wells where dark matter concentrates
function GravityField() {
  const ref = useRef<THREE.Mesh>(null!);

  // Dark matter hotspots (x, z, strength)
  const hotspots = useMemo(() => [
    { x: 0, z: 0, s: 2.0 },
    { x: 2.5, z: 1.8, s: 1.2 },
    { x: -2.0, z: 2.2, s: 1.0 },
    { x: -1.5, z: -2.0, s: 1.4 },
    { x: 2.0, z: -1.5, s: 0.8 },
    { x: 3.5, z: -0.5, s: 0.6 },
    { x: -3.0, z: 0.5, s: 0.7 },
  ], []);

  const geometry = useMemo(() => new THREE.PlaneGeometry(10, 10, 80, 80), []);

  useFrame(({ clock }) => {
    const pos = ref.current.geometry.attributes.position;
    const time = clock.getElapsedTime();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Sum gravitational wells from each hotspot
      let depth = 0;
      for (const h of hotspots) {
        const dx = x - h.x;
        const dz = y - h.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        depth -= h.s / (1 + dist * dist * 0.6);
      }

      // Subtle ripple animation — gravitational waves
      const r = Math.sqrt(x * x + y * y);
      const ripple = Math.sin(r * 2 - time * 1.5) * 0.02 / (1 + r * 0.3);

      pos.setZ(i, depth + ripple);
    }
    pos.needsUpdate = true;
    ref.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]} geometry={geometry}>
      <meshStandardMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.4}
        emissive="#6d28d9"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// Visible galaxy clusters — small bright points at hotspot centers
function GalaxyClusters() {
  const groupRef = useRef<THREE.Group>(null!);

  const clusters = useMemo(() => [
    { pos: [0, 0.3, 0] as [number, number, number], size: 0.18, color: '#fbbf24' },
    { pos: [2.5, 0.1, 1.8] as [number, number, number], size: 0.12, color: '#60a5fa' },
    { pos: [-2.0, 0.15, 2.2] as [number, number, number], size: 0.1, color: '#f472b6' },
    { pos: [-1.5, 0.2, -2.0] as [number, number, number], size: 0.14, color: '#34d399' },
    { pos: [2.0, 0.05, -1.5] as [number, number, number], size: 0.09, color: '#fb923c' },
  ], []);

  useFrame(({ clock }) => {
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const s = 1 + Math.sin(clock.getElapsedTime() * 1.5 + i * 1.2) * 0.2;
      mesh.scale.set(s, s, s);
    });
  });

  return (
    <group ref={groupRef}>
      {clusters.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <sphereGeometry args={[c.size, 16, 16]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={1.5}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Dark matter halos — translucent purple spheres around hotspots
function DarkMatterHalos() {
  const groupRef = useRef<THREE.Group>(null!);

  const halos = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], r: 1.2 },
    { pos: [2.5, 0, 1.8] as [number, number, number], r: 0.8 },
    { pos: [-2.0, 0, 2.2] as [number, number, number], r: 0.7 },
    { pos: [-1.5, 0, -2.0] as [number, number, number], r: 0.9 },
    { pos: [2.0, 0, -1.5] as [number, number, number], r: 0.6 },
  ], []);

  useFrame(({ clock }) => {
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const s = 1 + Math.sin(clock.getElapsedTime() * 0.8 + i * 0.9) * 0.08;
      mesh.scale.set(s, s, s);
      mesh.rotation.y = clock.getElapsedTime() * 0.15 + i;
    });
  });

  return (
    <group ref={groupRef}>
      {halos.map((h, i) => (
        <mesh key={i} position={h.pos}>
          <sphereGeometry args={[h.r, 24, 24]} />
          <meshStandardMaterial
            color="#a78bfa"
            transparent
            opacity={0.08}
            emissive="#7c3aed"
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scattered particles representing dark matter distribution
function DarkMatterParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 400;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    // Concentrate particles near hotspots
    const hotspots = [
      [0, 0], [2.5, 1.8], [-2, 2.2], [-1.5, -2], [2, -1.5], [3.5, -0.5], [-3, 0.5],
    ];
    for (let i = 0; i < count; i++) {
      const h = hotspots[Math.floor(Math.random() * hotspots.length)];
      const spread = 0.5 + Math.random() * 2;
      pos[i * 3] = h[0] + (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 2] = h[1] + (Math.random() - 0.5) * spread;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#c4b5fd"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Gravitational lensing arcs — curved lines showing light bending
function LensingArcs() {
  const groupRef = useRef<THREE.Group>(null!);

  const arcs = useMemo(() => {
    const result: { points: Float32Array; color: string }[] = [];
    // Create curved arcs around the central cluster
    const arcData = [
      { cx: 0, cz: 0, r: 1.6, start: 0.2, end: 1.2, color: '#38bdf8' },
      { cx: 0, cz: 0, r: 1.8, start: 2.5, end: 3.8, color: '#22d3ee' },
      { cx: 0, cz: 0, r: 1.4, start: 4.2, end: 5.5, color: '#67e8f9' },
      { cx: 2.5, cz: 1.8, r: 1.0, start: 0.5, end: 2.0, color: '#38bdf8' },
      { cx: -1.5, cz: -2.0, r: 1.1, start: 3.0, end: 4.5, color: '#22d3ee' },
    ];
    for (const a of arcData) {
      const segs = 32;
      const pts = new Float32Array(segs * 3);
      for (let i = 0; i < segs; i++) {
        const t = a.start + (a.end - a.start) * (i / (segs - 1));
        pts[i * 3] = a.cx + Math.cos(t) * a.r;
        pts[i * 3 + 1] = 0.3;
        pts[i * 3 + 2] = a.cz + Math.sin(t) * a.r;
      }
      result.push({ points: pts, color: a.color });
    }
    return result;
  }, []);

  const lineObjs = useMemo(() => arcs.map(arc => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(arc.points, 3));
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: arc.color, transparent: true, opacity: 0.4 }));
  }), [arcs]);

  useFrame(({ clock }) => {
    groupRef.current.children.forEach((child) => {
      const line = child as THREE.Line;
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {lineObjs.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 4, 0]} intensity={1.5} color="#a78bfa" />
      <pointLight position={[4, 2, 3]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[-3, 2, -2]} intensity={0.4} color="#fbbf24" />

      <GravityField />
      <DarkMatterHalos />
      <GalaxyClusters />
      <DarkMatterParticles />
      <LensingArcs />
    </>
  );
}

export default function GravityMapScene() {
  return (
    <SceneFrame cameraPosition={[0, 5, 7]} fov={50} hint="drag to rotate &bull; scroll to zoom &bull; purple = dark matter">
      <Scene />
    </SceneFrame>
  );
}
