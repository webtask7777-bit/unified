'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

function WarpedGrid() {
  const ref = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 60, 60);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const pos = ref.current.geometry.attributes.position;
    const time = clock.getElapsedTime();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);

      // Gravitational well — deeper at center
      const warp = -1.5 / (1 + dist * dist * 0.8);
      // Ripples — gravitational waves
      const ripple = Math.sin(dist * 3 - time * 2) * 0.05 / (1 + dist * 0.5);

      pos.setZ(i, warp + ripple);
    }
    pos.needsUpdate = true;
    ref.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 3, 0, 0]} position={[0, -0.5, 0]} geometry={geometry}>
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.5}
        emissive="#4f46e5"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function MassObject() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref} position={[0, 0.8, -0.3]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color="#f59e0b"
        emissive="#d97706"
        emissiveIntensity={1.5}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

function TimeDilationRings() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + i * 0.5) * 0.15;
      mesh.scale.set(scale, scale, 1);
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.8, -0.3]}>
      {[0.6, 0.9, 1.2].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.01, 8, 64]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 3, 2]} intensity={1} color="#f59e0b" />
      <pointLight position={[-3, 1, -2]} intensity={0.5} color="#6366f1" />

      <WarpedGrid />
      <MassObject />
      <TimeDilationRings />
    </>
  );
}

export default function SpacetimeGrid() {
  return (
    <SceneFrame cameraPosition={[0, 3, 5]} fov={45}>
      <Scene />
    </SceneFrame>
  );
}
