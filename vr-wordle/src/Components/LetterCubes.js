import React, { useState } from "react";
import { useBox } from "@react-three/cannon";
import { Box, Text } from "@react-three/drei";
import { Interactive, useXR, useXRFrame } from "@react-three/xr";
import { Vector3 } from "three";

export default function LetterCubes({ id, position, size, reset, index }) {
  const [state, setState] = useState({
    hover: false,
    reset: false,
  });

  if (state) {
  }

  const [ref, api] = useBox(() => ({
    args: size,
    mass: 1,
    position: position,
    material: {
      friction: 1,
    },
  }));

  if (state.reset !== reset) {
    api.position.set(
      (Math.random() - 0.5) * 0.2,
      2 + 0.21 * index,
      -0.7 + (Math.random() - 0.5) * 0.2
    );
    console.log("reset");
    setState({ ...state, reset: reset });
  }

  const controllers = useXR();

  useXRFrame(() => {
    const grabController = controllers.controllers[0];

    const pos = new Vector3();
    const posB = new Vector3();
    grabController.controller.getWorldPosition(pos);
    ref.current.getWorldPosition(posB);
    const distance = pos.distanceTo(posB);

    if (distance < 0.1) {
      hover({ ...hovered, hover: true });
    } else {
      hover({ ...hovered, hover: false });
    }
  });

  return (
    <Interactive
      onHover={() => setState({ ...state, hover: true })}
      onBlur={() => setState({ ...state, hover: false })}
    >
      <Box
        ref={ref}
        args={size}
        onPointerOver={(event) => setState({ ...state, hover: true })}
        onPointerOut={(event) => setState({ ...state, hover: false })}
      >
        <Text
          userData={{ letter: id }}
          position={[0, size[1] / 2 + 0.0001, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.05}
        >
          {id.toUpperCase()}
        </Text>
        <meshStandardMaterial color={hovered.hover ? "#00E2FB" : "#3a3a3c"} />
      </Box>
    </Interactive>
  );
}
