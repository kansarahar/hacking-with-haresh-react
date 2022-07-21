import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { DoublePendulumSystem } from '../utils/physics';

const createDoublePendulumScene = (canvas, renderer) => {
  // -------- set up double pendulum -------- //
  const doublePendulum = new DoublePendulumSystem([1, 0.5, 0, 0]);

  // -------- materials -------- //
  const material1 = new THREE.MeshPhysicalMaterial({
    color: 0xffd1dc,
    metalness: 1,
    roughness: 0.3,
    reflectivity: 1,
    clearcoat: 0
  });
  const material2 = new THREE.MeshPhysicalMaterial({
    color: 0xffd1dc,
    metalness: 1,
    roughness: 0.3,
    reflectivity: 1,
    clearcoat: 0
  });

  // -------- gui -------- //
  const gui = new GUI();
  const paramsFolder = gui.addFolder('Parameters');
  const material1Folder = gui.addFolder('Material 1');
  const material2Folder = gui.addFolder('Material 2');
  const pendulumParams = {
    'mass 1': doublePendulum.m1,
    'mass 2': doublePendulum.m2,
    'length 1': doublePendulum.l1,
    'length 2': doublePendulum.l2,
    'g': doublePendulum.g,
  };
  const material1Data = {
    'color 1': material1.color.getHex(),
    'roughness 1': material1.roughness,
    'metalness 1': material1.metalness,
    'reflectivity 1': material1.reflectivity,
    'clearcoat 1': material1.clearcoat,
  };
  const material2Data = {
    'color 2': material2.color.getHex(),
    'roughness 2': material2.roughness,
    'metalness 2': material2.metalness,
    'reflectivity 2': material2.reflectivity,
    'clearcoat 2': material2.clearcoat,
  };
  paramsFolder.add(pendulumParams, 'mass 1', 0.25, 2).step(0.25).onChange((mass) => doublePendulum.m1 = mass);
  paramsFolder.add(pendulumParams, 'mass 2', 0.25, 2).step(0.25).onChange((mass) => doublePendulum.m2 = mass);
  paramsFolder.add(pendulumParams, 'length 1', 0.25, 2).step(0.25).onChange((length) => doublePendulum.l1 = length);
  paramsFolder.add(pendulumParams, 'length 2', 0.25, 2).step(0.25).onChange((length) => doublePendulum.l2 = length);
  paramsFolder.add(pendulumParams, 'length 2', 0.25, 2).step(0.25).onChange((length) => doublePendulum.l2 = length);
  material1Folder.addColor(material1Data, 'color 1').onChange((color) => material1.color.setHex(color));
  material2Folder.addColor(material2Data, 'color 2').onChange((color) => material2.color.setHex(color));
  material1Folder.add(material1Data, 'roughness 1', 0, 1).step(0.01).onChange((roughness) => material1.roughness = roughness);
  material2Folder.add(material2Data, 'roughness 2', 0, 1).step(0.01).onChange((roughness) => material2.roughness = roughness);
  material1Folder.add(material1Data, 'metalness 1', 0, 1).step(0.01).onChange((metalness) => material1.metalness = metalness);
  material2Folder.add(material2Data, 'metalness 2', 0, 1).step(0.01).onChange((metalness) => material2.metalness = metalness);
  material1Folder.add(material1Data, 'reflectivity 1', 0, 1).step(0.01).onChange((reflectivity) => material1.reflectivity = reflectivity);
  material2Folder.add(material2Data, 'reflectivity 2', 0, 1).step(0.01).onChange((reflectivity) => material2.reflectivity = reflectivity);
  material1Folder.add(material1Data, 'clearcoat 1', 0, 1).step(0.01).onChange((clearcoat) => material1.clearcoat = clearcoat);
  material2Folder.add(material2Data, 'clearcoat 2', 0, 1).step(0.01).onChange((clearcoat) => material2.clearcoat = clearcoat);
  
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  
  const sphereGeometry = new THREE.SphereGeometry(0.2);
  const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16, 1, true);
  const sphereMesh1 = new THREE.Mesh(sphereGeometry, material1);
  const sphereMesh2 = new THREE.Mesh(sphereGeometry, material1);
  const cylinderMesh1 = new THREE.Mesh(cylinderGeometry, material1);
  const cylinderMesh2 = new THREE.Mesh(cylinderGeometry, material1);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.background = material2.color;
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  
  scene.add(sphereMesh1);
  scene.add(sphereMesh2);
  scene.add(cylinderMesh1);
  scene.add(cylinderMesh2);
  camera.position.z = 10;
  
  const controls = new OrbitControls(camera, canvas);
  
  // -------- animation -------- //
  const animation = (time) => {
    const [t1, t2, w1, w2] = doublePendulum.state;
    const [l1, l2] = [doublePendulum.l1, doublePendulum.l2];

    const sx1 = l1 * Math.sin(t1);
    const sy1 = l1 * Math.cos(t1);
    const sx2 = l1 * Math.sin(t1) + l2 * Math.sin(t2);
    const sy2 = l1 * Math.cos(t1) + l2 * Math.cos(t2);
    sphereMesh1.position.set(sx1, -sy1, 0);
    sphereMesh2.position.set(sx2, -sy2, 0);
    
    const cx1 = sx1 / 2;
    const cy1 = sy1 / 2;
    const cx2 = sx1 + 0.5 * l2 * Math.sin(t2);
    const cy2 = sy1 + 0.5 * l2 * Math.cos(t2);
    cylinderMesh1.rotation.z = t1;
    cylinderMesh2.rotation.z = t2;
    cylinderMesh1.scale.y = l1;
    cylinderMesh2.scale.y = l2;
    cylinderMesh1.position.set(cx1, -cy1, 0);
    cylinderMesh2.position.set(cx2, -cy2, 0);

    const nextState = doublePendulum.nextState(0.02);
    doublePendulum.setState(nextState);
    
    controls.update();
  }

  return { scene, camera, animation };
}

export default createDoublePendulumScene;
