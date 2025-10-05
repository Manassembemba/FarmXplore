import React, { useRef, useState, useMemo } from 'react';
import { Vector3, PlaneGeometry } from 'three';
import type { Group, Mesh } from 'three';
import { Canvas } from '@react-three/fiber';
import { Box, Plane, OrbitControls } from '@react-three/drei';

const Sandbag: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <Box position={position} args={[0.8, 0.4, 0.4]}>
      <meshStandardMaterial color="#d2b48c" />
    </Box>
  );
};

const SubmergedCrop: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh>
      <cylinderGeometry args={[0.05, 0.05, 0.8, 4]} />
      <meshStandardMaterial color="#556b2f" />
    </mesh>
  </group>
);

interface FloodSceneProps {
  onSandbagPlace: () => void;
}

const FloodScene: React.FC<FloodSceneProps> = ({ onSandbagPlace }) => {
  const [sandbags, setSandbags] = useState<[number, number, number][]>([]);
  const [draggedBag, setDraggedBag] = useState<[number, number, number] | null>(null);
  const palletRef = useRef<Group>(null!);

  const crops = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    position: [(Math.random() - 0.5) * 18, 0.4, (Math.random() - 0.5) * 18] as [number, number, number],
  })), []);
  
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    if (e.object.parent.name === 'pallet') {
        const palletPosition = palletRef.current.position;
        setDraggedBag([palletPosition.x, palletPosition.y, palletPosition.z]);
    }
  };

  const handlePointerMove = (e: any) => {
    if (draggedBag) {
      e.stopPropagation();
      setDraggedBag([e.point.x, 0.2, e.point.z]);
    }
  };

  const handlePointerUp = (e: any) => {
    if (draggedBag) {
      e.stopPropagation();
      setSandbags(prev => [...prev, draggedBag]);
      setDraggedBag(null);
      onSandbagPlace(); // Notify parent that a bag was placed
    }
  };

  return (
    <Canvas shadows camera={{ position: [0, 5, 12], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} castShadow />
      <fog attach="fog" args={['#172b3c', 5, 25]} />
      <OrbitControls enablePan={true} minDistance={5} maxDistance={25} maxPolarAngle={Math.PI / 2.2} />
      
      {crops.map(crop => <SubmergedCrop key={crop.id} position={crop.position} />)}

      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
        <meshStandardMaterial color="#4a3c30" />
      </Plane>
      
      {/* <RisingWater /> Temporarily disabled for this mission */}

      <group name="pallet" ref={palletRef} position={[-8, 0.2, 8]} onPointerDown={handlePointerDown}>
        <Box args={[1, 0.1, 1.5]}>
          <meshStandardMaterial color="saddlebrown" />
        </Box>
        <Sandbag position={[0, 0.2, 0]} />
        <Sandbag position={[0, 0.2, 0.5]} />
        <Sandbag position={[0, 0.2, -0.5]} />
      </group>
      
      {sandbags.map((pos, i) => <Sandbag key={i} position={pos} />)}
      {draggedBag && <Sandbag position={draggedBag} />}
    </Canvas>
  );
};

export default FloodScene;

