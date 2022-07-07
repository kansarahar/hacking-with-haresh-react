import { useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import backgroundImage from '../../../assets/images/textures/starsMilkyWay.jpg';
import saturnTextureImage from '../../../assets/images/textures/saturnTexture.jpg';
import ringTextureImage from '../../../assets/images/textures/saturnRings.png';

import teapotOBJ from '../../../assets/models/Teapot/Teapot.obj';
import asteroidsOBJ from '../../../assets/models/Asteroid/Asteroids.obj';

function Canvas(props) {
  
  // -------- helper functions -------- //
  const generateRingPointCloudGeometry = (rmin, rmax, zspread, numPoints) => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);

    for (let p = 0; p < numPoints; p++) {
      const theta = 2 * Math.random() * Math.PI;
      const r = rmin + (rmax - rmin) * Math.random();
      const z = zspread * (Math.random() - 0.5);
      
      const color = new THREE.Color( 0xffffff );
      positions[3 * p] = r * Math.cos(theta);
      positions[3 * p + 1] = r * Math.sin(theta);
      positions[3 * p + 2] = z;
      
      colors[3 * p] = color.r; 
      colors[3 * p + 1] = color.g;
      colors[3 * p + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.rotateX(-Math.PI/2);
    return geometry;
  };

  const generateSaturnRingGeometry = (innerRadius, outerRadius, thetaSegments) => {
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments, 1);
    const positions = ringGeometry.attributes.position;
    const textureCoords = ringGeometry.attributes.uv;
    const pos = new THREE.Vector3();
    const threshold = (outerRadius + innerRadius) / 2;
    for (let i = 0; i < positions.count; i++) {
      pos.fromBufferAttribute(positions, i);
      textureCoords.setXY(i, pos.length() < threshold ? 0 : 1, 0.5);
    }
    ringGeometry.rotateX(-Math.PI/2);
    return ringGeometry;
  };

  useEffect(() => {

    // -------- create scene -------- //
    const canvasDivDOMElement = document.getElementById( 'main-canvas-div' );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.localClippingEnabled = true;
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-0.5, 1, 1);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasDivDOMElement.appendChild(renderer.domElement);

    // -------- textures -------- //
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(backgroundImage);
    const saturnTexture = textureLoader.load(saturnTextureImage);
    const ringTexture = textureLoader.load(ringTextureImage);

    // -------- geometries -------- //
    const saturnGeometry = new THREE.SphereGeometry(60, 32, 32);
    const ringGeometry = generateSaturnRingGeometry(120, 180, 250, 1);
    const ringPointsGeometry = generateRingPointCloudGeometry(150, 180, 0.01, 2000);

    // -------- materials -------- //
    const saturnMaterial = new THREE.MeshStandardMaterial({
      map: saturnTexture, 
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.2,
    });
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.2,
    });
    const ringPointsMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      clippingPlanes: [
        new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.1),
        new THREE.Plane(new THREE.Vector3(0, 0, 1), 25),
      ],
    });

    // -------- meshes -------- //
    const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    const ringPoints = new THREE.Points(ringPointsGeometry, ringPointsMaterial);
    const saturnBelt = new THREE.Group();
    const saturnSystem = new THREE.Group();
    saturnMesh.add(ringMesh);
    saturnMesh.add(ringPoints);
    saturnSystem.add(saturnMesh);

    const objLoader = new OBJLoader();
    objLoader.load(teapotOBJ, (teapotMesh) => {
      const teapotMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xffb6c1),
        specularColor: new THREE.Color(0.25, 0.25, 0.25),
        shininess: 96,
      });
      teapotMesh.children.forEach((child) => { child.material = teapotMaterial; });
      const r = 170;
      const theta = Math.PI/3 - 0.005;
      teapotMesh.position.set(r * Math.cos(theta), 1.2, r * Math.sin(theta));
      teapotMesh.scale.set(0.05, 0.05, 0.05);
      teapotMesh.rotation.set(Math.PI/4 - Math.random(), -Math.PI/2, Math.PI/4 - Math.random());
      saturnBelt.add(teapotMesh);
    });
    objLoader.load(asteroidsOBJ, (asteroidsMesh) => {
      const asteroidMaterial = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0xeaddca),
        flatShading: true,
      });
      const asteroidGeometries = [];
      asteroidsMesh.children.forEach((child) => { asteroidGeometries.push(child.geometry) });
      asteroidGeometries.forEach((geometry) => { 
        geometry.computeBoundingBox();
        geometry.center();
        const dimensions = new THREE.Vector3().subVectors(geometry.boundingBox.max, geometry.boundingBox.min);
        const scaleFactor = 3 / (dimensions.x + dimensions.y + dimensions.z);
        geometry.scale(scaleFactor, scaleFactor, scaleFactor);
      });
      asteroidGeometries.forEach((asteroidGeometry) => {
        const count = 750;
        const saturnBeltMesh = new THREE.InstancedMesh(asteroidGeometry, asteroidMaterial, count);
        saturnBeltMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        const dummy = new THREE.Object3D();
        for (let i = 0; i < count; i++) {
          const r = 150 + 30 * Math.random();
          const theta = Math.random() * Math.PI / 2 + Math.PI/8;
          const y = 1.5 * Math.random();
          const scaleFactor = 0.15 * Math.random();
          dummy.scale.set(scaleFactor, scaleFactor, scaleFactor);
          dummy.position.set(r * Math.cos(theta), y, r * Math.sin(theta));
          dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          dummy.updateMatrix();
          saturnBeltMesh.setMatrixAt(i, dummy.matrix);
        }
        saturnBelt.add(saturnBeltMesh);
      });
      saturnSystem.add(saturnBelt);
    });

    saturnSystem.position.set(-85, 10, -50);
    saturnSystem.rotation.set(-0.065, 0, -0.25);

    // -------- scene construction -------- //
    scene.add(light);
    scene.add(saturnSystem);
    scene.background = backgroundTexture;
    
    camera.position.z = 100;

    // -------- set event listeners -------- //
    const controls = new TrackballControls(camera, renderer.domElement);
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);

    // -------- animate -------- //
    const animate = function () {
      requestAnimationFrame(animate);
      ringPoints.rotation.y += 0.00005;
      saturnBelt.rotation.y += 0.000005;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // -------- clean up -------- //
    return function cleanup() {
      window.removeEventListener('resize', onWindowResize, false);
      canvasDivDOMElement.removeChild(renderer.domElement);
    }
  });

  return (
    <div id="main-canvas-div"/>
  );
}

export default Canvas;