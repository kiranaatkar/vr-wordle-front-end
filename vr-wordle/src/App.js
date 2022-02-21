import React, { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
import { VRCanvas } from "@react-three/xr";
import { OrbitControls, Stars } from "@react-three/drei";
import forest from "./skyboxes/forest.png";

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

  const texture = loader.load([
    "https://6izyu.csb.app/4b.jpg",
    "https://6izyu.csb.app/3.jpg",
    "https://6izyu.csb.app/4b.jpg",
    "https://6izyu.csb.app/4.jpg",
    "https://6izyu.csb.app/5.jpg",
    "https://6izyu.csb.app/2.jpg",
  ]);
  scene.add(texture);
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
      <Plane />
      <Stars />
      <SkyBox />
    </VRCanvas>
  );
}
