import { useBox } from "@react-three/cannon";
import { useState } from "react";

export default function SetLetterBox({ args, position, guessIndex, setGuess }) {
  const [ref] = useBox(() => ({
    type: "Static",
    args,
    mass: 1,
    position,
    isTrigger: true,
    onCollide: (e) => {
      setGuess(e.body.name, guessIndex);
    },
  }));

  return (
    <mesh {...ref} position={position}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial wireframe color="hotpink" />
    </mesh>
  );
}
