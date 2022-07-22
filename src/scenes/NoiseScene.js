import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Perlin2D } from '../utils/Noise';

const createNoiseScene = (canvas) => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0.5, 1, 1);

  const planeGeometry = new THREE.PlaneGeometry(5, 5, 20, 20);
  const planeColor = new THREE.Color(0x00ffff);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: planeColor });

  // -------- modify geometry -------- //
  const perlinSampler = new Perlin2D();
  planeGeometry.rotateX(-Math.PI/2);
  const positions = planeGeometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3 ) {
    console.log(positions[i]);
    const [x, y, z] = [positions[i], positions[i+1], positions[i+2]];
    const height = perlinSampler.sample(x, z);
    positions[i+1] = height;
    // console.log(height);
  }
  planeGeometry.computeVertexNormals();


  // -------- meshes -------- //
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.position.set(0, 0, 0);


  // -------- scene construction -------- //
  scene.add(light);
  scene.add(planeMesh);
  camera.position.z = 10;
  camera.position.y = 4;

  const controls = new OrbitControls(camera, canvas);
  
  // -------- animation -------- //
  const animation = (time) => {
    controls.update();
  }

  return { scene, camera, animation };
}

export default createNoiseScene;