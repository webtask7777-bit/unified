'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

const NODES = [
  { color: '#3ecf8e', angle: 0 },
  { color: '#f5a623', angle: Math.PI * 2 / 5 },
  { color: '#a78bfa', angle: Math.PI * 4 / 5 },
  { color: '#38bdf8', angle: Math.PI * 6 / 5 },
  { color: '#f87060', angle: Math.PI * 8 / 5 },
];

function DomainNode({ color, angle }: { color: string; angle: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const R = 2.2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const a = angle + t * 0.12;
    ref.current.position.x = Math.cos(a) * R;
    ref.current.position.z = Math.sin(a) * R;
    ref.current.position.y = Math.sin(t * 1.5 + angle * 3) * 0.15;
    const s = 1 + Math.sin(t * 2.5 + angle) * 0.12;
    ref.current.scale.set(s, s, s);
    ringRef.current.position.copy(ref.current.position);
    ringRef.current.rotation.x = Math.PI / 2;
    ringRef.current.rotation.z = t * 0.5 + angle;
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} transparent opacity={0.95} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.3, 0.008, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.3} />
      </mesh>
    </>
  );
}

function DiscoveryCore() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = 0.28 + Math.sin(t * 2) * 0.06;
    coreRef.current.scale.set(s, s, s);
    const g = 0.55 + Math.sin(t * 1.2) * 0.12;
    glowRef.current.scale.set(g, g, g);
    coreRef.current.rotation.y = t * 0.3;
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#ffffff" emissive="#f5a623" emissiveIntensity={1.5} transparent opacity={0.95} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#f5a623" emissive="#f5a623" emissiveIntensity={0.2} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function FlowParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 200;

  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      ph[i] = Math.random();
      const nodeIdx = i % 5;
      const angle = NODES[nodeIdx].angle;
      const r = 2.2 * (1 - ph[i]);
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return { positions: pos, phases: ph };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const posAttr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const nodeIdx = i % 5;
      const angle = NODES[nodeIdx].angle + t * 0.12;
      const phase = (phases[i] + t * 0.3) % 1;
      const r = 2.2 * (1 - phase);
      posAttr.setX(i, Math.cos(angle) * r);
      posAttr.setY(i, Math.sin(t * 2 + i * 0.5) * 0.08 * (1 - phase));
      posAttr.setZ(i, Math.sin(angle) * r);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#f5a623" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

function ConnectionRings() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.005, 8, 64]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.3} transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[1.5, 0.005, 8, 48]} />
        <meshStandardMaterial color="#f5a623" emissive="#f5a623" emissiveIntensity={0.3} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function DiscoveryEngineScene() {
  return (
    <SceneFrame>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 4, 3]} intensity={1.2} color="#f5a623" />
      <pointLight position={[-3, -1, -2]} intensity={0.4} color="#a78bfa" />
      <pointLight position={[3, -1, 2]} intensity={0.4} color="#3ecf8e" />
      {NODES.map((n, i) => (
        <DomainNode key={i} color={n.color} angle={n.angle} />
      ))}
      <DiscoveryCore />
      <FlowParticles />
      <ConnectionRings />
    </SceneFrame>
  );
}
