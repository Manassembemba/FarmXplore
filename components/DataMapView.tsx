import React, { useMemo, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Billboard, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { SoilMoistureRecord } from '../types';

// --- Helper Functions ---
const getMoistureColor = (moisture: number, minMoisture: number, maxMoisture: number, levelId: string): THREE.Color => {
  if (maxMoisture <= minMoisture) return new THREE.Color('#22c55e');

  // Use a logarithmic scale for normalization to handle outliers gracefully
  const logMin = minMoisture > 0 ? Math.log(minMoisture) : 0;
  const logMax = Math.log(maxMoisture + 1);
  const logVal = Math.log(moisture + 1);
  const normalized = (logVal - logMin) / (logMax - logMin);

  if (levelId === 'drought') {
    if (normalized < 0.15) return new THREE.Color('#ef4444'); // Red
    if (normalized < 0.4) return new THREE.Color('#f97316');  // Orange
    if (normalized < 0.7) return new THREE.Color('#facc15');  // Yellow
    return new THREE.Color('#22c55e'); // Green
  } else { // Flood
    if (normalized > 0.8) return new THREE.Color('#ef4444'); // Red
    if (normalized > 0.5) return new THREE.Color('#f97316');  // Orange
    if (normalized > 0.2) return new THREE.Color('#facc15');  // Yellow
    return new THREE.Color('#22c55e'); // Green
  }
};

// --- Scenery Components ---
const Tree = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh castShadow position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.1, 0.2, 1, 5]} />
      <meshStandardMaterial color="#6b4f3a" />
    </mesh>
    <mesh castShadow position={[0, 1.5, 0]}>
      <coneGeometry args={[0.7, 1.5, 6]} />
      <meshStandardMaterial color="#2e8b57" />
    </mesh>
  </group>
);

// --- 3D Site Component ---
const SiteNode: React.FC<{
  record: any;
  position: [number, number, number];
  color: THREE.Color;
  isSelected: boolean;
  isTarget: boolean;
  onSelect: (siteId: string) => void;
  unit: string;
}> = ({ record, position, color, isSelected, isTarget, onSelect, unit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current && isTarget && !isSelected) {
      const time = state.clock.getElapsedTime();
      const pulse = (Math.sin(time * 3) + 1) / 2; // Smooth pulse from 0 to 1
      groupRef.current.position.y = pulse * 0.2; // Pulse the height of the whole group
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Billboard>
        <Text
          position={[0, 1, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#101827"
        >
          {record.siteId}
        </Text>
      </Billboard>
      {isHovered && !isSelected && (
        <Billboard>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.35}
            color="white"
            backgroundColor="#083344"
            padding={0.1}
            borderRadius={0.05}
          >
            {`${record.moisture.toFixed(2)} ${unit}`}
          </Text>
        </Billboard>
      )}
      <mesh
        onClick={(e) => { e.stopPropagation(); onSelect(record.siteId); }}
        onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
        onPointerOut={() => setIsHovered(false)}
        scale={isHovered ? 1.1 : 1}
        castShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {isSelected && (
        <Ring
          position={[0, 0.06, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          args={[1, 1.1, 64]}
        >
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} toneMapped={false} />
        </Ring>
      )}
    </group>
  );
};

// --- Main Component ---
interface DataMapViewProps {
  records: SoilMoistureRecord[];
  selectedSite: string | null;
  onSelectSite: (siteId: string) => void;
  levelId: string;
  targetSiteId: string | null;
}

const DataMapView: React.FC<DataMapViewProps> = ({ records, selectedSite, onSelectSite, levelId, targetSiteId }) => {
  const { siteNodes, dataUnit } = useMemo(() => {
    if (!records || records.length === 0) {
      return { siteNodes: [], dataUnit: '' };
    }

    // 1. Find the actual target record
    const targetRecord = records.find(r => r.siteId === targetSiteId);

    // 2. Get 49 other random records, excluding the target
    const otherRecords = records.filter(r => r.siteId !== targetSiteId).sort(() => 0.5 - Math.random()).slice(0, 49);
    
    // 3. Create a predictable list of 50 records, shuffled
    const displayRecords = targetRecord ? [targetRecord, ...otherRecords] : otherRecords.slice(0, 50);
    displayRecords.sort(() => 0.5 - Math.random());

    const values = displayRecords.map(r => r.moisture);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const unit = levelId === 'flood' ? 'mm' : 'm³/m³';

    const gridSize = 8;
    const spacing = 2.5;

    const nodes = displayRecords.map((record, index) => {
      const x = (index % gridSize) * spacing - ((gridSize - 1) * spacing) / 2;
      const z = Math.floor(index / gridSize) * spacing - ((gridSize - 1) * spacing) / 2;
      return {
        ...record,
        position: [x, 0, z] as [number, number, number],
        color: getMoistureColor(record.moisture, minVal, maxVal, levelId),
        isTarget: record.siteId === targetSiteId,
      };
    });

    return { siteNodes: nodes, dataUnit: unit };
  }, [records, levelId, targetSiteId]);

  const scenery = useMemo(() => {
    const items = [];
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      if (Math.abs(x) > 12 || Math.abs(z) > 12) { // Avoid spawning on the grid
        items.push(<Tree key={`tree-${i}`} position={[x, 0, z]} />);
      }
    }
    return items;
  }, []);

  return (
    <div className="h-full min-h-[400px] md:min-h-[500px] rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
      <Canvas shadows camera={{ position: [0, 15, 18], fov: 50 }}>
        <fog attach="fog" args={['#101827', 20, 45]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <OrbitControls 
          enablePan={false} 
          minDistance={8} 
          maxDistance={30} 
          maxPolarAngle={Math.PI / 2.1}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#4a3c2a" />
        </mesh>

        {scenery}

        {siteNodes.map((node) => (
          <SiteNode
            key={node.siteId}
            record={node}
            position={node.position}
            color={node.color}
            isSelected={selectedSite === node.siteId}
            isTarget={node.isTarget}
            onSelect={onSelectSite}
            unit={dataUnit}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default DataMapView;
