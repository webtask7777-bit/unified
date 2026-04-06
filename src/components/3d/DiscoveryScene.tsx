'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

/* ── Discovery data ── */
const DISCOVERIES = [
  { label: 'GW Pipeline', color: '#f5a623', angle: 0 },           // Newton+Einstein
  { label: 'N-body Math', color: '#a78bfa', angle: Math.PI * 2 / 10 },   // Newton+Ramanujan
  { label: 'BEC-GW', color: '#38bdf8', angle: Math.PI * 4 / 10 },        // Newton+Bose
  { label: 'Dark Parity', color: '#f87060', angle: Math.PI * 6 / 10 },    // Newton+Noether
  { label: 'BH Remnant', color: '#c084fc', angle: Math.PI * 8 / 10 },     // Einstein+Ramanujan
  { label: 'Gravity Test', color: '#34d399', angle: Math.PI * 10 / 10 },  // Einstein+Bose
  { label: 'Symmetry Break', color: '#fb923c', angle: Math.PI * 12 / 10 },// Einstein+Noether
  { label: 'QEC Codes', color: '#22d3ee', angle: Math.PI * 14 / 10 },     // Ramanujan+Bose
  { label: 'SM Unique', color: '#e879f9', angle: Math.PI * 16 / 10 },     // Ramanujan+Noether
  { label: 'Q-Internet', color: '#4ade80', angle: Math.PI * 18 / 10 },    // Bose+Noether
];

/* ── Central Knowledge Core ── */
function KnowledgeCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    const s = 1 + Math.sin(t * 0.6) * 0.05;
    innerRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color="#f5a623" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Inner glow */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#ffe8a0" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color="#f5a623" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Gravitational Wave Rings ── */
function GravWaveRings() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const s = 1 + Math.sin(t * 2 + i * 1.5) * 0.12;
      mesh.scale.set(s, 1, s);
    });
  });

  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      {[1.2, 1.7, 2.3].map((r, i) => (
        <mesh key={i}>
          <torusGeometry args={[r, 0.01, 8, 64]} />
          <meshBasicMaterial color="#f5a623" transparent opacity={0.15 - i * 0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Discovery Node ── */
function DiscoveryNode({ color, angle, radius, index }: {
  color: string; angle: number; radius: number; index: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const a = angle + t * 0.06;
    const y = Math.sin(t * 0.4 + index * 0.7) * 0.3;
    ref.current.position.set(
      Math.cos(a) * radius,
      y,
      Math.sin(a) * radius
    );
    const s = 1 + Math.sin(t * 1.5 + index * 2) * 0.25;
    glowRef.current.scale.setScalar(s);
  });

  // Different shapes for different discovery types
  const shapeType = index % 5;

  return (
    <group ref={ref}>
      {/* Core shape */}
      {shapeType === 0 && (
        <mesh>
          <octahedronGeometry args={[0.12, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      )}
      {shapeType === 1 && (
        <mesh>
          <tetrahedronGeometry args={[0.13, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      )}
      {shapeType === 2 && (
        <mesh>
          <icosahedronGeometry args={[0.11, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      )}
      {shapeType === 3 && (
        <mesh>
          <dodecahedronGeometry args={[0.11, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      )}
      {shapeType === 4 && (
        <mesh>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      )}
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Outer aura */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Dark Parity Pairs (Z₂ symmetry visualization) ── */
function DarkParityPairs() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.3;
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* 3 dark matter pairs orbiting */}
      {[0, 1, 2].map((i) => {
        const a = (Math.PI * 2 / 3) * i;
        const r = 0.85;
        return (
          <group key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r]}>
            {/* Pair of particles */}
            <mesh position={[0.06, 0, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#f87060" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh position={[-0.06, 0, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#f87060" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {/* Connection line */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.003, 0.003, 0.12, 4]} />
              <meshBasicMaterial color="#f87060" transparent opacity={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ── Knowledge Streams (particles flowing to core) ── */
function KnowledgeStreams() {
  const ref = useRef<THREE.Points>(null!);
  const count = 800;

  const { positions, colors, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const disc = DISCOVERIES[i % 10];
      const c = new THREE.Color(disc.color);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      off[i] = Math.random();
    }
    return { positions: pos, colors: col, offsets: off };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 3;
    for (let i = 0; i < count; i++) {
      const disc = DISCOVERIES[i % 10];
      const progress = (offsets[i] + t * 0.2) % 1;
      const a = disc.angle + t * 0.06;
      const sx = Math.cos(a) * radius;
      const sz = Math.sin(a) * radius;
      const spiral = progress * Math.PI * 3;
      positions[i * 3] = sx * (1 - progress) + Math.cos(spiral) * (1 - progress) * 0.15;
      positions[i * 3 + 1] = Math.sin(progress * Math.PI) * 0.4 + Math.sin(t * 0.5 + offsets[i] * 5) * 0.05;
      positions[i * 3 + 2] = sz * (1 - progress) + Math.sin(spiral) * (1 - progress) * 0.15;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ── Black Hole Remnant ── */
function BlackHoleRemnant() {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.set(1.8, Math.sin(t * 0.3) * 0.2 + 0.8, -1);
    ref.current.rotation.y = t * 0.5;
  });

  return (
    <group ref={ref}>
      {/* Accretion ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.2, 0.015, 8, 32]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Remnant core */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      {/* Hawking glow */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Quantum Network Chain ── */
function QuantumNetwork() {
  const ref = useRef<THREE.Group>(null!);
  const nodes = 5;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.set(-1.5, -0.8 + Math.sin(t * 0.25) * 0.15, 1.2);
    ref.current.rotation.y = t * 0.08;
  });

  return (
    <group ref={ref}>
      {Array.from({ length: nodes }, (_, i) => {
        const x = (i - (nodes - 1) / 2) * 0.3;
        return (
          <group key={i}>
            <mesh position={[x, 0, 0]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshBasicMaterial color="#4ade80" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            {i < nodes - 1 && (
              <mesh position={[x + 0.15, 0, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.3, 4]} />
                <meshBasicMaterial color="#4ade80" transparent opacity={0.2} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* ── Background Stars ── */
function BGStars({ count = 2000 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 18 + Math.random() * 30;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#aaaacc" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Main Scene ── */
function Scene() {
  return (
    <>
      <BGStars />
      <GravWaveRings />
      <KnowledgeCore />
      <DarkParityPairs />
      <BlackHoleRemnant />
      <QuantumNetwork />
      <KnowledgeStreams />
      {DISCOVERIES.map((d, i) => (
        <DiscoveryNode key={i} color={d.color} angle={d.angle} radius={3} index={i} />
      ))}
    </>
  );
}

export default function DiscoveryScene() {
  return (
    <SceneFrame cameraPosition={[0, 3, 6]} fov={50} hint="10 discoveries &bull; Dark Parity &bull; BH Remnants &bull; Quantum Internet">
      <Scene />
    </SceneFrame>
  );
}
