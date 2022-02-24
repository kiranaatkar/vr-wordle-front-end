import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";

// function BasketSide({ position, rotation, args }) {
//   const [ref] = useBox(() => ({
//     type: "Static",
//     position: position,
//     args: args,
//     rotation: rotation,
//   }));
//   return (
//     <Box ref={ref} args={args}>
//       <meshStandardMaterial color="grey" />
//     </Box>
//   );
// }


export default function SetLetterBox({ args, position, guessIndex, setGuess }) {
  const [box] = useBox(() => ({
    type: "Static",
    args,
    mass: 1,
    position,
    isTrigger: true,
    onCollide: (e) => {
      setGuess(e.body.name, guessIndex);
    },
  }));

  return (
    <mesh ref={box} position={position}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial wireframe color="hotpink" />
    </mesh>
  );
}
