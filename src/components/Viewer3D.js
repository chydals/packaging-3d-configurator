import { ContactShadows, Environment, Float } from '@react-three/drei';

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '450px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
        <OrbitControls makeDefault minDistance={5} maxDistance={20} />
        
        {/* Soft Lighting */}
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <BoxMesh dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
        </Float>

        {/* This creates the realistic "ground" shadow */}
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        
        {/* Clean environment lighting */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
