'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

// Central "Theory of Everything" core — where all forces merge
function UnificationCore() {
  const ref = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 0.8) * 0.1;
    ref.current.scale.set(s, s, s);
    ref.current.rotation.y = t * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    // Outer glow pulse
    const gs = 1 + Math.sin(t * 1.2) * 0.15;
    glowRef.current.scale.set(gs, gs, gs);
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.35, 2]} />
        <meshStandardMaterial
          color="#f5a623"
          emissive="#f59e0b"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={0.8}
          wireframe
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// Four fundamental forces orbiting — each a distinct color + shape
function ForceOrb({ color, emissive, radius, speed, size, shape }: {
  color: string; emissive: string; radius: number; speed: number; size: number;
  shape: 'sphere' | 'torus' | 'octahedron' | 'tetrahedron';
}) {
  const ref = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.3) * (radius * 0.3);
    meshRef.current.rotation.x = t * 2;
    meshRef.current.rotation.z = t * 1.5;
  });

  return (
    <group ref={ref}>
      <mesh ref={meshRef}>
        {shape === 'sphere' && <sphereGeometry args={[size, 16, 16]} />}
        {shape === 'torus' && <torusGeometry args={[size, size * 0.35, 8, 24]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[size]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[size]} />}
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1.2} roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  );
}

// Connection beams — energy flowing from forces to the core
function UnificationBeams() {
  const ref = useRef<THREE.Group>(null!);

  const forces = useMemo(() => [
    { radius: 1.5, speed: 0.8, color: '#3ecf8e' },  // Gravity
    { radius: 2.0, speed: 0.6, color: '#5b8ff9' },  // EM
    { radius: 2.5, speed: 0.5, color: '#f87060' },  // Strong
    { radius: 3.0, speed: 0.4, color: '#a78bfa' },  // Weak
  ], []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  // Particle streams from each force toward center
  const particles = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    const forceIdx = new Float32Array(count);
    const prog = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      forceIdx[i] = Math.floor(Math.random() * 4);
      prog[i] = Math.random();
      spd[i] = 0.3 + Math.random() * 0.5;
    }
    return { positions: pos, forceIdx, progress: prog, speeds: spd, count };
  }, []);

  const ptsRef = useRef<THREE.Points>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const posArr = ptsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particles.count; i++) {
      particles.progress[i] += particles.speeds[i] * 0.004;
      if (particles.progress[i] > 1) particles.progress[i] = 0;

      const fi = particles.forceIdx[i];
      const f = forces[fi];
      const angle = t * f.speed + fi * Math.PI / 2 + i * 0.1;
      const p = particles.progress[i];

      // From orbit position toward center
      const fromX = Math.cos(angle) * f.radius;
      const fromZ = Math.sin(angle) * f.radius;
      const fromY = Math.sin(angle * 1.3) * (f.radius * 0.3);

      posArr[i * 3] = fromX * (1 - p);
      posArr[i * 3 + 1] = fromY * (1 - p);
      posArr[i * 3 + 2] = fromZ * (1 - p);
    }
    ptsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={ref}>
      <points ref={ptsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#fbbf24" transparent opacity={0.6} sizeAttenuation />
      </points>
    </group>
  );
}

// Background equation particles
function EquationField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#4338ca" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#f59e0b" />
      <pointLight position={[3, 2, 2]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[-2, -1, 3]} intensity={0.4} color="#a78bfa" />

      <UnificationCore />

      {/* 4 Fundamental Forces */}
      <ForceOrb color="#3ecf8e" emissive="#059669" radius={1.5} speed={0.8} size={0.12} shape="sphere" />       {/* Gravity — green sphere */}
      <ForceOrb color="#5b8ff9" emissive="#2563eb" radius={2.0} speed={0.6} size={0.11} shape="octahedron" />    {/* EM — blue octahedron */}
      <ForceOrb color="#f87060" emissive="#dc2626" radius={2.5} speed={0.5} size={0.13} shape="tetrahedron" />   {/* Strong — red tetrahedron */}
      <ForceOrb color="#a78bfa" emissive="#7c3aed" radius={3.0} speed={0.4} size={0.10} shape="torus" />         {/* Weak — purple torus */}

      {/* Force orbit rings */}
      {[1.5, 2.0, 2.5, 3.0].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.005, 8, 128]} />
          <meshBasicMaterial color={['#3ecf8e', '#5b8ff9', '#f87060', '#a78bfa'][i]} transparent opacity={0.12} />
        </mesh>
      ))}

      <UnificationBeams />
      <EquationField />
    </>
  );
}

export default function UnifiedFieldScene() {
  return (
    <SceneFrame cameraPosition={[0, 2.5, 6]} fov={50} hint="drag to rotate &bull; 4 forces → 1 equation">
      <Scene />
    </SceneFrame>
  );
}
