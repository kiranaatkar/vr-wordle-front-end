import React, { useState, useRef } from "react";

import { VRCanvas, DefaultXRControllers } from "@react-three/xr";
import Letter from "./Components/Letter.js";
import LetterCubes from "./Components/LetterCubes.js";
import Floor from "./Components/Floor.js";
import Button from "./Components/Button.js";
import Grid from "./Components/Grid.js";
import Grabber from "./Components/Grab.js";
import Table from "./Components/Table.js";
import { Physics } from "@react-three/cannon";
import Player from "./Components/Player.js";
import Model from "./Components/Scene.js";
import SetLetterBox from "./Components/SetLetterBox.js";
import SkyBox from "./Components/SkyBox.js";

export default function App() {
  const [state, setState] = useState({
    guesses: ["hello", "world", "vrdle", "wrdle", "crane", "cramp"],
    answer: "cramp",
  });
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const letters = useRef(<group />);
  return (
    <VRCanvas style={{ touchAction: "none" }}>
      <DefaultXRControllers />
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Physics gravity={[0, -10, 0]}>
        {/* <Button />
        <Grid guesses={state.guesses} answer={state.answer} />
        <Table
          args={[3.5, 0.05, 2]}
          position={[0, 1.1, -1.2]}
          rotation={[0.2, 0, 0]}
        /> */}

        <Grabber groupRef={letters} />
        <group ref={letters}>
          {/* {alphabet.map((letter, i) => {
            return (
              <LetterCubes
                id={letter}
                key={letter}
                size={[0.07, 0.07, 0.07]}
                position={[(Math.random() - 0.5) * 0.25, 1.6 + 0.3 * i, -1]}
              />
            );
          })} 
          <Letter position={[0, 1, 1]} />
          <Letter position={[0, 1.5, 1]} />
          <Letter position={[0, 2, 1]} /> */}
          {/* <Model position={[0, 0, -0.5]} /> */}
          <Letter position={[0, 4, 2]} name="A" />
          <Letter position={[2, 4, 2]} name="B" />
          <SetLetterBox args={[0.5, 0.5, 0.5]} position={[0, 0.25, -0.75]} />
        </group>
        <Player />
        <Floor />
      </Physics>
      <SkyBox />
    </VRCanvas>
  );
}
