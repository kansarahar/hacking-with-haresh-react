import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import Room from '../assets/models/Room/Room.glb';
import FeltTexture from '../assets/images/textures/felt.jpg';
import WoodGrainTexture from '../assets/images/textures/wood_grain.jpg';
import FloorTexture from '../assets/images/textures/floor_tile_texture.jpg';


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

  const environment = new THREE.Scene();
  const envPointLight = new THREE.PointLight(0xffffff, 5, 28, 2);
  envPointLight.position.set(0.418, 5.199, 0.300);
  environment.add(envPointLight);
  const boxGeometry = new THREE.BoxBufferGeometry();
  const boxMaterial = new THREE.MeshStandardMaterial();
  const room = new THREE.Mesh( boxGeometry,  boxMaterial);
  room.position.set( - 0.757, 13.219, 0.717 );
  room.scale.set( 31.713, 28.305, 28.591 );
  environment.add( room );

  const box1 = new THREE.Mesh( boxGeometry, boxMaterial );
  box1.position.set( - 10.906, 2.009, 1.846 );
  box1.rotation.set( 0, - 0.195, 0 );
  box1.scale.set( 2.328, 7.905, 4.651 );
  environment.add( box1 );

  const box2 = new THREE.Mesh( boxGeometry, boxMaterial );
  box2.position.set( - 5.607, - 0.754, - 0.758 );
  box2.rotation.set( 0, 0.994, 0 );
  box2.scale.set( 1.970, 1.534, 3.955 );
  environment.add( box2 );

  const box3 = new THREE.Mesh( boxGeometry, boxMaterial );
  box3.position.set( 6.167, 0.857, 7.803 );
  box3.rotation.set( 0, 0.561, 0 );
  box3.scale.set( 3.927, 6.285, 3.687 );
  environment.add( box3 );

  const box4 = new THREE.Mesh( boxGeometry, boxMaterial );
  box4.position.set( - 2.017, 0.018, 6.124 );
  box4.rotation.set( 0, 0.333, 0 );
  box4.scale.set( 2.002, 4.566, 2.064 );
  environment.add( box4 );

  const box5 = new THREE.Mesh( boxGeometry, boxMaterial );
  box5.position.set( 2.291, - 0.756, - 2.621 );
  box5.rotation.set( 0, - 0.286, 0 );
  box5.scale.set( 1.546, 1.552, 1.496 );
  environment.add( box5 );

  const box6 = new THREE.Mesh( boxGeometry, boxMaterial );
  box6.position.set( - 2.193, - 0.369, - 5.547 );
  box6.rotation.set( 0, 0.516, 0 );
  box6.scale.set( 3.875, 3.487, 2.986 );
  environment.add( box6 );


  // -x right
  const envlight1 = new THREE.Mesh( boxGeometry, new THREE.MeshBasicMaterial({ color: 0x323232 }) );
  envlight1.position.set( - 16.116, 14.37, 8.208 );
  envlight1.scale.set( 0.1, 2.428, 2.739 );
  environment.add( envlight1 );


  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  
  const sphereGeometry = new THREE.SphereGeometry(1);
  const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8, 1, true);
  const roundedBoxGeometry = new RoundedBoxGeometry(12, 1, 6, 2, 0.2);
  const arcCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-1, -1, 0), new THREE.Vector3(-1, 1, 0), new THREE.Vector3(1, 1, 0))
  const arcGeometry = new THREE.TubeGeometry(arcCurve, 16, 0.2, 8);

  const cradle = new THREE.Group();
  cradle.position.set(0, -2, 0);
  const platform = new THREE.Mesh(roundedBoxGeometry, platformMaterial);
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

  const textureLoader = new THREE.TextureLoader();
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(Room, (gltf) => {
    const room = gltf.scene;
    const vase = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.05, 0.05, 0.3, 16, 1, true));
    vase.position.set(0.85, 0.9, 0.65);
    const table = room.getObjectByName('table_Material5001_0');
    const carpet = room.getObjectByName('carpet_Carpet__0');
    const flooring = room.getObjectByName('floor_floor_0');
    const seatLeather = room.getObjectByName('seat_Leather_0');
    const flower1 = room.getObjectByName('flower_leaf1_0');
    const flower2 = room.getObjectByName('flower_leaf2_0');
    const wall = room.getObjectByName('house_Material009_0');
    const cabinets = room.getObjectByName('cabinet_Material015_0');
    const faucet = room.getObjectByName('faucet_Material006_0');
    const cuttingBoard1 = room.getObjectByName('chopping_board1_Material1_0');
    const cuttingBoard2 = room.getObjectByName('chopping_board2_Material2_0');

    const tableUVs = table.geometry.attributes.uv.array;
    const flooringUVs = flooring.geometry.attributes.uv.array;
    tableUVs.forEach((value, idx) => { tableUVs[idx] *= 1.75; });
    textureLoader.load(FeltTexture, (texture) => {
      carpet.material = new THREE.MeshStandardMaterial({ map: texture });
    });
    textureLoader.load(WoodGrainTexture, (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const woodGrainMaterial = new THREE.MeshStandardMaterial({ map: texture });
      table.material = woodGrainMaterial;
      cuttingBoard1.material = woodGrainMaterial;
      cuttingBoard2.material = woodGrainMaterial;
    });
    textureLoader.load(FloorTexture, (texture) => {
      texture.repeat.set(9, 12);
      texture.offset.set(0, 0.25);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      flooring.material = new THREE.MeshStandardMaterial({ map: texture });
    })
    vase.material = new THREE.MeshStandardMaterial({ color: 0xb8e2f2, metalness: 0.2, roughness: 1, side: THREE.DoubleSide });
    seatLeather.material = new THREE.MeshStandardMaterial({ color: 0xffbcbf, metalness: 0.2, roughness: 1 });
    flower1.material = new THREE.MeshStandardMaterial({ color: 0x2d5a27 });
    flower2.material = new THREE.MeshStandardMaterial({ color: 0x54275a });
    wall.material = new THREE.MeshStandardMaterial({ color: 0xfaf9f6 });
    cabinets.material = new THREE.MeshStandardMaterial();
    faucet.material = new THREE.MeshStandardMaterial({ color: 0xaeaeae, metalness: 0.3, roughness: 0.3 });
    room.add(vase);
    scene.add(room);

    room.traverse((object) => {
      if (object.isMesh && object.name) { console.log(object.name); }
    })
  });

  const ball1 = ballComponents[0];
  const ball2 = ballComponents[1];

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.background = backgroundColor;
  scene.environment = pmremGenerator.fromScene(environment, 0.04).texture;
  
  // scene.add(cradle);
  // scene.overrideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.5, roughness: 0.5 })
  const pointLight = new THREE.PointLight(0xffffff, 1);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  pointLight.position.set(1, 5, -3);
  const pointLightHelper = new THREE.PointLightHelper(pointLight);
  // scene.add(pointLight);
  // scene.add(pointLightHelper);
  scene.add(ambientLight);
  camera.position.z = 14;
  // camera.position.y = 8;
  // camera.position.x = -7;
  
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
