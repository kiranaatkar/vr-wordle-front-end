import { answerWords } from "./word-lists/answer-words.js";
import { differenceInDays } from "date-fns";
import { render, screen } from "@testing-library/react";
import React, { useState, useRef } from "react";
import Grid, { Guess } from "./Components/Grid.js";
import userEvent from "@testing-library/user-event";
import Homepage from "./Components/Homepage.js";
import "@testing-library/jest-dom";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function generateLetters(reset, alphabet, letters) {
  return alphabet.map((letter, i) => {
    return {
      group: letters,
      reset: reset,
      index: i,
      id: letter,
      key: letter,
      sizeArg: [0.07, 0.07, 0.07],
      position: [(Math.random() - 0.5) * 0.25, 1.6 + 0.3 * i, -1],
      // Just included for deleteOldGuess testing
      children: [{ name: letter }],
    };
  });
}

function getRandomAnswerWord() {
  const dateOne = new Date();
  const dateTwo = new Date("02/24/2022");
  let answer = answerWords[differenceInDays(dateOne, dateTwo) + 250];
  return answer;
}

test("generate letters generates 26 boxes", () => {
  const dummyLetters = generateLetters(true, alphabet, "letters");
  expect(dummyLetters).toHaveLength(26);
});

test("letterBoxes will have all required props and will have correct type", () => {
  const dummyLetters = generateLetters(true, alphabet, "letters");
  for (let i = 0; i < 26; i++) {
    expect(dummyLetters[i]).toEqual(
      expect.objectContaining({
        group: expect.any(String),
        reset: expect.any(Boolean),
        index: expect.any(Number),
        id: expect.any(String),
        key: expect.any(String),
        sizeArg: expect.any(Object),
        position: expect.any(Object),
      })
    );
  }
});

test("getRandomAnswer returns a string that is only different on different days", () => {
  const answer = getRandomAnswerWord();

  expect(typeof answer).toBe("string");
  expect(answer).toHaveLength(5);

  const newAnswer = getRandomAnswerWord();

  expect(newAnswer).toMatch(answer);
});

test("resetPositions will change the state value of reset", () => {
  const state = { reset: false };
  const setReset = (value) => {
    state.reset = value;
  };

  const resetPositions = () => {
    setReset(!state.reset);
  };

  expect(state.reset).toBeFalsy();

  resetPositions();

  expect(state.reset).toBeTruthy();

  resetPositions();

  expect(state.reset).toBeFalsy();
});

test("deleteOldGuess correctly deletes the children of the target object", () => {
  let currentGuess = ["w", "r", "d", "l", "e"];

  const answer = "tests";

  let letters = { current: { children: [] } };

  letters.current.children = generateLetters(false, alphabet, "letters");

  expect(letters.current.children).toHaveLength(26);

  const deleteOldGuess = () => {
    for (const letter of currentGuess) {
      if (!answer.split("").includes(letter)) {
        const indexToRemove = letters.current.children.findIndex((child) => {
          return child.children[0].name === letter;
        });
        if (indexToRemove !== -1) {
          letters.current.children.splice(indexToRemove, 1);
        }
      }
    }
  };

  deleteOldGuess();
  expect(letters.current.children).toHaveLength(22);
  currentGuess = ["c", "h", "o", "k", "e"];
  deleteOldGuess();
  expect(letters.current.children).toHaveLength(18);
  currentGuess = ["t", "e", "s", "t", "s"];
  deleteOldGuess();
  expect(letters.current.children).toHaveLength(18);
});

test("setGuess correctly updates the new guess", () => {
  let state = { currentGuess: [] };

  const setCurrentGuess = (array) => {
    state.currentGuess = array;
  };

  const setGuess = (char, i) => {
    if (char && state.currentGuess[i] !== char) {
      const dummyArr = state.currentGuess;
      dummyArr[i] = char;
      setCurrentGuess(dummyArr);
    }
  };

  setGuess("a", 3);
  expect(state.currentGuess[3]).toBe("a");
  setGuess("b", 3);
  expect(state.currentGuess[3]).toBe("b");
  setGuess("a", 0);
  setGuess("a", 1);
  setGuess("a", 2);
  setGuess("a", 4);

  expect(state.currentGuess.join("")).toMatch("aaaba");
});

test("submitGuess correctly submits guess, and deletes incorrect letters", () => {
  let state = {
    guessCount: 0,
    currentGuess: ["a", "a", "a", "a", "a"],
    gameEnd: false,
    guesses: ["     ", "     ", "     ", "     ", "     ", "     "],
    answer: "tests",
  };

  const setGuesses = (array) => {
    state.guesses = array;
  };

  const setGuessCount = (count) => {
    state.guessCount = count;
  };

  const setGameCondition = (game) => {
    state.gameEnd = game;
  };

  let letters = { current: { children: [] } };

  letters.current.children = generateLetters(false, alphabet, "letters");

  const deleteOldGuess = () => {
    for (const letter of state.currentGuess) {
      if (!state.answer.split("").includes(letter)) {
        const indexToRemove = letters.current.children.findIndex((child) => {
          return child.children[0].name === letter;
        });
        if (indexToRemove !== -1) {
          letters.current.children.splice(indexToRemove, 1);
        }
      }
    }
  };

  const setReset = (value) => {
    state.reset = value;
  };

  const resetPositions = () => {
    setReset(!state.reset);
  };

  const submitGuess = () => {
    if (
      state.guessCount < 6 &&
      state.currentGuess.filter((char) => char !== "").length === 5 &&
      !state.gameEnd
    ) {
      const newGuesses = state.guesses;
      newGuesses[state.guessCount] = state.currentGuess.join("");
      const newCount = state.guessCount + 1;
      setGuesses(newGuesses);
      setGuessCount(newCount);
      if (state.currentGuess.join("") === state.answer) {
        console.log("win");
        setGameCondition("win");
      } else if (!newGuesses.includes(state.answer) && state.guessCount === 5) {
        console.log("lose");
        setGameCondition("lose");
      }
      deleteOldGuess();
      resetPositions();
    }
  };

  expect(state.guesses[0]).toMatch("     ");
  submitGuess();
  expect(state.guesses[0]).toMatch("aaaaa");
  expect(letters.current.children).toHaveLength(25);
  expect(state.reset).toBeTruthy();
});

test("submitGuess does not do anything if current guess is too short, or the game is over", () => {
  let state = {
    guessCount: 0,
    currentGuess: ["a", "a", "a", "a"],
    gameEnd: false,
    guesses: ["     ", "     ", "     ", "     ", "     ", "     "],
    answer: "tests",
  };

  const setGuesses = (array) => {
    state.guesses = array;
  };

  const setGuessCount = (count) => {
    state.guessCount = count;
  };

  const setGameCondition = (game) => {
    state.gameEnd = game;
  };

  let letters = { current: { children: [] } };

  letters.current.children = generateLetters(false, alphabet, "letters");

  const deleteOldGuess = () => {
    for (const letter of state.currentGuess) {
      if (!state.answer.split("").includes(letter)) {
        const indexToRemove = letters.current.children.findIndex((child) => {
          return child.children[0].name === letter;
        });
        if (indexToRemove !== -1) {
          letters.current.children.splice(indexToRemove, 1);
        }
      }
    }
  };

  const setReset = (value) => {
    state.reset = value;
  };

  const resetPositions = () => {
    setReset(!state.reset);
  };

  const submitGuess = () => {
    if (
      state.guessCount < 6 &&
      state.currentGuess.filter((char) => char !== "").length === 5 &&
      !state.gameEnd
    ) {
      const newGuesses = state.guesses;
      newGuesses[state.guessCount] = state.currentGuess.join("");
      const newCount = state.guessCount + 1;
      setGuesses(newGuesses);
      setGuessCount(newCount);
      if (state.currentGuess.join("") === state.answer) {
        console.log("win");
        setGameCondition("win");
      } else if (!newGuesses.includes(state.answer) && state.guessCount === 5) {
        console.log("lose");
        setGameCondition("lose");
      }
      deleteOldGuess();
      resetPositions();
    }
  };

  expect(state.guesses[0]).toMatch("     ");
  submitGuess();
  expect(state.guessCount).toBe(0);
  expect(state.guesses[0]).toMatch("     ");
  expect(letters.current.children).toHaveLength(26);
  expect(state.reset).toBeFalsy();

  state.currentGuess.push("a");
  setGameCondition(true);

  expect(state.currentGuess).toHaveLength(5);

  submitGuess();

  expect(state.guessCount).toBe(0);
  expect(state.guesses[0]).toMatch("     ");
  expect(letters.current.children).toHaveLength(26);
  expect(state.reset).toBeFalsy();
});

test("submitGuess ends the game on correct guess", () => {
  let state = {
    guessCount: 0,
    currentGuess: ["t", "e", "s", "t", "s"],
    gameEnd: false,
    guesses: ["     ", "     ", "     ", "     ", "     ", "     "],
    answer: "tests",
  };

  const setGuesses = (array) => {
    state.guesses = array;
  };

  const setGuessCount = (count) => {
    state.guessCount = count;
  };

  const setGameCondition = (game) => {
    state.gameEnd = game;
  };

  let letters = { current: { children: [] } };

  letters.current.children = generateLetters(false, alphabet, "letters");

  const deleteOldGuess = () => {
    for (const letter of state.currentGuess) {
      if (!state.answer.split("").includes(letter)) {
        const indexToRemove = letters.current.children.findIndex((child) => {
          return child.children[0].name === letter;
        });
        if (indexToRemove !== -1) {
          letters.current.children.splice(indexToRemove, 1);
        }
      }
    }
  };

  const setReset = (value) => {
    state.reset = value;
  };

  const resetPositions = () => {
    setReset(!state.reset);
  };

  const submitGuess = () => {
    if (
      state.guessCount < 6 &&
      state.currentGuess.filter((char) => char !== "").length === 5 &&
      !state.gameEnd
    ) {
      const newGuesses = state.guesses;
      newGuesses[state.guessCount] = state.currentGuess.join("");
      const newCount = state.guessCount + 1;
      setGuesses(newGuesses);
      setGuessCount(newCount);
      if (state.currentGuess.join("") === state.answer) {
        console.log("win");
        setGameCondition("win");
      } else if (!newGuesses.includes(state.answer) && state.guessCount === 5) {
        console.log("lose");
        setGameCondition("lose");
      }
      deleteOldGuess();
      resetPositions();
    }
  };

  submitGuess();
  expect(state.guesses[0]).toMatch("tests");
  expect(letters.current.children).toHaveLength(26);
  expect(state.reset).toBeTruthy();
  expect(state.gameEnd).toMatch("win");

  submitGuess();

  expect(state.guessCount).toBe(1);
});

test("submitGuess ends the game on last guess", () => {
  let state = {
    guessCount: 5,
    currentGuess: ["a", "e", "s", "t", "s"],
    gameEnd: false,
    guesses: ["     ", "     ", "     ", "     ", "     ", "     "],
    answer: "tests",
  };

  const setGuesses = (array) => {
    state.guesses = array;
  };

  const setGuessCount = (count) => {
    state.guessCount = count;
  };

  const setGameCondition = (game) => {
    state.gameEnd = game;
  };

  let letters = { current: { children: [] } };

  letters.current.children = generateLetters(false, alphabet, "letters");

  const deleteOldGuess = () => {
    for (const letter of state.currentGuess) {
      if (!state.answer.split("").includes(letter)) {
        const indexToRemove = letters.current.children.findIndex((child) => {
          return child.children[0].name === letter;
        });
        if (indexToRemove !== -1) {
          letters.current.children.splice(indexToRemove, 1);
        }
      }
    }
  };

  const setReset = (value) => {
    state.reset = value;
  };

  const resetPositions = () => {
    setReset(!state.reset);
  };

  const submitGuess = () => {
    if (
      state.guessCount < 6 &&
      state.currentGuess.filter((char) => char !== "").length === 5 &&
      !state.gameEnd
    ) {
      const newGuesses = state.guesses;
      newGuesses[state.guessCount] = state.currentGuess.join("");
      const newCount = state.guessCount + 1;
      setGuesses(newGuesses);
      setGuessCount(newCount);
      if (state.currentGuess.join("") === state.answer) {
        console.log("win");
        setGameCondition("win");
      } else if (!newGuesses.includes(state.answer) && newCount === 6) {
        console.log("lose");
        setGameCondition("lose");
      }
      deleteOldGuess();
      resetPositions();
    }
  };

  submitGuess();
  expect(state.guesses[5]).toMatch("aests");
  expect(letters.current.children).toHaveLength(25);
  expect(state.reset).toBeTruthy();
  expect(state.gameEnd).toMatch("lose");

  submitGuess();

  expect(state.guessCount).toBe(6);
});

test("Grid displays 30 blocks", () => {
  const guesses = ["irate", "choke", "chore", "chose", "crane", "rupee"];
  const answer = "rupee";

  const test = Grid({ guesses: guesses, answer: answer });

  for (let child in test) {
    expect(test[child].props.children.props.children.length).toBe(5);
  }
});

test("Guess correctly outputs a five letter word with five blocks", () => {
  const expected = [
    {
      side: 1,
      id: "r",
      submitted: true,
      index: 0,
      position: [-2.2, 0, 0],
      state: "present",
    },
    {
      side: 1,
      id: "u",
      submitted: true,
      index: 1,
      position: [-1.1, 0, 0],
      state: "absent",
    },
    {
      side: 1,
      id: "p",
      submitted: true,
      index: 2,
      position: [0, 0, 0],
      state: "absent",
    },
    {
      side: 1,
      id: "e",
      submitted: true,
      index: 3,
      position: [1.1, 0, 0],
      state: "present",
    },
    {
      side: 1,
      id: "e",
      submitted: true,
      index: 4,
      position: [2.2, 0, 0],
      state: "correct",
    },
  ];

  const test = Guess("rupee", "irate");
  for (let child in test.props.children) {
    expect(JSON.stringify(test.props.children[child].props)).toStrictEqual(
      JSON.stringify(expected[child])
    );
  }
});

describe("<Homepage />", () => {
  test("renders username input", () => {
    render(<Homepage />);
    const element = screen.getByTestId("username-input");
    expect(element).toBeInTheDocument();
  });

  test("renders title", () => {
    render(<Homepage />);
    const element = screen.getByTestId("title-image");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("alt", "wrdle");
  });

  test("renders submit button", () => {
    render(<Homepage />);
    const element = screen.getByTestId("submit-button");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("type", "submit");
  });

  test("renders random-username button", () => {
    render(<Homepage />);
    const element = screen.getByTestId("random-username");
    expect(element).toBeInTheDocument();
  });

  test("renders colorblind mode", () => {
    render(<Homepage />);
    const element = screen.getByTestId("colorblind-section");
    const descendant = screen.getByTestId("colorblind-switch");
    expect(element).toBeInTheDocument();
    expect(element).toContainElement(descendant);
  });

  test("submit is disabled on empty username", () => {
    render(<Homepage />);
    const element = screen.getByTestId("submit-button");
    expect(element).toBeDisabled();
  });

  // test("submit is enabled on filled username", () => {
  //   render(<Homepage />);
  //   const username = screen.getByTestId("username-input");
  //   userEvent.type(username, "test");
  //   expect(screen.getByTestId("submit-button")).not.toBeDisabled();
  // });
});
