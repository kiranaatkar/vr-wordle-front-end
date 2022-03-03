import { Box, Text } from "@react-three/drei";
import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Grid(props) {
  return props.guesses.map((guess, i) => {
    return (
      // Sets the position based on which guess we're attempting
      <group position={[0, 7.5 - i * 1.2, -3]} key={i}>
        {Guess(guess, props.answer, props.colorBlind)}
      </group>
    );
  });
}

function StaticLetter(props) {
  const size = [props.side, props.side, props.side];
  let color = {
    present: props.colorBlind ? "#85BFF9" : "#B59F3B",
    correct: props.colorBlind ? "#F5793A" : "#538D4E",
    absent: "#3A3A3C",
  }[props.state];

  const [active, setActive] = useState(false);

  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, "/blocks.mp3");

  useEffect(() => {
    // Setting up the sound during every update to make sure sound plays and avoiding
    // a bug where chrome does not allow autoplay
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setVolume(0.9);
    camera.add(listener);
    return () => camera.remove(listener);
  });

  const springs = useSpring({
    color: props.submitted ? color : "#3a3a3c",
    delay: 600 + props.index * 600,
    config: { duration: 400 },
  });

  const box = useRef();

  const { gl } = useThree();

  useFrame(() => {
    // Ties the boxes to rotate during every frame under certain conditions,
    // such as when the word has been submitted
    if (props.submitted && box.current.rotation.x < Math.PI / 2) {
      sound.current.play();
      box.current.rotation.x += 0.0345 - props.index * 0.005;
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

export function Guess(userGuess, word, colorBlind) {
  const side = 1;
  const space = 0.1;
  const width = (side + space) * 4;
  return (
    <>
      {userGuess.split("").map((guess, i) => (
        <StaticLetter
          side={side}
          id={guess}
          submitted={!(guess === " ")}
          index={i}
          key={i}
          position={[-width / 2 + (side + space) * i, 0, 0]}
          state={createColors(userGuess.split(""), word)[i]}
          colorBlind={colorBlind}
        />
      ))}
    </>
  );
}

// Detects which colour to set to each letter
const createColors = (wordArr, answer) => {
  // Creates a object with each characters from the correct answer
  const answerObj = answer.split("").reduce((a, c) => {
    if (a[c]) {
      a[c] += 1;
    } else {
      a[c] = 1;
    }
    return a;
  }, {});

  const wordObj = {};
  // Sets the default colours to be absent
  const colors = ["absent", "absent", "absent", "absent", "absent"];

  // For each word check if it is in the correct place
  wordArr.forEach((l, i) => {
    if (answer[i] === l) {
      colors[i] = "correct";

      // Adds to the counter object for the guess
      if (wordObj[l]) {
        wordObj[l] += 1;
      } else {
        wordObj[l] = 1;
      }
    }
  });

  wordArr.forEach((l, i) => {
    // This considers the case where the letter is present but is not correct
    if (answer.includes(l) && colors[i] !== "correct") {
      // Checks to make sure that the letter will not be set to present more times that the letter
      // appears in the answer
      if ((wordObj[l] || 0) < answerObj[l]) {
        colors[i] = "present";
      }
      if (wordObj[l]) {
        wordObj[l] += 1;
      } else {
        wordObj[l] = 1;
      }
    }
  });

  return colors;
};
