import React, { useState } from "react";
import { useThree } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import { Box, Text } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { Interactive, useXR, useXRFrame } from "@react-three/xr";
import { Vector3 } from "three";

export default function LetterCubes({ id, position, sizeArg, reset, index }) {
  const [state, setState] = useState({
    hover: false,
    reset: false,
  });

  if (state) {
  }

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const [ref, api] = useBox(() => ({
    args: sizeArg,
    mass: 1,
    position: position,
    material: {
      friction: 1,
    },
  }));

  const bind = useDrag(
    ({ offset: [,], xy: [x, y], first, last }) => {
      if (first) {
        api.mass.set(0);
      } else if (last) {
        api.mass.set(10);
      }
      api.position.set(
        (x - size.width / 2) / aspect,
        -(y - size.height / 2) / aspect,
        -0.7
      );
    },
    { pointerEvents: true }
  );

  if (state.reset !== reset) {
    api.position.set(
      (Math.random() - 0.5) * 0.2,
      2 + 0.21 * index,
      -0.7 + (Math.random() - 0.5) * 0.2
    );
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
      setState({ ...state, hover: true });
    } else {
      setState({ ...state, hover: false });
    }
  });

  return (
    <Interactive
      onHover={() => setState({ ...state, hover: true })}
      onBlur={() => setState({ ...state, hover: false })}
    >
      <Box
        {...bind()}
        ref={ref}
        args={sizeArg}
        onPointerOver={(event) => setState({ ...state, hover: true })}
        onPointerOut={(event) => setState({ ...state, hover: false })}
        name={id}
      >
        <Text
          userData={{ letter: id }}
          position={[0, sizeArg[1] / 2 + 0.0001, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.05}
        >
          {id.toUpperCase()}
        </Text>
        <meshStandardMaterial color={state.hover ? "#00E2FB" : "#3a3a3c"} />
      </Box>
    </Interactive>
  );
}
