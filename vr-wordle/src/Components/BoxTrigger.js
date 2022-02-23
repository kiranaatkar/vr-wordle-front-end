import { useBox } from "@react-three/cannon";
import { useState } from "react";

export default function SetLetterBox(props) {
  const args = props.args;
  const position = props.position;
  const [ref] = useBox(() => ({
    type: "Static",
    args,
    mass: 1,
    ...props,
    isTrigger: true,
    onCollide: (e) => {
      console.log(e.body.name);
    },
  }));

  return (
    <mesh {...ref} position={position}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial wireframe color="hotpink" />
    </mesh>
  );
}
