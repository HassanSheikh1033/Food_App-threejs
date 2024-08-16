import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./pizza/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={4.2} groundColor='brown' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={2.5}
        color='purple'
        shadow-mapSize={1024}
      />
      <pointLight intensity={4.5} color='yellow' />
      <primitive
        object={computer.scene}
        scale={isMobile ? 10.3 : 12.80}
        position={isMobile ? [0, -2, -2.2] : [0, -3.25, -0.5]}
        rotation={isMobile ? [-0.01, -0.2, 0] : [-0.01, -0.2, 0]}
      />
    </mesh>
  );
};
// {}
const Pizza = () => {
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
          autoRotateSpeed={12}
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

export default Pizza;





