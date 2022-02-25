import { useCylinder } from "@react-three/cannon";
import PressurePlate from "./PressurePlate";

export default function ColumnContainer({
  columnGeometry,
  setGuess,
  guessIndex,
}) {
  let [x, y, z] = columnGeometry;
  y += 0.5; // Moves center up so bottom is at y=0

  return (
    // bottom, top, pressure plate, trunk
    <>
      <ContainerCircle position={[x, 0.05, z]} args={[0.165, 0.225, 0.1, 64]} />
      <ContainerCircle
        position={[x, y + 0.465, z]}
        args={[0.225, 0.145, 0.15, 64]}
      />
      <PressurePlate
        position={[x, y + 0.55, z]}
        args={[0.225, 0.225, 0.1, 32]}
        setGuess={setGuess}
        guessIndex={guessIndex}
      />
      <ContainerCircle position={[x, y, z]} args={[0.1425, 0.1425, 1, 32]} />
    </>
  );
}

function ContainerCircle(props) {
  const [ref] = useCylinder(() => ({
    type: "Static",
    mass: 1000,
    position: props.position,
    args: props.args,
  }));
  return (
    <mesh ref={ref} position={props.position}>
      <cylinderBufferGeometry attach="geometry" args={props.args} />
      <meshNormalMaterial opacity={1} transparent />
    </mesh>
  );
}
