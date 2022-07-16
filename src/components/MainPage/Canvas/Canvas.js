import { useEffect, useRef } from 'react';
import { WebGLRenderer } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import createSaturnScene from '../../../scenes/SaturnScene';
import createTestCubeScene from '../../../scenes/TestCubeScene';
import createTestMultiCubeScene from '../../../scenes/TestMultiCubeScene';

function Canvas(props) {

  const canvasParentRef = useRef(null);

  useEffect(() => {

    // -------- create renderer -------- //
    const renderer = new WebGLRenderer({ antialias: true });
    const canvas = renderer.domElement;
    const canvasParent = canvasParentRef.current;
    canvasParent.appendChild(canvas);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    renderer.localClippingEnabled = true;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const { scene, camera, animation } = createSaturnScene(canvas);

    // -------- stats -------- //
    const stats = Stats();
    // canvasParent.appendChild(stats.dom);

    // -------- resize renderer -------- //
    const resizeCanvasToParentSize = (camera) => {
      const width = canvasParent.clientWidth;
      const height = canvasParent.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }
    }

    // -------- animate -------- //
    const animate = (time) => {
      resizeCanvasToParentSize(camera);
      requestAnimationFrame(animate);
      stats.begin();
      animation(time);
      renderer.render(scene, camera);
      stats.end();
    };
    requestAnimationFrame(animate);


    // -------- clean up -------- //
    return function cleanup() {
      canvasParent.removeChild(canvas);
      // canvasParent.removeChild(stats.dom);
    }
  });

  return (
    <div ref={ canvasParentRef } id='canvas'></div>
  );
}

export default Canvas;