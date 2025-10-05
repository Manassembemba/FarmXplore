import React, { useRef, useState, useMemo, useEffect } from 'react';
import type { Group, Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Plane, TransformControls, Html, Sky } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from 'react-postprocessing';

const WiltingCrop: React.FC<{ position: [number, number, number], onClick: () => void }> = ({ position, onClick }) => {
  const ref = useRef<Group>(null!);
  const time = useRef(Math.random() * 100);

  useFrame((state) => {
    time.current += state.clock.getDelta() * 0.4;
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2 + Math.sin(time.current) * 0.2;
      ref.current.children[0].scale.y = 1 + Math.sin(time.current * 2) * 0.05;
    }
  });

  return (
    <group ref={ref} position={position} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 1.5, 6]} />
        <meshStandardMaterial color="#ffcc80" />
      </mesh>
    </group>
  );
};

const ShadeCloth = ({ targetCrop, onControlsChange }: { targetCrop: any, onControlsChange: (opacity: number) => void }) => {
    const [opacity, setOpacity] = useState(0.5);

    useEffect(() => {
        onControlsChange(opacity);
    }, [opacity, onControlsChange]);

    if (!targetCrop) return null;

    return (
        <>
            <mesh position={[targetCrop.position[0], 2, targetCrop.position[2]]}>
                <planeGeometry args={[1.5, 1.5]} />
                <meshStandardMaterial color="black" transparent opacity={opacity} />
                <TransformControls mode="rotate" showY={false} size={0.75} />
            </mesh>
            <Html position={[targetCrop.position[0], 3, targetCrop.position[2]]} center>
                <div className="bg-slate-800/80 text-white rounded-lg p-2 flex items-center gap-2">
                    <label htmlFor="opacity" className="text-xs font-bold">Density:</label>
                    <input
                        type="range"
                        id="opacity"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={opacity}
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                        className="w-24"
                    />
                </div>
            </Html>
        </>
    );
};

const HeatwaveScene: React.FC = () => {
    const [crops, setCrops] = useState(
        useMemo(() => Array.from({ length: 30 }, (_, i) => ({
            id: i,
            position: [(Math.random() - 0.5) * 18, 0.75, (Math.random() - 0.5) * 18] as [number, number, number],
            shaded: false,
            shadeOpacity: 0.5,
        })), [])
    );
    const [activeCropId, setActiveCropId] = useState<number | null>(null);

    const toggleShade = (id: number) => {
        setCrops(prev => prev.map(c => c.id === id ? { ...c, shaded: !c.shaded } : c));
        setActiveCropId(id);
    };
    
    const handleShadeControlsChange = (opacity: number) => {
        if(activeCropId !== null) {
            setCrops(prev => prev.map(c => c.id === activeCropId ? { ...c, shadeOpacity: opacity } : c));
        }
    };
    
    const activeCrop = crops.find(c => c.id === activeCropId && c.shaded);

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[0, 20, 10]} intensity={2.5} castShadow color="#ffddaa" />
            <Sky sunPosition={[0, 20, 10]} />

            {crops.map(crop => (
                <WiltingCrop key={crop.id} position={crop.position} onClick={() => toggleShade(crop.id)} />
            ))}
            
            {activeCrop && <ShadeCloth targetCrop={activeCrop} onControlsChange={handleShadeControlsChange} />}

            <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow onClick={() => setActiveCropId(null)}>
                <meshStandardMaterial color="#e0c08b" />
            </Plane>
            
            <EffectComposer>
                <Bloom intensity={1.2} luminanceThreshold={0.9} luminanceSmoothing={0.9} height={400} />
                <Noise opacity={0.03} />
            </EffectComposer>
        </>
    );
};

export default HeatwaveScene;