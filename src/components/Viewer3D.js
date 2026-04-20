import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

const BoxPanel = ({ args, position, rotation, color = "#e5e7eb" }) => (
  <mesh position={position} rotation={rotation} castShadow>
    <boxGeometry args={args} />
    <meshStandardMaterial color={color} roughness={0.4} />
  </mesh>
);

const FoldingBox = ({ dimensions, isOpen }) => {
  const { length: l, width: w, height: h } = dimensions;
  const s = 0.04; // Scale factor
  const fold = isOpen ? 0 : Math.PI / 2; // 0 is flat (unfolded), 90 deg is folded

  return (
    <group scale={s}>
      {/* Bottom Panel (Stationary) */}
      <BoxPanel args={[w, 2, l]} position={[0, 0, 0]} />

      {/* Back Panel & Lid */}
      <group position={[0, 0, -l/2]} rotation={[-fold, 0, 0]}>
        <BoxPanel args={[w, h, 2]} position={[0, h/2, 0]} />
        {/* Lid */}
        <group position={[0, h, 0]} rotation={[-fold, 0, 0]}>
           <BoxPanel args={[w, 2, l]} position={[0, 0, l/2]} color="#f3f4f6" />
        </group>
      </group>

      {/* Front Panel */}
      <group position={[0, 0, l/2]} rotation={[fold, 0, 0]}>
        <BoxPanel args={[w, h, 2]} position={[0, h/2, 0]} />
      </group>

      {/* Left Panel */}
      <group position={[-w/2, 0, 0]} rotation={[0, 0, fold]}>
        <BoxPanel args={[2, h, l]} position={[-h/2, 0, 0]} />
      </group>

      {/* Right Panel */}
      <group position={[w/2, 0, 0]} rotation={[0, 0, -fold]}>
        <BoxPanel args={[2, h, l]} position={[h/2, 0, 0]} />
      </g>
    </group>
  );
};

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={40} />
        <OrbitControls makeDefault enableDamping />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 20, 10]} angle={0.15} intensity={1.5} castShadow />
        <Environment preset="neutral" />
        <FoldingBox dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
        <ContactShadows position={[0, -1, 0]} opacity={0.2} scale={20} blur={2} />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
