// 1. Three.jsライブラリの読み込み
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const path = "/grbs/animation_section03_01.glb";

window.addEventListener("DOMContentLoaded", init);
async function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas"),
        antialias: true
    });

    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setSize(window.innerWidth, window.innerHeight);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnviroment = new RoomEnvironment();

    const scene = new THREE.Scene();
    scene.environment = pmremGenerator.fromScene(roomEnviroment, 0.04).texture;

    // 3dオブジェクトを読み込み
    const loader = new GLTFLoader();
    const objects = await loader.loadAsync(path);

    //　環境光の追加？？
    scene.add(objects.scene);

    // 画面に表示
    renderer.render(scene, objects.cameras[0]);

}
