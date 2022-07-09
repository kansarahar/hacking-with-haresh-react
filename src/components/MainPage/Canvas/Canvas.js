import { useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import Stats from 'three/examples/jsm/libs/stats.module';

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

    for (let p = 0; p < numPoints; p++) {
      const theta = 2 * Math.random() * Math.PI;
      const r = rmin + (rmax - rmin) * Math.random();
      const z = zspread * (Math.random() - 0.5);

      positions[3 * p] = r * Math.cos(theta);
      positions[3 * p + 1] = r * Math.sin(theta);
      positions[3 * p + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
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
    const canvasParentDiv = document.getElementById('main-canvas-div');
    const canvas = document.getElementById('main-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasParentDiv.clientWidth / canvasParentDiv.clientHeight, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.localClippingEnabled = true;
    renderer.setSize(canvasParentDiv.clientWidth, canvasParentDiv.clientHeight);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-0.5, 1, 1);
    const clippingPlanes = [
      new THREE.Plane(new THREE.Vector3(1, 0, 1), -5),
      new THREE.Plane(new THREE.Vector3(-1, 0, 1), 10),
    ];
    

    // -------- textures -------- //
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(backgroundImage);
    const saturnTexture = textureLoader.load(saturnTextureImage);
    const ringTexture = textureLoader.load(ringTextureImage);

    // -------- geometries -------- //
    const saturnGeometry = new THREE.SphereGeometry(60, 32, 32);
    const ringGeometry = generateSaturnRingGeometry(120, 180, 250, 1);
    const ringPointsGeometry = generateRingPointCloudGeometry(120, 180, 1, 5000);

    // -------- colors -------- //
    const saturnEmissiveColor = new THREE.Color(0xffffff);
    const saturnRingEmissiveColor = new THREE.Color(0xffffff);
    const ringPointsColor = new THREE.Color(0xeaddca);
    const teapotColor = new THREE.Color(0xffffff);
    const asteroidColor = new THREE.Color(0xeaddca);

    // -------- materials -------- //
    const saturnMaterial = new THREE.MeshStandardMaterial({
      map: saturnTexture, 
      emissive: saturnEmissiveColor,
      emissiveIntensity: 0.2,
    });
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      emissive: saturnRingEmissiveColor,
      emissiveIntensity: 0.2,
    });
    const ringPointsMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: ringPointsColor,
      clippingPlanes: clippingPlanes,
    });
    const teapotMaterial = new THREE.MeshStandardMaterial({
      color: teapotColor,
      roughness: 0,
      metalness: 0,
      clippingPlanes: clippingPlanes,
    });
    const asteroidMaterial = new THREE.MeshPhongMaterial({
      color: asteroidColor,
      flatShading: true,
      clippingPlanes: clippingPlanes,
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
      teapotMesh.children.forEach((child) => { child.material = teapotMaterial; });
      const r = 171.5;
      const theta = Math.PI/3 - 0.005;
      teapotMesh.position.set(r * Math.cos(theta), 1.5, r * Math.sin(theta));
      teapotMesh.scale.set(0.01, 0.01, 0.01);
      teapotMesh.rotation.set(Math.PI/4 - Math.random(), -Math.PI/2, Math.PI/4 - Math.random());
      saturnBelt.add(teapotMesh);
    });
    objLoader.load(asteroidsOBJ, (asteroidsMesh) => {
      const asteroidGeometries = [];
      asteroidsMesh.children.forEach((child) => { asteroidGeometries.push(child.geometry) });
      asteroidGeometries.forEach((geometry) => {
        // center each geometry at (0,0,0) and make them all roughly 1m^3
        geometry.computeBoundingBox();
        geometry.center();
        const dimensions = new THREE.Vector3().subVectors(geometry.boundingBox.max, geometry.boundingBox.min);
        const normalizationFactor = 3 / (dimensions.x + dimensions.y + dimensions.z);
        geometry.scale(normalizationFactor, normalizationFactor, normalizationFactor);

        // create instanced meshes for each asteroid geometry and add it to the belt
        const count = 1500;
        const asteroidInstancedMesh = new THREE.InstancedMesh(geometry, asteroidMaterial, count);
        const dummy = new THREE.Object3D();
        for (let i = 0; i < count; i++) {
          const r = 170 + 10 * (Math.random() - 0.5);
          const theta = Math.random() * Math.PI / 2 + Math.PI/4;
          const y = 0.5 + 1.5 * Math.random();
          const scaleFactor = 0.02;
          dummy.scale.set(
            scaleFactor * (0.9 + 0.2 * Math.random()),
            scaleFactor * (0.9 + 0.2 * Math.random()),
            scaleFactor * (0.9 + 0.2 * Math.random())
          );
          dummy.position.set(r * Math.cos(theta), y, r * Math.sin(theta));
          dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          dummy.updateMatrix();
          asteroidInstancedMesh.setMatrixAt(i, dummy.matrix);
        }
        saturnBelt.add(asteroidInstancedMesh);
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

    // -------- set controls -------- //
    const controls = new TrackballControls(camera, renderer.domElement);

    // -------- stats -------- //
    const stats = Stats();
    canvasParentDiv.appendChild(stats.dom);

    // -------- resize renderer -------- //
    // canvas.style.width = '100%';
    // canvas.style.height = '100%';
    // const resizeCanvasToParentSize = (camera) => {
    //   const width = canvasParentDiv.clientWidth;
    //   const height = canvasParentDiv.clientHeight;
    //   if (canvas.width !== width || canvas.height !== height) {
    //     camera.aspect = width / height;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(width, height, false);
    //     renderer.render(scene, camera);
    //   }
    // }

    // -------- animate -------- //
    const animate = (time) => {
      // resizeCanvasToParentSize(camera);
      requestAnimationFrame(animate);
      stats.begin();
      ringPoints.rotation.y = time * 2e-6;
      saturnBelt.rotation.y = time * 2e-7;
      controls.update();
      renderer.render(scene, camera);
      stats.end();
    };
    requestAnimationFrame(animate);


    // -------- clean up -------- //
    return function cleanup() {
    canvasParentDiv.removeChild(stats.dom);
    }
  });

  return (
    <div id='main-canvas-div'>
      <canvas id='main-canvas'></canvas>
    </div>
  );
}

export default Canvas;