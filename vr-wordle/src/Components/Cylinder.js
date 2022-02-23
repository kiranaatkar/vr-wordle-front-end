import React from "react";
import { useCylinder } from "@react-three/cannon";

export default function Cylinder(props) {
  // Make the cup a physics object with a big mass
  // args: topRad, bottomRad, height, radialSegments, heightSegments, openEnded
  const args = [0.5, 0.3, 1, 32, 1, true];
  const [ref] = useCylinder(() => ({ mass: 10000, args, ...props }));

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  );
}
