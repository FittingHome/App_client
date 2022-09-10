let scene, camera, renderer, idle, mixer, clock = new THREE.Clock(), action;

init();
function init() {
    const canvas = document.querySelector('#c');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(15, window.innerWidth/window.innerHeight, 0.1, 30000);
    camera.position.z = 30;
    camera.position.x = 0;
    camera.position.y = -3;

    // Add lights
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    // Add hemisphere light to scene
    scene.add(hemiLight);

    let d = 8.25;
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 1500;
    dirLight.shadow.camera.left = d * -1;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = d * -1;
    // Add directional Light to scene
    scene.add(dirLight);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setClearColor(0xdddddd);


    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // var loaderGLTF = new THREE.GLTFLoader();

    // loaderGLTF.load("resources/model.glb",
    // function (gltf) {
    //   model = gltf.scene
    //   let fileAnimations = gltf.animations;
    //   model.scale.set(0.2, 0.2, 0.2);
    //   model.position.y = -3;

    //   scene.add(model);

    //   mixer = new THREE.AnimationMixer( gltf.scene );
    //   action = mixer.clipAction( gltf.animations[ 0 ] );
    // });
    

    // var loaderOBJ = new THREE.OBJLoader();

    // loaderOBJ.load('model.obj',
    // function (model) {

    //   model.scale.set(1, 1, 1);
    //   model.position.y = -10;

    //   scene.add(model);

    // });
}

function playAnimation() {
  action.play();
}

function stopAnimation() {
  action.stop();
}

initPrintModel();
function initPrintModel() {
  var loaderGLTF = new THREE.GLTFLoader();

    loaderGLTF.load("resources/model.glb",
    function (gltf) {
      model = gltf.scene
      let fileAnimations = gltf.animations;
      model.scale.set(0.2, 0.2, 0.2);
      model.position.y = -3;

      scene.add(model);

      mixer = new THREE.AnimationMixer( gltf.scene );
      action = mixer.clipAction( gltf.animations[ 0 ] );
    });
}

function printModel(id) {
  init();
  var loaderGLTF = new THREE.GLTFLoader();

    loaderGLTF.load(id,
    function (gltf) {
      model = gltf.scene
      let fileAnimations = gltf.animations;
      model.scale.set(0.2, 0.2, 0.2);
      model.position.y = -3;

      scene.add(model);

      mixer = new THREE.AnimationMixer( gltf.scene );
      action = mixer.clipAction( gltf.animations[ 0 ] );
    });
}

function resizeRendererToDisplaySize(renderer) {
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
}

function animate() {
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();



