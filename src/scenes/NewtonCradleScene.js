import * as THREE from 'three';
import * as OIMO from 'three/examples/jsm/libs/OimoPhysics';
import { oimo } from 'three/examples/jsm/libs/OimoPhysics/OimoPhysics';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const backgroundColor = new THREE.Color(0xfcfcfc);
const sphereSize = 0.12;
const railRadius = 0.04;

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
  // -------- physics -------- //
  const frameRate = 60;
  const world = new OIMO.World(2, new OIMO.Vec3(0, -9.8, 0));
  const sphereShape = new OIMO.OSphereGeometry(sphereSize);

  const dummyBody = new OIMO.RigidBody(new OIMO.RigidBodyConfig());
  const ballBodies = [-0.625, -0.375, -0.125, 0.125, 0.375, 0.625].map((xpos) => {
    const shapeConfig = new OIMO.ShapeConfig();
    shapeConfig.geometry = sphereShape;
    shapeConfig.restitution = 1;
    
    const bodyConfig = new OIMO.RigidBodyConfig();
    bodyConfig.type = OIMO.RigidBodyType.DYNAMIC;
    bodyConfig.position = new OIMO.Vec3(xpos, -1, 0);
    bodyConfig.linearDamping = 0.1;
    const body = new OIMO.RigidBody(bodyConfig);
    body.addShape(new OIMO.Shape(shapeConfig));

    const hingeJointConfig = new OIMO.RevoluteJointConfig();
    hingeJointConfig.init(body, dummyBody, new OIMO.Vec3(xpos, 0, 0), new OIMO.Vec3(0, 0, 1));
    const hingeJoint = new OIMO.RevoluteJoint(hingeJointConfig);

    world.addRigidBody(body);
    world.addJoint(hingeJoint);

    return body;
  });

  // -------- scene -------- //
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envMap = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.01, 1000);
  
  scene.background = backgroundColor;

  // materials
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

  // geometry
  const sphereGeometry = new THREE.SphereBufferGeometry(sphereSize);
  const cylinderGeometry = new THREE.CylinderBufferGeometry(railRadius, railRadius, 1, 8, 1, true);
  const roundedBoxGeometry = new RoundedBoxGeometry(2.5, 0.2, 1.5, 2, 0.05);
  const arcCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-0.1, -0.1, 0), new THREE.Vector3(-0.1, 0.1, 0), new THREE.Vector3(0.1, 0.1, 0));
  const arcGeometry = new THREE.TubeBufferGeometry(arcCurve, 16, railRadius, 8);

  // meshes
  const cradle = new THREE.Group();
  const ballGroup = new THREE.Group();
  const stringGroup = new THREE.Group();
  const platformGroup = new THREE.Group();
  cradle.add(ballGroup);
  cradle.add(stringGroup);
  cradle.add(platformGroup);
  cradle.position.y = 1;

  const ballMeshes = ballBodies.map((ballBody) => {
    const ballMesh = new THREE.Mesh(sphereGeometry, ballMaterial);
    ballMesh.position.copy(ballBody.getPosition());
    ballGroup.add(ballMesh);
    return ballMesh;
  });
  const stringMeshes = ballMeshes.map((ballMesh) => {
    const stringPoints = [new THREE.Vector3(0, 0, 0.5), new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, -0.5)];
    const stringGeometry = new THREE.BufferGeometry().setFromPoints(stringPoints);
    const string = new THREE.Line(stringGeometry, stringMaterial);
    string.position.x = ballMesh.position.x;
    stringGroup.add(string);
    return string;
  });
  const supportMeshes = [-0.5, 0.5].map((zpos) => {
    const railMaterial = platformMaterial;
    const supports = new THREE.Group();
    const leftSupport = new THREE.Mesh(cylinderGeometry, railMaterial);
    const rightSupport = new THREE.Mesh(cylinderGeometry, railMaterial);
    leftSupport.position.set(-1, -0.82, zpos);
    leftSupport.scale.y = 1.25;
    rightSupport.position.set(1, -0.82, zpos);
    rightSupport.scale.y = 1.25;
    const rail = new THREE.Mesh(cylinderGeometry, railMaterial);
    rail.position.set(0, 0, zpos);
    rail.rotation.z = Math.PI / 2;
    rail.scale.set(1, 1.6, 1);
    const leftArc = new THREE.Mesh(arcGeometry, railMaterial);
    const rightArc = new THREE.Mesh(arcGeometry, railMaterial);
    leftArc.position.set(-0.9, -0.1, zpos);
    rightArc.position.set(0.9, -0.1, zpos);
    rightArc.rotation.y = Math.PI;
    supports.add(leftSupport);
    supports.add(rightSupport);
    supports.add(rail);
    supports.add(leftArc);
    supports.add(rightArc);
    platformGroup.add(supports);
    
    return supports;
  });
  const platformMesh = new THREE.Mesh(roundedBoxGeometry, platformMaterial);
  platformMesh.position.y = -1.5;
  platformGroup.add(platformMesh);

  ballBodies[0].setPosition(new OIMO.Vec3(-1, 0, 0));

  // shadow
  const shadowTexture = createShadowTexture();
  const shadowGeometry = new THREE.PlaneGeometry();
  const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: shadowTexture });
  const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.scale.set(2.5, 1.5, 1);
  shadowMesh.position.y = -2.1;
  cradle.add(shadowMesh);

  scene.add(cradle);
  camera.position.z = 3;
  camera.position.y = 1.5;
  camera.position.x = -1.5;
  
  const controls = new OrbitControls(camera, canvas);
  
  // -------- animation -------- //
  const animation = (time) => {
    world.step(1 / frameRate);
    ballMeshes.forEach((ballMesh, idx) => {
      const ballPosition = ballBodies[idx].getPosition();
      const string = stringMeshes[idx];
      ballMesh.position.copy(ballPosition);
      const dir = new THREE.Vector3().subVectors(ballPosition, string.position).normalize();
      dir.y = dir.y > -1 ? dir.y : -1;
      const rotationAngle = Math.acos(-dir.y);
      string.rotation.z = dir.x > 0 ? rotationAngle : -rotationAngle;

    });
    controls.update();
  }

  const destroy = () => {
    // ballMaterial.dispose();
    // platformMaterial.dispose();
    // stringMaterial.dispose();
    // shadowMaterial.dispose();

    // sphereGeometry.dispose();
    // cylinderGeometry.dispose();
    // boxGeometry.dispose();
    // arcGeometry.dispose();
    // stringGeometry.dispose();
    // shadowGeometry.dispose();

    // shadowTexture.dispose();

    // controls.dispose();
  }

  return { scene, camera, animation, destroy };
}

export default createNewtonCradleScene;
