let scene, camera, renderer, idle, mixer, clock = new THREE.Clock(), action;

function init() {
    const canvas = document.querySelector('#c');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(15, window.innerWidth/window.innerHeight, 0.1, 30000);
    camera.position.z = 800;
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
}


/**
 * 
 * @param {string} name - Doit correspondre à des nom de dossier dans resources/ et le dossier en question doit contenir un .mtl et un .obj du même nom
 */
function renderModel(name) {
  var mtlLoader = new THREE.MTLLoader();

  const modelFolder = `resources/${name}`

  mtlLoader.load(`${modelFolder}/${name}.mtl`, function (materials) {
    materials.preload();
    var loaderOBJ = new THREE.OBJLoader();

    loaderOBJ.setMaterials(materials);
    loaderOBJ.load(`${modelFolder}/${name}.obj`,
      function (model) {

        model.scale.set(0.1, 0.1, 0.1);
        model.position.y = -100;

        scene.add(model);
      });
  });
}

/**
 * resources/${modelName}/garments/${garmentName}/${garmentName}.mtl/obj
 * @param {string} modelName
 * @param {string} garmentName
 */
function renderModelGarment(modelName, garmentName) {
  var mtlLoader = new THREE.MTLLoader();

  const garmentFolder = `resources/${modelName}/garments/${garmentName}`

  mtlLoader.load(`${garmentFolder}/${garmentName}.mtl`, function (materials) {
    materials.preload();
    var loaderOBJ = new THREE.OBJLoader();

    loaderOBJ.setMaterials(materials);
    loaderOBJ.load(`${garmentFolder}/${garmentName}.obj`,
      function (model) {
        model.name = garmentName;
        model.scale.set(0.1, 0.1, 0.1);
        model.position.y = -100;

        scene.add(model);
      });
  });
}

function removeGarments() {
  scene.remove(scene.getObjectByName(topGarmentName));
  scene.remove(scene.getObjectByName(downGarmentName));
  topGarmentName = null;
  downGarmentName = null;
  localStorage.removeItem('topGarmentName');
  localStorage.removeItem('downGarmentName');
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

init();
renderModel(modelName);

if (topGarmentName != null) {
  setTimeout(() => renderModelGarment(modelName, topGarmentName), 2000);
}

if (downGarmentName != null) {
  setTimeout(() => renderModelGarment(modelName, downGarmentName), 2000);
}
animate();