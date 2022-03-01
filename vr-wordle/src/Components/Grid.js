import { Box, Text } from "@react-three/drei";
import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

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

  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, "/blocks.mp3");

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setVolume(0.9);
    camera.add(listener);
    return () => camera.remove(listener);
  });

  const springs = useSpring({
    color: props.submitted ? color : "#3a3a3c",
    delay: 600 + props.index * 600,
    config: { duration: 200 },
  });

  const box = useRef();

  useFrame(() => {
    if (props.submitted && box.current.rotation.x < Math.PI / 2) {
      sound.current.play();
      box.current.rotation.x += 0.0285 - props.index * 0.005;
    }
  });

  return (
    <Box
      ref={box}
      args={size}
      rotation={[0, 0, 0]}
      position={props.position}
      onClick={() => {
        setActive(!active);
      }}
    >
      <animated.meshStandardMaterial attach="material" color={springs.color} />
      <positionalAudio ref={sound} args={[listener]} />
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

export function Guess(guess, word) {
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
