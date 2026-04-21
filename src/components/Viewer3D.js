import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';

// A single cardboard panel with a pivot at the edge
const HingePanel = ({ args, position, rotation, children, color = "#e5e7eb" }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, args[1] / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
    </mesh>
    {children}
  </group>
);

const PacdoraBox = ({ dimensions, isOpen }) => {
  const { length: l, width: w, height: h } = dimensions;
  const s = 0.05; // Scaling for the viewport
  const fold = isOpen ? 0 : Math.PI / 2; // 0 is flat, 90deg is folded

  return (
    <group scale={s} rotation={[0, 0, 0]}>
      {/* BOTTOM (The stationary base) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[w, l]} />
        <meshStandardMaterial color="#d1d5db" side={2} />
      </mesh>

      {/* BACK PANEL + LID */}
      <HingePanel args={[w, h, 1]} position={[0, 0, -l/2]} rotation={[-fold, 0, 0]}>
        {/* LID (Hinged to top of Back Panel) */}
        <HingePanel args={[w, 1, l]} position={[0, h, 0]} rotation={[-fold, 0, 0]} color="#f3f4f6" />
      </HingePanel>

      {/* FRONT PANEL */}
      <HingePanel args={[w, h, 1]} position={[0, 0, l/2]} rotation={[fold, 0, 0]} />

      {/* LEFT PANEL */}
      <HingePanel args={[l, h, 1]} position={[-w/2, 0, 0]} rotation={[0, -Math.PI / 2, fold]} />

      {/* RIGHT PANEL */}
      <HingePanel args={[l, h, 1]} position={[w/2, 0, 0]} rotation={[0, Math.PI / 2, fold]} />
    </group>
  );
};

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={40} />
        <OrbitControls makeDefault enableDamping minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <Environment preset="city" />

        <PacdoraBox dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
        
        <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={20} blur={2} />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
