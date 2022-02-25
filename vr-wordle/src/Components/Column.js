/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import ColumnContainer from "./ColumnContainer.js";

export default function Model({ position, guessIndex, setGuess }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.glb");
  return (
    <>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        ref={group}
        position={position}
        dispose={null}
      >
        <mesh
          scale={1.5}
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
        >
          <meshStandardMaterial color="black" />{" "}
        </mesh>
      </group>
      <ColumnContainer
        columnGeometry={[...position, 0.3]}
        setGuess={setGuess}
        guessIndex={guessIndex}
      />
    </>
  );
}

useGLTF.preload("/scene.glb");
