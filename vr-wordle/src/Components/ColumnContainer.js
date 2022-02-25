import { useCylinder } from "@react-three/cannon";
import { set } from "date-fns";

export default function ColumnContainer({
  columnGeometry,
  setGuess,
  guessIndex,
  material,
}) {
  let [x, y, z] = columnGeometry;
  y += 0.5; // Moves center up so bottom is at y=0

  return (
    // bottom, top, pressure plate, trunk
    <>
      <ContainerCircle position={[x, 0, z]} args={[0.225, 0.225, 0.1, 32]} />
      <ContainerCircle
        position={[x, y + 0.465, z]}
        args={[0.225, 0.2, 0.1, 32]}
      />
      <PressurePlate
        position={[x, y + 0.55, z]}
        args={[0.225, 0.225, 0.05, 32]}
        setGuess={setGuess}
        guessIndex={guessIndex}
      />
      <ContainerCircle position={[x, y, z]} args={[0.145, 0.145, 1, 32]} />
    </>
  );
}

function PressurePlate(props) {
  const [x, y, z] = props.position;
  const [ref, api] = useCylinder(() => ({
    type: "Static",
    mass: 1000,
    args: props.args,
    position: props.position,
    onCollide: (e) => {
      props.setGuess(e.body.name, props.guessIndex);
    },
  }));

  return (
    <mesh ref={ref} position={props.position}>
      <cylinderBufferGeometry attach="geometry" args={props.args} />
      <meshNormalMaterial color="hotpink" wireframe opacity={1} transparent />
    </mesh>
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
      <meshNormalMaterial color="red" wireframe opacity={1} transparent />
    </mesh>
  );
}
