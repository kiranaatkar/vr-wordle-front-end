import { useBox } from "@react-three/cannon";
import { Box, Text } from "@react-three/drei";

export default function LetterCubes({ id, position, size }) {
  console.log(id, position, size);
  const [ref, api] = useBox(() => ({
    args: size,
    mass: 1,
    position: position,
    material: {
      friction: 1,
    },
  }));

  return (
    <Box ref={ref} args={size}>
      <Text
        userData={{ letter: id }}
        position={[0, size[1] / 2 + 0.0001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.07}
      >
        {id.toUpperCase()}
      </Text>
      <meshStandardMaterial color="#3a3a3c" />
    </Box>
  );
}
