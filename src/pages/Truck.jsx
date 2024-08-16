import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./truck/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={17.2} groundColor='blue' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={2.5}
        color='purple'
        shadow-mapSize={1024}
      />
      <pointLight intensity={48.5} color='orange' />
      <primitive
        object={computer.scene}
        scale={isMobile ? 2.3 : 3.80}
        position={isMobile ? [0, -1, -2.2] : [0, -0.25, -0.5]}
        rotation={[-0.01, -0.2, 0]}
      />
    </mesh>
  );
};

const PizzaTruck = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PizzaTruck;
