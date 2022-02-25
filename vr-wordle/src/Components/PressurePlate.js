import { useCylinder } from "@react-three/cannon";
import { useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";

export default function PressurePlate(props) {
  const [x, y, z] = props.position;
  const [pressed, setPress] = useState(false);

  const [ref, api] = useCylinder(() => ({
    type: "Static",
    mass: 10,
    args: props.args,
    scale: [1, pressed ? 0.2 : 1, 1],
    position: props.position,
    onCollide: (e) => {
      props.setGuess(e.body.name, props.guessIndex);
    },
    onCollideBegin: (e) => {
      console.log("BEGIN");
      setPress(true);
      console.log(api);
    },
    onCollideEnd: (e) => {
      console.log("END");
      setPress(false);
    },
  }));

  const { scale } = useSpring({
    to: { scale: [1, pressed ? 0.5 : 1, 1] },
    from: { scale: [1, pressed ? 1 : 0.5, 1] },
    config: config.slow,
  });

  const { position } = useSpring({
    to: { position: [x, pressed ? y - 0.2 : y, z] },
    from: { position: [x, pressed ? y : y - 0.2, z] },
    config: config.slow,
  });

  function getPlateColor() {
    if (pressed) {
      return <meshNormalMaterial />;
    } else {
      return <meshStandardMaterial color="black" />;
    }
  }

  return (
    <animated.mesh ref={ref} position={position} scale={scale}>
      <cylinderBufferGeometry attach="geometry" args={props.args} />
      {getPlateColor()}
    </animated.mesh>
  );
}
