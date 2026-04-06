'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

function MexicanHat() {
  const ref = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 80, 80);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r2 = x * x + y * y;
      // Mexican hat: V = -μ²r² + λr⁴
      const z = -1.2 * r2 * 0.15 + r2 * r2 * 0.008 + 0.5;
      pos.setZ(i, Math.max(z, -1.5));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.08;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 3, 0, 0]} position={[0, -0.5, 0]} geometry={geometry}>
      <meshStandardMaterial
        color="#f87060"
        wireframe
        transparent
        opacity={0.45}
        emissive="#f87060"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function SymmetryBall() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Ball rolls from symmetric top to broken minimum
    const angle = t * 0.4;
    const rOscillate = 1.8 + Math.sin(t * 0.3) * 1.5;
    const r = Math.max(0.1, rOscillate);
    ref.current.position.x = Math.cos(angle) * r * 0.3;
    ref.current.position.z = Math.sin(angle) * r * 0.3;
    // Height follows potential
    const r2 = ref.current.position.x ** 2 + ref.current.position.z ** 2;
    ref.current.position.y = -1.2 * r2 * 0.15 + r2 * r2 * 0.008 + 0.7;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 24, 24]} />
      <meshStandardMaterial
        color="#3ecf8e"
        emissive="#3ecf8e"
        emissiveIntensity={0.8}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function SymmetryRing() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    ref.current.rotation.x = -Math.PI / 3;
    ref.current.rotation.z = clock.getElapsedTime() * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, -0.2, 0]}>
      <torusGeometry args={[2.2, 0.01, 8, 64]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#a78bfa"
        emissiveIntensity={0.4}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export default function SymmetryScene() {
  return (
    <SceneFrame>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 3]} intensity={1} color="#f87060" />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#a78bfa" />
      <MexicanHat />
      <SymmetryBall />
      <SymmetryRing />
    </SceneFrame>
  );
}
