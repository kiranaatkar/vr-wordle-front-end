import React from "react";
import { useCylinder } from "@react-three/cannon";

export default function Cylinder(props) {
  // Make the cup a physics object with a big mass
  // args: topRad, bottomRad, height, radialSegments, heightSegments, openEnded
  const args = [0.6, 0.4, 0.75, 32, 1, true];
  const [ref] = useCylinder(() => ({
    mass: 100000,
    args,
    ...props,
    material: { friction: 1 },
  }));

  return (
    <mesh ref={ref} scale={0.5}>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  );
}
