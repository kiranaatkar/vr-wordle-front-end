import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";

function ContainerWall(props) {
  const [ref] = useBox(() => ({
    type: "Static",
    mass: 1000,
    position: props.position,
    args: [0.75, 0.05, 0.75],
    rotation: props.rotation,
  }));
  return (
    <Box
      ref={ref}
      args={[0.75, 0.1, 0.75]}
      position={props.position}
      rotation={props.rotation}
    >
      <meshStandardMaterial opacity={0.001} transparent />
    </Box>
  );
}

export default function BasketContainer(props) {
  let [x, y, z, r] = props.basketGeometry;
  y += 0.5;

  return (
    // bottom, front wall, back wall, left wall, right wall
    <>
      <ContainerWall position={[x, 0, z]} />
      <ContainerWall
        position={[x, y, z + r]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      />
      <ContainerWall
        position={[x, y, z - r]}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      />
      <ContainerWall position={[-x - r, y, z]} rotation={[0, 0, Math.PI / 2]} />
      <ContainerWall position={[x + r, y, z]} rotation={[0, 0, Math.PI / 2]} />
    </>
  );
}
