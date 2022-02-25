import { useCylinder } from "@react-three/cannon";
import { animated } from "@react-spring/three";
import { useState } from "react";

export default function PressurePlate(props) {
  const [char, setChar] = useState("");
  const [ref] = useCylinder(() => ({
    type: "Static",
    mass: 10,
    args: props.args,
    // scale: [1, pressed ? 0.2 : 1, 1],
    position: props.position,
    onCollideBegin: (e) => {
      e.body.name !== char && props.setGuess(e.body.name, props.guessIndex);
    },
  }));

  return (
    <animated.mesh ref={ref} position={props.position}>
      <cylinderBufferGeometry attach="geometry" args={props.args} />
      <meshNormalMaterial color="hotpink" wireframe opacity={1} transparent />
    </animated.mesh>
  );
}
