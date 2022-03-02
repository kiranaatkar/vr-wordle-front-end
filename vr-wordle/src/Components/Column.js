import React from "react";
// import { useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three";
import { useGLTF } from "@react-three/drei";
import ColumnContainer from "./ColumnContainer.js";

export default function Model({ position, guessIndex, setGuess }) {
  // const [colorMap] = useLoader(TextureLoader, ["/textures/mossy-rock.png"]);

  // const group = useRef();
  // const { nodes } = useGLTF("/lowPolyColumn.glb");

  return (
    <>
      {/* <mesh
        ref={group}
        position={position}
        dispose={null}
        scale={1.5}
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
      >
        <meshStandardMaterial map={colorMap} />{" "}
      </mesh> */}
      <ColumnContainer
        columnGeometry={[...position, 0.3]}
        setGuess={setGuess}
        guessIndex={guessIndex}
      />
    </>
  );
}

useGLTF.preload("/scene.glb");
