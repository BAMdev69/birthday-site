import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';

function HelloKitty() {
  const { scene } = useGLTF('/models/hello_kitty.glb');
  const kittyRef = useRef();

  useFrame(({ clock }) => {
    if (kittyRef.current) {
      const t = clock.getElapsedTime();
      kittyRef.current.rotation.y = Math.sin(t * 2) * 0.4;
      kittyRef.current.position.y = -1.5 + Math.sin(t * 3) * 0.02;
    }
  });

  return (
    <primitive
      ref={kittyRef}
      object={scene}
      scale={0.6}
      position={[1, -1.5, 1]}
      rotation={[0, 0, 0]}
    />
  );
}

function Cake() {
  const { scene } = useGLTF('/models/cake_3d.glb');
  const cakeRef = useRef();

  useFrame(() => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <primitive
      ref={cakeRef}
      object={scene}
      scale={0.18}
      position={[0, -1, 0]}
      rotation={[0.5, 0, 0]}
    />
  );
}

export default function FinalCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{
        position: 'absolute',
        top: '200vh',
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <HelloKitty />
        <Cake />
      </Suspense>
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
    </Canvas>
  );
}
