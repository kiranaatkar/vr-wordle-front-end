import { useCylinder } from "@react-three/cannon";

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
      <meshStandardMaterial color="red" opacity={0.001} transparent />
    </mesh>
  );
}

export default function ColumnContainer(props) {
  let [x, y, z] = props.columnGeometry;
  y += 0.5;

  return (
    // bottom, top, trunk
    <>
      <ContainerCircle position={[x, 0, z]} args={[0.225, 0.225, 0.1, 32]} />
      <ContainerCircle
        position={[x, y + 0.501, z]}
        args={[0.225, 0.225, 0.1, 32]}
      />
      <ContainerCircle position={[x, y, z]} args={[0.145, 0.145, 1, 32]} />
    </>
  );
}
