import * as THREE from 'three';
import * as OIMO from 'three/examples/jsm/libs/OimoPhysics';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const createPhysicsTestScene = (canvas, renderer) => {

  // -------- physics -------- //
  const frameRate = 60;
  const world = new OIMO.World(2, new OIMO.Vec3(0, -9.8, 0));
  const sphereShape = new OIMO.OSphereGeometry(0.5);
  const boxShape = new OIMO.OBoxGeometry(new OIMO.Vec3(5, 0.1, 5));

  // body 1
  const mass1 = 1;
  const shapeConfig1 = new OIMO.ShapeConfig();
  shapeConfig1.geometry = sphereShape;
  shapeConfig1.restitution = 0.5;
  const bodyConfig1 = new OIMO.RigidBodyConfig();
  bodyConfig1.type = mass1 === 0 ? OIMO.RigidBodyType.STATIC : OIMO.RigidBodyType.DYNAMIC;
  bodyConfig1.position = new OIMO.Vec3(-1, 1, 1);
  const body1 = new OIMO.RigidBody(bodyConfig1);
  body1.addShape(new OIMO.Shape(shapeConfig1));

  // body 2
  const mass2 = 1;
  const shapeConfig2 = new OIMO.ShapeConfig();
  shapeConfig2.geometry = sphereShape;
  shapeConfig2.restitution = 0.2;
  const bodyConfig2 = new OIMO.RigidBodyConfig();
  bodyConfig2.type = mass2 === 0 ? OIMO.RigidBodyType.STATIC : OIMO.RigidBodyType.DYNAMIC;
  bodyConfig2.position = new OIMO.Vec3(1, 2, 1);
  const body2 = new OIMO.RigidBody(bodyConfig2);
  body2.addShape(new OIMO.Shape(shapeConfig2));
  // body2.setLinearDamping(0.2);

  // body 3
  const mass3 = 0;
  const shapeConfig3 = new OIMO.ShapeConfig();
  shapeConfig3.geometry = boxShape;
  shapeConfig3.restitution = 1;
  const bodyConfig3 = new OIMO.RigidBodyConfig();
  bodyConfig3.type = mass3 === 0 ? OIMO.RigidBodyType.STATIC : OIMO.RigidBodyType.DYNAMIC;
  bodyConfig3.position = new OIMO.Vec3(0, -4, 0);
  const body3 = new OIMO.RigidBody(bodyConfig3);
  body3.addShape(new OIMO.Shape(shapeConfig3));

  // add bodies
  world.addRigidBody(body1);
  world.addRigidBody(body2);
  world.addRigidBody(body3);


  // -------- scene -------- //
  renderer.shadowMap.enabled = true;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0.5, 1, 1);
  light.castShadow = true;

  const sphereGeometry = new THREE.SphereBufferGeometry(0.5);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });

  const boxGeometry = new THREE.BoxBufferGeometry(10, 0.2, 10);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xfff0ff });



  
  // meshes
  const sphereMesh1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  const sphereMesh2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  sphereMesh1.position.copy(body1.getPosition());
  sphereMesh2.position.copy(body2.getPosition());
  boxMesh.position.copy(body3.getPosition());
  sphereMesh1.castShadow = true;
  sphereMesh2.castShadow = true;
  boxMesh.receiveShadow = true;

  // scene construction
  scene.add(light);
  scene.add(sphereMesh1);
  scene.add(sphereMesh2);
  scene.add(boxMesh);
  camera.position.z = 10;

  // controls
  const controls = new OrbitControls(camera, canvas);


  // -------- animation -------- //
  const animation = (time) => {
    world.step(1 / frameRate);
    sphereMesh1.position.copy(body1.getPosition());
    sphereMesh2.position.copy(body2.getPosition());
    boxMesh.position.copy(body3.getPosition());
    controls.update();
  }

  return { scene, camera, animation };
}

export default createPhysicsTestScene;