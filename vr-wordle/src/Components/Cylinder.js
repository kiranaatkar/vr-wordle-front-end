import React from "react";
import { useCylinder } from "@react-three/cannon";

export default function Cylinder(props) {
  // Make the cup a physics object with a big mass
  const args = [0.6, 0.4, 0.75, 32, 1, true];
  const [ref] = useCylinder(() => ({
    mass: 10000,
    args,
    material: {
      friction: 1,
    },
    ...props,
  }));

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  );
}
