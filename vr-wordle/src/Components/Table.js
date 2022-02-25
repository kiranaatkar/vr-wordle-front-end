import React from "react";
import { Box, Text } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

export default function Table({ position, rotation, args }) {
  const [ref] = useBox(() => ({
    rotation: rotation,
    position: position,
    args: args,
    type: "Static",
    material: {
      friction: 1,
    },
  }));

  return (
    <Box args={args} ref={ref}>
      <meshStandardMaterial color="lightgray" />
      <Text
        userData={"hello"}
        position={[0, args[1] / 2 + 0.001, -0.3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        color={"red"}
      >
        Hello please help mesh
      </Text>
    </Box>
  );
}
