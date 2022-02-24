import React, { useState, useRef } from "react";
import { PointerLockControls } from "@react-three/drei";
import { VRCanvas, DefaultXRControllers } from "@react-three/xr";
import LetterCubes from "./Components/LetterCubes.js";
import Floor from "./Components/Floor.js";
import Button from "./Components/Button.js";
import Submit from "./Components/Submit.js";
import Grid from "./Components/Grid.js";
import Grabber from "./Components/Grab.js";
import Table from "./Components/Table.js";
import { Physics } from "@react-three/cannon";
import Player from "./Components/Player.js";
import Model from "./Components/Scene.js";
import Letter from "./Components/Letter.js";
import SetLetterBox from "./Components/SetLetterBox.js";
import SkyBox from "./Components/SkyBox.js";

export default function App() {
  const [state, setState] = useState({
    guesses: ["hello", "world", "vrdle", "wrdle", "crane", "cramp"],
    answer: "cramp",
    reset: false,
  });

  const [reset, setReset] = useState(false);

  const resetPositions = () => {
    setReset(!reset);
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const letters = useRef(<group />);

  const currentGuess = ["", "", "", "", ""];

  const setGuess = (char, i) => {
    currentGuess[i] = char;
    console.log(currentGuess.join(""));
  };

  return (
    <VRCanvas style={{ touchAction: "none" }}>
      <DefaultXRControllers />
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Physics gravity={[0, -10, 0]}>
        {/* <PointerLockControls /> */}
        <Button reset={resetPositions} />
        <Submit />
        <Grid guesses={state.guesses} answer={state.answer} />
        <Table
          args={[3.5, 0.05, 2]}
          position={[0, 1.1, -1.2]}
          rotation={[0.2, 0, 0]}
        />

        <Grabber groupRef={letters} />
        <group ref={letters}>
          {alphabet.map((letter, i) => {
            return (
              <LetterCubes
                reset={reset}
                index={i}
                id={letter}
                key={letter}
                size={[0.07, 0.07, 0.07]}
                position={[(Math.random() - 0.5) * 0.25, 1.6 + 0.3 * i, -1]}
              />
            );
          })}
          <Letter position={[0, 1, 1]} />
          <Letter position={[0, 1.5, 1]} />
          <Letter position={[0, 2, 1]} />
          {/* <Model position={[0, 0, -0.5]} /> */}
          <Letter position={[0, 4, 2]} name="W" />
          <Letter position={[2, 4, 2]} name="R" />
          <Letter position={[4, 4, 2]} name="D" />
          <Letter position={[6, 4, 2]} name="L" />
          <Letter position={[8, 4, 2]} name="E" />
          <SetLetterBox
            args={[0.5, 0.5, 0.5]}
            position={[0, 0.25, -0.75]}
            guessIndex={0}
            setGuess={setGuess}
          />
          <SetLetterBox
            args={[0.5, 0.5, 0.5]}
            position={[2, 0.25, -0.75]}
            guessIndex={1}
            setGuess={setGuess}
          />
          <SetLetterBox
            args={[0.5, 0.5, 0.5]}
            position={[4, 0.25, -0.75]}
            guessIndex={2}
            setGuess={setGuess}
          />
          <SetLetterBox
            args={[0.5, 0.5, 0.5]}
            position={[6, 0.25, -0.75]}
            guessIndex={3}
            setGuess={setGuess}
          />
          <SetLetterBox
            args={[0.5, 0.5, 0.5]}
            position={[8, 0.25, -0.75]}
            guessIndex={4}
            setGuess={setGuess}
          />
        </group>
        <Player />
        <Floor />
      </Physics>
      <SkyBox />
    </VRCanvas>
  );
}
