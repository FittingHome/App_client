import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const launchThreeJs = (modelFilename) => {
  let scene,
      camera,
      renderer,
      mixer,
      clock = new THREE.Clock();

    const init = () => {
      scene = new THREE.Scene();
      // scene.scale.set(0.2, 0.2, 0.2);

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );
      camera.position.z = 300;
      camera.position.x = 0;
      camera.position.y = 200;

      const canvas = document.querySelector("#c");
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setClearColor(0xffffff);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      ambientLight.castShadow = true;
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.castShadow = true;
      spotLight.position.set(1000000, 64, 32);
      scene.add(spotLight);

      // scene.add(new THREE.AxesHelper(3))
      scene.add(new THREE.GridHelper(200, 50))

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
    };

    const renderModel = async (id) => {
      const response = await fetch(
        `http://91.172.40.53:8080/model?folder=bodies&filename=${id}`
      );
      const buffer = await response.arrayBuffer();
      console.log("buffer: ", response);
      const loader = new FBXLoader();
      const object = loader.parse(buffer, "");
      console.log({object})
      object.scale.set(0.1, 0.1, 0.1)

      scene.add(object);
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
    renderModel(modelFilename);
    animate();
}

const Viewport3D = ({ url }) => {
  useEffect(() => {
    if (!url) return

    launchThreeJs(url + ".fbx")
  }, [url]);

  return (
    <div className="container my-5">
      <canvas
        className="col-12"
        id="c"
        style={{ maxHeight: "600px", height: "450px" }}
      ></canvas>
    </div>
  );
};

export default Viewport3D;
