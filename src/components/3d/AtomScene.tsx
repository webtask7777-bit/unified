'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

function Nucleus() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
  });

  const nucleons = useMemo(() => {
    const items: { pos: [number, number, number]; color: string; emissive: string }[] = [];
    // Protons (red) and neutrons (blue) in a cluster
    const offsets: [number, number, number][] = [
      [0, 0, 0], [0.15, 0.12, 0], [-0.1, 0.15, 0.1], [0.05, -0.12, 0.12],
      [-0.12, -0.05, -0.1], [0.1, 0.05, -0.15], [-0.05, -0.15, 0.05],
    ];
    offsets.forEach((pos, i) => {
      items.push({
        pos,
        color: i % 2 === 0 ? '#ef4444' : '#3b82f6',
        emissive: i % 2 === 0 ? '#dc2626' : '#2563eb',
      });
    });
    return items;
  }, []);

  return (
    <group ref={ref}>
      {nucleons.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={n.color} emissive={n.emissive} emissiveIntensity={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function ElectronOrbit({ radius, speed, tilt, color }: {
  radius: number; speed: number; tilt: [number, number, number]; color: string;
}) {
  const electronRef = useRef<THREE.Mesh>(null!);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  const orbitPoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    electronRef.current.position.x = Math.cos(t) * radius;
    electronRef.current.position.z = Math.sin(t) * radius;
  });

  return (
    <group rotation={tilt}>
      <Line points={orbitPoints} color={color} lineWidth={1} transparent opacity={0.2} />
      <mesh ref={electronRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function EnergyField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.5 + Math.random() * 1;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#fbbf24" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#fbbf24" />
      <pointLight position={[3, 2, 1]} intensity={0.4} color="#60a5fa" />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <Nucleus />
      </Float>

      <ElectronOrbit radius={0.7} speed={3} tilt={[0, 0, 0]} color="#22d3ee" />
      <ElectronOrbit radius={1.0} speed={2.2} tilt={[1.2, 0.5, 0]} color="#a78bfa" />
      <ElectronOrbit radius={1.4} speed={1.5} tilt={[0.4, 1.0, 0.8]} color="#34d399" />

      <EnergyField />
    </>
  );
}

export default function AtomScene() {
  return (
    <SceneFrame cameraPosition={[0, 1, 3]} fov={45}>
      <Scene />
    </SceneFrame>
  );
}
