import React, { useRef, useState, useMemo } from 'react';
import type { Group, Mesh, Vector3, Texture } from 'three';
import { CatmullRomCurve3 } from 'three';
import { useFrame, extend } from '@react-three/fiber';
import { Tube, Decal, useTexture } from '@react-three/drei';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

// Withered Crop Component with Animation
const WitheredCrop: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const ref = useRef<Group>(null!);
  const time = useRef(Math.random() * 100);

  useFrame((state) => {
    time.current += state.clock.getDelta() * 0.5;
    if (ref.current) {
      ref.current.rotation.z = Math.sin(time.current) * 0.15;
      ref.current.rotation.x = Math.cos(time.current * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0, 0.1, 1.2, 4, 1]} />
        <meshStandardMaterial color="#8a6741" flatShading />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.2, 4, 3]} />
        <meshStandardMaterial color="#a17a4a" />
      </mesh>
    </group>
  );
};

// Ground Cracks Component
const GroundCracks: React.FC<{ parentMeshRef: React.RefObject<Mesh> }> = ({ parentMeshRef }) => {
  const crackTexture = useTexture('https://raw.githubusercontent.com/pmndrs/drei-assets/main/textures/decal-splatter.png');
  const [cracks, setCracks] = useState<any[]>([]);

  useFrame((state) => {
    if (Math.random() > 0.99 && cracks.length < 50) {
      const position = [(Math.random() - 0.5) * 18, 0.01, (Math.random() - 0.5) * 18];
      const rotation = [0, Math.random() * Math.PI, 0];
      const scale = [Math.random() * 2 + 1, Math.random() * 2 + 1, 1];
      setCracks(prev => [...prev, { position, rotation, scale, initialTime: state.clock.elapsedTime }]);
    }
  });

  return (
    <>
      {cracks.map((crack, i) => (
        <AnimatedDecal key={i} crack={crack} mesh={parentMeshRef} texture={crackTexture} />
      ))}
    </>
  );
};

const AnimatedDecal: React.FC<{crack: any, mesh: React.RefObject<Mesh>, texture: Texture}> = ({ crack, mesh, texture }) => {
  const ref = useRef<any>();
  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime - crack.initialTime;
    const scaleFactor = Math.min(elapsedTime / 2, 1); // Animate scale over 2 seconds
    if (ref.current) {
        ref.current.scale.set(crack.scale[0] * scaleFactor, crack.scale[1] * scaleFactor, crack.scale[2]);
    }
  });

  return <Decal mesh={mesh} ref={ref} position={crack.position as Vector3} rotation={crack.rotation as [number, number, number]} scale={[0,0,0]} map={texture} />;
}

const DroughtScene: React.FC = () => {
  const groundRef = useRef<Mesh>(null!);
  const [lines, setLines] = useState<Vector3[][]>([]);
  const currentLine = useRef<Vector3[]>([]);
  const isDrawing = useRef(false);

  const crops = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    position: [(Math.random() - 0.5) * 18, 0.6, (Math.random() - 0.5) * 18] as [number, number, number],
  })), []);
  
  const handlePointerDown = (e: any) => {
    if (e.object.name !== 'ground') return;
    isDrawing.current = true;
    currentLine.current = [e.point];
  };

  const handlePointerMove = (e: any) => {
    if (!isDrawing.current || e.object.name !== 'ground') return;
    const lastPoint = currentLine.current[currentLine.current.length - 1];
    if (lastPoint.distanceTo(e.point) > 0.1) {
      currentLine.current = [...currentLine.current, e.point];
      // Create a temporary line for immediate feedback
      setLines(prev => [...prev.slice(0, -1), currentLine.current]);
    }
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    if(currentLine.current.length > 1) {
        setLines(prev => [...prev, []]); // Add a placeholder for the next line
    }
  };
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 5]} intensity={1} castShadow />
      
      {crops.map(crop => <WitheredCrop key={crop.id} position={crop.position} />)}

      <mesh
        ref={groundRef}
        name="ground"
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#a1887f" />
        <GroundCracks parentMeshRef={groundRef} />
      </mesh>
      
      {lines.map((line, index) => (
        <Tube key={index} args={[new CatmullRomCurve3(line), 64, 0.1, 8, false]}>
          <meshStandardMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={2} />
        </Tube>
      ))}
    </>
  );
};

export default DroughtScene;