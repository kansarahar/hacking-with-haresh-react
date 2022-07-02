import React from 'react'
import { Canvas } from '@react-three/fiber'

import Box from './Box'

import '../../styles/Canvas.css'

function Canvas3d(props) {
  return (
    <div id="Canvas3d">
      <Canvas gl={{physicallyCorrectLights: false}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}


export default Canvas3d;