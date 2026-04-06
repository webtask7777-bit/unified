'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

// The Sun
function Sun() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    ref.current.scale.set(s, s, s);
  });

  return (
    <Float speed={0.5} floatIntensity={0.1}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={2}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

// Planet with orbit
function Planet({ radius, speed, size, color, emissive, tilt = 0 }: {
  radius: number; speed: number; size: number; color: string; emissive: string; tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t) * tilt;
    ref.current.rotation.y = t * 2;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} roughness={0.4} />
    </mesh>
  );
}

// Orbit ring path
function OrbitRing({ radius, tilt = 0 }: { radius: number; tilt?: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 128]} />
      <meshBasicMaterial color="#334155" transparent opacity={0.25} />
    </mesh>
  );
}

// Asteroid belt
function AsteroidBelt() {
  const ref = useRef<THREE.Points>(null!);
  const count = 250;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2.8 + (Math.random() - 0.5) * 0.6;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#94a3b8" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// Trajectory prediction trail (dotted arc showing predicted path)
function TrajectoryTrail() {
  const ref = useRef<THREE.Points>(null!);
  const count = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 1.2 + 0.5;
      const r = 3.8 + i * 0.015;
      pos[i * 3] = Math.cos(t) * r;
      pos[i * 3 + 1] = Math.sin(t * 0.3) * 0.2;
      pos[i * 3 + 2] = Math.sin(t) * r;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#3ecf8e" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Incoming asteroid with trail
function Asteroid() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.4 + 0.5;
    const r = 3.8 + t * 0.015;
    ref.current.position.x = Math.cos(t) * r;
    ref.current.position.z = Math.sin(t) * r;
    ref.current.position.y = Math.sin(t * 0.3) * 0.2;
    ref.current.rotation.x = t * 3;
    ref.current.rotation.z = t * 2;
  });

  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[0.08, 0]} />
      <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={1.5} roughness={0.6} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#fbbf24" />
      <pointLight position={[5, 3, 2]} intensity={0.3} color="#60a5fa" />

      <Sun />

      {/* Planets — Mercury to Neptune (simplified) */}
      <Planet radius={0.8} speed={3.0} size={0.05} color="#a1a1aa" emissive="#71717a" />
      <Planet radius={1.2} speed={2.2} size={0.08} color="#fbbf24" emissive="#d97706" />
      <Planet radius={1.7} speed={1.6} size={0.09} color="#3b82f6" emissive="#2563eb" />
      <Planet radius={2.2} speed={1.2} size={0.07} color="#ef4444" emissive="#dc2626" />
      <Planet radius={3.4} speed={0.6} size={0.2} color="#f59e0b" emissive="#d97706" />
      <Planet radius={4.2} speed={0.4} size={0.16} color="#eab308" emissive="#ca8a04" tilt={0.05} />

      {/* Orbit rings */}
      {[0.8, 1.2, 1.7, 2.2, 3.4, 4.2].map((r, i) => (
        <OrbitRing key={i} radius={r} />
      ))}

      <AsteroidBelt />
      <TrajectoryTrail />
      <Asteroid />
    </>
  );
}

export default function OrbitalScene() {
  return (
    <SceneFrame cameraPosition={[0, 4, 6]} fov={50} hint="drag to rotate &bull; scroll to zoom &bull; green dots = predicted trajectory">
      <Scene />
    </SceneFrame>
  );
}
