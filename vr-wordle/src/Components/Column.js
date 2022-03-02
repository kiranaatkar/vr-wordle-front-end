import React from "react";
import { useGLTF } from "@react-three/drei";
import ColumnContainer from "./ColumnContainer.js";

export default function Model({ position, guessIndex, setGuess }) {
  return (
    <>
      <ColumnContainer
        columnGeometry={[...position, 0.3]}
        setGuess={setGuess}
        guessIndex={guessIndex}
      />
    </>
  );
}

useGLTF.preload("/scene.glb");
