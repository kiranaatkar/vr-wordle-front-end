import React, { useState, useRef, useEffect } from "react";
import { Environment, Sky, Stars } from "@react-three/drei";
import { VRCanvas, DefaultXRControllers, Hands } from "@react-three/xr";
import LetterCubes from "./LetterCubes.js";
import GameEnd from "./GameEnd.js";
import Floor from "./Floor.js";
import Button from "./Button.js";
import Submit from "./Submit.js";
import Grid from "./Grid.js";
import Grabber from "./Grab.js";
import Table from "./Table.js";
import { Physics } from "@react-three/cannon";
import Player from "./Player.js";
import Letter from "./Letter.js";
import Pillars from "./Pillars.js";
import Networking from "./Networking.js";
import { answerWords } from "../word-lists/answer-words.js";
import { differenceInDays } from "date-fns";
import { Navigate } from "react-router";
import Alphabet from "./Alphabet.js";
import RightHand from "./RightHand.js";
import LeftHand from "./LeftHand.js";

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
            position={[
              (Math.random() - 0.5) * 0.25,
              1.6 + 0.3 * i,
              -0.6 + (Math.random() - 0.5) * 0.2,
            ]}
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

export default function Game(props) {
  // Sets guesses to initially be empty strings to be filled later.
  // Ensures the grid boxes are empty to begin with.
  const [guesses, setGuesses] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);

  const [username] = useState(props.username);
  const [colorBlind] = useState(props.colorBlind);
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

  props.setAnswer(answer);

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

  const submitGuess = async () => {
    if (
      guessCount < 6 &&
      currentGuess.filter((char) => char !== "").length === 5 &&
      !gameEnd
      // [...allowedWords, ...answerWords].includes(currentGuess.join(""))
    ) {
      const newGuesses = guesses;
      newGuesses[guessCount] = currentGuess.join("");
      const newCount = guessCount + 1;
      setGuesses(newGuesses);
      setGuessCount(newCount);
      deleteOldGuess();
      resetPositions();
      if (currentGuess.join("") === answer) {
        console.log("win");
        const score = guessCount + 1;
        await myAPI.postScore(score, answer, username);
        props.setScore(guessCount);
        setTimeout(async () => {
          setGameCondition("win");
        }, 5000);
      } else if (!newGuesses.includes(answer) && guessCount === 5) {
        console.log("lose");
        setGameCondition("lose");
        props.setScore(null);
        setTimeout(props.endGame(true), 5000);
      }
    }
  };

  return username ? (
    <VRCanvas
      mode="concurrent"
      performance={{ min: 0.8 }}
      style={{ touchAction: "none" }}
      frameloop="demand"
      sessionInit={{
        optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"],
      }}
    >
      {gameEnd && <GameEnd endGame={() => props.endGame(true)} />}
      {/* Grabs Oculus Controllers */}
      <DefaultXRControllers />
      <Hands modelLeft={<LeftHand />} modelRight={<RightHand />} />
      <ambientLight intensity={0.3} />
      <Grid guesses={guesses} answer={answer} colorBlind={colorBlind} />

      {/* Adds Physics to child elements */}
      <Physics gravity={[0, -10, 0]}>
        <Button reset={resetPositions} />
        <Submit submit={submitGuess} />
        <Table
          args={[3.5, 0.2, 2]}
          position={[0, 1, -0.8]}
          rotation={[0.2, 0, 0]}
        />

        {/* Allows grabbing of the individual letters */}
        <Grabber groupRef={letters} />
        {generateLetters(reset, alphabet, letters)}
        <Letter position={[2, 1, -1]} name="n" />
        <Pillars setGuess={setGuess} />
        <Player />
        <Floor />
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

      {/* 
      Renders an alphabet behind and underneath the player to cache every 
      letter in a text component, prevents scene re-loading on a submit */}
      <Alphabet />
    </VRCanvas>
  ) : (
    <Navigate to="/" />
  );
}
