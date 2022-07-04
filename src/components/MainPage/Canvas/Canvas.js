import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

function Canvas(props) {
  function generateTorusPointCloud(R, r, numPoints) {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial( { size: 0.1, vertexColors: true } );
    const positions = new Float32Array( numPoints * 3 );
    const colors = new Float32Array( numPoints * 3 );

    for ( let p = 0; p < numPoints; p++ ) {
      const theta = 2 * Math.random() * Math.PI;
      const phi = 2 * Math.random() * Math.PI;
      const fill = Math.random();
      
      const color = new THREE.Color(`hsl(${phi*180/Math.PI}, 100%, 45%)`)
      positions[ 3*p ] = ( R + r * fill * Math.cos( theta ) ) * Math.cos( phi );
      positions[ 3*p+1 ] = ( R + r * fill * Math.cos( theta ) ) * Math.sin( phi );
      positions[ 3*p+2 ] = r * Math.sin( theta );
      
      colors[ 3*p ] = color.r; 
      colors[ 3*p+1 ] = color.g;
      colors[ 3*p+2 ] = color.b;
    }

    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    return new THREE.Points( geometry, material );
  };

  function generateDioramaGeometry(color) {
    const positions = new Float32Array( [
      0.0, 0.0, 1.0,
      0.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 1.0,

      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      0.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
      
      0.0, 0.0, 1.0,
      0.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 1.0,

      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 1.0, 0.0,
      0.0, 1.0, 0.0,

      0.0, 0.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 0.0, 0.0,
      0.0, 0.0, 0.0,
    ] );
    const normals = new Float32Array( [
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,

      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,

      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0
    ] );
    const colors = new Float32Array( 12 * 3 );
    const indices = [
      0, 1, 2,
      2, 3, 0,
      4, 5, 6,
      6, 7, 4,
      8, 9, 10,
      10, 11, 8
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setIndex( indices );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    const material = new THREE.MeshPhongMaterial( {
      side: THREE.DoubleSide,
      color: 0xff69b4,
      flatShading: true 
    } );
    return new THREE.Mesh( geometry, material );
  }
  
  useEffect(() => {

    // -------- create scene -------- //
    const canvasDivDOMElement = document.getElementById( 'main-canvas-div' );
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    canvasDivDOMElement.appendChild( renderer.domElement );
    
    const sphere = new THREE.Mesh( new THREE.SphereGeometry( 15, 32, 16 ), new THREE.MeshPhongMaterial() );
    const diorama = generateDioramaGeometry( 255, 0, 0 );
    const pointCloud = generateTorusPointCloud( 5, 1, 50000 );
    
    light.position.set(0, 1, 2);
    diorama.z = -5;
    diorama.rotateX(0.1);
    diorama.rotateY(-0.5);
    pointCloud.scale.set( 10, 10, 10 );
    pointCloud.rotateY(-Math.PI/4);
    pointCloud.rotateX(-Math.PI/4);

    
    scene.add( light );
    //scene.add( sphere );
    scene.add( diorama );
    scene.add( pointCloud );
    scene.fog = new THREE.Fog(0xffffff, 10, 200);
    camera.position.z = 10;

    // -------- set event listeners -------- //
    const controls = new TrackballControls(camera, renderer.domElement);
    const rotateTorus = () => { pointCloud.rotation.z += 0.005; }
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener( 'wheel', rotateTorus, true );
    window.addEventListener( 'resize', onWindowResize, false );

    // -------- animate -------- //
    const animate = function () {
      requestAnimationFrame( animate );
      pointCloud.rotation.z += 0.0005;
      controls.update();
      renderer.render( scene, camera );
    };
    animate();

    // -------- clean up -------- //
    return function cleanup() {
      window.removeEventListener( 'resize', onWindowResize, false );
      window.removeEventListener( 'wheel', rotateTorus, true );
      canvasDivDOMElement.removeChild( renderer.domElement );
    }
  });

  return (
    <div id="main-canvas-div"/>
  );
}

export default Canvas;