import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createTestCubeScene = (canvas) => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  const light1 = new THREE.DirectionalLight(0xffffff, 0.3);
  const light2 = new THREE.DirectionalLight(0xffffff, 0.3);
  const light3 = new THREE.DirectionalLight(0xffffff, 0.4);

  light1.position.set(0.5, 1, 1);
  light2.position.set(-0.65, 0.4, -0.17);
  light3.position.set(0, 0, 1);

  // -------- geometries -------- //
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  // -------- colors -------- //
  const cubeColor1 = new THREE.Color(0x00ffff);
  const cubeColor2 = new THREE.Color(0xff00ff);
  const cubeColor3 = new THREE.Color(0xffff00);

  // -------- materials -------- //
  const cubeMaterial1 = new THREE.MeshStandardMaterial({ color: cubeColor1 });
  const cubeMaterial2 = new THREE.MeshStandardMaterial({ color: cubeColor2 });
  const cubeMaterial3 = new THREE.MeshStandardMaterial({ color: cubeColor3 });
  
  // -------- meshes -------- //
  const cubeMesh1 = new THREE.Mesh(cubeGeometry, cubeMaterial1);
  const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial2);
  const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial3);

  cubeMesh1.position.set(-3, 0, 0);
  cubeMesh2.position.set(0, 0, 0);
  cubeMesh3.position.set(3, 0, 0);

  // -------- scene construction -------- //
  scene.add(light1);
  scene.add(light2);
  scene.add(light3);
  scene.add(cubeMesh1);
  scene.add(cubeMesh2);
  scene.add(cubeMesh3);
  camera.position.z = 10;

  const controls = new OrbitControls(camera, canvas);
  const cubeMeshes = [ cubeMesh1, cubeMesh2, cubeMesh3 ];
  
  // -------- animation -------- //
  const animation = (time) => {
    cubeMeshes.forEach((cubeMesh) => {
      cubeMesh.rotation.x += 0.01;
      cubeMesh.rotation.y += 0.005;
    });
    controls.update();
  }

  return { scene, camera, animation };
}

export default createTestCubeScene;