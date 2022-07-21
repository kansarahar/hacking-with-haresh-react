import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const createNewtonCradleScene = (canvas, renderer) => {
  
  const physics = {
    rate: 3,
    maxAngle: 0.5,
  };
  
  const backgroundColor = new THREE.Color(0xfcfcfc);
  
  // -------- materials -------- //
  const ballMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8c8c8c,
    metalness: 1,
    roughness: 0.1,
    reflectivity: 0,
    clearcoat: 0,
  });
  const platformMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1c1c1c,
    metalness: 0.2,
    roughness: 1,
    reflectivity: 0,
    clearcoat: 0.2,
  });
  const stringMaterial = new THREE.LineBasicMaterial({
    color: 0xa6a6a6,
    linewidth: 1,
  });

  // -------- gui -------- //
  // const gui = new GUI();
  // const physicsFolder = gui.addFolder('Physics');
  // const backgroundFolder = gui.addFolder('Background');
  // const ballMaterialFolder = gui.addFolder('Ball Material');
  // const platformMaterialFolder = gui.addFolder('Platform Material');
  // const stringMaterialFolder = gui.addFolder('String Material');

  // const backgroundData = {
  //   'color': backgroundColor.getHex(),
  // };
  // const ballMaterialData = {
  //   'color': ballMaterial.color.getHex(),
  //   'roughness': ballMaterial.roughness,
  //   'metalness': ballMaterial.metalness,
  //   'reflectivity': ballMaterial.reflectivity,
  //   'clearcoat': ballMaterial.clearcoat,
  // };
  // const platformMaterialData = {
  //   'color': platformMaterial.color.getHex(),
  //   'roughness': platformMaterial.roughness,
  //   'metalness': platformMaterial.metalness,
  //   'reflectivity': platformMaterial.reflectivity,
  //   'clearcoat': platformMaterial.clearcoat,
  // };
  // const stringMaterialData = {
  //   'color': stringMaterial.color.getHex(),
  //   'linewidth': stringMaterial.linewidth,
  // };

  // const ballMaterialInfo = { folder: ballMaterialFolder, data: ballMaterialData, material: ballMaterial };
  // const platformMaterialInfo = { folder: platformMaterialFolder, data: platformMaterialData, material: platformMaterial };
  // const stringMaterialInfo = { folder: stringMaterialFolder, data: stringMaterialData, material: stringMaterial };

  // physicsFolder.add(physics, 'rate', 0, 10).step(0.1);
  // physicsFolder.add(physics, 'maxAngle', 0, Math.PI/2).step(0.1);
  // backgroundFolder.addColor(backgroundData, 'color').onChange(color => backgroundColor.setHex(color));
  // [ballMaterialInfo, platformMaterialInfo].forEach((info) => {
  //   const { folder, data, material } = info;
  //   folder.addColor(data, 'color').onChange(color => material.color.setHex(color));
  //   folder.add(data, 'roughness', 0, 1).step(0.01).onChange(roughness => material.roughness = roughness);
  //   folder.add(data, 'metalness', 0, 1).step(0.01).onChange(metalness => material.metalness = metalness);
  //   folder.add(data, 'reflectivity', 0, 1).step(0.01).onChange(reflectivity => material.reflectivity = reflectivity);
  //   folder.add(data, 'clearcoat', 0, 1).step(0.01).onChange(clearcoat => material.clearcoat = clearcoat);
  // });
  // stringMaterialInfo.folder.addColor(stringMaterialInfo.data, 'color').onChange(color => stringMaterialInfo.material.color.setHex(color));
  // stringMaterialInfo.folder.add(stringMaterialInfo.data, 'linewidth', 0, 10).step(0.01).onChange(linewidth => stringMaterialInfo.material.linewidth = linewidth);
  

  // -------- scene -------- //
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  
  const sphereGeometry = new THREE.SphereGeometry(1);
  const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8, 1, true);
  const boxGeometry = new RoundedBoxGeometry(12, 1, 6, 2, 0.2);
  const arcCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-1, -1, 0), new THREE.Vector3(-1, 1, 0), new THREE.Vector3(1, 1, 0))
  const arcGeometry = new THREE.TubeGeometry(arcCurve, 16, 0.2, 8);

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
  [[3.2, 8, 0], [-3.2, 8, 0], [1.6, 8, 0], [-1.6, 8, 0], [0, 8, 0]].forEach((i) => {
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

  const ball1 = ballComponents[0];
  const ball2 = ballComponents[1];

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.background = backgroundColor;
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  
  scene.add(cradle);
  camera.position.z = 14;
  camera.position.y = 8;
  camera.position.x = -7;
  
  const controls = new OrbitControls(camera, canvas);
  
  // -------- animation -------- //
  let rotation = 0;
  const animation = (time) => {
    rotation = physics.maxAngle * Math.sin(time * 0.001 * physics.rate);
    ball1.rotation.z = rotation > 0 ? rotation : 0;
    ball2.rotation.z = rotation < 0 ? rotation : 0;
    controls.update();
  }

  return { scene, camera, animation };
}

export default createNewtonCradleScene;
