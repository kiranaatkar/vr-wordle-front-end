import React, { useState } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import { Interactive, useController, useXRFrame } from "@react-three/xr";
import { Vector3, TextureLoader } from "three";

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
    mass: 0.3,
    position: position,
    material: {
      friction: 1,
    },
  }));

  const [colorMap] = useLoader(TextureLoader, [
    `/textures/lettercube-${id.toLowerCase()}.png`,
  ]);

  // Code to enable click and drag features with a mouse
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
      -0.6 + (Math.random() - 0.5) * 0.2
    );
    setState({ ...state, reset: reset });
  }

  const grabController = useController("right");

  // Constantly check to see if the block is within gather distance and change the hover state respectively
  useXRFrame(() => {
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
        <meshStandardMaterial
          color={state.hover ? "#00E2FB" : "#ffffff"}
          alphaTest={0.8}
          map={colorMap}
        />
      </Box>
    </Interactive>
  );
}
