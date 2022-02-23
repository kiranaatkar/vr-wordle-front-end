import React, { useState } from "react";
import { useBox } from "@react-three/cannon";
import { Box, Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";

export default function LetterCubes({ id, position, size }) {
  const [hovered, hover] = useState(false);

  const [ref] = useBox(() => ({
    args: size,
    mass: 1,
    position: position,
    material: {
      friction: 1,
    },
  }));

  return (
    <Interactive onHover={() => hover(true)} onBlur={() => hover(false)}>
      <Box ref={ref} args={size}>
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
