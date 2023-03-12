import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import "../../style/form.css";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({});

const CanvasModel = styled("canvas")({
  height: 600,
  width: 600,
});

const ViewportLogin = ({ url }) => {
  useEffect(() => {
    let scene,
      camera,
      renderer,
      mixer,
      clock = new THREE.Clock();

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        12,
        window.innerWidth / window.innerHeight,
        0.1,
        30000
      );
      camera.position.z = 15;
      camera.position.x = 0;
      camera.position.y = 0;

      const canvas = document.querySelector("#c");
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setClearColor(0xffffff);

      const ambientLight = new THREE.AmbientLight(0xdddddd, 0.3);
      ambientLight.castShadow = true;
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0xdddddd, 1);
      spotLight.castShadow = true;
      spotLight.position.set(20, 24, 12);
      scene.add(spotLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
    };

    const renderModel = (url) => {
      console.log(url + ".obj");

      const objLoader = new OBJLoader();

      objLoader.load(
        `${url}.obj`,
        (object) => {
          object.scale.set(0.1, 0.1, 0.1);
          object.position.y = -1;
          scene.add(object);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error);
        }
      );
    };

    const resizeRendererToDisplaySize = (renderer) => {
      const canvas = renderer.domElement;
      let width = window.innerWidth;
      let height = window.innerHeight;
      let canvasPixelWidth = canvas.width / window.devicePixelRatio;
      let canvasPixelHeight = canvas.height / window.devicePixelRatio;

      const needResize =
        canvasPixelWidth !== width || canvasPixelHeight !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    };

    const animate = () => {
      if (mixer) {
        mixer.update(clock.getDelta());
      }
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    init();
    renderModel(url);
    animate();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CanvasModel className="iframewrapper" id="c"></CanvasModel>
      </ThemeProvider>
    </div>
  );
};

export default ViewportLogin;
