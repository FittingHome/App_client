import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Viewport3DLogin = ({ url }) => {
  const modelId = url + ".fbx";
  console.log(modelId);

  useEffect(() => {
    let scene,
      camera,
      renderer,
      mixer,
      clock = new THREE.Clock();

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        2,
        300
      );
      camera.position.set(1, 1, 4);
      scene.scale.set(0.02, 0.02, 0.02);

      // camera.lookAt(0, 0, 0);

      const canvas = document.querySelector("#c");
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setClearColor(0xffffff);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      ambientLight.castShadow = true;
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.castShadow = true;
      spotLight.position.set(1000000, 64, 32);
      scene.add(spotLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
    };

    const renderModel = async (id) => {
      const response = await fetch(
        `http://91.172.40.53:8080/model?folder=bodies&filename=${id}`
      );
      const buffer = await response.arrayBuffer();

      const loader = new FBXLoader();
      const object = loader.parse(buffer, "");
      object.position.y = -70;

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
    renderModel(modelId);
    animate();
  }, [url]);

  return (
    <Grid
      item
      xs={6}
      sx={{
        minWidth: 200,
        "@media (max-width:600px)": {
          visibility: "hidden",
        },
      }}
    >
      {url ? (
        <div className="container my-5">
          <canvas
            className="col-12"
            id="c"
            style={{ maxHeight: "600px", height: "500px" }}
          ></canvas>
        </div>
      ) : (
        <Typography
          sx={{ fontSize: 12 }}
          color="text.secondary"
          gutterBottom
          align="center"
        >
          <p>Votre model s'affichera ici.</p>
        </Typography>
      )}
    </Grid>
  );
};

export default Viewport3DLogin;
