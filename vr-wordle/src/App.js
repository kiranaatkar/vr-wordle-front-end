import React, { useState, useRef, useEffect } from "react";
import { Text, Environment, Sky, Stars } from "@react-three/drei";
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
import Pillars from "./Components/Pillars.js";
import Networking from "./Components/Networking.js";
import { answerWords } from "./word-lists/answer-words.js";
import { differenceInDays } from "date-fns";
// import Panel from "./Components/Panel.js";
import Keyboard from "./Components/Keyboard.js";
import Wind from "./Components/Wind.js";

const myAPI = new Networking();

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

  const [username] = useState("placeholderUsername");
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
        const score = guessCount + 1;
        myAPI.postScore(score, answer, username);
        setGameCondition("win");
      } else if (!newGuesses.includes(answer) && guessCount === 5) {
        console.log("lose");
        setGameCondition("lose");
      }
      deleteOldGuess();
      resetPositions();
    }
  };

  return (
    <VRCanvas style={{ touchAction: "none" }}>
      <DefaultXRControllers />
      <ambientLight intensity={0.3} />
      <Text
        fontSize={1}
        color="green"
        position={[0, 1.22, -1.45]}
        rotation={[-Math.PI / 2, 0, 0]}
        fillOpacity={gameEnd === "win" ? 1 : 0}
        alphaTest={0.5}
      >
        You Win!
      </Text>
      <Text
        fontSize={1}
        color="red"
        position={[0, 1.22, -1.45]}
        rotation={[1, 0, 0]}
        fillOpacity={gameEnd === "lose" ? 1 : 0}
        alphaTest={0.5}
      >
        You Lose!
      </Text>
      <Grid guesses={guesses} answer={answer} />
      <Physics gravity={[0, -10, 0]}>
        <Button reset={resetPositions} />
        <Submit submit={submitGuess} />
        <Table
          args={[3.5, 0.2, 2]}
          position={[0, 1.05, -1.2]}
          rotation={[0.2, 0, 0]}
        />
        <Grabber groupRef={letters} />
        {generateLetters(reset, alphabet, letters)}
        <Letter position={[2, 1, 1]} name="w" />
        <Letter position={[2, 2, 0.6]} name="r" />
        <Letter position={[2, 3, 0.7]} name="d" />
        <Letter position={[-2, 1, 0.6]} name="l" />
        <Letter position={[-2, 2, 1]} name="e" />
        <Pillars setGuess={setGuess} />
        <Player />
        <Floor />
        {/* <Panel /> */}
        <Keyboard />
      </Physics>
      <Environment preset={"night"} />
      <Sky distance={450000} sunPosition={[0, -1, 0]} azimuth={0.25} />
      <Stars
        radius={100}
        depth={100}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      <fog attach="fog" args={["#421700", 0, 100]} />
      <Wind />
    </VRCanvas>
  );
}
