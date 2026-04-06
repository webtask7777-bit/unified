'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* Suppress THREE.Clock deprecation until @react-three/fiber migrates to THREE.Timer.
   R3F internally creates Clock — our code only reads it via useFrame. */
if (typeof window !== 'undefined') {
  const _w = console.warn;
  console.warn = (...a: unknown[]) => {
    if (typeof a[0] === 'string' && a[0].includes('Clock') && a[0].includes('deprecated')) return;
    _w(...a);
  };
}

interface SceneActions {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

function CameraRig({ actionsRef, initialPos }: {
  actionsRef: React.MutableRefObject<SceneActions>;
  initialPos: [number, number, number];
}) {
  const { camera } = useThree();
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  useEffect(() => {
    actionsRef.current = {
      zoomIn: () => {
        camera.position.multiplyScalar(0.82);
      },
      zoomOut: () => {
        camera.position.multiplyScalar(1.2);
      },
      reset: () => {
        camera.position.set(...initialPos);
        camera.lookAt(0, 0, 0);
        controlsRef.current?.reset();
      },
    };
  }, [camera, actionsRef, initialPos]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={1}
      maxDistance={20}
      zoomSpeed={0.8}
    />
  );
}

export default function SceneFrame({
  children,
  cameraPosition = [0, 2, 5],
  fov = 45,
  hint,
}: {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  hint?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<SceneActions>({ zoomIn: () => {}, zoomOut: () => {}, reset: () => {} });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scene-frame${isFullscreen ? ' scene-fullscreen' : ''}`}
      style={{ position: 'relative' }}
    >
      <Canvas camera={{ position: cameraPosition, fov }} style={{ background: 'transparent' }}>
        {children}
        <CameraRig actionsRef={actionsRef} initialPos={cameraPosition} />
      </Canvas>

      {/* Control bar */}
      <div className="scene-controls">
        <button onClick={() => actionsRef.current.zoomIn()} className="scene-btn" title="Zoom in">+</button>
        <button onClick={() => actionsRef.current.zoomOut()} className="scene-btn" title="Zoom out">&minus;</button>
        <button onClick={() => actionsRef.current.reset()} className="scene-btn" title="Reset view">&#x21bb;</button>
        <button onClick={toggleFullscreen} className="scene-btn" title="Fullscreen">
          {isFullscreen ? '\u2715' : '\u26F6'}
        </button>
      </div>

      {hint && (
        <div style={{
          position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center',
          fontSize: 10, color: 'rgba(255,255,255,0.3)', pointerEvents: 'none',
        }}>
          {hint}
        </div>
      )}
    </div>
  );
}
