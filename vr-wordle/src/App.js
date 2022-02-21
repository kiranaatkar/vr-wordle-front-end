import React from "react";
import { VRCanvas } from "@react-three/xr";
import Box from "./Components/Box.js";
import Floor from "./Components/Floor.js";
import { Physics } from "@react-three/cannon";

export default function App() {
  return (
    <VRCanvas style={{ touchAction: "none" }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Physics gravity={[0, -50, 0]}>
        <Box position={[0, 0, 0]} />
        <Box position={[2, 0, 0]} />
        <Floor />
      </Physics>
    </VRCanvas>
  );
}
