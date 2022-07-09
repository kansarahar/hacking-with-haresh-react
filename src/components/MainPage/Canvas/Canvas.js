import { useEffect } from 'react';
import { WebGLRenderer } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import createSaturnScene from '../../../scenes/SaturnScene';
import createTestCubeScene from '../../../scenes/TestCubeScene';
import createTestMultiCubeScene from '../../../scenes/TestMultiCubeScene';

function Canvas(props) {

  useEffect(() => {

    // -------- create renderer -------- //
    const canvasParentDiv = document.getElementById('main-canvas-div');
    const canvas = document.getElementById('main-canvas');
    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.localClippingEnabled = true;
    renderer.setSize(canvasParentDiv.clientWidth, canvasParentDiv.clientHeight);

    const { scene, camera, animation } = createTestCubeScene(canvas);

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
      animation(time);
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