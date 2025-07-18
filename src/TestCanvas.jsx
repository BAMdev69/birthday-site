import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useRef, Suspense } from 'react';

// 🌙 Load moon model
function MoonModel() {
  const { scene } = useGLTF('/models/moon.glb');
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={50}
      position={[0, 0, 0]}
    />
  );
}

useGLTF.preload('/models/moon.glb');

export default function TestCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ width: '100vw', height: '100vh', background: 'black' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <Suspense fallback={null}>
        <MoonModel />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}
