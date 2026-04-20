import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

const BoxMesh = ({ dimensions, isOpen }) => {
  const { length, width, height } = dimensions;
  // Lid rotation: 0 if closed, -2 radians if open
  const lidRotation = isOpen ? -2 : 0;

  return (
    <group scale={0.05}> {/* Scaling down so it fits the screen */}
      {/* Base of the box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      
      {/* Lid (Top panel that rotates) */}
      <mesh position={[0, height / 2, -length / 2]} rotation={[lidRotation, 0, 0]}>
        <boxGeometry args={[width, 2, length]} />
        <meshStandardMaterial color="#e3c9a1" />
      </mesh>
    </group>
  );
};

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '400px', background: '#f0f0f0', borderRadius: '8px' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[15, 15, 15]} />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BoxMesh dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
