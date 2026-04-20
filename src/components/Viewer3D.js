import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';

const BoxMesh = ({ dimensions, isOpen }) => {
  const { length, width, height } = dimensions;
  // Lid rotation: 0 radians (closed) to -2 radians (open)
  const lidRotation = isOpen ? -2 : 0;

  return (
    <group scale={0.05}> {/* Scale down to fit the viewport */}
      {/* Base Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial color="#d2b48c" roughness={0.8} />
      </mesh>
      
      {/* Hinged Lid */}
      <mesh 
        position={[0, height / 2, -length / 2]} 
        rotation={[lidRotation, 0, 0]}
        castShadow
      >
        {/* We adjust the pivot point by shifting the geometry */}
        <boxGeometry args={[width, 2, length]} />
        <meshStandardMaterial color="#e3c9a1" roughness={0.8} />
      </mesh>
    </group>
  );
};

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '450px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
      <Canvas shadows>
        <color attach="background" args={['#f8f9fa']} />
        <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={50} />
        <OrbitControls makeDefault minDistance={5} maxDistance={30} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <BoxMesh dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
        </Float>

        {/* Professional Floor Shadow */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4
