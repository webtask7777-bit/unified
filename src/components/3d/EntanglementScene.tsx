'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

function EntangledParticle({ side }: { side: 'left' | 'right' }) {
  const ref = useRef<THREE.Mesh>(null!);
  const arrowRef = useRef<THREE.Mesh>(null!);
  const sign = side === 'left' ? -1 : 1;
  const color = side === 'left' ? '#38bdf8' : '#f87060';

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Particle oscillates gently
    ref.current.position.y = Math.sin(t * 1.5 + sign) * 0.15;
    // Spin arrow flips periodically
    const flipAngle = Math.sin(t * 0.8) * Math.PI;
    arrowRef.current.rotation.z = side === 'left' ? flipAngle : flipAngle + Math.PI;
    // Pulse
    const s = 1 + Math.sin(t * 3) * 0.05;
    ref.current.scale.set(s, s, s);
  });

  return (
    <group position={[sign * 2.2, 0, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Spin arrow */}
      <mesh ref={arrowRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.08, 0.5, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.008, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function EntanglementBeam() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const opacity = 0.2 + Math.sin(t * 4) * 0.15;
    (ref.current.material as THREE.MeshStandardMaterial).opacity = opacity;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.02, 0.02, 4.4, 8]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#a78bfa"
        emissiveIntensity={0.8}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function ParticlePairs() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a78bfa" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

export default function EntanglementScene() {
  return (
    <SceneFrame>
      <ambientLight intensity={0.3} />
      <pointLight position={[-3, 3, 3]} intensity={0.8} color="#38bdf8" />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#f87060" />
      <EntangledParticle side="left" />
      <EntangledParticle side="right" />
      <EntanglementBeam />
      <ParticlePairs />
    </SceneFrame>
  );
}
