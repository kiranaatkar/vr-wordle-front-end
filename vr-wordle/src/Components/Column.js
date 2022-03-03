import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';
import ColumnContainer from './ColumnContainer.js';
import PressurePlate from './PressurePlate.js';

export default function Model({ position, guessIndex, setGuess }) {
  const [colorMap] = useLoader(TextureLoader, ['/textures/mossy-rock.png']);
  const { nodes } = useGLTF('/lowPolyColumn.glb');
  const [x, y, z] = position;

  return (
    <>
      <mesh
        position={position}
        dispose={null}
        scale={1.5}
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}>
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <PressurePlate
        position={[x, y + 0.54, z]}
        args={[0.225, 0.225, 0.1, 32]}
        setGuess={setGuess}
        guessIndex={guessIndex}
      />
    </>
  );
}

useGLTF.preload('/lowPolyColumn.glb');
