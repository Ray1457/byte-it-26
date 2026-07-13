"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import type { Group } from "three";

const MOD_PATH = "/models/globe.glb";

function Model() {
  const grpRef = useRef<Group>(null);
  const { scene } = useGLTF(MOD_PATH);

  useFrame((_, delta) => {
    if (grpRef.current) {
      grpRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={grpRef}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

function FbMesh() {
  const mshRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (mshRef.current) {
      mshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={mshRef}>
      <mesh>
        <torusGeometry args={[1.5, 0.004, 16, 100]} />
        <meshBasicMaterial color="#ffffff" opacity={0.25} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.002, 8, 80]} />
        <meshBasicMaterial color="#ffffff" opacity={0.08} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.002, 8, 80]} />
        <meshBasicMaterial color="#ffffff" opacity={0.06} transparent />
      </mesh>
    </group>
  );
}

function ScnCont({ hasMod }: { hasMod: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#aaaaff" />

      {hasMod ? (
        <Suspense fallback={<FbMesh />}>
          <Model />
        </Suspense>
      ) : (
        <FbMesh />
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </>
  );
}

interface GlbProps {
  hasMod?: boolean;
}

export default function GlobeModel({ hasMod = false }: GlbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,           // transparent background
        premultipliedAlpha: false,
      }}
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <ScnCont hasMod={hasMod} />
    </Canvas>
  );
}

