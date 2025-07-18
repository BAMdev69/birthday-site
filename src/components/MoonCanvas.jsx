import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
function MoonModel() {
  const { scene } = useGLTF('/models/moon.glb');
  const moonRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 2.5;
    const speed = 0.5;

    const x = Math.cos(t * speed) * radius;
    const y = 2 + Math.sin(t * speed) * 0.2;
    const z = -5 + Math.sin(t * speed) * radius;

    if (moonRef.current) {
      moonRef.current.position.set(x, y, z);
      moonRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.position.set(x, y, z);
    }
  });

  return (
    <>
      {/* Glow Halo */}
      <mesh ref={glowRef} scale={0.38}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Moon GLB */}
      <primitive
        ref={moonRef}
        object={scene}
        scale={0.3}
      />
    </>
  );
}


export default function MoonCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 50 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={1} />
      <Stars />
      <MoonModel />
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
    </Canvas>
  );
}
