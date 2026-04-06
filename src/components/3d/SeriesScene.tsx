'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

function NumberSpiral() {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    let partialSum = 0;
    for (let i = 0; i < count; i++) {
      const angle = i * goldenAngle;
      const radius = Math.sqrt(i) * 0.18;
      partialSum += 1 / ((i + 1) * (i + 1)); // Basel series

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (partialSum - 0.8) * 2; // height = partial sum
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Color: purple → teal as converges
      const t = i / count;
      col[i * 3] = 0.65 * (1 - t) + 0.24 * t;
      col[i * 3 + 1] = 0.55 * (1 - t) + 0.81 * t;
      col[i * 3 + 2] = 0.98 * (1 - t) + 0.55 * t;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <points ref={ref} position={[0, -0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function ConvergencePoint() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref} position={[0, 2.5, 0]}>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#a78bfa"
        emissiveIntensity={1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function InfinitySymbol() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={ref} position={[0, 3.2, 0]}>
      <torusGeometry args={[0.25, 0.02, 8, 32]} />
      <meshStandardMaterial
        color="#f5a623"
        emissive="#f5a623"
        emissiveIntensity={0.5}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export default function SeriesScene() {
  return (
    <SceneFrame>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 5, 3]} intensity={1} color="#a78bfa" />
      <pointLight position={[3, -1, 2]} intensity={0.4} color="#3ecf8e" />
      <NumberSpiral />
      <ConvergencePoint />
      <InfinitySymbol />
    </SceneFrame>
  );
}
