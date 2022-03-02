import React from "react";
import { usePlane } from "@react-three/cannon";
import Model from "./Mountain.js";

export default function Floor(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    material: {
      friction: 1,
    },
    opacity: 0,
  }));

  return (
    <>
      <Model />

      <mesh {...props} position={[0, 0, 0]} ref={ref}>
        <planeBufferGeometry attach="geometry" args={[1, 1]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
}
