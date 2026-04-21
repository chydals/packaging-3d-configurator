import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

const materialConfig = {
  'white-cardboard': { color: '#ffffff', roughness: 0.8, map: null },
  'dark-kraft': { color: '#5d4037', roughness: 1.0, map: null },
  'f-flute': { color: '#e3d5ca', roughness: 0.9 },
  'e-flute': { color: '#d5bdaf', roughness: 0.9 },
  'b-flute': { color: '#a39184', roughness: 0.9 },
};

const BoxPanel = ({ args, position, rotation, children, matProps }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, args[1] / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial {...matProps} />
    </mesh>
    {children}
  </group>
);

const Viewer3D = ({ dimensions, material, foldProgress, thickness }) => {
  const { length: l, width: w, height: h } = dimensions;
  const t = thickness || 0.5; // Physical thickness of the board
  const angle = (foldProgress / 100) * (Math.PI / 2);
  const matProps = useMemo(() => materialConfig[material] || materialConfig['white-cardboard'], [material]);

  return (
    <Canvas shadows dpr={[1, 2]}>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={35} />
        <OrbitControls makeDefault minDistance={10} maxDistance={30} />
        <Environment preset="studio" />
        
        <group scale={0.03}> 
          {/* BOTTOM BASE */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <boxGeometry args={[w, l, t]} />
            <meshStandardMaterial {...matProps} />
          </mesh>

          {/* HINGED SYSTEM */}
          <BoxPanel args={[w, h, t]} position={[0, t/2, -l/2]} rotation={[-angle, 0, 0]} matProps={matProps}>
            <BoxPanel args={[w, t, l]} position={[0, h, 0]} rotation={[-angle, 0, 0]} matProps={matProps} />
          </BoxPanel>

          <BoxPanel args={[w, h, t]} position={[0, t/2, l/2]} rotation={[angle, 0, 0]} matProps={matProps} />
          <BoxPanel args={[t, h, l]} position={[-w/2, t/2, 0]} rotation={[0, 0, angle]} matProps={matProps} />
          <BoxPanel args={[t, h, l]} position={[w/2, t/2, 0]} rotation={[0, 0, -angle]} matProps={matProps} />
        </group>

        <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={20} blur={2} />
      </Suspense>
    </Canvas>
  );
};

export default Viewer3D;
