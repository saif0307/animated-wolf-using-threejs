import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene;
let camera;
let renderer;
let controls;
let model, idleAction;
let clock;
let mixer;
let wolf;
let width = window.innerWidth;
let height = window.innerHeight;
let runAction;

const init = () => {
	// Scene
	scene = new Three.Scene();
	scene.background = new Three.Color(0x00000d);

	// Camera
	camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);
	// console.log(camera);
	camera.position.set(0, 0, 2);
	scene.add(camera);

	// Renderer
	renderer = new Three.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
	document.body.appendChild(renderer.domElement);

	//  Orbit controls
	const controls = new OrbitControls(camera, renderer.domElement);
	// controls.target.set(scene.position);

	// camera.position.z = 5;

	// Ambient Light
	const ambientLight = new Three.AmbientLight(0xffff00, 1);
	scene.add(ambientLight);

	// Clock
	clock = new Three.Clock();

	// Directional Light
	const directionalLight = new Three.DirectionalLight(0xfffff0, 15);
	directionalLight.position.set(0, 100, 1);
	scene.add(directionalLight);

	// Directional Light2
	const directionalLight2 = new Three.DirectionalLight(0xffffff, 15);
	directionalLight2.position.set(10, -10, 10);
	scene.add(directionalLight2);

	// Model
	const loader = new GLTFLoader();
	loader.load("assets/wolf/scene.gltf", (gltf) => {
		wolf = gltf.scene.children[0];
		wolf.castShadow = true;
		wolf.scale.set(1.5, 1.5, 1.5);
		wolf.rotation.z = Math.PI / 1.5;

		scene.add(gltf.scene);

		// Animation setup
		let playing = false;
		mixer = new Three.AnimationMixer(gltf.scene);
		console.log(gltf.animations);
		runAction = () => {
			playing = !playing ? true : false;
			if (playing) {
				mixer.clipAction(gltf.animations[0]).play();
				animate();
			} else {
				mixer.clipAction(gltf.animations[0]).stop();
			}
		};
		document.querySelector(".action-1").addEventListener("click", runAction);

		let walkAction = () => {
			playing = !playing ? true : false;
			if (playing) {
				mixer.clipAction(gltf.animations[1]).play();
				animate();
			} else {
				mixer.clipAction(gltf.animations[1]).stop();
			}
		};
		document.querySelector(".action-2").addEventListener("click", walkAction);

		let creepAction = () => {
			playing = !playing ? true : false;
			if (playing) {
				mixer.clipAction(gltf.animations[2]).play();
				animate();
			} else {
				mixer.clipAction(gltf.animations[2]).stop();
			}
		};

		document.querySelector(".action-3").addEventListener("click", creepAction);

		let idleAction = () => {
			playing = !playing ? true : false;
			if (playing) {
				mixer.clipAction(gltf.animations[3]).play();
				animate();
			} else {
				mixer.clipAction(gltf.animations[3]).stop();
			}
		};
		document.querySelector(".action-4").addEventListener("click", idleAction);

		let siteAction = () => {
			playing = !playing ? true : false;
			if (playing) {
				mixer.clipAction(gltf.animations[4]).play();
				animate();
			} else {
				mixer.clipAction(gltf.animations[4]).stop();
			}
		};
		document.querySelector(".action-5").addEventListener("click", siteAction);

		// mixer.clipAction(gltf.animations[3]).stop();

		// .forEach((clip) => {
		// 	console.log(mixer.clipAction(clip));
		// 	mixer.clipAction(clip).play();
		// });
		animate();
	});
	animate();
};

const animate = () => {
	let delta = clock.getDelta();

	if (mixer) mixer.update(delta);
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

init();
