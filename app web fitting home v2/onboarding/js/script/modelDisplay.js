("use strict");

var modelList = {
  morphologie: "fat",
  gender: "woman",
  weight: "110",
  size: "180",
  age: "12",
};
var dataApi = [];

var modelPath = "../assets/male.obj";

function defineGender(object) {
  modelList.gender = object.value;
}

function compareModels() {
  modelGender = [];
  modelWeight = [];
  modelSize = [];
  var weightMin = modelList.weight - 10;
  var weightMax = modelList.weight + 10;
  var sizeMin = modelList.size - 10;
  var sizeMax = modelList.size + 10;

  if (modelList.gender) {
    console.log("----------", modelList.gender);
    for (var i; i <= data.length; i++) {
      if (data[i].gender == modelList.gender) {
        modelGender.push(data[i]);
      }
      console.log(data[i].gender);
    }
    console.log(data[i].gender);
  }

  //////////////////

  if (modelList.weight) {
    console.log("----------", modelList.weight);
    for (var i; i <= modelGender.length; i++) {
      if (
        modelGender[i].weight >= weightMin &&
        modelGender[i].weight <= weightMax
      ) {
        modelWeight.push(modelGender[i]);
      }
      console.log(modelWeight[i].weight);
    }
    console.log(modelWeight);
  }
  //////////////////

  if (modelList.size) {
    for (var i; i <= modelWeight.length; i++) {
      if (
        modelWeight[i].weight >= sizeMin &&
        modelWeight[i].weight <= sizeMax
      ) {
        modelSize.push(modelWeight[i]);
      }
      console.log(modelSize[i].weight);
    }
    console.log(modelSize);
    console.log("----------", modelList.size);
  }

  if (modelList.morphologie) {
    console.log("----------", modelList.morphologie);
    // for (var i; i <= modelWeight.length; i++) {
    //   if (
    //     modelWeight[i].weight >= sizeMin &&
    //     modelWeight[i].weight <= sizeMax
    //   ) {
    //     modelSize.push(modelWeight[i]);
    //   }
    //   console.log(modelSize[i].weight);
    // }
  }
  if (modelList.age) {
    console.log("----------", modelList.age);
  }
  return modelSize;
}

document.getElementById("myBtn").style.visibility="hidden";  

var modelId = 0

function getModelFromId() {
  fetch("http://api.fittinghome.fr/body/getByid/" + modelId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      modelPathTd = data;
      console.log("data print :", modelPathTd);
      modelPath = modelPathTd
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

var canContinue = false
function prevMorpho() {
  console.log(dataApi);
  var finalModels = [];
  var modelToDisp = [];

  ////get final model
  document.getElementById("myBtn").style.visibility="visible";  
  console.log("myBtn")
  
  finalModels = compareModels();

  ////// assign path new model
  modelToDisp = finalModels[0];
  // modelPath = modelToDisp.path;

  console.log(finalModels.id)
  modelId = modelToDisp[0].id
  getModelFromId()
  // getModels();

  ////// search models choice
  finalModels.forEach((element) => {
    console.log(element);
  });

}


function getModels() {
  fetch("http://api.fittinghome.fr/body/getAll")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      dataApi = data;
      console.log("data print :", data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function defineMorpho(value) {
  modelList.morphologie = value;
}

/* global THREE */

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 40;
  const aspect = 20; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(10, 15, 35);

  const controls = new THREE.OrbitControls(camera, canvas);
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
    const objLoader = new THREE.OBJLoader2();
    // console.log("morphologie");

    if (window.morphologie) console.log(morphologie);
    objLoader.load(modelPath, (event) => {
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
}
main();



////////////////////

function maxLengthCheck(object) {
  console.log(object.id);
  if (object.value.length > object.maxLength && object.value.length < 1) {
    object.value = object.value.slice(0, object.maxLength);
  }
  if (parseInt(object.value) >= parseInt(object.max)) {
    object.value = object.max;
  }
  if (parseInt(object.value) <= parseInt(object.min)) {
    object.value = object.min;
  }
  if (object.id === "numberSize") {
    modelList.morphologie = object.value;
  }
  if (object.id === "numberAge") {
    modelList.age = object.value;
  }
  if (object.id === "numberSize") {
    modelList.size = object.value;
  }
  if (object.id === "numberWeight") {
    modelList.weight = object.value;
  }
}
