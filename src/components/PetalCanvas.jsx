import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

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

function PetalField() {
  const petals = useMemo(() => {
    return new Array(60).fill().map(() => ({
      // Limit petals to center 80% of screen (approx −4 to +4 instead of −5 to +5)
        position: [Math.random() * 8 - 4, Math.random() * 10, Math.random() * -5],
      speed: 0.01 + Math.random() * 0.01,
    }));
  }, []);

  return <>
    {petals.map((p, i) => (
      <Petal key={i} position={p.position} speed={p.speed} />
    ))}
  </>;
}

export default function PetalCanvas() {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: '130vh',
        left: 0,
        width: '100vw',
        height: '150vh', // Covers section 2, 3, 4
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={1.2} />
      <PetalField />
    </Canvas>
  );
}
