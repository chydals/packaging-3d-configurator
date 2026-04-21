import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

// A panel that rotates around its bottom edge (the hinge)
const FoldablePanel = ({ args, position, rotation, children, color = "#e5e7eb" }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, args[1] / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
    {children}
  </group>
);

const PacdoraModel = ({ dimensions, foldProgress }) => {
  const { length: l, width: w, height: h } = dimensions;
  const s = 0.04; // Scale factor
  
  // Progress 0 = Flat sheet; Progress 1 = Closed box
  const angle = (foldProgress / 100) * (Math.PI / 2); 

  return (
    <group scale={s}>
      {/* 1. BOTTOM BASE (Fixed) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[w, l]} />
        <meshStandardMaterial color="#d1d5db" side={2} />
      </mesh>

      {/* 2. BACK PANEL & LID (Double Hinge) */}
      <FoldablePanel args={[w, h, 1]} position={[0, 0, -l/2]} rotation={[-angle, 0, 0]}>
        <FoldablePanel args={[w, 1, l]} position={[0, h, 0]} rotation={[-angle, 0, 0]} color="#f3f4f6" />
      </FoldablePanel>

      {/* 3. FRONT PANEL */}
      <FoldablePanel args={[w, h, 1]} position={[0, 0, l/2]} rotation={[angle, 0, 0]} />

      {/* 4. LEFT SIDE */}
      <FoldablePanel args={[l, h, 1]} position={[-w/2, 0, 0]} rotation={[0, -Math.PI / 2, angle]} />

      {/* 5. RIGHT SIDE */}
      <FoldablePanel args={[l, h, 1]} position={[w/2, 0, 0]} rotation={[0, Math.PI / 2, angle]} />
    </group>
  );
};

const Viewer3D = ({ boxData, foldProgress }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={40} />
          <OrbitControls makeDefault enableDamping />
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
          <PacdoraModel dimensions={boxData.dimensions} foldProgress={foldProgress} />
          <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={20} blur={2} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Viewer3D;
