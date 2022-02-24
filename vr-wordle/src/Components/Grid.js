import { Box, Text } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useSpring, animated } from "@react-spring/three";
import { useState } from "react";

export default function Grid(props) {
  return props.guesses.map((it, i) => {
    return (
      <group position={[0, 7.5 - i * 1.2, -3]} key={i}>
        {Guess(it, props.answer)}
      </group>
    );
  });
}

function StaticLetter(props) {
  const size = [props.side, props.side, props.side];
  const color = {
    present: "#b59f3b",
    correct: "#538d4e",
    absent: "#3a3a3c",
  }[props.state];

  const [active, setActive] = useState(false);

  const { rotation, guessColor, scale } = useSpring({
    from: { rotation: [Math.PI / 2, 0, 0], guessColor: "#3a3a3c", scale: 1 },
    to: { rotation: [Math.PI, 0, 0], guessColor: color, scale: 1.5 },
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });

  // const { scale } = useSpring({
  //   scale: active ? 1.5 : 1,
  // });

  // const { guessColor } = useSpring({
  //   guessColor: active ? "red" : "#3a3a3c",
  // });

  const [box] = useBox(() => ({
    rotation: [Math.PI / 2, 0, 0],
    position: props.position,
    mass: 100,
    args: size,
    type: "Static",
  }));

  return (
    <animated.mesh
      ref={box}
      args={size}
      position={props.position}
      rotation={active ? rotation : [Math.PI / 2, 0, 0]}
      scale={active ? scale : 1}
      onClick={() => {
        console.log(active);
        console.log("clicked");
        setActive(!active);
      }}
    >
      <boxGeometry attach="geometry"></boxGeometry>
      <animated.meshStandardMaterial
        attach="material"
        color={active ? guessColor : "#3a3a3c"}
      />
      <Text
        userData={{ letter: props.id }}
        position={[0, size[1] / 2 + 0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={props.side - 0.1}
        color={"white"}
      >
        {props.id.toUpperCase()}
      </Text>
    </animated.mesh>
  );
}

function Guess(guess, word) {
  const side = 1;
  const space = 0.1;
  const width = (side + space) * 4;
  return (
    <>
      {guess.split("").map((it, i) => (
        <StaticLetter
          side={side}
          id={it}
          key={i}
          position={[-width / 2 + (side + space) * i, 0, 0]}
          state={
            word[i] === it
              ? "correct"
              : word.includes(it)
              ? "present"
              : "absent"
          }
        />
      ))}
    </>
  );
}
