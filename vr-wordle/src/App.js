import React, { useState, useRef } from "react";
import { Stars } from "@react-three/drei";
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
import Letter from "./Components/Letter.js";
import SetLetterBox from "./Components/SetLetterBox.js";

export function generateLetters(reset, alphabet, letters) {
  return (
    <group ref={letters}>
      {alphabet.map((letter, i) => {
        return (
          <LetterCubes
            reset={reset}
            index={i}
            id={letter}
            key={letter}
            sizeArg={[0.07, 0.07, 0.07]}
            position={[(Math.random() - 0.5) * 0.25, 1.6 + 0.3 * i, -1]}
          />
        );
      })}
    </group>
  );
}

export default function App() {
  const [guesses, setGuesses] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const [guessCount, setGuessCount] = useState(0);
  const [answer] = useState("CRAMP");
  const [reset, setReset] = useState(false);
  const [currentGuess, setCurrentGuess] = useState(["", "", "", "", ""]);

  const resetPositions = () => {
    setReset(!reset);
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const letters = useRef(<group />);

  const setGuess = (char, i) => {
    if (char && currentGuess[i] !== char) {
      const dummyArr = currentGuess;
      dummyArr[i] = char;
      setCurrentGuess(dummyArr);
    }
  };

  const submitGuess = () => {
    if (guessCount < 6 && currentGuess.length === 5) {
      const newGuesses = guesses;
      newGuesses[guessCount] = currentGuess.join("");
      const newCount = guessCount + 1;
      setGuesses(newGuesses);
      setGuessCount(newCount);
    }
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
        <Submit submit={submitGuess} />
        <Grid guesses={guesses} answer={answer} />
        <Table
          args={[3.5, 0.2, 2]}
          position={[0, 1.05, -1.2]}
          rotation={[0.2, 0, 0]}
        />

        <Grabber groupRef={letters} />
        {generateLetters(reset, alphabet, letters)}
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
        <Player />
        <Floor />
      </Physics>
      <Stars />
    </VRCanvas>
  );
}
