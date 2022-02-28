import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import React from "react";
import App from "./App";
import ReactThreeTestRenderer from "@react-three/test-renderer";

test("generate letters generates 26 boxes", async () => {
  // const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  // const state = {
  //   guesses: ["hello", "world", "vrdle", "wrdle", "crane", "cramp"],
  //   answer: "cramp",
  //   reset: false,
  // };
  const renderer = await ReactThreeTestRenderer.create(<App />);
  console.log(renderer);
  const meshChildren = renderer.scene.allChildren;
  console.log(meshChildren);
  expect(meshChildren.length).toBe(26);
});
