import React from "react";
import { useCompoundBody, useBox } from "@react-three/cannon";

export default function Cylinder(props) {
  // Make the cup a physics object with a big mass
  // args: topRad, bottomRad, height, radialSegments, heightSegments, openEnded
  const [topRad, bottomRad, height, radSeg, hSeg, open] = [
    0.6,
    0.4,
    0.75,
    32,
    1,
    true,
  ];
  const args = [topRad, bottomRad, height, radSeg, hSeg, open];
  const [ref] = useCompoundBody(() => ({
    mass: 100000,
    args,
    ...props,
    material: { friction: 1 },
    shapes: [
      { type: "Cylinder", position: [0, 0, 0], args: args },
      {
        type: "Cylinder",
        args: [bottomRad, bottomRad, height / 10],
      },
      {
        type: "Box",
        position: [0, 0, 0],
        args: [bottomRad, bottomRad, bottomRad],
      },
    ],
  }));

  return (
    <group ref={ref}>
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={args} />
        <meshNormalMaterial wireframe />
      </mesh>
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[bottomRad, bottomRad, height / 10]} />
        <meshNormalMaterial wireframe />
      </mesh>
      <BoxTrigger
        args={[0.5, 0.5, 0.5]}
        onCollide={(e) => {
          console.log(e);
        }}
      />
    </group>
  );
}

function BoxTrigger({ args, onCollide }) {
  const [ref] = useBox(() => ({ args, isTrigger: true, onCollide }));
  return (
    <mesh {...{ ref }}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial wireframe color="green" />
    </mesh>
  );
}
