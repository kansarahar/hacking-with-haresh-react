import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class AsteroidGeometry extends THREE.SphereBufferGeometry {
  // -------- modify geometry -------- //
  constructor(...args) {
    super(...args);
    const positions = this.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const [x, y, z] = [positions[i], positions[i+1], positions[i+2]];
  
      let r = Math.sqrt(x**2 + y**2 + z**2);
      let theta = Math.acos(y / r);
      let phi = (x !== 0) ? Math.atan2(z, x) : Math.sign(z) * Math.PI / 2;
      
      const maxRadialVariation = 0.2;
      const maxAngularVariation = 0.2;
      if (Math.abs(phi) < Math.PI - 0.2
        && Math.abs(theta) > 0.1
        && Math.abs(theta) < Math.PI - 0.1
      ) {
        r += (2 * Math.random() - 1) * maxRadialVariation;
        theta += (2 * Math.random() - 1) * maxAngularVariation;
        phi += (2 * Math.random() - 1) * maxAngularVariation;
      }
  
      positions[i] = r * Math.sin(theta) * Math.cos(phi);
      positions[i + 1] = r * Math.cos(theta);
      positions[i + 2] = r * Math.sin(theta) * Math.sin(phi);
  
    }
    // this.computeVertexNormals();
  }
}

const createAsteroidScene = (canvas) => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  const light1 = new THREE.DirectionalLight(0xffffff, 0.7);
  const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  light1.position.set(0.5, 1, 1);
  light2.position.set(-0.5, -1, -1);

  const color = new THREE.Color(0x00ffff);
  const material = new THREE.MeshStandardMaterial({ color: color, flatShading: false });


  const asteroidGeometry = new AsteroidGeometry(1, 6, 6);

  // -------- meshes -------- //
  const asteroidMesh = new THREE.Mesh(asteroidGeometry, material);
  asteroidMesh.scale.set((0.5) * Math.random() + 0.9, (0.5) * Math.random() + 0.9, (0.5) * Math.random() + 0.9)
  asteroidMesh.position.set(0, 0, 0);


  // -------- scene construction -------- //
  scene.add(light1);
  scene.add(light2);
  scene.add(ambientLight);
  scene.add(asteroidMesh);
  camera.position.z = 10;
  camera.position.y = 4;

  const controls = new OrbitControls(camera, canvas);
  
  // -------- animation -------- //
  const animation = (time) => {
    // asteroidMesh.rotation.x += 0.01;
    // asteroidMesh.rotation.y += 0.005;
    controls.update();
  }

  return { scene, camera, animation };
}

export default createAsteroidScene;