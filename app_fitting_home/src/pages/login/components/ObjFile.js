import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const Scene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 40;
    const aspect = 20; // the canvas default
    const near = 0.1;
    const far = 100;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(10, 15, 28);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 11, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#cacaca");

    {
      const skyColor = 0xffffff; // light blue
      const groundColor = 0xb97a20; // brownish orange
      const intensity = 1.2;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    {
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 0);
      light.target.position.set(4, 2, 2);
      scene.add(light);
      scene.add(light.target);
    }

    {
      const objLoader = new OBJLoader();
      // console.log("morphologie");

      objLoader.load("../../../../male.obj", (event) => {
        const root = event.detail.loaderRootNode;
        scene.add(root);
      });
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);

  return <canvas id="c" ref={canvasRef} />;
};

export default Scene;
