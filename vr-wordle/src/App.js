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
import Column from "./Components/Column.js";
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
  const [guesses, setGuesses] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const [guessCount, setGuessCount] = useState(0);
  const [reset, setReset] = useState(false);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [answer, setAnswer] = useState("");
  const [gameEnd, setGameCondition] = useState(false);

  const resetPositions = () => {
    setReset(!reset);
  };

  useEffect(() => {
    setAnswer(getRandomAnswerWord());
  }, []);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const letters = useRef(<group />);

  const deleteOldGuess = () => {
    for (const letter of currentGuess) {
      if (!getRandomAnswerWord().split("").includes(letter)) {
        const indexToRemove = letters.current.children.findIndex((child) => {
          return child.children[0].name === letter;
        });
        if (indexToRemove !== -1) {
          letters.current.children.splice(indexToRemove, 1);
        }
      }
    }
  };

  const setGuess = (char, i) => {
    if (char && currentGuess[i] !== char) {
      const dummyArr = currentGuess;
      dummyArr[i] = char;
      setCurrentGuess(dummyArr);
    }
  };

  const submitGuess = () => {
    if (
      guessCount < 6 &&
      currentGuess.filter((char) => char !== "").length === 5 &&
      !gameEnd
    ) {
      const newGuesses = guesses;
      newGuesses[guessCount] = currentGuess.join("");
      const newCount = guessCount + 1;
      setGuesses(newGuesses);
      setGuessCount(newCount);
      if (currentGuess.join("") === answer) {
        console.log("win");
        setGameCondition("win");
      } else if (!newGuesses.includes(answer) && guessCount === 5) {
        console.log("lose");
        setGameCondition("lose");
      }
      deleteOldGuess();
    }
  };

  return (
    <VRCanvas style={{ touchAction: "none" }}>
      <DefaultXRControllers />
      <ambientLight intensity={1} />
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
        <Letter position={[2, 1, 0.4]} name="w" />
        <Letter position={[2, 2, 0.6]} name="r" />
        <Letter position={[2, 3, 0.7]} name="d" />
        <Letter position={[-2, 1, 0.6]} name="l" />
        <Letter position={[-2, 2, 0.4]} name="e" />
        <Column position={[-1.25, 0, 0.4]} guessIndex={4} setGuess={setGuess} />
        <Column position={[-0.6, 0, 0.6]} guessIndex={3} setGuess={setGuess} />
        <Column position={[0, 0, 0.7]} guessIndex={2} setGuess={setGuess} />
        <Column position={[0.6, 0, 0.6]} guessIndex={1} setGuess={setGuess} />
        <Column position={[1.2, 0, 0.4]} guessIndex={0} setGuess={setGuess} />
        <Player />
        <Floor />
      </Physics>

      <Stars />
    </VRCanvas>
  );
}
