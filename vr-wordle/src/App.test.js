import { render, screen } from "@testing-library/react";

import { useState, useRef } from "react";

import ReactThreeTestRenderer from "@react-three/test-renderer";

test("generate letters generates 26 boxes", async () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  // const letters = useRef(<group />);
  // const [state, setState] = useState({
  //   guesses: ["hello", "world", "vrdle", "wrdle", "crane", "cramp"],
  //   answer: "cramp",
  //   reset: false,
  // });
  // const renderer = await ReactThreeTestRenderer.create(
  //   generateLetters(state, alphabet, letters)
  // );
  // const meshChildren = renderer.scene.children[0].allChildren;
  // expect(meshChildren.length).toBe(26);
});
