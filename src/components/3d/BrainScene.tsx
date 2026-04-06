'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

/* ── helpers ── */
function hexFromVar(cssVar: string) {
  const map: Record<string, string> = {
    'var(--green)': '#3ecf8e', 'var(--amber)': '#f5a623', 'var(--purple)': '#a78bfa',
    'var(--coral)': '#f87060', 'var(--teal)': '#38bdf8', 'var(--blue)': '#5b8ff9',
  };
  return map[cssVar] || '#a78bfa';
}

/* ── NeuronField: hundreds of small glowing particles in brain shape ── */
function NeuronField({ color, count = 400 }: { color: string; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const hex = hexFromVar(color);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.4 + Math.random() * 0.6;
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta) * 1.4;
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 1.0;
      arr[i * 3 + 2] = r * Math.cos(phi) * 1.2;
    }
    return arr;
  }, [count]);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = 0.02 + Math.random() * 0.03;
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const m = ref.current.material as THREE.PointsMaterial;
    m.opacity = 0.25 + Math.sin(clock.getElapsedTime() * 1.5) * 0.12;
    ref.current.rotation.y += 0.001;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={hex} transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── ConceptNodes: large glowing spheres at brain-region positions ── */
function ConceptNodes({ nodeCount, color }: { nodeCount: number; color: string }) {
  const hex = hexFromVar(color);
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = 0.9 + (i % 3) * 0.35;
      const y = (Math.sin(angle * 2) * 0.4) + ((i % 2) - 0.5) * 0.3;
      pts.push([r * Math.cos(angle) * 1.2, y, r * Math.sin(angle) * 1.0]);
    }
    return pts;
  }, [nodeCount]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;
    groupRef.current.children.forEach((child, i) => {
      const s = 1 + Math.sin(clock.getElapsedTime() * 2 + i) * 0.15;
      child.scale.setScalar(s);
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07 + (i % 3) * 0.02, 16, 16]} />
          <meshStandardMaterial
            color={hex}
            emissive={hex}
            emissiveIntensity={1.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── SynapseLines: connections between nodes ── */
function SynapseLines({ nodeCount, connectionCount, color }: {
  nodeCount: number; connectionCount: number; color: string;
}) {
  const hex = hexFromVar(color);
  const groupRef = useRef<THREE.Group>(null);

  const { positions: nodePositions, lines } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = 0.9 + (i % 3) * 0.35;
      const y = (Math.sin(angle * 2) * 0.4) + ((i % 2) - 0.5) * 0.3;
      pts.push(new THREE.Vector3(r * Math.cos(angle) * 1.2, y, r * Math.sin(angle) * 1.0));
    }
    const lns: Float32Array[] = [];
    const used = new Set<string>();
    for (let c = 0; c < Math.min(connectionCount, nodeCount * 2); c++) {
      const a = c % nodeCount;
      const b = (a + 1 + (c % 3)) % nodeCount;
      const key = `${Math.min(a,b)}-${Math.max(a,b)}`;
      if (used.has(key)) continue;
      used.add(key);
      lns.push(new Float32Array([
        pts[a].x, pts[a].y, pts[a].z,
        pts[b].x, pts[b].y, pts[b].z,
      ]));
    }
    return { positions: pts, lines: lns };
  }, [nodeCount, connectionCount]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={groupRef}>
      {lines.map((linePos, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={hex} transparent opacity={0.18} />
        </line>
      ))}
    </group>
  );
}

/* ── SynapseParticles: flowing particles along connections ── */
function SynapseParticles({ color, count = 60 }: { color: string; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const hex = hexFromVar(color);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.8 + Math.random() * 1.0;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta) * 1.3;
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.9;
      pos[i * 3 + 2] = r * Math.cos(phi) * 1.1;
      vel[i * 3]     = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      const dist = Math.sqrt(arr[i*3]**2 + arr[i*3+1]**2 + arr[i*3+2]**2);
      if (dist > 2.2 || dist < 0.5) {
        velocities[i * 3]     *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    posAttr.needsUpdate = true;
    const m = ref.current.material as THREE.PointsMaterial;
    m.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={hex} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── CoreGlow: central brain glow ── */
function CoreGlow({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const hex = hexFromVar(color);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = 0.9 + Math.sin(clock.getElapsedTime() * 1.2) * 0.1;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={hex} emissive={hex} emissiveIntensity={0.3} transparent opacity={0.06} />
    </mesh>
  );
}

/* ── Main Export ── */
export default function BrainScene({ color, nodeCount, connectionCount }: {
  color: string;
  nodeCount: number;
  connectionCount: number;
}) {
  return (
    <SceneFrame cameraPosition={[0, 0.5, 4]} fov={50} hint="drag to rotate • scroll to zoom">
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-3, -2, -3]} intensity={0.4} color={hexFromVar(color)} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group>
          <NeuronField color={color} count={500} />
          <ConceptNodes nodeCount={nodeCount} color={color} />
          <SynapseLines nodeCount={nodeCount} connectionCount={connectionCount} color={color} />
          <SynapseParticles color={color} count={80} />
          <CoreGlow color={color} />
        </group>
      </Float>
    </SceneFrame>
  );
}
