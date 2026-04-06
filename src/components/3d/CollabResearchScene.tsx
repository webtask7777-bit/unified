'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

/* ── 4 Collab tracks with progress ── */
const TRACKS = [
  { label: 'GW Pipeline', color: '#3ecf8e', color2: '#f5a623', progress: 0.78 },
  { label: 'N-body Math', color: '#3ecf8e', color2: '#a78bfa', progress: 0.64 },
  { label: 'BEC-GW', color: '#3ecf8e', color2: '#38bdf8', progress: 0.52 },
  { label: 'Dark Parity', color: '#3ecf8e', color2: '#f87060', progress: 0.70 },
];

/* ── Central Newton Node ── */
function NewtonCore() {
  const ref = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.2;
    const s = 1 + Math.sin(t * 0.8) * 0.08;
    glowRef.current.scale.setScalar(s);
  });

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshBasicMaterial color="#3ecf8e" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshBasicMaterial color="#3ecf8e" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color="#3ecf8e" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Collaborator Nodes ── */
function CollabNode({ color, angle, index }: { color: string; angle: number; index: number }) {
  const ref = useRef<THREE.Group>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 1.8;
    const a = angle + Math.sin(t * 0.15 + index) * 0.1;
    const y = Math.sin(t * 0.3 + index * 1.5) * 0.15;
    ref.current.position.set(Math.cos(a) * radius, y, Math.sin(a) * radius);
    const s = 1 + Math.sin(t * 1.2 + index * 2) * 0.15;
    pulseRef.current.scale.setScalar(s);
  });

  const shapes = [
    <octahedronGeometry key="g" args={[0.15, 0]} />,
    <dodecahedronGeometry key="g" args={[0.14, 0]} />,
    <tetrahedronGeometry key="g" args={[0.16, 0]} />,
    <icosahedronGeometry key="g" args={[0.14, 0]} />,
  ];

  return (
    <group ref={ref}>
      <mesh>{shapes[index]}<meshBasicMaterial color="#ffffff" wireframe /></mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ── Research Beam (connection line with flowing particles) ── */
function ResearchBeam({ color, angle, index, progress }: { color: string; angle: number; index: number; progress: number }) {
  const ref = useRef<THREE.Group>(null!);
  const particleCount = 30;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      arr[i * 3] = 0;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 1.8;
    const a = angle + Math.sin(t * 0.15 + index) * 0.1;
    const endX = Math.cos(a) * radius;
    const endY = Math.sin(t * 0.3 + index * 1.5) * 0.15;
    const endZ = Math.sin(a) * radius;

    const geom = ref.current.children[0] as THREE.Points;
    const pos = (geom.geometry as THREE.BufferGeometry).attributes.position;

    for (let i = 0; i < particleCount; i++) {
      const frac = ((i / particleCount) + t * 0.3 + index * 0.2) % 1;
      const limited = Math.min(frac, progress);
      pos.setXYZ(i, endX * limited, endY * limited, endZ * limited);
    }
    pos.needsUpdate = true;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.04} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

/* ── Progress Ring ── */
function ProgressRing({ progress, color, angle, index }: { progress: number; color: string; angle: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 1.8;
    const a = angle + Math.sin(t * 0.15 + index) * 0.1;
    const y = Math.sin(t * 0.3 + index * 1.5) * 0.15;
    ref.current.position.set(Math.cos(a) * radius, y, Math.sin(a) * radius);
    ref.current.rotation.y = t * 0.5;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.32, 0.015, 8, 32, Math.PI * 2 * progress]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

/* ── Background field particles ── */
function FieldParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.015} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ── Main Scene ── */
function Scene() {
  const angles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];

  return (
    <>
      <NewtonCore />
      {TRACKS.map((track, i) => (
        <CollabNode key={i} color={track.color2} angle={angles[i]} index={i} />
      ))}
      {TRACKS.map((track, i) => (
        <ResearchBeam key={`b${i}`} color={track.color2} angle={angles[i]} index={i} progress={track.progress} />
      ))}
      {TRACKS.map((track, i) => (
        <ProgressRing key={`p${i}`} color={track.color2} angle={angles[i]} index={i} progress={track.progress} />
      ))}
      <FieldParticles />
    </>
  );
}

export default function CollabResearchScene() {
  return (
    <SceneFrame cameraPosition={[0, 1.5, 4]} fov={50}>
      <Scene />
    </SceneFrame>
  );
}
