import { Box, Text } from "@react-three/drei";
import { useState, useRef } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";

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
  let color = {
    present: "#B59F3B",
    correct: "#538D4E",
    absent: "#3A3A3C",
  }[props.state];

  const [active, setActive] = useState(false);

  const springs = useSpring({
    color: props.submitted ? color : "#3a3a3c",
    delay: 400 + props.index * 400,
    config: { duration: 1500 },
  });

  const box = useRef();

  useFrame(() => {
    if (props.submitted && box.current.rotation.x < Math.PI / 2) {
      box.current.rotation.x += 0.03 - props.index * 0.005;

      // if (props.state === "present") {
      //   color[0] += 2;
      //   color[1] += 2;
      //   console.log(color[0]);
      // } else if (props.state === "correct") {
      // }
    }
  });

  return (
    <Box
      ref={box}
      args={size}
      rotation={[0, 0, 0]}
      position={props.position}
      scale={1}
      onClick={() => {
        console.log(active);
        console.log("clicked");
        setActive(!active);
      }}
    >
      <animated.meshStandardMaterial attach="material" color={springs.color} />
      <Text
        userData={{ letter: props.id }}
        position={[0, size[1] / 2 + 0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={props.side - 0.1}
        color={"white"}
      >
        {props.id.toUpperCase()}
      </Text>
    </Box>
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
          submitted={!(it === " ")}
          index={i}
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
