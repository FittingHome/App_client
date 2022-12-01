// import {SFTPClient} from "../../../sftp.js";

const spinner = document.getElementById("spinner");
const noModel = document.getElementById("noModel");

var canContinue = false;
var modelList = {
  morphologie: "circle",
  isMale: true,
  weight: "70",
  height: "130",
  age: "12",
};
var dataApi;
var modelPath = "../assets/male.obj";
document.getElementById("myBtn").style.visibility = "hidden";

function defineGender(object) {
  if (object.value != "femme") modelList.isMale = true;
  else modelList.isMale = false;
}

function compareModels() {
  modelGender = [];
  modelWeight = [];
  modelheight = [];
  var weightMin = modelList.weight - 10;
  var weightMax = modelList.weight + 10;
  var heightMin = modelList.height - 10;
  var heightMax = modelList.height + 10;

  if (modelList.isMale == true) {
    console.log("----------", modelList.isMale);
    for (var i = 0; i < dataApi.length; i++) {
      if (dataApi[i].morphology.isMale == modelList.isMale) {
        modelGender.push(dataApi[i]);
      } else {
        console.log("gender no good");
        noModel.removeAttribute("hidden");
      }
    }
  } else if (modelList.isMale == false) {
    console.log("----------", modelList.isMale);
    for (var i; i < dataApi.length; i++) {
      if (dataApi[i].morphology.isMale == modelList.isMale) {
        modelGender.push(dataApi[i]);
      } else {
        console.log("gender no good");
        noModel.removeAttribute("hidden");
      }
    }
  }

  //////////////////

  if (modelList.weight) {
    console.log("----------", modelList.weight);
    for (var i = 0; i < modelGender.length; i++) {
      console.log(modelGender[i].morphology.weight);
      if (
        modelGender[i].morphology.weight >= weightMin &&
        modelGender[i].morphology.weight <= weightMax
      ) {
        modelWeight.push(modelGender[i]);
      } else {
        console.log("weight no good");
        noModel.removeAttribute("hidden");
      }
    }
  }
  //////////////////

  if (modelList.height) {
    for (var i = 0; i < modelWeight.length; i++) {
      if (
        modelWeight[i].morphology.height >= heightMin &&
        modelWeight[i].morphology.height <= heightMax
      ) {
        modelheight.push(modelWeight[i]);
        spinner.setAttribute("hidden", "");
      } else {
        console.log("height no good");
        noModel.removeAttribute("hidden");
      }
    }
    console.log("----------", modelList.height);
  }

  if (modelList.morphologie) {
    console.log("----------", modelList.morphologie);
  }
  if (modelList.age) {
    console.log("----------", modelList.age);
  }
  return modelheight;
}

function getModelFromId(modelId) {
  spinner.removeAttribute("hidden");

  fetch("http://api.fittinghome.fr/body/getByid/id?=" + modelId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      modelPathTd = data;
      console.log("data print by id :", modelPathTd);
      modelPath = modelPathTd;
      spinner.setAttribute("hidden", "");
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function getModels() {
  spinner.removeAttribute("hidden");

  fetch("http://api.fittinghome.fr/body/getAll")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log("data print :", data);
      dataApi = data;
      spinner.setAttribute("hidden", "");
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function defineMorpho(value) {
  modelList.morphologie = value;
}
function prevMorpho() {
  getModels();
  console.log(dataApi);
  var finalModels = [];
  var modelToDisp = [];

  /////////////////////////////////

  ////////////////////////////////////
  ////get final model

  if (dataApi) {
    document.getElementById("myBtn").style.visibility = "visible";

    finalModels = compareModels();

    console.log("final", finalModels);

    ////// assign path new model
    modelToDisp = finalModels[0];

    localStorage.setItem("modelToDisp", modelToDisp);

    ////////////////
    const images = [
      { image: "http://placekitten.com/400/307", id: "test" },
      { image: "http://placekitten.com/400/307", id: "test" },
      { image: "http://placekitten.com/400/307", id: "test" },
    ];
    localStorage.setItem("finalModels", JSON.stringify(images));
    // modelPath = modelToDisp.path;

    console.log(modelToDisp._id);
    modelId = modelToDisp._id;
    // getModelFromId(modelId)

    ////// search models choice
    finalModels.forEach((element) => {
      console.log(element);
    });
  } else {
    console.log("error : couldn't find data");
  }
}

/* global THREE */

function modelHandler() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 40;
  const aspect = 20; // the canvas default
  const near = 0.1;
  const far = 100;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(10, 15, 28);

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
      spinner.removeAttribute("hidden");

      const root = event.detail.loaderRootNode;
      scene.add(root);
      spinner.setAttribute("hidden", "");
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
modelHandler();

///////// get chosen item /////////////////////

function setIdModelDisp(object) {
  console.log(object.id);
  var modelChoose = object.id;
}
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
    modelList.height = object.value;
  }
  if (object.id === "numberWeight") {
    modelList.weight = object.value;
  }
}
