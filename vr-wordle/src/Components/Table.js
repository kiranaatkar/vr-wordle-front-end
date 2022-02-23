import React from "react";
import { Box } from "@react-three/drei";
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
    </Box>
  );
}
