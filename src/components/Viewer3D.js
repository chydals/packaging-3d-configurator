import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

const materialColors = {
  corrugated: "#a68a64",
  kraft: "#8b7355",
  white: "#ffffff"
};

const PacdoraHinge = ({ args, position, rotation, children, color }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, args[1] / 2, 0]} castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
    {children}
  </group>
);

const Viewer3D = ({ boxData, foldProgress }) => {
  const { length: l, width: w, height: h } = boxData.dimensions;
  const color = materialColors[boxData.material] || "#fff";
  const angle = (foldProgress / 100) * (Math.PI / 2);
  const s = 0.04;

  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[10, 10, 10]} />
      <OrbitControls makeDefault />
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      
      <group scale={s}>
        <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
          <planeGeometry args={[w, l]} />
          <meshStandardMaterial color={color} side={2} />
        </mesh>
        
        {/* Back & Lid */}
        <PacdoraHinge args={[w, h, 1]} position={[0, 0, -l/2]} rotation={[-angle, 0, 0]} color={color}>
          <PacdoraHinge args={[w, 1, l]} position={[0, h, 0]} rotation={[-angle, 0, 0]} color={color} />
        </PacdoraHinge>

        {/* Front */}
        <PacdoraHinge args={[w, h, 1]} position={[0, 0, l/2]} rotation={[angle, 0, 0]} color={color} />
        
        {/* Sides */}
        <PacdoraHinge args={[l, h, 1]} position={[-w/2, 0, 0]} rotation={[0, -Math.PI/2, angle]} color={color} />
        <PacdoraHinge args={[l, h, 1]} position={[w/2, 0, 0]} rotation={[0, Math.PI/2, angle]} color={color} />
      </group>

      <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={20} blur={2.5} />
    </Canvas>
  );
};

export default Viewer3D;
