/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useCylinder } from "@react-three/cannon";

export default function Model({ ...props }) {
  // const [ref] = useCylinder(() => ({ mass: 10000, ...props }));
  const { nodes } = useGLTF("/rockColumn.gltf");
  const ref = useRef();

  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh
        scale={0.05}
        dispose={null}
        geometry={nodes.obj_57937915.geometry}
        material={nodes.obj_57937915.material}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <meshNormalMaterial />
      </mesh>
    </group>
  );
}

useGLTF.preload("/RockColumn.gltf");
