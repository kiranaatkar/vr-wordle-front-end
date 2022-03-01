import { render, screen } from "@testing-library/react";

import React, { useState, useRef } from "react";

// import ReactThreeTestRenderer from "@react-three/test-renderer";

import Grid, { Guess } from "./Components/Grid.js";

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

test("Grid displays 30 blocks", () => {
  const guesses = ["irate", "choke", "chore", "chose", "crane", "rupee"];
  const answer = "rupee";

  const test = Grid({ guesses: guesses, answer: answer });

  for (let child in test) {
    expect(test[child].props.children.props.children.length).toBe(5);
  }
});
