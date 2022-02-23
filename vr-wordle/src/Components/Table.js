import React from "react";
import { Plane } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";

export default function Table(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2 + 0.2, 0, 0],
    position: [0, 1.1, -1],
    type: "Static",
    material: {
      friction: 1,
    },
  }));

  return (
    <Plane args={[3.5, 2]} ref={ref}>
      <meshStandardMaterial color="lightgray" />
    </Plane>
  );
}
