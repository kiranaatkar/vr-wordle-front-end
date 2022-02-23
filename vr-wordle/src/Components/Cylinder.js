import React from "react";
import { useCylinder } from "@react-three/cannon";

export default function Cylinder(props) {
  // Make the cup a physics object with a big mass
  const args = [1.1, 1.4, 2, 32];
  const [ref] = useCylinder(() => ({ mass: 10000, args, ...props }));

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  );
}
