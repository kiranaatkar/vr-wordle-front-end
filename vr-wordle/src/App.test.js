import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import React from "react";
import Grid from "./Components/Grid";
import { MyRotatingBox, App, generateLetters } from "./App";
import ReactThreeTestRenderer from "@react-three/test-renderer";

// test("generate letters generates 26 boxes", async () => {
//   jest.mock("scheduler", () => require("scheduler/unstable_mock"));
//   const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

//   const state = {
//     guesses: ["hello", "world", "vrdle", "wrdle", "crane", "cramp"],
//     answer: "cramp",
//     reset: false,
//   };

//   const renderer = await ReactThreeTestRenderer.create(
//     generateLetters(state.reset, alphabet, "letters")
//   );
//   console.log(renderer);
//   const meshChildren = renderer.scene.children;
//   console.log(meshChildren);
//   expect(meshChildren.length).toBe(26);
// });

// test("app to render", async () => {
//   const renderer = await ReactThreeTestRenderer.create(<App />);
//   const mesh = renderer.scene;
//   console.log(mesh);

//   expect(mesh).toBeTruthy();
// });

test("mesh to have two children", async () => {
  const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />);
  const mesh = renderer.scene.children[0].allChildren;
  console.log(renderer);

  expect(mesh.length).toBe(2);
});
