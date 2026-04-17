import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

// This component builds the actual 3D Box
const BoxMesh = ({ dimensions, thickness, isOpen }) => {
  const meshRef = useRef();
  const { length, width, height } = dimensions;

  // Simple animation logic to "pulse" or rotate if needed
  useFrame((state) => {
    if (!isOpen) {
      meshRef.current.rotation.y += 0.005; // Slow 360 rotation
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* BoxGeometry creates the 3D shape based on user inputs */}
      <boxGeometry args={[length, height, width]} />
      <meshStandardMaterial color="#f5f5dc" roughness={0.8} /> 
      {/* #f5f5dc is a cardboard-like cream color */}
    </mesh>
  );
};

// The Main Viewer component
const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '400px', background: '#f0f0f0' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[500, 500, 500]} />
        <OrbitControls enablePan={true} enableZoom={true} makeDefault />
        <Environment preset="city" />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <BoxMesh 
          dimensions={boxData.dimensions} 
          thickness={boxData.thickness}
          isOpen={boxData.isOpen}
        />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
