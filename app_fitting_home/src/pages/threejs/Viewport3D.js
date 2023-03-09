import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

const Viewport3D = () => {
	const url = "/Henry/Henry";

	useEffect(() => {
		let scene, camera, renderer, mixer, clock = new THREE.Clock();

		const init = () => {
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(
				15,
				window.innerWidth / window.innerHeight,
				0.1,
				30000
			);
			camera.position.z = 85;
			camera.position.x = 0;
			camera.position.y = 0;

			const canvas = document.querySelector('#c');
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
			spotLight.position.set(0, 64, 32);
			scene.add(spotLight);

			const controls = new OrbitControls(camera, renderer.domElement);
			controls.update();
		}

		const renderModel = (url) => {
			const mtlLoader = new MTLLoader();

			mtlLoader.load(`${url}.mtl`, (materials) => {
				materials.preload();
				const objLoader = new OBJLoader()

				objLoader.setMaterials(materials);
				objLoader.load(
					`${url}.obj`,
					(object) => {
						object.scale.set(0.011, 0.011, 0.011);
						object.position.y = -11;
						scene.add(object)
					},
					(xhr) => {
						console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
					},
					(error) => {
						console.log(error)
					}
				)
			});
		}

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
		}

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
		}

		init();
		renderModel(url);
		animate();
	}, []);

	return (
		<div className="container my-5">
			<canvas className="col-12" id="c" style={{ maxHeight: "450px"}}></canvas>
		</div>
	)
}

export default Viewport3D;