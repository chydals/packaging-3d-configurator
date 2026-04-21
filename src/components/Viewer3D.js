import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

/** * Color Mapping based on material selection
 */
const materialSettings = {
  'white-cardboard': { color: '#ffffff', roughness: 0.8, metalness: 0.0 },
  'dark-kraft': { color: '#5d4037', roughness: 0.9, metalness: 0.0 },
  'f-flute': { color: '#d7ccc8', roughness: 0.9, metalness: 0.0 },
  'e-flute': { color: '#bcaaa4', roughness: 0.9, metalness: 0.0 },
  'b-flute': { color: '#8d6e63', roughness: 0.9, metalness: 0.0 },
};

/**
 * A Hinge Component: 
 * Groups panels so they rotate from the correct edge (hinge point)
 */
const Hinge = ({ args, position, rotation, children, matProps }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, args[1] / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial {...matProps} />
    </mesh>
    {children}
  </group>
);

const FoldableBox = ({ dimensions, material, foldProgress }) => {
  const { length, width, height } = dimensions;
  const matProps = materialSettings[material] || materialSettings['white-cardboard'];
  
  // Convert 0-100 progress to Radians (0 to 90 degrees)
  const angle = (foldProgress / 100) * (Math.PI / 2);
  const s = 0.035; // Global scale to fit in the window

  return (
    <group scale={s} position={[0, - (height * s) / 2, 0]}>
      {/* 1. BOTTOM PANEL (Stationary Base) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial {...matProps} side={2} />
      </mesh>

      {/* 2. BACK PANEL HINGE + TOP LID */}
      <Hinge args={[width, height, 1]} position={[0, 0, -length / 2]} rotation={[-angle, 0, 0]} matProps={matProps}>
        {/* LID: Hinged to the top edge of the back panel */}
        <Hinge args={[width, 1, length]} position={[0, height, 0]} rotation={[-angle, 0, 0]} matProps={matProps} />
      </Hinge>

      {/* 3. FRONT PANEL HINGE */}
      <Hinge args={[width, height, 1]} position={[0, 0, length / 2]} rotation={[angle, 0, 0]} matProps={matProps} />

      {/* 4. LEFT PANEL HINGE */}
      <Hinge args={[length, height, 1]} position={[-width / 2, 0, 0]} rotation={[0, -Math.PI / 2, angle]} matProps={matProps} />

      {/* 5. RIGHT PANEL HINGE */}
      <Hinge args={[length, height, 1]} position={[width / 2, 0, 0]} rotation={[0, Math.PI / 2, angle]} matProps={matProps} />
    </group>
  );
};

const Viewer3D = ({ dimensions, material, foldProgress }) => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
      <Canvas shadows antialias="true">
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={35} />
          <OrbitControls 
            makeDefault 
            enableDamping 
            minDistance={5} 
            maxDistance={25} 
            maxPolarAngle={Math.PI / 1.8} 
          />
          
          {/* Professional Lighting */}
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 20, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />

          {/* The Box Model */}
          <FoldableBox 
            dimensions={dimensions} 
            material={material} 
            foldProgress={foldProgress} 
          />

          {/* Soft Ground Shadows */}
          <ContactShadows 
            position={[0, -0.05, 0]} 
            opacity={0.35} 
            scale={20} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Viewer3D;
