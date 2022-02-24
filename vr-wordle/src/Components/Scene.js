import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import SetLetterBox from "./SetLetterBox.js";
import { useBox } from "@react-three/cannon";

export default function Model({ position, guessIndex, setGuess }) {
  const [x, y, z] = position;
  const [ref] = useBox(() => ({
    type: "Static",
    mass: 1,
    position,
    isTrigger: true,
    onCollide: (e) => {
      setGuess(e.body.name, guessIndex);
    },
  }));
  const { nodes, materials } = useGLTF("/uploads_files_1953815_bucket.glb");

  return (
    <group ref={ref} position={position} dispose={null}>
      <mesh
        scale={2.5}
        castShadow
        receiveShadow
        geometry={nodes.Bucket.geometry}
        material={materials.Bucket}
      >
        <meshStandardMaterial wireframe color="green" />
      </mesh>
      <SetLetterBox
        args={[0.5, 0.5, 0.5]}
        position={position}
        guessIndex={guessIndex}
        setGuess={setGuess}
      />
    </group>
  );
}

useGLTF.preload("/uploads_files_1953815_bucket.glb");
