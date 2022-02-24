import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import SetLetterBox from "./SetLetterBox.js";
import BasketContainer from "./BasketContainer.js";

export default function Model({ position, guessIndex, setGuess }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/uploads_files_1953815_bucket.glb");

  return (
    <>
      <mesh
        ref={group}
        position={position}
        dispose={null}
        scale={2.5}
        castShadow
        receiveShadow
        geometry={nodes.Bucket.geometry}
        material={materials.Bucket}
      >
        <meshNormalMaterial />
      </mesh>
      <SetLetterBox
        args={[0.5, 0.5, 0.5]}
        position={[position[0], position[1] + 0.25, position[2]]}
        guessIndex={guessIndex}
        setGuess={setGuess}
      />
      <BasketContainer basketGeometry={[...position, 0.4]} />
    </>
  );
}

useGLTF.preload("/uploads_files_1953815_bucket.glb");
