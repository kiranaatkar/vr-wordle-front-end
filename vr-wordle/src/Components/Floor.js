import React from "react";
import { usePlane } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import Model from "./Mountain.js";

export default function Floor(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    material: {
      friction: 1,
    },
    opacity: 0,
  }));

  const [colorMap, displacementMap, roughnessMap] = useLoader(TextureLoader, [
    "/textures/snow_field_aerial_col_4k.jpg",
    "/textures/snow_field_aerial_height_4k.png",
    "/textures/snow_field_aerial_rough_4k.jpg",
  ]);

  return (
    <>
      <Model />

      <mesh {...props} position={[0, 0, 0]} ref={ref}>
        <planeBufferGeometry attach="geometry" args={[1, 1]} />
        <meshStandardMaterial
        // map={colorMap}
        // displacementMap={displacementMap}
        // roughnessMap={roughnessMap}
        />
      </mesh>
    </>
  );
}
