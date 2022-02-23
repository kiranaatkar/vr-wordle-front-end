import React from "react";
import { Box, Text, Cylinder } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { Interactive } from "@react-three/xr";

export default function Button(props) {
  const [ref] = useBox(() => ({
    args: [0.2, 0.2, 0.05],
    mass: 1,
    type: "Static",
    position: [1, 1.1, -0.8],
    rotation: [-Math.PI / 2 + 0.2, 0, 0],
    material: {
      friction: 1,
    },
  }));

  return (
    <Box ref={ref} args={[0.2, 0.2, 0.05]}>
      <Interactive>
        <Cylinder
          args={[0.09, 0.09, 0.1]}
          rotation={[-Math.PI / 2 + 0.1, 0, 0]}
        >
          <Text
            position={[0, -0.052, 0]}
            rotation={[Math.PI / 2 + 0.1, 0, 0]}
            fontSize={0.04}
            color="black"
          >
            RESET
          </Text>
          <meshStandardMaterial color="red" />
        </Cylinder>
      </Interactive>
      <meshStandardMaterial color="gray" />
    </Box>
  );
}
