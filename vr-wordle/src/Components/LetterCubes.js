import React, { useState } from "react";
import { useBox } from "@react-three/cannon";
import { Box, Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";

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
    api.position.set((Math.random() - 0.5) * 0.25, 1.6 + 0.3 * index, -1);
    console.log("reset");
    setState({ ...state, reset: reset });
  }

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
        <meshStandardMaterial color="#3a3a3c" />
      </Box>
    </Interactive>
  );
}
