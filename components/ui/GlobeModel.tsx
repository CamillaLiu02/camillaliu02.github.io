'use client';

import { Suspense, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

function SewingMachineModel() {
  const { scene } = useGLTF('/models/SewingMachine.glb');

  useLayoutEffect(() => {
    const bounds = new Box3().setFromObject(scene);
    const size = new Vector3();
    const center = new Vector3();
    bounds.getSize(size);
    bounds.getCenter(center);

    scene.position.sub(center);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 1.2;
    const scale = targetSize / maxDimension;
    scene.scale.setScalar(scale);
  }, [scene]);

  return <primitive object={scene} rotation={[0, Math.PI / 5, 0]} />;
}

export default function GlobeModel() {
  return (
    <Canvas
      camera={{ position: [0, 0.25, 5.4], fov: 30, near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      className="w-full h-full bg-transparent"
      style={{ background: 'transparent' }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        camera.updateProjectionMatrix();
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 6, 6]} intensity={1.4} />
      <directionalLight position={[-4, -2, -6]} intensity={0.6} />
      <Environment preset="studio" background={false} />
      <Suspense fallback={null}>
        <SewingMachineModel />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} target={[0, 0, 0]} />
    </Canvas>
  );
}

useGLTF.preload('/models/SewingMachine.glb');
