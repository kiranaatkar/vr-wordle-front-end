import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';
import ColumnContainer from './ColumnContainer.js';

export default function Model({ position, guessIndex, setGuess }) {
  const [colorMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    '/textures/aerial_rocks_02_diff_2k.jpg',
    '/textures/aerial_rocks_02_nor_dx_2k.jpg',
    '/textures/aerial_rocks_02_rough_2k.jpg',
    '/textures/aerial_rocks_02_ao_2k.jpg',
  ]);

  const group = useRef();
  const { nodes } = useGLTF('/lowPolyColumn.glb');

  return (
    <>
      <mesh
        ref={group}
        position={position}
        dispose={null}
        scale={1.5}
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}>
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />{' '}
      </mesh>
      <ColumnContainer
        columnGeometry={[...position, 0.3]}
        setGuess={setGuess}
        guessIndex={guessIndex}
      />
    </>
  );
}

useGLTF.preload('/scene.glb');
