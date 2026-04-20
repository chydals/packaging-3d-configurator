import { ContactShadows, Environment, Float } from '@react-three/drei';

const Viewer3D = ({ boxData }) => {
  return (
    <div style={{ width: '100%', height: '450px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
      <Canvas shadows>
  {/* 1. Sets the background to a very light, clean grey */}
  <color attach="background" args={['#f8f9fa']} /> 
  
  <PerspectiveCamera makeDefault position={[10, 10, 10]} />
  <OrbitControls makeDefault />
  
  {/* 2. Soft studio lighting */}
  <ambientLight intensity={0.8} />
  <Environment preset="city" /> 

  <BoxMesh dimensions={boxData.dimensions} isOpen={boxData.isOpen} />
  
  {/* 3. The shadow on the floor */}
  <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={15} blur={2} far={4} />
</Canvas>
    </div>
  );
};
