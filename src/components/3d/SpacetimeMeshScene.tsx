'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

function CurvatureGrid() {
  const ref = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => new THREE.PlaneGeometry(10, 10, 80, 80), []);

  useFrame(({ clock }) => {
    const pos = ref.current.geometry.attributes.position;
    const t = clock.getElapsedTime();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);

      // Deep gravitational well
      const warp = -2.2 / (1 + dist * dist * 0.5);
      // Gravitational wave ripples
      const ripple = Math.sin(dist * 2.5 - t * 1.8) * 0.08 / (1 + dist * 0.3);
      // Second mass orbiting
      const ox = Math.cos(t * 0.6) * 2.5;
      const oy = Math.sin(t * 0.6) * 2.5;
      const dist2 = Math.sqrt((x - ox) * (x - ox) + (y - oy) * (y - oy));
      const warp2 = -0.6 / (1 + dist2 * dist2 * 1.5);

      pos.setZ(i, warp + warp2 + ripple);
    }
    pos.needsUpdate = true;
    ref.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -0.3, 0]} geometry={geometry}>
      <meshStandardMaterial
        color="#f5a623"
        wireframe
        transparent
        opacity={0.45}
        emissive="#f5a623"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function CentralMass() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.08;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref} position={[0, 0.3, 0.5]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color="#f5a623"
        emissive="#f5a623"
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function OrbitingMass() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.6;
    ref.current.position.x = Math.cos(t) * 2.5;
    ref.current.position.z = Math.sin(t) * 2.5 * 0.7;
    ref.current.position.y = 0.1;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 24, 24]} />
      <meshStandardMaterial
        color="#5b8ff9"
        emissive="#5b8ff9"
        emissiveIntensity={0.6}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function GeodesicRing() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={ref} position={[0, 0.3, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.2, 0.008, 8, 64]} />
      <meshStandardMaterial
        color="#3ecf8e"
        emissive="#3ecf8e"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

export default function SpacetimeMeshScene() {
  return (
    <SceneFrame>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1.2} color="#f5a623" />
      <pointLight position={[-3, 2, -3]} intensity={0.4} color="#5b8ff9" />
      <CurvatureGrid />
      <CentralMass />
      <OrbitingMass />
      <GeodesicRing />
    </SceneFrame>
  );
}
