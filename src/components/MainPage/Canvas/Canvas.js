import { useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

import backgroundImage from '../../../assets/images/textures/starsMilkyWay.jpg';
import saturnTextureImage from '../../../assets/images/textures/saturnTexture.jpg';
import ringTextureImage from '../../../assets/images/textures/saturnRings.png';

import teapotOBJ from '../../../assets/models/Teapot/Teapot.obj';

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
    return geometry;
  };

  const changeSaturnRingGeometry = (ringGeometry) => {
    const positions = ringGeometry.attributes.position;
    const textureCoords = ringGeometry.attributes.uv;
    const pos = new THREE.Vector3();
    const outerRadius = ringGeometry.parameters.outerRadius;
    const innerRadius = ringGeometry.parameters.innerRadius;
    const threshold = (outerRadius + innerRadius) / 2;
    for (let i = 0; i < positions.count; i++) {
      pos.fromBufferAttribute(positions, i);
      textureCoords.setXY(i, pos.length() < threshold ? 0 : 1, 0.5);
    }
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
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasDivDOMElement.appendChild(renderer.domElement);

    // -------- textures -------- //
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(backgroundImage);
    const saturnTexture = textureLoader.load(saturnTextureImage);
    const ringTexture = textureLoader.load(ringTextureImage);

    // -------- geometries -------- //
    const saturnGeometry = new THREE.SphereGeometry(1, 32, 32);
    const ringGeometry = new THREE.RingGeometry(2, 3, 250, 1);
    const ringPointsGeometry = generateRingPointCloudGeometry(2.5, 3, 0.01, 10000);
    changeSaturnRingGeometry(ringGeometry);
    ringGeometry.rotateX(-Math.PI/2);
    ringPointsGeometry.rotateX(-Math.PI/2);

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
      size: 0.01,
      vertexColors: true,
    });
    // const teapotMaterial = new THREE.MaterialLoader().load(teapotMTL);
    // console.log(teapotMaterial);

    // -------- meshes -------- //
    const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    const ringPoints = new THREE.Points(ringPointsGeometry, ringPointsMaterial);
    const saturnSystem = new THREE.Group();
    saturnSystem.add(saturnMesh);
    saturnSystem.add(ringMesh);
    saturnSystem.add(ringPoints);
    saturnSystem.scale.set(10, 10, 10);
    const objLoader = new OBJLoader();
    objLoader.load(teapotOBJ, (teapotMesh) => {
      const teapotMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      teapotMesh.children.forEach((child) => { child.material = teapotMaterial; });
      scene.add(teapotMesh);
    });

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