import React, { useState, useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";

extend(ThreeMeshUI);

function Title({ accentColor }) {
  return (
    <block
      args={[
        {
          width: 1,
          height: 0.25,
          backgroundOpacity: 0,
          justifyContent: "center",
        },
      ]}
    >
      <text args={[{ content: "hello ", fontColor: accentColor }]} />
      <text
        content={"world!"}
        args={[{ content: "world", fontColor: accentColor }]}
      />
    </block>
  );
}

export default function Panel() {
  const [accentColor] = useState(() => new THREE.Color("red"));
  useFrame(() => {
    ThreeMeshUI.update();
  });
  return (
    <block
      position={[-3, 2.5, -1]}
      rotation={[0, Math.PI / 4, 0]}
      args={[
        {
          width: 1,
          height: 1,
          fontSize: 0.1,
          backgroundOpacity: 1,
          fontFamily: "./Roboto-msdf.json",
          fontTexture: "./Roboto-msdf.png",
        },
      ]}
    >
      <Title accentColor={accentColor} />
      {/* <text args={[{ content: "hello", fontColor: accentColor }]} /> */}
      {/* <Button onClick={() => accentColor.offsetHSL(1 / 3, 0, 0)} /> */}
    </block>
  );
}
