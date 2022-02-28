import React, { useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";
import Backspace from "../assets/backspace.png";
import Shift from "../assets/shift.png";
import Enter from "../assets/enter.png";

extend(ThreeMeshUI);

export default function Keyboard() {
  const keys = useRef();

  useEffect(() => {});

  useFrame(() => {
    ThreeMeshUI.update();
  });
  return (
    <keyboard
      ref={keys}
      position={[-3, 1.5, -1]}
      rotation={[0, Math.PI / 4, 0]}
      scale={2}
      args={[
        {
          language: "eng",
          fontFamily: "/Roboto-msdf.json",
          fontTexture: "/Roboto-msdf.png",
          fontSize: 0.035, // fontSize will propagate to the keys blocks
          backgroundColor: new THREE.Color(0x858585),
          backgroundOpacity: 1,
          backspaceTexture: Backspace,
          shiftTexture: Shift,
          enterTexture: Enter,
        },
      ]}
    ></keyboard>
  );
}
