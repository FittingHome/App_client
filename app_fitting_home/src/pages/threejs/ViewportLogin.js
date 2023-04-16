import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import "../../style/form.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({});

const CanvasModel = styled("canvas")({
  height: 600,
  width: 600,
});

const ViewportLogin = ({ url }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [model, setModel] = useState(null);
  const containerRef = useRef(null);
  const canvasRef = useRef();
  console.log("url", url);

  useEffect(() => {
    async function loadFbxModel() {
      const loader = new FBXLoader();
      loader.load(url, (fbx) => {
        const scene = new THREE.Scene();
        scene.add(fbx);

        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const animate = function () {
          requestAnimationFrame(animate);

          fbx.rotation.x += 0.01;
          fbx.rotation.y += 0.01;

          renderer.render(scene, camera);
        };

        animate();
      });
    }

    loadFbxModel();
  }, []);
  return (
    <div>
      <div ref={canvasRef} />
    </div>
  );
};

export default ViewportLogin;
