import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CubeTextureLoader,
  MeshBasicMaterial,
  Mesh,
  BackSide,
  BoxGeometry,
} from "three";
import { VRCanvas } from "@react-three/xr";
import { OrbitControls, Stars, Sky } from "@react-three/drei";

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Plane() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();

  const environment = "space";

  const texture = loader.load([
    `/${environment}/1.png`,
    `/${environment}/2.png`,
    `/${environment}/3.png`,
    `/${environment}/4.png`,
    `/${environment}/5.png`,
    `/${environment}/6.png`,
  ]);

  const geometry = new BoxGeometry(1000, 1000, 1000);

  const material = new MeshBasicMaterial({
    envMap: texture,
    side: BackSide,
  });

  const cube = new Mesh(geometry, material);

  scene.add(cube);

  return null;
}

export default function App() {
  return (
    <VRCanvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-2.2, 1, 0]} />
      <Box position={[-0.8, 1, 0]} />
      <Box position={[0.6, 1, 0]} />
      <Box position={[2, 1, 0]} />
      <Box position={[3.4, 1, 0]} />
      <OrbitControls />
      {/* <Plane /> */}
      {/* <Stars /> */}
      {/* <Sky /> */}
      <SkyBox />
    </VRCanvas>
  );
}
