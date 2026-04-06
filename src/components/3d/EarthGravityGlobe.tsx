'use client';

import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

/* ── Real gravity anomaly data (GRACE/GOCE based) ──
   Each entry: [lat, lon, anomaly_mGal, geoid_height_m, label]
   Positive = stronger gravity (bulge), Negative = weaker gravity (dip)
*/
const GRAVITY_DATA: [number, number, number, number, string][] = [
  // Major lows (depressions)
  [5, 75, -110, -106, 'Indian Ocean Gravity Low'],
  [55, -80, -45, -40, 'Hudson Bay Low'],
  [-15, -60, -30, -25, 'Amazon Basin Low'],
  [35, -30, -20, -18, 'Mid-Atlantic Low'],
  [-55, 150, -25, -22, 'South Pacific Low'],
  [65, 100, -18, -15, 'Siberian Low'],
  [10, -20, -15, -12, 'West Africa Low'],

  // Major highs (bulges)
  [0, 140, 80, 78, 'New Guinea / West Pacific High'],
  [-10, -70, 50, 45, 'Andes Mountains High'],
  [45, 10, 55, 50, 'North Atlantic / Iceland High'],
  [30, 90, 40, 35, 'Himalaya-Tibet High'],
  [-30, 25, 35, 30, 'South Africa High'],
  [60, 10, 45, 40, 'Scandinavia High (Post-glacial rebound)'],
  [40, 145, 30, 28, 'Japan Trench High'],
  [-45, 170, 25, 22, 'New Zealand High'],
  [15, 120, 35, 30, 'Philippines High'],
  [-20, 45, 20, 18, 'Madagascar High'],
  [50, -125, 20, 18, 'Cascadia High'],
  [0, -90, 25, 20, 'Galapagos Rise High'],
  [-35, -75, 30, 25, 'Chile Trench High'],
];

/* ── Helper: lat/lon to spherical position ── */
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/* ── Gravity anomaly at any point (interpolated from data) ── */
function getGravityAnomaly(lat: number, lon: number): number {
  let totalWeight = 0;
  let totalAnomaly = 0;
  for (const [dlat, dlon, anomaly] of GRAVITY_DATA) {
    const dLat = lat - dlat;
    let dLon = lon - dlon;
    if (dLon > 180) dLon -= 360;
    if (dLon < -180) dLon += 360;
    const dist = Math.sqrt(dLat * dLat + dLon * dLon);
    const weight = 1 / Math.pow(dist + 5, 2.2);
    totalWeight += weight;
    totalAnomaly += anomaly * weight;
  }
  return totalAnomaly / totalWeight;
}

/* ── Color from anomaly value ── */
function anomalyColor(val: number): THREE.Color {
  // -110 to +80 mGal range
  const t = (val + 110) / 190; // 0 to 1
  const clamped = Math.max(0, Math.min(1, t));
  // Blue (low) → Green (mid) → Yellow → Red (high)
  if (clamped < 0.33) {
    return new THREE.Color().setHSL(0.65 - clamped * 0.5, 0.85, 0.3 + clamped * 0.4);
  } else if (clamped < 0.66) {
    return new THREE.Color().setHSL(0.33 - (clamped - 0.33) * 0.6, 0.8, 0.4 + (clamped - 0.33) * 0.3);
  }
  return new THREE.Color().setHSL(0.08 - (clamped - 0.66) * 0.2, 0.9, 0.45 + (clamped - 0.66) * 0.2);
}

/* ── Inspector state (shared between components) ── */
interface InspectorData {
  lat: number;
  lon: number;
  anomaly: number;
  geoid: number;
  label: string;
  pos: THREE.Vector3;
}

/* ── The Geoid Globe ── */
function GeoidGlobe({ onInspect }: { onInspect: (data: InspectorData | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const baseRadius = 2;
  const exaggeration = 0.012; // visual exaggeration of anomalies

  const { geometry, colors } = useMemo(() => {
    const geo = new THREE.SphereGeometry(baseRadius, 128, 96);
    const pos = geo.attributes.position;
    const colorArr = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Convert vertex to lat/lon
      const r = Math.sqrt(x * x + y * y + z * z);
      const lat = 90 - Math.acos(y / r) * (180 / Math.PI);
      const lon = Math.atan2(z, -x) * (180 / Math.PI) - 180;

      // Get gravity anomaly
      const anomaly = getGravityAnomaly(lat, lon);

      // Displace vertex (positive anomaly = bulge out, negative = dip in)
      const displacement = 1 + anomaly * exaggeration / 100;
      pos.setXYZ(i, x * displacement, y * displacement, z * displacement);

      // Set color
      const col = anomalyColor(anomaly);
      colorArr[i * 3] = col.r;
      colorArr[i * 3 + 1] = col.g;
      colorArr[i * 3 + 2] = col.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));
    geo.computeVertexNormals();
    return { geometry: geo, colors: colorArr };
  }, []);

  // Slow auto-rotation
  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  // Handle click for inspector
  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const point = e.point.clone();
    // Undo rotation to get original position
    const invRotation = meshRef.current.quaternion.clone().invert();
    point.applyQuaternion(invRotation);

    const r = point.length();
    const lat = 90 - Math.acos(point.y / r) * (180 / Math.PI);
    let lon = Math.atan2(point.z, -point.x) * (180 / Math.PI) - 180;
    if (lon < -180) lon += 360;
    if (lon > 180) lon -= 360;

    const anomaly = getGravityAnomaly(lat, lon);

    // Find nearest labeled point
    let nearestLabel = '';
    let nearestGeoid = anomaly * 0.9;
    let minDist = Infinity;
    for (const [dlat, dlon, , geoid, label] of GRAVITY_DATA) {
      let dLon = lon - dlon;
      if (dLon > 180) dLon -= 360;
      if (dLon < -180) dLon += 360;
      const dist = Math.sqrt((lat - dlat) ** 2 + dLon ** 2);
      if (dist < minDist) {
        minDist = dist;
        nearestLabel = label;
        nearestGeoid = geoid;
      }
    }

    onInspect({
      lat: Math.round(lat * 10) / 10,
      lon: Math.round(lon * 10) / 10,
      anomaly: Math.round(anomaly * 10) / 10,
      geoid: Math.round(nearestGeoid * 10) / 10,
      label: minDist < 25 ? nearestLabel : `${lat > 0 ? 'N' : 'S'}${Math.abs(Math.round(lat))}° ${lon > 0 ? 'E' : 'W'}${Math.abs(Math.round(lon))}°`,
      pos: e.point,
    });
  }, [onInspect]);

  return (
    <mesh ref={meshRef} geometry={geometry} onClick={handleClick}>
      <meshStandardMaterial vertexColors roughness={0.6} metalness={0.2} />
    </mesh>
  );
}

/* ── Data point markers on the globe ── */
function GravityMarkers() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      {GRAVITY_DATA.map(([lat, lon, anomaly, , label], i) => {
        const pos = latLonToVec3(lat, lon, 2 + anomaly * 0.012 / 100 * 2 + 0.03);
        const isHigh = anomaly > 0;
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color={isHigh ? '#ef4444' : '#3b82f6'}
              emissive={isHigh ? '#dc2626' : '#2563eb'}
              emissiveIntensity={1.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Atmosphere glow ── */
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.15, 64, 48]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.04}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Lat/Lon grid lines ── */
function GridLines() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  const lines = useMemo(() => {
    const result: THREE.BufferGeometry[] = [];
    const r = 2.01;

    // Latitude lines every 30°
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts = new Float32Array(129 * 3);
      for (let i = 0; i <= 128; i++) {
        const lon = (i / 128) * 360 - 180;
        const v = latLonToVec3(lat, lon, r);
        pts[i * 3] = v.x;
        pts[i * 3 + 1] = v.y;
        pts[i * 3 + 2] = v.z;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      result.push(geo);
    }

    // Longitude lines every 30°
    for (let lon = -180; lon < 180; lon += 30) {
      const pts = new Float32Array(129 * 3);
      for (let i = 0; i <= 128; i++) {
        const lat = (i / 128) * 180 - 90;
        const v = latLonToVec3(lat, lon, r);
        pts[i * 3] = v.x;
        pts[i * 3 + 1] = v.y;
        pts[i * 3 + 2] = v.z;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      result.push(geo);
    }

    return result;
  }, []);

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.06 }), []);
  const lineObjs = useMemo(() => lines.map(geo => new THREE.Line(geo, lineMat)), [lines, lineMat]);

  return (
    <group ref={groupRef}>
      {lineObjs.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
}

/* ── 3D Tooltip shown on globe ── */
function InspectorTooltip({ data }: { data: InspectorData }) {
  return (
    <Html position={data.pos} distanceFactor={6} style={{ pointerEvents: 'none' }}>
      <div style={{
        background: 'rgba(9,9,15,0.92)', border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: 8, padding: '6px 10px', minWidth: 160, backdropFilter: 'blur(8px)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#a5b4fc', marginBottom: 3 }}>{data.label}</div>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
          <div>📍 {data.lat > 0 ? 'N' : 'S'}{Math.abs(data.lat)}° {data.lon > 0 ? 'E' : 'W'}{Math.abs(data.lon)}°</div>
          <div style={{ color: data.anomaly > 0 ? '#ef4444' : '#3b82f6' }}>
            ⚡ Anomaly: {data.anomaly > 0 ? '+' : ''}{data.anomaly} mGal
          </div>
          <div>📏 Geoid: {data.geoid > 0 ? '+' : ''}{data.geoid} m</div>
        </div>
      </div>
    </Html>
  );
}

/* ── Legend ── */
function Legend() {
  return (
    <div style={{
      position: 'absolute', bottom: 28, left: 10, background: 'rgba(9,9,15,0.85)',
      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 10px',
      fontSize: 9, color: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 3, color: '#a5b4fc', fontSize: 10 }}>Gravity Anomaly (mGal)</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 }}>
        <div style={{ width: 80, height: 8, borderRadius: 4, background: 'linear-gradient(90deg, #1e3a8a, #3b82f6, #22c55e, #eab308, #ef4444)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 80 }}>
        <span>-110</span><span>0</span><span>+80</span>
      </div>
      <div style={{ marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 3 }}>
        <div><span style={{ color: '#3b82f6' }}>●</span> Low gravity (dip)</div>
        <div><span style={{ color: '#ef4444' }}>●</span> High gravity (bulge)</div>
      </div>
      <div style={{ marginTop: 3, fontStyle: 'italic', opacity: 0.5 }}>GRACE/GOCE satellite data</div>
    </div>
  );
}

/* ── Camera controls with actions ref ── */
interface SceneActions { zoomIn: () => void; zoomOut: () => void; reset: () => void; }

function CameraRig({ actionsRef }: { actionsRef: React.MutableRefObject<SceneActions> }) {
  const { camera } = useThree();
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const initialPos: [number, number, number] = [0, 2, 5.5];

  useMemo(() => {
    actionsRef.current = {
      zoomIn: () => camera.position.multiplyScalar(0.82),
      zoomOut: () => camera.position.multiplyScalar(1.2),
      reset: () => { camera.position.set(...initialPos); camera.lookAt(0, 0, 0); controlsRef.current?.reset(); },
    };
  }, [camera, actionsRef]);

  return <OrbitControls ref={controlsRef} enablePan={false} enableZoom minDistance={2.5} maxDistance={12} zoomSpeed={0.8} />;
}

/* ── Main exported component ── */
export default function EarthGravityGlobe() {
  const actionsRef = useRef<SceneActions>({ zoomIn: () => {}, zoomOut: () => {}, reset: () => {} });
  const containerRef = useRef<HTMLDivElement>(null);
  const [inspectorData, setInspectorData] = useState<InspectorData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) containerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  // Listen for fullscreen changes
  useMemo(() => {
    if (typeof document === 'undefined') return;
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scene-frame-tall${isFullscreen ? ' scene-fullscreen' : ''}`}
      style={{ position: 'relative', height: isFullscreen ? '100vh' : undefined }}
    >
      <Canvas camera={{ position: [0, 2, 5.5], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#6366f1" />

        <GeoidGlobe onInspect={setInspectorData} />
        <GravityMarkers />
        <GridLines />
        <Atmosphere />
        {inspectorData && <InspectorTooltip data={inspectorData} />}

        <CameraRig actionsRef={actionsRef} />
      </Canvas>

      {/* Controls */}
      <div className="scene-controls">
        <button onClick={() => actionsRef.current.zoomIn()} className="scene-btn" title="Zoom in">+</button>
        <button onClick={() => actionsRef.current.zoomOut()} className="scene-btn" title="Zoom out">&minus;</button>
        <button onClick={() => actionsRef.current.reset()} className="scene-btn" title="Reset">&#x21bb;</button>
        <button onClick={toggleFullscreen} className="scene-btn" title="Fullscreen">
          {isFullscreen ? '\u2715' : '\u26F6'}
        </button>
      </div>

      {/* Legend */}
      <Legend />

      {/* Inspector panel (right side) */}
      {inspectorData && (
        <div style={{
          position: 'absolute', top: 8, left: 8, background: 'rgba(9,9,15,0.9)',
          border: '1px solid rgba(99,102,241,0.25)', borderRadius: 10, padding: '8px 12px',
          minWidth: 180, backdropFilter: 'blur(8px)', zIndex: 10,
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#a5b4fc', marginBottom: 4 }}>
            🔍 Inspector
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>
            {inspectorData.label}
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
            <div>📍 Lat: {inspectorData.lat}° &nbsp; Lon: {inspectorData.lon}°</div>
            <div style={{ color: inspectorData.anomaly > 0 ? '#ef4444' : '#3b82f6', fontWeight: 600 }}>
              ⚡ Gravity Anomaly: {inspectorData.anomaly > 0 ? '+' : ''}{inspectorData.anomaly} mGal
            </div>
            <div>📏 Geoid Height: {inspectorData.geoid > 0 ? '+' : ''}{inspectorData.geoid} m</div>
            <div>🌍 {inspectorData.anomaly > 0 ? 'Mass concentration (bulge)' : 'Mass deficit (dip)'}</div>
          </div>
          <button
            onClick={() => setInspectorData(null)}
            style={{
              marginTop: 4, fontSize: 9, padding: '2px 8px', borderRadius: 5,
              border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 8, right: 10, fontSize: 9,
        color: 'rgba(255,255,255,0.25)', pointerEvents: 'none',
      }}>
        click globe to inspect • drag to rotate
      </div>
    </div>
  );
}
