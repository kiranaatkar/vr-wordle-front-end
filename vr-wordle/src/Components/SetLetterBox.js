import { useBox } from "@react-three/cannon";
import React from "react";

export default function SetLetterBox({ args, position, guessIndex, setGuess }) {
  const [box] = useBox(() => ({
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
    <mesh ref={box} position={position}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial color="hotpink" opacity={0.0001} transparent />
    </mesh>
  );
}
