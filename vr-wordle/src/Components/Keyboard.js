import React, { useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";
import { useInteraction } from "@react-three/xr";
import Backspace from "../assets/backspace.png";
import Shift from "../assets/shift.png";
import Enter from "../assets/enter.png";

extend(ThreeMeshUI);

const colors = {
  keyboardBack: 0x858585,
  panelBack: 0x262626,
  button: 0x363636,
  hovered: 0x1c1c1c,
  selected: 0x109c5d,
};

export default function Keyboard() {
  const ref = useRef();

  useEffect(() => {
    ref.current.keys.forEach((key) => {
      key.setupState({
        state: "idle",
        attributes: {
          offset: 0,
          backgroundColor: new THREE.Color(colors.button),
          backgroundOpacity: 1,
        },
      });
      key.setupState({
        state: "hovered",
        attributes: {
          offset: 0,
          backgroundColor: new THREE.Color(colors.hovered),
          backgroundOpacity: 1,
        },
      });
      key.setupState({
        state: "selected",
        attributes: {
          offset: -0.009,
          backgroundColor: new THREE.Color(colors.selected),
          backgroundOpacity: 1,
        },
      });
      key.setState("idle");
    });
  });

  useFrame(() => {
    ThreeMeshUI.update();
  });

  useInteraction(ref, "onHover", (e) => {
    // e.intersection.object.setState("hovered");
    e.intersection.object.parent.parent.setState("hovered");
    console.log(e.intersection.object.parent);
  });

  return (
    <keyboard
      ref={ref}
      position={[-3, 1.5, -1]}
      rotation={[0, Math.PI / 4, 0]}
      scale={2}
      args={[
        {
          language: "eng",
          fontFamily: "/Roboto-msdf.json",
          fontTexture: "/Roboto-msdf.png",
          fontSize: 0.035, // fontSize will propagate to the keys blocks
          backgroundColor: new THREE.Color(colors.keyboardBack),
          backgroundOpacity: 1,
          backspaceTexture: Backspace,
          shiftTexture: Shift,
          enterTexture: Enter,
        },
      ]}
    ></keyboard>
  );
}
