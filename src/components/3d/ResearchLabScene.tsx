'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

// Research topic nodes — each represents an article group
const NODES: { pos: [number, number, number]; color: string; label: string }[] = [
  { pos: [0, 0, 0], color: '#a78bfa', label: 'Unified' },       // center
  { pos: [-2.2, 1.2, 0.5], color: '#8b5cf6', label: 'DarkMatter' },
  { pos: [2.0, 1.0, -0.5], color: '#3ecf8e', label: 'Motion' },
  { pos: [-1.5, -1.0, 1.5], color: '#f5a623', label: 'Time' },
  { pos: [1.8, -0.8, 1.2], color: '#f87060', label: 'Wormhole' },
  { pos: [0.2, 1.8, -1.5], color: '#38bdf8', label: 'Energy' },
  { pos: [-2.0, -0.5, -1.5], color: '#f87060', label: 'BlackHole' },
  { pos: [2.5, 0.2, 1.0], color: '#38bdf8', label: 'Ramanujan' },
  { pos: [-0.8, -1.8, -0.8], color: '#3ecf8e', label: 'Noether' },
  { pos: [0.5, 0.5, 2.2], color: '#a78bfa', label: 'Bose' },
];

// Connections between nodes (index pairs)
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
  [1, 6], [2, 4], [3, 5], [5, 7], [6, 3], [8, 9], [7, 9], [1, 8], [2, 7],
];

function KnowledgeNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      // Gentle pulse
      const s = 1 + Math.sin(t * 1.2 + i * 0.7) * 0.15;
      const baseSize = i === 0 ? 1.3 : 1;
      mesh.scale.set(s * baseSize, s * baseSize, s * baseSize);
    });
  });

  return (
    <group ref={groupRef}>
      {NODES.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[i === 0 ? 0.22 : 0.14, 20, 20]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={i === 0 ? 1.5 : 1.0}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Glowing connections between knowledge nodes
function ConnectionLines() {
  const groupRef = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    return EDGES.map(([a, b]) => {
      const from = NODES[a].pos;
      const to = NODES[b].pos;
      const pts = new Float32Array(6);
      pts[0] = from[0]; pts[1] = from[1]; pts[2] = from[2];
      pts[3] = to[0]; pts[4] = to[1]; pts[5] = to[2];
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      return geo;
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line;
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = 0.15 + Math.sin(t * 1.5 + i * 0.4) * 0.1;
    });
  });

  const lineObjs = useMemo(() => lines.map(geo => new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#6366f1', transparent: true, opacity: 0.2 }))), [lines]);

  return (
    <group ref={groupRef}>
      {lineObjs.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

// Flowing data particles along the connections
function DataParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 200;

  const { positions, edgeIndices, progress, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const eIdx = new Float32Array(count);
    const prog = new Float32Array(count);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      eIdx[i] = Math.floor(Math.random() * EDGES.length);
      prog[i] = Math.random();
      spd[i] = 0.2 + Math.random() * 0.6;
    }
    return { positions: pos, edgeIndices: eIdx, progress: prog, speeds: spd };
  }, []);

  useFrame(() => {
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      progress[i] += speeds[i] * 0.005;
      if (progress[i] > 1) progress[i] = 0;

      const [a, b] = EDGES[edgeIndices[i]];
      const from = NODES[a].pos;
      const to = NODES[b].pos;
      const t = progress[i];

      posArr[i * 3] = from[0] + (to[0] - from[0]) * t;
      posArr[i * 3 + 1] = from[1] + (to[1] - from[1]) * t;
      posArr[i * 3 + 2] = from[2] + (to[2] - from[2]) * t;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#c4b5fd" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// Floating scroll/paper particles in the background
function ScrollParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
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
      <pointsMaterial size={0.025} color="#4338ca" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// Outer orbit rings representing different research domains
function DomainRings() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {[2.8, 3.2, 3.6].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.4, 0]}>
          <torusGeometry args={[r, 0.008, 8, 128]} />
          <meshBasicMaterial color="#4338ca" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[4, 3, 2]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[-3, -2, 3]} intensity={0.4} color="#f5a623" />

      <KnowledgeNodes />
      <ConnectionLines />
      <DataParticles />
      <ScrollParticles />
      <DomainRings />
    </>
  );
}

export default function ResearchLabScene() {
  return (
    <SceneFrame cameraPosition={[0, 2, 5.5]} fov={50} hint="drag to rotate &bull; nodes = research topics &bull; lines = connections">
      <Scene />
    </SceneFrame>
  );
}
