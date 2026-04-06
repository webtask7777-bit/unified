'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneFrame from './SceneFrame';

function WormholeTunnel() {
  const ref = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#7c3aed') },
      uColor2: { value: new THREE.Color('#06b6d4') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vZ;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave = sin(pos.y * 3.0 + uTime * 2.0) * 0.15;
        pos.x += wave * cos(uv.x * 6.28318);
        pos.z += wave * sin(uv.x * 6.28318);
        vZ = pos.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vZ;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      void main() {
        float stripe = sin(vUv.y * 40.0 - uTime * 3.0) * 0.5 + 0.5;
        float ring = sin(vUv.x * 30.0 + uTime) * 0.5 + 0.5;
        vec3 col = mix(uColor1, uColor2, stripe * ring);
        float alpha = 0.4 + stripe * 0.3;
        float edge = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
        gl_FragColor = vec4(col, alpha * edge);
      }
    `,
  }), []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[1.2, 1.2, 5, 64, 32, true]} />
      <shaderMaterial
        ref={materialRef}
        args={[shaderData]}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function EventHorizon({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
    ref.current.scale.set(s, s, 1);
  });

  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.2, 0.15, 16, 48]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.7} />
    </mesh>
  );
}

function WormholeParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 300;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 1.0;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = Math.sin(angle) * r;
      vel[i] = 0.5 + Math.random() * 2;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(({ clock }) => {
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] -= velocities[i] * 0.02;
      if (posArr[i * 3 + 1] < -2.5) posArr[i * 3 + 1] = 2.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 2.5, 0]} intensity={2} color="#7c3aed" />
      <pointLight position={[0, -2.5, 0]} intensity={2} color="#06b6d4" />

      <WormholeTunnel />
      <WormholeParticles />
      <EventHorizon position={[0, 2.5, 0]} color="#7c3aed" />
      <EventHorizon position={[0, -2.5, 0]} color="#06b6d4" />
    </>
  );
}

export default function WormholeScene() {
  return (
    <SceneFrame cameraPosition={[3, 1.5, 3]} fov={45}>
      <Scene />
    </SceneFrame>
  );
}
