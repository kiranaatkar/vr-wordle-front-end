import React from "react";
import { usePlane } from "@react-three/cannon";

export default function Floor(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh
      {...props}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={ref}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}
