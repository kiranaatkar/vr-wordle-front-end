import React, { useRef } from "react";

import { VRCanvas, DefaultXRControllers } from "@react-three/xr";
import Letter from "./Components/Letter.js";
import Floor from "./Components/Floor.js";
import Cylinder from "./Components/Cylinder.js";
import Keyboard from "./Components/Keyboard.js";
import Grid from "./Components/Grid.js";
import Grabber from "./Components/Grab.js";
import HollowCylinder from "./Components/HollowCylinder.js";
import Bucket from "./Components/Bucket.js";
import ExtrudedCylinder from "./Components/ExtrudedCylinder.js";
import RockColumn from "./Components/RockColumn.js";
//import Table from "./Components/Table.js";
import { Physics } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import {
  CubeTextureLoader,
  MeshBasicMaterial,
  Mesh,
  BackSide,
  BoxGeometry,
} from "three";
import Player from "./Components/Player.js";

function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  const environment = "space";

  const texture = loader.load([
    `/${environment}/1.png`,
    `/${environment}/2.png`,
    `/${environment}/3.png`,
    `/${environment}/4.png`,
    `/${environment}/5.png`,
    `/${environment}/6.png`,
  ]);

  const geometry = new BoxGeometry(1000, 1000, 1000);

  const material = new MeshBasicMaterial({
    envMap: texture,
    side: BackSide,
  });

  const cube = new Mesh(geometry, material);

  scene.add(cube);

  return null;
}

export default function App() {
  const letters = useRef(<group />);
  return (
    <VRCanvas style={{ touchAction: "none" }}>
      <DefaultXRControllers />
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Physics gravity={[0, -10, 0]}>
        <Player />
        <Floor />
        <RockColumn rotation={[-Math.PI / 2, 0, 0]} />
        <Cylinder position={[-3, 0, 0]} />
        <ExtrudedCylinder position={[3, 0, 0]} />
      </Physics>
      {/* <Keyboard /> */}
      <SkyBox />
    </VRCanvas>
  );
}
