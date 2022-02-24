import React, { useState, useRef, useEffect } from "react";
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
import Model from "./Components/Scene.js";
import { answerWords } from "./word-lists/answer-words.js";
import { differenceInDays } from "date-fns";

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

function getRandomAnswerWord() {
  const dateOne = new Date();
  const dateTwo = new Date("02/24/2022");
  let answer = answerWords[differenceInDays(dateOne, dateTwo) + 250];
  return answer;
}

export default function App() {
  const [state, setState] = useState({
    guesses: ["     ", "     ", "     ", "     ", "     ", "     "],
    guessCount: 0,
    currentGuess: ["", "", "", "", ""],
  });

  console.log(state);

  const [reset, setReset] = useState(false);

  const resetPositions = () => {
    setReset(!reset);
  };

  const [answer, setAnswer] = useState("");
  useEffect(() => {
    setAnswer(getRandomAnswerWord());
  }, []);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const letters = useRef(<group />);

  const setGuess = (char, i) => {
    if (char && state.currentGuess[i] !== char) {
      const dummyArr = state.currentGuess;
      dummyArr[i] = char;
      setState({ ...state, currentGuess: dummyArr });
    }
  };

  console.log(state);

  const submitGuess = () => {
    console.log(state);
    if (state.guesses.length <= 6 && state.currentGuess.length === 5) {
      let newGuesses = state.guesses.slice();
      newGuesses[state.guessCount] = state.currentGuess.join("");
      let newGuessCount = state.guessCount + 1;
      console.log(newGuesses);
      setState({
        ...state,
        guessCount: newGuessCount,
        guesses: newGuesses,
      });
      // setGuessCount(newGuessCount);
    }
  };

  console.log(state);

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
        <Grid guesses={state.guesses} answer={answer} />
        <Table
          args={[3.5, 0.2, 2]}
          position={[0, 1.05, -1.2]}
          rotation={[0.2, 0, 0]}
        />

        <Grabber groupRef={letters} />
        {generateLetters(reset, alphabet, letters)}
        <Letter position={[-4, 4, 2]} name="W" />
        <Letter position={[-2, 4, 2]} name="R" />
        <Letter position={[0, 4, 2]} name="D" />
        <Letter position={[2, 4, 2]} name="L" />
        <Letter position={[4, 4, 2]} name="E" />
        <Model position={[-4, 0, -0.75]} guessIndex={0} setGuess={setGuess} />
        <Model position={[-2, 0, -0.75]} guessIndex={1} setGuess={setGuess} />
        <Model position={[0, 0, -0.75]} guessIndex={2} setGuess={setGuess} />
        <Model position={[2, 0, -0.75]} guessIndex={3} setGuess={setGuess} />
        <Model position={[4, 0, -0.75]} guessIndex={4} setGuess={setGuess} />
        <Player />
        <Floor />
      </Physics>
      <Stars />
    </VRCanvas>
  );
}
