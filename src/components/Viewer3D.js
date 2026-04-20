import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';

function Box({ dimensions, isOpen }) {
  const { length, width, height } = dimensions;
  return (
    <mesh castShadow>
      <boxGeometry args={[width / 10, height / 10, length / 10]} />
      <meshStandardMaterial color="#d2b48c" />
    </mesh>
  );
}

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[15, 15, 15]} />
          {/* Stage handles professional lighting and shadows automatically */}
          <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.2, blur: 2 }}>
            <Box dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
          </Stage>
          <OrbitControls makeDefault autoRotate={!boxData.isOpen} autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Viewer3D;
