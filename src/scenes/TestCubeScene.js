import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createTestCubeScene = (canvas) => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0.5, 1, 1);

  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeColor = new THREE.Color(0x00ffff);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: cubeColor });

  
  // -------- meshes -------- //
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.position.set(0, 0, 0);


  // -------- scene construction -------- //
  scene.add(light);
  scene.add(cubeMesh);
  camera.position.z = 10;

  const controls = new OrbitControls(camera, canvas);
  
  // -------- animation -------- //
  const animation = (time) => {
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.005;
    controls.update();
  }

  return { scene, camera, animation };
}

export default createTestCubeScene;