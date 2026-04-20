import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';

const BoxMesh = ({ dimensions, isOpen }) => {
  const { length, width, height } = dimensions;
  const lidRot = isOpen ? -Math.PI / 1.5 : 0; // Rotates the lid back when open

  return (
    <group scale={0.04}>
      {/* Main Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Top Lid */}
      <mesh position={[0, height / 2, -length / 2]} rotation={[lidRot, 0, 0]} castShadow>
        <boxGeometry args={[width, 4, length]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.4} />
      </mesh>
    </group>
  );
};

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={40} />
        <OrbitControls makeDefault enableDamping minDistance={5} maxDistance={25} />
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <Environment preset="neutral" />
        <BoxMesh dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
        <ContactShadows position={[0, -2, 0]} opacity={0.25} scale={20} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
