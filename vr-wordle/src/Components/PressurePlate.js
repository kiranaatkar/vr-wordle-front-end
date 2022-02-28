import { useCylinder } from "@react-three/cannon";
import React, { useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";

export default function PressurePlate(props) {
  const [pressed, setPress] = useState(false);

  const [ref] = useCylinder(() => ({
    type: "Static",
    mass: 10,
    args: props.args,
    scale: [1, pressed ? 0.2 : 1, 1],
    position: props.position,
    onCollide: (e) => {
      props.setGuess(e.body.name, props.guessIndex);
    },
    onCollideBegin: () => {
      setPress(true);
    },
    onCollideEnd: () => {
      setPress(false);
    },
  }));

  const { scale } = useSpring({
    to: { scale: [1, pressed ? 0.5 : 1, 1] },
    from: { scale: [1, pressed ? 1 : 0.5, 1] },
    config: config.slow,
  });

  function getPlateColor() {
    return pressed ? (
      <meshNormalMaterial />
    ) : (
      <meshStandardMaterial color="black" />
    );
  }

  return (
    <animated.mesh ref={ref} scale={scale}>
      <cylinderBufferGeometry attach="geometry" args={props.args} />
      {getPlateColor()}
    </animated.mesh>
  );
}
