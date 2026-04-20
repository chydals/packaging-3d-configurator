import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Panel = ({ args, position, rotation, color = "#e5e7eb" }) => (
  <mesh position={position} rotation={rotation} castShadow receiveShadow>
    <boxGeometry args={args} />
    <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
  </mesh>
);

const FoldingBox = ({ dimensions, isOpen }) => {
  const { length: l, width: w, height: h } = dimensions;
  const s = 0.04; // Global scale to keep it in view
  
  // Folding angle: 0 degrees (flat) to 90 degrees (folded)
  // We use Math.PI / 2 for a 90-degree fold.
  const angle = isOpen ? 0 : Math.PI / 2; 

  return (
    <group scale={s} position={[0, 0, 0]}>
      {/* 1. BOTTOM PANEL (Stationary Base) */}
      <Panel args={[w, 1, l]} position={[0, 0, 0]} color="#d1d5db" />

      {/* 2. BACK PANEL HINGE */}
      <group position={[0, 0.5, -l/2]} rotation={[-angle, 0, 0]}>
        <Panel args={[w, h, 1]} position={[0, h/2, -0.5]} />
        
        {/* TOP LID HINGE (Attached to Back Panel) */}
        <group position={[0, h, -0.5]} rotation={[-angle, 0, 0]}>
          <Panel args={[w, 1, l]} position={[0, 0.5, l/2]} color="#f3f4f6" />
        </group>
      </group>

      {/* 3. FRONT PANEL HINGE */}
      <group position={[0, 0.5, l/2]} rotation={[angle, 0, 0]}>
        <Panel args={[w, h, 1]} position={[0, h/2, 0.5]} />
      </group>

      {/* 4. LEFT PANEL HINGE */}
      <group position={[-w/2, 0.5, 0]} rotation={[0, 0, angle]}>
        <Panel args={[h, h, l]} position={[-h/2, h/2, 0]} />
      </group>

      {/* 5. RIGHT PANEL HINGE */}
      <group position={[w/2, 0.5, 0]} rotation={[0, 0, -angle]}>
        <Panel args={[h, h, l]} position={[h/2, h/2, 0]} />
      </group>
    </group>
  );
};

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={45} />
        <OrbitControls makeDefault enableDamping />
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 20, 10]} angle={0.2} intensity={2} castShadow />
        <Environment preset="city" />
        
        <FoldingBox dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
        
        <ContactShadows position={[0, -0.5, 0]} opacity={0.3} scale={20} blur={2} />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
