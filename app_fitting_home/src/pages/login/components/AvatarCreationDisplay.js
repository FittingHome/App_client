import React, { useState, Suspense } from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import { HDRCubeTextureLoader } from "three/examples/jsm/loaders/HDRCubeTextureLoader";
import { OrbitControls, Html, useGLTF, useTexture } from "@react-three/drei";

function Model(props) {
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Environment({ background = false }) {
  const { gl, scene } = useThree();
  const [cubeMap] = useLoader(
    HDRCubeTextureLoader,
    [["px.hdr", "nx.hdr", "py.hdr", "ny.hdr", "pz.hdr", "nz.hdr"]],
    (loader) => {
      loader.setDataType(THREE.UnsignedByteType);
      loader.setPath("/pisaHDR/");
    }
  );
  useEffect(() => {
    const gen = new THREE.PMREMGenerator(gl);
    gen.compileEquirectangularShader();
    const hdrCubeRenderTarget = gen.fromCubemap(cubeMap);
    cubeMap.dispose();
    gen.dispose();
    if (background) scene.background = hdrCubeRenderTarget.texture;
    scene.environment = hdrCubeRenderTarget.texture;
    return () => (scene.environment = scene.background = null);
  }, [cubeMap]);
  return null;
}
// useGLTF.preload("../../../../assets/male.obj");

function AvatarCreationDisplay() {
  return (
    <Canvas
      colorManagement={true}
      invalidateFrameloop
      pixelRatio={[1, 2]}
      camera={{ position: [0, 0, 2.75] }}
    >
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <OrbitControls
        enableDamping
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.05}
        rotateSpeed={1.1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.5}
      />
      <Suspense fallback={<Html>loading..</Html>}>
        {/* <Environment /> */}
        <Model />
      </Suspense>
    </Canvas>
  );
}

export default AvatarCreationDisplay;
