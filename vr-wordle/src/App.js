import React from "react";
import { VRCanvas, DefaultXRControllers, Hands } from "@react-three/xr";
import Box from "./Components/Box.js";
import Floor from "./Components/Floor.js";
import Keyboard from "./Components/Keyboard.js";
import { Physics } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import {
  CubeTextureLoader,
  MeshBasicMaterial,
  Mesh,
  BackSide,
  BoxGeometry,
} from "three";

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
  return (
    <VRCanvas style={{ touchAction: "none" }}>
      <DefaultXRControllers />
      <Hands />
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Physics gravity={[0, -50, 0]}>
        <Box position={[0, 0, 0]} />
        <Box position={[2, 0, 0]} />
        <Box position={[-2.2, 1, 0]} />
        <Box position={[-0.8, 1, 0]} />
        <Box position={[0.6, 1, 0]} />
        <Box position={[2, 1, 0]} />
        <Box position={[3.4, 1, 0]} />
        <Floor />
      </Physics>
      <Keyboard />
      <SkyBox />
    </VRCanvas>
  );
}
