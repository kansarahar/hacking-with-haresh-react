import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const backgroundColor = new THREE.Color(0xfcfcfc);

const createShadowTexture = () => {
  const dim = 128;
  const size = dim ** 2;
  const data = new Uint8Array(4 * size);
  const initialColor = 180/255, finalColor = backgroundColor.r;
  for (let i = 0; i < size; i++) {
    const y = 2 * (i - i % dim) / dim**2 - 1;
    const x = 2 * (i % dim) / dim - 1;
    const p = Math.sqrt(x**4 + y**4);
    let c = (finalColor - initialColor) * p + initialColor;
    if (c > finalColor) { c = finalColor; }
    if (c < initialColor) { c = initialColor; }
    const stride = i * 4;
    data[ stride ] = Math.floor(c * 255); // r
    data[ stride + 1 ] = Math.floor(c * 255);; // g
    data[ stride + 2 ] = Math.floor(c * 255);; // b
    data[ stride + 3 ] = 255; // a
  }
  const texture = new THREE.DataTexture(data, dim, dim);
  texture.needsUpdate = true;
  return texture;
}

const createNewtonCradleScene = (canvas, renderer) => {
  
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envMap = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  
  
  
  // -------- scene -------- //
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  
  scene.background = backgroundColor;
  
  // -------- materials -------- //
  const ballMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8c8c8c,
    metalness: 1,
    roughness: 0.1,
    reflectivity: 0,
    clearcoat: 0,
    envMap
  });
  const platformMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1c1c1c,
    metalness: 0.2,
    roughness: 1,
    reflectivity: 0,
    clearcoat: 0.2,
    envMap
  });
  const stringMaterial = new THREE.LineBasicMaterial({
    color: 0xa6a6a6,
    linewidth: 1,
  });

  // -------- geometry -------- //
  const sphereGeometry = new THREE.SphereGeometry(1);
  const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8, 1, true);
  const boxGeometry = new RoundedBoxGeometry(12, 1, 6, 2, 0.2);
  const arcCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-1, -1, 0), new THREE.Vector3(-1, 1, 0), new THREE.Vector3(1, 1, 0));
  const arcGeometry = new THREE.TubeGeometry(arcCurve, 16, 0.2, 8);

  // -------- cradle -------- //
  const cradle = new THREE.Group();
  cradle.position.set(0, -2, 0);
  const platform = new THREE.Mesh(boxGeometry, platformMaterial);
  platform.position.set(0, -0.5, 0);
  const rails = new THREE.Group();
  cradle.add(platform);
  [[6, 3, 3], [6, 3, -3], [-6, 3, 3], [-6, 3, -3]].forEach((i) => {
    const support = new THREE.Mesh(cylinderGeometry, platformMaterial);
    support.position.set(...i);
    support.scale.set(1, 6, 1);
    rails.add(support);
  });
  [[0, 8, 3], [0, 8, -3]].forEach((i) => {
    const support = new THREE.Mesh(cylinderGeometry, platformMaterial);
    support.position.set(...i);
    support.scale.set(1, 8, 1);
    support.rotation.set(0, 0, Math.PI/2);
    rails.add(support);
    const leftArc = new THREE.Mesh(arcGeometry, platformMaterial);
    const rightArc = new THREE.Mesh(arcGeometry, platformMaterial);
    rightArc.rotation.set(0, Math.PI, 0);
    leftArc.position.set(-5, i[1]-1, i[2]);
    rightArc.position.set(5, i[1]-1, i[2]);
    rails.add(leftArc);
    rails.add(rightArc);
  });
  cradle.add(rails);
  rails.scale.set(0.8, 0.8, 0.8);

  const stringPoints = [new THREE.Vector3(0, 6, 3), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 6, -3)];
  const stringGeometry = new THREE.BufferGeometry().setFromPoints(stringPoints);

  const ballComponents = [];
  [[3.2, 8, 0], [1.6, 8, 0], [0, 8, 0], [-1.6, 8, 0],  [-3.2, 8, 0]].forEach((i) => {
    const ballComponent = new THREE.Group();
    ballComponents.push(ballComponent);
    const ball = new THREE.Mesh(sphereGeometry, ballMaterial);
    ball.scale.set(0.8, 0.8, 0.8);
    ball.position.set(0, -6, 0);
    ballComponent.add(ball);
    const string = new THREE.Line(stringGeometry, stringMaterial);
    string.position.set(0, -6, 0);
    ballComponent.add(string);
    ballComponent.position.set(...i);
    ballComponent.rotation.set(0, 0, 0);
    rails.add(ballComponent);
  });

  const [ball1, ball2, ball3, ball4, ball5] = ballComponents;

  // -------- shadow -------- //
  const shadowTexture = createShadowTexture();
  const shadowGeometry = new THREE.PlaneGeometry();
  const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: shadowTexture });
  const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.scale.set(13, 7, 7);
  shadowMesh.position.y = -5;
  
  scene.add(cradle);
  scene.add(shadowMesh);
  camera.position.z = 14;
  camera.position.y = 8;
  camera.position.x = -7;
  
  const controls = new OrbitControls(camera, canvas);
  
  // -------- animation -------- //
  let rotation = 0;
  const animation = (time) => {
    rotation = 0.5 * Math.sin(time * 0.001 * 3);
    ball1.rotation.z = rotation > 0 ? rotation : 0;
    ball5.rotation.z = rotation < 0 ? rotation : 0;
    controls.update();
  }

  const destroy = () => {
    ballMaterial.dispose();
    platformMaterial.dispose();
    stringMaterial.dispose();
    shadowMaterial.dispose();

    sphereGeometry.dispose();
    cylinderGeometry.dispose();
    boxGeometry.dispose();
    arcGeometry.dispose();
    stringGeometry.dispose();
    shadowGeometry.dispose();

    shadowTexture.dispose();

    controls.dispose();
  }

  return { scene, camera, animation, destroy };
}

export default createNewtonCradleScene;
