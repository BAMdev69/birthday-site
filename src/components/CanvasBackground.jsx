import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, ScrollControls, useScroll, useGLTF } from '@react-three/drei';
import { useRef, Suspense } from 'react';

function Scene() {
  const scroll = useScroll();
  const sakura = useGLTF('/models/sakura_tree.glb');
  const moonRef = useRef();

  useFrame((state) => {
    const offset = scroll.offset;
    const y = 5 - offset * 10;
    state.camera.position.set(0, y, 10);
    state.camera.lookAt(0, y - 2, 0);

    if (moonRef.current) {
      moonRef.current.rotation.y += 0.003;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />

      <mesh ref={moonRef} position={[0, 5, -5]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#ffffcc"
          emissive="#ffffcc"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      <primitive object={sakura.scene} scale={18} position={[0, -2, 0]} />
    </>
  );
}

export default function CanvasBackground() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Suspense fallback={null}>
        <ScrollControls pages={4} damping={0.25}>
          <Scene />
        </ScrollControls>
      </Suspense>
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
    </Canvas>
  );
}
