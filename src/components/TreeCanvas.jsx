import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stars } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState, useMemo } from 'react';


function SakuraTree() {
  const { scene } = useGLTF('/models/sakura_tree.glb');
  const treeRef = useRef();

  useFrame(() => {
    if (treeRef.current) {
      treeRef.current.rotation.y += 0.0005; // Constant slow spin
    }
  });

  return (
    <primitive
      ref={treeRef}
      object={scene}
      scale={17}
      position={[0, -3.5, 0]}
      rotation={[0.2, 0, 0]}
    />
  );
}



// 🌸 Sakura Petals Falling
function Petal({ position, speed }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y -= speed;
      if (ref.current.position.y < -10) {
        ref.current.position.y = 5 + Math.random() * 5;
        ref.current.position.x = Math.random() * 10 - 5;
      }
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}

function PetalField({ active }) {
  const petals = useMemo(() => {
    return new Array(40).fill().map(() => ({
      position: [Math.random() * 10 - 5, Math.random() * 10, Math.random() * -5],
      speed: 0.01 + Math.random() * 0.01,
    }));
  }, []);

  return active ? (
    <>
      {petals.map((p, i) => (
        <Petal key={i} position={p.position} speed={p.speed} />
      ))}
    </>
  ) : null;
}

export default function TreeCanvas() {
  const [showPetals, setShowPetals] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 1.5; // Halfway through section 2
      setShowPetals(scrollY > triggerPoint);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{
        position: 'absolute',
        top: '100vh',
        left: 0,
        width: '100vw',
        height: '200vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={1.2} />
      <Stars />
      <Suspense fallback={null}>
        <SakuraTree />
        <PetalField active={showPetals} />
      </Suspense>
    </Canvas>
  );
}
