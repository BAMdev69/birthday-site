import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

function Moon() {
  const moonRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 2.5; // increased orbit radius
    const speed = 0.5;

    const x = Math.cos(t * speed) * radius;
    const y = 2 + Math.sin(t * speed) * 0.2; // gentle vertical bob
    const z = -5 + Math.sin(t * speed) * radius;

    if (moonRef.current) {
      moonRef.current.position.set(x, y, z);
      moonRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#fff4b3" // soft pale yellow
        emissive="#ffeb99" // warm yellow glow
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}


export default function MoonCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={1} />
      <Stars />
      <Moon />
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
    </Canvas>
  );
}
